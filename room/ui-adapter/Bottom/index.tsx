import { Tab, Tabs, Tooltip } from "@nextui-org/react";
import cx from "classnames";
import { Mic, Video, PhoneOff, MicOff, VideoOff } from "lucide-react";

const Bottom = (props: any) => {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom } = props;

  return (
    <div
      className="flex gap-3 items-center"
      style={{
        width: "100%",
        paddingRight: "10%",
      }}
    >
      <div className="flex" style={{ paddingLeft: "40%" }}>
        <Tabs aria-label="Options" color="primary" variant="bordered">
          <Tab
            key="photos"
            title={
              <div className="flex items-center space-x-2">
                {muted ? (
                  <Tooltip content="Mute">
                    <MicOff size={30} onClick={toggleAudio} />
                  </Tooltip>
                ) : (
                  <Tooltip content="Unmute">
                    <Mic size={30} onClick={toggleAudio} />
                  </Tooltip>
                )}
              </div>
            }
          />
          <Tab
            key="music"
            title={
              <div className="flex items-center space-x-2">
                {playing ? (
                  <Tooltip content="Video off">
                    <Video size={30} onClick={toggleVideo} />
                  </Tooltip>
                ) : (
                  <Tooltip content="Video on">
                    <VideoOff size={30} onClick={toggleVideo} />
                  </Tooltip>
                )}
              </div>
            }
          />
          <Tab
            key="videos"
            title={
              <div className="flex items-center space-x-2">
                <Tooltip content="Leave">
                  <PhoneOff size={30} onClick={leaveRoom} />
                </Tooltip>
              </div>
            }
          />
        </Tabs>
      </div>
    </div>
  );
};

export default Bottom;
