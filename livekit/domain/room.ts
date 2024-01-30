import { LocalUserChoices } from "@livekit/components-react";
import { LocalAudioTrack, LocalVideoTrack } from "livekit-client";

export type ActiveRoomProps = {
  userChoices: LocalUserChoices;
  roomName: string;
  region?: string;
  onLeave?: () => void;
};
