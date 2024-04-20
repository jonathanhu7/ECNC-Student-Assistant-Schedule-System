import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { hash } from "bcrypt";

export const nextAuthConfig = {
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

        // 对密码进行加盐和哈希操作
        const saltResponse = await prisma.account.findUnique({
          where: {
            username,
          },
          select: {
            salt: true,
          },
        });

        if (saltResponse === null) {
          throw new Error("用户名不存在或密码错误");
        }

        const salt = saltResponse.salt;
        const hashedPassword = await hash(password, salt);

        const loginResponse = await prisma.account.findUnique({
          where: { username, hashedPassword },
          select: { username: true },
        });

        if (loginResponse === null) {
          throw new Error("用户名不存在或密码错误");
        }

        const user = await prisma.user.findUnique({
          where: { username },
          select: { username: true, nickname: true, role: true },
        });

        if (user === null) {
          throw new Error("用户名不存在或密码错误");
        }

        return { id: user.username, role: user.role, nickname: user.nickname };
      },
    }),
  ],
};
const handler = NextAuth(nextAuthConfig);

export async function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
): Promise<ReturnType<typeof getServerSession>> {
  return await getServerSession(...args, nextAuthConfig);
}

export { handler as GET, handler as POST };
