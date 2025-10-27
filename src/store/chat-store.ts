import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  modelId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatStore {
  chats: Chat[];
  currentChatId: string | null;
  isDarkMode: boolean;
  
  createChat: () => string;
  deleteChat: (id: string) => void;
  setCurrentChat: (id: string) => void;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateChatTitle: (chatId: string, title: string) => void;
  setModelForChat: (chatId: string, modelId: string) => void;
  toggleDarkMode: () => void;
  clearAllChats: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      currentChatId: null,
      isDarkMode: false,
      
      createChat: () => {
        const newChat: Chat = {
          id: 'chat-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
          title: 'محادثة جديدة',
          messages: [],
          modelId: 'gpt-4-turbo',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state) => ({
          chats: [newChat, ...state.chats],
          currentChatId: newChat.id,
        }));
        
        return newChat.id;
      },
      
      deleteChat: (id: string) => {
        set((state) => {
          const newChats = state.chats.filter((chat) => chat.id !== id);
          return {
            chats: newChats,
            currentChatId: state.currentChatId === id ? (newChats[0]?.id || null) : state.currentChatId,
          };
        });
      },
      
      setCurrentChat: (id: string) => {
        set({ currentChatId: id });
      },
      
      addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => {
        set((state) => {
          const chatIndex = state.chats.findIndex((c) => c.id === chatId);
          if (chatIndex === -1) return state;
          
          const newChats = [...state.chats];
          const chat = newChats[chatIndex];
          
          const newMessage: Message = {
            ...message,
            id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
            timestamp: new Date(),
          };
          
          if (chat.messages.length === 0 && message.role === 'user') {
            const title = message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '');
            chat.title = title;
          }
          
          chat.messages.push(newMessage);
          chat.updatedAt = new Date();
          
          return { chats: newChats };
        });
      },
      
      updateChatTitle: (chatId: string, title: string) => {
        set((state) => {
          const chatIndex = state.chats.findIndex((c) => c.id === chatId);
          if (chatIndex === -1) return state;
          
          const newChats = [...state.chats];
          newChats[chatIndex].title = title;
          newChats[chatIndex].updatedAt = new Date();
          
          return { chats: newChats };
        });
      },
      
      setModelForChat: (chatId: string, modelId: string) => {
        set((state) => {
          const chatIndex = state.chats.findIndex((c) => c.id === chatId);
          if (chatIndex === -1) return state;
          
          const newChats = [...state.chats];
          newChats[chatIndex].modelId = modelId;
          newChats[chatIndex].updatedAt = new Date();
          
          return { chats: newChats };
        });
      },
      
      toggleDarkMode: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
      },
      
      clearAllChats: () => {
        set({ chats: [], currentChatId: null });
      },
    }),
    {
      name: 'nexus-chat-storage',
    }
  )
);
