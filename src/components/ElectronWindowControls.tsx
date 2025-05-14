
import React from 'react';
import { useElectron } from '@/hooks/useElectron';

const ElectronWindowControls: React.FC = () => {
  const { isElectron, platform } = useElectron();

  if (!isElectron) {
    return null;
  }

  const isMac = platform === 'darwin';

  // Only show these controls on Windows/Linux (macOS has its own)
  if (isMac) {
    return null;
  }

  // Simple window control buttons for Windows/Linux
  return (
    <div className="electron-window-controls flex items-center gap-2 fixed top-3 right-3 z-50">
      <button 
        onClick={() => (window as any).electron?.minimizeWindow?.()}
        className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"
        aria-label="Minimize"
      />
      <button 
        onClick={() => (window as any).electron?.maximizeWindow?.()}
        className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors"
        aria-label="Maximize"
      />
      <button 
        onClick={() => (window as any).electron?.closeWindow?.()}
        className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"
        aria-label="Close"
      />
    </div>
  );
};

export default ElectronWindowControls;
