import React from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import OtherUsers from "./OtherUsers";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

const Sidebar = () => {
  const navigate = useNavigate(); // Move useNavigate outside the function
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      // axios.defaults.withCredentials = true;  -> Uncomment if using authentication middleware

      const res = await axios.get(`http://localhost:9000/api/v1/user/logout`);
      navigate("/login"); // Correctly use navigate
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-r border-slate-400 p-4 flex flex-col ">
      <form action="" className="flex gap -5">
        <input
          type="text"
          className="input input-bordered rounded-md"
          placeholder="Search here"
        />
        <button className="text-white btn rounded-md bg-zinc-900" type="submit">
          <FaSearch size="" />
        </button>
      </form>
      <div className="divider px-3 overflow-scroll"></div>
      <OtherUsers />
      <div className="m-2 p-2 ">
        <button onClick={logoutHandler} className="btn btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
