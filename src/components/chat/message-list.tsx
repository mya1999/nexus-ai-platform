'use client';

import type { Message } from '@/store/chat-store';
import { useEffect, useRef } from 'react';
import MessageBubble from './message-bubble';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="shadow-luxury-white animate-float-luxury mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white">
            <span className="text-5xl">💬</span>
          </div>
          <h2 className="gradient-text-white mb-4 text-3xl font-bold">Start a New Conversation</h2>
          <p className="text-lg text-gray-400">Choose your AI model and ask anything you want</p>

          {/* Suggestions */}
          <div className="mt-8 grid gap-3">
            {[
              '💡 Explain artificial intelligence to me',
              '🚀 Help me write some code',
              '✨ Suggest creative ideas',
            ].map((suggestion, i) => (
              <button
                key={i}
                className="rounded-xl border border-white/20 bg-black/30 px-4 py-3 text-right transition-all duration-300 hover:border-white hover:bg-black/50"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="luxury-scrollbar flex-1 overflow-y-auto px-6 py-4">
      <div className="mx-auto max-w-4xl">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            isLast={index === messages.length - 1 && isLoading}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
