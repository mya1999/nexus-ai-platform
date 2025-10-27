'use client';

import { Message } from '@/store/chat-store';
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
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/50">
            <span className="text-5xl">💬</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ابدأ محادثة جديدة
          </h2>
          <p className="text-slate-400 text-lg">
            اختر نموذج الذكاء الاصطناعي واطرح أي سؤال تريده
          </p>

          {/* Suggestions */}
          <div className="mt-8 grid gap-3">
            {[
              '💡 اشرح لي مفهوم الذكاء الاصطناعي',
              '🚀 ساعدني في كتابة كود برمجي',
              '✨ اقترح أفكار إبداعية',
            ].map((suggestion, i) => (
              <button
                key={i}
                className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-xl text-right transition-all duration-300"
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
    <div className="flex-1 overflow-y-auto px-6 py-4">
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
