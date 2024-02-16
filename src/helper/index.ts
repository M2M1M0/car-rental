import axios from "axios";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";

const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
};

export const User = () => {
    const { data: session } = useSession();

    //@ts-ignore
    let userID = session?.user?._id
    
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

    if (currentUser) return currentUser
}

export const Cars = () => {

    const getAllCars = useQuery(
        `getAllCars`,
        async () =>
            await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}cars`,
                {
                    headers,
                }
            ),
        {
            keepPreviousData: true,
            retry: false,
            onError: (err) => {
                console.log("Cars fetching Error", err);
            },
        }
    );

    const cars = getAllCars?.data?.data?.data

    if (cars) return { cars, getAllCars }
}