import { getCurrentUser } from '@/server/users';
import { createConnectionRequest } from '@/server/connections';

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return new Response('Unauthorized', { status: 401 });

  const body = await req.json();
  try {
    await createConnectionRequest(user, body.email);
    return new Response('Request sent', { status: 200 });
  } catch (error) {
    const e = error as Error;
    return new Response(e.message, { status: 400 });
  }
}


// import { db } from "@/db/drizzle";
// import { connections, createConnectionSchema, user } from "@/db/schema";
// import { and, eq } from "drizzle-orm";
// import { getAuthHandler } from "@/lib/auth";   // <-- the factory we created
// import { getCurrentUser } from "@/server/users";


// type AuthInstance = ReturnType<typeof getAuthHandler>;
// const getAuth = (): AuthInstance => getAuthHandler();


// export async function POST(req: Request) {
//     const currentUser = await getCurrentUser();
//     if (!currentUser) {
//         return new Response('Unauthorized', { status: 401 });
//     }

//     let body;
//     try {
//         body = await req.json();
//     } catch {
//         return new Response('Invalid JSON', { status: 400 });
//     }

//     // Validate input
//     let parsed;
//     try {
//         parsed = createConnectionSchema.parse(body);
//     } catch (err) {
//         return new Response('Invalid input: ' + (err as Error).message, { status: 400 });
//     }

//     const { email } = parsed;

//     try {
//         // Find the user to connect with
//         const targetUsers = await db
//             .select()
//             .from(user)
//             .where(eq(user.email, email))
//             .limit(1);
    
//         const targetUser = targetUsers[0];
//         if (!targetUser) {
//             return new Response('User not found', { status: 404 });
//         }

//         if (targetUser.id === currentUser.id) {
//             return new Response('Cannot connect with yourself', { status: 400 });
//         }

//         const existing = await db
//             .select()
//             .from(connections)
//             .where(
//                 and(
//                     eq(connections.userId, currentUser.id),
//                     eq(connections.connectedUserId, targetUser.id)
//                 )
//             )
//             .limit(1);
        
//         if (existing.length > 0) {
//             return new Response('Connection request already sent', { status: 400 });
//         }
//         const reverse = await db
//             .select()
//             .from(connections)
//             .where(
//                 and(
//                     eq(connections.userId, targetUser.id),
//                     eq(connections.connectedUserId, currentUser.id)
//                 )
//             )
//             .limit(1);
        
//         if (reverse.length > 0) {
//             return new Response('User has already sent you a connection request', { status: 400 });
//         }

//         // Create connection request
//         await db.insert(connections).values({
//             userId: currentUser.id,
//             connectedUserId: targetUser.id,
//             status: 'pending',
//         });
        
//         return new Response('Connection request sent', {
//             status: 200,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     } catch (err) {
//         console.error('Error creating connection request:', err);
//         return new Response('Internal Server Error', { status: 500
//         });

//     }
// }