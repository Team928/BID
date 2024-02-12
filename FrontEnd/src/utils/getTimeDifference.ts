// 현재 시간과 비교하여 얼만큼 차이나는지 보여주는 함수
export const getTimeDifference = (targetTime: string): string => {
  const targetDate = new Date(targetTime);
  const currentDate = new Date();

  const timeDifference = Math.floor((currentDate.getTime() - targetDate.getTime()) / 1000); // 초 단위로 변환

  const minutes = Math.floor(timeDifference / 60);
  const hours = Math.floor(timeDifference / 3600);
  const days = Math.floor(timeDifference / (3600 * 24));

  if (timeDifference < 60) {
    return '방금 전';
  } else if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else {
    return `${days}일 전`;
  }
};
