import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  closeModal: () => void;
}

const SelectWriteModal: React.FC<ModalProps> = ({ closeModal }) => {
  
    useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const navigate = useNavigate()

  const goToSaleWrite = () => {
    navigate(`/write/sale`)
    closeModal()
  }

  const goToBuyWrite = () => {
    navigate(`/write/buy`)
    closeModal()
  }


  return (
    <>
    <div
      className={`fixed w-screen h-screen top-0 bottom-0 left-0 right-0 transition ease-in-out delay-200 z-[12] `}
      onClick={closeModal}
    ></div>
    <div className="fixed w-screen top-0 bottom-[4.5rem] left-0 right-0 transition ease-in-out delay-200 z-[11] bg-black bg-opacity-50">
      <div className=" fixed w-full h-full flex items-center justify-center">
        <div className="bg-white  px-2 py-4 rounded-2xl absolute bottom-24 z-[12]">
          <div className="flex flex-col bg-base-200 w-32">
            <button className='py-2' onClick={() => goToSaleWrite()}>경매 글쓰기</button>
            <button className='py-2' onClick={() => goToBuyWrite()}>역경매 글쓰기</button>
          </div>
        </div>
      </div>
    </div>

    </>
    
  );
};

export default SelectWriteModal;
