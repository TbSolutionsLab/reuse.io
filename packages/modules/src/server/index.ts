import { initTRPC, TRPCError } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import { ZodError } from "zod";

// Context interface - extend as needed
export interface Context {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  req?: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  res?: any;
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

// Create context function for Next.js
export async function createContext(
  opts: CreateNextContextOptions,
): Promise<Context> {
  const { req, res } = opts;

  // Extract user from token/session - implement your auth logic here
  const user = await getUserFromRequest(req);

  return {
    req,
    res,
    user: user ?? undefined,
  };
}

// Mock function - replace with your actual auth logic
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function getUserFromRequest(req: any) {
  // Example: Extract from Authorization header
  const token = req?.headers?.authorization?.replace("Bearer ", "");

  if (!token) {
    return undefined;
  }

  // Implement your JWT verification or session validation here
  // This is just a placeholder
  try {
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // return decoded as User;
    return null;
  } catch {
    return null;
  }
}

// Initialize tRPC
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

// Protected procedure that requires authentication
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

// Admin procedure that requires admin role
export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Admin access required",
    });
  }

  return next({
    ctx,
  });
});

// Service health check procedure
export const healthProcedure = publicProcedure.query(async () => {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
});

// Export the tRPC instance for advanced usage
export { t };
