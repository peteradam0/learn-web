"use client";
import { useEffect, useState } from "react";
import { cloneDeep } from "lodash";
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

const Room = ({ params }: any) => {
  const socket = useSocket();
  const { roomId } = params;

  const { peer, myId } = usePeer(roomId);
  const { stream } = useMediaStream();
  const {
    players,
    setPlayers,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  } = usePlayer(myId, roomId, peer);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser: any) => {
      connectNewUser(peer, stream, newUser, setPlayers, setUsers);
    };
    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, setPlayers, socket, stream]);

  useEffect(() => {
    if (!socket) return;
    const handleToggleAudio = (userId: any) => {
      audioToggle(userId, setPlayers);
    };

    const handleToggleVideo = (userId: any) => {
      videoToggle(userId, setPlayers);
    };

    const handleUserLeave = (userId: any) => {
      userLeave(userId, users, players, setPlayers);
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
  }, [players, setPlayers, socket, users]);

  useEffect(() => {
    if (!peer || !stream) return;
    createConnection(peer, stream, setPlayers, setUsers);
  }, [peer, setPlayers, stream]);

  useEffect(() => {
    if (!stream || !myId) return;
    setCurrentStream(myId, setPlayers, stream);
  }, [myId, setPlayers, stream]);

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
          {Object.keys(nonHighlightedPlayers).map((playerId) => {
            //@ts-ignore
            const { url, muted, playing } = nonHighlightedPlayers[playerId];
            return (
              <Player
                key={playerId}
                url={url}
                muted={muted}
                playing={playing}
                isActive={false}
              />
            );
          })}
        </div>
        <div style={{ width: "60%", paddingLeft: "10%" }}>
          {playerHighlighted && (
            <>
              <Player
                url={playerHighlighted.url}
                muted={playerHighlighted.muted}
                playing={playerHighlighted.playing}
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
