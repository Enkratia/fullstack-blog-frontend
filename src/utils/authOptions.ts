import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import MailruProvider from "next-auth/providers/mailru";

import { JWT } from "next-auth/jwt";

import { BACKEND_URL } from "./constants";

type BodyType = {
  email: string;
  password: string;
};

const refreshToken = async (token: JWT): Promise<JWT> => {
  const res = await fetch(BACKEND_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token?.backendTokens?.refreshToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw Error("RefreshTokenError");
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
        const { email, password } = credentials;

        const body: BodyType = {
          email,
          password,
        };

        let res;

        try {
          res = await fetch(BACKEND_URL + "/auth/login", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error) {
          throw Error("FetchError");
        }

        if (res.status === 401) {
          throw Error("EmailOrPasswordAreIncorrect");
        }

        const result = await res.json();

        if (!result.user?.emailVerified) {
          throw Error("EmailNotVerfied");
        }

        return result;
      },
    }),

    MailruProvider({
      name: "mailru",
      id: "mailru",
      type: "oauth",
      clientId: process.env.MAILRU_CLIENT_ID,
      clientSecret: process.env.MAILRU_CLIENT_SECRET,
      authorization: "https://oauth.mail.ru/login?scope=userinfo&prompt_force=1",
      token: "https://oauth.mail.ru/token",
      userinfo: {
        async request(context) {
          console.log("context", context);

          const res = await fetch(
            `https://oauth.mail.ru/userinfo?access_token=${context.tokens.access_token}`,
          );
          return await res.json();
        },
      },
      async profile(profile) {
        // console.log("profile", profile);
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          // role: profile.role ? profile.role : "user",
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // console.log("token", token);
      // return token;
      console.log("NEW", token, user);
      if (user) {
        return { ...token, ...user };
      }

      if (Date.now() < token?.backendTokens?.expiresIn) return token;

      const newToken = await refreshToken(token);
      return {
        user: newToken.user,
        backendTokens: {
          ...token.backendTokens,
          ...newToken.backendTokens,
        },
      };
    },
    async session({ token, session }) {
      // console.log("session", session);
      session.user = token?.user;
      session.backendTokens = token?.backendTokens;

      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
};

export const getAuthSession = () => getServerSession(authOptions);

// userinfo: "https://oauth.mail.ru/userinfo",
// return {
//   user: {
//     id: "b491315c-613b-40e3-8c16-d8459f8e09aa",
//     fullname: "manoftheman",
//     email: "manofthetreasure@gmail.com",
//     imageUrl: "http://localhost:3001/api/images/1708003414299-4160x6240.jpg",
//     profession: "profession",
//     company: "company",
//     representation: "Something",
//     emailVerified: true,
//     createdAt: "2024-01-30T17:17:55.407Z",
//     updatedAt: "2024-02-17T23:57:32.272Z",
//   },
//   backendTokens: {
//     accessToken:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbm9mdGhldHJlYXN1cmVAZ21haWwuY29tIiwiaWQiOiJiNDkxMzE1Yy02MTNiLTQwZTMtOGMxNi1kODQ1OWY4ZTA5YWEiLCJpYXQiOjE3MDg2OTE2NDIsImV4cCI6MTcwODY5MTY1Mn0.SaBG5koBHIJp2kmkdITL84b8cbOPLjaEOuqQ_Jd-TLs",
//     refreshToken:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbm9mdGhldHJlYXN1cmVAZ21haWwuY29tIiwiaWQiOiJiNDkxMzE1Yy02MTNiLTQwZTMtOGMxNi1kODQ1OWY4ZTA5YWEiLCJpYXQiOjE3MDg2OTE2NDIsImV4cCI6MTcwODY5MTY2Mn0._7FS6ge3sHP-OGoQXN69m_9HVgJjFvajvDST55txAFs",
//     expiresIn: 1708691652854,
//     refreshExpiresIn: 1708691662854,
//   },
//   iat: 1708691642,
//   exp: 1711283642,
//   jti: "16ebea92-4445-453e-b0d7-42e995f78ee0",
// };
// return {
//   user: {
//     id: "b491315c-613b-40e3-8c16-d8459f8e09aa",
//     fullname: "manoftheman",
//     email: "manofthetreasure@gmail.com",
//     imageUrl: "http://localhost:3001/api/images/1708003414299-4160x6240.jpg",
//     profession: "profession",
//     company: "company",
//     representation: "Something",
//     emailVerified: true,
//     createdAt: "2024-01-30T17:17:55.407Z",
//     updatedAt: "2024-02-17T23:57:32.272Z",
//   },
//   backendTokens: {
//     accessToken:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbm9mdGhldHJlYXN1cmVAZ21haWwuY29tIiwiaWQiOiJiNDkxMzE1Yy02MTNiLTQwZTMtOGMxNi1kODQ1OWY4ZTA5YWEiLCJpYXQiOjE3MDg2OTE2NDIsImV4cCI6MTcwODY5MTY1Mn0.SaBG5koBHIJp2kmkdITL84b8cbOPLjaEOuqQ_Jd-TLs",
//     refreshToken:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbm9mdGhldHJlYXN1cmVAZ21haWwuY29tIiwiaWQiOiJiNDkxMzE1Yy02MTNiLTQwZTMtOGMxNi1kODQ1OWY4ZTA5YWEiLCJpYXQiOjE3MDg2OTE2NDIsImV4cCI6MTcwODY5MTY2Mn0._7FS6ge3sHP-OGoQXN69m_9HVgJjFvajvDST55txAFs",
//     expiresIn: 1708691652854,
//     refreshExpiresIn: 1708691662854,
//   },
//   iat: 1708691642,
//   exp: 1711283642,
//   jti: "16ebea92-4445-453e-b0d7-42e995f78ee0",
// };
// async signIn({ user, account, profile, email, credentials }) {
//   // console.log({ user, account, profile, email, credentials });
//   return true;
// },
