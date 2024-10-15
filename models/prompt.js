import mongoose, { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is requried."],
  },
  tag: {
    type: String,
    required: [true, "Tag is requried."],
  },
});
const Prompt = models.Prompt || model("Prompt", promptSchema);
export default Prompt;
