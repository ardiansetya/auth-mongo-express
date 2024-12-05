import { tracingChannel } from "diagnostics_channel";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailsTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
   const recipient = [{ email }];

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
      throw new Error({ message: error.message });
   }
}

export const sendWelcomeEmail = async (email, name) => {
   const recipient = [{ email }];

   try {
      const response = await mailtrapClient.send({
         from: sender,
         to: recipient,
         template_uuid: "7a87cd4f-20d2-46d1-8366-d46687a7f91b",
         template_variables: {
            "company_info_name": "Ambalabu Company",
            "first_name": name
         }
      })
      console.log("welcome email sent", response);
   } catch (error) {
      console.log(error)

      throw new Error({ message: error.message });
   }
}

export const resetPasswordEmail = async (email, resetlUrl) => {
   const recipient = [{ email }];

   try {
      const response = await mailtrapClient.send({
         from: sender,
         to: recipient,
         subject: "Reset Your Password",
         html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetlUrl),
         category: "Email Verification",
      })

      console.log("email sned response:", response)

   } catch (error) {
      console.log(error)

      throw new Error({ message: error.message });
   }
} 

export const sendResetSuccsessEmail = async (email) => {
   const recipient = [{ email }];

   try {
      const response = await mailtrapClient.send({
         from: sender,
         to: recipient,
         subject: "Reset Password Successful",
         html: PASSWORD_RESET_SUCCESS_TEMPLATE,
         category: "Reset Password",
      })

      console.log("email sent", response);
   } catch (error) {
      console.log(error.message)
      throw new Error({ message: error.message });
   }
}