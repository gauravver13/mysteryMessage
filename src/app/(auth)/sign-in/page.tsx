'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"        // Linkage!
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/router"
import { signUpSchema } from "@/schema/signUpSchema"
import axios,{ AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse"
import { useDebounce } from 'use-debounce';

const page = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const debouncedUsername = useDebounce(username, 300)      // check for useDebounceValue;
  const { toast } = useToast()
  const router = useRouter();
  
  // Zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try {
          const response = await axios.get(`/api/check-username-unique? username=${debouncedUsername}`)
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as  AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          )
        } finally {
          setIsCheckingUsername(false)
        }
      }
    }
    checkUsernameUnique()
  }, [debouncedUsername])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data)
      toast({
        title: 'Success',
        description: response.data.message
      })
      router.replace(`/verify/${username}`)
      setIsSubmitting(false)
    } catch (error) {
      console.error("Error in signup of user", error)
      const axiosError = error as  AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive"
      })
      setUsernameMessage(
        axiosError.response?.data.message ?? "Error checking username"
      )
    }
  }

  return (
    <div>page</div>
  )
}

export default page



// function useDebounceValue(username: string, arg1: number) {
//   throw new Error("Function not implemented.")
// }
// function useDebounceValue(username: string, arg1: number) {
//   throw new Error("Function not implemented.")
// }
// function useDebounceValue(username: string, arg1: number) {
//   throw new Error("Function not implemented.")
// }
