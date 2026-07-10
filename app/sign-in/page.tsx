"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth/auth-client";

type SignInInfo = {
    email: string;
    password: string;
};

export default function SignInPage() {
    const [formInfo, setFormInfo] = useState<SignInInfo>({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const result = await signIn.email(formInfo);

            if (result.error) {
                setError(result.error.message ?? "Failed to sign in");
            } else {
                router.push("/dashboard");
            }
        } catch {
            setError("An unexpected error occured");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Get access to your account </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="flex flex-col gap-4 [&_Input]:focus:border-primary [&_Input]:focus:ring-1 [&_Input]:focus:ring-primary">
                        {error && (
                            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}
                        <div className="flex flex-col gap-1 text-gray-800">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                value={formInfo.email}
                                type="email"
                                placeholder="john@example.com"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1 text-gray-800">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                value={formInfo.password}
                                type="password"
                                minLength={8}
                                placeholder=""
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button type="submit" className="w-full cursor-pointer h-10" disabled={loading}>
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                        <p>
                            Don&apos;t have an account?{" "}
                            <Link href="/sign-up" className="text-primary hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
