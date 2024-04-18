import NextAuth, { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createHash } from "crypto";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

export const config = {
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username ?? "";
        const password = credentials?.password ?? "";
        const apiUrl = process.env.API_URL;

        // 对密码进行哈希操作
        const hasher = createHash("sha256");
        hasher.update(password);
        const hashedPassword = hasher.digest("hex"); // 输出为十六进制格式

        // 提交登录请求
        const response = await fetch(apiUrl + "/auth/signIn", {
          method: "POST",
          body: JSON.stringify({ username, password: hashedPassword }),
          headers: { "Content-Type": "application/json" },
        });

        // 根据响应结果处理登录逻辑
        const responseData = await response.json();

        if (response.ok) {
          return responseData.user;
        } else {
          throw new Error(responseData.message as string);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user !== undefined) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.user !== null) {
        session.user = token.user;
      }
      return session;
    },
  },
} satisfies NextAuthOptions;

const handler = NextAuth(config);

export async function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
): Promise<ReturnType<typeof getServerSession>> {
  return await getServerSession(...args, config);
}

export { handler as GET, handler as POST };
