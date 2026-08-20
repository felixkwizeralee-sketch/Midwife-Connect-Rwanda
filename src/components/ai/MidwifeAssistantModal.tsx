import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Sparkles,
  Send,
  Loader2,
  ShieldAlert,
  Bot,
  User as UserIcon,
  Copy,
  Check,
  RefreshCw,
  Baby,
  Heart,
  PhoneCall,
} from 'lucide-react';
import { usePlatform } from '../../contexts/PlatformContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const MidwifeAssistantModal: React.FC = () => {
  const { isAiAssistantOpen, setIsAiAssistantOpen, setIsEmergencyOpen } = usePlatform();
  const { language, t } = useLanguage();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hello! I am the **Midwife Connect Rwanda AI Educational Assistant** 🩺. 

I can assist you with:
- Clinical midwifery protocols (EmONC, AMTSL, PPH, Preeclampsia)
- Maternal & fetal health assessments and danger signs
- Newborn resuscitation (Helping Babies Breathe) & Kangaroo Mother Care (KMC)
- Contraceptive options & adolescent reproductive health counseling
- Study notes and exam revision for student midwives

*Please remember: I am an educational guide and cannot replace direct clinical judgment or emergency hospital evaluation.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAiAssistantOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAiAssistantOpen]);

  if (!isAiAssistantOpen) return null;

  const quickPrompts = [
    { label: '🩸 PPH First-Line Protocol', prompt: 'What is the step-by-step first-line management protocol for Postpartum Hemorrhage (PPH) according to WHO and Rwanda MoH?' },
    { label: '⚠️ Preeclampsia Danger Signs', prompt: 'What are the severe features of preeclampsia and what is the standard Magnesium Sulfate loading dose?' },
    { label: '👶 Helping Babies Breathe', prompt: 'Explain the Golden Minute and initial steps of neonatal resuscitation for a non-breathing newborn.' },
    { label: '🦘 Kangaroo Mother Care (KMC)', prompt: 'What are the clinical criteria and key instructions for initiating Kangaroo Mother Care (KMC) in low birth weight infants?' },
    { label: '🌱 Contraceptive Counseling', prompt: 'How should a midwife counsel a postpartum mother on choosing between PPIUD, implants, and LAM?' },
  ];

  const handleSendMessage = async (promptToSend?: string) => {
    const text = promptToSend || inputPrompt;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!promptToSend) setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text.trim(),
          language: language,
          conversationHistory: messages.map((m) => ({
            role: m.sender === 'assistant' ? 'assistant' : 'user',
            content: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'I could not generate an answer at this moment. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `*Notice:* Unable to reach the server. If this is an urgent obstetric situation, please call **SAMU (112)** or proceed to your nearest Rwanda district hospital immediately.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'msg-welcome-reset',
        sender: 'assistant',
        text: `Conversation reset. How can I assist your maternal health or midwifery studies today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-emerald-200 overflow-hidden flex flex-col h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-blue-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xs">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-white">
                  {t('aiAssistantModalTitle')}
                </h3>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                  Gemini 2.5
                </span>
              </div>
              <p className="text-xs text-emerald-200 truncate max-w-sm sm:max-w-md">
                {t('aiAssistantDescription')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              title="Reset Chat"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsAiAssistantOpen(false)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Emergency Triage Ribbon */}
        <div className="bg-rose-50 border-b border-rose-200 px-4 py-2 flex items-center justify-between text-xs text-rose-800">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-medium truncate">{t('aiAssistantDisclaimer')}</span>
          </div>
          <button
            onClick={() => {
              setIsAiAssistantOpen(false);
              setIsEmergencyOpen(true);
            }}
            className="shrink-0 text-xs font-bold text-rose-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Call 112</span>
            <PhoneCall className="w-3 h-3 text-rose-600" />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-2xs relative group ${
                  msg.sender === 'user'
                    ? 'bg-blue-700 text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

                <div
                  className={`mt-2 pt-1 flex items-center justify-between text-[10px] ${
                    msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'assistant' && (
                    <button
                      onClick={() => handleCopy(msg.text, msg.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-100 rounded text-slate-500 cursor-pointer"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <UserIcon className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-4 shadow-2xs flex items-center gap-2 text-slate-600 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                <span>Consulting evidence-based clinical guidelines...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-white border-t border-slate-200 overflow-x-auto flex gap-2 no-scrollbar">
          {quickPrompts.map((item, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => handleSendMessage(item.prompt)}
              className="shrink-0 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-medium border border-slate-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <textarea
            rows={1}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Ask anything about maternal health, newborn care, pharmacology, or midwifery..."
            className="flex-1 resize-none bg-slate-100 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputPrompt.trim() || isLoading}
            className="p-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white font-bold transition-colors cursor-pointer shadow-xs shrink-0"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
