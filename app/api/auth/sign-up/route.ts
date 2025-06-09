import { PrismaClient } from "@/app/generated/prisma";
import ResponseHandler from "@/utils/response";
import { hash } from "bcryptjs";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        // for beter exprience, we can use the email verification, send the OTP to the email, and then verify it
        const formData = await request.formData();
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Validate input
        if (!username || !email || !password) {
            return ResponseHandler.error(400, "All fields (username, email, password) are required.");
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return ResponseHandler.error(400, "Invalid email format.");
        }
        if (password.length < 8) {
            return ResponseHandler.error(400, "Password must be at least 8 characters.");
        }

        // Check if user exists (by email or username)
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });
        if (existingUser) {
            return ResponseHandler.error(400, "User already exists with this email or username.");
        }

        // Hash password
        const hashedPassword = await hash(password, 10);

        // Create user
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                updated_at: new Date(),
            }
        });

        if (!newUser) {
            return ResponseHandler.error(500, "Failed to create user.");
        }

        return ResponseHandler.success(201, "User created successfully.", {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
        });
    } catch (error) {
        // Optionally log error to server logs here
        return ResponseHandler.error(500, "Internal Server Error. Failed to sign up.", error = error);
    }
}