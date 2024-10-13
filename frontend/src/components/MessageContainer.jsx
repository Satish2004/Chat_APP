import React, { useEffect } from "react";
import MessegeSenderInput from "./SendInput";
import AllMessages from "./AllMessages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const { SelectedUser, authUser } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  // when we select the user to show their profile picture
  useEffect(() => {
    //cleanup
    return () => dispatch(setSelectedUser(null));
  }, []);

  return (
    <>
      {SelectedUser ? (
        <div className="md:min-w-[550px] flex flex-col">
          {/* Message container */}
          <div className="flex gap-1 items-center cursor-pointer p-2 bg-zinc-900 rounded-md m-2">
            {/* Avatar start */}
            <div className="avatar online">
              <div className="image w-14 rounded-full">
                <img src={SelectedUser?.profilePhoto} alt="profilePhoto" />
              </div>
            </div>

            {/* Username  */}

            <div className="name flex items-center ">
              <div className="flex gap-5 flex-1 items-center justify-between px-2">
                <p className="">{SelectedUser?.fullName}</p>
              </div>
            </div>
          </div>

          {/* All Messeges */}
          <AllMessages></AllMessages>
          {/* Messege sender input field */}
          <MessegeSenderInput />
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center text-center">
          <h1 className="text-4xl text-white font-bold">
            Hi,{authUser?.fullName}{" "}
          </h1>
          <h1 className="text-2xl text-white">Let's start conversation</h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
