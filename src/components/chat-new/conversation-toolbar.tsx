'use client';
import ModelSelector from '@/components/chat/model-selector';
import { ButtonAdvanced } from '@/components/ui/button-advanced';
import { motion } from 'framer-motion';
import { Menu, Plus, Settings, Sparkles } from 'lucide-react';
import Link from 'next/link';

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
      className="bg-surface-1/80 flex-shrink-0 border-b border-white/10 backdrop-blur-xl"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="mb-3 flex flex-col items-center justify-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2"
            aria-label="العودة للصفحة الرئيسية"
            title="العودة للصفحة الرئيسية"
          >
            <motion.div
              className="from-brand-primary to-brand-accent shadow-glow-purple flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold">
              <span className="text-white">ZORO</span>
              <span className="from-brand-primary to-brand-accent bg-gradient-to-r bg-clip-text text-transparent">
                AI
              </span>
            </span>
          </Link>
        </div>

        <div className="flex items-center justify-between gap-3">
          <ButtonAdvanced
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="focus-visible:ring-brand-accent focus-visible:ring-offset-surface-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:hidden"
            aria-label={isSidebarOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            <Menu className="h-5 w-5" />
          </ButtonAdvanced>

          {showModelSelector && (
            <fieldset className="mx-auto max-w-md flex-1 rounded-xl border border-white/10 bg-black/30 px-3 py-2 shadow-inner backdrop-blur-md">
              <legend className="sr-only">اختيار النموذج</legend>
              <ModelSelector selectedModelId={selectedModelId} onSelectModel={onSelectModel} />
            </fieldset>
          )}

          <div className="flex items-center gap-2">
            <ButtonAdvanced
              variant="primary"
              size="md"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={onNewChat}
              className="focus-visible:ring-brand-accent focus-visible:ring-offset-surface-1 hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:flex"
            >
              محادثة جديدة
            </ButtonAdvanced>
            <ButtonAdvanced
              variant="ghost"
              size="icon"
              aria-label="الإعدادات"
              title="الإعدادات"
              onClick={onOpenSettings}
              className="focus-visible:ring-brand-accent focus-visible:ring-offset-surface-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <Settings className="h-5 w-5" />
            </ButtonAdvanced>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
