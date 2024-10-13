import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    //req kyu --> kyunki waha se data ko le rahe hai na ki res  bhej rahe hai
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRETKEY);
    // console.log(decode);
    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }
    //token data le rahe hai
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default isAuthenticated;
