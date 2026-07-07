import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="container mx-auto flex h-16 items-center px-4">
                <Link href="/" className="flex items-center gap-2 text-xl text-primary">
                    <Briefcase />
                    Job Tracker
                </Link>
                <div className="ml-auto flex items-center gap-4">
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
                </div>
            </div>
        </nav>
    );
}
