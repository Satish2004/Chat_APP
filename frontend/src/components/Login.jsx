import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
const Login = () => {
  // UseState for Login page
  const navigate = useNavigate();
  const [user, setUser] = useState({
    // step 1 --> define initial value user me hongi-->
    // step 2 --> setUser only change into onChange function

    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  // for form -->
  const onSubmithandlerForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:9000/api/v1/user/login`,
        user, // Pass user object as the body of the POST request
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // This enables cookies to be sent with the request
        }
      );

      navigate("/");
      toast.success(res.data.message);
      console.log(res.data);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }

    //after submission
    setUser({
      username: "",
      password: "",
    });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center p-4 ">Login</h1>
        <form action="" onSubmit={onSubmithandlerForm}>
          {/* username */}
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              placeholder="Enter Your Username"
              className="w-full input input-bordered h-11 bg-slate-100 text-black "
            />
          </div>
          {/* password */}
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="Enter Your password"
              className="w-full input input-bordered h-11 bg-slate-100 text-black "
            />
          </div>

          <Link to={"/register"} className="text-blue-700 underline">
            I have'n an account
          </Link>
          <div className="">
            <br />
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-500"
              type="submit"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
