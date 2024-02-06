"use client"
import { QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient()

export default function MainLayout({
    children,
    session
}: Readonly<{
    children: React.ReactNode;
    session: any
}>) {
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient} >
                {children}
            </QueryClientProvider>
        </SessionProvider>
    )
}
