import ReactPlayer from "react-player";
import cx from "classnames";
import { Mic, MicOff, UserSquare2 } from "lucide-react";

import styles from "@/room/ui-adapter/Player/index.module.css";
import { Card, CardFooter } from "@nextui-org/react";

const Player = (props: any) => {
  const { url, muted, playing, isActive, userName } = props;
  return (
    <>
      <div
        style={{ justifyContent: "center" }}
        className={cx(styles.playerContainer, {
          [styles.notActive]: !isActive,
          [styles.active]: isActive,
          [styles.notPlaying]: !playing,
        })}
      >
        {playing ? (
          <div>
            <Card isFooterBlurred radius="lg" className="border-none">
              <ReactPlayer
                url={url}
                muted={muted}
                playing={playing}
                className="object-cover"
                width="100%"
                height="100%"
              />
              {userName && (
                <CardFooter className="justify-between  before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-white/80">{userName}</p>
                </CardFooter>
              )}
            </Card>
          </div>
        ) : (
          <UserSquare2 className={styles.user} size={isActive ? 400 : 150} />
        )}
        {!isActive ? (
          muted ? (
            <MicOff className={styles.icon} size={20} />
          ) : (
            <Mic className={styles.icon} size={20} />
          )
        ) : undefined}
      </div>
    </>
  );
};

export default Player;
