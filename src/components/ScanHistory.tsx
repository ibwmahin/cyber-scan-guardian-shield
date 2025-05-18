
import React from 'react';
import { ScanResult } from '../types/scan';
import { Shield, AlertTriangle } from 'lucide-react';

interface ScanHistoryProps {
  scans: ScanResult[];
  onSelectScan: (scan: ScanResult) => void;
}

const ScanHistory: React.FC<ScanHistoryProps> = ({ scans, onSelectScan }) => {
  if (scans.length === 0) {
    return null;
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const calculateRiskLevel = (summary: ScanResult['summary']) => {
    if (summary.high > 0) return 'high';
    if (summary.medium > 0) return 'medium';
    if (summary.low > 0) return 'low';
    return 'safe';
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4 text-cyber-primary">Recent Scans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scans.map((scan) => {
          const riskLevel = calculateRiskLevel(scan.summary);
          const riskColors = {
            high: 'border-red-500/30 hover:border-red-500/50',
            medium: 'border-orange-500/30 hover:border-orange-500/50',
            low: 'border-yellow-500/30 hover:border-yellow-500/50',
            safe: 'border-green-500/30 hover:border-green-500/50'
          };
          
          return (
            <div
              key={scan.id}
              className={`cyber-panel p-4 cursor-pointer transition-colors ${riskColors[riskLevel]}`}
              onClick={() => onSelectScan(scan)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-cyber-foreground truncate">{scan.target}</h3>
                  <div className="text-xs text-cyber-foreground/60">
                    <span>{formatDate(scan.timestamp)}</span>{' '}
                    <span>{formatTime(scan.timestamp)}</span>
                  </div>
                </div>
                
                {riskLevel !== 'safe' ? (
                  <div className="flex items-center">
                    <AlertTriangle className={`w-4 h-4 ${
                      riskLevel === 'high' ? 'text-red-500' : 
                      riskLevel === 'medium' ? 'text-orange-500' : 
                      'text-yellow-500'
                    }`} />
                  </div>
                ) : (
                  <Shield className="w-4 h-4 text-green-500" />
                )}
              </div>
              
              <div className="flex gap-2 mt-2">
                <div className="text-xs px-1.5 py-0.5 rounded bg-red-500/20 text-red-500">
                  {scan.summary.high} High
                </div>
                <div className="text-xs px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-500">
                  {scan.summary.medium} Medium
                </div>
                <div className="text-xs px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-500">
                  {scan.summary.low} Low
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScanHistory;
