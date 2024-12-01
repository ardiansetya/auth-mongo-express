import { VERIFICATION_EMAIL_TEMPLATE } from "./emailsTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

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

export const sendWelcomeEmail = async (email, name) => {
   const recipient = [{email}];

   try {
     const response = await mailtrapClient.send({
         from: sender,
         to: recipient,
         template_uuid: "7a87cd4f-20d2-46d1-8366-d46687a7f91b", 
         template_variables:{
            "company_info_name": "Ambalabu Company",
            "first_name": name
         }
      })
      console.log("welcome email sent", response);
   } catch (error) {
      console.log(error)

      throw new Error({message: error.message});
   }
}