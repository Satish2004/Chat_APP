import React from "react";
import OtherUser from "./OtherUser";
import useGetOtherUser from "../hooks/useGetOtherUser.jsx";
import { useSelector } from "react-redux";

const OtherUsers = () => {
  // Use the custom hook
  useGetOtherUser();

  const { OtherUsers } = useSelector((store) => store.user);

  // Early return if there are no users
  if (!OtherUsers) return null;

  return (
    <div className="overflow-auto flex-1">
      {OtherUsers?.map((user) => {
        return <OtherUser key={user._id} user={user} />;
      })}
    </div>
  );
};

export default OtherUsers;
