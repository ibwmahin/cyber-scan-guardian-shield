
import React, { useState, useEffect } from 'react';
import TerminalAnimation from './TerminalAnimation';

interface ScanningAnimationProps {
  target: string;
  onScanComplete: () => void;
}

const ScanningAnimation: React.FC<ScanningAnimationProps> = ({ target, onScanComplete }) => {
  const [progress, setProgress] = useState(0);
  
  const scanMessages = [
    `Initializing scan for target: ${target}`,
    "Performing DNS lookups...",
    "Checking open ports (21, 22, 80, 443)...",
    "Analyzing SSL/TLS configuration...",
    "Testing for XSS vulnerabilities...",
    "Probing for SQL injection points...",
    "Checking security headers...",
    "Testing for clickjacking protection...",
    "Analyzing content security policy...",
    "Scan complete. Generating report..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onScanComplete();
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onScanComplete]);

  return (
    <div className="cyber-panel p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-cyber-primary cyber-text-glow mb-2">
          Scanning Target
        </h2>
        <p className="text-cyber-foreground/70">
          Please wait while we analyze {target}
        </p>
      </div>
      
      <div className="matrix-effect">
        <div className="scan-line"></div>
        <TerminalAnimation 
          messages={scanMessages} 
          typingSpeed={40} 
          className="mb-6"
        />
      </div>
      
      <div className="mt-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Scanning Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-cyber-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyber-primary"
            style={{ width: `${progress}%`, transition: "width 0.2s ease-out" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ScanningAnimation;
