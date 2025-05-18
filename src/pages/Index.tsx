
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ScannerForm from '../components/ScannerForm';
import ScanTypes from '../components/ScanTypes';
import ScanningAnimation from '../components/ScanningAnimation';
import ScanResults from '../components/ScanResults';
import ScanHistory from '../components/ScanHistory';
import { scanTarget, saveScan, getSavedScans } from '../services/scannerService';
import { ScanResult } from '../types/scan';
import MatrixRain from '../components/MatrixRain';
import { AlertTriangle } from 'lucide-react';
import CyberButton from '../components/CyberButton';

const Index = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanningTarget, setScanningTarget] = useState('');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [recentScans, setRecentScans] = useState<ScanResult[]>([]);

  // Load saved scans on mount
  useEffect(() => {
    const savedScans = getSavedScans();
    setRecentScans(savedScans.slice(0, 6)); // Show only the 6 most recent scans
  }, []);

  const handleScanStart = async (target: string) => {
    setIsScanning(true);
    setScanningTarget(target);
    setScanResult(null);
    
    try {
      const result = await scanTarget(target);
      
      // Save the scan to local storage
      saveScan(result);
      
      // Update the scan result and recent scans
      setScanResult(result);
      setRecentScans(prev => [result, ...prev].slice(0, 6));
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const handleNewScan = () => {
    setScanResult(null);
  };

  const handleSelectHistoryScan = (scan: ScanResult) => {
    setScanResult(scan);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative">
      <MatrixRain density={15} opacity={0.07} />
      
      <Navbar />
      
      <main className="container px-4 py-4 pb-16 relative z-10">
        {/* Hero section */}
        {!isScanning && !scanResult && (
          <div className="text-center py-10 md:py-16 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold cyber-text-glow mb-4 text-cyber-primary">
              Vulnerability Scanner
            </h1>
            <p className="text-xl mb-6 text-cyber-foreground/90">
              Identify security vulnerabilities and misconfigurations in web applications
            </p>
            
            <div className="flex items-center justify-center mb-8">
              <div className="cyber-panel px-4 py-2 flex items-center">
                <AlertTriangle className="text-yellow-400 w-5 h-5 mr-2" />
                <p className="text-sm">
                  This tool is for educational purposes only. Do not scan websites without permission.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a href="#scanner" className="inline-block">
                <CyberButton size="lg">Start Scanning</CyberButton>
              </a>
              <a 
                href="https://github.com/your-username/vulnerability-scanner"
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-block"
              >
                <CyberButton variant="outline" size="lg">View on GitHub</CyberButton>
              </a>
            </div>
          </div>
        )}
        
        {/* Scanner section */}
        <section id="scanner" className="max-w-4xl mx-auto">
          {!isScanning && !scanResult && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center text-cyber-primary">
                Enter a target to scan
              </h2>
              <ScannerForm onScan={handleScanStart} isScanning={isScanning} />
            </>
          )}
          
          {isScanning && (
            <ScanningAnimation 
              target={scanningTarget}
              onScanComplete={() => {}}
            />
          )}
          
          {scanResult && (
            <ScanResults 
              scanResult={scanResult} 
              onNewScan={handleNewScan}
            />
          )}
        </section>
        
        {/* Only show scan types on landing page */}
        {!isScanning && !scanResult && (
          <section className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center text-cyber-primary">
              Security Checks Performed
            </h2>
            <ScanTypes />
          </section>
        )}
        
        {/* Show recent scans */}
        {!isScanning && recentScans.length > 0 && (
          <section className="max-w-4xl mx-auto">
            <ScanHistory 
              scans={recentScans}
              onSelectScan={handleSelectHistoryScan}
            />
          </section>
        )}
      </main>
      
      <footer className="py-6 border-t border-cyber-muted/30 text-center text-cyber-foreground/60 text-sm">
        <div className="container">
          <p>Vulnerability Scanner | Created for educational purposes | MIT License</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
