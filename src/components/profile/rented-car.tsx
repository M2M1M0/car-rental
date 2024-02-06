import CarCard from '@/components/car-card'

const RentedCar = () => {
    return (
        <div className='flex flex-col gap-1 mt-8 px-2'>
            <div className='flex justify-between'>
                <h2 className='text-sm font-medium py-1'>Rented Cars</h2>
            </div>
            <div className='gap-4 flex overflow-x-auto mb-1'>
                {Array(4)
                    .fill(0)
                    .map((_, i) => (
                        <CarCard variant="rented" key={i} />
                    ))}
            </div>
        </div>
    )
}

export default RentedCar