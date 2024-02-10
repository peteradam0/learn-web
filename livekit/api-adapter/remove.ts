export const removeUser = (roomName: any, identity: any) => {
  fetch(`/api/room`, {
    method: "POST",
    body: JSON.stringify({
      roomName,
      identity,
    }),
  });
};
