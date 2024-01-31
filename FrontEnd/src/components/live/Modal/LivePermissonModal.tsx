import Modal from '@/components/@common/Modal';
import { MODAL_TITLE } from '@/constants/modalTitle';
import useLiveStore from '@/stores/userLiveStore';
import { useState } from 'react';
import { AiOutlineAudio } from 'react-icons/ai';
import { IoCameraOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

const LivePermissonModal = ({ onClose }: { onClose: () => void }) => {
  const [permissionStatus, setPermissionStatus] = useState('pending');
  const { setOnCamera, setOnMike } = useLiveStore();

  const showToast = () => {
    toast.success('접근 권한이 허용되었습니다.', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      setPermissionStatus('granted');
      setOnCamera(true);
      setOnMike(true);
      onClose();
      showToast();
    } catch (error) {
      console.log('안됨', error);
      setPermissionStatus('denied');
      onClose();
    }
  };

  return (
    <>
      <Modal width="300px" height="auto" title={MODAL_TITLE.ACCEPT_PERMISSION} onClose={onClose}>
        <div className="permission-modal">
          {permissionStatus === 'pending' && (
            <div className="p-8 py-4">
              {/* 로고 자리 */}
              <p className="text-center font-semibold pb-8 border-b-2">
                BID 사용을 위해 <br />
                아래 권한을 허용해주세요.
              </p>
              {/* 카메라, 마이크 설명 */}
              <div className="pb-4">
                <div className="flex items-center">
                  <div className="bg-BID_LIGHT_GRAY rounded-full p-2">
                    <IoCameraOutline size={24} color={'#545454'} />
                  </div>
                  <p className="text-xs p-3">
                    <span className="text-sm font-semibold">카메라</span>
                    <br />
                    실시간 경매의 원활한 진행을 위해 사용됩니다.
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="bg-BID_LIGHT_GRAY rounded-full p-2">
                    <AiOutlineAudio size={24} color={'#545454'} />
                  </div>
                  <p className="text-xs p-3">
                    <span className="text-sm font-semibold">마이크</span> <br />
                    실시간 경매의 원활한 진행을 위해 사용됩니다.
                  </p>
                </div>
              </div>
              <div className="h-10">
                <button type="button" className="blueBtn" onClick={requestPermissions}>
                  허용하기
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default LivePermissonModal;