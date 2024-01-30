import Modal from '@/components/@common/Modal';
import Toggle from '@/components/@common/Toggle';
import { MODAL_TITLE } from '@/constants/modalTitle';
import { useState } from 'react';

export interface IBeforeLiveOptionFlag {
  video: boolean;
  audio: boolean;
}

const BeforeLiveModal = ({ onClose }: { onClose: () => void }) => {
  const [toggleFlag, setToggleFlag] = useState<IBeforeLiveOptionFlag>({
    video: false,
    audio: false,
  });

  const handleToggle = (type: keyof IBeforeLiveOptionFlag) => {
    setToggleFlag(prev => {
      return {
        ...prev,
        [type]: !prev[`${type}`],
      };
    });
  };

  return (
    <Modal width="300px" height="auto" title={MODAL_TITLE.BEFORE_LIVE_SETTING} onClose={onClose}>
      <div className="w-full h-full">
        <div className="px-8 py-4">
          <div className="grid grid-cols-4 pb-3">
            <div className="col-span-3 leading-8">비디오 켜짐</div>
            <div className="col-span-1">
              <Toggle isOn={toggleFlag.video} handleToggle={() => handleToggle('video')} />
            </div>
          </div>
          <div className="grid grid-cols-4 pb-3">
            <div className="col-span-3 leading-8">오디오 켜짐</div>
            <div className="col-span-1">
              <Toggle isOn={toggleFlag.audio} handleToggle={() => handleToggle('audio')} />
            </div>
          </div>
        </div>
        <div className="w-full h-10 px-12 mb-4">
          <button type="button" className="blueBtn">
            적용하기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BeforeLiveModal;
