import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  MapPin, 
  Compass, 
  Thermometer, 
  BookOpen, 
  Lightbulb, 
  ChevronRight,
  RefreshCw,
  HelpCircle,
  ExternalLink,
  Smartphone
} from 'lucide-react';
import { ChatMessage, Monument } from '../types';
import { MONUMENTS } from '../data/monuments';

interface AIAssistantViewProps {
  lang: 'en' | 'kn';
  initialMonumentId?: string;
  onNavigateToMonument?: (monumentId: string) => void;
  onNavigateToPlanner?: (monumentId: string) => void;
  onNavigateToMap?: () => void;
}

const DEFAULT_WELCOME_MESSAGE_EN: ChatMessage = {
  id: 'welcome-en',
  role: 'assistant',
  content: `Namaskara! Welcome to your **General AI Assistant & Heritage Guide**. 

I am a versatile, open-ended AI companion equipped to answer **any question** you might have:
- 🌐 **General Inquiries & Knowledge**: Science, math, world history, coding, creative writing, advice, or everyday trivia.
- 🏛️ **Badami Circuit & Chalukyan Heritage**: 6th-century rock-cut caves, UNESCO Pattadakal, Aihole, and sacred temple architecture.
- 🚗 **Travel & Trip Logistics**: Transport, driving routes, trains from Bangalore/Hubli/Goa, hotels, North Karnataka cuisine (Jolada rotti), and visit timings.
- 🗣️ **Languages & Translations**: Kannada to English translations, local terms, and conversational help.

Feel free to ask **any type of question** — there are no topic limits! How can I help you today?`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestedQuestions: [
    'How do I plan a trip to Badami, Pattadakal & Aihole?',
    'What is the historical significance of the Badami Chalukyas?',
    'Ask me any general knowledge or travel question!'
  ]
};

const DEFAULT_WELCOME_MESSAGE_KN: ChatMessage = {
  id: 'welcome-kn',
  role: 'assistant',
  content: `ನಮಸ್ಕಾರ! ನಿಮ್ಮ **ಸಮಗ್ರ AI ಸಹಾಯಕ ಮತ್ತು ಹೆರಿಟೇಜ್ ಮಾರ್ಗದರ್ಶಿ**ಗೆ ಸುಸ್ವಾಗತ.

ನಾನು ಯಾವುದೇ ರೀತಿಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಬಲ್ಲ ಮುಕ್ತ AI ಸಹಾಯಕ:
- 🌐 **ಸಾಮಾನ್ಯ ಜ್ಞಾನ ಮತ್ತು ಪ್ರಶ್ನೋತ್ತರ**: ವಿಜ್ಞಾನ, ಇತಿಹಾಸ, ತಂತ್ರಜ್ಞಾನ, ಗಣಿತ ಅಥವಾ ದಿನನಿತ್ಯದ ಪ್ರಶ್ನೆಗಳು.
- 🏛️ **ಬಾದಾಮಿ ಸರ್ಕ್ಯೂಟ್ ಪರಂಪರೆ**: ಬಾದಾಮಿ ಗುಹೆಗಳು, ಪಟ್ಟದಕಲ್ಲು, ಐಹೊಳೆ ಮತ್ತು ಚಾಲುಕ್ಯರ ವಾಸ್ತುಶಿಲ್ಪ.
- 🚗 **ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶನ**: ರೈಲು, ಬಸ್ಸು, ಹೋಟೆಲ್‌ಗಳು ಮತ್ತು ೧ ದಿನದ ಪ್ರವಾಸ ಪಟ್ಟಿ.
- 🗣️ **ಅನುವಾದ ಮತ್ತು ಭಾಷೆ**: ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್ ಭಾಷೆಯ ನೆರವು.

ನೀವು ಯಾವುದೇ ವಿಷಯದ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಬಹುದು! ನಾನು ನಿಮಗೆ ಹೇಗೆ ನೆರವಾಗಲಿ?`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  suggestedQuestions: [
    'ಬಾದಾಮಿ ಗುಹೆ ೧ ರ ನಟರಾಜನ ವಿಶೇಷತೆ ತಿಳಿಸಿ',
    'ಬೆಂಗಳೂರಿನಿಂದ ಬಾದಾಮಿಗೆ ರೈಲಿನಲ್ಲಿ ಹೇಗೆ ಹೋಗುವುದು?',
    'ಯಾವುದೇ ಸಾಮಾನ್ಯ ಜ್ಞಾನದ ಪ್ರಶ್ನೆ ಕೇಳಿ'
  ]
};

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  lang,
  initialMonumentId,
  onNavigateToMonument,
  onNavigateToPlanner,
  onNavigateToMap
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    lang === 'kn' ? DEFAULT_WELCOME_MESSAGE_KN : DEFAULT_WELCOME_MESSAGE_EN
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMonumentContext, setSelectedMonumentContext] = useState<string>(initialMonumentId || 'all');
  const [activeAudioMessageId, setActiveAudioMessageId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync welcome language if thread is brand new
  useEffect(() => {
    if (messages.length === 1 && messages[0].id.startsWith('welcome-')) {
      setMessages([lang === 'kn' ? DEFAULT_WELCOME_MESSAGE_KN : DEFAULT_WELCOME_MESSAGE_EN]);
    }
  }, [lang]);

  // Update monument context if prop changes
  useEffect(() => {
    if (initialMonumentId) {
      setSelectedMonumentContext(initialMonumentId);
    }
  }, [initialMonumentId]);

  // Scroll to bottom of message thread
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      relatedMonumentId: selectedMonumentContext !== 'all' ? selectedMonumentContext : undefined
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputQuery('');
    setIsLoading(true);

    try {
      // Find monument name if selected
      const currentMonumentObj = MONUMENTS.find(m => m.id === selectedMonumentContext);
      const monumentName = currentMonumentObj ? currentMonumentObj.name : undefined;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          monumentContext: selectedMonumentContext !== 'all' ? (monumentName || selectedMonumentContext) : undefined,
          lang
        })
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Apologies, I could not retrieve details at this moment. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: data.suggestedQuestions || [],
        relatedMonumentId: selectedMonumentContext !== 'all' ? selectedMonumentContext : undefined
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('AI chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `I ran into a temporary connection issue while processing your question: **"${query}"**.

Please feel free to click **Ask** again to retry, or ask another question on any topic — I am ready to answer general questions, travel logistics, or historical details.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: [
          'Retry: ' + (query.length > 30 ? query.slice(0, 30) + '...' : query),
          'What are the best hours to visit Badami Caves?',
          'Ask me any general knowledge or travel question'
        ]
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleCopyMessage = async (msgId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(msgId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(msgId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handlePlayAudio = async (msgId: string, text: string) => {
    // If already playing this message, stop
    if (activeAudioMessageId === msgId && isAudioPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsAudioPlaying(false);
      setActiveAudioMessageId(null);
      return;
    }

    setActiveAudioMessageId(msgId);
    setIsAudioPlaying(true);

    // Clean markdown symbols for natural TTS speech
    const cleanSpeech = text
      .replace(/\*\*/g, '')
      .replace(/[\#\_\*\`]/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/💡|🏛️|🗺️|📜|👟|🌅|🚗|🍱|🌇/g, '')
      .slice(0, 500); // Read first clean paragraph

    try {
      // Try server Gemini TTS first
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanSpeech, voice: 'Kore' })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audioBase64) {
          if (audioRef.current) {
            audioRef.current.pause();
          }
          const audio = new Audio(`data:audio/mp3;base64,${data.audioBase64}`);
          audioRef.current = audio;
          audio.onended = () => {
            setIsAudioPlaying(false);
            setActiveAudioMessageId(null);
          };
          audio.onerror = () => {
            fallbackSpeechSynthesis(cleanSpeech);
          };
          await audio.play();
          return;
        }
      }
      fallbackSpeechSynthesis(cleanSpeech);
    } catch {
      fallbackSpeechSynthesis(cleanSpeech);
    }
  };

  const fallbackSpeechSynthesis = (text: string) => {
    if (!('speechSynthesis' in window)) {
      setIsAudioPlaying(false);
      setActiveAudioMessageId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'kn' ? 'kn-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.onend = () => {
      setIsAudioPlaying(false);
      setActiveAudioMessageId(null);
    };
    utterance.onerror = () => {
      setIsAudioPlaying(false);
      setActiveAudioMessageId(null);
    };
    window.speechSynthesis.speak(utterance);
  };

  const handleResetChat = () => {
    if (audioRef.current) audioRef.current.pause();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsAudioPlaying(false);
    setActiveAudioMessageId(null);
    setMessages([lang === 'kn' ? DEFAULT_WELCOME_MESSAGE_KN : DEFAULT_WELCOME_MESSAGE_EN]);
  };

  const selectedMonument = MONUMENTS.find(m => m.id === selectedMonumentContext);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-[#2c2018] via-[#43231b] to-[#5c2a1f] rounded-3xl p-6 sm:p-8 text-white shadow-md border-2 border-[#eadfcb]/30 mb-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#d9a441]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#d9a441] text-[#5c2a1f] flex items-center justify-center shadow-lg shrink-0 mt-0.5">
              <Bot className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-heritage text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {lang === 'kn' ? 'AI ಸಮಗ್ರ ಸಹಾಯಕ & ಹೆರಿಟೇಜ್ ಮಾರ್ಗದರ್ಶಿ' : 'AI General Assistant & Heritage Guide'}
                </h1>
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#d9a441]/20 text-[#d9a441] border border-[#d9a441]/40 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Universal AI Intelligence
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#eadfcb] mt-1 max-w-2xl leading-relaxed">
                {lang === 'kn'
                  ? 'ಯಾವುದೇ ವಿಷಯದ ಬಗ್ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ — ಸಾಮಾನ್ಯ ಜ್ಞಾನ, ವಿಜ್ಞಾನ, ಪ್ರಯಾಣ, ಅನುವಾದ ಹಾಗೂ ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆಯ ಶಿಲ್ಪಕಲೆ.'
                  : 'Ask any question — general knowledge, travel planning, science, math, translations, or deep explorations of Badami, Pattadakal, and Aihole.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
            <button
              id="reset-chat-btn"
              onClick={handleResetChat}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset conversation"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#d9a441]" />
              <span>New Thread</span>
            </button>
          </div>
        </div>

        {/* Monument Focus Filter Bar */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#eadfcb] font-medium flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#d9a441]" />
            <span>Focus Site:</span>
          </span>

          <button
            onClick={() => setSelectedMonumentContext('all')}
            className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
              selectedMonumentContext === 'all'
                ? 'bg-[#d9a441] text-[#2c2018] font-bold shadow-xs'
                : 'bg-white/10 text-white/90 hover:bg-white/20'
            }`}
          >
            All Circuit Sites
          </button>

          {MONUMENTS.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMonumentContext(m.id)}
              className={`px-3 py-1 rounded-full font-medium transition-all cursor-pointer truncate max-w-[180px] ${
                selectedMonumentContext === m.id
                  ? 'bg-[#d9a441] text-[#2c2018] font-bold shadow-xs'
                  : 'bg-white/10 text-white/90 hover:bg-white/20'
              }`}
            >
              {lang === 'kn' ? m.kannadaName.split(' ')[0] : m.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Chat Workspace + Archaeological Knowledge Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left / Center Column: Chat Messages & Input (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-white rounded-3xl border-2 border-[#eadfcb] shadow-sm overflow-hidden min-h-[640px] max-h-[760px]">
          
          {/* Chat Top Subhead */}
          <div className="bg-[#fbf8f3] px-6 py-3.5 border-b border-[#eadfcb] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#705844]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI Mode: <strong>General Intelligence + Heritage Registry</strong></span>
            </div>

            {selectedMonument && (
              <span className="text-xs font-semibold text-[#5c2a1f] bg-[#d9a441]/20 px-2.5 py-0.5 rounded-full border border-[#d9a441]/40">
                Context: {lang === 'kn' ? selectedMonument.kannadaName : selectedMonument.name}
              </span>
            )}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#faf6ef]/30">
            {messages.map((msg) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 ${isAssistant ? 'items-start' : 'items-start flex-row-reverse'}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs shadow-xs ${
                    isAssistant 
                      ? 'bg-[#5c2a1f] text-[#d9a441]' 
                      : 'bg-[#2f7a6f] text-white font-bold'
                  }`}>
                    {isAssistant ? <Bot className="w-4 h-4" /> : 'You'}
                  </div>

                  {/* Message Bubble Container */}
                  <div className={`max-w-[85%] sm:max-w-[80%] space-y-2 ${isAssistant ? 'text-left' : 'text-right'}`}>
                    <div className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs text-left ${
                      isAssistant
                        ? 'bg-white text-[#2c2018] border border-[#eadfcb]'
                        : 'bg-[#5c2a1f] text-white'
                    }`}>
                      {/* Markdown rendering with nice whitespace and list formatting */}
                      <div className="prose prose-sm max-w-none text-current space-y-2 whitespace-pre-line font-sans">
                        {msg.content}
                      </div>

                      {/* Assistant Actions Bar: Audio Readout & Copy */}
                      {isAssistant && (
                        <div className="mt-3 pt-2.5 border-t border-[#eadfcb]/60 flex items-center justify-between text-xs text-[#705844]">
                          <span className="text-[10px] text-[#8c571c] font-mono">
                            {msg.timestamp}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handlePlayAudio(msg.id, msg.content)}
                              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                                activeAudioMessageId === msg.id && isAudioPlaying
                                  ? 'bg-[#d9a441] text-[#2c2018]'
                                  : 'hover:bg-[#f5efe6] text-[#5c2a1f]'
                              }`}
                              title="Listen to this explanation"
                            >
                              {activeAudioMessageId === msg.id && isAudioPlaying ? (
                                <>
                                  <VolumeX className="w-3 h-3" />
                                  <span>Stop Audio</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-3 h-3 text-[#2f7a6f]" />
                                  <span>Listen</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => handleCopyMessage(msg.id, msg.content)}
                              className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold text-[#5c2a1f] hover:bg-[#f5efe6] transition-colors cursor-pointer"
                              title="Copy text"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3 h-3 text-[#2f7a6f]" />
                                  <span className="text-[#2f7a6f]">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-[#705844]" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Interactive Suggested Questions Chips */}
                    {isAssistant && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-1.5">
                        {msg.suggestedQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(q)}
                            disabled={isLoading}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-[#f5efe6] border border-[#eadfcb] text-[11px] font-medium text-[#5c2a1f] shadow-2xs transition-all cursor-pointer disabled:opacity-50 text-left"
                          >
                            <Lightbulb className="w-3 h-3 text-[#d9a441] shrink-0" />
                            <span>{q}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#5c2a1f] text-[#d9a441] flex items-center justify-center shrink-0 text-xs shadow-xs">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#eadfcb] shadow-xs text-xs text-[#705844] flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#d9a441]" />
                  <span>Consulting Chalukyan epigraphy and site chronicles...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Pill Carousel (Sticky above input) */}
          <div className="bg-[#fbf8f3] px-4 py-2 border-t border-[#eadfcb] flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            <span className="text-[#8c571c] font-bold shrink-0 flex items-center gap-1 pr-1">
              <Sparkles className="w-3 h-3" />
              Quick:
            </span>
            <button
              type="button"
              onClick={() => handleSendMessage("Ask me anything: Can you give me a general overview of Karnataka's history and geography?")}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#eadfcb] border border-[#eadfcb] text-[#5c2a1f] shrink-0 transition-colors cursor-pointer"
            >
              General Overview
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage("How to travel from Bangalore to Badami by train or road?")}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#eadfcb] border border-[#eadfcb] text-[#5c2a1f] shrink-0 transition-colors cursor-pointer"
            >
              Bangalore to Badami Route
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage("What are the differences between Cave 1, 2, 3, and 4 in Badami?")}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#eadfcb] border border-[#eadfcb] text-[#5c2a1f] shrink-0 transition-colors cursor-pointer"
            >
              Cave 1-4 Differences
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage("Teach me 5 useful Kannada phrases for a traveler visiting Karnataka")}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#eadfcb] border border-[#eadfcb] text-[#5c2a1f] shrink-0 transition-colors cursor-pointer"
            >
              Kannada Phrases
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage("Why is Pattadakal recognized as a UNESCO World Heritage site?")}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#eadfcb] border border-[#eadfcb] text-[#5c2a1f] shrink-0 transition-colors cursor-pointer"
            >
              UNESCO Pattadakal
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage("What should I know about barefoot temple walking and sandstone heat?")}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#eadfcb] border border-[#eadfcb] text-[#5c2a1f] shrink-0 transition-colors cursor-pointer"
            >
              Barefoot & Heat Guide
            </button>
          </div>

          {/* Input Box */}
          <div className="p-3 sm:p-4 bg-white border-t border-[#eadfcb]">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                id="ai-assistant-input"
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={
                  lang === 'kn'
                    ? 'ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ — ಸಾಮಾನ್ಯ ಜ್ಞಾನ, ಪ್ರಯಾಣ, ಇತಿಹಾಸ, ವಿಜ್ಞಾನ, ಅನುವಾದ...'
                    : 'Ask anything — general questions, travel, history, science, translations...'
                }
                disabled={isLoading}
                className="flex-1 bg-[#fbf8f3] border border-[#eadfcb] focus:border-[#d9a441] focus:ring-2 focus:ring-[#d9a441]/20 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#2c2018] placeholder-[#705844]/60 outline-hidden transition-all"
              />

              <button
                id="ai-assistant-send-btn"
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className="px-5 py-3 rounded-xl bg-[#5c2a1f] hover:bg-[#43231b] disabled:bg-[#eadfcb] disabled:text-[#705844] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: In-Situ Field Cards & Circuit Discovery (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Active Monument Spotlight Card */}
          {selectedMonument && (
            <div className="bg-white rounded-2xl p-5 border border-[#eadfcb] shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8c571c] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#d9a441]" />
                  Active Site Spotlight
                </span>
                <span className="text-[10px] font-mono bg-[#f5efe6] px-2 py-0.5 rounded text-[#705844]">
                  {selectedMonument.century}
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden mb-3 h-32 border border-[#eadfcb]">
                <img 
                  src={selectedMonument.image} 
                  alt={selectedMonument.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                  <p className="text-xs font-bold text-white leading-tight">
                    {lang === 'kn' ? selectedMonument.kannadaName : selectedMonument.name}
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#705844] line-clamp-2 mb-3">
                {lang === 'kn' ? selectedMonument.kannadaHistory : selectedMonument.shortHistory}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => {
                    handleSendMessage(`Tell me the top 3 hidden details I must look for when visiting ${selectedMonument.name}`);
                  }}
                  className="p-2 rounded-lg bg-[#f5efe6] hover:bg-[#eadfcb] text-[#5c2a1f] font-semibold text-center transition-colors cursor-pointer text-[11px]"
                >
                  🔍 3 Hidden Details
                </button>

                <button
                  onClick={() => {
                    handleSendMessage(`What is the architectural style and symbolism of ${selectedMonument.name}?`);
                  }}
                  className="p-2 rounded-lg bg-[#f5efe6] hover:bg-[#eadfcb] text-[#5c2a1f] font-semibold text-center transition-colors cursor-pointer text-[11px]"
                >
                  🏛️ Architecture
                </button>
              </div>

              {onNavigateToMonument && (
                <button
                  onClick={() => onNavigateToMonument(selectedMonument.id)}
                  className="w-full mt-3 py-1.5 text-center text-xs font-semibold text-[#2f7a6f] hover:underline flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Open Full Monument Dossier</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Barefoot & Sandstone Heat Advisory Box */}
          <div className="bg-[#fbf8f3] rounded-2xl p-5 border border-[#eadfcb]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8c571c] mb-2">
              <Thermometer className="w-4 h-4 text-[#d9a441]" />
              <span>In-Situ Sandstone Heat Rules</span>
            </div>
            <p className="text-xs text-[#705844] leading-relaxed">
              Because Hindu and Jain temple sanctums require removing footwear, red sandstone courtyards in Badami and Pattadakal reach up to <strong>48°C</strong> between 11:30 AM and 3:30 PM.
            </p>
            <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Pro Visitor Tip:</strong> Carry a clean pair of thick cotton socks in your daypack to walk safely across sanctum stones!
              </span>
            </div>
          </div>

          {/* Curated Historical Chronicles Card */}
          <div className="bg-white rounded-2xl p-5 border border-[#eadfcb] shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5c2a1f] mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#d9a441]" />
              <span>Key Archaeological Epigraphs</span>
            </h4>
            
            <div className="space-y-3 text-xs">
              <div 
                onClick={() => handleSendMessage("Tell me about the 543 CE cliff inscription of Pulakeshin I in Badami")}
                className="p-2.5 rounded-xl bg-[#faf6ef] hover:bg-[#f5efe6] border border-[#eadfcb] cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#5c2a1f]">543 CE Pulakeshin I Inscription</span>
                  <span className="text-[10px] text-[#8c571c]">Badami Cliff</span>
                </div>
                <p className="text-[11px] text-[#705844] mt-0.5">Records the founding of Vatapi fortress by Pulakeshin I.</p>
              </div>

              <div 
                onClick={() => handleSendMessage("What does the 578 CE Mangalesha inscription in Cave 3 say?")}
                className="p-2.5 rounded-xl bg-[#faf6ef] hover:bg-[#f5efe6] border border-[#eadfcb] cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#5c2a1f]">578 CE Mangalesha Epigraph</span>
                  <span className="text-[10px] text-[#8c571c]">Cave 3</span>
                </div>
                <p className="text-[11px] text-[#705844] mt-0.5">Precise Saka year date for the Mahavishnu cave dedication.</p>
              </div>

              <div 
                onClick={() => handleSendMessage("Explain the famous 634 CE Aihole Inscription by poet Ravikirti")}
                className="p-2.5 rounded-xl bg-[#faf6ef] hover:bg-[#f5efe6] border border-[#eadfcb] cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#5c2a1f]">634 CE Aihole Prashasti</span>
                  <span className="text-[10px] text-[#8c571c]">Meguti Hill</span>
                </div>
                <p className="text-[11px] text-[#705844] mt-0.5">Composed by Ravikirti, celebrating the victory over King Harsha.</p>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="p-4 rounded-2xl bg-[#2f7a6f]/10 border border-[#2f7a6f]/30 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-[#2f7a6f]">Want to plan your visit?</p>
              <p className="text-[11px] text-[#705844]">See crowd timing and temperature curves</p>
            </div>
            {onNavigateToPlanner && (
              <button
                onClick={() => onNavigateToPlanner(selectedMonumentContext !== 'all' ? selectedMonumentContext : 'badami_caves')}
                className="px-3 py-1.5 rounded-lg bg-[#2f7a6f] text-white font-semibold hover:bg-[#25635a] transition-colors cursor-pointer"
              >
                Planner
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
