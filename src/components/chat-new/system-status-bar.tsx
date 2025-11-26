'use client';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface SystemStatusBarProps {
  modelId: string;
  messagesCount: number;
  latencyMs?: number;
}

export function SystemStatusBar({ modelId, messagesCount, latencyMs = 0 }: SystemStatusBarProps) {
  return (
    <motion.div
      className="w-full border-t border-white/10 bg-black/40 text-xs text-gray-300 backdrop-blur-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <Zap className="text-brand-primary h-4 w-4" />
          <span>
            النموذج: <span className="font-medium text-white">{modelId}</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>
            الرسائل: <span className="font-medium text-white">{messagesCount}</span>
          </span>
          <span>
            الزمن: <span className="font-medium text-white">{latencyMs}ms</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
