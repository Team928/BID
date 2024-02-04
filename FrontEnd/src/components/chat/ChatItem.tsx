import { deleteChatRoomReq } from "@/service/chat/api";
import { IChatRoomListRes } from "@/types/chat";
import React, { ReactNode, useRef, useState } from "react";
import { BsEmojiSunglasses } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Modal from "../@common/Modal";

const ChatItem = (props: { item: IChatRoomListRes }) => {
  const { chatRoomRes, unReadCount, audienceMemberRes } = props.item;
  const { id, lastMessage } = chatRoomRes;
  const { opponentNick } = audienceMemberRes;
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleChatItemClick = () => {
    navigate(`/chat/rooms/${id}`);
  };

  // 채팅방 삭제
  const handleDeleteClick = async () => {
    try {
      await deleteChatRoomReq(id);
      setShowModal(false);
    } catch (error) {
      setShowModal(true);
      console.error("채팅방 나가기 에러 -> 모달 안내", error);
    }
  };

  return (
    <>
      <div className="flex pl-6 py-3 border-b border-[#D9D9D9]">
        <Item onDeleteClick={handleDeleteClick}>
          <div className="flex justify-between overflow-hidden w-full">
            <div className=" flex">
              <div>
                {/* TODO: 프로필 사진으로 변경 */}
                <BsEmojiSunglasses size={"3.5rem"} color="#545454" />
              </div>
              <div
                className="flex flex-col gap-1 px-5"
                onClick={handleChatItemClick}
              >
                <p className="font-bold">{opponentNick}</p>
                <p>{lastMessage}</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="bg-orange-500 rounded-full h-6 w-6 flex items-center justify-center text-white font-semibold">
                {unReadCount}
              </span>
            </div>
          </div>
        </Item>
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




// 스와이프 이벤트 구현

const Item: React.FC<{ children: ReactNode; onDeleteClick: () => void }> = ({ children, onDeleteClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  let downX: number;
  let isClicked = false;

  const onPointerMove = (e: MouseEvent) => {
    // 클릭 유무 처리해서 애니메이션 작동 안 되게
    if (!isClicked) return;
    const newX = e.clientX;

    if (newX - downX < -30) {
      ref.current!.style.transform = "translateX(-55px)";
      setTimeout(() => {
        if (ref.current) ref.current.style.transform = "translateX(0px)";
      }, 4000);
    } else ref.current!.style.transform = "translateX(0px)";
  };

  const onPointerUp = () => {
    if (ref.current) {
      ref.current.removeEventListener("pointermove", onPointerMove);
      ref.current.style.transform = "translate-x-0";
    }
    isClicked = false;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isClicked = true;
    downX = e.clientX;
    document.addEventListener("pointermove", onPointerMove);
  };

  return (
    <div
      className="flex w-full transition-transform duration-800 relative" 
      onPointerDown={onPointerDown}
      ref={ref}
      onPointerUp={onPointerUp}
    >
      {children}
      <button
        className="text-sm text-red-500 px-0 translate-x-full"
        onClick={onDeleteClick}
      >
        delete
      </button>
    </div>
  );
};
