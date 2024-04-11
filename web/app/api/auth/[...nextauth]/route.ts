import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "凭证",
      credentials: {
        username: {
          label: "用户名",
          type: "text",
        },
        password: {
          label: "密码",
          type: "password",
        },
      },
      async authorize(credentials, request) {
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
