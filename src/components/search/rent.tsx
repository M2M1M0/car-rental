import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image';
import { Dispatch, Fragment, SetStateAction } from 'react'

interface Props {
    isRentOpen: boolean;
    setIsRentOpen: Dispatch<SetStateAction<boolean>>
}

const Rent = ({ isRentOpen, setIsRentOpen }: Props) => {

    function closeRentModal() {
        setIsRentOpen(false)
    }

    return (
        <>
            <Transition appear show={isRentOpen} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={closeRentModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in durat ion-200"
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
                                    <div className='flex flex-col gap-3 p-4'>
                                        <div className='leading-3'>
                                            <h3 className='text-sm font-semibold'>Add Pickup & Dropoff Location </h3>
                                            <span className='text__medium'>please enter your loaction info</span>
                                        </div>
                                        <h1 className='text-md text-blue-500 font-normal'>Pickup info</h1>
                                        <div className='grid md:grid-cols-2 gap-3 gap-y-8 p-2'>
                                            {/* Pick-up */}
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-1'>
                                                    <label className='text-xs font-bold'>Pickup Location</label>
                                                    <input type="text" name="" id=""
                                                        className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
                                                        placeholder='Location Address' />
                                                </div>
                                                <div className='flex flex-col gap-1'>
                                                    <label className='text-xs font-bold'>Availiablity From</label>
                                                    <input type="date" name="" id=""
                                                        className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md' />
                                                </div>
                                            </div>
                                            {/* Drop-Off */}
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col gap-1'>
                                                    <label className='text-xs font-bold'>Drop Off Location</label>
                                                    <input type="text" name="" id=""
                                                        className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
                                                        placeholder='Location Address' />
                                                </div>
                                                <div className='flex flex-col gap-1'>
                                                    <label className='text-xs font-bold'>Availiablity To</label>
                                                    <input type="date" name="" id=""
                                                        className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mt-6 flex justify-end'>
                                            <button type="button"
                                                className="btn__bg uppercase py-2 px-5 text-xs font-medium text-white rounded-md">
                                                Rent
                                            </button>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsRentOpen(false)}
                                        className='absolute bg-white rounded-full font-bold text-sm top-3 right-3'>
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

export default Rent