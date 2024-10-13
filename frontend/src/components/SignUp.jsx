import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SignUp = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const onSubmithandlerForm = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:9000/api/v1/user/register`,
        user, // Pass user object as the body of the POST request
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // This enables cookies to be sent with the request
        }
      );
      // console.log(res);
      if (res.data.success) { //if exist
        //redirect--> navigate
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // console.error(error);

    }

    // Reset form after submission
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  // Update gender in state
  const handleGenderChange = (gender) => {
    setUser({ ...user, gender });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center p-4">Signup</h1>
        <form onSubmit={onSubmithandlerForm}>
          {/* Fullname */}
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Fullname</span>
            </label>
            <input
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              value={user.fullName}
              type="text"
              placeholder="Enter your name"
              className="w-full input input-bordered h-11 bg-slate-100 text-black"
            />
          </div>
          {/* Username */}
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              value={user.username}
              type="text"
              placeholder="Enter Your Username"
              className="w-full input input-bordered h-11 bg-slate-100 text-black"
            />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
              type="password"
              placeholder="Enter Your password"
              className="w-full input input-bordered h-11 bg-slate-100 text-black"
            />
          </div>
          {/* Confirm Password */}
          <div>
            <label htmlFor="" className="label p-2">
              <span className="text-base label-text">Confirm password</span>
            </label>
            <input
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              value={user.confirmPassword}
              type="password"
              placeholder="Confirm Your password"
              className="w-full input input-bordered h-11 bg-slate-100 text-black"
            />
          </div>
          <br />
          {/* Gender */}
          <div className="flex items-center">
            <p className="text-black">Male</p>
            <input
              type="checkbox"
              checked={user.gender === "male"}
              onChange={() => handleGenderChange("male")}
              className="checkbox checkbox-sm mx-2 border-black"
            />
            <p className="text-black">Female</p>
            <input
              type="checkbox"
              checked={user.gender === "female"}
              onChange={() => handleGenderChange("female")}
              className="checkbox checkbox-sm mx-2 border-black"
            />
          </div>

          <Link to="/login" className="text-blue-700 underline">
            Already have an account
          </Link>

          <div className="mt-4">
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-500"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
