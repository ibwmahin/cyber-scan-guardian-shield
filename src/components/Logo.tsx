
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="relative w-8 h-8 bg-cyber-muted cyber-border rounded-md flex items-center justify-center mr-2">
        <div className="absolute inset-0 cyber-border opacity-50 animate-pulse-glow"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-cyber-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
      </div>
      <div className="font-bold text-xl cyber-text-glow text-cyber-primary">VulnScan</div>
    </div>
  );
};

export default Logo;
