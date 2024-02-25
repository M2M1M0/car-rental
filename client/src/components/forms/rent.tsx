import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { VscLoading } from 'react-icons/vsc';

type Props = {
    carId: string
    setIsOpen: Dispatch<SetStateAction<boolean>>
    setIsRentOpen: Dispatch<SetStateAction<boolean>>
}
type FormValues = {
    car: string;
    rentedBy: string;
    pickUp: string;
    dropOff: string;
    from: Date;
    to: Date;
};

const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: "",
};

const RentForm = ({ carId, setIsOpen, setIsRentOpen }: Props) => {
    const router = useRouter()
    const { data: session } = useSession()
    //@ts-ignore
    const userID = session?.user?._id

    const { register, handleSubmit, formState: { errors, isLoading } } = useForm<FormValues>({
        // defaultValues: {
        //     price: 0, // Default value for price
        // }
    });

    const onSubmit = async (data: FormValues) => {
        // Handle form submission here 
        data.rentedBy = userID
        data.car = carId

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/rent`, data, { headers })
            toast.success("Car Rented SuccessFully")
            setTimeout(() => {
                setIsRentOpen(false)
                setIsOpen(false)
                router.push(`/me/${userID}`)
            }, 2000);
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-3 p-4'>
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
                        <input
                            {...register('pickUp')}
                            required
                            className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
                            placeholder='Location Address' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-bold'>Availiablity From</label>
                        <input
                            {...register('from')}
                            required
                            type="date"
                            className='w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md' />
                    </div>
                </div>
                {/* Drop-Off */}
                <div className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-bold'>Drop Off Location</label>
                        <input
                            {...register('dropOff')}
                            required
                            className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
                            placeholder='Location Address' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-bold'>Availiablity To</label>
                        <input
                            {...register('to')}
                            required
                            type="date"
                            className='w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md' />
                    </div>
                </div>
            </div>
            <div className='mt-6 flex justify-end'>
                <button
                    type="submit"
                    className="btn__bg uppercase py-2 px-5 text-xs font-medium text-white rounded-md">
                    {isLoading ? <VscLoading size={10} /> : "Rent"}
                </button>
            </div>
            <Toaster />
        </form>
    )
}

export default RentForm