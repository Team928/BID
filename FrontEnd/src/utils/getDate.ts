// ISO 8601 표준 데이터를 변환하여 원하는 값을 얻는 함수
export const getDate = (startTime: string) => {
  const dateObject = new Date(startTime);

  // 년
  const year = dateObject.getFullYear();

  // 월 (0부터 시작하므로 1을 더해줍니다)
  const month = dateObject.getMonth() + 1;

  // 일
  const date = dateObject.getDate();

  // 요일 (0은 일요일을 , 1은 월요일 나타냄)
  const day = dateObject.getDay();
  // 요일을 문자열로 변환
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const datOfWeek = daysOfWeek[day];

  // 시간
  const hours = dateObject.getHours();

  // 분
  const minutes = dateObject.getMinutes();

  // 10보다 작으면 앞에 0붙혀주기
  const time = `${hours < 10 ? '0' + hours : hours}:${minutes <= 10 ? '0' + minutes : minutes}`;

  // 전체 날짜 ex) 2024년 2월 6일 12시 25분
  const customTime = `${hours < 10 ? '0' + hours : hours}시 ${minutes <= 10 ? '0' + minutes : minutes}분`;
  const fullDate = `${year}년 ${month}월 ${date}일 ${customTime}`;

  return { year, month, date, datOfWeek, hours, minutes, time, fullDate };
};
