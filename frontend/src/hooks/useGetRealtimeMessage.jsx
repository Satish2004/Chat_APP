import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  //kya krne ke baad ye useeffect chalegi
  const { socket } = useSelector((store) => store.socket);
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      dispatch(setMessages([...messages, newMessage]));
    });
  }, [socket, setMessages, messages]); // dependencies means jb jab change hoga tab tab ye kaam karega
};

export default useGetRealTimeMessage;
