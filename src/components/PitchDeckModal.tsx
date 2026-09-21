import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Cpu, 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Award,
  ExternalLink,
  Presentation
} from 'lucide-react';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({
  isOpen,
  onClose
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#fbf8f3] rounded-3xl shadow-2xl border border-[#eadfcb] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#5c2a1f] text-white flex items-center justify-between border-b border-[#3f1911]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#d9a441] text-[#5c2a1f] flex items-center justify-center font-bold">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heritage text-lg font-bold text-[#d9a441] tracking-tight">
                Badami Circuit AI Guide — Pitch Deck
              </span>
              <p className="text-xs text-[#f5efe6]/80">
                UN Tourism 2026 Theme: Digital Agenda & AI to Redesign Tourism
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Slide Indicator */}
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-black/30 text-[#d9a441] font-bold">
              Slide {currentSlide + 1} of 2
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Canvas Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* SLIDE 1: SYSTEM ARCHITECTURE DIAGRAM */}
          {currentSlide === 0 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2f7a6f] bg-[#2f7a6f]/10 px-2.5 py-1 rounded-md">
                  Slide 1: Technical Credibility & Architecture
                </span>
                <h2 className="font-heritage text-2xl sm:text-3xl font-bold text-[#5c2a1f] mt-2">
                  Unified Multi-Task Architecture
                </h2>
                <p className="text-sm text-[#705844] mt-1">
                  Three synergistic AI modules feeding into a single lightweight, mobile-first web interface designed for field tourists and ASI conservation officers.
                </p>
              </div>

              {/* Architecture Bento Flowchart */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Module 1 Box */}
                <div className="bg-[#f5efe6] p-5 rounded-2xl border-2 border-[#d9a441]/40 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-7 h-7 rounded-lg bg-[#d9a441] text-[#5c2a1f] font-bold flex items-center justify-center text-xs">
                        M1
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#d9a441]/20 text-[#8c571c]">
                        Smart Technology
                      </span>
                    </div>

                    <h3 className="font-heritage font-bold text-[#5c2a1f] text-base">
                      Monument Recognition
                    </h3>
                    <p className="text-xs text-[#705844] mt-1">
                      Transfer learning on MobileNetV2 / EfficientNet-B0 fine-tuned on 8 Chalukya heritage classes.
                    </p>

                    <div className="mt-4 space-y-1.5 text-xs text-[#2c2018]">
                      <div className="p-2 bg-[#fbf8f3] rounded border border-[#eadfcb] font-mono text-[11px]">
                        Input: 224x224x3 Tensor
                      </div>
                      <div className="p-2 bg-[#fbf8f3] rounded border border-[#eadfcb] font-mono text-[11px]">
                        Softmax Top-1 &gt; 95% Conf.
                      </div>
                      <div className="p-2 bg-amber-50 rounded border border-amber-200 font-mono text-[11px] text-amber-900">
                        Top-3 Fallback if &lt; 75% Conf.
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#eadfcb] text-[11px] text-[#8c571c] font-semibold">
                    Output: Bilingual Kannada/English + Audio Blurb
                  </div>
                </div>

                {/* Module 2 Box */}
                <div className="bg-[#f5efe6] p-5 rounded-2xl border-2 border-[#2f7a6f]/40 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-7 h-7 rounded-lg bg-[#2f7a6f] text-white font-bold flex items-center justify-center text-xs">
                        M2
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#2f7a6f]/20 text-[#2f7a6f]">
                        Open Innovation
                      </span>
                    </div>

                    <h3 className="font-heritage font-bold text-[#5c2a1f] text-base">
                      Grad-CAM Damage Scan
                    </h3>
                    <p className="text-xs text-[#705844] mt-1">
                      Convolutional surface damage detection with gradient-weighted class activation mapping (Grad-CAM).
                    </p>

                    <div className="mt-4 space-y-1.5 text-xs text-[#2c2018]">
                      <div className="p-2 bg-[#fbf8f3] rounded border border-[#eadfcb] font-mono text-[11px]">
                        Target: Cracks vs Honeycomb Erosion
                      </div>
                      <div className="p-2 bg-[#fbf8f3] rounded border border-[#eadfcb] font-mono text-[11px]">
                        Grad-CAM Saliency Jet Heatmap
                      </div>
                      <div className="p-2 bg-[#fbf8f3] rounded border border-[#eadfcb] font-mono text-[11px]">
                        % Hot-Zone → Low/Med/High Severity
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#eadfcb] text-[11px] text-[#2f7a6f] font-semibold">
                    Output: ASI Conservation Priority Triage
                  </div>
                </div>

                {/* Module 3 Box */}
                <div className="bg-[#f5efe6] p-5 rounded-2xl border-2 border-[#5c2a1f]/40 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-7 h-7 rounded-lg bg-[#5c2a1f] text-white font-bold flex items-center justify-center text-xs">
                        M3
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#5c2a1f]/20 text-[#5c2a1f]">
                        Sustainable Planning
                      </span>
                    </div>

                    <h3 className="font-heritage font-bold text-[#5c2a1f] text-base">
                      Smart Crowd Timing
                    </h3>
                    <p className="text-xs text-[#705844] mt-1">
                      Calibrated diurnal arrival model with 3-point moving average and microclimate sandstone heat indexing.
                    </p>

                    <div className="mt-4 space-y-1.5 text-xs text-[#2c2018]">
                      <div className="p-2 bg-[#fbf8f3] rounded border border-[#eadfcb] font-mono text-[11px]">
                        Hourly Arrival Distribution Curves
                      </div>
                      <div className="p-2 bg-[#fbf8f3] rounded border border-[#eadfcb] font-mono text-[11px]">
                        3-Point Moving Average Smoothing
                      </div>
                      <div className="p-2 bg-[#fbf8f3] rounded border border-[#eadfcb] font-mono text-[11px]">
                        Diurnal Rock Heat (24°C–36°C)
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#eadfcb] text-[11px] text-[#5c2a1f] font-semibold">
                    Output: "Visit before 10 AM" De-concentration
                  </div>
                </div>

              </div>

              {/* Underlying Unified Framework Strip */}
              <div className="p-4 rounded-xl bg-[#eadfcb]/50 border border-[#dcc8a8] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5c2a1f]">
                <div className="flex items-center gap-2">
                  <span className="font-bold">Unified Client Platform:</span>
                  <span className="font-mono">React 19 • Express Node Server • Tailwind CSS • Web Speech API</span>
                </div>
                <div className="font-mono text-[#705844]">
                  Zero-friction in-browser live demo • Works offline with local presets
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: UN TOURISM 2026 THEME ALIGNMENT MATRIX */}
          {currentSlide === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#d9a441] bg-[#d9a441]/20 px-2.5 py-1 rounded-md">
                  Slide 2: Competition Alignment Matrix
                </span>
                <h2 className="font-heritage text-2xl sm:text-3xl font-bold text-[#5c2a1f] mt-2">
                  UN Tourism 2026 Theme Coverage
                </h2>
                <p className="text-sm text-[#705844] mt-1">
                  How the Badami Circuit AI Guide directly fulfills the United Nations Tourism mandate: <em>"Digital Agenda and Artificial Intelligence to Redesign Tourism"</em>.
                </p>
              </div>

              {/* Theme Alignment Cards */}
              <div className="space-y-4">
                
                {/* Pillar 1 */}
                <div className="p-5 rounded-2xl bg-[#f5efe6] border border-[#eadfcb] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#d9a441] text-[#5c2a1f] flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8c571c]">
                          UN Pillar 1
                        </span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#d9a441]/20 text-[#5c2a1f]">
                          Smart Technology & Access
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#5c2a1f] mt-0.5">
                        Module 1: Monument Recognition & Localized Audio
                      </h3>
                      <p className="text-xs text-[#705844] mt-1 max-w-2xl leading-relaxed">
                        Democratizes heritage interpretation by translating complex Chalukyan temple iconography into instant, accessible insights. Native Kannada language support ensures local empowerment and cultural inclusivity.
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Full Coverage
                  </span>
                </div>

                {/* Pillar 2 */}
                <div className="p-5 rounded-2xl bg-[#f5efe6] border border-[#eadfcb] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2f7a6f] text-white flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2f7a6f]">
                          UN Pillar 2
                        </span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#2f7a6f]/20 text-[#2f7a6f]">
                          Open Innovation & Technical Depth
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#5c2a1f] mt-0.5">
                        Module 2: Explainable AI (Grad-CAM) Stone Damage Triage
                      </h3>
                      <p className="text-xs text-[#705844] mt-1 max-w-2xl leading-relaxed">
                        Transfers deep learning beyond mere marketing into tangible structural preservation. Equips the Archaeological Survey of India (ASI) with on-device crack and weathering heatmaps without requiring lab spectrometry on site.
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Full Coverage
                  </span>
                </div>

                {/* Pillar 3 */}
                <div className="p-5 rounded-2xl bg-[#f5efe6] border border-[#eadfcb] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5c2a1f] text-white flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#5c2a1f]">
                          UN Pillar 3
                        </span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#5c2a1f]/20 text-[#5c2a1f]">
                          Sustainable Planning & Heritage Care
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#5c2a1f] mt-0.5">
                        Module 3: Smart Visit Timing & Crowd De-concentration
                      </h3>
                      <p className="text-xs text-[#705844] mt-1 max-w-2xl leading-relaxed">
                        Mitigates microclimatic overtourism stress on 1,400-year-old fragile sandstones. Re-routes tourists to low-density hours (dawn & dusk) and cooler micro-environments, extending the physical lifespan of world heritage sites.
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Full Coverage
                  </span>
                </div>

              </div>

              {/* Judge Pitch Closer */}
              <div className="p-4 rounded-xl bg-[#d9a441]/15 border border-[#d9a441]/40 flex items-center gap-3">
                <Award className="w-6 h-6 text-[#8c571c] flex-shrink-0" />
                <div className="text-xs text-[#5c2a1f]">
                  <span className="font-bold">Summary for Evaluators: </span>
                  Rather than disconnected single-task demos, Badami Circuit AI Guide delivers an end-to-end, technically grounded, and socially relevant prototype ready for live adoption in Karnataka's heritage heartland.
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Controls */}
        <div className="px-6 py-4 bg-[#f5efe6] border-t border-[#eadfcb] flex items-center justify-between">
          <button
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
              currentSlide === 0
                ? 'opacity-40 cursor-not-allowed text-[#705844]'
                : 'bg-[#eadfcb] hover:bg-[#dcc8a8] text-[#5c2a1f]'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Slide</span>
          </button>

          <div className="flex items-center gap-1.5">
            <span 
              onClick={() => setCurrentSlide(0)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                currentSlide === 0 ? 'bg-[#5c2a1f] scale-110' : 'bg-[#eadfcb]'
              }`}
            />
            <span 
              onClick={() => setCurrentSlide(1)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                currentSlide === 1 ? 'bg-[#5c2a1f] scale-110' : 'bg-[#eadfcb]'
              }`}
            />
          </div>

          {currentSlide === 0 ? (
            <button
              onClick={() => setCurrentSlide(1)}
              className="px-4 py-2 rounded-xl bg-[#5c2a1f] hover:bg-[#6d2f21] text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>Next: Theme Alignment</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#2f7a6f] hover:bg-[#25635a] text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
            >
              <span>Back to Live Demo</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
