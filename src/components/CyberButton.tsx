
import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const CyberButton: React.FC<CyberButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled,
  ...props
}) => {
  const baseStyles = "relative cyber-border inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-cyber-primary/50 focus:ring-offset-2 focus:ring-offset-cyber-background disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-cyber-primary text-cyber-background hover:bg-cyber-primary/90",
    secondary: "bg-cyber-secondary text-white hover:bg-cyber-secondary/90",
    outline: "border border-cyber-primary/70 text-cyber-primary hover:bg-cyber-primary/10",
    ghost: "text-cyber-primary hover:bg-cyber-primary/10",
    danger: "bg-cyber-danger text-white hover:bg-cyber-danger/90"
  };
  
  const sizes = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4",
    lg: "py-3 px-6 text-lg"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-cyber-foreground/20 border-t-cyber-foreground rounded-full animate-spin"></div>
        </div>
      ) : null}
      <span className={cn(isLoading && "opacity-0")}>{children}</span>
    </button>
  );
};

export default CyberButton;
