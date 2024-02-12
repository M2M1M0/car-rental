
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import User from "@/models/user.model";
import connectToDB from "@/database";


const authOptions = {
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
                username: { label: "Username", type: "text"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await connectToDB();
                if (!credentials) {
                    return null;
                }
                const user = await User.findOne({ username: credentials.username })

                if (!user) {
                    console.log("Invalid Credentials")
                    return null
                }

                // const isMatch = await bcrypt.compare(credentials.password, user.password);
                const isMatch = credentials.password === user.password;

                if (isMatch) {
                    return user;
                } else {
                    console.log("Invalid Credentials")
                    return null;
                }
            },
        }),
    ],
    // pages: {
    //     signIn: "/sign-in",
    //     signUp: "/sign-up",
    // },
    // callbacks: {
    //     // Add or uncomment the session callback
    //     async session({ session, user }: { session: any, user: any }) {
    //         // Assuming `user` object has the properties you want to include in the session
    //         // For example, adding user id and email to the session
    //         session.user.id = user.id; // Add user's ID to the session
    //         session.user.email = user.email; // Ensure user's email is included in the session (usually included by default)

    //         // You can add more user properties to the session as needed
    //         // session.user.customProperty = user.customProperty;

    //         return session; // Return the modified session
    //     },
    //     // Your other callbacks (e.g., signIn)
    // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };