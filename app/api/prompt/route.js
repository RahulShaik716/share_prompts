import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();
    let prompts = await Prompt.find({}).populate("creator");
    // Set headers to avoid caching
    const headers = new Headers({
      "Content-Type": "application/json",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      "Surrogate-Control": "no-store",
    });

    return new Response(JSON.stringify(prompts), { status: 200, headers });
  } catch (error) {
    return new Response("unable to get all the prompts", { status: 500 });
  }
};
