'use client';

import type { KeyboardEvent } from 'react';
import { useRef, useState } from 'react';
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
    <div className="border-t border-white/10 bg-black/50 p-4 backdrop-blur-xl">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-end gap-3">
          {/* Text Area */}
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={e => setMessage(e.target.value)}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here... (Enter to send, Shift+Enter for new line)"
              disabled={disabled || isLoading}
              className="max-h-[200px] min-h-[56px] w-full resize-none overflow-hidden rounded-2xl border border-white/20 bg-black/50 px-5 py-3 text-white transition-all duration-300 placeholder:text-gray-500 focus:border-white focus:bg-black/70 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              rows={1}
            />

            {/* Character Counter */}
            {message.length > 0 && (
              <div className="absolute bottom-2 left-3 text-xs text-gray-500">
                {message.length} characters
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
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </div>

        {/* Helper Text */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>💡 Press Shift+Enter to add a new line</span>
          <span>✨ Powered by AI</span>
        </div>
      </div>
    </div>
  );
}
