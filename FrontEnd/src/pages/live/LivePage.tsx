import CameraBox from '@/components/live/CameraBox';
import LiveOptionTab from '@/components/live/LiveOptionTab';
import { getToken } from '@/service/live';
import { Device, OpenVidu, Publisher, Session, Subscriber } from 'openvidu-browser';
import { ChangeEvent, Component } from 'react';

export interface ISessionInfo {
  mySessionId: string;
  myUserName: string;
  session: Session | undefined;
  mainStreamManager: any;
  publisher: Publisher | undefined;
  subscribers: Subscriber[] | any[];
  currentVideoDevice?: Device;
  onCamera: boolean;
  onMike: boolean;
  onSpeak: boolean;
}

class LivePage extends Component<{}, ISessionInfo> {
  private OV: any;

  constructor(props: any) {
    super(props);

    this.state = {
      mySessionId: 'sessionQWER',
      myUserName: 'ID ' + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      currentVideoDevice: undefined,
      onCamera: true,
      onMike: true,
      onSpeak: false,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);

    //   설정
    this.setCamera = this.setCamera.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }

  // 언로드 이벤트 => 세션 끊는 함수
  onbeforeunload(e: any) {
    this.leaveSession();
  }

  setCamera(cameraOn: boolean) {
    if (this.state.mainStreamManager) {
      this.state.mainStreamManager.publishVideo(cameraOn);
    }
  }

  handleChangeSessionId(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  // 메인 비디오 설정
  handleMainVideoStream(stream: any) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  // 구독자 제거
  deleteSubscriber(streamManager: any) {
    if (!this.state.subscribers) return;

    let subscribers = this.state.subscribers;

    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  // openvidu 초기화, 세션 연결, 사용자 비디오 스트림 게시 처리
  // 입장할 때 실행되는 함수
  joinSession() {
    // 새 객체 생성
    this.OV = new OpenVidu();

    // 세션 상태 변경
    this.setState(
      {
        session: this.OV.initSession(),
      },
      // state 변경 후 실행되는 콜백함수
      () => {
        const mySession: any = this.state.session;

        // subscriber
        mySession.on('streamCreated', (event: any) => {
          const subscriber = mySession.subscribe(event.stream, undefined);
          const subscribers = this.state.subscribers; // 현재 구독자들
          subscribers.push(subscriber);

          this.setState({
            subscribers: subscribers,
          });
        });

        mySession.on('streamDestroyed', (event: any) => {
          this.deleteSubscriber(event.stream.streamManager);
        });

        mySession.on('exception', (exception: Error) => {
          console.warn(exception);
        });

        // publisher
        getToken(this.state.mySessionId).then(token => {
          // 토큰을 가지고 연결
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              // 게시자 초기화
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: true,
                publishVideo: true,
                resolution: '640x480',
                frameRate: 30,
                insertMode: 'APPEND',
                mirror: false,
              });

              // 게시자 스트리밍 시작
              mySession.publish(publisher);

              // 현재 비디오 장치
              const devices = await this.OV.getDevices(); // 현재 사용가능한 모든 장치 가져옴
              const videoDevices = devices.filter((device: any) => device.kind === 'videoinput'); // 웹캠만 필터링
              const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId; // 현재 비디오 id
              const currentVideoDevice = videoDevices.find((device: any) => device.deviceId === currentVideoDeviceId); // 현재 비디오

              // 게시자 + 현재 카메라 저장
              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error: Error) => {
              console.log(error.message);
            });
        });
      },
    );

    console.log('subscribers', this.state.subscribers);
  }

  // openvidu 연결을 끊고 상태를 재설정하는 함수
  leaveSession() {
    const mySession: any = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: '',
      myUserName: 'ID ' + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  handleToggle(type: string) {
    if (this.state.publisher) {
      switch (type) {
        case 'camera':
          this.setState({ onCamera: !this.state.onCamera }, () => {
            console.log(this.state.publisher);
            this.state.publisher?.publishVideo(this.state.onCamera);
          });
          break;

        case 'speaker':
          this.setState({ onSpeak: !this.state.onSpeak }, () => {
            this.state.subscribers.forEach(s => s.subscribeToAudio(this.state.onSpeak));
          });
          break;

        case 'mike':
          this.setState({ onMike: !this.state.onMike }, () => {
            this.state.publisher?.publishAudio(this.state.onMike);
          });
          break;
      }
    }
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <div>
        {/* 세션 밖 */}
        {this.state.session === undefined ? (
          <div>
            <div>
              <form onSubmit={this.joinSession}>
                <p>
                  <label>참가자: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
                    required
                  />
                </p>
                <p>
                  <label> 세션: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>
                <p className="text-center">
                  <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
                </p>
              </form>
            </div>
          </div>
        ) : (
          // 라이브 방송 중
          <div className="bg-black/80 w-screen h-screen relative">
            <div>
              <div>{mySessionId}</div>
              <button onClick={this.leaveSession} value="Leave session" />
            </div>

            {/* 전체 사람 띄우기 */}
            <div>
              {/* publisher */}
              {this.state.publisher !== undefined && (
                <div onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                  <CameraBox streamManager={this.state.publisher} />
                </div>
              )}
              {/* subscribers */}
              {this.state.subscribers &&
                this.state.subscribers.map((sub, i) => (
                  <div>
                    <div key={sub.id} onClick={() => this.handleMainVideoStream(sub)}>
                      <span>{sub.id}번 카메라</span>
                      <CameraBox streamManager={sub} />
                    </div>
                  </div>
                ))}
            </div>
            <LiveOptionTab />
          </div>
        )}
      </div>
    );
  }
}

export default LivePage;
