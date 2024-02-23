import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link href="/" className='font-bold text-xl text-blue-500'>
            <span className='text-orange-500'>C</span>
            AR RENT
        </Link>
    )
}

export default Logo