

import { eq, and } from 'drizzle-orm';
import { getCurrentUser } from '@/server/users';
import { db } from '@/db/drizzle';
import { connections, user } from '@/db/schema';

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return new Response('Unauthorized', { status: 401 });

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

  return Response.json(mutual);
}