import { Router } from "express";
import account from "./account";
import transaction from "./transaction";
const router = Router();

// we will add routes to this default router in future
router.use("/account", account);
router.use("/transaction", transaction);
export default router;
