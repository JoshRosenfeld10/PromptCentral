import { Schema, model, models } from "mongoose";
import { UserType } from "./user";
import { ObjectId } from "mongodb";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.']
    }
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export type PromptType = {
    prompt: string;
    tag: string;
    creator?: UserType | null | undefined;
    _id?: ObjectId
}

export default Prompt;