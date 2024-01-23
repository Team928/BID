interface IProps {
    streamManager: {
      addVideoElement: (element: HTMLVideoElement) => void;
    };
  }
  
  import React, { Component, RefObject } from 'react';
  
  export default class CameraItem extends Component<IProps> {
    private videoRef: RefObject<HTMLVideoElement>;
  
    constructor(props: IProps) {
      super(props);
      this.videoRef = React.createRef();
    }
  
    componentDidUpdate(prevProps: IProps) {
      if (prevProps && this.videoRef.current) {
        this.props.streamManager?.addVideoElement(this.videoRef.current);
      }
    }
  
    componentDidMount() {
      if (this.props && this.videoRef.current) {
        this.props.streamManager?.addVideoElement(this.videoRef.current);
      }
    }
  
    render() {
      return <video autoPlay={true} ref={this.videoRef} />;
    }
  }
  