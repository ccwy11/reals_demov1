// import { db } from "@/db/drizzle";
// import { acceptConnectionSchema, connections } from "@/db/schema";
// import { getCurrentUser } from "@/server/users";
// import { and, eq } from "drizzle-orm";

import { acceptConnection } from "@/server/connections";
import { getCurrentUser } from "@/server/users";



// export async function POST(req: Request) {
//     const currentUser = await getCurrentUser();
//     if (!currentUser) {
//         return new Response('Unauthorized', { status: 401 });
//     }

//     const body = await req.json();
//     const { connectionId } = acceptConnectionSchema.parse(body);
//     const connectionIdNum = Number(connectionId);
//     if (!Number.isInteger(connectionIdNum)) {
//         return new Response('Invalid connectionId', { status: 400 });
//     }
    
//     const [connection] = await db
//         .select()
//         .from(connections)
//         .where(
//             and(
//                 eq(connections.id, connectionIdNum),
//                 eq(connections.connectedUserId, currentUser.id),
//                 eq(connections.status, 'pending')
//             )
//         )
//         .limit(1)
    
//     if (!connection) {
//         return new Response('Connection request not found', { status: 404 });
//     }
// }

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return new Response('Unauthorized', { status: 401 });

  const body = await req.json();
  try {
    await acceptConnection(user, body.connectionId);
    return new Response('Connected!', { status: 200 });
  } catch (error) {
    const e = error as Error;
    return new Response(e.message, { status: 400 });
  }
}