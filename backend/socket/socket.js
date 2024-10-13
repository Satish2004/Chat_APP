// jo messsage abhi send  kr rhe hai use data base me save kar raha hai then fetch kar raha hai
// but socket io kya krta hai simply database me fetch krne se phle use reflect instantly show kr deta hai

import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {
  //in pair of key and value
};

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId != undefined) {
    userSocketMap[userId] = socket.id;
  }

  //user online or not
  io.emit("getOnlineUser", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    //cleanup
    delete userSocketMap[userId];
    //update
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});

export { app, io, server };
