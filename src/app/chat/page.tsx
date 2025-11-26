'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Plus, Send, Settings, Sparkles, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AI_MODELS = [
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', color: '#00d9ff' },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', color: '#8a2be2' },
  { id: 'gemini-pro', name: 'Gemini Pro', color: '#ff6b6b' },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
          modelId: selectedModel.id,
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'عذراً، حدث خطأ.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    inputRef.current?.focus();
  };

  return (
    <div
      className="relative flex h-screen w-full flex-col overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 100% 60% at 50% 0%, oklch(18% 0.12 285 / 0.4), transparent),
          radial-gradient(ellipse 80% 50% at 100% 50%, oklch(18% 0.12 330 / 0.3), transparent),
          radial-gradient(ellipse 80% 50% at 0% 50%, oklch(18% 0.12 195 / 0.3), transparent),
          oklch(8% 0.04 280)
        `,
      }}
    >
      {/* 🌌 Animated Grid Background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, oklch(65% 0.28 285 / 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, oklch(65% 0.28 285 / 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* 🔮 Floating Orbs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-[20%] top-[10%] h-[400px] w-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, oklch(65% 0.28 285 / 0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-[20%] right-[15%] h-[350px] w-[350px] rounded-full"
          style={{
            background: 'radial-gradient(circle, oklch(70% 0.30 330 / 0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* 📐 Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 border-b"
        style={{
          background: 'oklch(10% 0.06 285 / 0.8)',
          backdropFilter: 'blur(20px)',
          borderColor: 'oklch(65% 0.28 285 / 0.15)',
          boxShadow: '0 4px 30px oklch(0% 0 0 / 0.3)',
        }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${selectedModel.color} 0%, #00d9ff 100%)`,
                boxShadow: `0 0 20px ${selectedModel.color}40`,
              }}
            >
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span
              className="text-xl font-black tracking-tight"
              style={{
                background: `linear-gradient(135deg, ${selectedModel.color}, #00d9ff)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              NEXUS-AI
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Model Selector */}
            <div className="relative">
              <button
                onClick={() => setShowModelSelector(!showModelSelector)}
                className="flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-300"
                style={{
                  background: 'oklch(15% 0.08 285 / 0.6)',
                  border: `1px solid ${selectedModel.color}40`,
                  boxShadow: `0 0 20px ${selectedModel.color}20`,
                }}
              >
                <Zap className="h-4 w-4" style={{ color: selectedModel.color }} />
                <span className="text-sm font-semibold text-white">{selectedModel.name}</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              <AnimatePresence>
                {showModelSelector && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-lg"
                    style={{
                      background: 'oklch(12% 0.06 285 / 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid oklch(65% 0.28 285 / 0.2)',
                      boxShadow: '0 8px 40px oklch(0% 0 0 / 0.5)',
                    }}
                  >
                    {AI_MODELS.map(model => (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model);
                          setShowModelSelector(false);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 transition-all duration-200"
                        style={{
                          background:
                            selectedModel.id === model.id ? `${model.color}15` : 'transparent',
                          borderLeft:
                            selectedModel.id === model.id
                              ? `3px solid ${model.color}`
                              : '3px solid transparent',
                        }}
                      >
                        <div className="h-2 w-2 rounded-full" style={{ background: model.color }} />
                        <span className="text-sm font-medium text-white">{model.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* New Chat */}
            <button
              onClick={handleNewChat}
              className="flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105"
              style={{
                background: 'oklch(15% 0.08 285 / 0.6)',
                border: '1px solid oklch(65% 0.28 285 / 0.2)',
                boxShadow: '0 0 20px oklch(0% 0 0 / 0.2)',
              }}
            >
              <Plus className="h-4 w-4 text-white" />
              <span className="text-sm font-semibold text-white">Chat جديد</span>
            </button>

            {/* Settings */}
            <button
              className="flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105"
              style={{
                background: 'oklch(15% 0.08 285 / 0.6)',
                border: '1px solid oklch(65% 0.28 285 / 0.2)',
                boxShadow: '0 0 20px oklch(0% 0 0 / 0.2)',
              }}
            >
              <Settings className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* 📝 Chat Area */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div
                  className="mx-auto mb-6 h-24 w-24 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${selectedModel.color} 0%, #00d9ff 100%)`,
                    boxShadow: `0 0 40px ${selectedModel.color}40`,
                  }}
                />
                <h1 className="text-4xl font-bold tracking-tight">
                  <span className="text-white">NEXUS</span>
                  <span
                    className="from-brand-primary to-brand-accent bg-gradient-to-r bg-clip-text text-transparent"
                    style={{
                      background: `linear-gradient(135deg, ${selectedModel.color}, #00d9ff)`,
                    }}
                  >
                    AI
                  </span>
                </h1>
                <p className="mt-2 text-gray-400">ابدأ محادثة جديدة مع الذكاء الاصطناعي</p>
              </motion.div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl rounded-2xl px-6 py-4 ${
                      message.role === 'user'
                        ? 'bg-brand-primary/20 text-white'
                        : 'bg-surface-1/50 text-white'
                    }`}
                    style={{
                      backdropFilter: 'blur(10px)',
                      border:
                        message.role === 'user'
                          ? `1px solid ${selectedModel.color}40`
                          : '1px solid oklch(65% 0.28 285 / 0.2)',
                    }}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div
                    className="bg-surface-1/50 rounded-2xl px-6 py-4 text-white"
                    style={{
                      backdropFilter: 'blur(10px)',
                      border: '1px solid oklch(65% 0.28 285 / 0.2)',
                    }}
                  >
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-white"></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-white"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-white"
                        style={{ animationDelay: '0.4s' }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* 📥 Input Area */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
          className="border-t"
          style={{
            background: 'oklch(10% 0.06 285 / 0.8)',
            backdropFilter: 'blur(20px)',
            borderColor: 'oklch(65% 0.28 285 / 0.15)',
          }}
        >
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="اكتب رسالتك هنا..."
                  className="bg-surface-1/50 focus:ring-brand-primary/50 w-full resize-none rounded-xl px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2"
                  rows={1}
                  style={{
                    minHeight: '48px',
                    maxHeight: '200px',
                    border: '1px solid oklch(65% 0.28 285 / 0.2)',
                    backdropFilter: 'blur(10px)',
                  }}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-brand-primary flex h-12 w-12 items-center justify-center rounded-xl text-white transition-all duration-300 disabled:opacity-50"
                style={{
                  boxShadow: `0 0 20px ${selectedModel.color}40`,
                }}
              >
                <Send className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
