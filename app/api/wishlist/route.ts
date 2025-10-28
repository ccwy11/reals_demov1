// import { NextRequest, NextResponse } from 'next/server';
// import { db } from '@/db/drizzle';
// import { users } from '@/db/schema';
// import { eq, inArray } from 'drizzle-orm';
// import { SaveWishlistSchema } from '@/db/schema';
// import { getSession } from 'better-auth';

// export async function POST(req: NextRequest) {
//   const session = await getSession();
//   if (!session.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

//   const body = await req.json();
//   const parsed = SaveWishlistSchema.safeParse({ ...body, userId: session.user.id });
//   if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });

//   const { userId, itemId } = parsed.data;

//   // Toggle logic
//   const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
//   const wishlist: number[] = user[0]?.savedWishlist || [];
//   const isSaved = wishlist.includes(itemId);
//   const newWishlist = isSaved ? wishlist.filter(id => id !== itemId) : [...wishlist, itemId];

//   await db.update(users).set({ savedWishlist: newWishlist }).where(eq(users.id, userId));

//   return NextResponse.json({ saved: !isSaved });
// }

