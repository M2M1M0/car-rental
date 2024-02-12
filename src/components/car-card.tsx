"use client"
import Image from 'next/image'
import { FaHeart } from "react-icons/fa6";
import { FaGasPump } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import { MdPeople } from "react-icons/md";
import { CarCardProps } from '@/types';
import CarDetails from './car-details';
import { useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import EditCar from './profile/edit-car';
import { BiLoader } from 'react-icons/bi';


const CarCard = ({ variant, getAllCars }: CarCardProps) => {

    let [isOpen, setIsOpen] = useState(false)
    function openModal() {
        setIsOpen(true)
    }

    const [heart, setHeart] = useState(false)


    return (
        <main>
            {getAllCars?.isFetching
                ? (
                    <div className='h-48 flex items-center justify-center w-full'>
                        <BiLoader className='animate-spin' size={30} />
                    </div>
                )
                : (
                    <section className='w-full min-w-56 p-4 rounded-md shadow-md bg-white'>
                        <div className='flex flex-col'>
                            <div className='flex justify-between'>
                                <h3 className='text-sm font-bold'>Koenigsegg</h3>
                                {/* === Edit own Car */}
                                {variant === "own" ? (
                                    <EditCar />

                                ) : (
                                    <button onClick={() => setHeart((prev) => !prev)}>
                                        <CiHeart className={`${heart ? "hidden" : "block"} text-xl`} />
                                        <FaHeart className={`${heart ? "block" : "hidden"} text-lg text-orange-600`} />
                                    </button>
                                )}


                            </div>
                        </div>
                        <p className='text__medium '>Sport</p>

                        <div className={`${variant === "allCars" && "flex md:flex-col"}`}>
                            <div className='py-8 px-2'>
                                <Image src="/nissan.png" alt="Car" width={200} height={100}
                                    className='object-contain -mt-16' />
                            </div>
                            <div className={`${variant === "own" ? "hidden" : "block"}`}>

                                <div className={`${variant === "allCars" && "justify-end mb-5 flex-col md:flex-row"} flex flex-row md:justify-between  gap-3`}>
                                    <div className='text__medium flex gap-1 '>
                                        <FaGasPump />
                                        <span>80L</span>
                                    </div>
                                    <div className='text__medium flex gap-1 '>
                                        <GiSteeringWheel />
                                        <span>Manuel</span>
                                    </div>
                                    <div className='text__medium flex gap-1 '>
                                        <MdPeople />
                                        <span className='whitespace-nowrap'>4 People</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${variant === "own" ? "hidden" : "block"} flex justify-between mt-2 gap-x3`}>
                            <p className='text-sm'>$99.00/
                                <span className='text__medium  self-end'>{" "}day</span>
                            </p>
                            <button type="button"
                                onClick={openModal}
                                className="btn__bg py-1 px-3 text-xs font-medium text-white rounded-md">
                                More Info
                            </button>

                            {/* Car Details Dialog */}
                            <CarDetails variant={variant} isOpen={isOpen} setIsOpen={setIsOpen} />
                        </div>
                    </section >
                )}
        </main>
    )
}

export default CarCard