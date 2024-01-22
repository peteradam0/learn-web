import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket: any = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props: any) => {
  const { children } = props;
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const connection: any = io();
    console.log("socket connection", connection);
    setSocket(connection);
  }, []);

  socket?.on("connect_error", async (err: any) => {
    console.log("Error establishing socket", err);
    await fetch("/api/socket");
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
