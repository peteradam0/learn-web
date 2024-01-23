import { Server } from "socket.io";

const SocketHandler = (req: any, res: any) => {
  console.log("called api");
  if (res.socket.server.io) {
    console.log("socket already running");
  } else {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("server is connected");

      socket.on("join-room", (roomId, userId, email) => {
        console.log(`a new user ${email} joined room ${roomId}`);
        //add the user to the room in db
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-connected", userId, email);
      });

      socket.on("user-toggle-audio", (userId, roomId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-toggle-audio", userId);
      });

      socket.on("user-toggle-video", (userId, roomId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-toggle-video", userId);
      });

      socket.on("user-leave", (userId, roomId) => {
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("user-leave", userId);
      });
    });
  }
  res.end();
};

export default SocketHandler;
