'use client';

import { KeyboardEvent, useRef, useState } from 'react';
import Button from '../ui/button';

interface InputAreaProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export default function InputArea({ onSend, isLoading, disabled }: InputAreaProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  return (
    <div className="border-t border-white/10 bg-black/50 backdrop-blur-xl p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3 items-end">
          {/* Text Area */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="اكتب رسالتك هنا... (Enter للإرسال، Shift+Enter لسطر جديد)"
              disabled={disabled || isLoading}
              className="
                w-full px-5 py-3 bg-black/50 border border-white/20 rounded-2xl
                text-white placeholder:text-gray-500
                resize-none overflow-hidden
                focus:outline-none focus:border-white focus:bg-black/70
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300
                min-h-[56px] max-h-[200px]
              "
              rows={1}
            />

            {/* Character Counter */}
            {message.length > 0 && (
              <div className="absolute left-3 bottom-2 text-xs text-gray-500">
                {message.length} حرف
              </div>
            )}
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!message.trim() || disabled || isLoading}
            isLoading={isLoading}
            variant="primary"
            size="lg"
            className="px-6"
          >
            {isLoading ? 'جاري الإرسال...' : 'إرسال'}
          </Button>
        </div>

        {/* Helper Text */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>💡 استخدم Shift+Enter لإضافة سطر جديد</span>
          <span>✨ Powered by AI</span>
        </div>
      </div>
    </div>
  );
}
