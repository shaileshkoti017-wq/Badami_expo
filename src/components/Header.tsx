import React from 'react';
import { 
  Camera, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  Compass, 
  Presentation,
  Languages,
  QrCode,
  Bot,
  Sparkles
} from 'lucide-react';
import { NavigationTab } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  lang: 'en' | 'kn';
  onToggleLang: () => void;
  onOpenPitch: () => void;
  onOpenMobileAccess: () => void;
  onOpenInstall?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  lang,
  onToggleLang,
  onOpenPitch,
  onOpenMobileAccess,
  onOpenInstall
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fbf8f3]/95 backdrop-blur-md border-b border-[#eadfcb] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Circuit Title */}
          <div 
            id="app-header-brand"
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#5c2a1f] to-[#8c571c] flex items-center justify-center text-[#d9a441] shadow-md group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heritage text-lg sm:text-xl font-bold tracking-tight text-[#5c2a1f]">
                  Badami Circuit
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#d9a441]/20 text-[#8c571c] border border-[#d9a441]/40">
                  AI Guide
                </span>
              </div>
              <p className="text-xs text-[#705844] hidden sm:block">
                {lang === 'kn' ? 'ಬಾದಾಮಿ–ಪಟ್ಟದಕಲ್ಲು–ಐಹೊಳೆ ಸ್ಮಾರಕ ಸಂರಕ್ಷಣಾ AI' : 'UN Tourism 2026 Heritage AI Prototype'}
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#f5efe6] p-1.5 rounded-xl border border-[#eadfcb]">
            <button
              id="nav-tab-home"
              onClick={() => onSelectTab('home')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                currentTab === 'home'
                  ? 'bg-[#5c2a1f] text-white shadow-xs'
                  : 'text-[#5c2a1f] hover:bg-[#eadfcb]/60'
              }`}
            >
              {lang === 'kn' ? 'ಮುಖ್ಯಪುಟ' : 'Home'}
            </button>

            <button
              id="nav-tab-monuments"
              onClick={() => onSelectTab('monuments')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                currentTab === 'monuments'
                  ? 'bg-[#5c2a1f] text-white shadow-xs'
                  : 'text-[#5c2a1f] hover:bg-[#eadfcb]/60'
              }`}
            >
              <Camera className="w-4 h-4 text-[#d9a441]" />
              <span>{lang === 'kn' ? 'ಗುರುತಿಸುವಿಕೆ' : 'Recognize'}</span>
            </button>

            <button
              id="nav-tab-damage"
              onClick={() => onSelectTab('damage-scan')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                currentTab === 'damage-scan'
                  ? 'bg-[#5c2a1f] text-white shadow-xs'
                  : 'text-[#5c2a1f] hover:bg-[#eadfcb]/60'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-[#2f7a6f]" />
              <span>{lang === 'kn' ? 'ಹಾನಿ ಪರಿಶೀಲನೆ' : 'Damage Scan'}</span>
            </button>

            <button
              id="nav-tab-planner"
              onClick={() => onSelectTab('visit-planner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                currentTab === 'visit-planner'
                  ? 'bg-[#5c2a1f] text-white shadow-xs'
                  : 'text-[#5c2a1f] hover:bg-[#eadfcb]/60'
              }`}
            >
              <Clock className="w-4 h-4 text-[#d9a441]" />
              <span>{lang === 'kn' ? 'ಸೂಕ್ತ ಸಮಯ' : 'Best Time'}</span>
            </button>

            <button
              id="nav-tab-map"
              onClick={() => onSelectTab('circuit-map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                currentTab === 'circuit-map'
                  ? 'bg-[#5c2a1f] text-white shadow-xs'
                  : 'text-[#5c2a1f] hover:bg-[#eadfcb]/60'
              }`}
            >
              <MapPin className="w-4 h-4 text-[#8c571c]" />
              <span>{lang === 'kn' ? 'ನಕ್ಷೆ' : 'Circuit Route'}</span>
            </button>

            <button
              id="nav-tab-ai-guide"
              onClick={() => onSelectTab('ai-guide')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 relative ${
                currentTab === 'ai-guide'
                  ? 'bg-[#5c2a1f] text-white shadow-xs'
                  : 'text-[#5c2a1f] hover:bg-[#eadfcb]/60'
              }`}
            >
              <Bot className="w-4 h-4 text-[#d9a441]" />
              <span>{lang === 'kn' ? 'AI ಮಾರ್ಗದರ್ಶಿ' : 'AI Guide'}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#d9a441] text-[#2c2018] font-bold uppercase tracking-wider">
                Live
              </span>
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Install / Download to Mobile Button */}
            {onOpenInstall && (
              <PWAInstallButton 
                onOpenInstallModal={onOpenInstall}
                lang={lang}
                variant="header"
              />
            )}

            {/* Mobile QR Access Button */}
            <button
              id="open-mobile-qr-btn"
              onClick={onOpenMobileAccess}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#f5efe6] hover:bg-[#eadfcb] border border-[#d9a441]/50 hover:border-[#d9a441] text-xs font-semibold text-[#5c2a1f] shadow-2xs transition-all duration-150 cursor-pointer"
              title="Show QR Code for Mobile Access"
            >
              <QrCode className="w-3.5 h-3.5 text-[#8c571c]" />
              <span className="hidden sm:inline">Mobile QR</span>
              <span className="sm:hidden">QR</span>
            </button>

            {/* Language Toggle Pill */}
            <button
              id="lang-toggle-btn"
              onClick={onToggleLang}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#f5efe6] hover:bg-[#eadfcb] border border-[#eadfcb] text-xs font-semibold text-[#5c2a1f] transition-colors"
              title="Toggle Kannada / English"
            >
              <Languages className="w-3.5 h-3.5 text-[#2f7a6f]" />
              <span>{lang === 'kn' ? 'ಕನ್ನಡ (KN)' : 'English (EN)'}</span>
            </button>

            {/* Pitch Deck / Judges Mode Button */}
            <button
              id="open-pitch-deck-btn"
              onClick={onOpenPitch}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#2f7a6f] to-[#25635a] hover:from-[#25635a] hover:to-[#1c4b44] text-white text-xs font-semibold shadow-xs transition-all duration-150 cursor-pointer"
            >
              <Presentation className="w-3.5 h-3.5 text-[#d9a441]" />
              <span className="hidden sm:inline">Pitch & Architecture</span>
              <span className="sm:hidden">Pitch</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-[#eadfcb] bg-[#f5efe6]/90 px-2 py-2">
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center gap-0.5 text-xs py-1 px-2 rounded-lg ${
            currentTab === 'home' ? 'text-[#5c2a1f] font-bold' : 'text-[#705844]'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => onSelectTab('monuments')}
          className={`flex flex-col items-center gap-0.5 text-xs py-1 px-2 rounded-lg ${
            currentTab === 'monuments' ? 'text-[#5c2a1f] font-bold' : 'text-[#705844]'
          }`}
        >
          <Camera className="w-4 h-4 text-[#d9a441]" />
          <span>Recognize</span>
        </button>
        <button
          onClick={() => onSelectTab('damage-scan')}
          className={`flex flex-col items-center gap-0.5 text-xs py-1 px-2 rounded-lg ${
            currentTab === 'damage-scan' ? 'text-[#5c2a1f] font-bold' : 'text-[#705844]'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-[#2f7a6f]" />
          <span>Damage</span>
        </button>
        <button
          onClick={() => onSelectTab('visit-planner')}
          className={`flex flex-col items-center gap-0.5 text-xs py-1 px-2 rounded-lg ${
            currentTab === 'visit-planner' ? 'text-[#5c2a1f] font-bold' : 'text-[#705844]'
          }`}
        >
          <Clock className="w-4 h-4 text-[#d9a441]" />
          <span>Best Time</span>
        </button>
        <button
          onClick={() => onSelectTab('circuit-map')}
          className={`flex flex-col items-center gap-0.5 text-xs py-1 px-2 rounded-lg ${
            currentTab === 'circuit-map' ? 'text-[#5c2a1f] font-bold' : 'text-[#705844]'
          }`}
        >
          <MapPin className="w-4 h-4 text-[#8c571c]" />
          <span>Route</span>
        </button>
        <button
          onClick={() => onSelectTab('ai-guide')}
          className={`flex flex-col items-center gap-0.5 text-xs py-1 px-2 rounded-lg ${
            currentTab === 'ai-guide' ? 'text-[#5c2a1f] font-bold' : 'text-[#705844]'
          }`}
        >
          <Bot className="w-4 h-4 text-[#d9a441]" />
          <span>AI Guide</span>
        </button>
      </div>
    </header>
  );
};
