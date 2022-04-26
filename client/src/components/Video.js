import ReactPlayer from "react-player";

const Video = () => {
  return (
    <div className="video-container">
      <ReactPlayer
        url={"https://youtu.be/hUxZZKsL1b0"}
        muted={false}
        controls={false}
        playing={true}
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export default Video;