
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Github } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="cyber-panel px-4 py-3 mb-6 sticky top-0 z-10 backdrop-blur">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/your-username/vulnerability-scanner" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-cyber-foreground/70 hover:text-cyber-primary transition-colors"
          >
            <Github className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
