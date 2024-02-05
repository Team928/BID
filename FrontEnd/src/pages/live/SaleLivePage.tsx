import CameraItem from '@/components/live/CameraItem';
import LiveOptionTab from '@/components/live/LiveOptionTab';
import RequestSalePriceModal from '@/components/live/Modal/RequestSalePriceModal';
import RequestSpeakModal from '@/components/live/Modal/RequestSpeakModal';
import SpeakListBottomSheet, { IParticipantInfo } from '@/components/live/SpeakListBottomSheet';
import { PARTICIPANT_TYPE } from '@/constants/liveType';
import { getToken } from '@/service/live';
import { Device, OpenVidu, Publisher, Session, StreamManager, Subscriber } from 'openvidu-browser';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const SaleLivePage = () => {
  const pType = PARTICIPANT_TYPE.SELLER;
  const [mySessionId, setMySessionId] = useState<string>('SessionB');
  const [myUserName, setMyUserName] = useState<string>(`Participant${Math.floor(Math.random() * 100)}`);
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager | any>(undefined);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const [subscribers, setSubscribers] = useState<(Subscriber | undefined)[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<Device | undefined>(undefined);

  console.log(publisher, subscribers, currentVideoDevice);

  const OV = useRef(new OpenVidu());
  OV.current.enableProdMode();

  // const handleMainVideoStream = useCallback(
  //   (stream: StreamManager) => {
  //     if (mainStreamManager !== stream && stream) {
  //       setMainStreamManager(stream);
  //     }
  //   },
  //   [mainStreamManager],
  // );

  // const joinSession = useCallback(() => {
  //   const mySession = OV.current.initSession();

  //   mySession.on('streamCreated', event => {
  //     const subscriber = mySession.subscribe(event.stream, undefined);
  //     setSubscribers(subscribers => [...subscribers, subscriber]);
  //   });

  //   mySession.on('streamDestroyed', event => {
  //     deleteSubscriber(event.stream.streamManager);
  //   });

  //   mySession.on('exception', exception => {
  //     console.warn(exception);
  //   });

  //   setSession(mySession);
  // }, []);

  useEffect(() => {
    if (session) {
      getToken(mySessionId).then(async token => {
        try {
          await session.connect(token, { clientData: myUserName });

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: '640x480',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: false,
          });

          session.publish(publisher);

          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter(device => device.kind === 'videoinput');
          const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

          setCurrentVideoDevice(currentVideoDevice);
          setMainStreamManager(publisher);
          setPublisher(publisher);
        } catch (error: any) {
          console.log('There was an error connecting to the session:', error.code, error.message);
        }
      });
    }
  }, [session, myUserName]);

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }

    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('SessionA');
    setMyUserName('Participant' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  }, [session]);

  // const switchCamera = useCallback(async () => {
  //   try {
  //     const devices = await OV.current.getDevices();
  //     const videoDevices = devices.filter(device => device.kind === 'videoinput');

  //     if (videoDevices && videoDevices.length > 1) {
  //       const newVideoDevice = videoDevices.filter(device => device.deviceId !== currentVideoDevice?.deviceId);

  //       if (newVideoDevice.length > 0) {
  //         const newPublisher = OV.current.initPublisher(undefined, {
  //           videoSource: newVideoDevice[0].deviceId,
  //           publishAudio: true,
  //           publishVideo: true,
  //           mirror: true,
  //         });

  //         if (session) {
  //           await session.unpublish(mainStreamManager);
  //           await session.publish(newPublisher);
  //           setCurrentVideoDevice(newVideoDevice[0]);
  //           setMainStreamManager(newPublisher);
  //           setPublisher(newPublisher);
  //         }
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, [currentVideoDevice, session, mainStreamManager]);

  // const deleteSubscriber = useCallback((streamManager: any) => {
  //   setSubscribers(prevSubscribers => {
  //     const index = prevSubscribers.indexOf(streamManager);
  //     if (index > -1) {
  //       const newSubscribers = [...prevSubscribers];
  //       newSubscribers.splice(index, 1);
  //       return newSubscribers;
  //     } else {
  //       return prevSubscribers;
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   joinSession();

  //   return () => leaveSession();
  // }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      leaveSession();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [leaveSession]);

  const participantInfo: IParticipantInfo[] = [
    {
      name: '중고짱좋아1',
      isRequestSpeak: false,
      onMike: true,
      hopeSalePrice: 480000,
      discription: '물건 상태 완전 깨꿋합니당',
      image: '/image.png',
    },
    {
      name: '중고짱좋아2',
      isRequestSpeak: true,
      onMike: false,
      hopeSalePrice: 400000,
      discription: '물건 상태 완전 깨꿋합니당',
      image: '/image.png',
    },
    {
      name: '중고짱좋아3',
      isRequestSpeak: false,
      onMike: false,
      hopeSalePrice: 430030,
      discription: '물건 상태 완전 깨꿋합니당',
      image: '/image.png',
    },
    {
      name: '중고짱좋아4',
      isRequestSpeak: false,
      onMike: false,
      hopeSalePrice: 532000,
      discription: '물건 상태 완전 깨꿋합니당',
      image: '/image.png',
    },
    {
      name: '중고짱좋아5',
      isRequestSpeak: true,
      onMike: false,
      hopeSalePrice: 423500,
      discription: '물건 상태 완전 깨꿋합니당',
      image: '/image.png',
    },
  ];

  const [currentPage, setCurrentPage] = useState<number>(0);
  const pagePerParticipantNum = 4; // 한페이지 총 인원수
  const totalPages = Math.ceil(participantInfo.length / pagePerParticipantNum);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  let displayInfo: any[] = [];

  if (participantInfo.length > 4 && currentPage === 1) {
    const temp: any[] = [];
    for (let i = 0; i < 8 - participantInfo.length; i++) {
      temp.push(['temp']);
    }
    const splitted = participantInfo.slice(
      currentPage * pagePerParticipantNum,
      (currentPage + 1) * pagePerParticipantNum,
    );
    displayInfo = [...splitted, ...temp];
  } else {
    const splitted = participantInfo.slice(
      currentPage * pagePerParticipantNum,
      (currentPage + 1) * pagePerParticipantNum,
    );
    displayInfo = [...splitted];
  }

  const [isOpenSpeakBottomSheet, setIsOpenSpeakBottomSheet] = useState<boolean>(false);
  const [isOpenRequsetSalePriceModal, setIsOpenRequestSalePriceModal] = useState<boolean>(false);
  const [isOpenRequestSpeakModal, setIsOpenRequestSpeakModal] = useState<boolean>(false);

  return (
    <div className="w-screen h-screen bg-black/80 relative">
      <div className="absolute bottom-0 top-0 flex justify-between items-center left-0 right-0 p-1 z-[1]">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          <IoIosArrowBack size={25} color="#D9D9D9" />
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
          <IoIosArrowForward size={25} color="#D9D9D9" />
        </button>
      </div>
      <div className="w-full h-12 flex justify-center items-center text-white">[아이폰 15] 팔사람 모여라</div>
      {!session && (
        <div>
          {/* 나 */}
          {mainStreamManager && (
            <div className="col-md-6">
              <CameraItem streamManager={mainStreamManager} />
            </div>
          )}
          {/* 구독자 */}
          <div className="px-1 grid grid-cols-2 gap-2">
            {/* {subscribers.map(
              (sub, i) =>
                sub && (
                  <div key={sub.id} className="col-md-6 col-xs-6" onClick={() => handleMainVideoStream(sub)}>
                    <span>{sub.id}</span>
                    <CameraItem streamManager={sub} />
                  </div>
                ),
            )} */}
            {displayInfo.length &&
              displayInfo.map(info => {
                return (
                  <div className="w-full h-[calc((100vh-150px)/2)] rounded-xl bg-black/30 relative">
                    {info[0] !== 'temp' && (
                      <span className="absolute left-2 top-2 bg-black/30 px-1.5 py-0.5  rounded-md text-white/50 text-xs ">
                        {info.hopeSalePrice}
                      </span>
                    )}
                    <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-black/0">
                      &nbsp;
                    </div>
                    <span className="absolute bottom-2 left-0 right-0 text-center text-xs text-white/80">
                      {info.name}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <div className="absolute w-screen">
        {pType === PARTICIPANT_TYPE.BUYER && (
          <LiveOptionTab pType={pType} handleSpeak={() => setIsOpenSpeakBottomSheet(true)} />
        )}
        {pType === PARTICIPANT_TYPE.SELLER && (
          <LiveOptionTab
            pType={pType}
            handleSpeak={() => setIsOpenRequestSpeakModal(true)}
            handleRequestSalePrice={() => setIsOpenRequestSalePriceModal(true)}
          />
        )}
      </div>
      {isOpenSpeakBottomSheet && (
        <SpeakListBottomSheet speakInfo={participantInfo} onClose={() => setIsOpenSpeakBottomSheet(false)} />
      )}
      {isOpenRequsetSalePriceModal && <RequestSalePriceModal onClose={() => setIsOpenRequestSalePriceModal(false)} />}
      {isOpenRequestSpeakModal && <RequestSpeakModal onClose={() => setIsOpenRequestSpeakModal(false)} />}
    </div>
  );
};

export default SaleLivePage;
