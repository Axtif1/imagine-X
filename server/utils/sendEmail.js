import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

    const mailOptions = {
      from: `ImagineX <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email error details:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    })
    throw new Error("Email could not be sent")
  }
};

export const generateOTPContent = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #09090b; color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #27272a;">
      <h2 style="color: #8b5cf6; text-align: center;">Welcome to ImagineX!</h2>
      <p style="font-size: 16px; color: #a1a1aa;">Thank you for registering. Please use the following OTP to verify your email address. This OTP is valid for 10 minutes.</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; background-color: #18181b; padding: 15px 30px; border-radius: 8px; letter-spacing: 5px; color: #c4b5fd; border: 1px solid #3f3f46;">${otp}</span>
      </div>
      <p style="font-size: 14px; color: #71717a; text-align: center;">If you did not request this, please ignore this email.</p>
    </div>
  `;
};

export const generatePasswordResetContent = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #09090b; color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #27272a;">
      <h2 style="color: #8b5cf6; text-align: center;">Reset Your Password</h2>
      <p style="font-size: 16px; color: #a1a1aa;">You have requested to reset your ImagineX password. Please use the following OTP to complete the process. This OTP is valid for 10 minutes.</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; background-color: #18181b; padding: 15px 30px; border-radius: 8px; letter-spacing: 5px; color: #c4b5fd; border: 1px solid #3f3f46;">${otp}</span>
      </div>
      <p style="font-size: 14px; color: #71717a; text-align: center;">If you did not request a password reset, please ignore this email.</p>
    </div>
  `;
};

export default sendEmail;
