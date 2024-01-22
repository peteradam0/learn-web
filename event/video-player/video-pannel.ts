import { cloneDeep } from "lodash";

export const audioToggle = (userId: string, setPlayers: any) => {
  console.log(`user with id ${userId} toggled audio`);
  setPlayers((prev: any) => {
    const copy = cloneDeep(prev);
    copy[userId].muted = !copy[userId].muted;
    return { ...copy };
  });
};

export const userLeave = (
  userId: number,
  users: any[],
  players: any,
  setPlayers: any
) => {
  console.log(`user ${userId} is leaving the room`);
  users[userId]?.close();
  const playersCopy = cloneDeep(players);
  delete playersCopy[userId];
  setPlayers(playersCopy);
};

export const videoToggle = (userId: any, setPlayers: any) => {
  console.log(`user with id ${userId} toggled video`);
  setPlayers((prev: any) => {
    const copy = cloneDeep(prev);
    copy[userId].playing = !copy[userId].playing;
    return { ...copy };
  });
};

export const setUpSocketEvents = (
  socket: any,
  handleToggleAudio: any,
  handleToggleVideo: any,
  handleUserLeave: any
) => {
  socket.on("user-toggle-audio", handleToggleAudio);
  socket.on("user-toggle-video", handleToggleVideo);
  socket.on("user-leave", handleUserLeave);
};
