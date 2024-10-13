import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { SelectedUser, onlineUsers } = useSelector((store) => store.user);

  // Ensure onlineUsers is an array to avoid null reference errors
  const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user._id);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`${
          SelectedUser?._id === user?._id ? "bg-slate-900" : ""
        } flex gap-1 items-center hover:bg-slate-900 rounded-lg cursor-pointer p-2`}
      >
        {/* Avatar start */}
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="image w-14 rounded-full">
            <img src={user?.profilePhoto || "/default-avatar.png"} alt="userprofile" />
          </div>
        </div>
        {/* Avatar end */}

        {/* Username */}
        <div className="name flex items-center">
          <div className="flex gap-5 flex-1 items-center justify-between px-2">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider mx-2 h-1"></div>
    </div>
  );
};

export default OtherUser;
