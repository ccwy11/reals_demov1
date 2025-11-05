ALTER TABLE "events" RENAME COLUMN "photo" TO "image";--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "location" text NOT NULL;