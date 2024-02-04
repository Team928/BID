export interface IChatRoom {
    id: number;
    roomName: string;
    dealId: number;
    updateTime: string;
    lastMessage: string;
}

export interface IAudienceMember {
    id: number;
    opponentNick: string;
    profileImage: string;
}

// 채팅방 목록 조회 Res
export interface IChatRoomListRes {
    chatRoomRes: IChatRoom;
    unReadCount: number;
    exitPossible: boolean;
    audienceMemberRes: IAudienceMember;
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
