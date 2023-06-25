import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/databse";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new NextResponse("Failed to fetch all prompts", { status: 500 })
    }
} 