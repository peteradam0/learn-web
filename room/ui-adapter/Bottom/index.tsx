import cx from "classnames";
import { Mic, Video, PhoneOff, MicOff, VideoOff } from "lucide-react";

const Bottom = (props: any) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom } = props;

  return (
    <div
      className="flex gap-3 items-center"
      style={{
        width: "100%",
        background: "grey",

        paddingRight: "10%",
      }}
    >
      {muted ? (
        <MicOff size={30} onClick={toggleAudio} />
      ) : (
        <Mic size={30} onClick={toggleAudio} />
      )}
      {playing ? (
        <Video size={30} onClick={toggleVideo} />
      ) : (
        <VideoOff size={30} onClick={toggleVideo} />
      )}
      <PhoneOff size={30} onClick={leaveRoom} />
    </div>
  );
};

export default Bottom;
