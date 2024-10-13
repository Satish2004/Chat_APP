import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const SingleMessage = ({ message }) => {
  const scroll = useRef();
  //for other user
  const { authUser, selectedUser } = useSelector((store) => store.user);

  // scroll lagane ke bad useEffect lagayenge
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div>
      {/* chat bubble start */}
      <div
        ref={scroll}
        className={`chat ${
          authUser?._id === message?.senderId ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="profileAvatar"
              src={
                message?.senderId === authUser?._id
                  ? authUser?.profilePhoto
                  : selectedUser?.profilePhoto
              }
            />
          </div>
        </div>
        <div className="chat-header">
          <time className="text-xs opacity-50">12:45</time>
        </div>
        <div className="chat-bubble">{message?.message}</div>
      </div>
    </div>
  );
};

export default SingleMessage;
