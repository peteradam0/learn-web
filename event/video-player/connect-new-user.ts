export const connectNewUser = (
  peer: any,
  stream: any,
  newUser: any,
  setPlayers: any,
  setUsers: any
) => {
  console.log(`user connected in room with userId ${newUser}`);

  const call = peer.call(newUser, stream);

  call.on("stream", (incomingStream: any) => {
    console.log(`incoming stream from ${newUser}`);
    setPlayers((prev: any) => ({
      ...prev,
      [newUser]: {
        url: incomingStream,
        muted: true,
        playing: true,
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
      setPlayers((prev: any) => ({
        ...prev,
        [callerId]: {
          url: incomingStream,
          muted: true,
          playing: true,
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
  stream: any
) => {
  console.log(`setting my stream ${myId}`);
  setPlayers((prev: any) => ({
    ...prev,
    [myId]: {
      url: stream,
      muted: true,
      playing: true,
    },
  }));
};
