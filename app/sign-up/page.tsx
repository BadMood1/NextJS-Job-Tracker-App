"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                        Create an account to start tracking your job applications
                    </CardDescription>
                </CardHeader>
                <form>
                    <CardContent className="flex flex-col gap-4 [&_Input]:focus:border-primary [&_Input]:focus:ring-1 [&_Input]:focus:ring-primary">
                        <div className="flex flex-col gap-1 text-gray-800">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" placeholder="John Doe" required />
                        </div>
                        <div className="flex flex-col gap-1 text-gray-800">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="john@example.com" required />
                        </div>
                        <div className="flex flex-col gap-1 text-gray-800">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" minLength={8} placeholder="" required />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" className="w-full cursor-pointer h-10">
                            Sign Up
                        </Button>
                        <p>
                            Already have an account?{" "}
                            <Link href="/sign-in" className="text-primary hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
