/**
 * Enhanced Chat Page with Design System
 * Using advanced components and motion design
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Settings, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ChatSidebar from '@/components/chat/chat-sidebar';
import InputArea from '@/components/chat/input-area';
import MessageList from '@/components/chat/message-list';
import ModelSelector from '@/components/chat/model-selector';
import { ButtonAdvanced } from '@/components/ui/button-advanced';
import { CardAdvanced } from '@/components/ui/card-advanced';
import { SkeletonChatMessage } from '@/components/ui/skeleton-advanced';
import { ToastContainer, useToastAdvanced } from '@/components/ui/toast-advanced';
import { useChatStore } from '@/store/chat-store';
import { motionVariants } from '@/styles/motion';

export default function ChatPageEnhanced() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState('gpt-4-turbo');

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
          className="bg-brand-primary/20 absolute -right-40 -top-40 h-96 w-96 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="bg-brand-accent/20 absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.button
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
        {/* Enhanced Header */}
        <motion.header
          className="bg-surface-1/50 flex-shrink-0 border-b border-white/10 backdrop-blur-xl"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
            <div className="flex items-center gap-3">
              <ButtonAdvanced
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden"
                aria-label={isSidebarOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              >
                {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </ButtonAdvanced>

              <Link href="/" className="group flex items-center gap-2">
                <motion.div
                  className="from-brand-primary to-brand-accent flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </motion.div>
                <span className="hidden text-lg font-bold sm:block">
                  <span className="text-white">NEXUS</span>
                  <span className="text-brand-primary">AI</span>
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <ModelSelector selectedModelId={selectedModelId} onSelectModel={setSelectedModelId} />

              <ButtonAdvanced
                variant="primary"
                size="md"
                leftIcon={<Plus className="h-4 w-4" />}
                onClick={handleNewChat}
                className="hidden sm:flex"
              >
                محادثة جديدة
              </ButtonAdvanced>

              <ButtonAdvanced variant="ghost" size="icon" aria-label="الإعدادات">
                <Settings className="h-5 w-5" />
              </ButtonAdvanced>
            </div>
          </div>
        </motion.header>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden">
          {currentChat && currentChat.messages.length > 0 ? (
            <motion.div className="h-full" {...motionVariants.fadeIn}>
              <MessageList messages={currentChat.messages} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              className="flex h-full items-center justify-center p-6"
              {...motionVariants.fadeInUp}
            >
              <CardAdvanced
                elevation="xl"
                surface={2}
                glassmorphism
                className="w-full max-w-2xl p-8 text-center"
              >
                <motion.div
                  className="from-brand-primary to-brand-accent mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <Sparkles className="h-10 w-10 text-white" />
                </motion.div>

                <h2 className="from-brand-primary to-brand-accent mb-4 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                  مرحباً بك في NexusAI
                </h2>

                <p className="mb-8 text-muted-foreground">
                  ابدأ محادثة جديدة مع أقوى نماذج الذكاء الاصطناعي
                </p>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <CardAdvanced elevation="sm" hoverable pressable className="cursor-pointer p-4">
                    <p className="text-sm font-medium">💡 اطرح سؤالاً</p>
                  </CardAdvanced>

                  <CardAdvanced elevation="sm" hoverable pressable className="cursor-pointer p-4">
                    <p className="text-sm font-medium">✍️ اكتب محتوى</p>
                  </CardAdvanced>

                  <CardAdvanced elevation="sm" hoverable pressable className="cursor-pointer p-4">
                    <p className="text-sm font-medium">🔍 ابحث عن معلومة</p>
                  </CardAdvanced>

                  <CardAdvanced elevation="sm" hoverable pressable className="cursor-pointer p-4">
                    <p className="text-sm font-medium">🎨 صمم فكرة</p>
                  </CardAdvanced>
                </div>
              </CardAdvanced>
            </motion.div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <motion.div className="px-6 py-2" {...motionVariants.fadeIn}>
            <SkeletonChatMessage />
          </motion.div>
        )}

        {/* Input Area */}
        <motion.div
          className="bg-surface-1/50 flex-shrink-0 border-t border-white/10 p-4 backdrop-blur-xl"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.1 }}
        >
          <div className="container mx-auto max-w-4xl">
            <InputArea onSend={handleSendMessage} isLoading={isLoading} disabled={isLoading} />
          </div>
        </motion.div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
