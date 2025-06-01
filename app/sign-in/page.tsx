"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "@/components/GoogleIcon";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

// Validation schema
const loginSchema = z.object({
    email: z.string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    password: z.string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface FormErrors {
    email?: string;
    password?: string;
}

function Page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (formErrors[name as keyof FormErrors]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = () => {
        try {
            loginSchema.parse(formData);
            setFormErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors: FormErrors = {};
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        errors[err.path[0] as keyof FormErrors] = err.message;
                    }
                });
                setFormErrors(errors);
                // Show the first error as a toast
                toast.error(error.errors[0].message);
            }
            return false;
        }
    };

    const handleLoginIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const res = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (res?.error) {
                console.error("Login error:", res.error);
                toast.error(res.error === "CredentialsSignin"
                    ? "Invalid email or password"
                    : "Invalid credentials ❌");
            } else {
                toast.success("Login successful 👍");
                router.push("/");
                router.refresh();
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong. Please try again 🚨");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setIsGoogleLoading(true);
            await signIn("google", { callbackUrl: "/" });
        } catch (error) {
            console.error("Google sign-in error:", error);
            toast.error("Failed to sign in with Google");
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account
                    </CardDescription>
                    <Button variant="link" asChild className="px-0">
                        <Link href="/sign-up">
                            Don't have an account? Sign up
                        </Link>
                    </Button>
                </CardHeader>
                <form onSubmit={handleLoginIn} className="space-y-4">
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                disabled={isLoading}
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full ${formErrors.email ? "border-red-500" : ""}`}
                                autoComplete="email"
                                autoFocus
                            />
                            {formErrors.email && (
                                <p className="text-sm text-red-500">{formErrors.email}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Button
                                    variant="link"
                                    className="text-sm px-0"
                                    asChild
                                >
                                    <Link href="/forgot-password">
                                        Forgot password?
                                    </Link>
                                </Button>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    disabled={isLoading}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full pr-10 ${formErrors.password ? "border-red-500" : ""}`}
                                    autoComplete="current-password"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </Button>
                            </div>
                            {formErrors.password && (
                                <p className="text-sm text-red-500">{formErrors.password}</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col space-y-2">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading || isGoogleLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                        <div className="relative w-full">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading || isGoogleLoading}
                        >
                            {isGoogleLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Icons.google className="mr-2 h-4 w-4" />
                            )}
                            Google
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}

export default Page;