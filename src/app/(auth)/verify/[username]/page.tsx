'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { verifySchema } from '@/schema/verifySchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z  from 'zod'


const page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()
    const { toast } = useToast()
    const params = useParams<({username: string})>()         
    // data taken from url!<type infering> for type safety-not compulsory

      // Zod implementation

    // form or register || 
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
        // defaultValues: {
        //     username: params.username,
        //     code: ''
        // }

    })


    // async(data: z.infer<typeof verifySchema>)
    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        setIsSubmitting(true);

        try {
            console.log('Verify code route hits');
            
            const response = await axios.post(`/api/verify-code`, {
                username: params.username,
                code: data.code
            })


            toast({
                title: "Success",
                description: response.data.message
            })
            
            router.replace(`/sign-in`)
            setIsSubmitting(false);
        } catch (error) {
            console.error("Error in signup of user", error)

            const axiosError = error as  AxiosError<ApiResponse>;
            toast({
              title: "Signup failed",
              description: axiosError.response?.data.message,
              variant: "destructive"
            })

            setIsSubmitting(false)
        }
    }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
            <div className='text-center'>
                <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
                    Verify your Account
                </h1>
                <p className='mb-4'>Enter the verification code from your email</p>
            </div>
            
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-6">
                <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                        <Input placeholder="code" {...field} />
                    </FormControl>
                    <FormDescription>
                        Check your email and enter the verification code.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                {/* <Button type="submit">Submit</Button> */}
            <Button type="submit" disabled={isSubmitting}
            >
            {
              isSubmitting ? (
                <>
                  <Loader2  className="mr-2 h-4 animate-spin"/> Please wait
                </>
              ) : ( 'Submit' )
            }
          </Button>
            </form>
        </Form>
        </div>
    </div>
  )
}

export default page