"use client";
import useMediaStream from "@/common/media-streem/use-media-streem";
import usePeer from "@/common/peer/use-peer";
import { useSocket } from "@/common/socket/socket-provider";
import React from "react";
import ReactPlayer from 'react-player'

export default function Room({ params }: any) {
  const { roomId } = params;
  const socket = useSocket();
  const { peer, myId } = usePeer();
  const { stream } = useMediaStream();

  return <div><ReactPlayer key={myId} url={stream} muted={true} playing/></div>;
}
