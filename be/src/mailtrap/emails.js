import { VERIFICATION_EMAIL_TEMPLATE } from "./emailsTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.js";

export const sendVerificationEmail = async (email, verificationToken) => {
   const recipient = [{email}];

   try {
      const response = await mailtrapClient.send({
         from: sender,
         to: recipient,
         subject: "Verify Your Email",
         html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
         category: "Email Verification",
      })

      console.log("email sent", response);
   } catch (error) {
      console.log(error)
      throw new Error({message: error.message});
   }
}