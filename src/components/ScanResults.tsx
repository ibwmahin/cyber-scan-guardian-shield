
import React, { useState } from 'react';
import { ScanResult } from '../types/scan';
import VulnerabilityResult from './VulnerabilityResult';
import CyberButton from './CyberButton';
import { AlertTriangle, Check, Shield } from 'lucide-react';

interface ScanResultsProps {
  scanResult: ScanResult;
  onNewScan: () => void;
}

const ScanResults: React.FC<ScanResultsProps> = ({ scanResult, onNewScan }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'high' | 'medium' | 'low' | 'safe'>('all');
  
  const filteredVulnerabilities = activeTab === 'all' 
    ? scanResult.vulnerabilities 
    : scanResult.vulnerabilities.filter(v => v.severity === activeTab);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  const renderSeverityBadge = (count: number, severity: 'high' | 'medium' | 'low' | 'safe') => {
    const colors = {
      high: 'text-red-500 bg-red-500/20',
      medium: 'text-orange-500 bg-orange-500/20',
      low: 'text-yellow-500 bg-yellow-500/20',
      safe: 'text-green-500 bg-green-500/20'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[severity]}`}>
        {count}
      </span>
    );
  };
  
  const getSeverityIcon = (severity: 'high' | 'medium' | 'low' | 'safe') => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'low': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'safe': return <Check className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className="cyber-panel p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold cyber-text-glow text-cyber-primary">Scan Results</h2>
        <div className="flex flex-wrap items-center justify-between mt-2">
          <p className="text-cyber-foreground/70">
            Target: <span className="text-cyber-foreground">{scanResult.target}</span>
          </p>
          <p className="text-cyber-foreground/70 text-sm">
            Scan completed on {formatDate(scanResult.timestamp)}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="cyber-panel p-3 flex flex-col items-center">
          <div className="flex items-center mb-1">
            <AlertTriangle className="w-4 h-4 text-red-500 mr-1" />
            <span className="font-bold">High Risk</span>
          </div>
          <span className={`text-2xl font-bold ${scanResult.summary.high > 0 ? 'text-red-500' : 'text-cyber-foreground/50'}`}>
            {scanResult.summary.high}
          </span>
        </div>
        <div className="cyber-panel p-3 flex flex-col items-center">
          <div className="flex items-center mb-1">
            <AlertTriangle className="w-4 h-4 text-orange-500 mr-1" />
            <span className="font-bold">Medium Risk</span>
          </div>
          <span className={`text-2xl font-bold ${scanResult.summary.medium > 0 ? 'text-orange-500' : 'text-cyber-foreground/50'}`}>
            {scanResult.summary.medium}
          </span>
        </div>
        <div className="cyber-panel p-3 flex flex-col items-center">
          <div className="flex items-center mb-1">
            <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="font-bold">Low Risk</span>
          </div>
          <span className={`text-2xl font-bold ${scanResult.summary.low > 0 ? 'text-yellow-500' : 'text-cyber-foreground/50'}`}>
            {scanResult.summary.low}
          </span>
        </div>
        <div className="cyber-panel p-3 flex flex-col items-center">
          <div className="flex items-center mb-1">
            <Shield className="w-4 h-4 text-green-500 mr-1" />
            <span className="font-bold">Safe</span>
          </div>
          <span className={`text-2xl font-bold ${scanResult.summary.safe > 0 ? 'text-green-500' : 'text-cyber-foreground/50'}`}>
            {scanResult.summary.safe}
          </span>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex flex-wrap space-x-2 border-b border-cyber-muted">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-[1px] ${
              activeTab === 'all' 
                ? 'border-cyber-primary text-cyber-primary' 
                : 'border-transparent text-cyber-foreground/70 hover:text-cyber-foreground'
            }`}
          >
            All Findings ({scanResult.vulnerabilities.length})
          </button>
          
          {scanResult.summary.high > 0 && (
            <button
              onClick={() => setActiveTab('high')}
              className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-[1px] flex items-center ${
                activeTab === 'high' 
                  ? 'border-red-500 text-red-500' 
                  : 'border-transparent text-cyber-foreground/70 hover:text-cyber-foreground'
              }`}
            >
              <AlertTriangle className="w-3 h-3 mr-1" />
              High ({scanResult.summary.high})
            </button>
          )}
          
          {scanResult.summary.medium > 0 && (
            <button
              onClick={() => setActiveTab('medium')}
              className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-[1px] flex items-center ${
                activeTab === 'medium' 
                  ? 'border-orange-500 text-orange-500' 
                  : 'border-transparent text-cyber-foreground/70 hover:text-cyber-foreground'
              }`}
            >
              <AlertTriangle className="w-3 h-3 mr-1" />
              Medium ({scanResult.summary.medium})
            </button>
          )}
          
          {scanResult.summary.low > 0 && (
            <button
              onClick={() => setActiveTab('low')}
              className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-[1px] flex items-center ${
                activeTab === 'low' 
                  ? 'border-yellow-500 text-yellow-500' 
                  : 'border-transparent text-cyber-foreground/70 hover:text-cyber-foreground'
              }`}
            >
              <AlertTriangle className="w-3 h-3 mr-1" />
              Low ({scanResult.summary.low})
            </button>
          )}
          
          {scanResult.summary.safe > 0 && (
            <button
              onClick={() => setActiveTab('safe')}
              className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 -mb-[1px] flex items-center ${
                activeTab === 'safe' 
                  ? 'border-green-500 text-green-500' 
                  : 'border-transparent text-cyber-foreground/70 hover:text-cyber-foreground'
              }`}
            >
              <Check className="w-3 h-3 mr-1" />
              Safe ({scanResult.summary.safe})
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredVulnerabilities.length > 0 ? (
          filteredVulnerabilities.map(vulnerability => (
            <VulnerabilityResult 
              key={vulnerability.id} 
              vulnerability={vulnerability} 
            />
          ))
        ) : (
          <div className="text-center py-8 text-cyber-foreground/50">
            No vulnerabilities found in this category.
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center">
        <CyberButton onClick={onNewScan}>
          Run Another Scan
        </CyberButton>
      </div>
    </div>
  );
};

export default ScanResults;
