import { useEffect, useRef, useState } from "react";
import { useSocket } from "../socket/socket-provider";
const usePeer = (roomId: string) => {
  const [peer, setPeer] = useState<any>();
  const [myId, setMyId] = useState("");
  const isPeerSet = useRef(false);
  const {socket} = useSocket()

  useEffect(() => {
    if (isPeerSet.current || !roomId || !socket) return;
    isPeerSet.current = true;
    (async function initPeer() {
      const myPeer = new (await import("peerjs")).default();
      setPeer(myPeer);
      myPeer.on("open", (id) => {
        console.log(`your peer id is ${id}`);
        setMyId(id);
        socket.emit('join-room',{userId: id}, roomId,)
      });

    })();
  }, [roomId, socket]);

  return {
    peer,
    myId,
  };
};

export default usePeer;
