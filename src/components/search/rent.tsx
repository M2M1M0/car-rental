import { Dialog, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction } from 'react'
import RentForm from "@/components/forms/rent"

interface Props {
    carId: string
    setIsOpen: Dispatch<SetStateAction<boolean>>
    isRentOpen: boolean;
    setIsRentOpen: Dispatch<SetStateAction<boolean>>
}

const Rent = ({ carId, setIsOpen, isRentOpen, setIsRentOpen }: Props) => {

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

                                    <RentForm
                                        carId={carId}
                                        setIsOpen={setIsOpen}
                                        setIsRentOpen={setIsRentOpen} />

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