import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface IModalProps {
  width: string;
  height: string;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ width, height, title, onClose, children }: IModalProps) => {
  const [isRendering, setIsRendering] = useState<boolean>(true);

  const handleClose = () => {
    setIsRendering(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div
      className={`fixed w-screen h-screen top-0 bottom-0 left-0 right-0 transition ease-in-out delay-200 z-[11] ${isRendering ? 'bg-black/30' : 'bg-black/0'}`}
      onClick={handleClose}
    >
      {/* modal wrapper */}
      <div
        className={`fixed top-1/2 left-1/2 translate-x-mHalf translate-y-mHalf rounded-lg z-[12] drop-shadow-lg bg-white ${isRendering ? 'animate-modalOn' : 'animate-modalOff'}`}
      >
        {/* modal */}
        <div
          style={{ width: width, height: height }}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className="w-full h-14 grid grid-cols-6 place-items-center">
            <div className="col-span-1">&nbsp;</div>
            <div className="col-span-4">{title}</div>
            <div className="col-span-1 w-5 h-5 cursor-pointer" onClick={handleClose}>
              <AiOutlineClose />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
