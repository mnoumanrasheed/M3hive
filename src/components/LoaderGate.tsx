import { type ReactNode, useState } from 'react';
import { CinematicLoader } from './CinematicLoader';

const LOADER_STORAGE_KEY = 'm3hive-loader-seen';

interface LoaderGateProps {
  children: ReactNode;
}

/** Shows the introductory experience once per browser session. */
export function LoaderGate({ children }: LoaderGateProps) {
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window === 'undefined') return false;
    const forceLoader = new URLSearchParams(window.location.search).get('loader') === '1';
    return forceLoader || window.sessionStorage.getItem(LOADER_STORAGE_KEY) !== 'true';
  });

  const handleComplete = () => {
    window.sessionStorage.setItem(LOADER_STORAGE_KEY, 'true');
    setShowLoader(false);
  };

  if (showLoader) return <CinematicLoader onComplete={handleComplete} />;

  return <>{children}</>;
}
