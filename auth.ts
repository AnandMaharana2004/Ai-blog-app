import bcrypt from "bcryptjs"
import { PrismaClient } from "./app/generated/prisma"
import NextAuth, { CredentialsSignin } from "next-auth"
import credentialProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [

    credentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },
      authorize: async (credentials, req) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        console.log("Credentials:", email, password);
        if (!email || !password) {
          throw new Error("Missing credentials");
        }
        const user = await prisma.user.findUnique({
          where: { email }
        })
        if (!user) throw new Error("User not found || invalid credentials");
        const passwordMatch = await bcrypt.compare(password, user?.password || "");

        if (!passwordMatch) throw new Error("password not match || Invalid credentials");
        return {
          id: user.id,
          name: user.username,
          email: user.email,
        };
      }
    }),
    GoogleProvider({
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientId: process.env.GOOGLE_CLIENT_ID,
    }),

  ],
  pages : {
    signIn: "/sign-in",
  }
})