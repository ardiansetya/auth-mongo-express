import { User } from "../models/User.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const register = async (req, res) => {
   const { email, password, name } = req.body;

   try {
      // Validation
      if (!name || !email || !password) {
         return res.status(400).json({ message: "All fields are required" });
      }
      const userAlredyExist = await User.findOne({ email });
      if (userAlredyExist) {
         return res.status(400).json({ success: false, message: "User already exist" });
      }

      // hash password
      const hashedPassword = await bcryptjs.hash(password, 10);
      const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

      //  save to db
      const user = new User({ 
         email,
         password: hashedPassword,
         name, 
         verificationToken,
         verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
      });
      await user.save();
    
      // jwt
      generateTokenAndSetCookie(res, user._id);
      res.status(201).send({
         success: true, message: "User registered successfully", 
         user: {
            ...user._doc,
            password: undefined
         } });


   } catch (error) {
      res.status(400).send({ success: false, message: error.message })
   }
}

export const login = async (req, res) => {
   res.send("login route");
}

export const logout = async (req, res) => {
   res.send("logout route");
}