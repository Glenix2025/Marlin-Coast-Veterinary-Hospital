import React, { useState, useRef, useEffect } from 'react';
import { Send, Phone, Calendar, Clock, Trash2, RefreshCw, AlertTriangle, MessageSquare, HeartHandshake, ShieldCheck, Sparkles, MapPin, ExternalLink, Pill } from 'lucide-react';
import { Header } from './components/Header';
import { BadgesBar } from './components/BadgesBar';
import { QuickReplies } from './components/QuickReplies';
import { ChatMessageItem } from './components/ChatMessageItem';
import { ClinicDrawer } from './components/ClinicDrawer';
import { PetSelector } from './components/PetSelector';
import { ChatMessage } from './types';
import { CLINIC_INFO } from './data/faqData';

const INITIAL_WELCOME_MSG: ChatMessage = {
  id: 'welcome-1',
  sender: 'bot',
  text: `Hello and welcome to **Marlin Coast Veterinary Hospital**! 🐾\n\nWe are a family-owned veterinary hospital led by **Dr Steven Porep and Dr Ashleigh Porep**, proudly providing a gold standard of caring, gentle veterinary care to Trinity Beach, Cairns, and the Northern Beaches community.\n\nHow can we help you and your pet today? Feel free to choose a quick question below or ask us about our services, trading hours, bookings, or payment options.`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MSG]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of message list when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      // Build API request payload
      const petContextPrefix = selectedPet
        ? `[Pet type context: ${selectedPet}] `
        : '';

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `${petContextPrefix}${text}`,
          history: messages.slice(-8), // Send recent message history for context
        }),
      });

      const data = await response.json();

      const botReplyText = data.reply || 'Thank you for your message. Please contact Marlin Coast Veterinary Hospital on 07 4057 6033 for assistance.';

      const isEmergency = data.isEmergency || text.toLowerCase().includes('emergency') || text.toLowerCase().includes('after hours');

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEmergencyAlert: isEmergency,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat request error:', error);
      const errorMessage: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: 'We encountered a momentary error connecting to our assistant. For immediate help, please call Marlin Coast Veterinary Hospital directly on **07 4057 6033**.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_WELCOME_MSG]);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] text-slate-800 flex flex-col font-sans selection:bg-[#0B4F6C] selection:text-white">
      {/* Header Section */}
      <Header onOpenInfo={() => setIsModalOpen(true)} />

      {/* Welcome Line Banner */}
      <div className="bg-[#E0F2FE] border-b border-[#BAE6FD] py-2.5 px-4 flex items-center justify-center text-center">
        <p className="text-xs md:text-sm font-medium text-[#075985] flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>Family owned & locally operated: Providing a gold standard of care for Trinity Beach & Cairns Northern Beaches.</span>
        </p>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-6">
        {/* Sidebar Info Section */}
        <aside className="w-full lg:w-72 border border-slate-200 bg-white p-6 rounded-2xl flex flex-col gap-6 shrink-0 shadow-xs">
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#0B4F6C]" />
              <span>Trading Hours</span>
            </h3>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-600">Mon - Fri</span>
                <span className="font-semibold text-slate-900">8am - 7pm</span>
              </li>
              <li className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-600">Saturday</span>
                <span className="font-semibold text-slate-900">8am - 3pm</span>
              </li>
              <li className="flex justify-between text-slate-400">
                <span>Sunday</span>
                <span className="font-medium italic text-slate-400">Closed</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0B4F6C]" />
              <span>Location</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Cnr Aropa St & Captain Cook Hwy,<br />
              <strong className="text-slate-800">Trinity Beach QLD 4879</strong>
            </p>
          </section>

          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Contact Clinic</span>
            </h3>
            <div className="space-y-1.5 text-xs">
              <a
                href={`tel:${CLINIC_INFO.phoneClean}`}
                className="block font-bold text-[#0B4F6C] hover:text-[#10B981] transition-colors text-sm"
              >
                07 4057 6033
              </a>
              <div className="text-slate-500 text-[11px]">After hours emergency available</div>
              <a
                href={`mailto:${CLINIC_INFO.email}`}
                className="block text-slate-600 hover:text-[#0B4F6C] underline transition-colors"
              >
                {CLINIC_INFO.email}
              </a>
            </div>
          </section>

          <div className="mt-auto pt-4 border-t border-slate-100 space-y-3">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center">
              Accreditations & Payment Options
            </p>
            <div className="grid grid-cols-2 gap-2">
              {CLINIC_INFO.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex items-center justify-center text-[10px] font-bold text-slate-600 text-center uppercase leading-tight shadow-2xs"
                >
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden h-[620px] lg:h-[700px] relative">
          {/* Chat Header Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E0F2FE] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#0B4F6C]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#0B4F6C]">Marlin Coast Assistant</h2>
                <p className="text-[11px] text-slate-500">Gold standard care knowledge base</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleClearChat}
                className="text-xs text-slate-500 hover:text-[#0B4F6C] flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-slate-200 transition-colors font-medium"
                title="Restart conversation"
                id="clear-chat-btn"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Chat</span>
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[#FAFCFD]">
            {messages.map((msg) => (
              <ChatMessageItem
                key={msg.id}
                message={msg}
                onSelectQuickAction={(prompt) => handleSendMessage(prompt)}
              />
            ))}

            {/* Loading state */}
            {isLoading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs py-2 px-4 bg-white rounded-full border border-slate-200 w-fit animate-pulse shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0B4F6C] animate-spin" />
                <span>Consulting clinic knowledge base...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Intent Chips & Pet Selector */}
          <div className="border-t border-slate-200 bg-slate-50 p-4 space-y-2.5">
            <PetSelector selectedPet={selectedPet} onSelectPet={setSelectedPet} />

            <QuickReplies
              onSelectIntent={(prompt) => handleSendMessage(prompt)}
              disabled={isLoading}
            />

            {/* Input Form matching Clean Minimalism design */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3 pt-1"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about services, hours, bookings, or emergency care..."
                disabled={isLoading}
                className="flex-1 bg-white border border-slate-200 rounded-full px-6 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B4F6C] focus:border-transparent transition-all shadow-inner disabled:bg-slate-100"
                id="chat-input-field"
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="w-12 h-12 bg-[#0B4F6C] hover:bg-[#083b52] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                id="send-chat-btn"
                title="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Sub-Footer */}
      <footer className="bg-[#0B4F6C] text-white/80 text-xs py-4 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 mt-8 border-t border-[#083e55]">
        <div>Led by Dr Steven Porep & Dr Ashleigh Porep</div>
        <div className="flex gap-6 uppercase tracking-widest font-bold text-[10px] text-sky-200">
          <span>Trinity Beach</span>
          <span>•</span>
          <span>Cairns</span>
          <span>•</span>
          <span>Northern Beaches</span>
        </div>
        <div>
          <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-white transition-colors">
            {CLINIC_INFO.email}
          </a>
        </div>
      </footer>

      {/* Clinic Details Modal */}
      <ClinicDrawer isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
