export const currentParticipant = (
  roomName: any,
  clerkToken: any,
  router: any,
  setUserData: any
) => {
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${roomName}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${clerkToken}` },
  })
    .then((res) => res.json())
    .then((data: any) => {
      if (!data) router.push("/sign-in");
      setUserData(data);
    });
};

export const setCurrentParticipant = (
  roomName: any,
  cookies: any,
  router: any,
  participants: any,
  setCurrentUserAdmin: any,
  setParticipants: any
) => {
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/${roomName}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${cookies["__session"]}` },
  })
    .then((res) => res.json())
    .then((data: any) => {
      if (!data) router.push("/sign-in");
      const newArray: any = participants;
      newArray.push({ username: data.username, current: true });
      setCurrentUserAdmin(data.admin);
      setParticipants(newArray);
    });
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events/room/${roomName}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${cookies["__session"]}` },
  })
    .then((res) => res.json())
    .then((data: any) => {
      if (data.length === 0) return;
      const newArray: any = participants;
      data.map((participant: any) => {
        newArray.push({ username: participant.username });
      });
      setParticipants(newArray);
    });
};
