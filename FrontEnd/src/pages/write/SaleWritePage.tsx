import Header, { IHeaderInfo } from '@/components/@common/Header';
import { icons } from '@/constants/icons';
import useInput from '@/hooks/@common/useInput';
import userStore from '@/stores/userStore';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { CiCamera } from 'react-icons/ci';
// import { useNavigate } from 'react-router-dom';
import { FaMinus } from 'react-icons/fa';
import CategoryComboBox from '@/components/@common/CategoryComboBox';
// import { ICreateSaleReq } from '@/types/write';
import { FaPlus } from 'react-icons/fa';
import { IWriteDateTimeProps, getDateTimeWrite } from '@/utils/getDateTimeWrite';
import { getDate } from '@/utils/getDate';

interface IWriteInput {
  title: string;
  content: string;
  immediatePrice: number;
  startPrice: number;
  date: string;
  time: string;
}

export interface ICategory {
  id: number;
  name: string;
}

const SaleWritePage = () => {
  // const navigate = useNavigate();
  const { area } = userStore();

  // input type='text'인 태그들
  const [values, changer] = useInput<IWriteInput>({
    title: '',
    content: '',
    immediatePrice: 0,
    startPrice: 0,
    date: '',
    time: '',
  });
  const [photo, setPhoto] = useState<string[]>([]);
  // 카테고리 선택된 값
  const [selected, setSelected] = useState<ICategory>(categoryInfo[0]);

  const imgRef = useRef<HTMLInputElement>(null);

  // 선택된 라디오 버튼의 값을 저장할 상태
  const [radio, setRadio] = useState('option1');

  // 라디오 버튼이 변경될 때 호출되는 함수
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadio(e.target.value);
  };

  const saveImgFiles = () => {
    if (imgRef.current && imgRef.current.files) {
      const newPhotos: string[] = [];

      for (let i = 0; i < imgRef.current.files.length; i++) {
        const file: File = imgRef.current.files[i];

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

  const deletePhoto = (id: number) => {
    setPhoto(photo.filter((_, index) => index !== id));
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

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

  return (
    <>
      <div className="w-full h-screen">
        <Header info={info} />
        <div className="pt-12 px-BID_P h-full overflow-y-auto">
          <div className="flex flex-col gap-8 overflow-scroll">
            {/* 카테고리 */}
            <div>
              <p className="text-lg font-bold pb-2">카테고리 선택</p>
              <CategoryComboBox selected={selected} setSelected={setSelected} categoryInfo={categoryInfo} />
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
                className="w-full p-4 bg-[#D9D9D92B] rounded-xl outline-none resize-none"
                placeholder="신뢰할 수 있는 거래를 위해 자세히 적어주세요"
              ></textarea>
            </div>
            {/* 사진 */}
            <div className="w-full h-full ">
              <p className="text-lg font-bold pb-4">사진 등록</p>
              <ul className="flex">
                <li>
                  <label
                    className="flex bg-[#D9D9D92B] items-center justify-center w-32 h-32 rounded-lg"
                    htmlFor="photos"
                  >
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
                <div className="overflow-x-auto whitespace-nowrap flex pl-4 gap-3">
                  {photo.length !== 0 &&
                    photo.map((image, index) => (
                      <li key={index}>
                        <div className="w-32 h-32 overflow-hidden rounded-lg relative border">
                          <img src={image} className="w-32 h-32 object-cover"></img>
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
            {/* 날짜 및 시간 */}
            <div>
              <p className="text-lg font-bold pb-4">경매 날짜 및 시간</p>
              <div className="w-full flex gap-3">
                <input
                  type="date"
                  min={'2024-02-04'}
                  name="date"
                  onChange={changer}
                  className="w-1/2 outline-none border p-2 rounded-xl"
                />
                <input
                  type="time"
                  name="time"
                  onChange={changer}
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
                <div className="pt-2 text-center text-xs flex flex-col gap-1">
                  <p>
                    {getDate(startTime).fullDate} <span className="text-BID_MAIN">경매 및 라이브방송</span> 시작
                  </p>
                  <p>
                    경매 마감은 <span className="text-BID_MAIN">{getDate(endTime).fullDate}</span> 입니다
                  </p>
                  <p>
                    경매 시작전까지는 <span className="text-BID_MAIN">즉시 구매가</span>로 물건을 구매합니다
                  </p>
                </div>
              )}
            </div>
            <div>
              <p className="text-lg font-bold pb-2">가격정보</p>
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
              <p className="text-lg font-bold pb-2">희망지역</p>
              <div className="flex items-center gap-3">
                {area.map((item, index) => {
                  return (
                    <div key={index} className="border inline-block p-3 rounded-xl">
                      <p>{item}</p>
                    </div>
                  );
                })}
                <div className="flex items-center gap-2 border rounded-xl p-3 border-BID_MAIN text-BID_MAIN">
                  <FaPlus size={'0.8rem'} color="#3498DB" />
                  <p>지역 추가</p>
                </div>
              </div>
            </div>
            {/* ${confirmSignup({ address, nickname }) ? 'bg-BID_MAIN' : 'bg-BID_SUB_GRAY'} */}
            <div className="w-full pb-4">
              <button className={`w-full text-white rounded-2xl p-4 font-bold text-xl bg-BID_MAIN `}>등록하기</button>
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
  left: icons.BACK,
  center: '판매',
  right_1: null,
  right_2: null,
  prev: '/write',
};
