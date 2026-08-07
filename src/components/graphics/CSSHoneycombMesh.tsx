import React from 'react';

export const CSSHoneycombMesh: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={['absolute inset-0 z-0 overflow-hidden opacity-30', className].join(' ')}
      aria-hidden="true"
    >
      <div className="absolute inset-0 hive-hex-bg bg-repeat animate-[fade-in_2s_ease-out]" />
      <div className="absolute inset-0 bg-gradient-to-b from-hive-white via-transparent to-hive-white" />
      <div className="absolute inset-0 bg-gradient-to-r from-hive-white via-transparent to-hive-white" />
    </div>
  );
};
