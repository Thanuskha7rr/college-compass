import { pgTable, text, serial, integer, real, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const collegesTable = pgTable("colleges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  state: text("state").notNull(),
  type: text("type").notNull(), // public | private | liberal-arts
  ranking: integer("ranking").notNull(),
  acceptanceRate: real("acceptance_rate").notNull(),
  tuition: integer("tuition").notNull(),
  enrollment: integer("enrollment").notNull(),
  founded: integer("founded").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  featured: boolean("featured").notNull().default(false),
  programs: jsonb("programs").notNull().$type<string[]>(),
  sat: jsonb("sat").notNull().$type<{ min: number; max: number }>(),
  act: jsonb("act").notNull().$type<{ min: number; max: number }>(),
  graduationRate: real("graduation_rate").notNull(),
  campusSize: text("campus_size").notNull(),
  setting: text("setting").notNull(), // urban | suburban | rural
  website: text("website"),
  color: text("color"),
});

export const favoritesTable = pgTable("favorites", {
  id: serial("id").primaryKey(),
  collegeId: integer("college_id").notNull().references(() => collegesTable.id),
  sessionId: text("session_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCollegeSchema = createInsertSchema(collegesTable).omit({ id: true });
export const insertFavoriteSchema = createInsertSchema(favoritesTable).omit({ id: true, createdAt: true });

export type InsertCollege = z.infer<typeof insertCollegeSchema>;
export type College = typeof collegesTable.$inferSelect;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;
export type Favorite = typeof favoritesTable.$inferSelect;
