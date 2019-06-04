import { model, Schema} from "mongoose";

export const UserSchema = new Schema({
    name: String,
    tenant: String,
    username: {
        required: true,
        type: String,
        unique: true,
    },
});

export const User = model("User", UserSchema);
