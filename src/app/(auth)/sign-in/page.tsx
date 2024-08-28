'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import React, { useEffect, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signInSchema } from "@/schema/signInSchema"




const page = () => {

  const [username, setUsername] =useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const debouncedUsername = useDebounceValue(username, 300)
  const { toast } = useToast()
  const router = useRouter()


  // zod implementation 

  // form or register || 
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })


  // useEffect({
    
  // }
  // , [debouncedUsername])


  return (
    <div>
        Sign In Page!
    </div>
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


// import { useSession, signIn, signOut } from "next-auth/react"
// export default function Component() {
//   const { data: session } = useSession()
//   if (session) {
//     return (
//       <>
//         Signed in as {session.user.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </>
//     )
//   }
//   return (
//     <>
//       Not signed in <br />
//       <button className="bg-orange-500 px-3 py-1 m-4 hover:bg-red-400" onClick={() => signIn()}>Sign in</button>
//     </>
//   )
// }


// TODO: Resend email, 
          // OpenAPI Connection!
          // Debounced techniques