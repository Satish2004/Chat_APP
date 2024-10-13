import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        axios.defaults.withCredentials = true; // Ensure cookies are sent if applicable

        const token = localStorage.getItem("authToken"); // Get the token from localStorage

        const res = await axios.get(`http://localhost:9000/api/v1/user/`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          },
        });

        console.log(res);

        dispatch(setOtherUsers(res.data)); // Store the fetched users
      } catch (error) {
        console.error("Error fetching other users:", error);
      }
    };

    fetchOtherUser();
  }, [dispatch]);
};

export default useGetOtherUser;
