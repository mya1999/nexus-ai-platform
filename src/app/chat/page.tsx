'use client';

import ChatSidebar from '@/components/chat/chat-sidebar';
import InputArea from '@/components/chat/input-area';
import MessageList from '@/components/chat/message-list';
import ModelSelector from '@/components/chat/model-selector';
import Button from '@/components/ui/button';
import { useChatStore } from '@/store/chat-store';
import Link from 'next/link';
import { useState } from 'react';

export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState('gpt-4-turbo');

  const { chats, currentChatId, createChat, setCurrentChat, addMessage } = useChatStore();

  // Get current chat or create one if none exists
  const currentChat = chats.find(c => c.id === currentChatId) ||
    (() => {
      const newId = createChat();
      setCurrentChat(newId);
      return chats.find(c => c.id === newId);
    })();

  const handleSendMessage = async (content: string) => {
    if (!currentChat || isLoading) return;

    // Add user message
    addMessage(currentChat.id, {
      role: 'user',
      content,
    });

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...currentChat.messages.map(m => ({
              role: m.role,
              content: m.content,
            })),
            { role: 'user', content },
          ],
          modelId: selectedModelId,
        }),
      });

      if (!response.ok) {
        throw new Error('فشل الاتصال بالخادم');
      }

      const data = await response.json();

      // Add AI response
      addMessage(currentChat.id, {
        role: 'assistant',
        content: data.message,
      });
    } catch (error) {
      console.error('خطأ في إرسال الرسالة:', error);
      addMessage(currentChat.id, {
        role: 'assistant',
        content: 'عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
            >
              <span className="text-2xl">☰</span>
            </button>

            <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50">
                <span className="text-xl">⚡</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Nexus AI
              </span>
            </Link>
          </div>

          <div className="flex-1 max-w-md">
            <ModelSelector
              selectedModelId={selectedModelId}
              onSelectModel={setSelectedModelId}
            />
          </div>

          <Link href="/">
            <Button variant="ghost" size="sm">الرئيسية</Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Hidden on mobile unless opened */}
        <div className={`
          ${isSidebarOpen ? 'fixed inset-0 z-40 md:relative' : 'hidden md:block'}
          md:relative md:w-80 flex-shrink-0
        `}>
          {isSidebarOpen && (
            <div
              className="absolute inset-0 bg-black/50 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          <div className="relative h-full">
            <ChatSidebar onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <MessageList
            messages={currentChat?.messages || []}
            isLoading={isLoading}
          />

          <InputArea
            onSend={handleSendMessage}
            isLoading={isLoading}
            disabled={!currentChat}
          />
        </div>
      </div>
    </div>
  );
}
