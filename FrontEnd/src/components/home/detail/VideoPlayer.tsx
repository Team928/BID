import { ITimeStamp } from '@/types/live';
import { useEffect, useRef } from 'react';
import TimeLine from './TimeLine';

const VideoPlayer = ({ src, timeStamp }: { src: string; timeStamp: ITimeStamp[] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <div>
      <video ref={videoRef} src={src} width="640" height="360" controls></video>
      <div className="mt-2 p-1 rounded-md border-[1px] border-BID_BLACK/30">
        <TimeLine titleContent={'타임 스탬프'}>
          <div className="rounded-md p-2">
            {timeStamp.map((stamp, idx) => {
              return (
                <div key={idx} className="py-1 text-[12px]">
                  <button className="font-bold text-BID_MAIN" onClick={() => seekToTimestamp(stamp.time)}>
                    {stamp.time}
                  </button>
                  &nbsp;
                  <span>{stamp.content}</span>
                </div>
              );
            })}
          </div>
        </TimeLine>
      </div>
    </div>
  );
};

export default VideoPlayer;
