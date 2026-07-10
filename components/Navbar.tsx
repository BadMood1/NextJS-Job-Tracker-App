"use client";
import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getSession } from "@/lib/auth/auth";
import { buttonVariants } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutBtn from "./sign-out-btn";
import { useSession } from "@/lib/auth/auth-client";

// Server Component can be async
export default function Navbar() {
    const { data: session } = useSession(); // Берём data в session

    console.log(session?.user);
    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="container mx-auto flex h-16 items-center px-4">
                <Link href="/" className="flex items-center gap-2 text-xl text-primary">
                    <Briefcase />
                    Job Tracker
                </Link>
                <div className="ml-auto flex items-center gap-4">
                    {session?.user ? (
                        <>
                            <Link href="/dashboard">
                                <Button variant="ghost" className="text-gray-700 hover:text-black">
                                    Dashboard
                                </Button>
                            </Link>
                            <DropdownMenu>
                                {/* Нельзя влаживать Button, поэтому копировал стили из него */}
                                <DropdownMenuTrigger
                                    className={buttonVariants({
                                        variant: "ghost",
                                        size: "icon",
                                        className: "rounded-full",
                                    })}
                                >
                                    <Avatar>
                                        <AvatarFallback className="bg-primary text-white">
                                            {session.user.name?.[0]?.toUpperCase() || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-full">
                                    <DropdownMenuGroup className="flex flex-col gap-2">
                                        <DropdownMenuLabel>
                                            <div>
                                                <p>{session.user.name}</p>
                                                <p>{session.user.email}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <SignOutBtn />
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link href="/sign-in" className="text-gray-700 hover:text-black">
                                <Button className="cursor-pointer" variant="outline">
                                    Log In
                                </Button>
                            </Link>
                            <Link
                                href="/sign-up"
                                className="bg-primary hover:bg-primary/90 rounded-lg hover:text-black"
                            >
                                <Button className="cursor-pointer">Start For Free</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
