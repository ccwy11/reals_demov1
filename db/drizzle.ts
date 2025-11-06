// import { config } from "dotenv";
// import { drizzle } from 'drizzle-orm/neon-http';
// import { schema } from '../db/schema';

// config({ path: ".env" }); // or .env.local

// export const db = drizzle(process.env.DATABASE_URL!, { schema });


import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });