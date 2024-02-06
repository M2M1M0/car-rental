import React from 'react'
import CarCard from '../car-card'

const Cars = () => {
    return (
        <div className='mt-4 grid md:grid-cols-3 gap-2 md:gap-6'>
            {Array(12)
                .fill(0)
                .map((_, i) => (
                    <CarCard variant={"allCars"} key={i} />
                ))}
        </div>
    )
}

export default Cars