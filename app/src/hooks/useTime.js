import { useState } from 'react';
import { useEffect } from 'react';

export default function useTime(targetTime) {
  const [time, setTime] = useState(); //리턴해야 하는 값 저장

  const timeForToday = value => {
    const newTime =
      value &&
      value.map(item => {
        const today = new Date();
        const timeValue = new Date(item);
        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
          return `${betweenTime}분전`;
        }
        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
          return `${betweenTimeHour}시간전`;
        }
        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay <= 7) {
          return `${betweenTimeDay}일전`;
        }
        //7일 이상일 경우 받은 target날짜를 반환
        const year = new Date(timeValue).getFullYear(); //target의 년도 구하기
        const month = new Date(timeValue).getMonth() + 1; //target의 월 구하기
        const day = new Date(timeValue).getDate(); //target의 일 구하기
        const getTime = `${year.toString()}년 ${('00' + month.toString()).slice(-2)}월 ${('00' + day.toString()).slice(
          -2,
        )}일`;
        return getTime;
        // return `${Math.floor(betweenTimeDay / 365)}년전`;
      });
    return newTime;
  };

  useEffect(() => {
    const value = timeForToday(targetTime); //타겟 날짜로 함수 호출
    setTime(value);
  }, [targetTime]);

  return time;
}
