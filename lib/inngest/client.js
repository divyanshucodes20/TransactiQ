import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "transactIQ",
    name:"TransactIQ",
    retryFunction:async(attempt)=>({
        delay: 1000 * Math.pow(2, attempt),
        maxAttempts: 2
    })
 });
