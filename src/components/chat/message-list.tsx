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
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-3xl flex items-center justify-center shadow-luxury-white animate-float-luxury">
            <span className="text-5xl">💬</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 gradient-text-white">
            Start a New Conversation
          </h2>
          <p className="text-gray-400 text-lg">
            Choose your AI model and ask anything you want
          </p>

          {/* Suggestions */}
          <div className="mt-8 grid gap-3">
            {[
              '💡 Explain artificial intelligence to me',
              '🚀 Help me write some code',
              '✨ Suggest creative ideas',
            ].map((suggestion, i) => (
              <button
                key={i}
                className="px-4 py-3 bg-black/30 hover:bg-black/50 border border-white/20 hover:border-white rounded-xl text-right transition-all duration-300"
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
    <div className="flex-1 overflow-y-auto px-6 py-4 luxury-scrollbar">
      <div className="max-w-4xl mx-auto">
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
