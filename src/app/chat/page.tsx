/**
 * Enhanced Chat Page with Design System
 * Using advanced components and motion design
 */

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Settings, Plus, MessageSquare, Zap } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ChatSidebar from '@/components/chat/chat-sidebar';
import InputArea from '@/components/chat/input-area';
import MessageList from '@/components/chat/message-list';
import ModelSelector from '@/components/chat/model-selector';
import { ButtonAdvanced } from '@/components/ui/button-advanced';
import { CardAdvanced } from '@/components/ui/card-advanced';

import { ToastContainer, useToastAdvanced } from '@/components/ui/toast-advanced';
import { useChatStore } from '@/store/chat-store';
import { motionVariants } from '@/styles/motion';

export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState('gpt-4-turbo');
  
  const { toasts, removeToast, success, error: showError } = useToastAdvanced();
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
    <div className="h-screen flex bg-gradient-to-br from-surface-0 via-slate-900 to-surface-0 text-foreground relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 grid-bg-64" />
      </motion.div>

      {/* Gradient Orbs with animation */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl"
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
          <div className="w-full h-full bg-brand-primary/20 rounded-full" />
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl"
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
          <div className="w-full h-full bg-brand-accent/20 rounded-full" />
        </motion.div>
      </div>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-modalBackdrop md:hidden interactive-overlay"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="إغلاق القائمة الجانبية"
              title="إغلاق القائمة الجانبية"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsSidebarOpen(false);
                }
              }}
              {...motionVariants.modalOverlay}
            />
            
            {/* Sidebar Content */}
            <motion.div
              className="fixed left-0 top-0 h-full w-80 bg-surface-1 border-r border-white/10 z-modal md:static md:translate-x-0"
              {...motionVariants.slideInFromLeft}
            >
              <ChatSidebar onClose={() => setIsSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Enhanced Header */}
        <motion.header 
          className="flex-shrink-0 border-b border-white/10 bg-surface-1/50 backdrop-blur-xl"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="container mx-auto px-4 py-4">
            {/* Centered Logo/Title */}
            <div className="flex flex-col items-center justify-center gap-3 mb-3">
              <Link href="/" className="flex items-center gap-2 group">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-accent rounded-xl flex items-center justify-center shadow-glow-purple"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-2xl font-bold">
                  <span className="text-white">NEXUS</span>
                  <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">AI</span>
                </span>
              </Link>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between gap-3">
              <ButtonAdvanced
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden"
                aria-label={isSidebarOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </ButtonAdvanced>

              <div className="flex-1 max-w-md mx-auto">
                <ModelSelector
                  selectedModelId={selectedModelId}
                  onSelectModel={setSelectedModelId}
                />
              </div>

              <div className="flex items-center gap-2">
                <ButtonAdvanced
                  variant="primary"
                  size="md"
                  leftIcon={<Plus className="w-4 h-4" />}
                  onClick={handleNewChat}
                  className="hidden sm:flex"
                >
                  محادثة جديدة
                </ButtonAdvanced>
                
                <ButtonAdvanced
                  variant="ghost"
                  size="icon"
                  aria-label="الإعدادات"
                >
                  <Settings className="w-5 h-5" />
                </ButtonAdvanced>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Welcome Screen or Messages */}
          {!currentChat?.messages || currentChat.messages.length === 0 ? (
            <motion.div 
              className="flex-1 flex items-center justify-center p-8"
              {...motionVariants.fadeIn}
            >
              <CardAdvanced
                elevation="lg"
                glow="purple"
                className="max-w-2xl w-full p-8 text-center"
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center shadow-glow-purple"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
                
                <h2 className="text-3xl font-bold mb-4">
                  مرحباً بك في <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">NEXUS AI</span>
                </h2>
                
                <p className="text-foreground-secondary text-lg mb-6">
                  ابدأ محادثة جديدة واستمتع بتجربة AI متطورة
                </p>

                <div className="flex flex-wrap gap-3 justify-center">
                  <ButtonAdvanced
                    variant="primary"
                    size="lg"
                    leftIcon={<MessageSquare className="w-5 h-5" />}
                    onClick={handleNewChat}
                  >
                    بدء محادثة جديدة
                  </ButtonAdvanced>
                  
                  <ButtonAdvanced
                    variant="outline"
                    size="lg"
                    leftIcon={<Zap className="w-5 h-5" />}
                  >
                    استكشف الميزات
                  </ButtonAdvanced>
                </div>
              </CardAdvanced>
            </motion.div>
          ) : (
            <MessageList
              messages={currentChat.messages}
              isLoading={isLoading}
            />
          )}

          {/* Input Area */}
          <motion.div 
            className="flex-shrink-0"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
          >
            <InputArea
              onSend={handleSendMessage}
              isLoading={isLoading}
              disabled={!currentChat}
            />
          </motion.div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
