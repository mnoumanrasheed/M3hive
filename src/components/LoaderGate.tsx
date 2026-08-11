import {
  type ReactNode,
  useCallback,
  useState,
} from 'react';

import { CinematicLoader } from './CinematicLoader';

interface LoaderGateProps {
  children: ReactNode;
}

export function LoaderGate({
  children,
}: LoaderGateProps) {
  const [showLoader, setShowLoader] = useState(true);

  const handleComplete = useCallback(() => {
    setShowLoader(false);
  }, []);

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