import { IChatRoomListRes } from "@/types/chat";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../@common/Modal";
import { useProfile } from "@/hooks/profile/useProfile";
import Toast from "../@common/Toast";
import { useChatRoom } from "@/hooks/chat/useChat";

const ChatItem = (props: { item: IChatRoomListRes }) => {
  const { chatRoomRes, unReadCount, audienceMemberRes } = props.item;
  const { dealId, lastMessage } = chatRoomRes;
  const { opponentNick } = audienceMemberRes;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleChatItemClick = () => {
    navigate(`/chat/rooms/${dealId}`);
  };
  const { useUserProfile } = useProfile()

  const {
    data: userInfo
  } = useUserProfile(opponentNick)

  const { useDeleteChatRoom } = useChatRoom()
  const { deleteChatRoom }  = useDeleteChatRoom(dealId)

  // 채팅방 삭제 
  const handleDeleteClick = async () => {
    try {
      await deleteChatRoom.mutate();
      setShowModal(false);
      Toast.success('채팅방을 나갑니다')

    } catch (error) {
      setShowModal(true);
      console.error("채팅방 나가기 에러 -> 모달 안내", error);
    }
  };

  return (
    <>
      <div className="flex pl-6 py-3 border-b border-[#D9D9D9]">
        <div
          className="flex justify-between overflow-hidden w-full"
          onClick={handleChatItemClick}
          onContextMenu={(e) => {
            e.preventDefault();
            handleDeleteClick();
          }}
        >
          <div className=" flex">
            <div className="w-16 h-16">
              {/* TODO: 프로필 사진으로 변경 */}
              <img
                src={`${import.meta.env.VITE_BASE_URL}static${userInfo?.data.profileImage}`}
                className="w-full h-full rounded-2xl object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 px-5">
              <p className="font-bold">{opponentNick}</p>
              <p>{lastMessage}</p>
            </div>
          </div>
          <div className="flex items-center mx-8">
            {unReadCount > 0 ? (
              <span className="bg-orange-500 rounded-full h-6 w-6 flex items-center justify-center text-white font-semibold">
                {unReadCount}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      {/* Modal 추가 */}
      {showModal && (
        <Modal
          width="300px"
          height="auto"
          title="채팅방 나가기"
          onClose={() => setShowModal(false)}
        >
          <div className="flex flex-col justify-center items-center p-3">
            <p className="font-bold pb-3">구매확정 후에 가능합니다!!</p>
            <p>구매확정은 채팅방 상단에서</p>
          </div>
          <div className="flex justify-center py-4">
            <button
              className="bg-BID_MAIN text-white px-4 py-2 rounded-lg"
              onClick={() => setShowModal(false)}
            >
              확인
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ChatItem;
