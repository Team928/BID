import { StreamManager } from 'openvidu-browser';
import { useEffect, useRef } from 'react';

const CameraItem = ({ streamManager }: { streamManager: StreamManager }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager, videoRef]);

  return <video className="w-full h-full object-cover rounded-xl" autoPlay={true} ref={videoRef} />;
};

export default CameraItem;
