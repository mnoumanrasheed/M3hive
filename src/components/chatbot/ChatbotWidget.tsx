import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, WifiOff } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Sender = 'user' | 'bot';

interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: number;
  isError?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
const API_URL = (import.meta as any).env?.VITE_CHATBOT_API_URL || 'http://localhost:8000';
const WELCOME_TEXT =
  "Hello, welcome to M3Hive! I'm your AI assistant. How can I help you today — exploring our services, a career opportunity, or something else?";

// ─── Typing Indicator ─────────────────────────────────────────────────────────

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

// ─── Message Bubble ───────────────────────────────────────────────────────────

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

// ─── Main Widget ──────────────────────────────────────────────────────────────

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [requestInFlight, setRequestInFlight] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const visitorId = useRef(getOrCreateVisitorId());

  // ── Restore session ──────────────────────────────────────────────────────
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

  // ── Persist session ──────────────────────────────────────────────────────
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
  }, [hasOpened]);

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

  return (
    <>
      <style>{`
        .m3-widget {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          font-family: 'Manrope', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 16px;
        }
        .m3-chat-window {
          width: 380px;
          height: 560px;
          display: flex;
          flex-direction: column;
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
        .m3-fab-wrapper {
          position: relative;
          width: 58px;
          height: 58px;
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
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0A0A0A;
          box-shadow: 0 8px 24px rgba(253,207,9,0.4), 0 2px 8px rgba(0,0,0,0.3);
          transition: all 0.22s cubic-bezier(0.19,1,0.22,1);
          position: relative;
          z-index: 1;
        }
        .m3-fab-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 12px 32px rgba(253,207,9,0.5), 0 4px 12px rgba(0,0,0,0.35);
        }
        .m3-fab-btn:active { transform: scale(0.95); }
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
        @media (max-width: 480px) {
          .m3-widget {
            bottom: 20px;
            right: 16px;
            left: 16px;
            align-items: flex-end;
          }
          .m3-chat-window {
            width: 100%;
            height: calc(100dvh - 100px);
            border-radius: 18px;
          }
        }
      `}</style>

      <div className="m3-widget" role="complementary" aria-label="M3Hive AI Assistant">
        {/* Chat window */}
        <div
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

        {/* FAB */}
        <div className="m3-fab-wrapper">
          <span className={`m3-fab-pulse ${showPulse ? '' : 'm3-fab-pulse--hidden'}`} aria-hidden="true" />
          <button
            id="m3hive-chat-toggle-btn"
            className="m3-fab-btn"
            onClick={toggleChat}
            aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
            aria-expanded={isOpen}
            aria-controls="m3hive-chat-body"
          >
            <MessageCircle
              size={24}
              className={`m3-fab-icon ${isOpen ? 'm3-fab-icon--hidden' : 'm3-fab-icon--visible'}`}
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
