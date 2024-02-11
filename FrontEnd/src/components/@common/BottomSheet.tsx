import { useState } from 'react';

interface IBottomSheetProps {
  height: string;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet = ({ height, title, onClose, children }: IBottomSheetProps) => {
  const [isRendering, setIsRendering] = useState<boolean>(true);

  const handleClose = () => {
    setIsRendering(false);
    setTimeout(() => {
      onClose();
    }, 250);
  };

  return (
    <div
      className={`fixed w-full h-screen top-0 bottom-0 left-0 right-0 transition ease-in-out delay-200 z-[11] ${isRendering ? 'bg-black/50' : 'bg-black/0'}`}
      onClick={handleClose}
    >
      {/* bottom wrapper */}
      <div
        className={`max-w-[500px] m-auto fixed bottom-0 left-0 right-0 rounded-xl z-[12] drop-shadow-lg bg-white ${isRendering ? 'animate-sheetOn' : 'animate-sheetOff'}`}
      >
        {/* bottom sheet */}
        <div
          style={{ height: height }}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <div className="w-full h-14 grid grid-cols-6 place-items-center">
            <div className="col-span-1">&nbsp;</div>
            <div className="col-span-4">{title}</div>
          </div>
          <div className={`overflow-y-scroll h-[calc(100%-56px)]`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
