"use client";
import { motion } from 'framer-motion';
import { ButtonAdvanced } from '@/components/ui/button-advanced';

interface SuggestionsBarProps {
  visible: boolean;
  onPick: (text: string) => void;
}

const suggestions = [
  'ما هي أفضل طريقة لبدء مشروع ذكاء اصطناعي؟',
  'اشرح هذا الكود خطوة بخطوة',
  'صغ ملخصاً من 5 نقاط للنص التالي',
  'اقترح أسماء مميزة لمنتج AI جديد',
];

export function SuggestionsBar({ visible, onPick }: SuggestionsBarProps) {
  if (!visible) return null;
  return (
    <motion.div
      className="container mx-auto px-4 mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map((s) => (
          <ButtonAdvanced key={s} variant="outline" size="sm" onClick={() => onPick(s)}>
            {s}
          </ButtonAdvanced>
        ))}
      </div>
    </motion.div>
  );
}
