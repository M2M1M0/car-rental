"use client"
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

import { MdOutlineFileUpload } from 'react-icons/md';
import { VscLoading } from 'react-icons/vsc';


type Props = {
    currentUser: any;
    isEditPrOpen: boolean;
    setIsEditProOpen: Dispatch<SetStateAction<boolean>>
}

const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
};

const EditProfile = ({ currentUser, isEditPrOpen, setIsEditProOpen }: Props) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const pathName = usePathname()
    const userID = pathName.split("/").pop()


    const [email, setEmail] = useState(null)
    const handleEmailChange = (e: any) => {
        setEmail(e.target.value)
    }

    const [profileImage, setProfileImage] = useState<File[]>([]);
    const handleProfileChange = (e: any) => {
        setProfileImage(e.target.files);
    };

    const [coverImage, setCoverImage] = useState<File[]>([]);
    const handleCoverChange = (e: any) => {
        setCoverImage(e.target.files);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        // Handle form submission here 
        let user = {
            username: currentUser?.username,
            email: email || currentUser?.email,
            profilePicture: profileImage[0]?.name || currentUser?.profilePicture,
            coverPicture: coverImage[0]?.name || currentUser?.coverPicture
        }

        try {
            setIsLoading(true)
            await axios.put(`${process.env.BASE_API_URL}user/update-profile/${userID}`, user, { headers })
            toast.success("Profile SuccessFully Updated")
            router.push("/")
        } catch (error) {
            console.log(error, "update error")
        } finally {
            setIsLoading(false)
            setIsEditProOpen(false)
        }

    };


    const closeModal = () => setIsEditProOpen(false)

    return (
        <>
            <Transition appear show={isEditPrOpen} as={Fragment}>
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
                                    {/* User Details */}
                                    <p className='text-md text-center mt-3'>
                                        Username: {" "}
                                        <span className='font-bold'>
                                            {currentUser?.username}
                                        </span>
                                    </p>
                                    <form
                                        onSubmit={handleSubmit}>
                                        <div className='grid md:grid-cols-2 gap-3 p-2 mt-4'>

                                            <section className='flex flex-col gap-3'>
                                                <div className='grid grid-cols-3 items-center gap-2'>
                                                    <label className='text-md'>
                                                        Email:
                                                    </label>
                                                    <input
                                                        type='email'
                                                        name='email'
                                                        defaultValue={currentUser?.email}
                                                        onChange={handleEmailChange}
                                                        className='col-span-2 text-sm p-1 border-2 rounded-md'
                                                    />
                                                </div>
                                                {/* <div className='grid grid-cols-3 items-center gap-2'>
                                                    <label className='text-md'>
                                                        Password:
                                                    </label>
                                                    <input
                                                        type='password'
                                                        name='password'
                                                        defaultValue={currentUser?.password}
                                                        onChange={handlePasswordChange}
                                                        className='col-span-2 text-sm p-1 border-2 rounded-md'
                                                    />
                                                </div> */}
                                                <div className='flex flex-col gap-2 h-36 mt-4'>

                                                    <label
                                                        htmlFor="images"
                                                        className="flex flex-col gap-1 justify-center items-center w-full h-full border-2 border-dashed rounded-sm overflow-auto p-1">
                                                        {currentUser?.coverPicture !== undefined || coverImage?.length !== 0 ? (
                                                            <div className="relative w-full h-32 overflow-hidden rounded-md">
                                                                {coverImage?.length !== 0 ?
                                                                    <Image
                                                                        src={URL.createObjectURL(coverImage[0])}
                                                                        alt="Profile Pic"
                                                                        fill
                                                                        className="object-cover rounded-md" />
                                                                    : currentUser?.coverPicture &&
                                                                    <Image
                                                                        src={`/${currentUser?.coverPicture}`}
                                                                        alt='Picture'
                                                                        fill
                                                                    />
                                                                }
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <MdOutlineFileUpload className="text-2xl text__medium" />
                                                                <p className="text__medium font-bold">Upload Cover</p>
                                                            </>
                                                        )}
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="images"
                                                        accept="image/*"
                                                        hidden
                                                        onChange={handleCoverChange}
                                                    />
                                                    <p className='text-sm'>Cover Picture</p>
                                                </div>
                                            </section>

                                            <section className='flex flex-col gap-3'>
                                                <div className='flex flex-col gap-2 h-36'>
                                                    <label
                                                        htmlFor="cover"
                                                        className="flex flex-col gap-1 justify-center items-center w-full h-full border-2 border-dashed rounded-sm overflow-auto p-1">
                                                        {currentUser?.profilePicture !== undefined || profileImage?.length !== 0 ? (
                                                            <div className="relative w-full h-32 overflow-hidden rounded-md">
                                                                {profileImage?.length !== 0 ?
                                                                    <Image
                                                                        src={URL.createObjectURL(profileImage[0])}
                                                                        alt="Profile Pic"
                                                                        fill
                                                                        className="object-cover rounded-md" />
                                                                    : currentUser?.profilePicture &&
                                                                    <Image
                                                                        src={`/${currentUser?.profilePicture}`}
                                                                        alt='Picture'
                                                                        fill
                                                                    />
                                                                }
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <MdOutlineFileUpload className="text-2xl text__medium" />
                                                                <p className="text__medium font-bold">upload profile</p>
                                                            </>
                                                        )}
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="cover"
                                                        accept="image/*"
                                                        hidden
                                                        onChange={handleProfileChange}
                                                    />
                                                    <p className='text-sm'>Profile Picture</p>

                                                </div>

                                            </section>

                                        </div>

                                        {/* Submit */}
                                        <button
                                            type='submit'
                                            className='px-3 py-1.5 font-bold rounded-lg text-md uppercase w-full bg-blue-500 mt-8 text-white text-center'>
                                            {isLoading ? <VscLoading size={20} /> : "Update"}
                                        </button>
                                    </form>

                                    <button
                                        type='button'
                                        onClick={() => setIsEditProOpen(false)}
                                        className='absolute bg-white rounded-full px-3 py-1.5 font-bold text-sm top-3 right-3'>
                                        X
                                    </button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Toaster />
        </>
    )
}

export default EditProfile