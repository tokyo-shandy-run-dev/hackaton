import type { User } from "@prisma/client";
import type { DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

export type SessionUser = Pick<User, "name">;

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: SessionUser;
  }
}
