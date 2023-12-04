import adminModel from "../models/adminModel.js";
import doctorModel from "../models/doctorModel.js";
import patientModel from "../models/patientModel.js";
import jwt from "jsonwebtoken"
import crypto from 'crypto';
import nodemailer from "nodemailer";
import passwordValidator from 'password-validator';

// Creating token after forgotPassword and login
const createToken = (data) => {
    const Token = () => {
        const maxAge = 3 * 24 * 60 * 60;
        return jwt.sign(data, 'supersecret', {
            expiresIn: maxAge
        });
    }
    return Token();
};

// clearing token after resetPassword and logout
const clearToken = (res) => {
    res.clearCookie('jwt');
};

// Login
export const login = async(req,res) => {
    try {
        const { username, password } = req.body;
        let tokenData;
        
        const admin = await adminModel.findOne({username:username});
        if (admin) {
            if(admin.password !== password){
                return res.status(400).json({error : "Incorrect Password"});
            }
            tokenData = {
                username: username,
                role: 'admin'
            };
        } else {

            const doctor = await doctorModel.findOne({username:username});
            if (doctor) {
                if(doctor.password !== password){
                    return res.status(400).json({error : "Incorrect Password"});
                }
                tokenData = {
                    username: username,
                    role: 'doctor',
                    status: doctor.status
                };
            } else {

                const patient = await patientModel.findOne({username:username});
                if (patient) {
                    if(patient.password !== password){
                        return res.status(400).json({error : "Incorrect Password"});
                    }
                    tokenData = {
                        username: username,
                        role: 'patient'
                    };
                } else {
                    return res.status(400).json({error : "User does not exist"});
                }
            }
        }
        const token = createToken(tokenData);
        const maxAge = 3 * 24 * 60 * 60;
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000,sameSite: "none", secure: true });
        res.set('Access-Control-Allow-Origin',req.headers.origin);
        res.set('Access-Control-Allow-Credentials','true');   
        res.status(200).json(tokenData);
    } catch (error) {
        return res.status(400).json({error : error.message});
    }
}

export const logout = async (req, res) => {
    try {

      const token = req.cookies.jwt;
      if (!token){
          res.status(400).json({error:"You're Not Signed in to Logout !!"})
           } else {
                clearToken(res);
                res.status(200).json({error : "Successfully Logged Out "});}
    } catch (error) {
      res.status(400).json({error:error.message})
    }
  }

// Sending mail with otp
const sendMail = async(email, otp) => {
    // Sending OTP
    const mailOptions = {
        from: 'csen704Bond@gmail.com',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
    };

    // const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: "csen704Bond@gmail.com",
        pass: "xsfudgbrdfpzkihi",
        },
    });
  
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

// ForgotPassword
export const forgotPassword = async(req,res) => {
    try {
        const { username, email } = req.body;
        const otp = crypto.randomInt(100000, 999999).toString();
        let tokenData;

        const admin = await adminModel.findOne({username:username});
        if(!admin) {
            
            const doctor = await doctorModel.findOne({username:username});
            if(doctor) {
                if(email !== doctor.email) {
                    return res.status(400).json({error : "Email Doesn't Match"});
                } else {
                    tokenData = {
                        username: username,
                        role: 'doctor',
                        otp: otp
                    };
                }
            } else {

                const patient = await patientModel.findOne({username:username});
                if(patient) {
                    if(email !== patient.email) {
                        return res.status(400).json({error : "Email Doesn't Match"});
                    } else {
                        tokenData = {
                            username: username,
                            role: 'patient',
                            otp: otp
                        };
                    }
                } else {
                    return res.status(400).json({error : "User does not exist"});
                }
            }
        } else {
            tokenData = {
                username: username,
                role: 'admin',
                otp: otp
            };
        }

        sendMail(email, otp);
        const token = createToken(tokenData);
        const maxAge = 3 * 24 * 60 * 60;
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000,sameSite: "none", secure: true });
        res.set('Access-Control-Allow-Origin',req.headers.origin);
        res.set('Access-Control-Allow-Credentials','true');
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        return res.status(400).json({error : error.message});
    }
}

const validatePassword = (password) => {
    // Create a schema
    var schema = new passwordValidator();

    // Add properties to it
    schema.is().min(8) // Minimum length 8
          .is().max(16) // Maximum length 16
          .has().uppercase() // Must have uppercase letters
          .has().lowercase() // Must have lowercase letters
          .has().digits() // Must have at least  digits
          .has().not().spaces(); // Should not have spaces
          // .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
    let tempArr;
    if (!schema.validate(password)) {
        tempArr = schema.validate(password, { details: true });
        const tempJson = tempArr.map(detail => ({
            validation : detail.validation,
            message : detail.message
        }));
        return tempJson;
    } else {
        return null;
    }
}

export const resetPassword = async(req,res) => {
    try {
        const token = req.cookies.jwt;
        jwt.verify(token, 'supersecret', async(err, decodedToken) => {
            if(err) {
                return res.status(400).json({err : err.message});
            } else {
                // request from forgotPassword else resetPassword
                if ('otp' in decodedToken) {
                    const savedUsername = decodedToken.username;
                    const savedRole = decodedToken.role;
                    const savedOTP  = decodedToken.otp;
                    const {OTP, newPassword, reNewPassword} = req.body;
                    if(OTP !== savedOTP) {
                        return res.status(400).json({error : "Wrong OTP"});
                    }
                    if(newPassword !== reNewPassword) {
                        return res.status(400).json({error : "New Password and Re-input New Password does not match"});
                    }
                    const tempJson = validatePassword(newPassword);
                    if(tempJson) {
                        return res.status(400).json(tempJson);
                    } else {
                        if (savedRole === 'admin') {
                            const admin = await adminModel.findOne({username:savedUsername});
                            admin.password = newPassword;
                            await admin.save();                    
                        } else {
                            if (savedRole === 'doctor') {
                                const doctor = await doctorModel.findOne({username:savedUsername});
                                doctor.password = newPassword;
                                await doctor.save();
                        
                            } else {
                                const patient = await patientModel.findOne({username:savedUsername});
                                patient.password = newPassword;
                                await patient.save();                        
                            }
                        }        
                    }
                } else {
                    const savedUsername = decodedToken.username;
                    const savedRole  = decodedToken.role;
                    const {oldPassword, newPassword, reNewPassword} = req.body;
                    if(newPassword !== reNewPassword) {
                        return res.status(400).json({error : "New Password and Re-input New Password does not match"});
                    }
                    const tempJson = validatePassword(newPassword);
                    if(tempJson) {
                        return res.status(400).json(tempJson);
                    } else {
                        if(savedRole === 'admin') {
                            const admin = await adminModel.findOne({username:savedUsername});
                            admin.password = newPassword;
                            await admin.save();
                        } else {
                            if(savedRole === 'doctor') {
                                const doctor = await doctorModel.findOne({username:savedUsername});
                                doctor.password = newPassword;
                                await doctor.save();
                            } else {
                                const patient = await patientModel.findOne({username:savedUsername});
                                patient.password = newPassword;
                                await patient.save();
                            }
                        }
                        let tokenData = {
                            username: savedUsername,
                            role: savedRole
                        };

                        res.status(200).json({ 
                            tokenData: tokenData,
                            message: "Password resetted successfully" 
                        });
                    }
                }
            }
        });
    } catch (error) {
        return res.status(400).json({error : error.message});
    }
}