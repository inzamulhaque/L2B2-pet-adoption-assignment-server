import nodemailer from "nodemailer";
import config from "../config";
import AppError from "../app/errors/AppError";
import httpStatus from "http-status";

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.email.address,
    pass: config.email.password,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (options: EmailOptions): Promise<void> => {
  const mailOptions = {
    from: config.email.address,
    // to: options.to,
    to: "mdihalif@gmail.com",
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Error sending email!"
    );
  }
};

export default sendEmail;
