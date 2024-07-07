"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { MdLocalHospital, MdQuiz } from "react-icons/md";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="pt-5 w-full">
      <div className="max-w-[1500px] mx-auto w-[90%] flex justify-between items-center border-b pb-5">
        <div>
          <Link
            href={"/"}
            className="flex gap-1 items-center text-2xl"
          >
            <h1 className="text-dark font-bold">
              Med Prepa
            </h1>
            <MdLocalHospital className="text-primary" />
          </Link>
        </div>

        

        <div className="flex items-center gap-3 justify-end">
          
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
