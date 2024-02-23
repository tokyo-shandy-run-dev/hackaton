import GoogleProvider from "next-auth/providers/google";

import type { Account, JWT, Session, User, DefaultSession, NextAuthOptions } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

import { isJwt } from "@/libs/server/parseJwt";

type JwtArgs = {
  token: DefaultJWT;
  user: User | null;
  account?: Account | null;
};

type SessionArgs = { session: DefaultSession; token: DefaultJWT | JWT };

if (!process.env.NEXTAUTH_SECRET) throw new Error("NEXTAUTH_SECRET is not defined");

if (!process.env.NEXT_PUBLIC_CLIENT_ID) throw new Error("NEXT_PUBLIC_CLIENT_ID is not defined");

if (!process.env.GOOGLE_SECRET) throw new Error("GOOGLE_SECRET is not defined");

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    /* CredentialsProvider({

    }) */
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope:
            "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly",
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    jwt: async ({ token, account }: JwtArgs): Promise<JWT> => {
      // tokenにすべての情報があった場合はそのまま返す
      if (isJwt(token)) return token;

      // tokenにaccessTokenがない場合は新しく作る
      const customToken: JWT = { ...token } as JWT;

      // set accessToken
      if (!account) throw new Error("アカウントがありません");
      if (!account.access_token) throw new Error("アクセストークンがありません");
      customToken.accessToken = account.access_token;

      if (!account.refresh_token) throw new Error("リフレッシュトークンがありません");
      customToken.refreshToken = account.refresh_token;

      return customToken;
    },
    session: ({ session, token }: SessionArgs): Session => {
      // console.log('SESSION', session, token);

      if (!token.accessToken) throw new Error("アクセストークンがありません");
      if (!token.refreshToken) throw new Error("リフレッシュトークンがありません");
      if (!session.user) throw new Error("ユーザーがありません" + JSON.stringify(session));
      if (!session.user.name) throw new Error("ユーザー名がありません");
      if (!session.user.email) throw new Error("メールアドレスがありません");
      if (!session.user.image) throw new Error("画像がありません");

      return {
        ...session,
        user: {
          id: session.user.email,
          name: session.user.name,
          email: session.user.email,
        },

        accessToken: token.accessToken as string,
      };
    },
  },
};
