"use client" 
import React from 'react'
import CarCard from '../car-card'
import { useQuery } from 'react-query';
import axios from 'axios';

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
        <div className='mt-4 grid md:grid-cols-3 gap-2 md:gap-6'>
            {cars?.length === 0 ? (
                <div className='h-48 flex items-center justify-center w-full'>
                    No Car Found
                </div>
            ) :
                <CarCard variant="allCars" getAllCars={getAllCars} />
            }
        </div>
    )
}

export default Cars