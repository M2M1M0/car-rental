"use client"
import Footer from '@/components/footer';
import Header from '@/components/header';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function MainLayout({
    children,
    session
}: {
    children: React.ReactNode;
    session: any
}) {
    return (
        <QueryClientProvider client={queryClient} >
            <Header />
            {children}
            <Footer />
        </QueryClientProvider>
    )
}

export default MainLayout
