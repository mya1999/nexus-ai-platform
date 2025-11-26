'use client';

import BrandLogo from '@/components/brand-logo';
import { useChatStore } from '@/store/chat-store';
import { Moon, Sparkles, Sun } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import ChatSidebar from './chat-sidebar';
import InputArea from './input-area';
import MessageBubble from './message-bubble';

export default function ChatInterface() {
  const { currentChatId, chats, addMessage, createChat, isDarkMode, toggleDarkMode } =
    useChatStore();

  const [isLoading, setIsLoading] = useState(false);
  const [_abortController, setAbortController] = useState<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find(c => c.id === currentChatId);
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
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 transition-colors duration-300 dark:from-slate-950 dark:to-slate-900">
      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BrandLogo size="md" />
              </div>

              <div className="flex items-center gap-2">
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="rounded-xl bg-slate-100 p-3 transition-all hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                  title={isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
                >
                  {isDarkMode ? (
                    <Sun className="h-5 w-5 text-amber-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-slate-700" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-5xl px-4 py-8">
            {messages.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-8">
                {messages.map(message => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                {isLoading && <LoadingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <InputArea onSend={handleSubmit} isLoading={isLoading} />
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
    <div className="py-20 text-center">
      <div className="mx-auto mb-8 flex h-24 w-24 animate-pulse items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl">
        <Sparkles className="h-12 w-12 text-white" />
      </div>
      <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
        مرحباً بك في Nexus AI
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
        منصة ذكاء اصطناعي متقدمة تجمع أقوى النماذج في مكان واحد. اطرح أي سؤال واحصل على إجابات ذكية
        ودقيقة.
      </p>

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
        {suggestions.map(suggestion => (
          <button
            key={`suggestion-${suggestion.icon}-${suggestion.text.substring(0, 20)}`}
            className="group transform rounded-2xl border-2 border-slate-200 bg-white p-6 text-right transition-all hover:scale-[1.02] hover:border-blue-500 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-500"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{suggestion.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-slate-700 transition-colors group-hover:text-blue-600 dark:text-slate-300 dark:group-hover:text-blue-400">
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
    <div className="animate-in fade-in slide-in-from-bottom-4 flex gap-4 duration-500">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
        <Sparkles className="h-6 w-6 animate-pulse text-white" />
      </div>
      <div className="rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 shadow-2xl backdrop-blur-lg dark:border-slate-700/50 dark:bg-slate-800/90">
        <div className="flex gap-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
