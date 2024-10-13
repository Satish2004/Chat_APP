import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/socketSlice";
import io from "socket.io-client";
import { setOnlineUsers } from "./redux/userSlice";

const router = createBrowserRouter([
  // There are three routes register , login nd Home
  {
    path: "/",
    element: <Homepage />,
  },

  {
    path: "/register",
    element: <SignUp />,
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  //socket implementation'

  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8090", {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(setSocket(socket));
      socket.on("getOnlineUser", (onlineUser) => {
        dispatch(setOnlineUsers(onlineUser));
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
