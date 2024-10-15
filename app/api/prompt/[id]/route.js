import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, params) => {
  const { id } = params.params;
  try {
    await connectToDB();
    let prompt = await Prompt.findById(id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("unable to get  the prompt", { status: 500 });
  }
};

export const PATCH = async (req, params) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

export const DELETE = async (req, params) => {
  const { id } = params.params;
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(id);
    return new Response("Prompt Deleted Succcessfuuly", { status: 200 });
  } catch (error) {
    return new Response("Prompt not found", { status: 404 });
  }
};
