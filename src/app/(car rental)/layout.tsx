"use client"
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function MainLayout({
    children,
    session
}: Readonly<{
    children: React.ReactNode;
    session: any
}>) {
    return (
        <QueryClientProvider client={queryClient} >
            {children}
        </QueryClientProvider>
    )
}
