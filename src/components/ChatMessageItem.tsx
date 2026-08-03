import React, { useState } from 'react';
import { Copy, Check, Phone, Calendar, ExternalLink, AlertTriangle, User } from 'lucide-react';
import { ChatMessage } from '../types';
import { CLINIC_INFO } from '../data/faqData';

interface ChatMessageItemProps {
  message: ChatMessage;
  onSelectQuickAction?: (prompt: string) => void;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message, onSelectQuickAction }) => {
  const [copied, setCopied] = useState(false);
  const isBot = message.sender === 'bot';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Parse message text to highlight telephone numbers, emails, and HTTPS links.
   */
  const renderFormattedText = (text: string) => {
    // Regex matching URLs, phones, and emails
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const phoneRegex = /(07\s?4057\s?6033)/g;
    const emailRegex = /(admin@mcvet\.com\.au)/g;

    const parts = text.split('\n').map((line, lineIdx) => {
      // Parse bold syntax **text**
      const processBold = (str: string) => {
        const boldParts = str.split(/(\*\*[^*]+\*\*)/g);
        return boldParts.map((bPart, bIdx) => {
          if (bPart.startsWith('**') && bPart.endsWith('**')) {
            return <strong key={bIdx} className="font-semibold text-slate-900">{bPart.slice(2, -2)}</strong>;
          }

          // Process links inside str
          const subTokens = bPart.split(urlRegex);
          return subTokens.map((token, tokenIdx) => {
            if (token.match(urlRegex)) {
              return (
                <a
                  key={tokenIdx}
                  href={token}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#008CA8] font-semibold underline underline-offset-2 hover:text-[#005B7F] transition-colors break-all px-1 py-0.5 rounded bg-sky-50/80"
                >
                  <span>{token}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              );
            }

            // Check for phone number matches inside token
            const phoneTokens = token.split(phoneRegex);
            return phoneTokens.map((pToken, pIdx) => {
              if (pToken.match(phoneRegex)) {
                return (
                  <a
                    key={pIdx}
                    href={`tel:${CLINIC_INFO.phoneClean}`}
                    className="inline-flex items-center gap-1 text-[#005B7F] font-bold underline underline-offset-2 hover:text-[#003B52] transition-colors px-1 py-0.5 rounded bg-emerald-50"
                  >
                    <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>{pToken}</span>
                  </a>
                );
              }

              // Check email matches
              const emailTokens = pToken.split(emailRegex);
              return emailTokens.map((eToken, eIdx) => {
                if (eToken.match(emailRegex)) {
                  return (
                    <a
                      key={eIdx}
                      href={`mailto:${eToken}`}
                      className="inline-flex items-center gap-1 text-sky-700 font-semibold underline hover:text-sky-900 transition-colors"
                    >
                      <span>{eToken}</span>
                    </a>
                  );
                }
                return eToken;
              });
            });
          });
        });
      };

      return (
        <p key={lineIdx} className={lineIdx > 0 ? 'mt-2' : ''}>
          {processBold(line)}
        </p>
      );
    });

    return parts;
  };

  return (
    <div
      className={`flex items-start gap-4 my-4 ${
        isBot ? 'justify-start' : 'justify-end'
      }`}
      id={`chat-msg-${message.id}`}
    >
      {/* Avatar for Bot */}
      {isBot && (
        <div className="w-10 h-10 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center text-[#0B4F6C] shrink-0 shadow-xs">
          <svg className="w-6 h-6 text-[#0B4F6C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
      )}

      {/* Message Content Bubble */}
      <div
        className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4.5 shadow-xs relative text-sm leading-relaxed ${
          isBot
            ? message.isEmergencyAlert
              ? 'bg-red-50 border-2 border-red-300 text-red-950 rounded-tl-none'
              : 'bg-slate-100 text-slate-700 shadow-xs rounded-tl-none'
            : 'bg-[#0B4F6C] text-white rounded-tr-none'
        }`}
      >
        {/* Emergency Badge Header inside bot bubble if applicable */}
        {isBot && message.isEmergencyAlert && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-red-200 text-red-800 font-bold text-xs">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 animate-pulse" />
            <span>Emergency Advisory</span>
          </div>
        )}

        <div className="space-y-1">{renderFormattedText(message.text)}</div>

        {/* Action button bar for bot responses */}
        {isBot && (
          <div className="mt-3 pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400">{message.timestamp}</span>
              <span className="text-slate-300">•</span>
              <span className="text-[10px] text-[#0B4F6C] font-semibold">Marlin Coast Bot</span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-slate-400 hover:text-slate-700 transition-colors text-[11px] px-1.5 py-0.5 rounded hover:bg-slate-200"
              title="Copy message"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-[#10B981]" />
                  <span className="text-[#10B981] font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}

        {!isBot && (
          <div className="text-right mt-1">
            <span className="text-[10px] text-sky-200/80">{message.timestamp}</span>
          </div>
        )}
      </div>

      {/* Avatar for User */}
      {!isBot && (
        <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 shrink-0 shadow-xs">
          <User className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};
