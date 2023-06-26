import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/databse";
import { NextResponse } from "next/server";

export const GET = async (_: Request, { params }: { params: { id: string } }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new NextResponse("Prompt Not Found", { status: 404 });

        return new NextResponse(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new NextResponse("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new NextResponse("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new NextResponse("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async (_: Request, { params }: { params: { id: string } }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new NextResponse("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new NextResponse("Error deleting prompt", { status: 500 });
    }
};