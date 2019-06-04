import express = require("express");
import {getNewTransactions} from "../controllers/transactionController";

const router = express.Router();

const testSeed: string = process.env.SEED || "TESTSEED9THIS9WILL9WORK9BUT9WONT9CONTAIN9ANYTHING";

router.get("/", async (req, res) => {
    const transactions = await getNewTransactions(testSeed);
    res.json(transactions);
});

export default router;
