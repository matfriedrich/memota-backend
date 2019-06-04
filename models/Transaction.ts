import {Document, model, Schema} from "mongoose";

const TransactionSchema = new Schema({
    hash: {
        type: String,
        required: true,
        unique: true,
    },
    accountHash: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    value: {
        type: Number,
        required: false,
    },
    confirmed: {
        type: Boolean,
        required: false,
    },
    new: {
        type: Boolean,
        required: false,
    },
});

export interface ITransaction extends Document {
    hash: string;
    accountHash: string;
    message: string;
    address: string;
    value: number;
    confirmed: boolean;
    required: boolean;
    new: boolean;
}

export const Transaction = model<ITransaction>("Transaction", TransactionSchema);
