"use client";
import useMediaStream from "@/common/media-streem/use-media-streem";
import usePeer from "@/common/peer/use-peer";
import { useSocket } from "@/common/socket/socket-provider";
import React, { useEffect } from "react";
import ReactPlayer from 'react-player'

export default function Room({ params }: any) {
  const { roomId } = params;
  const socket = useSocket();
  const { peer, myId } = usePeer(roomId);
  const { stream } = useMediaStream();

  useEffect( () => {

    if(!socket.socket || !peer || !stream) return

    const handleUserConnected = (userId: any) =>{
        console.log(`user connected in room with ${userId}`)
        const call = peer.call(userId, stream)
    }
    socket.socket.on("user-connected",handleUserConnected)

    return () => {
      socket.socket.off('user-connected',handleUserConnected)
    }
  }, [peer, stream, socket.socket])

  useEffect( () => {
    if(!peer) return
    peer.on('call', (call: any) => {
      console.log("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal")
      const {peer: callerId} = call
      call.answer(stream)
      call.on('stream', (incomingStream: any) => {
        console.log(`incoming stream from ${callerId}`)
      })

    })
  },[peer, stream])

  return <div><ReactPlayer key={myId} url={stream} muted={true} playing/></div>;
}
