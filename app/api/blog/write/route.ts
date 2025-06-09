import { PrismaClient } from "@/app/generated/prisma";
import ResponseHandler from "@/utils/response";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {

    } catch (error) {
        // Optionally log error to server logs here
        return ResponseHandler.error(500, "Internal Server Error. Failed to create Blog Artcle.", error = error);
    }
}