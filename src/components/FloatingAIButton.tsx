import React from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { NavigationTab } from '../types';

interface FloatingAIButtonProps {
  currentTab: NavigationTab;
  onOpenAIGuide: () => void;
  lang: 'en' | 'kn';
}

export const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({
  currentTab,
  onOpenAIGuide,
  lang
}) => {
  // If already on the AI guide tab, don't show the floating launcher
  if (currentTab === 'ai-guide') {
    return null;
  }

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40">
      <button
        id="floating-ai-assistant-btn"
        onClick={onOpenAIGuide}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#5c2a1f] to-[#43231b] hover:from-[#43231b] hover:to-[#2c2018] text-white shadow-xl hover:shadow-2xl border-2 border-[#d9a441] transition-all duration-200 active:scale-95 cursor-pointer"
        title="Open AI Heritage Guide"
        aria-label="Ask Badami AI Assistant"
      >
        <div className="w-7 h-7 rounded-full bg-[#d9a441] text-[#2c2018] flex items-center justify-center shrink-0 shadow-xs group-hover:rotate-12 transition-transform">
          <Bot className="w-4 h-4" />
        </div>
        <div className="text-left hidden sm:block">
          <span className="text-xs font-bold block text-white leading-tight">
            {lang === 'kn' ? 'AI ಮಾರ್ಗದರ್ಶಿ' : 'Ask AI Guide'}
          </span>
          <span className="text-[10px] text-[#eadfcb] block leading-none flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#d9a441]" />
            Gemini 3.8
          </span>
        </div>
      </button>
    </div>
  );
};
