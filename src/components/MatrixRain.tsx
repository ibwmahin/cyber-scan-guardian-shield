
import React, { useRef, useEffect, useState } from 'react';

interface MatrixRainProps {
  density?: number;
  speed?: number;
  opacity?: number;
  color?: string;
  className?: string;
}

const MatrixRain: React.FC<MatrixRainProps> = ({
  density = 15,
  speed = 50,
  opacity = 0.05,
  color = "#0CD5C2",
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { offsetWidth, offsetHeight } = canvasRef.current.parentElement || document.body;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    const fontSize = 12;
    const columns = Math.floor(dimensions.width / fontSize);
    
    const yPositions = Array(columns).fill(0);
    
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    
    const drawMatrix = () => {
      if (!ctx) return;
      
      // Create a slightly transparent black rectangle to gradually fade previous characters
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < yPositions.length; i++) {
        // Randomly decide whether to render this column in this frame
        if (Math.random() > 1 - density / 100) {
          const charIndex = Math.floor(Math.random() * chars.length);
          const char = chars[charIndex];
          
          // Varying opacity for depth effect
          const individualOpacity = (Math.random() * 0.5 + 0.5) * opacity;
          ctx.fillStyle = color.replace(')', `, ${individualOpacity})`);
          
          const x = i * fontSize;
          const y = yPositions[i] * fontSize;
          
          ctx.fillText(char, x, y);
          
          if (y > canvas.height && Math.random() > 0.975) {
            yPositions[i] = 0;
          } else {
            yPositions[i]++;
          }
        }
      }
    };
    
    const intervalId = setInterval(drawMatrix, speed);
    
    return () => clearInterval(intervalId);
  }, [dimensions, density, speed, opacity, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
    />
  );
};

export default MatrixRain;
