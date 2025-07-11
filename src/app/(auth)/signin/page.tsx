"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignInData } from "../../../schematype";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { login } from "../../../action/auth";
import { toast } from "sonner";
import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import {zodResolver} from '@hookform/resolvers/zod'
import { redirect } from "next/navigation";



const Page = () => {

  const form = useForm<z.infer<typeof SignInData>>({
    resolver : zodResolver(SignInData),
   defaultValues : {
    email: "",
    password: "",}
  })

  const [link , setLink ] = useState(false) 
  const [isPending , startTransition] = useTransition()


  const onSubmit = async(data :z.infer<typeof SignInData> )=>{

    startTransition(async()=>{

      const res = await login(data)
      if(res.error) {

        if(res.msg == "verification"){
            setLink(true)
        }else{

            toast.error("Error" , {
            description : res.msg as string
          } )
        }
        
      }else{
         redirect('/dashboard')
      }
        
  
       
    })


  }

  useEffect(()=>{
    if(link){
      setTimeout(() => {
        setLink(false)
      }, 5000);
    }
  },[link])


  
  return (
    <div className="min-h-screen w-full custom-bg flex items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-8 md:gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-0">
        {/* Text Section */}
        <div className="order-2 sm:mt-4 md:mt-4 w-full flex items-center justify-center lg:order-1 lg:w-1/2 lg:justify-start lg:mt-0">
          <h1 className="text-5xl text-center font-bold text-amber-900 dark:text-amber-100 lg:text-left">
            AI Resume Builder
          </h1>
        </div>
        {/* Form Section */}
        <div className="p-[1.5rem] w-full max-w-[600px] bg-gray-50 rounded-md backdrop-blur-sm lg:order-2 ">

        <Form {...form}>
           <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <h1 className="text-5xl font-bold text-accent text-center">Registration</h1>
           
            <FormField
            control={form.control}
            name = "email"
            render={({field,fieldState})=>(
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div><Input {...field}/>
                  {fieldState.error && (
        <span className="text-red-500 text-sm">{fieldState.error.message}</span>
      )}</div>
                  </FormControl>   
              </FormItem>        

            )}>
            </FormField>

            <FormField
            control={form.control}
            name = "password"
            render={({field , fieldState})=>(
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  
                  <div><Input {...field}/>
                  {fieldState.error && (
        <span className="text-red-500 text-sm">{fieldState.error.message}</span>
      )}</div>
                  </FormControl>   
              </FormItem>        

            )}>
            </FormField>
            <button  className="btn w-full mt-6" disabled={isPending}>{isPending ? "Signing In..." : "Sign In"}</button>
           </form>
        </Form>

        <span className="block w-full text-center my-3 text-accent font-semibold">or</span>
        <div className="w-full flex justify-center">
             <button className="rounded-full px-3 py-2 border-2 border-amber-600 text-sm font-semibold cursor-pointer hover:scale-[1.03] transition-all hover:accent-bg"onClick={async()=>{
               window.location.href = '/api/auth/google';
             }}> Login in with Google</button>
        </div>
        
        {
          link && 
       <div className=" w-full text-center mt-3 font-semibold">
        This email hasnt been verified yet. A verification link has been sent to your email. Please check your  <Link href="https://gmail.com" target="_blank" rel="noopener noreferrer" className="underline text-red-500">Gmail</Link>
       </div>
        }

        </div>

      </div>
    </div>
  );
};

export default Page;