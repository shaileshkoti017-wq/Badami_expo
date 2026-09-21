import React from 'react';
import { 
  Camera, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Presentation, 
  Compass, 
  CheckCircle2, 
  Thermometer,
  Eye,
  Info,
  QrCode,
  Smartphone,
  Headphones,
  Bot,
  Download
} from 'lucide-react';
import { NavigationTab } from '../types';
import { MONUMENTS } from '../data/monuments';
import { QRCodeCard } from './QRCodeCard';

interface HomeScreenProps {
  onSelectTab: (tab: NavigationTab) => void;
  onSelectMonument: (monumentId: string) => void;
  onOpenPitch: () => void;
  onOpenMobileAccess: () => void;
  onOpenInstall?: () => void;
  onAskAI?: (monumentId?: string) => void;
  lang: 'en' | 'kn';
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectTab,
  onSelectMonument,
  onOpenPitch,
  onOpenMobileAccess,
  onOpenInstall,
  onAskAI,
  lang
}) => {
  return (
    <div className="space-y-10 pb-16">
      
      {/* Hero Visual Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#2c2018] via-[#43231b] to-[#5c2a1f] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 shadow-md">
        
        {/* Subtle decorative sandstone texture & glow */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d9a441_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            
            {/* Hackathon Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d9a441]/20 border border-[#d9a441]/40 text-[#d9a441] text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UN Tourism 2026 AI Innovation Prototype</span>
            </div>

            {/* Title */}
            <h1 className="font-heritage text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {lang === 'kn' ? (
                <>ಬಾದಾಮಿ ಸರ್ಕ್ಯೂಟ್ <span className="text-[#d9a441]">AI ಮಾರ್ಗದರ್ಶಿ</span></>
              ) : (
                <>Badami Circuit <span className="text-[#d9a441]">AI Guide</span></>
              )}
            </h1>

            <p className="font-heritage text-lg sm:text-xl text-[#dcc8a8] mt-2 font-medium">
              Badami • Aihole • Pattadakal • Mahakuta • Banashankari • Kudalasangama
            </p>

            <p className="text-sm sm:text-base text-[#f5efe6]/90 mt-4 leading-relaxed max-w-2xl">
              {lang === 'kn'
                ? 'ಚಾಲುಕ್ಯ ಸಾಮ್ರಾಜ್ಯದ 1,400 ವರ್ಷಗಳ ಐತಿಹಾಸಿಕ ಶಿಲ್ಪಕಲೆ ಗುರುತಿಸುವಿಕೆ, ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ಆಧಾರಿತ ಶಿಲಾ ಹಾನಿ ಪತ್ತೆ ಹಾಗೂ ಸೂಕ್ತ ಭೇಟಿ ಸಮಯದ ಏಕೀಕೃತ ಮೊಬೈಲ್ ತಂತ್ರಜ್ಞಾನ.'
                : 'An AI-powered tourist companion designed for the Chalukyan sandstone heritage circuit in Bagalkote, Karnataka. Combining deep vision monument recognition, explainable stone conservation triage, and sustainable visit timing in one unified flow.'}
            </p>

            {/* Hero Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <button
                id="hero-start-demo-btn"
                onClick={() => onSelectTab('monuments')}
                className="px-5 py-3 rounded-xl bg-[#d9a441] hover:bg-[#b87b28] text-[#5c2a1f] font-bold text-sm shadow-lg flex items-center gap-2 cursor-pointer transition-transform duration-150 active:scale-95"
              >
                <Camera className="w-4 h-4" />
                <span>Start Monument AI Scan</span>
              </button>

              <button
                id="hero-ai-guide-btn"
                onClick={() => onAskAI ? onAskAI() : onSelectTab('ai-guide')}
                className="px-5 py-3 rounded-xl bg-[#5c2a1f] hover:bg-[#43231b] border border-[#d9a441]/80 text-[#d9a441] font-bold text-sm shadow-lg flex items-center gap-2 cursor-pointer transition-transform duration-150 active:scale-95"
              >
                <Bot className="w-4 h-4 text-[#d9a441]" />
                <span>Ask AI Heritage Guide</span>
              </button>

              <button
                id="hero-download-app-btn"
                onClick={onOpenInstall || onOpenMobileAccess}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#d9a441] to-[#c99431] hover:from-[#e4b55c] hover:to-[#d9a441] text-[#2c2018] font-bold text-sm shadow-lg flex items-center gap-2 cursor-pointer transition-transform duration-150 active:scale-95"
              >
                <Download className="w-4 h-4 stroke-[2.4]" />
                <span>{lang === 'kn' ? 'ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್' : 'Download to Mobile'}</span>
              </button>

              <button
                id="hero-mobile-qr-btn"
                onClick={onOpenMobileAccess}
                className="px-5 py-3 rounded-xl bg-[#d9a441]/20 hover:bg-[#d9a441]/30 border border-[#d9a441]/50 text-white font-semibold text-sm backdrop-blur-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <QrCode className="w-4 h-4 text-[#d9a441]" />
                <span>Mobile Access (QR)</span>
              </button>

              <button
                id="hero-open-pitch-btn"
                onClick={onOpenPitch}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-xs flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Presentation className="w-4 h-4 text-[#d9a441]" />
                <span>Architecture</span>
              </button>
            </div>

            {/* Circuit Key Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/15">
              <div>
                <span className="text-xl sm:text-2xl font-bold font-heritage text-[#d9a441]">8</span>
                <p className="text-xs text-[#dcc8a8]">Heritage Enclaves</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold font-heritage text-[#d9a441]">3</span>
                <p className="text-xs text-[#dcc8a8]">Integrated AI Modules</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold font-heritage text-[#d9a441]">UNESCO</span>
                <p className="text-xs text-[#dcc8a8]">Pattadakal World Heritage</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-bold font-heritage text-[#d9a441]">Kannada</span>
                <p className="text-xs text-[#dcc8a8]">& English Bilingual</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THREE PROMINENT ACTION CARDS (EXPLICIT PROMPT REQUIREMENT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8c571c]">
              Core Capabilities
            </span>
          </div>
          <h2 className="font-heritage text-2xl sm:text-3xl font-bold text-[#5c2a1f]">
            Three AI Modules, One Unified Guide
          </h2>
          <p className="text-xs sm:text-sm text-[#705844]">
            Select a module to experience the live interactive prototype
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Monument Recognition */}
          <div 
            id="home-card-monument-recognition"
            onClick={() => onSelectTab('monuments')}
            className="group relative bg-[#f5efe6] rounded-2xl p-6 border-2 border-[#eadfcb] hover:border-[#d9a441] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#5c2a1f] text-[#d9a441] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#d9a441]/20 text-[#8c571c]">
                  Module 1
                </span>
              </div>

              <span className="text-xs font-semibold text-[#8c571c]">
                Smart Technology
              </span>
              <h3 className="font-heritage text-xl font-bold text-[#5c2a1f] mt-1 group-hover:text-[#8c571c] transition-colors">
                Identify a Monument
              </h3>

              <p className="text-xs text-[#705844] mt-2 leading-relaxed">
                Snap or upload any Chalukyan temple or cave carving. MobileNetV2 / EfficientNet-B0 vision classifier detects the site with top-3 fallback ranking and bilingual Kannada/English audio narration.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#eadfcb] flex items-center justify-between text-xs font-bold text-[#5c2a1f]">
              <span className="group-hover:translate-x-1 transition-transform">Test Live Camera & Samples</span>
              <ArrowRight className="w-4 h-4 text-[#d9a441] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Damage Detection */}
          <div 
            id="home-card-damage-detection"
            onClick={() => onSelectTab('damage-scan')}
            className="group relative bg-[#f5efe6] rounded-2xl p-6 border-2 border-[#eadfcb] hover:border-[#2f7a6f] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#2f7a6f] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#2f7a6f]/20 text-[#2f7a6f]">
                  Module 2
                </span>
              </div>

              <span className="text-xs font-semibold text-[#2f7a6f]">
                Open Innovation & Depth
              </span>
              <h3 className="font-heritage text-xl font-bold text-[#5c2a1f] mt-1 group-hover:text-[#2f7a6f] transition-colors">
                Check for Damage
              </h3>

              <p className="text-xs text-[#705844] mt-2 leading-relaxed">
                Explainable AI for stone conservation. Generates Grad-CAM saliency heatmaps over fractures and honeycomb erosion on 1,400-year-old sandstone, assigning ASI triage priority ratings.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#eadfcb] flex items-center justify-between text-xs font-bold text-[#2f7a6f]">
              <span className="group-hover:translate-x-1 transition-transform">Interactive Grad-CAM Slider</span>
              <ArrowRight className="w-4 h-4 text-[#2f7a6f] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Best Time to Visit */}
          <div 
            id="home-card-visit-timing"
            onClick={() => onSelectTab('visit-planner')}
            className="group relative bg-[#f5efe6] rounded-2xl p-6 border-2 border-[#eadfcb] hover:border-[#5c2a1f] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#8c571c] text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#5c2a1f]/20 text-[#5c2a1f]">
                  Module 3
                </span>
              </div>

              <span className="text-xs font-semibold text-[#8c571c]">
                Sustainable Planning
              </span>
              <h3 className="font-heritage text-xl font-bold text-[#5c2a1f] mt-1 group-hover:text-[#8c571c] transition-colors">
                Best Time to Visit
              </h3>

              <p className="text-xs text-[#705844] mt-2 leading-relaxed">
                Sustainable crowd flow management. Simulated diurnal footfall forecast curves and barefoot sandstone temperature heat advisory to protect monuments and avoid peak midday heat.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#eadfcb] flex items-center justify-between text-xs font-bold text-[#5c2a1f]">
              <span className="group-hover:translate-x-1 transition-transform">View Hourly Forecast Curve</span>
              <ArrowRight className="w-4 h-4 text-[#d9a441] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        {/* AI HERITAGE ASSISTANT SPOTLIGHT CARD */}
        <div 
          id="home-ai-assistant-banner"
          onClick={() => onAskAI ? onAskAI() : onSelectTab('ai-guide')}
          className="mt-8 bg-gradient-to-r from-[#2c2018] via-[#43231b] to-[#5c2a1f] rounded-2xl p-6 sm:p-8 text-white border-2 border-[#eadfcb]/30 shadow-md cursor-pointer group hover:border-[#d9a441] transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d9a441]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#d9a441] text-[#2c2018] flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                <Bot className="w-8 h-8 stroke-[2.2]" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#d9a441] px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20">
                    Interactive In-Depth Explorer
                  </span>
                  <span className="text-[10px] font-bold text-white/80 bg-emerald-700/60 px-2 py-0.5 rounded-full">
                    Grounded with Chalukyan Epigraphy
                  </span>
                </div>

                <h3 className="font-heritage text-xl sm:text-2xl font-bold text-white group-hover:text-[#d9a441] transition-colors">
                  {lang === 'kn' ? 'ಚಾಲುಕ್ಯ AI ಸಹಾಯಕ: ಸ್ಮಾರಕಗಳ ಆಳವಾದ ಪರಿಶೋಧನೆ' : 'Chalukya AI Assistant: Explore Monuments in Vivid Detail'}
                </h3>

                <p className="text-xs sm:text-sm text-[#eadfcb] mt-1.5 max-w-2xl leading-relaxed">
                  {lang === 'kn'
                    ? 'ಬಾದಾಮಿ ಗುಹೆಗಳ ಶಿಲ್ಪರಹಸ್ಯಗಳು, ಶಾಸನಗಳು, ದೇವಾಲಯಗಳ ವಾಸ್ತುಶಿಲ್ಪ ಹಾಗೂ ನೈಜ ಸಮಯದ ಪ್ರಯಾಣಿಕರ ಸಲಹೆಗಳನ್ನು AI ಸಹಾಯಕರೊಂದಿಗೆ ಸಂವಾದದ ಮೂಲಕ ತಿಳಿಯಿರಿ.'
                    : 'Curious about the 18-armed Nataraja mudras, the 634 CE Aihole Prashasti, Queen Lokamahadevi’s victory tribute at Pattadakal, or barefoot heat safety? Chat with our grounded AI assistant for answers and audio guides.'}
                </p>

                {/* Quick Starter Pills */}
                <div className="flex flex-wrap gap-2 mt-4 text-xs">
                  <span className="px-3 py-1 rounded-lg bg-white/10 text-[#eadfcb] border border-white/15">
                    🏛️ Decode Cave Carvings
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/10 text-[#eadfcb] border border-white/15">
                    🗺️ Custom 1-Day Itinerary
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/10 text-[#eadfcb] border border-white/15">
                    👟 Barefoot & Heat Advice
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/10 text-[#eadfcb] border border-white/15">
                    🎧 Audio Narration
                  </span>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <button
                type="button"
                className="px-5 py-3 rounded-xl bg-[#d9a441] text-[#2c2018] text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 group-hover:bg-white transition-colors cursor-pointer"
              >
                <span>Launch AI Assistant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE ACCESS ON-SITE COMPANION BANNER WITH EMBEDDED QR CODE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#fbf8f3] to-[#f5efe6] rounded-3xl p-6 sm:p-8 border-2 border-[#d9a441]/40 shadow-sm relative overflow-hidden">
          {/* Subtle decorative background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d9a441]/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5c2a1f]/10 text-[#5c2a1f] text-xs font-bold uppercase tracking-wider">
                <Smartphone className="w-3.5 h-3.5 text-[#8c571c]" />
                <span>On-Site Field Companion</span>
              </div>

              <h2 className="font-heritage text-2xl sm:text-3xl font-bold text-[#5c2a1f] leading-tight">
                Scan to Open On Your Smartphone
              </h2>

              <p className="text-sm text-[#705844] leading-relaxed">
                Visiting Badami, Aihole, or Pattadakal today? Scan the QR code with your phone camera to take the AI guide into the field. Test monument recognition in-situ and listen to bilingual audio narrations as you walk through 6th-century rock-cut caves.
              </p>

              {/* Mobile Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-[#eadfcb]">
                  <div className="w-8 h-8 rounded-lg bg-[#d9a441]/20 text-[#8c571c] flex items-center justify-center shrink-0">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#5c2a1f]">Real-time Camera Vision</h4>
                    <p className="text-[11px] text-[#705844] mt-0.5">Point camera at cave carvings for instant AI detection</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-[#eadfcb]">
                  <div className="w-8 h-8 rounded-lg bg-[#2f7a6f]/20 text-[#2f7a6f] flex items-center justify-center shrink-0">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#5c2a1f]">Pocket Audio Tours</h4>
                    <p className="text-[11px] text-[#705844] mt-0.5">Kannada & English audio commentary via headphones</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-[#eadfcb]">
                  <div className="w-8 h-8 rounded-lg bg-[#5c2a1f]/15 text-[#5c2a1f] flex items-center justify-center shrink-0">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#5c2a1f]">Sandstone Heat Alert</h4>
                    <p className="text-[11px] text-[#705844] mt-0.5">Live barefoot climbing temperature advisories</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-[#eadfcb]">
                  <div className="w-8 h-8 rounded-lg bg-[#8c571c]/20 text-[#8c571c] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#5c2a1f]">76 km Circuit Map</h4>
                    <p className="text-[11px] text-[#705844] mt-0.5">Turn-by-turn driving & heritage trail navigation</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  id="section-download-app-btn"
                  onClick={onOpenInstall || onOpenMobileAccess}
                  className="px-4 py-2 rounded-xl bg-[#d9a441] hover:bg-[#e4b55c] text-[#2c2018] text-xs font-bold shadow-xs cursor-pointer flex items-center gap-2 transition-transform active:scale-95"
                >
                  <Download className="w-4 h-4 stroke-[2.4]" />
                  <span>{lang === 'kn' ? 'ಮೊಬೈಲ್‌ನಲ್ಲಿ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ' : 'Download / Install to Phone'}</span>
                </button>

                <button
                  id="section-open-mobile-modal-btn"
                  onClick={onOpenMobileAccess}
                  className="px-4 py-2 rounded-xl bg-[#5c2a1f] hover:bg-[#43231b] text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-2 transition-colors"
                >
                  <QrCode className="w-4 h-4 text-[#d9a441]" />
                  <span>Enlarge & Download QR Signage</span>
                </button>
                <span className="text-xs text-[#8c571c] font-medium">
                  Compatible with iPhone, Android & Tablets • Instant Web Access
                </span>
              </div>
            </div>

            {/* Right QR Code Column */}
            <div className="lg:col-span-5 flex justify-center">
              <QRCodeCard 
                size={210}
                showUrlToggle={true}
                title="Mobile QR Code"
                subtitle="Point your phone camera to launch"
                className="max-w-xs w-full"
              />
            </div>

          </div>
        </div>
      </section>

      {/* SCROLLING ROW OF "VISIT TODAY" LIVE CARDS PER SITE (PROMPT REQUIREMENT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heritage text-lg sm:text-xl font-bold text-[#5c2a1f]">
              Today's Circuit Conditions & Live Advisory
            </h3>
            <p className="text-xs text-[#705844]">
              Simulated crowd density & thermal index across key Badami sites
            </p>
          </div>
          <button
            onClick={() => onSelectTab('visit-planner')}
            className="text-xs font-bold text-[#2f7a6f] hover:underline flex items-center gap-1"
          >
            <span>View all 8 sites</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MONUMENTS.slice(0, 4).map((mon) => (
            <div
              key={mon.id}
              onClick={() => onSelectMonument(mon.id)}
              className="bg-[#f5efe6] p-4 rounded-xl border border-[#eadfcb] hover:border-[#d9a441] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative rounded-lg overflow-hidden aspect-[16/10] mb-2.5">
                  <img src={mon.image} alt={mon.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-2 right-2 bg-black/70 text-[#d9a441] text-[10px] font-mono px-2 py-0.5 rounded backdrop-blur-xs font-bold">
                    6 AM – 6 PM
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#5c2a1f] group-hover:text-[#8c571c]">
                  {lang === 'kn' ? mon.kannadaName : mon.name}
                </h4>
                <p className="text-[11px] text-[#705844] mt-0.5">
                  {mon.location}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-[#eadfcb]">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#2f7a6f]">Visit before 10 AM</span>
                  <span className="text-xs font-mono text-[#8c571c]">Low Crowd (28%)</span>
                </div>
                <div className="mt-2 pt-2 border-t border-[#eadfcb]/60 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onAskAI) onAskAI(mon.id);
                      else onSelectTab('ai-guide');
                    }}
                    className="text-[10px] font-bold text-[#5c2a1f] hover:text-[#8c571c] flex items-center gap-1 cursor-pointer bg-white/70 hover:bg-white px-2 py-0.5 rounded border border-[#eadfcb] transition-colors"
                  >
                    <Bot className="w-3 h-3 text-[#d9a441]" />
                    <span>Ask AI</span>
                  </button>
                  <span className="text-[10px] text-[#705844]">Details &gt;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY THIS MATTERS BANNER (UN Tourism 2026 Pitch Tie-in) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2c2018] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-[#eadfcb]/20">
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#2f7a6f] text-white text-xs font-bold uppercase tracking-wider mb-3">
              Why This Matters for UN Tourism 2026
            </div>

            <h3 className="font-heritage text-xl sm:text-2xl font-bold text-[#d9a441]">
              Redesigning Tourism through Cultural Preservation
            </h3>

            <p className="text-xs sm:text-sm text-[#dcc8a8] mt-2 leading-relaxed">
              "The Badami–Aihole–Pattadakal circuit represents the cradle of temple architecture in South India, with over 150 monuments dating back to the 6th century. By applying transfer-learning computer vision for identification, Grad-CAM explainable AI for stone weathering diagnostics, and moving-average crowd forecasting, this prototype bridges high-tech accessibility with tangible heritage conservation."
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenPitch}
                className="px-4 py-2 rounded-xl bg-[#d9a441] hover:bg-[#b87b28] text-[#5c2a1f] text-xs font-bold shadow-xs cursor-pointer transition-colors"
              >
                Open Competition Presentation Deck
              </button>

              <button
                onClick={() => onSelectTab('circuit-map')}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                Explore 76 km Circuit Route
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
