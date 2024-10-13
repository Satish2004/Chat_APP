import React from "react";
import SingleMessage from "./SingleMessage";
import useGetMessages from "../hooks/useGetMessages";
import { useSelector } from "react-redux";

const AllMessages = () => {
  // Fetch messages using the custom hook
  useGetMessages();
  useGetRealTimeMessage();

  // Access messages from Redux store
  const { messages } = useSelector((store) => store.message);

  // If there are no messages, return null or a placeholder
  if (!messages || messages.length === 0) return;

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages &&
        messages.map((message) => (
          <SingleMessage key={message._id} message={message} />
        ))}
    </div>
  );
};

export default AllMessages;
