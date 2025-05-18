
export type SeverityLevel = 'high' | 'medium' | 'low' | 'safe';

export interface Vulnerability {
  id: string;
  name: string;
  description: string;
  severity: SeverityLevel;
  details: string;
  remediation: string;
}

export interface ScanResult {
  id: string;
  target: string;
  timestamp: number;
  vulnerabilities: Vulnerability[];
  summary: {
    high: number;
    medium: number;
    low: number;
    safe: number;
  };
}
