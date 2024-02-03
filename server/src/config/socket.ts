import { Socket } from "socket.io";

export const SocketServer = (socket: Socket) => {
  console.log(socket.id + " connected");

  socket.on('joinRoom', (id: string) => {
    socket.join(id)
    console.log({
      joinRoom: socket.rooms
    });
  })

  socket.on('outRoom', (id: string) => {
    socket.leave(id)
    console.log({ outRoom: socket.rooms })
  })

  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnected')
  })
};
