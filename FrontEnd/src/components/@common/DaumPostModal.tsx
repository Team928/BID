import { IAddressModalProp, IDaumModalAddr } from '@/types/signup';
import DaumPostcode from 'react-daum-postcode';

// 다음 주소 검색 API 사용하기
// https://programmerplum.tistory.com/185
const DaumPostModal = ({ setIsOpen, setAddress, setInputAddress }: IAddressModalProp) => {
  const onCompletePost = (data: IDaumModalAddr) => {
    setIsOpen(false);

    // 실제로 회원가입 할 주소
    if (data.bname1) {
      setAddress(data.sigungu + ' ' + data.bname1);
    } else {
      setAddress(data.sigungu + ' ' + data.bname);
    }

    // input 창에 보여질 주소
    if (data.jibunAddress && setInputAddress) {
      setInputAddress(data.jibunAddress);
    } else if (data.address && setInputAddress) {
      setInputAddress(data.address);
    }
  };

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="h-full w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-60 text-center z-10"
    >
      <div className="w-4/5 h-4/5 bg-white">
        <DaumPostcode style={{ height: '100%' }} onComplete={onCompletePost} />
      </div>
    </div>
  );
};

export default DaumPostModal;
