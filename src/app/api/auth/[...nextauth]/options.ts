
import { NextAuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import User from "@/models/user.model";
import connectToDB from "@/database";


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
                await connectToDB();
                if (!credentials?.username || !credentials?.password) {
                    // throw new Error("Invalid Credentials")
                    return null
                }
                const user = await User.findOne({ username: credentials.username })

                if (!user) {
                    // throw new Error("Invalid Credentials")
                    return null
                }

                // const isMatch = await bcrypt.compare(credentials.password, user.password);
                const isMatch = credentials.password === user.password;

                if (isMatch) {
                    // console.log(user, "User credentials")
                    return user;
                } else {
                    // throw new Error("Invalid Credentials")
                    return null
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
