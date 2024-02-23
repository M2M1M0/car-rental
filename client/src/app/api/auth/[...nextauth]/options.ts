
import { NextAuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import axios from "axios";


export const options: NextAuthOptions = {
    providers: [
        // GoogleProvider({
        //     clientId:
        //         "977343913580-83i2einc6e40pec56gknd2ejlf6pkar2.apps.googleusercontent.com",
        //     clientSecret: "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",
        // }),
        // GithubProvider({
        //     clientId: process.env.NEXT_PUBLIC_GITHUB_ID!,
        //     clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET!,
        // }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null
                }
                const response = await axios.post(
                    process.env.NEXT_PUBLIC_API_URL! + "/auth/login",
                    credentials
                );
                console.log(response, "resp")
                if (!response) {
                    return null
                } else {
                    return response.data.data;
                }

            },
        }),
    ],
    pages: {
        signIn: "/sign-in",
        error: "/sign-in"
    },
    callbacks: {
        // Add or uncomment the session callback
        async session({ session, token, user }: { session: any, token: any, user: any }) {
            // Assuming `user` object has the properties you want to include in the session
            // For example, adding user id and email to the session
            if (session?.user) {
                session.user._id = token._id; // Add user's ID to the session
            }

            // You can add more user properties to the session as needed
            // session.user.customProperty = user.customProperty;
            return session; // Return the modified session
        },
        async jwt({ user, token }: { user: any, token: any }) {
            if (user) {
                token._id = user._id
            }
            return token
        }
    },
    session: {
        strategy: 'jwt' as SessionStrategy
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development"
};
