import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

import { BACKEND_URL } from "./constants";

type BodyType = {
  email: string;
  password: string;
  fullname?: string;
};

const refreshToken = async (token: JWT): Promise<JWT> => {
  const res = await fetch(BACKEND_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });

  if (!res.ok) {
    throw Error("Failed to refresh token");
  }

  const response = await res.json();

  return {
    ...token,
    ...response,
  };
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
        fullname: {
          label: "Fullname",
          type: "text",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password, fullname = null } = credentials;

        const pathname = fullname ? "/auth/register" : "/auth/login";

        const body: BodyType = {
          email,
          password,
        };

        if (fullname) body.fullname = fullname;

        // let res;

        // try {
        const res = await fetch(BACKEND_URL + pathname, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          return null;
        }
        // } catch (error) {
        //   throw Error("ServerNotRespond");
        // }

        // if (!res.ok && fullname) {
        //   throw Error("EmailRegistered");
        // }

        // if (!res.ok) {
        //   throw Error("AccountNotExist");
        // }

        const user = await res.json();

        // if (!user.emailVerified && !fullname) {
        //   throw Error("EmailNotVerfied");
        // }

        return user;
      },
    }),

    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //   async profile(profile) {
    //     return {
    //       id: profile.sub,
    //       name: `${profile.given_name} ${profile.family_name}`,
    //       email: profile.email,
    //       role: profile.role ? profile.role : "user",
    //     };
    //   },
    // }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      if (Date.now() < token?.backendTokens?.expiresIn) return token;

      return await refreshToken(token);
    },
    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },
};

export const getAuthSession = () => getServerSession(authOptions);
