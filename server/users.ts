"use server";

import { getAuthHandler } from "@/lib/auth";   // <-- the factory we created


type AuthInstance = ReturnType<typeof getAuthHandler>;

/**
 * Helper – creates a fresh auth instance for each server action.
 * (You could also cache it globally if you want to reuse the DB pool)
 */
const getAuth = (): AuthInstance => getAuthHandler();




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