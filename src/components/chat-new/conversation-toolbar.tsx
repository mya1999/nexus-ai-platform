"use client";
import { motion } from 'framer-motion';
import { Menu, Plus, Settings, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { ButtonAdvanced } from '@/components/ui/button-advanced';
import ModelSelector from '@/components/chat/model-selector';

export type ConversationToolbarProps = Readonly<{
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  selectedModelId: string;
  onSelectModel: (id: string) => void;
  onNewChat: () => void;
  onOpenSettings: () => void;
  showModelSelector?: boolean;
}>;

export function ConversationToolbar({
  isSidebarOpen,
  onToggleSidebar,
  selectedModelId,
  onSelectModel,
  onNewChat,
  onOpenSettings,
  showModelSelector = true,
}: ConversationToolbarProps) {
  return (
    <motion.header
      className="flex-shrink-0 border-b border-white/10 bg-surface-1/80 backdrop-blur-xl"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-center gap-3 mb-3">
          <Link href="/" className="flex items-center gap-2 group" aria-label="العودة للصفحة الرئيسية" title="العودة للصفحة الرئيسية">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-accent rounded-xl flex items-center justify-center shadow-glow-purple"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold">
              <span className="text-white">ZORO</span>
              <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">AI</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center justify-between gap-3">
          <ButtonAdvanced
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
            aria-label={isSidebarOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            <Menu className="w-5 h-5" />
          </ButtonAdvanced>

          {showModelSelector && (
            <fieldset className="flex-1 max-w-md mx-auto bg-black/30 rounded-xl border border-white/10 px-3 py-2 backdrop-blur-md shadow-inner">
              <legend className="sr-only">اختيار النموذج</legend>
              <ModelSelector selectedModelId={selectedModelId} onSelectModel={onSelectModel} />
            </fieldset>
          )}

          <div className="flex items-center gap-2">
            <ButtonAdvanced variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />} onClick={onNewChat} className="hidden sm:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1">
              محادثة جديدة
            </ButtonAdvanced>
            <ButtonAdvanced variant="ghost" size="icon" aria-label="الإعدادات" title="الإعدادات" onClick={onOpenSettings} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1">
              <Settings className="w-5 h-5" />
            </ButtonAdvanced>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
