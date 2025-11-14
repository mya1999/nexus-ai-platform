/**
 * Enhanced Chat Page with Design System
 * Using advanced components and motion design
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
// icons not needed after removing welcome panel
import { ConversationToolbar } from '@/components/chat-new/conversation-toolbar';
import { SystemStatusBar } from '@/components/chat-new/system-status-bar';
import { SettingsModal } from '@/components/settings/settings-modal';
// Link is handled inside ConversationToolbar
import { useState } from 'react';
import ChatSidebar from '@/components/chat/chat-sidebar';
import InputArea from '@/components/chat/input-area';
import MessageList from '@/components/chat/message-list';
import ModelSelector from '@/components/chat/model-selector';
// removed advanced button/card from welcome panel

import { ToastContainer, useToastAdvanced } from '@/components/ui/toast-advanced';
import { useChatStore } from '@/store/chat-store';
import { motionVariants } from '@/styles/motion';

/**
 * Chat Page with Geometric Precision
 *
 * Optical Center: 54% from top (compensates top-heavy layout)
 * Spacing System: 8px baseline (0.5rem units)
 *
 * Dev Tools (add to <body> in layout.tsx):
 * - .debug-grid: Shows 64px major grid + 8px baseline
 * - .debug-center: Shows optical center crosshair
 */
export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState('gpt-4-turbo');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { toasts, removeToast, success, error: showError } = useToastAdvanced();
  const { chats, currentChatId, createChat, setCurrentChat, addMessage } = useChatStore();

  // Get current chat or create one if none exists
  const currentChat =
    chats.find(c => c.id === currentChatId) ||
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

      success('تم إرسال الرسالة بنجاح');
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage(currentChat.id, {
        role: 'assistant',
        content: 'عذراً، حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.',
      });
      showError('فشل إرسال الرسالة', 'يرجى التحقق من الاتصال والمحاولة مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    const newId = createChat();
    setCurrentChat(newId);
    success('تم إنشاء محادثة جديدة');
  };

  return (
    <div className="from-surface-0 to-surface-0 relative flex h-screen overflow-hidden bg-gradient-to-br via-slate-900 text-foreground">
      {/* Animated Background */}
      <motion.div
        className="pointer-events-none fixed inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
      >
        <div className="grid-bg-64 absolute inset-0" />
      </motion.div>

      {/* Gradient Orbs with animation */}
      <div className="pointer-events-none fixed inset-0">
        <motion.div
          className="absolute -right-40 -top-40 h-96 w-96 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="bg-brand-primary/20 h-full w-full rounded-full" />
        </motion.div>

        <motion.div
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="bg-brand-accent/20 h-full w-full rounded-full" />
        </motion.div>
      </div>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              className="interactive-overlay fixed inset-0 z-modalBackdrop bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="إغلاق القائمة الجانبية"
              title="إغلاق القائمة الجانبية"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsSidebarOpen(false);
                }
              }}
              {...motionVariants.modalOverlay}
            />

            {/* Sidebar Content */}
            <motion.div
              className="bg-surface-1 fixed left-0 top-0 z-modal h-full w-80 border-r border-white/10 md:static md:translate-x-0"
              {...motionVariants.slideInFromLeft}
            >
              <ChatSidebar onClose={() => setIsSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 flex flex-1 flex-col">
        <ConversationToolbar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          selectedModelId={selectedModelId}
          onSelectModel={setSelectedModelId}
          onNewChat={handleNewChat}
          onOpenSettings={() => setIsSettingsOpen(true)}
          showModelSelector={false}
        />

        {/* Chat Area */}
        <div className="relative flex flex-1 flex-col overflow-hidden">
          <div className="flex flex-1 flex-col justify-end">
            {/* Messages only */}
            {currentChat?.messages && currentChat.messages.length > 0 ? (
              <MessageList messages={currentChat.messages} isLoading={isLoading} />
            ) : (
              /* Optical center placeholder: 54% from top for visual balance */
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 select-none">
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Icon: 64px (8 units) with golden ratio proportions */}
                    <div className="from-brand-primary to-brand-accent shadow-brand-primary/20 mx-auto mb-8 h-16 w-16 rounded-2xl bg-gradient-to-br shadow-2xl" />
                    {/* Title: precise tracking for optical balance */}
                    <h1 className="whitespace-nowrap text-4xl font-bold tracking-[-0.02em]">
                      <span className="text-white">ZORO</span>
                      <span className="from-brand-primary to-brand-accent bg-gradient-to-r bg-clip-text text-transparent">
                        AI
                      </span>
                    </h1>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Input Area */}
            <motion.div
              className="flex-shrink-0"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
            >
              <InputArea onSend={handleSendMessage} isLoading={isLoading} disabled={!currentChat} />
            </motion.div>
            {/* Compact model selector beside input - geometric positioning */}
            <div className="absolute bottom-[4.5rem] right-4 z-20 md:right-6">
              <div className="shadow-brand-primary/10 rounded-xl border border-white/10 bg-black/60 px-3 py-2 shadow-lg backdrop-blur-md">
                <fieldset className="min-w-[200px]">
                  <legend className="sr-only">اختيار النموذج</legend>
                  <ModelSelector
                    selectedModelId={selectedModelId}
                    onSelectModel={setSelectedModelId}
                  />
                </fieldset>
              </div>
            </div>
            <SystemStatusBar
              modelId={selectedModelId}
              messagesCount={currentChat?.messages.length || 0}
            />
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <SettingsModal open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
