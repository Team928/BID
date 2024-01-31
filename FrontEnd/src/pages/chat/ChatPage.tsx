import React, { useEffect, useState } from 'react';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import Bottom from '@/components/@common/Bottom';
import axios from 'axios';
import ChatItem from '@/components/chat/ChatItem';

interface ChatRoom {
  id: number;
  roomName: string;
  dealId: number;
  hostId: number;
  guestId: number;
  createTime: string;
  updateTime: string;
}

const info: IHeaderInfo = {
  left: null,
  center: '채팅',
  right_1: null,
  right_2: null,
  prev: '/'
}

const ChatPage: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const chatRoomList = async () => {
      try {
        // TODO: 나중에 실제 userId로 바꾸기 ( test용 userId=1로 구현 )
        const res = await axios.get('http://localhost:8080/chat/rooms?userId=1');
        const chatRooms: ChatRoom[] = res.data.data.map((item: ChatRoom) => {
          return { id: item.id, roomName: item.roomName, createTime: item.createTime } as ChatRoom;
        });
        setChatRooms(chatRooms);
        console.log(chatRooms);
      } catch (err) {
        console.log('채팅 내역 불러오기 실패', err)
      }
    }
    chatRoomList();
  }, [])


  return (
    <>
      <div className="w-full h-screen">
        <Header info={info} />
        <div className="pt-12">
          <div>
            {chatRooms.map((room) => (
              <ChatItem key={room.id} item={room} />
            ))}
          </div>
        </div>
      </div>
      <Bottom />
    </>
  );
};

export default ChatPage;
