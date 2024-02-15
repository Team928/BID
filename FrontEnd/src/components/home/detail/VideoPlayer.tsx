import { useEffect, useRef } from 'react';
import TimeLine from './TimeLine';
import LiveSummary from './LiveSummary';
import { useSale } from '@/hooks/home/useSale';

const VideoPlayer = ({ src, timeStamp, id }: { src: string; timeStamp: string[]; id: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeLineText = ['', '전면부', '후면부', '다각도', '작동 상태', '크기 비교', '세부 사항'];

  const parsedTimestamp = timeStamp.map(stamp => stamp.split('_'));

  useEffect(() => {
    const video = videoRef.current;
    const handleTimeUpdate = () => {
      if (!video) return;
    };

    if (!video) return;

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const parseTimestamp = (timestamp: string) => {
    const parts = timestamp.split(':').map(Number);
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  };

  const seekToTimestamp = (timestamp: string) => {
    const seconds = parseTimestamp(timestamp);
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
    }
  };

  const { useGetVideoSTT } = useSale();
  const { data: stt } = useGetVideoSTT(id);

  useEffect(() => {}, [stt]);

  const convertTime = (startAt: string) => {
    const start = Number(startAt);

    const sh = String(Math.floor((start / (1000 * 60 * 60)) % 24)).padStart(2, '0'); // 시
    const sm = String(Math.floor((start / (1000 * 60)) % 60)).padStart(2, '0'); // 분
    const ss = String(Math.floor((start / 1000) % 60)).padStart(2, '0'); // 초

    const startText = `${sh}:${sm}:${ss}`;

    return { startText };
  };

  return (
    <div>
      <video ref={videoRef} src={src} width="640" height="360" controls></video>
      <div className="mt-2 p-1 rounded-md border-[1px] border-BID_BLACK/30">
        <TimeLine titleContent={'타임 스탬프'}>
          <div className="rounded-md p-2">
            {parsedTimestamp.map((stamp, idx) => {
              return (
                <div key={idx} className="py-1 text-[12px]">
                  <button className="font-bold text-BID_MAIN" onClick={() => seekToTimestamp(stamp[1])}>
                    {stamp[1]}
                  </button>
                  &nbsp;
                  <span>{timeLineText[Number(stamp[0])]}</span>
                </div>
              );
            })}
          </div>
        </TimeLine>
      </div>
      <div className="mt-2 p-1 rounded-md border-[1px] border-BID_BLACK/30">
        <LiveSummary titleContent={'라이브 요약'}>
          <div className="rounded-md p-2 text-xs">
            <p className="text-sm font-bold pb-2">{stt?.data.summary}</p>
            <div className="h-[297px] overflow-y-scroll">
              {stt?.data.utterances.map((item, idx) => {
                return (
                  <div key={idx} className="py-[6px] text-[12px] flex flex-col">
                    <div className="flex justify-between">
                      <p className="font-bold text-BID_MAIN">{convertTime(item.start_at).startText}</p>
                    </div>
                    <p>{item.msg}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </LiveSummary>
      </div>
    </div>
  );
};

export default VideoPlayer;
