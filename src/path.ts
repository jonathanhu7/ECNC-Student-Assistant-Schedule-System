export const paths = {
  home: "/",
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    resetPassword: "/auth/reset-password",
  },
  dashboard: {
    overview: "/dashboard",
    freeTimeSubmit: "/dashboard/free-time-submit",
    schedule: "/dashboard/schedule",
  },
  errors: { notFound: "/errors/not-found" },
} as const;
