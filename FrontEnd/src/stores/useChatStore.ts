import create from 'zustand';

interface IChatLog {
  senderId: number;
  sender?: string;
  message: string;
}

interface IChatStore {
  chatLogs: IChatLog[];
  addChatLog: (newChatLog: IChatLog) => void;
  // 웹소켓 연결 종료 시 대화 내용들 삭제
  clearChatLogs: () => void;
}

const useChatStore = create<IChatStore>(set => {
  const savedChatLogs = localStorage.getItem('chatLogs');
  const initialChatLogs: IChatLog[] = savedChatLogs ? JSON.parse(savedChatLogs) : [];

  return {
    chatLogs: initialChatLogs,
    addChatLog: newChatLog => set(state => ({ chatLogs: [...state.chatLogs, newChatLog] })),
    clearChatLogs: () => {
      set({ chatLogs: [] });
      localStorage.removeItem('chatLogs');
    },
  };
});

export default useChatStore;
