import {API, composeAPI, generateAddress} from "@iota/core";
import {sha256} from "js-sha256";
import {ITransaction, Transaction} from "../models/Transaction";

const iota: API = composeAPI({
    provider: "https://hanspetzersnode.org:14267",
});

export async function getNewTransactions(seed: string, addressIndex: number = 0) {
    await getNewTransactionsFromTangle(seed, addressIndex);
    const addr: string = generateAddress(seed, addressIndex);

    const newTxs =  await Transaction.find({address: addr, new: true})
        .then((txs: ITransaction[]) => {
            return txs;
        });

    await Transaction.init()
        .then(async () => {
            await newTxs.map(async (tx: ITransaction) => {
                tx.new = false;
                await tx.save()
                    .catch((err: any) => {
                        console.log(err);
                    });
            });
        });

    return newTxs;
}

export async function getNewTransactionsFromTangle(seed: string, addressIndex: number = 0) {
    const address: string = generateAddress(seed, addressIndex);
    const transactions: any = await iota.findTransactions({addresses: [address]});
    return await storeTransactions(transactions, seed, address);
}

async function storeTransactions(transactions: string[], seed: string, addr: string) {
    const transactionObjects: ITransaction[] = [];
    const seedHash: string = sha256(seed);
    transactions.map((transaction: string) => {
        // insert transactions as "new" until frontend sets them to "not new"
        transactionObjects.push(new Transaction({hash: transaction, new: true, accountHash: seedHash, address: addr}));
    });

    // init to avoid double key insertions
    return await Transaction.init()
        .then(() => {
            return Transaction.insertMany(transactionObjects)
                .then((docs: any) => {
                    console.info(docs.length + " transactions stored");
                })
                .catch((err: any) => {
                    console.log("error inserting transactions: " + err);
                });
        });

}
