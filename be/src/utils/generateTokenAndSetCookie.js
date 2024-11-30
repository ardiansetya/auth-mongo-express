import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
   const token = jwt.sign({userId}, process.env.JWT_SECRET, {
      expiresIn: '7d'
   })

   res.cookie("token", token, {
      htpOnly: true, // only accessible by server, not by client mencegah XSS attact
      secure: process.env.NODE_ENV === "production", // only send cookie in HTTPS, not HTTP
      sameSite: "strict", // prevent CSRF attack
      maxAge: 7 * 24 * 60 * 60 * 1000 //7 day

   } )

   return token
}