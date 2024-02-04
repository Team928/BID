export interface IWriteDateTimeProps {
  date: string;
  time: string;
  radio: string;
}

// 글쓰기 페이지에서 활용할 util
// 날짜+시간+기간을 받아 ISO 8601 형식으로 조합 후 반환하는 함수
export const getDateTimeWrite = ({ date, time, radio }: IWriteDateTimeProps) => {
  // ISO 8601 형식으로 날짜 및 시간 조합
  const startDate = new Date(`${date}T${time}:00`).toISOString();

  let endDate = '';

  switch (radio) {
    case 'option1': {
      // 24시간 더하기
      const dateWith24Hours = new Date(`${date}T${time}:00`);
      dateWith24Hours.setHours(dateWith24Hours.getHours() + 24);
      endDate = dateWith24Hours.toISOString();
      break;
    }
    case 'option2': {
      // 48시간 더하기
      const dateWith48Hours = new Date(`${date}T${time}:00`);
      dateWith48Hours.setHours(dateWith48Hours.getHours() + 48);
      endDate = dateWith48Hours.toISOString();
      break;
    }
    case 'option3': {
      // 일주일 더하기
      const dateWith1Week = new Date(`${date}T${time}:00`);
      dateWith1Week.setDate(dateWith1Week.getDate() + 7);
      endDate = dateWith1Week.toISOString();
      break;
    }
  }

  return { startDate, endDate };
};
