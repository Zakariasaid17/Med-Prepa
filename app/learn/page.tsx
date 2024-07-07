'use client'

import Hero from "@/components/Hero";
import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import { ClerkLoaded } from "@clerk/nextjs";
import Link from "next/link";
import { Router } from "next/router";


export default function  Learn(){
  return (
    
        
        <ClerkLoaded>
           <SignedIn>
               <div>
                   <Hero/>
               </div>
           </SignedIn>

           <SignedOut>
           <button className="w-full" >
                        <Link href='/'>
                           SignUp
                        </Link>
                   </button>
           </SignedOut>

        </ClerkLoaded>
        
        
        
  )
}
