import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, WifiOff } from 'lucide-react';

// Types

type Sender = 'user' | 'bot';

interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: number;
  isError?: boolean;
}

// Helpers

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getOrCreateVisitorId(): string {
  const key = 'm3hive_visitor_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem(key, id);
  }
  return id;
}

const STORAGE_KEY = 'm3hive_chat_session';
const POSITION_STORAGE_KEY = 'm3hive_chatbot_position';
const GREETING_STORAGE_KEY = 'm3hive_proactive_greeting_seen';
const GREETING_DELAY_MS = 10000;
const GREETING_TYPING_MS = 1_150;
const GREETING_VISIBLE_MS = 12_000;
const FAB_SIZE = 58;
const VIEWPORT_MARGIN = 12;
const PANEL_GAP = 16;
const API_URL = (import.meta as any).env?.VITE_CHATBOT_API_URL || 'http://localhost:8000';
const WELCOME_TEXT =
  "Hello, welcome to M3Hive! I'm your AI assistant. How can I help you today — exploring our services, a career opportunity, or something else?";

interface WidgetPosition {
  x: number;
  y: number;
}

type GreetingPhase = 'hidden' | 'typing' | 'visible' | 'exiting';

function hasHandledGreeting(): boolean {
  try {
    return sessionStorage.getItem(GREETING_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function markGreetingHandled(): void {
  try {
    sessionStorage.setItem(GREETING_STORAGE_KEY, 'true');
  } catch {
    // Ignore unavailable storage.
  }
}

function clampPosition(position: WidgetPosition): WidgetPosition {
  const maxX = Math.max(VIEWPORT_MARGIN, window.innerWidth - FAB_SIZE - VIEWPORT_MARGIN);
  const maxY = Math.max(VIEWPORT_MARGIN, window.innerHeight - FAB_SIZE - VIEWPORT_MARGIN);

  return {
    x: Math.min(Math.max(position.x, VIEWPORT_MARGIN), maxX),
    y: Math.min(Math.max(position.y, VIEWPORT_MARGIN), maxY),
  };
}

function getInitialPosition(): WidgetPosition {
  const fallback = clampPosition({
    x: window.innerWidth - FAB_SIZE - 28,
    y: window.innerHeight - FAB_SIZE - 28,
  });

  try {
    const saved = JSON.parse(localStorage.getItem(POSITION_STORAGE_KEY) || 'null');
    if (Number.isFinite(saved?.x) && Number.isFinite(saved?.y)) {
      return clampPosition(saved);
    }
  } catch {
    // Ignore unavailable storage or malformed saved data.
  }

  return fallback;
}

// Typing Indicator

const TypingIndicator: React.FC = () => (
  <div className="m3-chat-msg m3-chat-msg--bot">
    <span className="m3-chat-avatar m3-chat-avatar--bot" aria-hidden="true">
      <Bot size={14} />
    </span>
    <span className="m3-typing-dots" aria-label="Bot is typing">
      <span className="m3-dot" />
      <span className="m3-dot" />
      <span className="m3-dot" />
    </span>
  </div>
);

// Message Bubble

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`m3-chat-msg ${isUser ? 'm3-chat-msg--user' : 'm3-chat-msg--bot'}`}>
      {!isUser && (
        <span className="m3-chat-avatar m3-chat-avatar--bot" aria-hidden="true">
          <Bot size={14} />
        </span>
      )}
      <span
        className={`m3-chat-bubble ${isUser ? 'm3-chat-bubble--user' : 'm3-chat-bubble--bot'} ${message.isError ? 'm3-chat-bubble--error' : ''}`}
      >
        {message.text}
      </span>
      {isUser && (
        <span className="m3-chat-avatar m3-chat-avatar--user" aria-hidden="true">
          <User size={14} />
        </span>
      )}
    </div>
  );
};

// Main Widget

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [requestInFlight, setRequestInFlight] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [position, setPosition] = useState<WidgetPosition>(getInitialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isSettling, setIsSettling] = useState(false);
  const [greetingPhase, setGreetingPhase] = useState<GreetingPhase>('hidden');
  const [greetingMessageReady, setGreetingMessageReady] = useState(false);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fabRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const visitorId = useRef(getOrCreateVisitorId());
  const positionRef = useRef(position);
  const dragRef = useRef<{
    pointerId: number;
    startPointerX: number;
    startPointerY: number;
    startPosition: WidgetPosition;
    hasMoved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const pendingPositionRef = useRef<WidgetPosition | null>(null);

  const applyPosition = useCallback((nextPosition: WidgetPosition) => {
    positionRef.current = nextPosition;

    if (fabRef.current) {
      fabRef.current.style.transform = `translate3d(${nextPosition.x}px, ${nextPosition.y}px, 0)`;
    }

    const panel = chatWindowRef.current;
    if (panel) {
      const panelWidth = panel.offsetWidth;
      const panelHeight = panel.offsetHeight;
      const maxLeft = Math.max(VIEWPORT_MARGIN, window.innerWidth - panelWidth - VIEWPORT_MARGIN);
      const maxTop = Math.max(VIEWPORT_MARGIN, window.innerHeight - panelHeight - VIEWPORT_MARGIN);
      const preferredLeft = nextPosition.x + FAB_SIZE - panelWidth;
      const preferredTop = nextPosition.y - panelHeight - PANEL_GAP;
      const fallbackTop = nextPosition.y + FAB_SIZE + PANEL_GAP;

      panel.style.left = `${Math.min(Math.max(preferredLeft, VIEWPORT_MARGIN), maxLeft)}px`;
      panel.style.top = `${Math.min(
        Math.max(preferredTop >= VIEWPORT_MARGIN ? preferredTop : fallbackTop, VIEWPORT_MARGIN),
        maxTop,
      )}px`;
    }

    const greeting = greetingRef.current;
    if (greeting) {
      const greetingWidth = greeting.offsetWidth;
      const greetingHeight = greeting.offsetHeight;
      const maxLeft = Math.max(VIEWPORT_MARGIN, window.innerWidth - greetingWidth - VIEWPORT_MARGIN);
      const maxTop = Math.max(VIEWPORT_MARGIN, window.innerHeight - greetingHeight - VIEWPORT_MARGIN);
      const isMobile = window.matchMedia('(max-width: 480px)').matches;
      let greetingLeft: number;
      let greetingTop: number;

      if (isMobile) {
        greetingLeft = nextPosition.x + FAB_SIZE / 2 - greetingWidth / 2;
        const above = nextPosition.y - greetingHeight - PANEL_GAP;
        greetingTop = above >= VIEWPORT_MARGIN
          ? above
          : nextPosition.y + FAB_SIZE + PANEL_GAP;
      } else {
        const leftSide = nextPosition.x - greetingWidth - PANEL_GAP;
        greetingLeft = leftSide >= VIEWPORT_MARGIN
          ? leftSide
          : nextPosition.x + FAB_SIZE + PANEL_GAP;
        greetingTop = nextPosition.y + FAB_SIZE / 2 - greetingHeight / 2;
      }

      greeting.style.left = `${Math.min(Math.max(greetingLeft, VIEWPORT_MARGIN), maxLeft)}px`;
      greeting.style.top = `${Math.min(Math.max(greetingTop, VIEWPORT_MARGIN), maxTop)}px`;
    }
  }, []);

  useEffect(() => {
    applyPosition(position);
  }, [applyPosition, greetingPhase, isOpen, position]);

  useEffect(() => {
    const handleResize = () => {
      const nextPosition = clampPosition(positionRef.current);
      applyPosition(nextPosition);
      setPosition(nextPosition);

      try {
        localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(nextPosition));
      } catch {
        // Ignore unavailable storage.
      }
    };

    window.addEventListener('resize', handleResize);
    window.visualViewport?.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [applyPosition]);

  const dismissGreeting = useCallback(() => {
    markGreetingHandled();
    setGreetingPhase((current) => current === 'hidden' ? 'hidden' : 'exiting');
  }, []);

  useEffect(() => {
    if (hasHandledGreeting()) return;

    try {
      const savedChat = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
      if (savedChat?.messages?.length) {
        markGreetingHandled();
        return;
      }
    } catch {
      // Continue when session data is unavailable or malformed.
    }

    let hasEngaged = false;
    let delayHasElapsed = false;
    let hasStarted = false;

    const removeListeners = () => {
      window.removeEventListener('pointermove', handleEngagement);
      window.removeEventListener('pointerdown', handleEngagement);
      window.removeEventListener('scroll', handleEngagement, true);
      window.removeEventListener('keydown', handleEngagement);
      document.removeEventListener('visibilitychange', maybeShowGreeting);
      document.removeEventListener('focusout', maybeShowGreeting);
    };

    function maybeShowGreeting() {
      const activeElement = document.activeElement as HTMLElement | null;
      const isEditing = Boolean(activeElement?.matches('input, textarea, select, [contenteditable="true"]'));

      if (
        hasStarted ||
        !hasEngaged ||
        !delayHasElapsed ||
        hasHandledGreeting() ||
        document.visibilityState !== 'visible' ||
        isEditing
      ) return;

      hasStarted = true;
      markGreetingHandled();
      setGreetingPhase('typing');
      removeListeners();
    }

    function handleEngagement() {
      hasEngaged = true;
      maybeShowGreeting();
    }

    window.addEventListener('pointermove', handleEngagement, { passive: true });
    window.addEventListener('pointerdown', handleEngagement, { passive: true });
    window.addEventListener('scroll', handleEngagement, { passive: true, capture: true });
    window.addEventListener('keydown', handleEngagement, { passive: true });
    document.addEventListener('visibilitychange', maybeShowGreeting);
    document.addEventListener('focusout', maybeShowGreeting);

    const delayTimer = window.setTimeout(() => {
      delayHasElapsed = true;
      maybeShowGreeting();
    }, GREETING_DELAY_MS);

    return () => {
      window.clearTimeout(delayTimer);
      removeListeners();
    };
  }, []);

  useEffect(() => {
    if (greetingPhase !== 'typing') return;
    const typingTimer = window.setTimeout(() => {
      setGreetingMessageReady(true);
      setGreetingPhase('visible');
    }, GREETING_TYPING_MS);
    return () => window.clearTimeout(typingTimer);
  }, [greetingPhase]);

  useEffect(() => {
    if (greetingPhase !== 'visible') return;
    const hideTimer = window.setTimeout(dismissGreeting, GREETING_VISIBLE_MS);
    return () => window.clearTimeout(hideTimer);
  }, [dismissGreeting, greetingPhase]);

  useEffect(() => {
    if (greetingPhase !== 'exiting') return;
    const exitTimer = window.setTimeout(() => setGreetingPhase('hidden'), 360);
    return () => window.clearTimeout(exitTimer);
  }, [greetingPhase]);

  // Restore session
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
      if (saved?.messages?.length) {
        setMessages(saved.messages);
        setHasOpened(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist session
  useEffect(() => {
    if (messages.length === 0) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages }));
    } catch {
      // ignore
    }
  }, [messages]);

  // ── Auto-scroll ──────────────────────────────────────────────────────────
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  // ── Focus input on open ──────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen]);

  // ── Escape key to close ──────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !requestInFlight) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, requestInFlight]);

  // ── Stop pulse after first open ──────────────────────────────────────────
  useEffect(() => {
    if (isOpen) setShowPulse(false);
  }, [isOpen]);

  // ── Open chat with welcome message ───────────────────────────────────────
  const openChat = useCallback(() => {
    dismissGreeting();
    setIsOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      const welcome: Message = {
        id: generateId(),
        text: WELCOME_TEXT,
        sender: 'bot',
        timestamp: Date.now(),
      };
      setMessages([welcome]);
    }
  }, [dismissGreeting, hasOpened]);

  const toggleChat = () => {
    if (isOpen) {
      if (!requestInFlight) setIsOpen(false);
    } else {
      openChat();
    }
  };

  // ── Send message ─────────────────────────────────────────────────────────
  const sendMessage = useCallback(async () => {
    if (requestInFlight || !inputValue.trim()) return;

    const text = inputValue.trim();
    setInputValue('');

    const userMsg: Message = {
      id: generateId(),
      text,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setRequestInFlight(true);
    setIsOnline(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          message: text,
          visitor_id: visitorId.current,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error ${response.status}`);
      }

      const data = await response.json();
      const reply = data.reply || data.response || "Sorry, I didn't get a response.";

      const botMsg: Message = {
        id: generateId(),
        text: reply,
        sender: 'bot',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('[M3Hive Chatbot] API error:', err);
      setIsOnline(false);
      const errorMsg: Message = {
        id: generateId(),
        text: "I'm having trouble connecting right now. Please try again in a moment or reach us at hello@m3hive.com.",
        sender: 'bot',
        timestamp: Date.now(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
      setRequestInFlight(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [inputValue, requestInFlight]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      pointerId: e.pointerId,
      startPointerX: e.clientX,
      startPointerY: e.clientY,
      startPosition: positionRef.current,
      hasMoved: false,
    };
    suppressClickRef.current = false;
    setIsSettling(false);
  };

  const getDraggedPosition = (clientX: number, clientY: number): WidgetPosition => {
    const drag = dragRef.current;
    if (!drag) return positionRef.current;

    return clampPosition({
      x: drag.startPosition.x + clientX - drag.startPointerX,
      y: drag.startPosition.y + clientY - drag.startPointerY,
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    const distance = Math.hypot(e.clientX - drag.startPointerX, e.clientY - drag.startPointerY);
    if (!drag.hasMoved && distance < 5) return;

    if (!drag.hasMoved) {
      drag.hasMoved = true;
      suppressClickRef.current = true;
      dismissGreeting();
      setIsDragging(true);
    }

    e.preventDefault();
    pendingPositionRef.current = getDraggedPosition(e.clientX, e.clientY);
    if (animationFrameRef.current === null) {
      animationFrameRef.current = requestAnimationFrame(() => {
        if (pendingPositionRef.current) applyPosition(pendingPositionRef.current);
        animationFrameRef.current = null;
      });
    }
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLButtonElement>, cancelled = false) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (drag.hasMoved) {
      const finalPosition = cancelled ? positionRef.current : getDraggedPosition(e.clientX, e.clientY);
      applyPosition(finalPosition);
      setPosition(finalPosition);
      setIsSettling(true);

      try {
        localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(finalPosition));
      } catch {
        // Ignore unavailable storage.
      }

      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }

    pendingPositionRef.current = null;
    dragRef.current = null;
    setIsDragging(false);

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleToggleClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    toggleChat();
  };

  return (
    <>
      <style>{`
        .m3-widget {
          position: fixed;
          inset: 0;
          z-index: 2147483000;
          font-family: 'Manrope', sans-serif;
          pointer-events: none;
        }
        .m3-chat-window {
          position: fixed;
          width: min(380px, calc(100vw - 24px));
          height: min(560px, calc(100dvh - 24px));
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          background: rgba(12, 12, 12, 0.9);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(253, 207, 9, 0.18);
          border-radius: 20px;
          box-shadow: 0 32px 64px -12px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06);
          overflow: hidden;
          transform-origin: bottom right;
          transition: opacity 0.32s cubic-bezier(0.19,1,0.22,1), transform 0.32s cubic-bezier(0.19,1,0.22,1), visibility 0.32s;
        }
        .m3-chat-window--closed {
          opacity: 0;
          transform: scale(0.82) translateY(24px);
          visibility: hidden;
          pointer-events: none;
        }
        .m3-chat-window--open {
          opacity: 1;
          transform: scale(1) translateY(0);
          visibility: visible;
          pointer-events: all;
        }
        .m3-chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(253,207,9,0.12);
          background: rgba(253,207,9,0.04);
          flex-shrink: 0;
        }
        .m3-chat-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .m3-chat-logo {
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .m3-chat-logo img {
          height: 100%;
          width: auto;
          object-fit: contain;
        }
        .m3-chat-title-group {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .m3-chat-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #FFFFFF;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .m3-chat-subtitle {
          font-size: 11px;
          color: rgba(255,255,255,0.45);
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .m3-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
        }
        .m3-status-dot--offline { background: #ef4444; }
        .m3-chat-close-btn {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.55);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.18s ease;
          flex-shrink: 0;
        }
        .m3-chat-close-btn:hover {
          background: rgba(255,255,255,0.12);
          color: #FFFFFF;
          border-color: rgba(255,255,255,0.2);
        }
        .m3-chat-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: rgba(253,207,9,0.2) transparent;
        }
        .m3-chat-body::-webkit-scrollbar { width: 4px; }
        .m3-chat-body::-webkit-scrollbar-thumb { background: rgba(253,207,9,0.25); border-radius: 4px; }
        .m3-chat-msg {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          animation: m3FadeSlideIn 0.28s cubic-bezier(0.19,1,0.22,1) forwards;
        }
        .m3-chat-msg--user { flex-direction: row-reverse; }
        @keyframes m3FadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .m3-chat-avatar {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .m3-chat-avatar--bot {
          background: linear-gradient(135deg, #FDCF09 0%, #F69822 100%);
          color: #0A0A0A;
        }
        .m3-chat-avatar--user {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.7);
        }
        .m3-chat-bubble {
          max-width: 78%;
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 13.5px;
          line-height: 1.55;
          word-break: break-word;
        }
        .m3-chat-bubble--bot {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.88);
          border-bottom-left-radius: 4px;
        }
        .m3-chat-bubble--user {
          background: linear-gradient(135deg, #FDCF09 0%, #F69822 100%);
          color: #0A0A0A;
          font-weight: 500;
          border-bottom-right-radius: 4px;
          box-shadow: 0 4px 14px rgba(253,207,9,0.25);
        }
        .m3-chat-bubble--error {
          background: rgba(239,68,68,0.1) !important;
          border-color: rgba(239,68,68,0.2) !important;
          color: rgba(255,180,180,0.9) !important;
        }
        .m3-typing-dots {
          display: flex;
          gap: 4px;
          align-items: center;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 12px 16px;
          border-radius: 14px;
          border-bottom-left-radius: 4px;
        }
        .m3-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(253,207,9,0.7);
          animation: m3DotBounce 1.2s ease-in-out infinite;
        }
        .m3-dot:nth-child(2) { animation-delay: 0.2s; }
        .m3-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes m3DotBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        .m3-chat-footer {
          padding: 12px 16px;
          border-top: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.02);
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .m3-chat-input-row {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 6px 6px 6px 14px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .m3-chat-input-row:focus-within {
          border-color: rgba(253,207,9,0.4);
          box-shadow: 0 0 0 3px rgba(253,207,9,0.08);
        }
        .m3-chat-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #FFFFFF;
          font-family: 'Manrope', sans-serif;
          font-size: 13.5px;
          line-height: 1.4;
        }
        .m3-chat-input::placeholder { color: rgba(255,255,255,0.35); }
        .m3-chat-input:disabled { opacity: 0.5; cursor: not-allowed; }
        .m3-chat-send-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: linear-gradient(135deg, #FDCF09 0%, #F69822 100%);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0A0A0A;
          transition: all 0.18s ease;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(253,207,9,0.3);
        }
        .m3-chat-send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 14px rgba(253,207,9,0.45);
        }
        .m3-chat-send-btn:active:not(:disabled) { transform: scale(0.96); }
        .m3-chat-send-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .m3-chat-footer-caption {
          text-align: center;
          font-size: 10.5px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.01em;
        }
        .m3-proactive-greeting {
          position: fixed;
          width: min(300px, calc(100vw - 24px));
          min-height: 92px;
          box-sizing: border-box;
          display: flex;
          overflow: hidden;
          pointer-events: auto;
          color: #FFFFFF;
          background: linear-gradient(145deg, rgba(24,24,22,0.94), rgba(8,8,8,0.9));
          backdrop-filter: blur(24px) saturate(165%);
          -webkit-backdrop-filter: blur(24px) saturate(165%);
          border: 1px solid rgba(253,207,9,0.3);
          border-radius: 18px;
          box-shadow: 0 20px 54px rgba(0,0,0,0.52), 0 0 24px rgba(253,207,9,0.08), inset 0 1px 0 rgba(255,255,255,0.08);
          isolation: isolate;
          transform-origin: bottom right;
          animation: m3GreetingIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        .m3-proactive-greeting::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background: radial-gradient(circle at 12% 10%, rgba(253,207,9,0.11), transparent 38%);
        }
        .m3-proactive-greeting--exiting {
          pointer-events: none;
          animation: m3GreetingOut 0.36s cubic-bezier(0.4,0,1,1) both;
        }
        @keyframes m3GreetingIn {
          from { opacity: 0; transform: translateY(14px) scale(0.96); filter: blur(3px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes m3GreetingOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(10px) scale(0.96); }
        }
        .m3-greeting-main {
          appearance: none;
          width: 100%;
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 16px 42px 16px 16px;
          border: 0;
          background: transparent;
          color: inherit;
          text-align: left;
          font: inherit;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .m3-greeting-main:hover {
          background: rgba(253,207,9,0.035);
        }
        .m3-greeting-main:focus-visible,
        .m3-greeting-dismiss:focus-visible {
          outline: 2px solid rgba(253,207,9,0.85);
          outline-offset: -3px;
        }
        .m3-greeting-ai {
          position: relative;
          width: 34px;
          height: 34px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          color: #090909;
          background: linear-gradient(135deg, #FDCF09, #F69822);
          box-shadow: 0 6px 18px rgba(253,207,9,0.22);
        }
        .m3-greeting-ai::before {
          content: '';
          position: absolute;
          inset: -5px;
          border: 1px solid rgba(253,207,9,0.5);
          border-radius: 14px;
          animation: m3GreetingPulse 1.8s ease-out infinite;
        }
        @keyframes m3GreetingPulse {
          0% { opacity: 0.75; transform: scale(0.88); }
          75%, 100% { opacity: 0; transform: scale(1.3); }
        }
        .m3-greeting-content {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .m3-greeting-eyebrow {
          color: rgba(253,207,9,0.72);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.12em;
          line-height: 1;
          text-transform: uppercase;
        }
        .m3-greeting-copy {
          color: rgba(255,255,255,0.92);
          font-size: 13.5px;
          font-weight: 500;
          line-height: 1.48;
        }
        .m3-greeting-dots {
          height: 22px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .m3-greeting-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(253,207,9,0.82);
          animation: m3GreetingDot 1s ease-in-out infinite;
        }
        .m3-greeting-dot:nth-child(2) { animation-delay: 0.14s; }
        .m3-greeting-dot:nth-child(3) { animation-delay: 0.28s; }
        @keyframes m3GreetingDot {
          0%, 60%, 100% { opacity: 0.35; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
        .m3-greeting-dismiss {
          position: absolute;
          top: 9px;
          right: 9px;
          width: 25px;
          height: 25px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: rgba(255,255,255,0.38);
          cursor: pointer;
          transition: color 0.18s ease, background 0.18s ease;
        }
        .m3-greeting-dismiss:hover {
          color: #FFFFFF;
          background: rgba(255,255,255,0.08);
        }
        .m3-fab-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 58px;
          height: 58px;
          pointer-events: auto;
          will-change: transform;
          user-select: none;
          -webkit-user-select: none;
        }
        .m3-fab-pulse {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid rgba(253,207,9,0.5);
          animation: m3PulseRing 2.2s ease-out infinite;
        }
        .m3-fab-pulse--hidden { display: none; }
        @keyframes m3PulseRing {
          0%   { transform: scale(1);    opacity: 0.8; }
          70%  { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        .m3-fab-btn {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FDCF09 0%, #F69822 100%);
          border: none;
          cursor: grab;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0A0A0A;
          box-shadow: 0 8px 24px rgba(253,207,9,0.4), 0 2px 8px rgba(0,0,0,0.3);
          transition: all 0.22s cubic-bezier(0.19,1,0.22,1);
          position: relative;
          z-index: 1;
          touch-action: none;
          -webkit-tap-highlight-color: transparent;
        }
        .m3-fab-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 12px 32px rgba(253,207,9,0.5), 0 4px 12px rgba(0,0,0,0.35);
        }
        .m3-fab-btn:active { transform: scale(0.95); }
        .m3-fab-wrapper--dragging .m3-fab-btn,
        .m3-fab-wrapper--dragging .m3-fab-btn:hover,
        .m3-fab-wrapper--dragging .m3-fab-btn:active {
          cursor: grabbing;
          transform: scale(1.03);
          transition-duration: 0.08s;
        }
        .m3-fab-wrapper--settling .m3-fab-btn {
          animation: m3FabSpring 0.48s cubic-bezier(0.2, 1.5, 0.4, 1);
        }
        @keyframes m3FabSpring {
          0% { transform: scale(1.03); }
          45% { transform: scale(0.92); }
          72% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        .m3-fab-icon {
          transition: transform 0.22s cubic-bezier(0.19,1,0.22,1), opacity 0.15s ease;
          position: absolute;
        }
        .m3-fab-icon--hidden {
          opacity: 0;
          transform: scale(0.5) rotate(45deg);
          pointer-events: none;
        }
        .m3-fab-icon--visible {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        .m3-fab-icon--chat.m3-fab-icon--visible {
          animation: m3IconFloat 3.2s ease-in-out infinite;
        }
        @keyframes m3IconFloat {
          0%, 100% { transform: scale(1) rotate(0deg) translateY(0); }
          50% { transform: scale(1) rotate(0deg) translateY(-2px); }
        }
        @media (max-width: 480px) {
          .m3-chat-window {
            width: calc(100vw - 24px);
            height: calc(100dvh - 100px);
            border-radius: 18px;
          }
          .m3-proactive-greeting {
            width: min(280px, calc(100vw - 24px));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .m3-proactive-greeting,
          .m3-proactive-greeting--exiting,
          .m3-greeting-ai::before,
          .m3-greeting-dot,
          .m3-fab-icon--chat.m3-fab-icon--visible {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>

      <div className="m3-widget" role="complementary" aria-label="M3Hive AI Assistant">
        {/* Chat window */}
        <div
          ref={chatWindowRef}
          className={`m3-chat-window ${isOpen ? 'm3-chat-window--open' : 'm3-chat-window--closed'}`}
          aria-hidden={!isOpen}
        >
          {/* Header */}
          <div className="m3-chat-header">
            <div className="m3-chat-brand">
              <div className="m3-chat-logo" aria-hidden="true">
                <img src="/assets/brand/m3hive-logo.png" alt="M3Hive Logo" />
              </div>
              <div className="m3-chat-title-group">
                <span className="m3-chat-title">M3Hive Assistant</span>
                <span className="m3-chat-subtitle">
                  <span className={`m3-status-dot ${isOnline ? '' : 'm3-status-dot--offline'}`} />
                  {isOnline ? 'Online · AI-Powered' : 'Connection issue'}
                  {!isOnline && <WifiOff size={10} />}
                </span>
              </div>
            </div>
            <button
              className="m3-chat-close-btn"
              onClick={() => { if (!requestInFlight) setIsOpen(false); }}
              aria-label="Close chat"
              id="m3hive-chat-close-btn"
            >
              <X size={15} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="m3-chat-body"
            ref={bodyRef}
            id="m3hive-chat-body"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isTyping && <TypingIndicator />}
          </div>

          {/* Input footer */}
          <div className="m3-chat-footer">
            <div className="m3-chat-input-row">
              <input
                ref={inputRef}
                id="m3hive-chat-input"
                type="text"
                className="m3-chat-input"
                placeholder="Type your message…"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={requestInFlight}
                autoComplete="off"
                aria-label="Chat message input"
                maxLength={1000}
              />
              <button
                id="m3hive-chat-send-btn"
                className="m3-chat-send-btn"
                onClick={sendMessage}
                disabled={requestInFlight || !inputValue.trim()}
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>
            <p className="m3-chat-footer-caption">Powered by M3Hive AI · hello@m3hive.com</p>
          </div>
        </div>

        {greetingPhase !== 'hidden' && (
          <div
            ref={greetingRef}
            className={`m3-proactive-greeting ${greetingPhase === 'exiting' ? 'm3-proactive-greeting--exiting' : ''}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <button
              type="button"
              className="m3-greeting-main"
              onClick={openChat}
              aria-label="Open M3Hive Assistant"
            >
              <span className="m3-greeting-ai" aria-hidden="true">
                <Bot size={17} />
              </span>
              <span className="m3-greeting-content">
                <span className="m3-greeting-eyebrow">M3Hive AI Assistant</span>
                {!greetingMessageReady ? (
                  <span className="m3-greeting-dots" aria-label="Assistant is typing">
                    <span className="m3-greeting-dot" />
                    <span className="m3-greeting-dot" />
                    <span className="m3-greeting-dot" />
                  </span>
                ) : (
                  <span className="m3-greeting-copy">
                    Hi 👋 Welcome to M3Hive.<br />How can I help you today?
                  </span>
                )}
              </span>
            </button>
            <button
              type="button"
              className="m3-greeting-dismiss"
              onClick={dismissGreeting}
              aria-label="Dismiss greeting"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        )}

        {/* FAB */}
        <div
          ref={fabRef}
          className={`m3-fab-wrapper ${isDragging ? 'm3-fab-wrapper--dragging' : ''} ${isSettling ? 'm3-fab-wrapper--settling' : ''}`}
          style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
          onAnimationEnd={() => setIsSettling(false)}
        >
          <span className={`m3-fab-pulse ${showPulse ? '' : 'm3-fab-pulse--hidden'}`} aria-hidden="true" />
          <button
            id="m3hive-chat-toggle-btn"
            className="m3-fab-btn"
            onClick={handleToggleClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={(e) => handlePointerEnd(e, true)}
            aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
            aria-expanded={isOpen}
            aria-controls="m3hive-chat-body"
          >
            <MessageCircle
              size={24}
              className={`m3-fab-icon m3-fab-icon--chat ${isOpen ? 'm3-fab-icon--hidden' : 'm3-fab-icon--visible'}`}
              aria-hidden="true"
            />
            <X
              size={22}
              className={`m3-fab-icon ${isOpen ? 'm3-fab-icon--visible' : 'm3-fab-icon--hidden'}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatbotWidget;
