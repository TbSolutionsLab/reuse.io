import jwt, { type SignOptions, type VerifyOptions } from "jsonwebtoken";
import { config } from "../../config/app.config";

// Updated type definitions for Prisma's string IDs instead of MongoDB ObjectId
export type AccessTPayload = {
  userId: string;
  sessionId: string;
};

export type RefreshTPayload = {
  sessionId: string;
};

type SignOptsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ["user"],
};

export const accessTokenSignOptions: SignOptsAndSecret = {
  expiresIn: Number(config.JWT.EXPIRES_IN),
  secret: config.JWT.SECRET,
};

export const refreshTokenSignOptions: SignOptsAndSecret = {
  expiresIn: Number(config.JWT.REFRESH_EXPIRES_IN),
  secret: config.JWT.REFRESH_SECRET,
};

export const signJwtToken = (
  payload: AccessTPayload | RefreshTPayload,
  options?: SignOptsAndSecret,
) => {
  const { secret, ...opts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, {
    ...defaults,
    ...opts,
  });
};

export const verifyJwtToken = <TPayload extends object = AccessTPayload>(
  token: string,
  options?: VerifyOptions & { secret: string },
) => {
  try {
    const { secret = config.JWT.SECRET, ...opts } = options || {};
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...opts,
    }) as TPayload;
    return { payload };
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (err: any) {
    return {
      error: err.message,
    };
  }
};
