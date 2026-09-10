import {
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { CinematicLoader } from './CinematicLoader';

// Module-level flag: false on every fresh page load / hard refresh,
// stays true during SPA navigation so the loader only plays once per load.
let loaderHasPlayed = false;

interface LoaderGateProps {
  children: ReactNode;
}

export function LoaderGate({ children }: LoaderGateProps) {
  const [showLoader, setShowLoader] = useState(() => !loaderHasPlayed);

  const handleComplete = useCallback(() => {
    loaderHasPlayed = true;
    setShowLoader(false);
  }, []);

  // Safety fallback — if GSAP somehow never fires onComplete
  useEffect(() => {
    if (!showLoader) return;
    const fallback = window.setTimeout(handleComplete, 5000);
    return () => window.clearTimeout(fallback);
  }, [handleComplete, showLoader]);

  return (
    <>
      {children}
      {showLoader && <CinematicLoader onComplete={handleComplete} />}
    </>
  );
}
