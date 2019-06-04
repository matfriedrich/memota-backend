import express = require("express");
import {initializeAccount} from "../controllers/accountController";

const router = express.Router();

const testSeed: string = process.env.SEED || "TESTSEED9THIS9WILL9WORK9BUT9WONT9CONTAIN9ANYTHING";

router.get("/", async (req, res) => {
    const accountInfo = await initializeAccount(testSeed);

    res.json(accountInfo);
});

export default router;
