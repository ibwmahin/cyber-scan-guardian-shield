
import React, { useState } from 'react';
import CyberButton from './CyberButton';
import { AlertTriangle } from 'lucide-react';
import { useToast } from '../components/ui/use-toast';

interface ScannerFormProps {
  onScan: (target: string) => void;
  isScanning: boolean;
}

const ScannerForm: React.FC<ScannerFormProps> = ({ onScan, isScanning }) => {
  const [target, setTarget] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!target) {
      toast({
        title: "Error",
        description: "Please enter a domain or IP address",
        variant: "destructive",
      });
      return;
    }
    
    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    
    if (!urlPattern.test(target) && !ipPattern.test(target)) {
      toast({
        title: "Error",
        description: "Please enter a valid domain or IP address",
        variant: "destructive",
      });
      return;
    }
    
    onScan(target);
  };

  return (
    <div className="cyber-panel p-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="target" className="block text-cyber-primary font-bold">
            Enter Target URL or IP Address
          </label>
          <div className="relative">
            <input
              id="target"
              type="text"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="example.com or 192.168.1.1"
              className="w-full p-3 bg-cyber-background cyber-border border-cyber-primary/30 focus:border-cyber-primary/70 focus:ring-1 focus:ring-cyber-primary/50 text-cyber-foreground placeholder-cyber-foreground/50"
              disabled={isScanning}
            />
          </div>
        </div>

        <div className="flex items-start space-x-2 text-yellow-400 bg-yellow-400/10 p-3 rounded-md">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">
            This tool is for educational purposes only. Do not scan websites without permission.
            You are responsible for complying with applicable laws and regulations.
          </p>
        </div>

        <CyberButton
          type="submit"
          fullWidth
          isLoading={isScanning}
          disabled={isScanning}
        >
          {isScanning ? "Scanning..." : "Start Scan"}
        </CyberButton>
      </form>
    </div>
  );
};

export default ScannerForm;
