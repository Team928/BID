export interface IChatRoom {
    id: number;
    roomName: string;
    dealId: number;
    hostId: number;
    guestId: number;
    createTime: string;
    updateTime: string;
    lastMessage: string;
    lastSenderId: number;
}

// 채팅방 목록 조회 Res
export interface IChatRoomListRes {
    chatRoom: IChatRoom;
    unReadCount: number;
    exitPossible: boolean;
}

// 채팅방 목록 조회 Req
export interface IChatRoomListReq {
    userId: number;

}

// 채팅로그 조회 Response
export interface IChatLogListRes {
    id: string;
    sender: string;
    senderId: number;
    roomId: number;
    createTime: string;
    message: string;
    type: string;
    read: boolean
}

// 채팅로그 조회 Request
export interface IChatLogListReq {
    roomId: number;
}
