import CategoryComboBox from '@/components/@common/CategoryComboBox';
import DaumPostModal from '@/components/@common/DaumPostModal';
import Header, { IHeaderInfo } from '@/components/@common/Header';
import useInput from '@/hooks/@common/useInput';
import { postSaleWrite } from '@/service/write/api';
import userStore from '@/stores/userStore';
import { categoryType } from '@/types/model';
import { ICategory, ICreateSaleReq, IWriteInput } from '@/types/write';
import { changeKrToEng } from '@/utils/changeCategorie';
import { IWriteDateTimeProps, getDateTimeWrite } from '@/utils/getDateTimeWrite';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { CiCamera } from 'react-icons/ci';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const SaleWritePage = () => {
  const navigate = useNavigate();
  const { area, nickname } = userStore();

  // input 태그 상태관리
  const [values, changer] = useInput<IWriteInput>({
    title: '',
    content: '',
    immediatePrice: 0,
    startPrice: 0,
    date: '',
    time: '',
  });
  // post로 보낼 이미지 파일 관리
  const [photos, setPhotos] = useState<File[]>([]);
  // 화면에 보여줄 이미지 경로 관리
  const [photo, setPhoto] = useState<string[]>([]);
  // 카테고리 선택된 값
  const [selected, setSelected] = useState<ICategory>(categoryInfo[0]);

  // 시작시간 및 종료시간
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const imgRef = useRef<HTMLInputElement>(null);

  // 선택된 라디오 버튼의 값을 관리
  const [radio, setRadio] = useState('option1');

  // 모달 관리
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');

  const [hopeArea, setHopeArea] = useState<string[]>(area);

  // 라디오 버튼이 변경될 때 호출되는 함수
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadio(e.target.value);
  };

  // 이미지 저장
  const saveImgFiles = () => {
    if (imgRef.current && imgRef.current.files) {
      const newPhotos: string[] = [];

      for (let i = 0; i < imgRef.current.files.length; i++) {
        const file: File = imgRef.current.files[i];

        setPhotos(prevPhotos => [...prevPhotos, file]);
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          const result: string | null = reader.result as string;
          newPhotos.push(result);

          if (imgRef.current && imgRef.current.files) {
            if (i === imgRef.current.files.length - 1) {
              // 마지막 파일이 로드되면 한 번에 업데이트
              setPhoto(prevPhotos => [...prevPhotos, ...newPhotos]);
            }
          }
        };
      }
    }
  };

  // 이미지 삭제
  const deletePhoto = (id: number) => {
    setPhoto(photo.filter((_, index) => index !== id));
  };

  // 판매글 등록
  const handleWriteClick = () => {
    if (!confirmWrite(values)) {
      return;
    }

    const req: ICreateSaleReq = {
      dealReq: {
        title: values.title,
        content: values.content,
        writer: nickname,
        category: changeKrToEng(selected.name) as categoryType,
        area: hopeArea,
        startTime: startTime,
      },
      immediatePrice: values.immediatePrice,
      startPrice: values.startPrice,
      endTime: endTime,
    };
    const formData = new FormData();
    const json = JSON.stringify(req);
    const blob = new Blob([json], { type: 'application/json' });

    formData.append('saleReq', blob);

    for (let i = 0; i < photos.length; i++) {
      formData.append('photos', photos[i]);
    }

    postSaleWrite(formData).then(() => navigate('/'));
  };

  // 글쓰기 유효성 검사
  const confirmWrite = (info: IWriteInput): boolean => {
    if (
      info &&
      info.content &&
      info.date &&
      info.immediatePrice &&
      info.startPrice &&
      info.time &&
      info.title &&
      startTime &&
      endTime &&
      photos
    ) {
      return true;
    }
    return false;
  };

  // 날짜와 시간 radio버튼 입력 받았을 때
  // 시작시간 및 종료시간 저장
  useEffect(() => {
    if (radio && values.date && values.time) {
      const props: IWriteDateTimeProps = {
        date: values.date,
        time: values.time,
        radio: radio,
      };
      const { startDate, endDate } = getDateTimeWrite(props)!;

      setStartTime(startDate);
      setEndTime(endDate);
    }
  }, [radio, values.date, values.time]);

  useEffect(() => {
    if (address) {
      setHopeArea(prev => [...prev, address]);
      setAddress('');
    }
  }, [address]);

  const getTime = (time: string) => {
    const d = new Date(time);
    const year = d.getUTCFullYear();
    const month = (d.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = d.getUTCDate().toString().padStart(2, '0');
    const hours = d.getUTCHours().toString().padStart(2, '0');
    const minutes = d.getUTCMinutes().toString().padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
  };

  return (
    <>
      {isOpen && <DaumPostModal setIsOpen={setIsOpen} setAddress={setAddress} />}

      <div className="w-full h-screen">
        <Header info={info} />
        <div className="pt-12 px-BID_P h-full overflow-y-auto">
          <div className="flex flex-col gap-8 overflow-scroll">
            {/* 사진 */}
            <div className="w-full h-full pt-5">
              <p className="text-lg font-bold pb-4">사진 등록</p>
              <ul className="flex">
                <li className="pr-4">
                  <label className="flex border items-center justify-center w-24 h-24 rounded-lg" htmlFor="photos">
                    <input
                      name="photos"
                      onChange={saveImgFiles}
                      ref={imgRef}
                      multiple
                      type="file"
                      accept="image/*"
                      id="photos"
                      className="hidden w-full h-full cursor-pointer"
                    ></input>
                    <CiCamera size="2rem" color="#878787" />
                  </label>
                </li>
                <div className="overflow-x-auto whitespace-nowrap flex gap-3">
                  {photo.length !== 0 &&
                    photo.map((image, index) => (
                      <li key={index}>
                        <div className="w-24 h-24 overflow-hidden rounded-lg relative border">
                          <img src={image} className="w-24 h-24 object-cover"></img>
                          <div
                            onClick={e => {
                              e.preventDefault();
                              deletePhoto(index);
                            }}
                            className="absolute top-0 right-0 w-6 h-6 rounded-full bg-red-600 text-white flex justify-center items-center"
                          >
                            <FaMinus size={'1rem'} />
                          </div>
                        </div>
                      </li>
                    ))}
                </div>
              </ul>
            </div>
            {/* 제목 */}
            <div>
              <p className="text-lg font-bold pb-2">제목</p>
              <input
                name="title"
                type="text"
                onChange={changer}
                placeholder="제목을 입력해주세요"
                className="w-full outline-none border-b p-2"
              ></input>
            </div>
            {/* 내용 */}
            <div>
              <p className="text-lg font-bold pb-4">내용</p>
              <textarea
                cols={15}
                rows={6}
                name="content"
                onChange={changer}
                className="w-full p-4 rounded-xl outline-none resize-none border"
                placeholder="신뢰할 수 있는 거래를 위해 자세히 적어주세요"
              ></textarea>
            </div>
            {/* 카테고리 */}
            <div>
              <p className="text-lg font-bold pb-2">카테고리 선택</p>
              <CategoryComboBox selected={selected} setSelected={setSelected} categoryInfo={categoryInfo} />
            </div>
            {/* 날짜 및 시간 */}
            <div>
              <p className="text-lg font-bold pb-4">경매 날짜 및 시간</p>
              <div className="w-full flex gap-3">
                <input
                  type="date"
                  min={'2024-02-04'}
                  name="date"
                  onChange={changer}
                  value={values.date}
                  className="w-1/2 outline-none border p-2 rounded-xl"
                />
                <input
                  type="time"
                  name="time"
                  onChange={changer}
                  value={values.time}
                  className="w-1/2 outline-none border  p-2 rounded-xl"
                />
              </div>
              <form className="flex w-full gap-3 pt-4 pl-2">
                <label className="flex gap-1">
                  <input
                    type="radio"
                    name="period"
                    value="option1"
                    checked={radio === 'option1'}
                    onChange={handleRadioChange}
                  />
                  <p>24시간</p>
                </label>
                <label className="flex gap-1">
                  <input
                    type="radio"
                    name="period"
                    value="option2"
                    checked={radio === 'option2'}
                    onChange={handleRadioChange}
                  />
                  48시간
                </label>
                <label className="flex gap-1">
                  <input
                    type="radio"
                    name="period"
                    value="option3"
                    checked={radio === 'option3'}
                    onChange={handleRadioChange}
                  />
                  일주일
                </label>
              </form>
              {startTime && endTime && (
                <div className="pt-4">
                  <div className="border p-3 text-center text-xs flex flex-col gap-1">
                    <p>
                      {getTime(startTime)} <span className="text-BID_MAIN">경매 및 라이브방송</span> 시작
                    </p>
                    <p>
                      경매 마감은 <span className="text-BID_MAIN">{getTime(endTime)}</span> 입니다
                    </p>
                    <p>
                      경매 시작전까지는 <span className="text-BID_MAIN">즉시 구매가</span>로 물건을 구매합니다
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div>
              <p className="text-lg font-bold pb-2">가격 정보</p>
              <input
                type="text"
                name="immediatePrice"
                onChange={changer}
                placeholder="즉시 구매가를 입력해주세요"
                className="w-full outline-none border-b p-2"
              ></input>
              <div className="pt-3">
                <input
                  type="text"
                  name="startPrice"
                  onChange={changer}
                  placeholder="입찰 시작가를 입력해주세요"
                  className="w-full outline-none border-b p-2"
                ></input>
              </div>
            </div>
            <div>
              <p className="text-lg font-bold pb-2">거래 희망 지역</p>
              <ul className="flex items-center gap-2 overflow-x-auto whitespace-nowrap w-full text-xs">
                {hopeArea.map((item, index) => {
                  return (
                    <li key={index} className="border inline-block p-[0.4rem] px-2 rounded-xl">
                      <p>{item}</p>
                    </li>
                  );
                })}
                <li
                  onClick={() => setIsOpen(true)}
                  className="flex items-center gap-1 border rounded-full p-[0.4rem] bg-BID_MAIN "
                >
                  <FaPlus size={'0.8rem'} color="#ffffff" />
                  {/* <p>지역 추가</p> */}
                </li>
              </ul>
            </div>

            <div onClick={handleWriteClick} className="w-full pb-4">
              <button
                className={`w-full text-white rounded-2xl p-4 font-bold text-xl bg-BID_MAIN ${confirmWrite(values) ? 'bg-BID_MAIN' : 'bg-BID_SUB_GRAY'}`}
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleWritePage;

const categoryInfo: ICategory[] = [
  { id: 1, name: '패션잡화' },
  { id: 2, name: '뷰티' },
  { id: 3, name: '유아동' },
  { id: 4, name: '리빙' },
  { id: 5, name: '디지털/가전' },
  { id: 6, name: '도서/음반' },
  { id: 7, name: '완구/취미' },
  { id: 8, name: '반려동물' },
  { id: 9, name: '기타' },
];

const info: IHeaderInfo = {
  left: <IoIosArrowBack />,
  center: '판매',
  right_1: null,
  right_2: null,
};
