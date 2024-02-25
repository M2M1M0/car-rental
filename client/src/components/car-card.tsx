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


const CarCard = ({ variant, getAllCars, car }: CarCardProps) => {

    let [isOpen, setIsOpen] = useState(false)
    function openModal() {
        setIsOpen(true)
    }

    const [heart, setHeart] = useState(false)

    return (
        <main>
            {getAllCars?.isSuccess &&
                (
                    <section className='w-full min-w-56 p-4 rounded-md shadow-md bg-white'>
                        <div className='flex flex-col'>
                            <div className='flex justify-between'>
                                <h3 className='text-sm font-bold'>{car?.title}</h3>
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
                        <p className='text__medium '>{car?.type}</p>

                        <div className={`${variant === "allCars" && "flex md:flex-col"}`}>
                            <div className='my-2 py-16 px-2 relative w-full h-full'>
                                {car?.images &&
                                    <Image src={`${car?.images ? car?.images[0]?.url : ""}`} alt="Car" fill
                                        className='object-contain' />
                                }
                            </div>
                            <div className={`${variant === "own" ? "hidden" : "block"}`}>

                                <div className={`${variant === "allCars" && "justify-end mb-5 flex-col md:flex-row"} flex flex-row md:justify-between  gap-3`}>
                                    <div className='text__medium flex items-center gap-1 '>
                                        <FaGasPump />
                                        <span>{car?.fuelCapacity}L</span>
                                    </div>
                                    <div className='text__medium flex items-center gap-1 '>
                                        <GiSteeringWheel />
                                        <span>{car?.transmission}</span>
                                    </div>
                                    <div className='text__medium flex items-center gap-1 '>
                                        <MdPeople />
                                        <span className='whitespace-nowrap'>{car?.capacity} People</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${variant === "own" ? "hidden" : "block"} flex justify-between mt-2 gap-x3`}>
                            <p className='text-xs'>ETB{" "} {car?.price}
                                <sub className='text__medium  self-end'>/day</sub>
                            </p>
                            <button type="button"
                                onClick={openModal}
                                className="btn__bg py-1 px-3 text-xs font-medium text-white rounded-md">
                                More Info
                            </button>

                            {/* Car Details Dialog */}
                            <CarDetails
                                car={car}
                                variant={variant}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen} />
                        </div>
                    </section >
                )}
        </main>
    )
}

export default CarCard