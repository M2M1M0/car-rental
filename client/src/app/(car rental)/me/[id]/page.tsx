"use client"
import OwnCar from '@/components/profile/own-car'
import Profile from '@/components/profile/profile'
import RentedCar from '@/components/profile/rented-car'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import { useQuery } from 'react-query'

const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
};

const MyProfile = () => {

    const pathName = usePathname()
    const userID = pathName.split("/").pop()

    const getUserInfo = useQuery(
        `getUserInfo ${userID}`,
        async () =>
            await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}user/show-profile/${userID}`,
                {
                    headers,
                }
            ),
        {
            keepPreviousData: true,
            retry: false,
            onError: (err) => {
                console.log("User Detail Info", err);
            },
        }
    );

    const currentUser = getUserInfo?.data?.data?.message

    return (
        <section className='md:px-16 py-2'>
            <Profile currentUser={currentUser}/>
            <RentedCar getRentCars={getUserInfo} cars={currentUser?.rent}/>
            <OwnCar getMyCars={getUserInfo} cars={currentUser?.cars}/>
        </section>
    )
}

export default MyProfile