import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    await connectToDB();
    let prompts = await Prompt.find({ creator: id }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("unable to get all the prompts", { status: 500 });
  }
};
