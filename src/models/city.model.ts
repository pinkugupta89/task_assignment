import mongoose, { Document, Schema } from "mongoose";

export interface ILoginUser extends Document {
    username: string
    password: string;
}

const userSchema = new Schema<ILoginUser>(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model<ILoginUser>("User", userSchema);