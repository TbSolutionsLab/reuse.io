/**
 * Initializes and exports a singleton instance of the PrismaClient for database access.
 *
 * - Imports the generated Prisma client.
 * - Creates a new PrismaClient instance.
 * - In non-production environments, attaches the Prisma client to the global object to prevent
 *   multiple instances during hot-reloading (useful in development).
 * - Exports the Prisma client instance for use throughout the application.
 *
 * @module database/client
 */
import { PrismaClient } from "../generated/client";

const prisma = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: typeof prisma };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
