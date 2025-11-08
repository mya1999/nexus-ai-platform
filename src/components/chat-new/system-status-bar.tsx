"use client";
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
      className="w-full border-t border-white/10 bg-black/40 backdrop-blur-md text-xs text-gray-300"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-brand-primary" />
          <span>النموذج: <span className="text-white font-medium">{modelId}</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span>الرسائل: <span className="text-white font-medium">{messagesCount}</span></span>
          <span>الزمن: <span className="text-white font-medium">{latencyMs}ms</span></span>
        </div>
      </div>
    </motion.div>
  );
}
