import Toast from '@/components/@common/Toast';
import ParticipantsBottomSheet from '@/components/live/BottomSheet/ParticipantsBottomSheet';
import SpeakListBottomSheet from '@/components/live/BottomSheet/SpeakListBottomSheet';
import CameraItem from '@/components/live/CameraItem';
import LiveOptionTab from '@/components/live/LiveOptionTab';
import RequestSalePriceModal from '@/components/live/Modal/RequestSalePriceModal';
import RequestSpeakModal from '@/components/live/Modal/RequestSpeakModal';
import { PARTICIPANT_TYPE } from '@/constants/liveType';
import { getToken } from '@/service/live';
import useLiveStore from '@/stores/userLiveStore';
import { Device, OpenVidu, Publisher, Session, StreamManager, Subscriber } from 'openvidu-browser';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';

export interface ISellerInfo {
  type: string;
  userId: number;
  nickName: string;
  offerPrice: number;
  image: string;
  content: string;
  isRequestSpeak: boolean;
  onMike: boolean;
  possibleSpeak: boolean;
}

export interface IBuyerInfo {
  type: string;
  userId: number;
  nickName: string;
}

// 역경매 라이브 페이지
const PurchaseLivePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const pType = PARTICIPANT_TYPE.BUYER;
  const { onMike, onCamera, setOnCamera, setOnMike } = useLiveStore();
  const [mySessionId, setMySessionId] = useState<string>(id || 'SessionA');
  // const { userId, nickname } = userStore();
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager | any>(undefined);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const [subscribers, setSubscribers] = useState<(Subscriber | undefined)[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<Device | undefined>(undefined);
  const [sellerList, setSellerList] = useState<ISellerInfo[]>([]);

  const [sellerInfo, setSellerInfo] = useState<ISellerInfo>({
    type: 'seller', // 추후 변경
    userId: 234,
    nickName: '나는 판매자',
    offerPrice: 49000,
    image: 'image.png',
    content: '물건 상태 완전 깨끗해용',
    isRequestSpeak: false,
    onMike: false,
    possibleSpeak: false,
  });

  const [buyerInfo, setBuyerInfo] = useState<IBuyerInfo>({
    type: 'buyer',
    userId: 123,
    nickName: '나눈 구매자',
  });

  console.log(setBuyerInfo);

  const OV = useRef(new OpenVidu());
  OV.current.enableProdMode();

  const handleMainVideoStream = useCallback(
    (stream: StreamManager) => {
      if (mainStreamManager !== stream && stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager],
  );

  const joinSession = useCallback(() => {
    const mySession = OV.current.initSession();

    mySession.on('streamCreated', event => {
      const clientData = JSON.parse(event.stream.connection.data);
      console.log('들어온 사람', clientData);

      // 내가 구매자일 때 판매자가 들어오면 sellerList에 정보 저장
      if (pType === PARTICIPANT_TYPE.BUYER) {
        if (clientData.type === PARTICIPANT_TYPE.SELLER) {
          const newSeller: ISellerInfo = {
            type: pType,
            userId: clientData.userId,
            nickName: clientData.nickName,
            offerPrice: clientData.offerPrice,
            image: clientData.image,
            content: clientData.content,
            isRequestSpeak: false,
            onMike: event.stream.audioActive,
            possibleSpeak: sellerInfo.possibleSpeak,
          };

          setSellerList(sellers => [...sellers, newSeller]);
        }
      }

      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers(subscribers => [...subscribers, subscriber]);
    });

    mySession.on('streamDestroyed', event => {
      deleteSubscriber(event.stream.streamManager);

      const exit = JSON.parse(event.stream.connection.data);
      setSellerList(sellerList => sellerList.filter(seller => seller.userId !== exit.userId));
    });

    mySession.on('exception', exception => {
      console.warn(exception);
    });

    if (pType === PARTICIPANT_TYPE.SELLER) {
      mySession.on('signal:resign', event => {
        if (Number(event.data) === sellerInfo.userId) {
          Toast.error('방장에 의해 강퇴당했습니다.');

          if (mySession) {
            mySession.disconnect();
          }

          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      });

      // 만약에 내가 발언권을 얻었으면
      mySession.on('signal:resolveSpeak', event => {
        if (Number(event.data) === sellerInfo.userId) {
          Toast.info('발언권을 얻었습니다.');

          setSellerInfo(prev => {
            return {
              ...prev,
              possibleSpeak: true,
            };
          });
        }
      });
    }

    // 구매자일때 발언권 요청
    if (pType === PARTICIPANT_TYPE.BUYER) {
      mySession.on('signal:requestSpeak', event => {
        // data: 요청 보낸 사람의 userId, nickName
        console.log('발언권 보낸 사람', event.data);

        if (!event.data) return;

        const data = JSON.parse(event.data);
        Toast.info(`${data.nickName}님이 발언권을 요청했습니다.`);

        setSellerList(currentSellerList =>
          currentSellerList.map(seller =>
            seller.userId === data.userId ? { ...seller, isRequestSpeak: true } : seller,
          ),
        );
      });
    }

    setSession(mySession);
  }, []);

  console.log('판매자 리스트', sellerList);

  useEffect(() => {
    if (session) {
      const send = pType === PARTICIPANT_TYPE.BUYER ? buyerInfo : sellerInfo;

      getToken(mySessionId).then(async token => {
        try {
          await session.connect(token, send);
          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: onMike,
            publishVideo: onCamera,
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
          console.log('에러');
        }
      });
    }
  }, [session]);

  console.log(currentVideoDevice);

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }

    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('SessionA');
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

  const deleteSubscriber = useCallback((streamManager: any) => {
    setSubscribers(prevSubscribers => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });
  }, []);

  useEffect(() => {
    joinSession();

    return () => leaveSession();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      leaveSession();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [leaveSession]);

  const handleCamera = () => {
    const nCameraFlag = !onCamera;
    setOnCamera(nCameraFlag);

    if (publisher) {
      publisher.publishVideo(nCameraFlag);
    }
  };

  const handleMike = () => {
    // 판매자는 발언권 있어야 말할 수 있음
    if (pType === PARTICIPANT_TYPE.SELLER) {
      if (!sellerInfo.possibleSpeak) {
        Toast.error('대화가 가능한 상태가 아닙니다. 발언권 요청 후 이용해주세요.');
        return;
      }
    }

    const nMikeFlag = !onMike;
    setOnMike(nMikeFlag);

    if (publisher) {
      publisher.publishAudio(nMikeFlag);
    }
  };

  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleNextPage = () => {
    let disp = [publisher, ...subscribers];

    if (currentPage === 0 && disp.length > 4) {
      setCurrentPage(1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage === 1 && displayInfo.length <= 4) {
      setCurrentPage(0);
    }
  };

  let [displayInfo, setDisplayInfo] = useState<any[]>([]);

  useEffect(() => {
    let disp = [publisher, ...subscribers];

    if (currentPage === 1) {
      if (disp.length > 4) {
        const tempValue = [];

        for (let i = 0; i < 8 - disp.length; i++) {
          tempValue.push(null);
        }

        const splitted = disp.slice(4);
        setDisplayInfo([...splitted, ...tempValue]);
      } else {
        const splitted = disp.slice(4);
        setDisplayInfo([...splitted]);
      }
    } else {
      if (disp.length <= 4) {
        const tempValue = [];

        for (let i = 0; i < 4 - disp.length; i++) {
          tempValue.push(null);
        }

        setDisplayInfo([...disp, ...tempValue]);
      } else {
        console.log('현재', disp);
        const splitted = disp.slice(0, 4);
        setDisplayInfo([...splitted]);
      }
    }
  }, [publisher, subscribers, currentPage]);

  const [isOpenSpeakBottomSheet, setIsOpenSpeakBottomSheet] = useState<boolean>(false);
  const [isOpenRequsetSalePriceModal, setIsOpenRequestSalePriceModal] = useState<boolean>(false);
  const [isOpenRequestSpeakModal, setIsOpenRequestSpeakModal] = useState<boolean>(false);
  const [isOpenParticipantModal, setIsOpenParticipantModal] = useState<boolean>(false);

  // 강퇴시키기
  const handleResign = (userId: number) => {
    session?.signal({
      data: String(userId),
      type: 'resign',
    });
  };

  // 발언권 신청
  const handleRequestSpeak = () => {
    const sendData = {
      userId: sellerInfo.userId,
      nickName: sellerInfo.nickName,
    };

    session?.signal({
      data: JSON.stringify(sendData),
      type: 'requestSpeak',
    });

    Toast.success('발언권을 신청했습니다.');
  };

  // 발언권 주기
  const handleResolveSpeakRequest = (userId: number, nickName: string) => {
    // 이제 여기서 방장이 해당 userId를 가진 사람의 마이크를 풀어준다
    session?.signal({
      data: String(userId),
      type: 'resolveSpeak',
    });

    Toast.success(`${nickName}님에게 발언권을 주었습니다.`);

    // 현재 판매자 리스트 중에서 요청 여부 변경
    setSellerList(currentSellerList =>
      currentSellerList.map(seller => (seller.userId === userId ? { ...seller, isRequestSpeak: false } : seller)),
    );
  };

  return (
    <div className="w-screen h-screen bg-black/80 relative">
      <div className="absolute bottom-0 top-0 flex justify-between items-center left-0 right-0 p-1 z-[1]">
        <button onClick={handlePreviousPage}>
          <IoIosArrowBack size={25} color="#D9D9D9" />
        </button>
        <button onClick={handleNextPage}>
          <IoIosArrowForward size={25} color="#D9D9D9" />
        </button>
      </div>
      <div className="w-full h-12 flex justify-center items-center text-white">[아이폰 15] 팔사람 모여라</div>
      {session && (
        <div key={''} className="px-1 grid grid-cols-2 gap-2">
          {displayInfo.length &&
            displayInfo.map((info, idx) => {
              if (info) {
                const data = JSON.parse(info.stream.connection.data);
                return (
                  <div key={idx} className="w-full h-[calc((100vh-150px)/2)] rounded-xl bg-black/30 relative">
                    {data.userId === (pType === PARTICIPANT_TYPE.SELLER ? sellerInfo.userId : buyerInfo.userId) ? (
                      <div
                        className="relative w-full h-full rounded-md border border-2-white"
                        onClick={() => handleMainVideoStream(info)}
                      >
                        <CameraItem streamManager={info} />
                      </div>
                    ) : (
                      <div className="relative w-full h-full" onClick={() => handleMainVideoStream(info)}>
                        <CameraItem streamManager={info} />
                      </div>
                    )}
                    <span className="absolute left-2 top-2 bg-black/30 px-1.5 py-0.5  rounded-md text-white/50 text-xs ">
                      {data.type === 'buyer' ? '구매자' : '판매자'}
                      {data.type === 'seller' && (
                        <span className="bg-black/30 pl-2 rounded-md text-white/50 text-xs ">{data.offerPrice}</span>
                      )}
                    </span>

                    <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-black/0 rounded-md">
                      &nbsp;
                    </div>
                    <span className="absolute bottom-2 left-0 right-0 text-center text-xs text-white/80">
                      {data.nickName}
                    </span>
                  </div>
                );
              } else {
                return <div className="w-full h-[calc((100vh-150px)/2)] rounded-xl bg-black/30 relative">&nbsp;</div>;
              }
            })}
        </div>
      )}
      <div className="absolute w-screen">
        {pType === PARTICIPANT_TYPE.BUYER && (
          <LiveOptionTab
            pType={pType}
            handleMike={handleMike}
            handleCamera={handleCamera}
            handleSpeak={() => setIsOpenSpeakBottomSheet(true)}
            handleParticipants={() => setIsOpenParticipantModal(true)}
          />
        )}
        {pType === PARTICIPANT_TYPE.SELLER && (
          <LiveOptionTab
            pType={pType}
            handleMike={handleMike}
            handleCamera={handleCamera}
            handleSpeak={() => setIsOpenRequestSpeakModal(true)}
            handleRequestSalePrice={() => setIsOpenRequestSalePriceModal(true)}
          />
        )}
      </div>
      {isOpenSpeakBottomSheet && (
        <SpeakListBottomSheet
          speakInfo={sellerList}
          onClose={() => setIsOpenSpeakBottomSheet(false)}
          handleResolveSpeakRequest={handleResolveSpeakRequest}
        />
      )}
      {isOpenRequsetSalePriceModal && <RequestSalePriceModal onClose={() => setIsOpenRequestSalePriceModal(false)} />}
      {isOpenRequestSpeakModal && (
        <RequestSpeakModal onClose={() => setIsOpenRequestSpeakModal(false)} handleRequestSpeak={handleRequestSpeak} />
      )}
      {isOpenParticipantModal && (
        <ParticipantsBottomSheet
          onClose={() => setIsOpenParticipantModal(false)}
          handleResign={handleResign}
          participants={sellerList}
        />
      )}
    </div>
  );
};

export default PurchaseLivePage;
