"use client"
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image';
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import Rent from './search/rent';
import { ArrayStar } from '@/utils';


interface Props {
    variant?: string;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const CarDetails = ({ variant, isOpen, setIsOpen }: Props) => {

    function closeModal() {
        setIsOpen(false)
    }

    let [isRentOpen, setIsRentOpen] = useState(false)
    function openRentModal() {
        setIsRentOpen(true)
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative w-full max-w-xl transform overflow-hidden rounded-md bg-white p-2 text-left align-middle shadow-xl transition-all">
                                    <div className='grid md:grid-cols-2 gap-3 p-2 '>
                                        {/* Car Image */}
                                        <section className='grid grid-rows-3 gap-3 h-52 md:h-full'>
                                            <div className='relative w-full h-full row-span-2'>
                                                <Image src="/rolls-royce.jpg" alt="Car" fill
                                                    className='object-cover rounded-md' />
                                            </div>
                                            <div className='grid grid-cols-3 gap-2 row-span-1'>
                                                <div className='relative w-full h-full'>
                                                    <Image src="/nissan-r.png" alt="Car" fill
                                                        className='object-cover rounded-md' />
                                                </div>
                                                <div className='relative w-full h-full'>
                                                    <Image src="/roll.png" alt="Car" fill
                                                        className='object-cover rounded-md' />
                                                </div>
                                                <div className='relative w-full h-full'>
                                                    <Image src="/nissan-r.png" alt="Car" fill
                                                        className='object-cover rounded-md' />
                                                </div>
                                            </div>
                                        </section>

                                        {/* Car detail Description */}
                                        <section className='flex flex-col gap-3 p-2'>
                                            <h2 className="text-xl font-semibold">
                                                Nissan GT-R
                                            </h2>
                                            <div className="flex items-center text-xs gap-2">
                                                <ArrayStar rating={3} />
                                                <span className='text__medium'>440+ Reviews</span>
                                            </div>
                                            <p className="text-xs font-serif leading-5">
                                                Ipsum dolor sit amet consectetur adipisicing elit.
                                                Placeat molestiae facilis corrupti itaque.
                                                molestiae facilis corrupti itaque.
                                            </p>

                                            {/*  */}
                                            <div className='mt-3 grid grid-cols-2 gap-12 md:gap-4 '>
                                                <div className='flex flex-col gap-1'>
                                                    <div className='flex justify-between'>
                                                        <p className="text__medium">Car Type</p>
                                                        <span className="text-xs font-bold">Sport</span>
                                                    </div>
                                                    <div className='flex justify-between'>
                                                        <p className="text__medium">Transm.</p>
                                                        <span className="text-xs font-bold">Manual</span>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-1'>
                                                    <div className='flex justify-between'>
                                                        <p className="text__medium">Capacity</p>
                                                        <span className="text-xs font-bold">2 Person</span>
                                                    </div>
                                                    <div className='flex justify-between'>
                                                        <p className="text__medium">Gasoline.</p>
                                                        <span className="text-xs font-bold">70L</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/*  */}
                                            <div className='flex justify-between mt-2'>
                                                <div className='leading-3'>
                                                    <p className='text-md'>$99.00/
                                                        <span className='text__medium  self-end'>{" "}day</span>
                                                    </p>
                                                    <span className='text__medium line-through'>
                                                        $100.00
                                                    </span>
                                                </div>

                                                {/*  */}


                                                <button type="button"
                                                    onClick={openRentModal}
                                                    className={`${variant === "rented" && "hidden"} btn__bg py-1 px-3 text-xs font-medium text-white rounded-md`}>
                                                    Rent Now
                                                </button>

                                                {/*  */}
                                                <Rent isRentOpen={isRentOpen} setIsRentOpen={setIsRentOpen} />

                                            </div>

                                        </section>
                                    </div>
                                    <button onClick={() => setIsOpen(false)}
                                        className='absolute bg-white rounded-full px-3 py-1.5 font-bold text-sm top-3 right-3'>
                                        X
                                    </button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default CarDetails