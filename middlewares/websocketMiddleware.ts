import * as WebSocket from "ws";
import {getNewTransactions} from "../controllers/transactionController";

const seed: string = process.env.SEED || "TESTSEED9THIS9WILL9WORK9BUT9WONT9CONTAIN9ANYTHING";

export function startWebsocket() {
    // initialize the WebSocket server instance
    const wss = new WebSocket.Server({port: 3001});

    wss.on("connection", (ws: WebSocket) => {

        // connection is up, let's add a simple simple event
        ws.on("message", (message: string) => {

            // log the received message and send it back to the client
            console.log("received: %s", message);
            ws.send(`Hello, you sent -> ${message}`);
        });

        setInterval(async () => {
            const newTransactions = await getNewTransactions(seed);
            if (newTransactions && newTransactions.length) {
                wss.clients.forEach(async (client) => {
                    console.log("yeah");
                    client.send(JSON.stringify(newTransactions));
                });
            }

        }, 10000);
    });
}
