import { createAuthClient } from "better-auth/react"
import { config } from 'dotenv';

config({ path: '.env' });

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL:process.env.DATABASE_URL,
})