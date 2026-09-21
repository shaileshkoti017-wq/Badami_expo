import React from 'react';
import { Download, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  onOpenInstallModal: () => void;
  lang?: 'en' | 'kn';
  variant?: 'header' | 'hero' | 'floating' | 'banner';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  onOpenInstallModal,
  lang = 'en',
  variant = 'header'
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  // If already running in standalone mode, hide the install button
  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (!success) {
        // Fallback to opening guided modal
        onOpenInstallModal();
      }
    } else {
      onOpenInstallModal();
    }
  };

  if (variant === 'header') {
    return (
      <button
        id="header-pwa-install-btn"
        onClick={handleClick}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#d9a441] hover:bg-[#e4b55c] text-[#2c2018] text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
        title="Download to Mobile / Install App"
        aria-label="Download to Mobile"
      >
        <Download className="w-3.5 h-3.5 stroke-[2.4]" />
        <span className="hidden sm:inline">
          {lang === 'kn' ? 'ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್' : 'Download App'}
        </span>
        <span className="sm:hidden">
          {lang === 'kn' ? 'ಆ್ಯಪ್' : 'Install'}
        </span>
      </button>
    );
  }

  if (variant === 'hero') {
    return (
      <button
        id="hero-pwa-install-btn"
        onClick={handleClick}
        className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#d9a441] to-[#c99431] hover:from-[#e4b55c] hover:to-[#d9a441] text-[#2c2018] font-bold text-sm shadow-lg flex items-center gap-2 cursor-pointer transition-transform duration-150 active:scale-95"
      >
        <Download className="w-4 h-4 stroke-[2.4]" />
        <span>{lang === 'kn' ? 'ಮೊಬೈಲ್ ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್' : 'Download to Mobile'}</span>
      </button>
    );
  }

  return null;
};
