import { StreamManager } from 'openvidu-browser';
import { useEffect, useRef } from 'react';

const FullCameraItem = ({ streamManager }: { streamManager: StreamManager }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager, videoRef]);

  return (
    <div className="w-screen h-screen">
      <video className="w-full h-full object-cover" autoPlay={true} ref={videoRef} />
    </div>
  );
};

export default FullCameraItem;
