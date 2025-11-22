import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const getUserData = async (req, res) => {
  try {
    // Get token from cookie or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.json({ success: false, message: "No token provided" });

    // Verify token and get userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
