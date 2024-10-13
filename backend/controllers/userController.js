import { User } from "../models/userModel.js"; // Add the ".js" extension
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    //register kya kya kra skate hai user se-->
    let { fullName, username, password, confirmPassword, gender } = req.body;

    // Check if any field is empty
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required! " });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    // Check if the username already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists! " });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set profile photo based on gender
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create the new user
    await User.create({
      fullName,
      username,
      password: hashedPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });

    return res
      .status(201)
      .json({ message: "Register Successfull!", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

//LOGIN
export const login = async (req, res) => {
  try {
    // Destructure the username and password from the request body
    let { username, password } = req.body;

    // Check if username or password is missing
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Find the user by username
    let user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Username not found!", success: false });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res
        .status(400)
        .json({ message: "Password is incorrect!", success: false });
    }

    // Generate token using JWT
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRETKEY, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    // Store the token in a cookie
    return (
      // res kyu kyunki waha cookie ko store (bhej) rhe hai
      res
        .status(200)
        .cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day expiration
          httpOnly: true, // Cookie accessible only by the server
          // secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
          sameSite: "strict", // Prevents CSRF attacks
        })
        // Return user info along with successful login response
        .json({
          _id: user._id,
          username: user.username,
          fullName: user.fullName,
          profilePhoto: user.profilePhoto,
          message: "Log in successfully",
          success: true,
        })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

//LOGOUT
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "User Logged Out successfully!",
    });
  } catch (error) {
    console.log(error);
  }
};
// user who is already logged in and show in side corner
export const getOtherUser = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    //$ne = not equal to
    //otheruser ko id se find kr rhe hai then usme se password ko nahi le rhe hia client side me
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log(error);
  }
};
