import { create } from 'zustand';

type ChatLog = {
  senderId: number;
  roomId: number;
  message: string;
  type: string;
};

type ChatStore = {
  chatLogs: ChatLog[];
  addChatLog: (log: ChatLog) => void;
  clearChatLogs: () => void;
};

const useChatStore = create<ChatStore>((set) => ({
  chatLogs: [],
  addChatLog: (log) => set((state) => ({ chatLogs: [...state.chatLogs, log] })),
  clearChatLogs: () => set({ chatLogs: [] }),
}));

export default useChatStore;
