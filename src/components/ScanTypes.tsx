
import React from 'react';
import { Shield, AlertTriangle, Lock, Database, Search, Code } from 'lucide-react';

const ScanTypes: React.FC = () => {
  const scanTypes = [
    {
      id: 1,
      name: 'SSL/TLS Analysis',
      description: 'Checks for certificate validity, protocol versions, and cipher suites.',
      icon: <Lock className="w-6 h-6 text-cyber-primary" />
    },
    {
      id: 2,
      name: 'XSS Detection',
      description: 'Identifies potential cross-site scripting vulnerabilities.',
      icon: <Code className="w-6 h-6 text-cyber-primary" />
    },
    {
      id: 3,
      name: 'SQL Injection',
      description: 'Tests for basic SQL injection vulnerabilities.',
      icon: <Database className="w-6 h-6 text-cyber-primary" />
    },
    {
      id: 4,
      name: 'Port Scanning',
      description: 'Identifies open ports and services.',
      icon: <Search className="w-6 h-6 text-cyber-primary" />
    },
    {
      id: 5,
      name: 'Security Headers',
      description: 'Checks for missing or misconfigured HTTP security headers.',
      icon: <Shield className="w-6 h-6 text-cyber-primary" />
    },
    {
      id: 6,
      name: 'Clickjacking',
      description: 'Tests for X-Frame-Options and frame protection.',
      icon: <AlertTriangle className="w-6 h-6 text-cyber-primary" />
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
      {scanTypes.map((type) => (
        <div key={type.id} className="cyber-panel p-4 h-full">
          <div className="flex items-start">
            <div className="mr-3 mt-1">{type.icon}</div>
            <div>
              <h3 className="text-cyber-primary font-bold mb-1">{type.name}</h3>
              <p className="text-sm text-cyber-foreground/70">{type.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScanTypes;
