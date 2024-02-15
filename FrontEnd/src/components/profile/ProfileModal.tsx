import Modal from '@/components/@common/Modal';
import { useProfile } from '@/hooks/profile/useProfile';
import userStore from '@/stores/userStore';
import { IChangeProfile } from '@/types/profile';
import { useRef, useState } from 'react';
import { CiCamera } from 'react-icons/ci';

const ProfileModal = ({ onClose }: { onClose: () => void }) => {
  const { nickname } = userStore();
  const { useChangeProfile } = useProfile();

  const imgRef = useRef<HTMLInputElement>(null);
  // post로 보낼 이미지 파일 관리
  const [image, setImage] = useState<File>();
  // 화면에 보여줄 이미지 경로 관리
  const [photo, setPhoto] = useState<string>('');

  const changeProfile: IChangeProfile = {
    nickname: '',
    area: [],
  };

  // 이미지 저장
  const saveImgFile = () => {
    // 이미지 업로드 input의 onChange
    if (imgRef.current && imgRef.current.files) {
      const file: File | undefined = imgRef.current.files[0];
      setImage(file);
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const result: string | null = reader.result as string;
          setPhoto(result);
        };
      }
    }
  };

  const { mutate } = useChangeProfile(nickname);

  const handleChangereview = () => {
    const formData = new FormData();
    const json = JSON.stringify(changeProfile);
    const blob = new Blob([json], { type: 'application/json' });

    formData.append('memberUpdateProfileReq', blob);
    formData.append('profileImage', image!);
    onClose();
    mutate(formData);
  };

  return (
    <Modal width="300px" height="auto" title="프로필 사진 변경하기" onClose={onClose}>
      <div className="flex justify-center pb-4">
        {/* 프로필 사진 */}
        <label className="flex border items-center justify-center w-24 h-24 rounded-lg" htmlFor="photo">
          {photo ? (
            <img src={photo} alt="profilePhoto" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <CiCamera className="flex justify-center" size="2rem" color="#878787" />
          )}
          <input
            name="photo"
            onChange={saveImgFile}
            ref={imgRef}
            multiple
            type="file"
            accept="image/*"
            id="photo"
            className="hidden w-full h-full cursor-pointer"
          ></input>
        </label>
      </div>

      <div className="flex justify-center p-2 mb-4">
        <button
          onClick={handleChangereview}
          className="text-BID_SUB_GRAY border border-BID_SUB_GRAY px-6 py-1 rounded-lg"
        >
          변경하기
        </button>
      </div>
    </Modal>
  );
};

export default ProfileModal;
