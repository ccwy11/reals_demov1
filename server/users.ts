"use server";

import { getAuthHandler } from "@/lib/auth";   // <-- the factory we created
import { redirect } from "next/navigation";
import { cache } from "react";
import { headers } from "next/headers";


type AuthInstance = ReturnType<typeof getAuthHandler>;

/**
 * Helper – creates a fresh auth instance for each server action.
 * (You could also cache it globally if you want to reuse the DB pool)
 */
const getAuth = (): AuthInstance => getAuthHandler();


const auth = getAuthHandler();
/**
 * Get current user + session in one call.
 * Cached per-request (React cache) → safe for multiple calls.
 */
export const getCurrentUser = cache(async () => {
  try {
    const result = await auth.api.getSession({
      headers: await headers(), // Next.js headers
    });

    if (!result) return null;

    const { user, session } = result;

    if (!user || !session) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      // Add custom fields later
    };
  } catch {
    return null;
  }

});

/**
 * Require auth – redirect if not logged in
 */
export const requireUser = async (redirectTo = "/login") => {
  const user = await getCurrentUser();
  if (!user) redirect(redirectTo);
  return user;
};




export const signIn = async (email: string, password: string) => {

    const auth = getAuth();
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        })
        return {
            success: true,
            message: "Signed in successfully"
        }

    } catch (error) {
        const e = error as Error
        return {
            success: false,
            message: e.message || "Something went wrong"
        }
    }

}
export const signUp = async (email: string, password: string, username: string) => {
      const auth = getAuth();
    try {
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: username,
            }
        })
        return {
            success: true,
            message: "Signed up successfully"
        }

    }
    catch (error) {
        const e = error as Error
        return {
            success: false,
            message: e.message || "Something went wrong"
        }
    }


}

