"use client"
import React from 'react'
import CarCard from '../car-card'
import Link from 'next/link'
import { useQuery } from 'react-query'
import axios from 'axios'
import { BiLoader } from 'react-icons/bi'
import { Cars } from '@/helper'

const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
};

const RecommendedCars = () => {

    // Get All cars
    const response = Cars()
    let cars = response?.cars
    let getAllCars = response?.getAllCars

    return (
        <div className='flex flex-col gap-1'>
            <div className='flex justify-between'>
                <h2 className='text-sm font-medium'>Recommended Cars</h2>
                <Link href={"/search"}
                    className='underline text-xs cursor-pointer hover:text-gray-500'>View All</Link>
            </div>
            <div className='gap-4 flex overflow-x-auto mb-1'>


                {cars?.length === 0 ? (
                    <div className='h-48 flex items-center justify-center w-full'>
                        No Car Found
                    </div>
                ) : <div className='flex items-center justify-center w-full h-32'>
                    <p className='text-gray-500'>Coming Soon..</p>
                </div>
                    // cars?.map((car: any) => (
                    //     <CarCard
                    //         key={car._id}
                    //         car={car}
                    //         getAllCars={getAllCars} />
                    // ))
                }
                {/* {getAllCars?.isFetching &&

                    <div className='h-48 flex items-center justify-center w-full'>
                        <BiLoader className='animate-spin' size={30} />
                    </div>
                } */}
            </div>
        </div>
    )
}

export default RecommendedCars