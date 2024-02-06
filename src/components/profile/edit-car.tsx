import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { BiEdit } from 'react-icons/bi'


const EditCar = () => {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }


    return (
        <main>
            <button onClick={() => setIsOpen(true)}>
                <BiEdit />
            </button>

            {/* Edit Dialog */}
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
                                        <div className='w-64 h-48 bg-white'>
                                            <span></span>
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
        </main>
    )
}

export default EditCar