import Modal from '@/components/@common/Modal';
import useInput from '@/hooks/@common/useInput';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { CiCamera } from 'react-icons/ci';
import { FaMinus } from 'react-icons/fa6';

const PurchaseApplyFromModal = ({ setShowModal, id }: IPurchasesApplyFormProps) => {
  // input 태그 상태관리
  const [values, changer] = useInput<IPurchasesApplyForm>({
    content: '',
    offerPrice: '',
  });

  const imgRef = useRef<HTMLInputElement>(null);
  // post로 보낼 이미지 파일 관리
  const [image, setImage] = useState<File>();
  // 화면에 보여줄 이미지 경로 관리
  const [photo, setPhoto] = useState<string>('');

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

  return (
    <Modal width="300px" height="auto" title="신청하기" onClose={() => setShowModal(false)}>
      <div className="w-full flex flex-col justify-center items-center p-3 px-5">
        <div className="w-full h-full">
          <p className="font-bold pb-2">사진 등록</p>
          <ul className="flex">
            <li className="pr-4">
              <label className="flex border items-center justify-center w-24 h-24 rounded-lg" htmlFor="photos">
                <input
                  name="photos"
                  onChange={saveImgFile}
                  ref={imgRef}
                  type="file"
                  accept="image/*"
                  id="photos"
                  className="hidden w-full h-full cursor-pointer"
                ></input>
                <CiCamera size="2rem" color="#878787" />
              </label>
            </li>
            {photo && (
              <li>
                <div className="w-24 h-24 overflow-hidden rounded-lg relative border">
                  <img src={photo} className="w-24 h-24 object-cover"></img>
                  <div
                    onClick={e => {
                      e.preventDefault();
                      setPhoto('');
                    }}
                    className="absolute top-0 right-0 w-6 h-6 rounded-full bg-red-600 text-white flex justify-center items-center"
                  >
                    <FaMinus size={'1rem'} />
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
        <div className="w-full pt-5">
          <p className="font-bold pb-2">내용</p>
          <textarea
            cols={10}
            rows={6}
            name="content"
            onChange={changer}
            className="w-full p-4 rounded-xl outline-none resize-none border"
            placeholder="신뢰할 수 있는 거래를 위해 자세히 적어주세요"
          ></textarea>
        </div>
        <div className="w-full pt-2">
          <p className="font-bold">가격 정보</p>
          <input
            type="text"
            name="offerPrice"
            onChange={changer}
            placeholder="즉시 구매가를 입력해주세요"
            className="w-full outline-none border-b p-2"
          ></input>
        </div>
        <div className="w-full flex gap-5 py-4">
          <button
            className="w-full bg-BID_SUB_GRAY text-white px-4 py-2 rounded-2xl"
            onClick={() => setShowModal(false)}
          >
            취소
          </button>
          <button
            className="w-full bg-BID_MAIN text-white px-4 py-2 rounded-2xl"
            onClick={() => {
              // bidMuate();
              setShowModal(false);
            }}
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PurchaseApplyFromModal;

export interface IPurchasesApplyFormProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  id: number;
}

export interface IPurchasesApplyForm {
  content: string;
  offerPrice: string;
}
