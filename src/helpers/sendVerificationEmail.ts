import { Resend } from 'resend';
import VerificationEmail from '../../emails/VerificationEmail';

import { ApiResponse } from "@/types/ApiResponse";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'trueFeedback@resend.dev',
            to: email,
            subject: 'Mystery message | Verification code',
            react: VerificationEmail({username, otp: verifyCode}),
          });
        return {success: true, message: "verification email send successfully"}
    } catch (emailError) {
        console.error("Error sending verification email", emailError)
        return {success: false, message: "Failed to send verification email"}
    }
}



// import { Resend } from 'resend';
// import VerificationEmail from '../../emails/VerificationEmail';


// export async function POST() {

// const resend = new Resend(process.env.RESEND_API_KEY);

//   try {
//     const { data, error } = await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: ['delivered@resend.dev'],
//       subject: 'Hello world',
//       react: EmailTemplate({ firstName: 'John' }),
//     });

//     if (error) {
//       return Response.json({ error }, { status: 500 });
//     }

//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }