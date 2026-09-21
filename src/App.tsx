/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavigationTab } from './types';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { MonumentRecognition } from './components/MonumentRecognition';
import { DamageDetection } from './components/DamageDetection';
import { VisitPlanner } from './components/VisitPlanner';
import { CircuitMapView } from './components/CircuitMapView';
import { PitchDeckModal } from './components/PitchDeckModal';
import { MobileAccessModal } from './components/MobileAccessModal';
import { AIAssistantView } from './components/AIAssistantView';
import { FloatingAIButton } from './components/FloatingAIButton';
import { InstallModal } from './components/InstallModal';
import { Compass, Sparkles, Heart, QrCode, Bot, Download } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [lang, setLang] = useState<'en' | 'kn'>('en');
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState<boolean>(false);
  const [isMobileAccessOpen, setIsMobileAccessOpen] = useState<boolean>(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const [selectedMonumentId, setSelectedMonumentId] = useState<string>('badami_caves');

  const handleToggleLang = () => {
    setLang(prev => (prev === 'en' ? 'kn' : 'en'));
  };

  const handleNavigateToDamage = (monumentId?: string) => {
    if (monumentId) setSelectedMonumentId(monumentId);
    setCurrentTab('damage-scan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToPlanner = (monumentId?: string) => {
    if (monumentId) setSelectedMonumentId(monumentId);
    setCurrentTab('visit-planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAIAssistant = (monumentId?: string) => {
    if (monumentId) setSelectedMonumentId(monumentId);
    setCurrentTab('ai-guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMonumentFromAnywhere = (monumentId: string) => {
    setSelectedMonumentId(monumentId);
    setCurrentTab('monuments');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5efe6] text-[#2c2018] font-sans selection:bg-[#d9a441]/30 selection:text-[#5c2a1f]">
      
      {/* Universal Header Navigation */}
      <Header 
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenPitch={() => setIsPitchDeckOpen(true)}
        onOpenMobileAccess={() => setIsMobileAccessOpen(true)}
        onOpenInstall={() => setIsInstallModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeScreen 
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectMonument={handleSelectMonumentFromAnywhere}
            onOpenPitch={() => setIsPitchDeckOpen(true)}
            onOpenMobileAccess={() => setIsMobileAccessOpen(true)}
            onOpenInstall={() => setIsInstallModalOpen(true)}
            onAskAI={handleNavigateToAIAssistant}
            lang={lang}
          />
        )}

        {currentTab === 'monuments' && (
          <MonumentRecognition 
            lang={lang}
            onNavigateToDamage={handleNavigateToDamage}
            onNavigateToPlanner={handleNavigateToPlanner}
            onNavigateToAIAssistant={handleNavigateToAIAssistant}
          />
        )}

        {currentTab === 'damage-scan' && (
          <DamageDetection 
            initialMonumentId={selectedMonumentId}
            lang={lang}
            onNavigateToMonument={() => {
              setCurrentTab('monuments');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'visit-planner' && (
          <VisitPlanner 
            initialMonumentId={selectedMonumentId}
            lang={lang}
            onNavigateToMap={() => {
              setCurrentTab('circuit-map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'circuit-map' && (
          <CircuitMapView 
            lang={lang}
            onSelectMonument={handleSelectMonumentFromAnywhere}
          />
        )}

        {currentTab === 'ai-guide' && (
          <AIAssistantView 
            lang={lang}
            initialMonumentId={selectedMonumentId}
            onNavigateToMonument={handleSelectMonumentFromAnywhere}
            onNavigateToPlanner={handleNavigateToPlanner}
            onNavigateToMap={() => {
              setCurrentTab('circuit-map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Floating Quick-Access AI Heritage Guide Button */}
      <FloatingAIButton 
        currentTab={currentTab}
        onOpenAIGuide={() => handleNavigateToAIAssistant()}
        lang={lang}
      />

      {/* Pitch Deck / Stage Presentation Modal */}
      <PitchDeckModal 
        isOpen={isPitchDeckOpen}
        onClose={() => setIsPitchDeckOpen(false)}
      />

      {/* Mobile Access QR Modal */}
      <MobileAccessModal
        isOpen={isMobileAccessOpen}
        onClose={() => setIsMobileAccessOpen(false)}
        onOpenInstall={() => setIsInstallModalOpen(true)}
        lang={lang}
      />

      {/* PWA Mobile Download / Install Modal */}
      <InstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        lang={lang}
      />

      {/* Footer */}
      <footer className="bg-[#2c2018] text-[#eadfcb] py-8 px-4 sm:px-6 lg:px-8 border-t border-[#43231b] mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#d9a441]" />
            <span className="font-heritage font-bold text-white tracking-wide">
              Badami Circuit AI Guide
            </span>
            <span className="text-[#8c571c]">|</span>
            <span>UN Tourism 2026 AI Innovation Entry</span>
          </div>

          <p className="text-center text-[#dcc8a8]/80">
            Dedicated to the conservation of Badami, Pattadakal & Aihole Chalukyan Heritage • Bagalkote, Karnataka
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsInstallModalOpen(true)}
              className="text-[#d9a441] hover:underline font-semibold cursor-pointer flex items-center gap-1.5"
              title="Download & Install Mobile App"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download App</span>
            </button>
            <span className="text-[#8c571c]">•</span>
            <button
              onClick={() => handleNavigateToAIAssistant()}
              className="text-[#d9a441] hover:underline font-semibold cursor-pointer flex items-center gap-1.5"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Guide</span>
            </button>
            <span className="text-[#8c571c]">•</span>
            <button
              onClick={() => setIsMobileAccessOpen(true)}
              className="text-[#d9a441] hover:underline font-semibold cursor-pointer flex items-center gap-1.5"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Mobile QR</span>
            </button>
            <span className="text-[#8c571c]">•</span>
            <button
              onClick={() => setIsPitchDeckOpen(true)}
              className="text-[#d9a441] hover:underline font-semibold cursor-pointer"
            >
              Pitch Architecture
            </button>
            <span className="text-[#8c571c]">•</span>
            <button
              onClick={handleToggleLang}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {lang === 'kn' ? 'English' : 'ಕನ್ನಡ'}
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
}
