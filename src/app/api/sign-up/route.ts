import  dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs"

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import UserModel from "@/model/User";


// if existingUserbyEmail EXISTS THEN 
    // if existingUserByEmail.isVerified THEN 
    // success: false
    // else
    // save the updated user 
// end 
// if 
// else  Create a new user with the provided details
    // Save the new user 
    // end if 


export async function POST(request: Request){
    await dbConnect();

    // console.log('db connected');
    

    try {
        const { username, email, password } = await request.json()
        
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true 
        })
        
        // console.log(existingUserVerifiedByUsername);    // if null
        

        if(existingUserVerifiedByUsername) {
            return Response.json({
                success: false, 
                message: "Username is already taken"
            }, {status: 400})
        }

        const existingUserByEmail = await UserModel.findOne({email})
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

        // console.log('Existing user by email: ',existingUserByEmail);
        
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exist with email"
                }, { status: 400 })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)

                await existingUserByEmail.save()
            }
               // TODO: Back here!
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })

            await newUser.save()
        }

        // Send Verification email.
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        )

        if(!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message 
            }, { status: 500 })
        }

        return Response.json({
            success: true,
            message: "User registered successfully, Please verify your email", 
        }, { status: 201 })

    } catch (error) {
        console.error('Error registering user', error)
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }
        )
    }
}