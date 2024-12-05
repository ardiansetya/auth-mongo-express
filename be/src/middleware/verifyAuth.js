import jwt from "jsonwebtoken";
export const verifyAuth = (req, res, next) => {
   const {token} = req.cookies;
   if (!token) {
      res.status(401).json({success: false, message: "Unauthorized - No token provided"});
   }
   try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      if (!decode) {
         res.status(401).json({success: false, message: "Unauthorized - Invalid token"});
      }

      req.userId = decode.userId;
      next();
   } catch (error) {
      console.log(error.message)
      res.status(500).json({success: false, message: "Internal server error"});
   }
}