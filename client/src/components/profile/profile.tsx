"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import EditProfile from './edit-profile'


const Profile = ({ currentUser }: any) => {


    let [isEditPrOpen, setIsEditProOpen] = useState(false)
    function openEditProModal() {
        setIsEditProOpen(true)
    }

    return (
        <main className='w-full md:px-12 p-6 flex flex-col gap-3 bg-white'>
            <h2 className='font-bold'>My Profile</h2>
            <div className='relative w-full'>
                <div className='relative w-full h-32'>
                    {/* Cover Image */}
                    {currentUser?.coverPicture &&
                        <Image
                            src={`${currentUser?.coverPicture}`}
                            alt=""
                            fill
                            className='object-cover rounded-md' />
                    }
                    {/* Profile Picture */}
                    {currentUser?.profilePicture &&
                        <Image
                            src={`${currentUser?.profilePicture}`}
                            alt=""
                            width={60}
                            height={60}
                            className='!w-16 !h-16 absolute -bottom-6 left-5 object-cover rounded-full' />
                    }
                </div>
                <div className='flex justify-between md:px-8 w-full mt-8'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='font-bold text-sm'>{currentUser?.username}</h2>
                        <p className='text__medium'>{currentUser?.email}</p>
                    </div>

                    <button
                        type="button"
                        onClick={openEditProModal}
                        className='btn__bg rounded-md px-2 text-xs text-white'>
                        Edit Profile
                    </button>
                    <EditProfile
                        currentUser={currentUser}
                        isEditPrOpen={isEditPrOpen}
                        setIsEditProOpen={setIsEditProOpen}
                    />
                </div>
            </div>
        </main>
    )
}

export default Profile