import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Smartphone, 
  CheckCircle2, 
  Share2, 
  PlusSquare, 
  MoreVertical, 
  WifiOff, 
  Zap, 
  ShieldCheck, 
  QrCode, 
  Copy, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { QRCodeCard, SHARED_APP_URL } from './QRCodeCard';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'en' | 'kn';
}

export const InstallModal: React.FC<InstallModalProps> = ({
  isOpen,
  onClose,
  lang = 'en'
}) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, isMobile, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'desktop'>(
    isIOS ? 'ios' : isAndroid ? 'android' : 'desktop'
  );
  const [isInstalling, setIsInstalling] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isIOS) setActiveTab('ios');
    else if (isAndroid) setActiveTab('android');
    else setActiveTab('desktop');
  }, [isIOS, isAndroid]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
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

  const handleNativeInstall = async () => {
    setIsInstalling(true);
    const success = await install();
    setIsInstalling(false);
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(SHARED_APP_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      id="pwa-install-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="pwa-install-modal-content"
        className="relative w-full max-w-2xl bg-[#fbf8f3] rounded-3xl border-2 border-[#eadfcb] shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#2c2018] via-[#43231b] to-[#5c2a1f] text-white p-6 sm:p-7 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#d9a441] text-[#2c2018] flex items-center justify-center shadow-lg shrink-0">
                <Download className="w-6 h-6 stroke-[2.4]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heritage text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {lang === 'kn' ? 'ಮೊಬೈಲ್‌ನಲ್ಲಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ' : 'Download to Your Mobile'}
                  </h2>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                    Official PWA
                  </span>
                </div>
                <p className="text-xs text-[#dcc8a8] mt-1">
                  {lang === 'kn' 
                    ? 'ಪ್ಲೇ ಸ್ಟೋರ್ ಅಗತ್ಯವಿಲ್ಲದೆ ನೇರವಾಗಿ ನಿಮ್ಮ ಫೋನ್ ಹೋಮ್ ಸ್ಕ್ರೀನ್‌ಗೆ ಸೇರಿಸಿ' 
                    : 'Install directly to your home screen • No App Store download needed • Works offline'}
                </p>
              </div>
            </div>

            <button
              id="close-install-modal-btn"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Device Tabs */}
          <div className="flex gap-2 mt-5">
            <button
              onClick={() => setActiveTab('android')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'android'
                  ? 'bg-[#d9a441] text-[#2c2018] shadow-sm'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android</span>
            </button>

            <button
              onClick={() => setActiveTab('ios')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'ios'
                  ? 'bg-[#d9a441] text-[#2c2018] shadow-sm'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <span>🍎 iPhone / iPad</span>
            </button>

            <button
              onClick={() => setActiveTab('desktop')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'desktop'
                  ? 'bg-[#d9a441] text-[#2c2018] shadow-sm'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Scan QR from PC</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6">

          {/* Already Installed Alert */}
          {isInstalled && (
            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 flex items-center gap-3 text-emerald-900">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <p className="text-sm font-bold">
                  {lang === 'kn' ? 'ಆ್ಯಪ್ ಈಗಾಗಲೇ ಇನ್‌ಸ್ಟಾಲ್ ಆಗಿದೆ!' : 'App Is Already Installed!'}
                </p>
                <p className="text-xs text-emerald-700">
                  {lang === 'kn'
                    ? 'ನೀವು ಈಗ ನಿಮ್ಮ ಮುಖಪುಟದ ಐಕಾನ್ ಮೂಲಕ ನೇರವಾಗಿ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಬಳಸಬಹುದು.'
                    : 'You are running the standalone app. You can launch it anytime from your phone home screen.'}
                </p>
              </div>
            </div>
          )}

          {/* Android Tab Content */}
          {activeTab === 'android' && (
            <div className="space-y-4">
              {isInstallable && (
                <div className="bg-gradient-to-r from-[#d9a441]/15 to-[#8c571c]/10 border border-[#d9a441] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8c571c]">
                      Quick Install Ready
                    </span>
                    <h3 className="text-base font-bold text-[#2c2018]">
                      {lang === 'kn' ? '1-ಕ್ಲಿಕ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ' : '1-Tap Android Installation'}
                    </h3>
                    <p className="text-xs text-[#705844] mt-0.5">
                      {lang === 'kn'
                        ? 'ತಕ್ಷಣವೇ ನಿಮ್ಮ ಫೋನ್‌ಗೆ ಆ್ಯಪ್ ಐಕಾನ್ ಸೇರಿಸಿ'
                        : 'Adds the Badami Circuit AI icon to your app drawer and home screen.'}
                    </p>
                  </div>
                  <button
                    id="pwa-native-install-btn"
                    onClick={handleNativeInstall}
                    disabled={isInstalling}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#5c2a1f] hover:bg-[#43231b] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 shrink-0"
                  >
                    <Download className="w-4 h-4 text-[#d9a441]" />
                    <span>{isInstalling ? 'Installing...' : 'Install on Android'}</span>
                  </button>
                </div>
              )}

              {/* Step-by-Step for Android Chrome */}
              <div className="bg-[#f5efe6] rounded-2xl p-5 border border-[#eadfcb]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8c571c] mb-3 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#5c2a1f]" />
                  <span>{lang === 'kn' ? 'ಆಂಡ್ರಾಯ್ಡ್ ಕ್ರೋಮ್‌ನಲ್ಲಿ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡುವ ವಿಧಾನ' : 'How to Install via Chrome on Android'}</span>
                </h4>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-xs text-[#2c2018]">
                    <div className="w-6 h-6 rounded-full bg-[#5c2a1f] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="font-semibold">Open the site in Google Chrome</p>
                      <p className="text-[#705844] text-[11px]">Navigate to the link or scan the QR code using your camera.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-[#2c2018]">
                    <div className="w-6 h-6 rounded-full bg-[#5c2a1f] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="font-semibold flex items-center gap-1.5">
                        Tap the three dots menu
                        <MoreVertical className="w-3.5 h-3.5 text-[#5c2a1f] inline" />
                        in top-right corner
                      </p>
                      <p className="text-[#705844] text-[11px]">Next to the address bar in Chrome.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-[#2c2018]">
                    <div className="w-6 h-6 rounded-full bg-[#5c2a1f] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="font-semibold flex items-center gap-1.5 text-[#5c2a1f]">
                        <Download className="w-3.5 h-3.5 text-[#d9a441]" />
                        Tap &ldquo;Install app&rdquo; or &ldquo;Add to Home Screen&rdquo;
                      </p>
                      <p className="text-[#705844] text-[11px]">
                        The Badami AI Guide icon will appear on your phone home screen just like a Play Store app!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* iOS Tab Content */}
          {activeTab === 'ios' && (
            <div className="space-y-4">
              <div className="bg-[#f5efe6] rounded-2xl p-5 border border-[#eadfcb]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8c571c] mb-3 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#5c2a1f]" />
                  <span>{lang === 'kn' ? 'ಐಫೋನ್ ಸಫಾರಿಯಲ್ಲಿ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡುವ ವಿಧಾನ' : 'How to Install on iPhone / iPad (Safari)'}</span>
                </h4>

                <div className="space-y-3.5">
                  <div className="flex items-start gap-3 text-xs text-[#2c2018]">
                    <div className="w-6 h-6 rounded-full bg-[#5c2a1f] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="font-semibold">Open the app in Safari browser</p>
                      <p className="text-[#705844] text-[11px]">
                        iOS requires Safari to save PWAs to your home screen.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-[#2c2018]">
                    <div className="w-6 h-6 rounded-full bg-[#5c2a1f] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="font-semibold flex items-center gap-1.5">
                        Tap the <strong className="text-[#5c2a1f]">Share</strong> button
                        <Share2 className="w-4 h-4 text-blue-600 inline" />
                      </p>
                      <p className="text-[#705844] text-[11px]">
                        Located at the bottom center of your iPhone screen (or top right on iPad).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-[#2c2018]">
                    <div className="w-6 h-6 rounded-full bg-[#5c2a1f] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="font-semibold flex items-center gap-1.5 text-[#5c2a1f]">
                        <PlusSquare className="w-4 h-4 text-[#8c571c] inline" />
                        Scroll down and tap &ldquo;Add to Home Screen&rdquo;
                      </p>
                      <p className="text-[#705844] text-[11px]">
                        Then tap <strong>Add</strong> in the top right. An app icon titled <strong>Badami Guide</strong> will be saved to your home screen!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Running from your home screen gives you full-screen view without the Safari address bar.</span>
              </div>
            </div>
          )}

          {/* Desktop Tab Content (QR Code to open on Mobile) */}
          {activeTab === 'desktop' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <QRCodeCard 
                initialUrl={SHARED_APP_URL}
                size={200}
                showUrlToggle={true}
                title={lang === 'kn' ? 'ಕ್ಯಾಮರಾದಿಂದ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : 'Scan With Phone Camera'}
                subtitle={lang === 'kn' ? 'ನೇರವಾಗಿ ನಿಮ್ಮ ಮೊಬೈಲ್‌ನಲ್ಲಿ ತೆರೆಯುತ್ತದೆ' : 'Opens immediately on your mobile browser'}
              />

              <div className="space-y-4">
                <div className="bg-[#f5efe6] rounded-2xl p-4 border border-[#eadfcb] space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8c571c]">
                    Quick Mobile Transfer
                  </h4>
                  <p className="text-xs text-[#5c2a1f] leading-relaxed">
                    Point your iPhone or Android camera at the QR code on the left. Once opened on your phone, tap <strong>&ldquo;Add to Home Screen&rdquo;</strong> to install!
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#705844] block">
                    Or Copy Link to Send via WhatsApp / Message:
                  </label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={SHARED_APP_URL}
                      className="w-full text-xs font-mono bg-white border border-[#eadfcb] rounded-xl px-3 py-2 text-[#5c2a1f] select-all outline-hidden"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-2 rounded-xl bg-[#5c2a1f] text-white text-xs font-bold flex items-center gap-1 shrink-0 hover:bg-[#43231b] cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#d9a441]" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Benefits Grid */}
          <div className="pt-2 border-t border-[#eadfcb]">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#705844] mb-3">
              Why Download to Mobile?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#f5efe6] border border-[#eadfcb] flex items-start gap-2.5">
                <WifiOff className="w-4 h-4 text-[#8c571c] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2c2018]">Offline Ready</strong>
                  <span className="text-[11px] text-[#705844]">Cached itineraries & maps when cell reception drops in rocky caves.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#f5efe6] border border-[#eadfcb] flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-[#d9a441] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2c2018]">Instant Launch</strong>
                  <span className="text-[11px] text-[#705844]">Launches in full-screen in under 1 second from your home screen.</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#f5efe6] border border-[#eadfcb] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#2f7a6f] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2c2018]">Zero Storage Bloat</strong>
                  <span className="text-[11px] text-[#705844]">Takes less than 3 MB of space, unlike bulky 100MB store apps.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#f5efe6] px-6 py-4 border-t border-[#eadfcb] flex items-center justify-between">
          <span className="text-xs text-[#705844]">
            Compatible with Android 8+ & iOS 14+
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#5c2a1f] hover:bg-[#43231b] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            {installSuccess ? 'Done' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
