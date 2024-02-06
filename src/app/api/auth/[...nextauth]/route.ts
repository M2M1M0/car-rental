
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
                username: { label: "Username", type: "text", placeholder: "jsmith" },
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
    pages: {
        signIn: "/sign-in",
    },
    // callbacks: {
    //     async signIn({ user, account }: { user: any, account: any }) {
    //         if (account.provider === "github") {
    //             const { name, email } = user;
    //             try {
    //                 await connectToDB();
    //                 const isUserExists = await User.findOne({ email });

    //                 if (!isUserExists) {
    //                     const res = await axios.post(NEXT_PUBLIC_BASE_URL,)

    //                     if (res.success) {
    //                         return user;
    //                     }
    //                 }
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         }

    //         return user;
    //     },
    // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };