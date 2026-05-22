"use client";

import Link from "next/link";

import { FcGoogle } from "react-icons/fc";
import {
  Button,
  Card,
  CardHeader,
  Description,
  FieldError,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
 

export default function LoginPage() {
  const onSubmit =  async(e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
   
    
    const {data, error} = await authClient.signIn.email(
        {
            email:user.email,
            password : user.password
        }
    )
    
    if(data){
        redirect('/')
    }
    if(error){
        alert('Failed in your Register')
    }

  };
   
  const handleGoogleSingIn = async() => {
    await authClient.signIn.social({
        provider : "google"
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <Card className="w-full max-w-md bg-gray-700   border border-gray-800 rounded-3xl shadow-2xl">
        <CardHeader className="flex flex-col gap-2 pt-8">
          <h1 className="text-3xl font-bold text-white">Log In</h1>

          <p className="text-gray-400 text-sm">Login to your account</p>
        </CardHeader>

        <Card className="pb-8">
          <form
            onSubmit={onSubmit}
            className="flex w-96 mx-auto max-w-sm sm:max-w-md flex-col gap-4"
          >
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }

                return null;
              }}
            >
              <Label>Email</Label>
              <Input placeholder="john@example.com" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              minLength={6}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 6) {
                  return "Password must be at least 6 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[a-z]/.test(value)) {
                  return "Password must contain at least one lowercase letter";
                }

                return null;
              }}
            >
              <Label>Password</Label>
              <Input placeholder="Enter your password" />
              <Description>
                Must be at least 6 characters with 1 uppercase and 1 Lowercase
              </Description>
              <FieldError />
            </TextField>



            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                
                className="w-full  rounded-2xl bg-[#00FF9D] text-black font-bold mt-5"
              >
                Login
              </Button>
              <p className="flex justify-center text-gray-400 ">Or</p>
              <Button
                onClick={handleGoogleSingIn}
                variant="bordered"
                className="w-full rounded-2xl border border-gray-300 shadow "
              >
                <FcGoogle className="text-2xl" />
                Continue with Google
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-400 ">
            Don&apos;t have an account? 
            <Link
              href="/register"
              className="text-[#00FF9D] font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </Card>
      </Card>
    </div>
  );
}
