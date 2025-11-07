'use client';

import ChatSidebar from '@/components/chat/chat-sidebar';
import InputArea from '@/components/chat/input-area';
import MessageList from '@/components/chat/message-list';
import ModelSelector from '@/components/chat/model-selector';
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
      console.error('Error sending message:', error);
      addMessage(currentChat.id, {
        role: 'assistant',
        content: 'Sorry, an error occurred while processing your request. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Modern Grid Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 grid-bg-64"></div>
      </div>

      {/* Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="flex-shrink-0 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl relative z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              title={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-transform group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-all"></div>
                <div className="relative w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" fillOpacity="0.9"/>
                    <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <span className="text-lg font-bold">
                <span className="text-white">NEXUS</span><span className="text-indigo-400">AI</span>
              </span>
            </Link>
          </div>

          <div className="flex-1 max-w-md">
            <ModelSelector
              selectedModelId={selectedModelId}
              onSelectModel={setSelectedModelId}
            />
          </div>

          <Link href="/" className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-sm font-medium">
            Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Sidebar - Hidden on mobile unless opened */}
        <div className={`
          ${isSidebarOpen ? 'fixed inset-0 z-40 md:relative' : 'hidden md:block'}
          md:relative md:w-80 flex-shrink-0
        `}>
          {isSidebarOpen && (
            <button
              type="button"
              className="interactive-overlay"
              aria-label="Close sidebar"
              onClick={() => setIsSidebarOpen(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') {
                  setIsSidebarOpen(false);
                }
              }}
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
