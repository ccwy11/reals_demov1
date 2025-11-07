import { db } from "@/db/drizzle";
import { connections, user } from "@/db/schema";
import { create } from "domain";

export async function createConnectionRequest(
    currentUser: CurrentUser,
    email: string,
) {
    const parsed = createConnectionSchema.parse({ email });
    const [target] = await db
        .select()
        .from(user)
        .where(eq(user.email, parsed.email))
        .limit(1);

    if (!target) {
        throw new Error('User not found');
    }

    if (target.id === currentUser.id) {
        throw new Error('Cannot connect with yourself');
    }

    const [existing] = await db
        .select()
        .from(connections)
        .where(
            and(
                eq(connections.userId, currentUser.id),
                eq(connections.connectedUserId, target.id)
            )
        )
        .limit(1);
    
    if (existing) {
        throw new Error('Connection request already sent');
    }
    const [conn] = await db
        .insert(connections)
        .values({
            userId: currentUser.id,
            connectedUserId: target.id,
            status: 'pending',
        })
        .returning();

    return conn;
}
export async function acceptConnectionRequest(
    currentUser: CurrentUser,
    connectionId: string,
) {
    const parsed = acceptConnectionSchema.parse({ connectionId });

    const [connection] = await db
        .select()
        .from(connections)
        .where(
            and(
                eq(connections.id, parsed.connectionId),
                eq(connections.connectedUserId, currentUser.id),
                eq(connections.status, 'pending')
            )
        )
        .limit(1);

    if (!connection) {
        throw new Error('Connection request not found');
    }
    await db
        .update(connections)
        .set({ status: 'accepted' })
        .where(eq(connections.id, connection.id));
    
    return conn;

}

export async function getMutualConnections(currentUser: CurrentUser) {
    const mutual = await db
        .select({
            id: connections.id,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        })
        .from(connections)
        .innerJoin(user, eq(user.id, connections.connectedUserId))
        .where(
            and(
                eq(connections.userId, currentUser.id),
                eq(connections.status, 'accepted')
            )
        );

    return mutual;
}

        