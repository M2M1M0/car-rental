import Image from 'next/image'
import React from 'react'

const Profile = () => {
    return (
        <main className='w-full md:px-12 p-6 flex flex-col gap-3 bg-white'>
            <h2 className='font-bold'>My Profile</h2>
            <div className='relative w-full'>
                <div className='relative w-full h-32'>
                    {/* Cover Image */}
                    <Image
                        src="/roll-royce.png"
                        alt=""
                        fill
                        className='object-cover rounded-md' />

                    {/* Profile Picture */}
                    <Image
                        src="/nissan-gt-r.jpg"
                        alt=""
                        width={60}
                        height={60}
                        className='!w-16 !h-16 absolute -bottom-6 left-5 bg-black object-cover rounded-full' />


                    <button className=' absolute right-3 bottom-2 text-xs rounded-sm p-2 bg-slate-300 text-white'>
                        Edit Cover
                    </button>
                </div>
                <div className='flex justify-between md:px-8 w-full mt-8'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='font-bold text-sm'>Jone Doe</h2>
                        <p className='text__medium'>Agent</p>
                    </div>
                    <button className='btn__bg rounded-md px-2 text-xs text-white'>
                        Edit Profile
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Profile