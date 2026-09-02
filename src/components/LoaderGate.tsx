import {
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { CinematicLoader } from './CinematicLoader';

interface LoaderGateProps {
  children: ReactNode;
}

export function LoaderGate({
  children,
}: LoaderGateProps) {
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    return window.sessionStorage.getItem('m3hive-loader-seen') !== 'true';
  });

  const handleComplete = useCallback(() => {
    window.sessionStorage.setItem('m3hive-loader-seen', 'true');
    setShowLoader(false);
  }, []);

  useEffect(() => {
    if (!showLoader) {
      return;
    }

    const fallback = window.setTimeout(handleComplete, 1100);

    return () => {
      window.clearTimeout(fallback);
    };
  }, [
    handleComplete,
    showLoader,
  ]);

  return (
    <>
      {children}

      {showLoader && (
        <CinematicLoader
          onComplete={handleComplete}
        />
      )}
    </>
  );
}