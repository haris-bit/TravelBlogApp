import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    // this will be a user type
    type: Schema.Types.ObjectId,
    // 1-M relationship (since one user can create many prompts)
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
