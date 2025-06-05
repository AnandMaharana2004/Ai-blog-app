"use client";

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
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
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Icons } from "@/components/GoogleIcon"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"

// Validation schema
const signUpSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be less than 20 characters")
        .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores and dashes"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

interface SignUpFormData {
    username: string;
    email: string;
    password: string;
}

function toFormData(data: SignUpFormData): FormData {
    const fd = new FormData();
    fd.append("username", data.username);
    fd.append("email", data.email);
    fd.append("password", data.password);
    return fd;
}

function Page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<SignUpFormData>({
        username: "",
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState<Partial<SignUpFormData>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (formErrors[name as keyof SignUpFormData]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = () => {
        try {
            signUpSchema.parse(formData);
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors: Partial<SignUpFormData> = {};
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        errors[err.path[0] as keyof SignUpFormData] = err.message;
                    }
                });
                setFormErrors(errors);
                // Show the first error as a toast
                toast.error(error.errors[0].message);
            }
            return false;
        }
    };

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // build FormData object
            const realFormData = toFormData(formData);

            const response = await fetch("/api/auth/sign-up", {
                method: "POST",
                body: realFormData,
                // DO NOT set Content-Type header, browser will set it automatically
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Failed to sign up. Please try again.");
                return;
            }

            toast.success("Account created successfully! 🎉");
            router.push("/sign-in");

        } catch (error) {
            console.error("Error during sign up:", error);
            toast.error("An error occurred while signing up. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const PasswordRequirements = () => (
        <div className="text-sm text-muted-foreground mt-2">
            <p>Password must contain:</p>
            <ul className="list-disc list-inside space-y-1 mt-1">
                <li className={formData.password.length >= 8 ? "text-green-500" : ""}>
                    At least 8 characters
                </li>
                <li className={/[A-Z]/.test(formData.password) ? "text-green-500" : ""}>
                    One uppercase letter
                </li>
                <li className={/[a-z]/.test(formData.password) ? "text-green-500" : ""}>
                    One lowercase letter
                </li>
                <li className={/[0-9]/.test(formData.password) ? "text-green-500" : ""}>
                    One number
                </li>
                <li className={/[^A-Za-z0-9]/.test(formData.password) ? "text-green-500" : ""}>
                    One special character
                </li>
            </ul>
        </div>
    );

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>
                        Enter your details below to create your account
                    </CardDescription>
                    <Button variant="link" asChild className="px-0">
                        <Link href="/sign-in">
                            Already have an account? Sign in
                        </Link>
                    </Button>
                </CardHeader>
                <form onSubmit={handleSignUp}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="johndoe"
                                required
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                disabled={isLoading}
                                className={formErrors.username ? "border-red-500" : ""}
                                autoComplete="username"
                                autoFocus
                            />
                            {formErrors.username && (
                                <p className="text-sm text-red-500">{formErrors.username}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={isLoading}
                                className={formErrors.email ? "border-red-500" : ""}
                                autoComplete="email"
                            />
                            {formErrors.email && (
                                <p className="text-sm text-red-500">{formErrors.email}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    className={formErrors.password ? "border-red-500 pr-10" : "pr-10"}
                                    autoComplete="new-password"
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
                            <PasswordRequirements />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default Page;