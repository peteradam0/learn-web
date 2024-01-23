"use client";
import { useEffect, useState } from "react";
import useMediaStream from "@/common/media-streem/useMediaStream";
import usePeer from "@/common/peer/usePeer";
import { useSocket } from "@/room/context/socket";
import usePlayer from "@/event/video-player/usePlayer";
import Player from "@/room/ui-adapter/Player";
import Bottom from "@/room/ui-adapter/Bottom";
import {
  connectNewUser,
  createConnection,
  setCurrentStream,
} from "@/event/video-player/connect-new-user";
import {
  audioToggle,
  setUpSocketEvents,
  userLeave,
  videoToggle,
} from "@/event/video-player/video-pannel";
import { ScrollShadow } from "@nextui-org/react";
import { getUserData } from "@/common/api-adapter/get-user-data";
import { useUser } from "@clerk/nextjs";

const Room = ({ params }: any) => {
  const { roomId } = params;
  const [currentUser, setCurrentUser] = useState<any>();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const socket = useSocket();
  const { peer, myId } = usePeer(roomId);
  const { stream } = useMediaStream();
  const {
    videoPlayersDetails,
    setVideoPlayersDetails,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  } = usePlayer(myId, roomId, peer);
  const { user } = useUser();

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      const res = await getUserData();
      setCurrentUser(res?.data);
      setIsLoading(false);
    };

    try {
      getUser();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser: any, email: string) => {
      connectNewUser(
        peer,
        stream,
        newUser,
        setVideoPlayersDetails,
        setUsers,
        user?.emailAddresses[0].emailAddress || "",
        email
      );
    };
    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, setVideoPlayersDetails, socket, stream]);

  useEffect(() => {
    if (!socket) return;
    const handleToggleAudio = (userId: any) => {
      audioToggle(userId, setVideoPlayersDetails);
    };

    const handleToggleVideo = (userId: any) => {
      videoToggle(userId, setVideoPlayersDetails);
    };

    const handleUserLeave = (userId: any) => {
      userLeave(userId, users, videoPlayersDetails, setVideoPlayersDetails);
    };
    setUpSocketEvents(
      socket,
      handleToggleAudio,
      handleToggleVideo,
      handleUserLeave
    );
    return () => {
      setUpSocketEvents(
        socket,
        handleToggleAudio,
        handleToggleVideo,
        handleUserLeave
      );
    };
  }, [videoPlayersDetails, setVideoPlayersDetails, socket, users]);

  useEffect(() => {
    if (!peer || !stream) return;
    createConnection(peer, stream, setVideoPlayersDetails, setUsers);
  }, [peer, setVideoPlayersDetails, stream]);

  useEffect(() => {
    if (!stream || !myId) return;
    setCurrentStream(
      myId,
      setVideoPlayersDetails,
      stream,
      user?.emailAddresses[0].emailAddress || ""
    );
  }, [myId, setVideoPlayersDetails, stream]);

  const removePlayerIfBrowserIsClosed = () => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      leaveRoom();
    });
  };

  removePlayerIfBrowserIsClosed();
  if (isLoading) return <div>Loading..</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div
          style={{
            width: "40%",
            paddingLeft: "1%",
            float: "right",
          }}
        >
          <ScrollShadow
            offset={100}
            hideScrollBar
            orientation="horizontal"
            className="max-w-[250px] max-h-[500px]"
          >
            {Object.keys(nonHighlightedPlayers).map((playerId) => {
              const { url, muted, playing, email } =
                //@ts-ignore
                nonHighlightedPlayers[playerId];
              return (
                <div key={playerId}>
                  {url && (
                    <Player
                      url={url}
                      muted={muted}
                      playing={playing}
                      isActive={false}
                      userName={email ? email : ""}
                    />
                  )}
                </div>
              );
            })}
          </ScrollShadow>
        </div>
        <div style={{ width: "60%", paddingLeft: "10%" }}>
          {playerHighlighted && (
            <>
              <Player
                url={playerHighlighted.url}
                muted={playerHighlighted.muted}
                playing={playerHighlighted.playing}
                userName={currentUser ? currentUser.email : ""}
                isActive
              />

              <Bottom
                muted={playerHighlighted?.muted}
                playing={playerHighlighted?.playing}
                toggleAudio={toggleAudio}
                toggleVideo={toggleVideo}
                leaveRoom={leaveRoom}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;
