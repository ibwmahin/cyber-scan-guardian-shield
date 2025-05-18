
import { ScanResult, Vulnerability } from '../types/scan';

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Mock vulnerabilities database
const vulnerabilitiesDatabase: Record<string, Vulnerability[]> = {
  'ssl': [
    {
      id: 'ssl-1',
      name: 'Outdated SSL/TLS Protocol',
      description: 'The server supports outdated SSL/TLS protocols that contain known vulnerabilities.',
      severity: 'high',
      details: 'Detected: SSL 3.0, TLS 1.0\nThese protocols have known vulnerabilities such as POODLE and BEAST.',
      remediation: 'Disable SSL 3.0, TLS 1.0, and TLS 1.1. Only enable TLS 1.2 and TLS 1.3.'
    },
    {
      id: 'ssl-2',
      name: 'Weak Cipher Suites',
      description: 'The server supports cipher suites that are considered weak or insecure.',
      severity: 'medium',
      details: 'Detected: TLS_RSA_WITH_AES_128_CBC_SHA, TLS_RSA_WITH_3DES_EDE_CBC_SHA',
      remediation: 'Disable weak cipher suites and only enable strong ciphers with forward secrecy.'
    }
  ],
  'headers': [
    {
      id: 'headers-1',
      name: 'Missing Content Security Policy',
      description: 'The Content Security Policy (CSP) header is not set.',
      severity: 'medium',
      details: 'No Content-Security-Policy header found in the response.',
      remediation: 'Implement a Content Security Policy header to prevent XSS and data injection attacks.'
    },
    {
      id: 'headers-2',
      name: 'X-Frame-Options Header Not Set',
      description: 'The X-Frame-Options header is not set, potentially allowing clickjacking attacks.',
      severity: 'low',
      details: 'No X-Frame-Options header found in the response.',
      remediation: 'Add the X-Frame-Options header with a value of DENY or SAMEORIGIN to prevent clickjacking.'
    },
    {
      id: 'headers-3',
      name: 'HSTS Header Not Set',
      description: 'HTTP Strict Transport Security header is not set.',
      severity: 'medium',
      details: 'No Strict-Transport-Security header found in the response.',
      remediation: 'Add the Strict-Transport-Security header to enforce HTTPS connections.'
    }
  ],
  'xss': [
    {
      id: 'xss-1',
      name: 'Potential Cross-Site Scripting (XSS)',
      description: 'Identified input fields that may be vulnerable to Cross-Site Scripting attacks.',
      severity: 'high',
      details: 'Found 3 input fields without proper output encoding or validation.\nPotentially vulnerable parameters: q, search, comment',
      remediation: 'Implement proper input validation and output encoding on all user inputs. Consider using an XSS protection library.'
    }
  ],
  'sql': [
    {
      id: 'sql-1',
      name: 'Potential SQL Injection',
      description: 'The application may be vulnerable to SQL injection attacks.',
      severity: 'high',
      details: 'Test payload "1\' OR \'1\'=\'1" returned different response indicating potential vulnerability.',
      remediation: 'Use parameterized queries or prepared statements instead of concatenating SQL strings. Implement input validation.'
    }
  ],
  'ports': [
    {
      id: 'ports-1',
      name: 'Unnecessary Open Ports',
      description: 'Several ports are open that might not be required for the application.',
      severity: 'low',
      details: 'Open ports: 22 (SSH), 80 (HTTP), 443 (HTTPS), 3306 (MySQL)',
      remediation: 'Close unnecessary ports and restrict access to administrative services.'
    }
  ],
  'safe': [
    {
      id: 'safe-1',
      name: 'HTTPS Properly Configured',
      description: 'The website uses HTTPS with a valid certificate.',
      severity: 'safe',
      details: 'Valid certificate issued by Let\'s Encrypt, expires in 87 days.',
      remediation: ''
    },
    {
      id: 'safe-2',
      name: 'No Open Directory Listing',
      description: 'Directory listing is properly disabled.',
      severity: 'safe',
      details: 'Attempted to access directories returned 403 Forbidden.',
      remediation: ''
    }
  ]
};

// Randomly select a subset of vulnerabilities for more realistic results
const getRandomVulnerabilities = (): Vulnerability[] => {
  const result: Vulnerability[] = [];
  
  // Add some random vulnerabilities based on chance
  Object.entries(vulnerabilitiesDatabase).forEach(([category, vulns]) => {
    // Different probability for each category
    const probability = {
      'ssl': 0.7,
      'headers': 0.9,
      'xss': 0.5,
      'sql': 0.3,
      'ports': 0.6,
      'safe': 0.95
    }[category] || 0.5;
    
    if (Math.random() < probability) {
      // Add all vulnerabilities from this category or a random subset
      if (category === 'safe' || Math.random() < 0.3) {
        result.push(...vulns);
      } else {
        // Add only some of the vulnerabilities
        const randomIndex = Math.floor(Math.random() * vulns.length);
        result.push(vulns[randomIndex]);
      }
    }
  });
  
  return result;
};

// Calculate summary counts
const calculateSummary = (vulnerabilities: Vulnerability[]) => {
  return vulnerabilities.reduce(
    (summary, vuln) => {
      summary[vuln.severity] += 1;
      return summary;
    },
    { high: 0, medium: 0, low: 0, safe: 0 }
  );
};

// Mock scanning service that returns a promise
export const scanTarget = async (target: string): Promise<ScanResult> => {
  return new Promise((resolve) => {
    // Simulate scanning delay
    setTimeout(() => {
      const vulnerabilities = getRandomVulnerabilities();
      
      const result: ScanResult = {
        id: generateId(),
        target,
        timestamp: Date.now(),
        vulnerabilities,
        summary: calculateSummary(vulnerabilities)
      };
      
      resolve(result);
    }, 5000 + Math.random() * 5000); // Random delay between 5-10 seconds
  });
};

// Save scan to local storage
export const saveScan = (scan: ScanResult): void => {
  try {
    const savedScans = getSavedScans();
    savedScans.push(scan);
    localStorage.setItem('vulnerabilityScans', JSON.stringify(savedScans));
  } catch (error) {
    console.error('Failed to save scan:', error);
  }
};

// Get all saved scans from local storage
export const getSavedScans = (): ScanResult[] => {
  try {
    const savedScans = localStorage.getItem('vulnerabilityScans');
    return savedScans ? JSON.parse(savedScans) : [];
  } catch (error) {
    console.error('Failed to retrieve saved scans:', error);
    return [];
  }
};

// Get a specific scan by ID
export const getScanById = (id: string): ScanResult | undefined => {
  const savedScans = getSavedScans();
  return savedScans.find(scan => scan.id === id);
};
