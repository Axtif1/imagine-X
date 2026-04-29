import User from "../models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import sendEmail, { generateOTPContent, generatePasswordResetContent } from "../utils/sendEmail.js";

// Utility to generate a 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const registerUser = async (req , res) => {

    const {name , email , phone , password , bio} = req.body

    //check if All fields are coming
    if(!name || !email || !phone || !password) {
        res.status(409)
        throw new Error('Please Fill All Details!!!')
    }

    //Check if user already exists
    let userNameExist = await User.findOne({name : name})
    let emailExist = await User.findOne({email : email})
    let phoneExist = await User.findOne({phone : phone})

    if(userNameExist || emailExist || phoneExist){
        res.status(409)
        throw new Error("User Already Exists!!")
    }


    //Hash Password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Register User
    let user = await User.create({
        name, 
        email, 
        phone, 
        password: hashedPassword, 
        bio,
        isVerified: false,
        otp,
        otpExpiry
    });

    if(!user){
        res.status(400)
        throw new Error("User Not Created")
    }

    // Send OTP Email asynchronously in the background
    sendEmail({
        email: user.email,
        subject: "Verify Your Email - ImagineX",
        html: generateOTPContent(otp)
    }).catch(error => {
        console.error("Failed to send verification email:", error);
    });

    res.status(201).json({
        message: "Registration successful. Please verify your email.",
        email: user.email,
        isVerified: user.isVerified
    })
}



const loginUser = async (req , res) => {
    const {email , password} = req.body

    //check if All fields are coming
    if(!email || !password) {
        res.status(409)
        throw new Error('Please Fill All Details!!!')
    }

    //Check if user exists
    let user = await User.findOne({email : email})

    if(user && await bcrypt.compare(password , user.password)){
        // Check if email is verified
        if (!user.isVerified) {
            res.status(403);
            throw new Error("Please verify your email address before logging in.");
        }

        res.status(200).json({
        id : user._id,
        name : user.name,
        bio : user.bio,
        email : user.email,
        phone : user.phone,
        isAdmin : user.isAdmin,
        isActive : user.isActive,
        credits : user.credits,
        token : generateToken(user._id)
    })
    }else{
        res.status(400)
        throw new Error("Invalid Credentials")
    }
}


// Verify Email OTP
const verifyEmail = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        res.status(400);
        throw new Error("Email and OTP are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (user.isVerified) {
        res.status(400);
        throw new Error("Email is already verified");
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
        res.status(400);
        throw new Error("Invalid or expired OTP");
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully. You can now log in." });
};

// Resend OTP
const resendOtp = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error("Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (user.isVerified) {
        res.status(400);
        throw new Error("Email is already verified");
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    // Send OTP Email asynchronously in the background
    sendEmail({
        email: user.email,
        subject: "Your New OTP - ImagineX",
        html: generateOTPContent(otp)
    }).catch(error => {
        console.error("Failed to send OTP email:", error);
    });

    res.status(200).json({ message: "A new OTP has been sent to your email" });
};

// Forgot Password - Send OTP
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error("Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    // Send OTP Email asynchronously in the background
    sendEmail({
        email: user.email,
        subject: "Password Reset OTP - ImagineX",
        html: generatePasswordResetContent(otp)
    }).catch(error => {
        console.error("Failed to send password reset email:", error);
    });

    res.status(200).json({ message: "Password reset OTP sent to your email" });
};

// Verify Reset OTP
const verifyResetOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        res.status(400);
        throw new Error("Email and OTP are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
        res.status(400);
        throw new Error("Invalid or expired OTP");
    }

    res.status(200).json({ message: "OTP verified successfully. You can now reset your password." });
};

// Reset Password
const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        res.status(400);
        throw new Error("Email, OTP, and new password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    // Verify OTP again just to be secure
    if (user.otp !== otp || user.otpExpiry < Date.now()) {
        res.status(400);
        throw new Error("Invalid or expired OTP");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully. You can now log in with your new password." });
};

// Protected Controller 
const privateController = (req , res) => {
    res.send("I am Private Controller " + req.user.name)
}







// Generate Token 
const generateToken = (id) => {

    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn : '30d'}) 
}


const authController = {
    registerUser, 
    loginUser, 
    privateController,
    verifyEmail,
    resendOtp,
    forgotPassword,
    verifyResetOtp,
    resetPassword
}

export default authController