// import { betterAuth } from "better-auth";
// import { drizzleAdapter } from "better-auth/adapters/drizzle";
// import { db } from "../db/drizzle"; // your drizzle instance
// import { nextCookies } from "better-auth/next-js";
// import { schema } from "../db/schema";

// export const auth = betterAuth({
//     emailAndPassword: {
//         enabled: true,
//     },
//     socialProviders: {
//         google: {
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//         },
//     },
//     database: drizzleAdapter(db, {
//         provider: "pg",
//         schema,// or "mysql", "sqlite"
//     }),

//     plugins: [nextCookies()]

// });


import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { schema } from "@/db/schema";

export const getAuthHandler = () => { 
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { db } = require("../db/drizzle"); // your drizzle instance
const authInstance = betterAuth({
    emailAndPassword: { enabled: true },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },
    database: drizzleAdapter(db, {
      provider: "pg",
      schema,
    }),
    plugins: [nextCookies()],
  });

  return authInstance;
};