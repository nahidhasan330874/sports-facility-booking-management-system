"use client";

import Link from "next/link";

import {
  Button,
  Card,
  CardHeader,
  Description,
  FieldError,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  const onSubmit =  async(e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
   
    
    const {data, error} = await authClient.signUp.email(
        {
            email:user.email,
            password : user.password,
            name :user.name,
            image : user.photo

 

        }
    )
    
    if(data){
        redirect('/')
    }
    if(error){
        toast.error('Failed in your Register')
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <Card className="w-full max-w-md  bg-gray-700   border border-gray-800 rounded-3xl shadow-2xl">
        <CardHeader className="flex flex-col gap-2 pt-8">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>

          <p className="text-sm text-gray-400">Register your new account</p>
        </CardHeader>

        <Card className="pb-8">
          <form onSubmit={onSubmit} className="space-y-5">
            <TextField
              name="name"
              type="text"
              label="Name"
              placeholder="Enter your name"
              variant="bordered"
              isRequired
              className={{
                inputWrapper:
                  "bg-[#1F2937] border-gray-700 hover:border-[#00FF9D] focus-within:border-[#00FF9D]",
              }}
            >
              
              <Label>Name</Label>
              <Input placeholder="Your Name"/>
              <FieldError />
            </TextField>

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
              name="photo"
              type="url"
              label="Photo URL"
              placeholder="https://example.com/photo.jpg"
              variant="bordered"
              isRequired
              className={{
                inputWrapper:
                  "bg-[#1F2937] border-gray-700 hover:border-[#00FF9D] focus-within:border-[#00FF9D]",
              }}
            >
              <Label>Photo URL</Label>
              <Input placeholder="https://example.com/photo.jpg" />
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
                Must be atleast 6 characters with 1 uppercase and 1 Lowercase
              </Description>
              <FieldError />
            </TextField>

            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full rounded-2xl bg-[#00FF9D] text-black font-bold"
              >
                Register
              </Button>
              <p className="flex justify-center text-gray-400 ">Or</p>
              <Button
                variant="bordered"
                className="w-full rounded-2xl border border-gray-300 shadow "
              >
                <FcGoogle className="text-2xl" />
                Continue with Google
              </Button>
            </div>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-400 mt-2">
            Already have an account?
            <Link
              href="/signin"
              className="text-[#00FF9D] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </Card>
      </Card>
    </div>
  );
}
