import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Loader2 } from 'lucide-react';

interface AudioPlayerProps {
  textEn: string;
  textKn: string;
  currentLang: 'en' | 'kn';
  title: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  textEn,
  textKn,
  currentLang,
  title
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useGeminiTTS, setUseGeminiTTS] = useState(false);
  const [isLoadingTTS, setIsLoadingTTS] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const activeText = currentLang === 'kn' ? textKn : textEn;

  // Cleanup audio on unmount or text change
  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, [activeText]);

  const stopPlayback = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const togglePlay = async () => {
    if (isPlaying) {
      stopPlayback();
      return;
    }

    setAudioError(null);

    // If Gemini TTS is preferred and in English, try server TTS
    if (useGeminiTTS && currentLang === 'en') {
      try {
        setIsLoadingTTS(true);
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: activeText, voice: 'Kore' }),
        });

        if (!res.ok) {
          throw new Error('Server TTS unavailable; falling back to device audio');
        }

        const data = await res.json();
        if (data.audioBase64) {
          // Play base64 audio
          const audioSrc = `data:audio/mp3;base64,${data.audioBase64}`;
          if (!audioRef.current) {
            audioRef.current = new Audio();
          }
          audioRef.current.src = audioSrc;
          audioRef.current.onended = () => setIsPlaying(false);
          audioRef.current.onerror = () => {
            playBrowserSpeech();
          };
          await audioRef.current.play();
          setIsPlaying(true);
          setIsLoadingTTS(false);
          return;
        }
      } catch (err: any) {
        console.warn('Gemini TTS fallback:', err);
        // Fallback to browser speech synthesis
      } finally {
        setIsLoadingTTS(false);
      }
    }

    // Standard Browser SpeechSynthesis (Reliable for stage demo)
    playBrowserSpeech();
  };

  const playBrowserSpeech = () => {
    if (!('speechSynthesis' in window)) {
      setAudioError('Browser speech synthesis is not supported on this device.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(activeText);
    utterance.lang = currentLang === 'kn' ? 'kn-IN' : 'en-IN';
    utterance.rate = currentLang === 'kn' ? 0.9 : 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => {
      setIsPlaying(false);
      setAudioError('Audio playback interrupted.');
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-[#f5efe6] rounded-xl p-3.5 border border-[#eadfcb]">
      <div className="flex items-center justify-between gap-3">
        
        {/* Left: Play button & Track Info */}
        <div className="flex items-center gap-3">
          <button
            id={`audio-play-btn-${title.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={togglePlay}
            disabled={isLoadingTTS}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
              isPlaying
                ? 'bg-[#d9a441] text-[#5c2a1f] scale-105 ring-2 ring-[#d9a441]/50'
                : 'bg-[#5c2a1f] hover:bg-[#6d2f21] text-white'
            }`}
            title={isPlaying ? 'Pause Audio Guide' : 'Listen to Audio Guide'}
          >
            {isLoadingTTS ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isPlaying ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8c571c]">
                {currentLang === 'kn' ? 'ಶ್ರಾವ್ಯ ಮಾರ್ಗದರ್ಶಿ' : 'Audio Guide'}
              </span>
              {isPlaying && (
                <span className="flex items-center gap-0.5">
                  <span className="w-1 h-3 bg-[#d9a441] animate-pulse rounded-full" />
                  <span className="w-1 h-4 bg-[#8c571c] animate-bounce rounded-full" />
                  <span className="w-1 h-2 bg-[#d9a441] animate-pulse rounded-full" />
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-[#2c2018] truncate max-w-[200px] sm:max-w-xs">
              {currentLang === 'kn' ? `${title} (ಕನ್ನಡ ವಿವರಣೆ)` : `${title} Narration`}
            </p>
          </div>
        </div>

        {/* Right: Engine Selector & Language indicator */}
        <div className="flex items-center gap-2">
          {currentLang === 'en' && (
            <button
              onClick={() => setUseGeminiTTS(!useGeminiTTS)}
              className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-md transition-colors ${
                useGeminiTTS
                  ? 'bg-[#2f7a6f] text-white'
                  : 'bg-[#eadfcb] text-[#5c2a1f] hover:bg-[#dcc8a8]'
              }`}
              title="Toggle Gemini Studio Voice"
            >
              <Sparkles className="w-3 h-3 text-[#d9a441]" />
              <span>{useGeminiTTS ? 'Studio Voice' : 'Standard'}</span>
            </button>
          )}

          <span className="text-xs font-mono font-semibold px-2 py-1 bg-[#eadfcb]/80 rounded text-[#5c2a1f]">
            {currentLang === 'kn' ? 'KN' : 'EN'}
          </span>
        </div>
      </div>

      {audioError && (
        <p className="mt-2 text-xs text-rose-700 bg-rose-50 p-1.5 rounded border border-rose-200">
          {audioError}
        </p>
      )}
    </div>
  );
};
