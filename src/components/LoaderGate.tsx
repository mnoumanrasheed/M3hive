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
  /*
   * Loader starts on every full browser load/refresh.
   *
   * F5 / Ctrl+R / new visit:
   * loader will run.
   *
   * Internal React navigation:
   * loader will NOT run again.
   */
  const [showLoader, setShowLoader] = useState(true);

  /*
   * This function is called ONLY after
   * CinematicLoader has completed its final fade-out.
   */
  const handleComplete = useCallback(() => {
    setShowLoader(false);
  }, []);

  /*
   * IMPORTANT:
   * Do not render the website underneath the loader.
   *
   * While loader is active, render ONLY the loader.
   */
  if (showLoader) {
    return (
      <CinematicLoader
        onComplete={handleComplete}
      />
    );
  }

  /*
   * Loader has completely finished.
   * Now render the website.
   */
  return <>{children}</>;
}