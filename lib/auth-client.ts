import { createAuthClient } from "better-auth/react";
import { config } from 'dotenv';

// config({ path: '.env' });

export const authClient = createAuthClient({
    baseURL:"http://localhost:3000",
    // process.env.DATABASE_URL,

    plugins: [
        // organizationClient(),
        // lastLoginMethodClient()
    ]
});