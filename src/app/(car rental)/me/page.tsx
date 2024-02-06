import Container from '@/components/container'
import OwnCar from '@/components/profile/own-car'
import Profile from '@/components/profile/profile'
import RentedCar from '@/components/profile/rented-car'
import React from 'react'

const MyProfile = () => {
    return (
        <section className='md:px-16 py-2'>
            <Profile />
            <RentedCar />
            <OwnCar />
        </section>
    )
}

export default MyProfile