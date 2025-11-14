'use client';

import type { Message } from '@/store/chat-store';
import { useEffect, useState } from 'react';

interface MessageBubbleProps {
  message: Message;
  isLast?: boolean;
}

export default function MessageBubble({ message, isLast }: MessageBubbleProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const isUser = message.role === 'user';

  return (
    <div
      className={`mb-4 flex transform items-start gap-3 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${isUser ? 'flex-row-reverse' : 'flex-row'} `}
    >
      {/* Avatar */}
      <div
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${
          isUser ? 'shadow-luxury-white bg-white text-black' : 'border border-white/20 bg-gray-800'
        } `}
      >
        <span className="text-xl">{isUser ? '👤' : '🤖'}</span>
      </div>

      {/* Message Content */}
      <div
        className={`max-w-[75%] rounded-2xl px-5 py-3 ${
          isUser
            ? 'shadow-luxury-white bg-white text-black'
            : 'border border-white/20 bg-black/50 text-gray-100'
        } `}
      >
        <div className="whitespace-pre-wrap break-words leading-relaxed">{message.content}</div>

        {/* Timestamp */}
        <div className={`mt-2 text-xs opacity-60 ${isUser ? 'text-gray-700' : 'text-gray-400'} `}>
          {new Date(message.timestamp).toLocaleTimeString('ar-SA', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>

      {/* Typing Indicator for AI */}
      {!isUser && isLast && (
        <div className="mt-2 flex items-center gap-1">
          <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:0ms]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-600 [animation-delay:300ms]" />
        </div>
      )}
    </div>
  );
}
