
import { useState, useEffect } from 'react';

// Define the electron interface
interface ElectronAPI {
  appVersion: () => Promise<string>;
  platform: string;
}

// Declare global window property
declare global {
  interface Window {
    electron?: ElectronAPI;
  }
}

/**
 * Custom hook to detect if the app is running in Electron
 * and provide access to Electron-specific features
 */
export const useElectron = () => {
  const [isElectron, setIsElectron] = useState(false);
  const [appVersion, setAppVersion] = useState<string | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if we're running in Electron
    const electronAPI = window.electron;
    setIsElectron(!!electronAPI);
    
    if (electronAPI) {
      // Get the app version from the main process
      electronAPI.appVersion().then(setAppVersion);
      setPlatform(electronAPI.platform);
    }
  }, []);
  
  return {
    isElectron,
    appVersion,
    platform,
  };
};
