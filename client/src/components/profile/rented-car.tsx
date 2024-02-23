"use client"
import CarCard from '@/components/car-card'
import { BiLoader } from 'react-icons/bi';


const RentedCar = ({ getRentCars, cars }: any) => {

    return (
        <div className='flex flex-col gap-1 mt-8 px-2'>
            <div className='flex justify-between'>
                <h2 className='text-sm font-medium py-1'>Rented Cars</h2>
            </div>
            <div className='gap-4 flex overflow-x-auto mb-1'>
                {getRentCars?.isFetching &&

                    <div className='h-48 flex items-center justify-center w-full'>
                        <BiLoader className='animate-spin' size={30} />
                    </div>
                }
                {cars?.length === 0 ? (
                    <div className='h-48 flex items-center justify-center w-full'>
                        No Car Found
                    </div>
                ) :
                    cars?.map((car: any) => (
                        <CarCard
                            variant='rented'
                            key={car._id}
                            car={car?.car}
                            getAllCars={getRentCars} />
                    ))
                }
            </div>
        </div>
    )
}

export default RentedCar