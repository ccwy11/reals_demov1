"use server";

import { db } from "@/db/drizzle";
import { eventIdSchema, events, wishlists } from "@/db/schema";

import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import z from "zod";
import { getAuthHandler } from "@/lib/auth";   // <-- the factory we created


type AuthInstance = ReturnType<typeof getAuthHandler>;
const getAuth = (): AuthInstance => getAuthHandler();

export async function getUserWishlist() {
  const auth = getAuth();
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {success:false, message:'You must be signed in to view your wishlist.'};
    }

    const userId = session.user.id;

    const wishlist = await db
      .select({
        id: events.id,
        title: events.title,
        description: events.description,
       
      })
      .from(wishlists)
      .innerJoin(events, eq(wishlists.eventId, events.id))
      .where(eq(wishlists.userId, userId))
      .execute();

    return { success: true, data: wishlist };
  } catch (err) {
    console.error('getUserWishlist error:', err);
      return {success:false, message:'Failed to load wishlist. Please try again.'}
     
  }
}

export async function addToWishlist(formData: FormData) {
    const auth = getAuth();
    try {
        // 1. Validate input
        const raw = Object.fromEntries(formData.entries());
        const { eventId } = eventIdSchema.parse(raw);

        // 2. Get session (Better-Auth official way)
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user?.id) {
            return { success: false, message: 'ou must be signed in to wishlist an event.' }

        }

        const userId = session.user.id;

        // 3. Check for duplicate
        const existing = await db
            .select()
            .from(wishlists)
            .where(and(eq(wishlists.userId, userId), eq(wishlists.eventId, eventId)))
            .execute();

        if (existing.length > 0) {
            return { success: false, message: 'This event is already in your wishlist.' };
        }

        // 4. Insert
        await db.insert(wishlists).values({ userId, eventId });

        return { success: true, message: 'Added to wishlist!' };
    } catch (err) {
        if (err instanceof z.ZodError) {
            console.error('addToWishlist validation error:', err);
            return { success: false, message: 'Invalid event ID.' };
        }
        console.error('addToWishlist error:', err);
        return { success: false, message: 'Failed to add to wishlist. Please try again.' };
    }
}
export async function removeFromWishlist(formData: FormData) {
    const auth = getAuth();
    try {
        // 1. Validate input
        const raw = Object.fromEntries(formData.entries());
        const { eventId } = eventIdSchema.parse(raw);

        // 2. Get session (Better-Auth official way)
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user?.id) {
            return { success: false, message: 'You must be signed in to modify your wishlist.' }
        }

        const userId = session.user.id;

        // 3. Delete
        const deleted = await db
            .delete(wishlists)
            .where(and(eq(wishlists.userId, userId), eq(wishlists.eventId, eventId)))
            .returning()
            .execute();

        if (deleted.length === 0) {
            return { success: false, message: 'This event was not found in your wishlist.' };
        }

        return { success: true, message: 'Removed from wishlist.' };
    } catch (err) {
        if (err instanceof z.ZodError) {
            console.error('removeFromWishlist validation error:', err);
            return { success: false, message: 'Invalid event ID.' };
        }
        console.error('removeFromWishlist error:', err);
        return { success: false, message: 'Failed to remove from wishlist. Please try again.' };
    }
}

export async function getWishlistIds(): Promise<string[]> {
    const auth = getAuth();
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) return [];

    const result = await db
      .select({ eventId: wishlists.eventId })
      .from(wishlists)
      .where(eq(wishlists.userId, session.user.id));

    return result.map((row) => String(row.eventId));
  } catch (error) {
    console.error('getWishlistIds error:', error);
    return [];
  }
}