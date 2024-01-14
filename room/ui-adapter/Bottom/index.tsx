import cx from "classnames";
import { Mic, Video, PhoneOff, MicOff, VideoOff } from "lucide-react";

const Bottom = (props: any) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom } = props;

  return (
    <div>
      {muted ? (
        <MicOff size={55} onClick={toggleAudio} />
      ) : (
        <Mic size={55} onClick={toggleAudio} />
      )}
      {playing ? (
        <Video size={55} onClick={toggleVideo} />
      ) : (
        <VideoOff size={55} onClick={toggleVideo} />
      )}
      <PhoneOff size={55} onClick={leaveRoom} />
    </div>
  );
};

export default Bottom;
