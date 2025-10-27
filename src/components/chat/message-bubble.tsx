'use client';

import { Message } from '@/store/chat-store';
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
      className={`
        flex items-start gap-3 mb-4
        transform transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${isUser ? 'flex-row-reverse' : 'flex-row'}
      `}
    >
      {/* Avatar */}
      <div
        className={`
          w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
          ${
            isUser
              ? 'bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/50'
              : 'bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10'
          }
        `}
      >
        <span className="text-xl">
          {isUser ? '👤' : '🤖'}
        </span>
      </div>

      {/* Message Content */}
      <div
        className={`
          max-w-[75%] rounded-2xl px-5 py-3
          ${
            isUser
              ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
              : 'bg-slate-800/50 border border-white/10 text-slate-100'
          }
        `}
      >
        <div className="whitespace-pre-wrap break-words leading-relaxed">
          {message.content}
        </div>

        {/* Timestamp */}
        <div
          className={`
            text-xs mt-2 opacity-60
            ${isUser ? 'text-white' : 'text-slate-400'}
          `}
        >
          {new Date(message.timestamp).toLocaleTimeString('ar-SA', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>

      {/* Typing Indicator for AI */}
      {!isUser && isLast && (
        <div className="flex gap-1 items-center mt-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0ms]" />
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      )}
    </div>
  );
}
