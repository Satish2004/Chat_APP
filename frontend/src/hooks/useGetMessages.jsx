import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  // Fix the case: use `selectedUser` to match the store state correctly
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedUser?._id) return; // Ensure `selectedUser` is defined before making a request

      try {
        // Set Axios to use cookies for authentication
        axios.defaults.withCredentials = true;

        // Fetch messages for the selected user
        const res = await axios.get(
          `http://localhost:8090/api/v1/message/${selectedUser._id}` // Corrected port if necessary
        );

        console.log(res);

        // Dispatch the fetched messages to the Redux store
        dispatch(setMessages(res.data));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser, dispatch]); // Ensure `selectedUser` and `dispatch` are dependencies
};

export default useGetMessages;
