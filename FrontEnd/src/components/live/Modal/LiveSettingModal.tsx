import Modal from '@/components/@common/Modal';
import Toggle from '@/components/@common/Toggle';
import { MODAL_TITLE } from '@/constants/modalTitle';
import { useState } from 'react';

export interface ILivePlusOptionFlag {
  mask: boolean;
  voiceModulation: boolean;
  bgFilter: boolean;
}

const LiveSettingModal = ({ onClose }: { onClose: () => void }) => {
  const [toggleFlag, setToggleFlag] = useState<ILivePlusOptionFlag>({
    mask: false,
    voiceModulation: false,
    bgFilter: false,
  });

  const handleToggle = (type: keyof ILivePlusOptionFlag) => {
    setToggleFlag(prev => {
      return {
        ...prev,
        [type]: !prev[`${type}`],
      };
    });
  };

  return (
    <Modal width="300px" height="auto" title={MODAL_TITLE.CAMERA_SETTING} onClose={onClose}>
      <div className="w-full h-full">
        <div className="px-8 py-4">
          <div className="grid grid-cols-4 pb-3">
            <div className="col-span-3 leading-8">화면 가면 설정</div>
            <div className="col-span-1">
              <Toggle isOn={toggleFlag.mask} handleToggle={() => handleToggle('mask')} />
            </div>
          </div>
          <div className="grid grid-cols-4 pb-3">
            <div className="col-span-3 leading-8">음성 변조</div>
            <div className="col-span-1">
              <Toggle isOn={toggleFlag.voiceModulation} handleToggle={() => handleToggle('voiceModulation')} />
            </div>
          </div>
          <div className="grid grid-cols-4 pb-3">
            <div className="col-span-3 leading-8">배경 설정</div>
            <div className="col-span-1">
              <Toggle isOn={toggleFlag.bgFilter} handleToggle={() => handleToggle('bgFilter')} />
            </div>
          </div>
        </div>
        <div className="w-full h-10 px-12 mb-4">
          <button
            type="button"
            className="w-full h-full rounded-3xl shadow-sm text-white text-lg bg-BID_MAIN hover:bg-BID_HOVER_MAIN "
          >
            적용하기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LiveSettingModal;
