import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Minimize2, Maximize2, MessageSquare, Bot, Sparkles, Users, Search, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
}

const supabase = createClient(
  'https://mlxfkqucoppyxlgvyrwk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1seGZrcXVjb3BweXhsZ3Z5cndrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NjQ8MTQsImV4cCI6MjA2MTI0MDgxNH0.0qVoA8T8KUU-tFOZKc1bw_9RiE2C91C9k9JbhfSJ8W4'
);
const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, i18n } = useTranslation();

  const tabs: Tab[] = [
    {
      id: 'chatbot',
      label: 'Custom Chatbot',
      icon: <Bot className="w-5 h-5" />,
      action: () => handleQuickAction("Tell me about your chatbot solution")
    },
    {
      id: 'voice',
      label: 'Voice Agent',
      icon: <Phone className="w-5 h-5" />,
      action: () => handleQuickAction("Tell me about your voice agent solution")
    },
    {
      id: 'support',
      label: 'Support',
      icon: <Users className="w-5 h-5" />,
      action: () => handleQuickAction("I need help with support")
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !showGreeting) {
        setShowGreeting(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = async (callback: () => void) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 1000));
    setIsTyping(false);
    callback();
  };

  const handleQuickAction = async (quickMessage: string) => {
    setMessage(quickMessage);
    handleSendMessage(new Event('submit') as any, quickMessage);
  };

  const handleSendMessage = async (e: React.FormEvent, quickMessage?: string) => {
    e.preventDefault();
    const messageToSend = quickMessage || message;
    if (!messageToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageToSend,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { 
          message: messageToSend.trim(),
          lang: i18n.language 
        },
      });

      if (error) throw error;

      await simulateTyping(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response || t('chatbot.error'),
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      });
    } catch (error) {
      console.error('Error sending message:', error);
      await simulateTyping(() => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: t('chatbot.error'),
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      });
    }
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      setShowGreeting(false);
      if (messages.length === 0) {
        simulateTyping(() => {
          setMessages([
            {
              id: Date.now().toString(),
              text: t('chatbot.greeting'),
              isUser: false,
              timestamp: new Date(),
            },
          ]);
        });
      }
    } else {
      setIsMinimized(!isMinimized);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setShowGreeting(false);
  };

  return (
    <>
      <AnimatePresence>
        {showGreeting && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-4 z-50"
          >
            <div className="bg-white rounded-lg shadow-xl p-4 max-w-[300px]">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-primary" size={20} />
                <span className="font-medium">Try me out! 👋</span>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                {t('chatbot.greeting')}
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={toggleChat}
                  className="text-primary hover:text-secondary transition-colors text-sm font-medium"
                >
                  Start a conversation
                </button>
                <button
                  onClick={() => setShowGreeting(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Dismiss greeting"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 right-4 z-50">
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={toggleChat}
            className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-secondary transition-colors duration-300 group relative"
            aria-label="Open chat"
          >
            <MessageSquare size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center animate-pulse">
              1
            </span>
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-white rounded-lg shadow-xl transition-all duration-300 ${
              isMinimized ? 'h-14' : 'h-[600px]'
            } w-[380px] flex flex-col`}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Bot className="text-primary" size={20} />
                <span className="font-medium">Oliver - AI Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleChat}
                  className="text-gray-500 hover:text-primary transition-colors"
                  aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
                >
                  {isMinimized ? (
                    <Maximize2 size={18} />
                  ) : (
                    <Minimize2 size={18} />
                  )}
                </button>
                <button
                  onClick={closeChat}
                  className="text-gray-500 hover:text-primary transition-colors"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="p-4 border-b">
                  <div className="grid grid-cols-3 gap-2">
                    {tabs.map((tab) => (
                      <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={tab.action}
                        className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background-light hover:bg-primary/10 transition-colors text-center"
                      >
                        <span className="text-primary">{tab.icon}</span>
                        <span className="text-sm font-medium truncate">{tab.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        msg.isUser ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.isUser
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-800'
                        } whitespace-pre-line`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t('chatbot.placeholder')}
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="bg-primary text-white p-2 rounded-lg hover:bg-secondary transition-colors"
                      aria-label="Send message"
                    >
                      <Send size={20} />
                    </motion.button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
};

export default ChatBot;
