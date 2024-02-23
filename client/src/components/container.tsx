
const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='mx-auto px-5 md:px-24 py-4 md:py-8'>
            {children}
        </div>
    )
}

export default Container