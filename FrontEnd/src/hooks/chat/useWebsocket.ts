import { useEffect, useState } from 'react';
import Stomp from 'stompjs';

const WS_URL = 'ws://localhost:8080/ws'; // WebSocket 서버 주소

export const useWebsocket = (userId: number, onMessageReceived: (message: any) => void) => {
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

  useEffect(() => {
    let socket: WebSocket | null = null;
    let stomp: Stomp.Client | null = null;

    const connect = () => {
      socket = new WebSocket(WS_URL);
      stomp = Stomp.over(socket);
      stomp.connect({}, () => {
        stomp.subscribe(`/sub/chat/room/1`, (message: Stomp.Message) => {
            console.log("connected!!!")
          onMessageReceived(JSON.parse(message.body));
        });
      }, (error: any) => {
        console.error('WebSocket connection error:', error);
      });
      setStompClient(stomp);
    };

    const disconnect = () => {
      if (stomp && stomp.connected) {
        stomp.disconnect(() => {
          console.log('WebSocket disconnected');
        });
      }
      setStompClient(null);
    };

    // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
    return () => {
      disconnect();
    };
  }, [userId, onMessageReceived]);

  return stompClient;
};
