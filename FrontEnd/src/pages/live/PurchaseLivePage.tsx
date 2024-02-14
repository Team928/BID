import Toast from '@/components/@common/Toast';
import ChattingBottomSheet from '@/components/live/BottomSheet/ChattingBottomSheet';
import ParticipantsBottomSheet from '@/components/live/BottomSheet/ParticipantsBottomSheet';
import SpeakListBottomSheet from '@/components/live/BottomSheet/SpeakListBottomSheet';
import CameraItem from '@/components/live/CameraItem';
import LiveOptionTab from '@/components/live/LiveOptionTab';
import MatchConfirmModal from '@/components/live/Modal/MatchConfirmModal';
import MatchModal from '@/components/live/Modal/MatchModal';
import RequestSalePriceModal from '@/components/live/Modal/RequestSalePriceModal';
import RequestSpeakModal from '@/components/live/Modal/RequestSpeakModal';
import { PARTICIPANT_TYPE } from '@/constants/liveType';
import { useLive } from '@/hooks/live/useLive';
import { getSession } from '@/service/live/api';
import useChatStore from '@/stores/useChatStore';
import useLiveStore from '@/stores/userLiveStore';
import userStore from '@/stores/userStore';
import { IMatchReqInfo, ISellerInfo } from '@/types/live';
import { Device, OpenVidu, Publisher, Session, StreamManager, Subscriber } from 'openvidu-browser';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoCameraReverseOutline } from 'react-icons/io5';
import { TbCamera, TbCameraOff } from 'react-icons/tb';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// 역경매 라이브 페이지
const PurchaseLivePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { pType, onMike, onCamera, setOnCamera, setOnMike } = useLiveStore();
  const { userId, nickname } = userStore();
  const { usePostLiveMatch, useEndPurchaseLive } = useLive();
  const { mutate } = usePostLiveMatch();
  const { mutate: endPurchaseLive } = useEndPurchaseLive();
  const { clearChatLogs } = useChatStore(state => state);

  // 오픈 비두
  const OV = useRef(new OpenVidu());
  OV.current.enableProdMode();

  // 세션 정보
  const [mySessionId, setMySessionId] = useState<string>(id || '');
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager | any>(undefined);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const [subscribers, setSubscribers] = useState<(Subscriber | undefined)[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<Device | undefined>(undefined);

  // 라이브에 필요한 정보
  const [sellerList, setSellerList] = useState<ISellerInfo[]>([]);
  const sellerForm = state.myForm;
  const [sellerInfo, setSellerInfo] = useState<ISellerInfo>({
    type: pType,
    userId: userId,
    nickName: nickname,
    offerPrice: 0,
    image: '',
    content: '',
    formId: 0,
    isRequestSpeak: false,
    onMike: false,
    possibleSpeak: false,
  });

  // 매칭 요청 시 모달에 띄울 정보
  const [matchRequestInfo, setMatchRequestInfo] = useState<IMatchReqInfo>({
    dealId: id || '',
    nickname: '',
    applyFormId: 0,
    finalOfferPrice: 0,
  });

  // 모달, 바텀시트 flag
  const [isOpenSpeakBottomSheet, setIsOpenSpeakBottomSheet] = useState<boolean>(false);
  const [isOpenRequsetSalePriceModal, setIsOpenRequestSalePriceModal] = useState<boolean>(false);
  const [isOpenRequestSpeakModal, setIsOpenRequestSpeakModal] = useState<boolean>(false);
  const [isOpenParticipantModal, setIsOpenParticipantModal] = useState<boolean>(false);
  const [isOpenMatchList, setIsOpenMatchList] = useState<boolean>(false);
  const [isOpenMatchConfirmModal, setIsOpenMatchConfirmModal] = useState<boolean>(false);
  const [isOpenChattingBottomSheet, setIsOpenChattingBottomSheet] = useState<boolean>(false);

  // joinSession
  const joinSession = useCallback(() => {
    const mySession = OV.current.initSession();
    setSession(mySession);

    mySession.on('connectionCreated', event => {
      console.log(event);
    });

    mySession.on('streamCreated', event => {
      const clientData = JSON.parse(event.stream.connection.data.split('%/%')[0]);

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
            formId: clientData.formId,
            isRequestSpeak: false,
            onMike: false,
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

    // 누군가 판매희망가 변경
    mySession.on('signal:changeSalePrice', event => {
      if (!event.data) return;

      const data = JSON.parse(event.data);
      if (data.userId === userId) return;

      Toast.info(`${data.userName}님이 판매 희망가를 ${data.salePrice}원으로 변경했습니다.`);

      setSellerList(currentSellerList =>
        currentSellerList.map(seller =>
          seller.userId === data.userId ? { ...seller, offerPrice: data.salePrice } : seller,
        ),
      );

      setSellerInfo(prev => {
        return {
          ...prev,
          offerPrice: data.salePrice,
        };
      });
    });

    mySession.on('signal:leaveSession', event => {
      if (event.data === nickname) return;
      Toast.info(`${event.data}님이 퇴장했습니다.`);
    });

    // ----------------- 판매자 -----------------

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

      // 매칭 확정하기
      mySession.on('signal:confirmMatch', event => {
        if (!event.data) return;

        const data = JSON.parse(event.data);
        if (data.userId === sellerInfo.userId) {
          // 매칭 확정 모달 띄우기
          setMatchRequestInfo(prev => {
            return {
              ...prev,
              nickname: data.sendUerName,
              applyFormId: data.applyFormId,
              finalOfferPrice: data.price,
            };
          });

          setIsOpenMatchConfirmModal(true);
        }
      });
    }

    // ----------------- 구매자 -----------------

    if (pType === PARTICIPANT_TYPE.BUYER) {
      mySession.on('signal:requestSpeak', event => {
        if (!event.data) return;

        const data = JSON.parse(event.data);
        Toast.info(`${data.nickName}님이 발언권을 요청했습니다.`);

        setSellerList(currentSellerList =>
          currentSellerList.map(seller =>
            seller.userId === data.userId ? { ...seller, isRequestSpeak: true } : seller,
          ),
        );
      });

      mySession.on('signal:matchSuccess', event => {
        if (!event.data) return;
        console.log(event.data);

        leaveSession();
        setTimeout(() => {
          navigate(`/chat/rooms/${id}`, { replace: true });
        }, 2000);
      });
    }
  }, [session]);

  // leaveSession
  const leaveSession = useCallback(() => {
    if (session && publisher) {
      session.disconnect();
      session.unpublish(publisher);
    }

    if (publisher && publisher.stream && publisher.stream.getMediaStream()) {
      const stream = publisher.stream.getMediaStream();
      stream.getTracks().forEach(track => track.stop());
    }

    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('');
    setMainStreamManager(undefined);
    setPublisher(undefined);
    clearChatLogs();
  }, [session]);

  useEffect(() => {
    if (sellerForm) {
      setSellerInfo(prev => {
        return {
          ...prev,
          formId: sellerForm.id,
          offerPrice: sellerForm.offerPrice,
          image: sellerForm.image,
          content: sellerForm.content,
        };
      });
    }
  }, [sellerForm]);

  // publish
  useEffect(() => {
    if (session && mySessionId) {
      const seller = {
        type: sellerInfo.type,
        userId: sellerInfo.userId,
        nickName: sellerInfo.nickName,
        offerPrice: sellerInfo.offerPrice,
        image: sellerInfo.image,
        content: sellerInfo.content,
        formId: sellerInfo.formId,
        isRequestSpeak: sellerInfo.isRequestSpeak,
        onMike: sellerInfo.onMike,
        possibleSpeak: sellerInfo.possibleSpeak,
      };

      const buyer = {
        type: pType,
        userId: userId,
        nickName: nickname,
      };

      const send = pType === PARTICIPANT_TYPE.BUYER ? buyer : seller;

      try {
        getSession(mySessionId, userId).then(async data => {
          const token = data.data.token;
          await session.connect(token, send);

          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter(device => device.kind === 'videoinput');
          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: onMike,
            publishVideo: onCamera,
            resolution: '1280x720',
            frameRate: 40,
            insertMode: 'APPEND',
            mirror: false,
          });

          const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

          session.publish(publisher);
          setCurrentVideoDevice(currentVideoDevice);
          setMainStreamManager(publisher);
          setPublisher(publisher);
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [session]);

  const handleMainVideoStream = useCallback(
    (stream: StreamManager) => {
      if (mainStreamManager !== stream && stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager],
  );

  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(device => device.deviceId !== currentVideoDevice?.deviceId);

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: onMike,
            publishVideo: onCamera,
            resolution: '1280x720',
            frameRate: 40,
            insertMode: 'APPEND',
            mirror: false,
          });

          if (session && publisher) {
            await session.unpublish(publisher);
            await session.publish(newPublisher);
            setCurrentVideoDevice(newVideoDevice[0]);
            setMainStreamManager(newPublisher);
            setPublisher(newPublisher);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentVideoDevice, session, mainStreamManager, onMike, onCamera]);

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
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, []);

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

      if (onMike && sellerInfo.possibleSpeak) {
        setSellerInfo(prev => {
          return {
            ...prev,
            possibleSpeak: false,
          };
        });
      }
    }

    const nMikeFlag = !onMike;
    setOnMike(nMikeFlag);

    if (publisher) {
      publisher.publishAudio(nMikeFlag);
    }
  };

  // ----------------- 레이아웃 설정 -----------------
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
        const splitted = disp.slice(0, 4);
        setDisplayInfo([...splitted]);
      }
    }
  }, [publisher, subscribers, currentPage, sellerList]);

  // ----------------- 라이브 추가 기능 -----------------

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

  // 판매 희망가 입력하기
  const sendSalePrice = (salePrice: number) => {
    if (!salePrice) {
      Toast.error('판매 희망가를 입력해주세요.');
      return;
    }

    const sendData = {
      userId: userId,
      userName: nickname,
      salePrice: salePrice,
    };

    session?.signal({
      data: JSON.stringify(sendData),
      type: 'changeSalePrice',
    });

    Toast.success(`판매 희망가를 ${salePrice}원으로 변경했습니다.`);

    setSellerInfo(prev => {
      return {
        ...prev,
        offerPrice: salePrice,
      };
    });

    setSellerList(currentSellerList =>
      currentSellerList.map(seller => (seller.userId === userId ? { ...seller, offerPrice: salePrice } : seller)),
    );

    setIsOpenRequestSalePriceModal(false);
  };

  // 매칭하기
  const handleMatch = (userId: number, formId: number, price: number, nickName: string) => {
    const sendData = {
      userId: userId,
      userName: nickName,
      sendUerName: nickname,
      formId: formId,
      price: price,
    };

    session?.signal({
      data: JSON.stringify(sendData),
      type: 'confirmMatch',
    });

    Toast.info(
      `${nickName}님에게 최종 매칭 확인 메세지를 보냈습니다. ${nickName}님이 승인 할 시 1:1 채팅방으로 이동합니다.`,
    );
  };

  // 매칭 확정하기(판매자가 매칭 확정할 때)
  const sendMatchConfirm = () => {
    if (!id) return;

    session?.signal({
      data: mySessionId,
      type: 'matchSuccess',
    });

    const matchReq = {
      dealId: mySessionId,
      applyFormId: matchRequestInfo.applyFormId,
      offerPrice: matchRequestInfo.finalOfferPrice,
    };

    mutate(matchReq);
    endPurchaseLive(id);

    leaveSession();
    setTimeout(() => {
      navigate(`/chat/rooms/${id}`, { replace: true });
    }, 2000);
  };

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);

    return () => {
      window.removeEventListener('beforeunload', leaveSession);
    };
  }, []);

  // 퇴장 함수
  const handleGoOut = async () => {
    if (window.confirm('역경매 방송을 퇴장하시겠습니까?')) {
      leaveSession();

      session?.signal({
        data: nickname,
        type: 'leaveSession',
      });

      if (!id) return;
      endPurchaseLive(id);
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="w-full h-screen bg-black/80 relative">
      <div className="absolute bottom-0 top-0 flex justify-between items-center left-0 right-0 p-1 z-[1]">
        <button onClick={handlePreviousPage}>
          <IoIosArrowBack size={25} color="#D9D9D9" />
        </button>
        <button onClick={handleNextPage}>
          <IoIosArrowForward size={25} color="#D9D9D9" />
        </button>
      </div>
      <div className="w-full h-12 flex justify-center items-center text-white z-10">
        <div className="w-[20%]">
          {pType === PARTICIPANT_TYPE.BUYER ? (
            <div className="flex">
              <button
                className="mx-3 z-10"
                onClick={() => {
                  if (!onCamera) {
                    Toast.error('카메라를 켜주세요.');
                    return;
                  }

                  switchCamera();
                }}
              >
                <IoCameraReverseOutline size={25} color="#D9D9D9" />
              </button>
              <button onClick={handleCamera} className="z-10">
                {onCamera ? (
                  <TbCamera size={25} color={'#D9D9D9'} style={{ strokeWidth: '1.3px' }} />
                ) : (
                  <TbCameraOff size={25} color={'#D9D9D9'} style={{ strokeWidth: '1.3px' }} />
                )}
              </button>
            </div>
          ) : (
            <div className="flex">
              <button
                className="mx-3 z-10"
                onClick={() => {
                  if (!onCamera) {
                    Toast.error('카메라를 켜주세요.');
                    return;
                  }

                  switchCamera();
                }}
              >
                <IoCameraReverseOutline size={25} color="#D9D9D9" />
              </button>
            </div>
          )}
        </div>
        <div className="w-[60%] text-center truncate">{state.title}</div>
        <div className="w-[20%] z-10 flex justify-end">
          <button className="bg-[#FF0000] px-2 py-1 mr-4 rounded-sm text-sm hover:bg-red-600" onClick={handleGoOut}>
            나가기
          </button>
        </div>
      </div>
      {session && (
        <div key={''} className="px-1 grid grid-cols-2 gap-2">
          {displayInfo.length &&
            displayInfo.map((info, idx) => {
              if (info) {
                const data = JSON.parse(info.stream.connection.data.split('%/%')[0]);

                return (
                  <div key={idx} className="w-full h-[calc((100vh-150px)/2)] rounded-xl bg-black/30 relative">
                    <div className="relative w-full h-full" onClick={() => handleMainVideoStream(info)}>
                      <div className="absolute text-white/50 text-xs left-2 top-2  px-1.5 py-0.5">
                        {data.type === 'buyer' ? '구매자' : '판매자'}
                      </div>
                      <CameraItem streamManager={info} />
                    </div>
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
      <div className="absolute w-full">
        {pType === PARTICIPANT_TYPE.BUYER && (
          <LiveOptionTab
            pType={pType}
            handleMike={handleMike}
            handleCamera={handleCamera}
            handleChat={() => setIsOpenChattingBottomSheet(true)}
            handleSpeak={() => setIsOpenSpeakBottomSheet(true)}
            handleParticipants={() => setIsOpenParticipantModal(true)}
            handleMatch={() => setIsOpenMatchList(true)}
          />
        )}
        {pType === PARTICIPANT_TYPE.SELLER && (
          <LiveOptionTab
            pType={pType}
            handleMike={handleMike}
            handleCamera={handleCamera}
            handleChat={() => setIsOpenChattingBottomSheet(true)}
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
      {isOpenRequsetSalePriceModal && (
        <RequestSalePriceModal
          onClose={() => setIsOpenRequestSalePriceModal(false)}
          currentSalePrice={sellerInfo.offerPrice}
          sendSalePrice={sendSalePrice}
        />
      )}
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
      {isOpenMatchList && (
        <MatchModal onClose={() => setIsOpenMatchList(false)} handleMatch={handleMatch} participants={sellerList} />
      )}
      {isOpenMatchConfirmModal && (
        <MatchConfirmModal
          matchReqInfo={matchRequestInfo}
          onClose={() => setIsOpenMatchConfirmModal(false)}
          sendMatchConfirm={sendMatchConfirm}
        />
      )}
      {isOpenChattingBottomSheet && <ChattingBottomSheet onClose={() => setIsOpenChattingBottomSheet(false)} />}
    </div>
  );
};

export default PurchaseLivePage;
