"use client";

import {  Menu,Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import{Button} from "./ui/button";
import { ModeToggle } from "./mode-toggle";

import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { useProModal } from "@/hooks/use-pro-modal";


const font = Poppins({
    weight:"600",
    subsets:["latin"]
});

interface NavbarPro {
    isPro: boolean;
  };

export const Navbar = ({ isPro }: NavbarPro) => {
    const proModal = useProModal();



    return (
        <div className="fixed w-full z-50 flex justify-between items-center py-2
         px-4 border-b border-primary/10 bg-secondary h-16">
            <div className="flex items-center">
                <MobileSidebar/>
                <Link href="/">
                   <h1 className={cn(
                        "hidden md:block text-xl md:text-3xl font-bold text-primary",
                        font.className
                    )}>
                        companion.ai
                    </h1> 
                </Link>
            </div>

            
            <div className="flex items-center gap-x-3">
                <Button onClick= {proModal.onOpen} variant="premium" size="sm">
                    Upgrade
                    <Sparkles className="h-4 w-4 fill-white text-white ml-2"/>
                </Button>
                <ModeToggle />
                <UserButton afterSignOutUrl="/sign-in" />

            </div>
        </div>
    );
};