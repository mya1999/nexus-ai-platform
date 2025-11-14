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
    <div className="flex h-full w-80 flex-col border-l border-white/10 bg-black/50">
      {/* Header */}
      <div className="border-b border-white/10 p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Conversations</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-white/10 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        <Button onClick={handleNewChat} variant="primary" fullWidth icon={<span>➕</span>}>
          New Chat
        </Button>
      </div>

      {/* Chat List */}
      <div className="luxury-scrollbar flex-1 space-y-2 overflow-y-auto p-4">
        {chats.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <span className="mb-3 block text-4xl">💬</span>
            <p>No conversations yet</p>
          </div>
        ) : (
          chats.map(chat => (
            <button
              key={chat.id}
              onClick={() => setCurrentChat(chat.id)}
              className={`group relative w-full rounded-xl p-3 text-right transition-all duration-300 ${
                chat.id === currentChatId
                  ? 'border border-white bg-white/10'
                  : 'border border-white/20 bg-black/30 hover:border-white/40 hover:bg-black/50'
              } `}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1 truncate font-semibold text-white">{chat.title}</h3>
                  <p className="text-xs text-gray-400">{chat.messages.length} messages</p>
                  <p className="text-xs text-gray-500">
                    {new Date(chat.updatedAt).toLocaleDateString('en-US')}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    if (confirm('Are you sure you want to delete this conversation?')) {
                      deleteChat(chat.id);
                    }
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-red-400 opacity-0 transition-all duration-300 hover:bg-red-500/20 group-hover:opacity-100"
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
        <div className="border-t border-white/10 p-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <Card variant="glass" padding="sm">
              <div className="text-2xl font-bold text-white">{chats.length}</div>
              <div className="text-xs text-gray-400">Chats</div>
            </Card>
            <Card variant="glass" padding="sm">
              <div className="text-2xl font-bold text-white">
                {chats.reduce((sum, chat) => sum + chat.messages.length, 0)}
              </div>
              <div className="text-xs text-gray-400">Messages</div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
