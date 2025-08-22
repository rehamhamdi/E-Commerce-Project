
import nodemailer from "nodemailer"
import { emailTemplate } from "./emailTemplate.js";
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    service:"gmail",
  auth: {
    user: "rehamhamdi53@gmail.com",
    pass: "ahyk tsax joxb mofi",
  },
   tls:{
    rejectUnauthorized:false
   } 
});

export const sendMail =async (email) => {
  const info = await transporter.sendMail({
    from: '"nodeMailTest" <rehamhamdi53@gmail.com>',
    to: email,
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: emailTemplate(email), // HTML body => Email
  });
  console.log("Message sent:", info.messageId);
};