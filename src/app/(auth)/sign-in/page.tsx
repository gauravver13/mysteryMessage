'use client'

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import Link from "next/link"        // Linkage!
// import { useEffect, useState } from "react"
// import { useToast } from "@/components/ui/use-toast"
// import { useRouter } from "next/router"
// import { signUpSchema } from "@/schema/signUpSchema"
// import axios,{ AxiosError } from "axios";
// import { ApiResponse } from "@/types/ApiResponse"
// import { useDebouncedValue } from '@mantine/hooks';
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Loader2 } from "lucide-react"


// const page = () => {
//   const [username, setUsername] = useState('')
//   const [usernameMessage, setUsernameMessage] = useState('')
//   const [isCheckingUsername, setIsCheckingUsername] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
  
//   const debouncedUsername = useDebouncedValue(username, 300)      // check for useDebounceValue;
//   const { toast } = useToast()
//   const router = useRouter();
  
//   // Zod implementation
//   const form = useForm<z.infer<typeof signUpSchema>>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: {
//       username: '',
//       email: '',
//       password: ''
//     }
//   })

//   useEffect(() => {
//     const checkUsernameUnique = async () => {
//       if (debouncedUsername) {
//         setIsCheckingUsername(true)
//         setUsernameMessage('')
//         try {
//           const response = await axios.get(`/api/check-username-unique? username=${debouncedUsername}`)
//           setUsernameMessage(response.data.message)
//         } catch (error) {
//           const axiosError = error as AxiosError<ApiResponse>;
//           setUsernameMessage(
//             axiosError.response?.data.message ?? "Error checking username"
//           )
//         } finally {
//           setIsCheckingUsername(false)
//         }
//       }
//     }
//     checkUsernameUnique()
//   }, [debouncedUsername])


//   const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
//     setIsSubmitting(true)
//     try {
//       console.log(data);
      
//       const response = await axios.post<ApiResponse>('/api/sign-up', data)
//       toast({
//         title: 'Success',
//         description: response.data.message
//       })
//       router.replace(`/verify/${username}`)
//       setIsSubmitting(false)
//     } catch (error) {
//       console.error("Error in signup of user", error)

//       const axiosError = error as  AxiosError<ApiResponse>;
//       let errorMessage = axiosError.response?.data.message
//       toast({
//         title: "Signup failed",
//         description: errorMessage,
//         variant: "destructive"
//       })
//       setIsSubmitting(false)
//       // setUsernameMessage(
//       //   axiosError.response?.data.message ?? "Error checking username"
//       // )
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//         <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//           Join Mystery Message
//         </h1>
//         <p className="mb-4">Sign up to start your anonymous adventure</p>
//         </div>
//           <Form {...form}>
//             <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-6">
//             <FormField
//             control={form.control}
//             name="username"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Username</FormLabel>
//                 <FormControl>
//                   <Input placeholder="usernamae"
//                    {...field}
//                   onChange={(e) => {
//                     field.onChange(e)
//                     setUsername(e.target.value)
//                   }} 
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//             <FormField
//             control={form.control}
//             name="email"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>email</FormLabel>
//                 <FormControl>
//                   <Input placeholder="email"
//                    {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//             <FormField
//             control={form.control}
//             name="password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>password</FormLabel>
//                 <FormControl>
//                   <Input type="password" placeholder="password"
//                    {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit" disabled={isSubmitting}>
//             {
//               isSubmitting ? (
//                 <>
//                   <Loader2  className="mr-2 h-4 animate-spin"/> Please wait
//                 </>
//               ) : ( 'Signup' )
//             }
//           </Button>
//             </form>

//           </Form>
//           <div className="text-center mt-4">
//             <p>
//               Already a member? {''}
//               <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//       </div>
//     </div>
//   )
// }

// export default page



// function useDebounceValue(username: string, arg1: number) {
//   throw new Error("Function not implemented.")
// }
// function useDebounceValue(username: string, arg1: number) {
//   throw new Error("Function not implemented.")
// }
// function useDebounceValue(username: string, arg1: number) {
//   throw new Error("Function not implemented.")
// }


import { useSession, signIn, signOut } from "next-auth/react"
export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button className="bg-orange-500 px-3 py-1 m-4 hover:bg-red-400" onClick={() => signIn()}>Sign in</button>
    </>
  )
}