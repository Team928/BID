import DaumPostcode from 'react-daum-postcode';

interface IAddr {
  address: string;
  jibunAddress: string;
}

export interface IAddressModalProp {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}
// 다음 주소 검색 API 사용하기
// https://programmerplum.tistory.com/185
const DaumPostModal = ({ setIsOpen, setAddress }: IAddressModalProp) => {
  const onCompletePost = (data: IAddr) => {
    setIsOpen(false);
    console.log(data);
    if (data.jibunAddress) {
      setAddress(data.jibunAddress);
    } else if (data.address) {
      setAddress(data.address);
    }
  };

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="h-full w-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-60 text-center z-10"
    >
      <div className="w-4/5 h-4/5 bg-white">
        <DaumPostcode style={{ height: '100%' }} onComplete={onCompletePost} />
      </div>
    </div>
  );
};

export default DaumPostModal;
