import React, { useEffect } from 'react';
import { 
  X, 
  Smartphone, 
  Camera, 
  Headphones, 
  Sparkles, 
  QrCode, 
  MapPin, 
  Compass,
  CheckCircle2,
  ExternalLink,
  Download
} from 'lucide-react';
import { QRCodeCard, SHARED_APP_URL } from './QRCodeCard';

interface MobileAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInstall?: () => void;
  lang?: 'en' | 'kn';
}

export const MobileAccessModal: React.FC<MobileAccessModalProps> = ({
  isOpen,
  onClose,
  onOpenInstall,
  lang = 'en'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      id="mobile-access-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="mobile-access-modal-content"
        className="relative w-full max-w-2xl bg-[#fbf8f3] rounded-3xl border-2 border-[#eadfcb] shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#2c2018] via-[#43231b] to-[#5c2a1f] text-white p-6 sm:p-7 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d9a441] text-[#5c2a1f] flex items-center justify-center shadow-md">
                <QrCode className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heritage text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {lang === 'kn' ? 'ಮೊಬೈಲ್ ಪ್ರವೇಶ ಕ್ಯೂಆರ್ ಕೋಡ್' : 'Scan for Mobile Access'}
                  </h2>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#d9a441]/20 text-[#d9a441] border border-[#d9a441]/40">
                    Live PWA
                  </span>
                </div>
                <p className="text-xs text-[#dcc8a8] mt-1">
                  {lang === 'kn' 
                    ? 'ಬಾದಾಮಿ ಸ್ಮಾರಕಗಳ ಸ್ಥಳದಲ್ಲೇ ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಮೂಲಕ ಬಳಸಲು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' 
                    : 'Open this interactive AI guide on your phone while walking the heritage circuit'}
                </p>
              </div>
            </div>

            <button
              id="close-mobile-modal-btn"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Left: Interactive QR Code Card */}
            <QRCodeCard 
              initialUrl={SHARED_APP_URL}
              size={210}
              showUrlToggle={true}
              title={lang === 'kn' ? 'ಮೊಬೈಲ್ ಕ್ಯಾಮೆರಾ ಮೂಲಕ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : 'Scan With Phone Camera'}
              subtitle={lang === 'kn' ? 'ಯಾವುದೇ ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡುವ ಅಗತ್ಯವಿಲ್ಲ' : 'No app install required • Instant web access'}
            />

            {/* Right: How-to & Mobile Experience Highlights */}
            <div className="space-y-4">
              
              {/* Instructions */}
              <div className="bg-[#f5efe6] rounded-2xl p-4 border border-[#eadfcb]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8c571c] mb-2 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-[#5c2a1f]" />
                  <span>How to Connect</span>
                </h4>
                <ol className="space-y-2 text-xs text-[#5c2a1f]">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#5c2a1f] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</span>
                    <span>Open your iPhone or Android camera app</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#5c2a1f] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</span>
                    <span>Point the lens directly at the QR code on screen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#5c2a1f] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</span>
                    <span>Tap the yellow popup banner to launch the guide</span>
                  </li>
                </ol>
              </div>

              {/* Mobile Capabilities */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#705844] mb-2.5">
                  Optimized for On-Site Temple Exploration:
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 text-xs text-[#2c2018]">
                    <div className="w-7 h-7 rounded-lg bg-[#d9a441]/20 text-[#8c571c] flex items-center justify-center shrink-0">
                      <Camera className="w-3.5 h-3.5" />
                    </div>
                    <span><strong>Live Camera Vision:</strong> Snap cave carvings for instant site history & details</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-[#2c2018]">
                    <div className="w-7 h-7 rounded-lg bg-[#2f7a6f]/20 text-[#2f7a6f] flex items-center justify-center shrink-0">
                      <Headphones className="w-3.5 h-3.5" />
                    </div>
                    <span><strong>Pocket Audio Guides:</strong> Kannada & English narrations with headphone playback</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-[#2c2018]">
                    <div className="w-7 h-7 rounded-lg bg-[#5c2a1f]/15 text-[#5c2a1f] flex items-center justify-center shrink-0">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span><strong>Circuit Navigation:</strong> 76 km route across Badami, Pattadakal & Aihole</span>
                  </div>
                </div>
              </div>

              {/* Direct Link & Install Guide Alternatives */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <a
                  href={SHARED_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2f7a6f] hover:underline"
                >
                  <span>Direct browser link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {onOpenInstall && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenInstall();
                    }}
                    className="inline-flex items-center gap-1.5 font-bold text-[#5c2a1f] hover:text-[#8c571c] hover:underline cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#d9a441]" />
                    <span>Download / Install App Guide &gt;</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#f5efe6] px-6 py-4 border-t border-[#eadfcb] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#705844]">
            <Compass className="w-4 h-4 text-[#d9a441]" />
            <span>Bagalkote District Heritage Circuit • Karnataka, India</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#5c2a1f] hover:bg-[#43231b] text-white font-semibold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
