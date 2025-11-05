"use server";

import { db } from "@/db/drizzle";
import { events } from "@/db/schema";



export async function getEvents() {
return await db.select().from(events);
}