import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/databse";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDB()

        let prompts = await Prompt.find({}).populate('creator')
        prompts = prompts.map(prompt => {
            prompt.creator.email = prompt.creator.email.replace(/(?<=.{3}).(?=[^@]*?.@)/g, "X")
            return prompt
        })
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new NextResponse("Failed to fetch all prompts", { status: 500 })
    }
} 