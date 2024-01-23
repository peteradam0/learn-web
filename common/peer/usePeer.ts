import { useSocket } from "@/room/context/socket";
import { useAuth } from "@clerk/nextjs";
import { decodeJwt } from "@clerk/nextjs/server";

const { useState, useEffect, useRef } = require("react");

const usePeer = (roomId: string) => {
  const socket = useSocket();
  const [peer, setPeer] = useState(null);
  const [myId, setMyId] = useState("");
  const isPeerSet = useRef(false);
  const auth = useAuth();
  useEffect(() => {
    if (isPeerSet.current || !roomId || !socket) return;
    isPeerSet.current = true;
    let myPeer;

    (async function initPeer() {
      myPeer = new (await import("peerjs")).default();
      myPeer.id;
      setPeer(myPeer);

      myPeer.on("open", async (id) => {
        console.log(`your peer id is ${id}`);
        setMyId(id);
        const email = await getEmail(auth);

        socket?.emit("join-room", roomId, id, email.email);
      });
    })();
  }, [roomId, socket]);

  return {
    peer,
    myId,
  };
};

const getEmail = async (auth: any) => {
  const token = await auth.getToken();
  return { email: decodeJwt(token || "").payload.email };
};

export default usePeer;
