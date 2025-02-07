import { User } from "../models/User.js";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { resetPasswordEmail, sendResetSuccsessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

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
      generateTokenAndSetCookie(res, user._id)

      await sendVerificationEmail(user.email, verificationToken);



      res.status(201).json({
         success: true, message: "User registered successfully",
         user: {
            ...user._doc,
            password: undefined
         }
      });

   } catch (error) {
      res.status(400).json({ success: false, message: error.message })
   }
}

export const verifyEmail = async (req, res) => {
   const { code } = req.body

   try {
      const user = await User.findOne({
         verificationToken: code,
         verificationTokenExpiresAt: { $gt: Date.now() }
      })

      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;

      await user.save();

      await sendWelcomeEmail(user.email, user.name);

      res.status(200).json({ success: true, message: "Email verified successfully" })

   } catch (error) {
      res.status(500).json({ success: false, message: error.message })
   }


}

export const login = async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(404).json({ success: false, message: "User not found" })
      }

      const isMatch = await bcryptjs.compare(password, user.password);

      if (!isMatch) {
         return res.status(400).json({ success: false, message: "Password is incorrect" })
      }

      // set cookie and token 
      generateTokenAndSetCookie(res, user._id)


      user.lastLogin = new Date();
      await user.save();

      res.status(200).json({
         success: true,
         message: "Login successfully",
         user: {
            ...user._doc,
            password: undefined
         }
      })
   } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: error.message })
   }

}

export const forgotPassword = async (req, res) => {
   const { email } = req.body

   try {
      const user = await User.findOne({ email })

      if (!user) {
         res.status(404).json({ success: false, message: "Usaer not found!" })
      }

      // generate token
      const resetToken = crypto.randomBytes(32).toString("hex");



      user.resetPasswordToken = resetToken;
      user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000 // 1 hour

      await user.save();
      await resetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

      res.status(200).json({ success: true, message: "Reset password email sent successfully" })

   } catch (error) {
      console.log(error.message)
      throw new Error(error.message)
   }

}

export const resetPassword = async (req, res) => {
   try {
      const { token } = req.params;
      const { password } = req.body;

      const user = await User.findOne({
         resetPasswordToken: token,
         resetPasswordExpiresAt: { $gt: Date.now() }
      })

      if (!user) {
         res.status(404).json({ success: false, message: "Invalid Token" })
      }

      // update password
      const hashedPassword = await bcryptjs.hash(password, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiresAt = undefined;

      await user.save();

      await sendResetSuccsessEmail(user.email)

      res.status(200).json({ success: true, message: "Password reset successfully" })


   } catch (error) {

   }
}

export const logout = async (req, res) => {
   res.clearCookie("token")
   res.status(200).json({ success: true, message: "Logout successfully" })
}


export const checkAuth = async (req, res) => {
   try {
      const user = await User.findById(req.userId).select("-password");

      if (!user) {
         return res.status(404).json({ success: false, message: "User not found" })
      }

      res.status(200).json({
         success: true,
         user
      })
   } catch (error) {
      console.log(error.message)
      res.status(500).json({ success: false, message: error.message })
   }
}