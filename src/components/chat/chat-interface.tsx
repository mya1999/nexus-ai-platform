'use client';

import BrandLogo from '@/components/brand-logo';
import { useChatStore } from '@/store/chat-store';
import { Moon, Sparkles, Sun } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import ChatSidebar from './chat-sidebar';
import InputArea from './input-area';
import MessageBubble from './message-bubble';

export default function ChatInterface() {
  const {
    currentChatId,
    chats,
    addMessage,
    createChat,
    isDarkMode,
    toggleDarkMode,
  } = useChatStore();

  const [isLoading, setIsLoading] = useState(false);
  const [_abortController, setAbortController] = useState<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find((c) => c.id === currentChatId);
  const messages = useMemo(() => currentChat?.messages || [], [currentChat?.messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSubmit = async (content: string) => {
    let chatId = currentChatId;

    // Create new chat if none exists
    if (!chatId) {
      chatId = createChat();
    }

    // Add user message
    addMessage(chatId, { role: 'user', content });

    setIsLoading(true);
    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await fetch('/api/chat-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content }],
          modelId: currentChat?.modelId || 'gpt-4-turbo',
        }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantMessage += chunk;

        // Update last message in real-time
        addMessage(chatId, { role: 'assistant', content: assistantMessage });
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Chat error:', error);
        addMessage(chatId, {
          role: 'assistant',
          content: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.',
        });
      }
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-sm">
          <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BrandLogo size="md" />
              </div>

              <div className="flex items-center gap-2">
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                  title={isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-slate-700" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8 max-w-5xl">
            {messages.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-8">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                {isLoading && <LoadingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <InputArea
          onSend={handleSubmit}
          isLoading={isLoading}
        />
      </div>

      {/* Sidebar */}
      <ChatSidebar />
    </div>
  );
}

function EmptyState() {
  const suggestions = [
    { icon: '💡', text: 'اشرح لي الذكاء الاصطناعي بطريقة بسيطة' },
    { icon: '💻', text: 'ساعدني في كتابة كود Python' },
    { icon: '📊', text: 'حلل هذه البيانات وأعطني رؤى' },
    { icon: '✍️', text: 'اكتب لي مقال احترافي عن...' },
  ];

  return (
    <div className="text-center py-20">
      <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
        <Sparkles className="w-12 h-12 text-white" />
      </div>
      <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        مرحباً بك في Nexus AI
      </h2>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
        منصة ذكاء اصطناعي متقدمة تجمع أقوى النماذج في مكان واحد.
        اطرح أي سؤال واحصل على إجابات ذكية ودقيقة.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {suggestions.map((suggestion) => (
          <button
            key={`suggestion-${suggestion.icon}-${suggestion.text.substring(0, 20)}`}
            className="group p-6 text-right bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-2xl transform hover:scale-[1.02]"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{suggestion.icon}</span>
              <div className="flex-1">
                <p className="text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-medium">
                  {suggestion.text}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function LoadingIndicator() {
  return (
    <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
        <Sparkles className="w-6 h-6 text-white animate-pulse" />
      </div>
      <div className="bg-white dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl px-6 py-4 border-2 border-slate-200 dark:border-slate-700/50 shadow-2xl">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
