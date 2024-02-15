import { useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const LiveSummary = ({
  titleContent,
  children,
}: {
  titleContent: string | React.ReactNode;
  children: string | React.ReactNode;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    if (!wrapperRef.current || !contentRef.current) return;

    if (!isOpen) {
      wrapperRef.current.style.height = `${contentRef.current.clientHeight}px`;
      setIsOpen(true);
    } else {
      wrapperRef.current.style.height = '0px';
      setIsOpen(false);
    }
  };

  return (
    <div className="w-full h-full px-2">
      <div className="py-2 flex justify-between cursor-pointer" onClick={handleOpen}>
        <div className="text-[13px]">{titleContent}</div>
        <div>{isOpen ? <IoIosArrowUp size="20" color="#6C6C6C" /> : <IoIosArrowDown size="20" color="#6C6C6C" />}</div>
      </div>
      {/* content wrapper */}
      <div ref={wrapperRef} className="h-0 overflow-hidden transition" style={{ transition: 'all 0.3s ease' }}>
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
};

export default LiveSummary;
