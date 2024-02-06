import React from 'react'
import Container from '../container'
import CarCard from '../car-card'
import Link from 'next/link'

const RecommendedCars = () => {
    return (
        <div className='flex flex-col gap-1'>
            <div className='flex justify-between'>
                <h2 className='text-sm font-medium'>Recommended Cars</h2>
                <Link href={"/search"}
                    className='underline text-xs cursor-pointer hover:text-gray-500'>View All</Link>
            </div>
            <div className='gap-4 flex overflow-x-auto mb-1'>
                {Array(4)
                    .fill(0)
                    .map((_, i) => (
                        <CarCard key={i} />
                    ))}
            </div>
        </div>
    )
}

export default RecommendedCars