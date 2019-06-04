import {API, composeAPI} from "@iota/core";
import {Address} from "@iota/pad/typings/types";
import {sha256} from "js-sha256";
import {Account, IAccount} from "../models/Account";

const iota: API = composeAPI({
    provider: "https://hanspetzersnode.org:14267",
});

let allAddresses: [Address];
let currentAddress: Address;

//
export function initializeAccount(seed: string, addressIndex: number = 0) {
    const account: IAccount = new Account({seedHash: sha256(seed)});

    return iota.getAccountData(seed, {
        start: 0,
        end: addressIndex,
        security: 2,
    })
        .then((accountData: any) => {
            const {addresses, latestAddress} = accountData;
            allAddresses = addresses;
            currentAddress = latestAddress;
            console.log("balance:" + accountData.balance);
            console.log("current address:" + currentAddress);
            account.lastAddressIndex = allAddresses.length;
            // storeTransactions(transactions, seed);
            return accountData;

        })
        .catch((err: any) => {
            console.log(err);
            return("error:" + err);
        });
}

// function storeTransactions(transactions: string[], seed: string) {
//     const transactionObjects: ITransaction[] = [];
//     const seedHash: string = sha256(seed);
//     transactions.map((transaction: string, index: number) => {
//         // insert transactions as "new" until frontend sets them to "not new"
//         transactionObjects.push(new Transaction({hash: transaction, new: true, accountHash: seedHash}));
//     });
//
//     // Transaction.insertMany(transactionObjects)
//     //     .then((docs: any) => {
//     //         console.info(docs.length + " transactions stored");
//     //     })
//     //     .catch((err: any) => {
//     //         console.log("error inserting transactions: " + err);
//     //     });
// }
