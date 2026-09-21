import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Smartphone, 
  Sparkles,
  RefreshCw,
  Share2
} from 'lucide-react';

export const SHARED_APP_URL = 'https://ais-pre-r3mrijq6ppsbcjxikenrbu-71193715513.asia-east1.run.app';

interface QRCodeCardProps {
  initialUrl?: string;
  title?: string;
  subtitle?: string;
  size?: number;
  showUrlToggle?: boolean;
  className?: string;
}

export const QRCodeCard: React.FC<QRCodeCardProps> = ({
  initialUrl = SHARED_APP_URL,
  title,
  subtitle,
  size = 200,
  showUrlToggle = true,
  className = ''
}) => {
  const [selectedUrl, setSelectedUrl] = useState<string>(() => {
    // If window is available and not about:blank or localhost, check current origin
    return initialUrl;
  });
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [useThemeColors, setUseThemeColors] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Determine current window URL for option toggle
  const currentBrowserUrl = typeof window !== 'undefined' && window.location.href ? window.location.href : '';

  useEffect(() => {
    let isMounted = true;

    const generateQR = async () => {
      try {
        const darkColor = useThemeColors ? '#43231b' : '#000000';
        const lightColor = '#ffffff';

        // Generate data URL
        const dataUrl = await QRCode.toDataURL(selectedUrl, {
          width: Math.max(size * 2, 400), // high res for crisp scaling & downloads
          margin: 2,
          color: {
            dark: darkColor,
            light: lightColor
          },
          errorCorrectionLevel: 'H' // High error tolerance allowing center badge overlay
        });

        if (isMounted) {
          setQrDataUrl(dataUrl);
        }

        // Render directly to canvas if present
        if (canvasRef.current) {
          await QRCode.toCanvas(canvasRef.current, selectedUrl, {
            width: size,
            margin: 2,
            color: {
              dark: darkColor,
              light: lightColor
            },
            errorCorrectionLevel: 'H'
          });
        }
      } catch (err) {
        console.error('Failed to generate QR code:', err);
      }
    };

    generateQR();

    return () => {
      isMounted = false;
    };
  }, [selectedUrl, size, useThemeColors]);

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(selectedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'badami-circuit-mobile-access-qr.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Badami Circuit AI Guide - Mobile Access',
          text: 'Explore the Chalukyan heritage temples in Badami, Aihole & Pattadakal with AI monument recognition and audio guides.',
          url: selectedUrl,
        });
      } catch {
        // User cancelled or share not supported
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className={`flex flex-col items-center bg-white rounded-2xl p-6 border-2 border-[#eadfcb] shadow-sm ${className}`}>
      
      {/* Title & Badge */}
      {(title || subtitle) && (
        <div className="text-center mb-4">
          {title && (
            <h3 className="font-heritage text-lg font-bold text-[#5c2a1f] flex items-center justify-center gap-2">
              <Smartphone className="w-5 h-5 text-[#d9a441]" />
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs text-[#705844] mt-0.5 max-w-sm">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* QR Code Container with Chalukyan styling */}
      <div className="relative group p-3.5 bg-white rounded-xl border border-[#eadfcb] shadow-xs flex items-center justify-center">
        
        {/* Subtle decorative heritage corner brackets */}
        <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#d9a441] pointer-events-none" />
        <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#d9a441] pointer-events-none" />
        <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#d9a441] pointer-events-none" />
        <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#d9a441] pointer-events-none" />

        {/* Canvas / Image */}
        {qrDataUrl ? (
          <div className="relative">
            <img 
              src={qrDataUrl} 
              alt="QR Code for Badami Circuit AI Guide mobile access"
              style={{ width: `${size}px`, height: `${size}px` }}
              className="rounded-lg object-contain block select-none"
            />
            {/* Center Badami emblem badge */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-9 h-9 rounded-lg bg-[#5c2a1f] border-2 border-white text-[#d9a441] flex items-center justify-center shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </div>
        ) : (
          <div 
            style={{ width: `${size}px`, height: `${size}px` }}
            className="flex items-center justify-center bg-[#f5efe6] text-xs text-[#705844] rounded-lg animate-pulse"
          >
            <RefreshCw className="w-5 h-5 animate-spin text-[#d9a441]" />
          </div>
        )}
      </div>

      {/* URL Toggle Options (if requested) */}
      {showUrlToggle && (
        <div className="w-full mt-4 flex items-center justify-center gap-1.5 text-xs bg-[#f5efe6] p-1 rounded-lg border border-[#eadfcb]">
          <button
            type="button"
            onClick={() => setSelectedUrl(SHARED_APP_URL)}
            className={`flex-1 py-1 px-2 rounded-md font-medium text-center transition-all cursor-pointer ${
              selectedUrl === SHARED_APP_URL 
                ? 'bg-[#5c2a1f] text-white shadow-2xs font-semibold' 
                : 'text-[#5c2a1f] hover:bg-[#eadfcb]'
            }`}
          >
            Public Shared Link
          </button>
          {currentBrowserUrl && currentBrowserUrl !== SHARED_APP_URL && (
            <button
              type="button"
              onClick={() => setSelectedUrl(currentBrowserUrl)}
              className={`flex-1 py-1 px-2 rounded-md font-medium text-center transition-all cursor-pointer ${
                selectedUrl === currentBrowserUrl 
                  ? 'bg-[#5c2a1f] text-white shadow-2xs font-semibold' 
                  : 'text-[#5c2a1f] hover:bg-[#eadfcb]'
              }`}
            >
              Current Window
            </button>
          )}
        </div>
      )}

      {/* Target URL Display & One-click Copy */}
      <div className="w-full mt-3">
        <div className="flex items-center gap-1.5 bg-[#fbf8f3] border border-[#eadfcb] rounded-lg px-2.5 py-1.5 text-xs">
          <span className="truncate text-[#705844] font-mono text-[11px] flex-1 select-all" title={selectedUrl}>
            {selectedUrl}
          </span>
          <button
            id="qr-copy-link-btn"
            type="button"
            onClick={handleCopyLink}
            className="shrink-0 p-1 rounded hover:bg-[#eadfcb] text-[#5c2a1f] transition-colors cursor-pointer"
            title="Copy URL"
          >
            {copied ? (
              <span className="flex items-center gap-1 text-[#2f7a6f] font-bold text-[10px]">
                <Check className="w-3.5 h-3.5" />
                Copied
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Action Buttons: Open, Download, Share */}
      <div className="w-full mt-3 grid grid-cols-2 gap-2">
        <button
          id="qr-download-btn"
          type="button"
          onClick={handleDownload}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#5c2a1f] hover:bg-[#43231b] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-[#d9a441]" />
          <span>Save PNG</span>
        </button>

        <a
          id="qr-open-external-btn"
          href={selectedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#f5efe6] hover:bg-[#eadfcb] border border-[#eadfcb] text-[#5c2a1f] text-xs font-semibold transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#8c571c]" />
          <span>Open Link</span>
        </a>
      </div>

      {/* Style Toggle (Heritage Sandstone vs Monochrome) */}
      <div className="mt-3 flex items-center justify-between w-full text-[11px] text-[#705844] pt-2 border-t border-[#eadfcb]">
        <span>Theme: {useThemeColors ? 'Sandstone Red' : 'Classic Black'}</span>
        <button
          type="button"
          onClick={() => setUseThemeColors(prev => !prev)}
          className="text-[#2f7a6f] hover:underline font-semibold cursor-pointer"
        >
          Switch to {useThemeColors ? 'Black & White' : 'Sandstone Color'}
        </button>
      </div>

    </div>
  );
};
