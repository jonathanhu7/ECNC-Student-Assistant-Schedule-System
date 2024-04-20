// types/next-auth.d.ts
// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user: {
//       role: string;
//       username: string;
//       nickname: string;
//     };
//   }
//   interface User {
//     role: string;
//     username: string;
//     nickname: string;
//   }
// }

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT {
//     role: string;
//     username: string;
//     nickname: string;
//   }
// }
