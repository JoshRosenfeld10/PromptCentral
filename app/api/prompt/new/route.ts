import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { CreatePromptData } from "@app/create-prompt/page";

export const POST = async (req: Request) => {
    const { userId, prompt, tag } = await (req.json() as Promise<CreatePromptData>);

    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {
            status: 201
        })
    } catch (error) {
        return new Response("Failed to create a new prompt", {
            status: 500
        })
    }
}