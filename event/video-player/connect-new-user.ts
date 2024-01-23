export const connectNewUser = (
  peer: any,
  stream: any,
  newUser: any,
  setPlayers: any,
  setUsers: any,
  currentEmail: string,
  newEmail: string
) => {
  console.log(`user connected in room with userId ${newUser}`);
  const options = { metadata: { type: currentEmail } };
  const call = peer.call(newUser, stream, options);

  call.on("stream", (incomingStream: any) => {
    console.log(`incoming stream from this${newUser}`);
    setPlayers((prev: any) => ({
      ...prev,
      [newUser]: {
        url: incomingStream,
        muted: true,
        playing: true,
        status: "a new user is connected",
        email: newEmail,
      },
    }));

    setUsers((prev: any) => ({
      ...prev,
      [newUser]: call,
    }));
  });
};

export const createConnection = (
  peer: any,
  stream: any,
  setPlayers: any,
  setUsers: any
) => {
  peer.on("call", (call: any) => {
    const { peer: callerId } = call;

    call.answer(stream);

    call.on("stream", (incomingStream: any) => {
      console.log(`incoming stream from ${callerId}`);
      const email = call.metadata.type;

      setPlayers((prev: any) => ({
        ...prev,
        [callerId]: {
          url: incomingStream,
          muted: true,
          playing: true,
          email,
          status: "answaring the call",
        },
      }));

      setUsers((prev: any) => ({
        ...prev,
        [callerId]: call,
      }));
    });
  });
};

export const setCurrentStream = (
  myId: string,
  setPlayers: any,
  stream: any,
  email: string
) => {
  console.log(`setting my stream ${myId}`);

  setPlayers((prev: any) => ({
    ...prev,
    [myId]: {
      url: stream,
      muted: true,
      playing: true,
      email: email,
      status: "set my current stream",
    },
  }));
};
