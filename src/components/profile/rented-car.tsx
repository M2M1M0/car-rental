"use client" 
import CarCard from '@/components/car-card'
import axios from 'axios';
import { useQuery } from 'react-query';

const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
};


const RentedCar = () => {

    const getAllCars = useQuery(
        `getAllCars`,
        async () =>
            await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}cars`,
                {
                    headers,
                }
            ),
        {
            keepPreviousData: true,
            retry: false,
            onSuccess: (res) => {
                console.log("Cars fetched Success", res.data.data);
            },
            onError: (err) => {
                console.log("Cars fetching Error", err);
            },
        }
    );

    const cars = getAllCars?.data?.data?.data

    return (
        <div className='flex flex-col gap-1 mt-8 px-2'>
            <div className='flex justify-between'>
                <h2 className='text-sm font-medium py-1'>Rented Cars</h2>
            </div>
            <div className='gap-4 flex overflow-x-auto mb-1'>
                {cars?.length === 0 ? (
                    <div className='h-48 flex items-center justify-center w-full'>
                        No Car Found
                    </div>
                ) :
                    <CarCard variant="rented" getAllCars={getAllCars} />
                }
            </div>
        </div>
    )
}

export default RentedCar