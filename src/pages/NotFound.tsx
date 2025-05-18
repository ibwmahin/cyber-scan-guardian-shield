
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import MatrixRain from "../components/MatrixRain";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import CyberButton from "../components/CyberButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-background relative">
      <MatrixRain density={20} opacity={0.1} />
      
      <div className="cyber-panel p-8 text-center max-w-md z-10 mx-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyber-muted mb-4">
          <AlertTriangle className="h-8 w-8 text-cyber-primary" />
        </div>
        
        <h1 className="text-5xl font-bold mb-4 cyber-text-glow text-cyber-primary">404</h1>
        <p className="text-xl text-cyber-foreground/80 mb-6">Target not found in system database</p>
        
        <div className="font-mono text-sm p-3 bg-cyber-muted/50 rounded mb-6">
          <div className="text-cyber-primary">$ locate {location.pathname}</div>
          <div className="text-red-500">locate: no matches found: {location.pathname}</div>
        </div>
        
        <Link to="/">
          <CyberButton>
            Return to Command Center
          </CyberButton>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
