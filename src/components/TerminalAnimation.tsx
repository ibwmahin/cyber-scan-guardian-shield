
import React, { useState, useEffect } from 'react';

interface TerminalAnimationProps {
  messages: string[];
  typingSpeed?: number;
  className?: string;
}

const TerminalAnimation: React.FC<TerminalAnimationProps> = ({
  messages,
  typingSpeed = 50,
  className = '',
}) => {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentMessageIndex >= messages.length) return;

    const message = messages[currentMessageIndex];
    
    if (currentCharIndex < message.length) {
      const timer = setTimeout(() => {
        setCurrentCharIndex(currentCharIndex + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayedMessages([...displayedMessages, message]);
        setCurrentMessageIndex(currentMessageIndex + 1);
        setCurrentCharIndex(0);
      }, typingSpeed * 3);
      
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, currentCharIndex, displayedMessages, messages, typingSpeed]);

  return (
    <div className={`terminal-window bg-black ${className}`}>
      <div className="terminal-header">
        <div className="terminal-circle bg-red-500"></div>
        <div className="terminal-circle bg-yellow-500"></div>
        <div className="terminal-circle bg-green-500"></div>
        <div className="ml-2 text-xs text-cyber-foreground/70">vulnerability_scanner</div>
      </div>
      
      <div className="terminal-content font-mono text-sm">
        {displayedMessages.map((msg, index) => (
          <div key={index} className="mb-1">
            <span className="text-cyber-primary">$ </span>
            <span>{msg}</span>
          </div>
        ))}
        
        {currentMessageIndex < messages.length && (
          <div>
            <span className="text-cyber-primary">$ </span>
            <span>{messages[currentMessageIndex].substring(0, currentCharIndex)}</span>
            <span className="animate-pulse">▋</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalAnimation;
