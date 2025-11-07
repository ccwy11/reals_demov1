import { db } from "@/db/drizzle";
import { connections, events, wishlists } from "@/db/schema";
import { getCurrentUser } from "@/server/users";
import { eq, and } from "drizzle-orm";


export async function GET(
    _req: Request,
        { params }: { params: { id: string } }
    ) {
        const user = await getCurrentUser();
        if(!user || user.id !== params.id) {
            return new Response('Unauthorized', { status: 401 });
        }

        const targetId = params.id;
        const [conn] = await db
            .select()
            .from(connections)
            .where(
                and(
                    eq(connections.userId, user.id),
                    eq(connections.connectedUserId, targetId),
                    eq(connections.status, 'accepted')
                )
            )
            .limit(1);
        
        
        if(!conn) {
            return new Response('No connection found', { status: 404 });
        }

        const wishlist = await db
        .select({ event: events })
            .from(wishlists)
            .innerJoin(events, eq(wishlists.eventId, events.id))
            .where(eq(wishlists.userId, targetId))
         

    return Response.json(wishlist.map((w) => w.event));
    }