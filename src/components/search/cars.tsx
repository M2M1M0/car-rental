"use client"
import React from 'react'
import CarCard from '../car-card'
import { useQuery } from 'react-query';
import axios from 'axios';
import { BiLoader } from 'react-icons/bi';

const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
};

const Cars = () => {

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
            onError: (err) => {
                console.log("Cars fetching Error", err);
            },
        }
    );

    const cars = getAllCars?.data?.data?.data
    console.log(cars, "cars")


    return (
        <div className='mt-4 grid md:grid-cols-3 gap-2 md:gap-6'>
            {getAllCars?.isFetching &&

                <div className='h-48 flex items-center justify-center w-full'>
                    <BiLoader className='animate-spin' size={30} />
                </div>
            }
            {cars?.length === 0
                ? (
                    <div className='h-48 flex items-center justify-center w-full'>
                        No Car Found
                    </div>
                )
                : cars?.map((car: any) => (
                    <CarCard
                        key={car._id}
                        car={car}
                        variant="allCars"
                        getAllCars={getAllCars} />
                ))

            }
        </div>
    )
}

export default Cars