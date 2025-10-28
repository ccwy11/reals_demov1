import {
    pgTable,
    text,
    timestamp,
    boolean,
    integer,
    serial,
    jsonb
} from "drizzle-orm/pg-core";
import { z } from "zod"
//z.object data validation because it is write

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified")
        .$defaultFn(() => false)
        .notNull(),
    image: text("image"),
    createdAt: timestamp("created_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    savedWishlist: jsonb('saved_wishlist').$type<number[]>().default([]),
    
});

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").$defaultFn(
        () => /* @__PURE__ */ new Date(),
    ),
    updatedAt: timestamp("updated_at").$defaultFn(
        () => /* @__PURE__ */ new Date(),
    ),
});





export const QuestionnaireStateSchema = z.object({
    date: z.date().optional(),
    dateType: z.array(z.string()),
    startTime: z.string(),
    endTime: z.string(),
    food: z.array(z.string()),
    transportation: z.string(),
    budget: z.array(z.number()),
    intensity: z.array(z.number()),
    location: z.array(z.string()),
});


//later delete after build
export const planSchema = z.object({
    date: z.date(),
    dateType: z.array(z.string()),
    startTime: z.string(),
    endTime: z.string(),
    food: z.array(z.string()),
    transportation: z.string(),
    budget: z.array(z.number()),
    intensity: z.array(z.number()),
    location: z.array(z.string()),
});


//develop schema for events and listing 
// === TABLES ===
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  price: text('price'),
  description: text('description'),
  photo: text('photo').notNull(),
  isEvent: boolean('is_event').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});


// === ZOD SCHEMAS ===
export const EventSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.string().nullable(),
  description: z.string().nullable(),
  photo: z.string(),
  isEvent: z.boolean(),
  createdAt: z.string().datetime(),
});

export const SaveWishlistSchema = z.object({
  userId: z.string(),
  itemId: z.number(),
});

export const ItinerarySchema = z.object({
  id: z.string(),
  name: z.string(),
  items: z.array(z.number()),
  createdAt: z.string().datetime(),
});

export type Event = z.infer<typeof EventSchema>;
export type Itinerary = z.infer<typeof ItinerarySchema>;

export const schema = {
    user,
    session,
    account,
    verification,
};
//later import again from form page
//later import again from form page

