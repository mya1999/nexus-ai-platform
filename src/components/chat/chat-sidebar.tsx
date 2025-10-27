'use client';

import { useChatStore } from '@/store/chat-store';
import Button from '../ui/button';
import Card from '../ui/card';

interface ChatSidebarProps {
  onClose?: () => void;
}

export default function ChatSidebar({ onClose }: ChatSidebarProps) {
  const { chats, currentChatId, createChat, setCurrentChat, deleteChat } = useChatStore();

  const handleNewChat = () => {
    const newChatId = createChat();
    setCurrentChat(newChatId);
  };

  return (
    <div className="w-80 h-full bg-slate-900/50 border-l border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">المحادثات</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg
                       hover:bg-white/10 text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        <Button
          onClick={handleNewChat}
          variant="primary"
          fullWidth
          icon={<span>➕</span>}
        >
          محادثة جديدة
        </Button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chats.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <span className="text-4xl block mb-3">💬</span>
            <p>لا توجد محادثات بعد</p>
          </div>
        ) : (
          chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setCurrentChat(chat.id)}
              className={`
                w-full p-3 rounded-xl text-right transition-all duration-300
                group relative
                ${
                  chat.id === currentChatId
                    ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500'
                    : 'bg-slate-800/30 border border-white/10 hover:bg-slate-800/50 hover:border-blue-500/50'
                }
              `}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate mb-1">
                    {chat.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {chat.messages.length} رسالة
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(chat.updatedAt).toLocaleDateString('ar-SA')}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('هل أنت متأكد من حذف هذه المحادثة؟')) {
                      deleteChat(chat.id);
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center
                           rounded-lg hover:bg-red-500/20 text-red-400 transition-all duration-300"
                >
                  🗑️
                </button>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Footer Stats */}
      {chats.length > 0 && (
        <div className="p-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-3 text-center">
            <Card variant="glass" padding="sm">
              <div className="text-2xl font-bold text-blue-400">{chats.length}</div>
              <div className="text-xs text-slate-400">محادثة</div>
            </Card>
            <Card variant="glass" padding="sm">
              <div className="text-2xl font-bold text-purple-400">
                {chats.reduce((sum, chat) => sum + chat.messages.length, 0)}
              </div>
              <div className="text-xs text-slate-400">رسالة</div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
