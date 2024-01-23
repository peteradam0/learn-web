import { useState } from "react";
import { cloneDeep } from "lodash";
import { useSocket } from "@/room/context/socket";
import { useRouter } from "next/navigation";

const usePlayer = (
  myId: string,
  roomId: string | string[] | undefined,
  peer: any
) => {
  const socket = useSocket();
  const [videoPlayersDetails, setVideoPlayersDetails] = useState({});
  const router = useRouter();
  const playersCopy: any = cloneDeep(videoPlayersDetails);

  const playerHighlighted = playersCopy[myId];

  delete playersCopy[myId];

  const nonHighlightedPlayers = playersCopy as any[];

  const leaveRoom = () => {
    socket?.emit("user-leave", myId, roomId);
    peer?.disconnect();
    router.push("/");
  };

  const toggleAudio = () => {
    setVideoPlayersDetails((prev) => {
      const copy: any = cloneDeep(prev);
      copy[myId].muted = !copy[myId].muted;
      return { ...copy };
    });
    socket?.emit("user-toggle-audio", myId, roomId);
  };

  const toggleVideo = () => {
    setVideoPlayersDetails((prev) => {
      const copy: any = cloneDeep(prev);
      copy[myId].playing = !copy[myId].playing;
      return { ...copy };
    });
    socket?.emit("user-toggle-video", myId, roomId);
  };

  return {
    videoPlayersDetails,
    setVideoPlayersDetails,
    playerHighlighted,
    nonHighlightedPlayers,
    toggleAudio,
    toggleVideo,
    leaveRoom,
  };
};

export default usePlayer;
