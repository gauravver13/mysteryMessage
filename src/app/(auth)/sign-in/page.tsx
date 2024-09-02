'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"        // Linkage!

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { signInSchema } from "@/schema/signInSchema"
import { signIn } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"


const page = () => {

  // const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { toast } = useToast()
  const router = useRouter();
  
  // Zod implementation

  // form or register || 
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {

    console.log("checking for the sigin page");
    

    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password
    })
    console.log("RESULT: ",result);

    

    
    if(result?.error) {
      
      // toast({
        //   title: "Login Failed",
        //   description: "Incorrect username or password",
        //   variant: "destructive"
        // })
        
        if(result.error === "CredentialsSignin") {
          console.log('Login failed..!', result)
          toast({
            title: "Login Failed by credentials",
            description: "Incorrect username or password",
            variant: "destructive"
          })
        }
      } else {
      console.log(result);
      toast({
        title: "Login Failed XXXXX",
        description: result?.error,
        variant: "destructive"
      })
    }

    if(result?.url) {
      console.log("ERROR.URL", result);
      
      router.replace('/dashboard')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Join Mystery Message
        </h1>
        <p className="mb-4">Sign in to start your anonymous adventure</p>
        </div>
          <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6">
            <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email/Username</FormLabel>
                <FormControl>
                  <Input placeholder="email/Username"
                   {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password"
                   {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <Button type="submit">
                Signin
            </Button>
          </form>
          </Form>

          <div className="text-center mt-4">
            <p>
              Not a member? {''}
              <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                Sign up
              </Link>
            </p>
          </div>
      </div>
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