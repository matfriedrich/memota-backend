import { Document, model, Schema} from "mongoose";

const AccountSchema = new Schema({
    seedHash: {
        type: String,
        required: true,
        unique: true,
    },
    lastAddressIndex: {
        default: 0,
        type: Number,
        required: true,
    },
});

export interface IAccount extends Document {
    seedHash: string;
    lastAddressIndex: number;
}
export const Account = model<IAccount>("Account", AccountSchema);
