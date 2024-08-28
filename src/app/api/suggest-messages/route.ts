// import { openai } from '@ai-sdk/openai';

// import { generateText } from 'ai';
// import { NextResponse, NextRequest } from 'next/server';

// export default function POST(req: request){
//     try {
        
//     } catch (error) {
//         NextResponse.json({
//             error: error
//         })
//     }
// }


























// import OpenAI from 'openai';
// import { OpenAIStream, StreamingTextResponse } from 'ai';
// import { NextResponse } from 'next/server';


// // Create an OpenAI API client (that's edge friendly!)
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
 
// // Set the runtime to edge for best performance
// export const runtime = 'edge';
 
// export async function POST(req: Request) {
//     try {
//         const { messages } = await req.json();
        
//     const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be seperated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction, For example, your output should be structured like this: 'What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be?|| What's a simple thing that makes you happy?'. Ensure the questions are interiguing, foster curiosity, and contribute to a positive and welcoming conversational environment."
    
       
//         // Ask OpenAI for a streaming completion given the prompt
//         const response = await openai.completions.create({
//             model: 'gpt-3.5-turbo-instruct',
//             max_tokens: 400,
//             stream: true,
//             prompt,
//         });
    
//         // Convert the response into a friendly text-stream
//         const stream = OpenAIStream(response);
//         // Respond with the stream
//         return new StreamingTextResponse(stream);
//     } catch (error) {
//         if (error instanceof OpenAI.APIError) {
//             const { name, status, headers, message } = error
//             return NextResponse.json({
//                 name, status, headers, message
//             }, { status })
//         } else {
//             console.log("An unexpected error occured", error);
//             throw error
//         }
//     }
// }


// import { openai } from '@ai-sdk/openai';
// import { streamText } from 'ai';
// import { NextResponse } from 'next/server';
// import OpenAI from 'openai/index.mjs';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//  try {
//     //  const { messages } = await req.json();
//     const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be seperated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction, For example, your output should be structured like this: 'What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be?|| What's a simple thing that makes you happy?'. Ensure the questions are interiguing, foster curiosity, and contribute to a positive and welcoming conversational environment."
   
//     // Ask openAI for a streaming chat completion given the prompt.

//      const result = await streamText({
//        model: openai('gpt-4-turbo'),
//        maxTokens: 400,
//        stream: true,
//        prompt,
//      });

//      const stream = OpenAI(result)
   
//      return new toAIStreamResponse(stream);
//  } catch (error) {
//         if (error) {
//             const { name, status, headers, message }:any = error
//             return NextResponse.json({
//                 name, status, headers, message
//             }, { status })
//         } else {
//             console.log("An unexpected error occured", error);
//             throw error
//         }
//     }
//  }

