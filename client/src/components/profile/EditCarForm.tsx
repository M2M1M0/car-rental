"use client"
import React, { useState } from 'react'
import * as Z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { getCar } from '@/helper';
import { UseQueryResult } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import { EditCarFormProps } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type FormValues = {
    owner: string,
    title: string,
    type: string,
    price: number,
    capacity: number,
    transmission: string,
    location: string,
    fuelCapacity: number,
    description: string,
    images: string[]
};

const addCarSchema = Z.object({
    title: Z.string().min(1, { message: 'Title Required' }),
    type: Z.enum(["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"])
        .refine(val => val.length > 0, { message: 'Type Required' }),
    price: Z.string().min(1, { message: "Price Required" }),
    capacity: Z.string().min(1, { message: "Capacity in Person Required" }),
    transmission: Z.enum(["Auto", "Manual"])
        .refine(val => val.length > 0, { message: 'Type Required' }),
    location: Z.string().min(1, { message: 'Location Required' }),
    fuelCapacity: Z.string().min(1, { message: "Fuel Capacity Required" }),
    description: Z.string().min(1, { message: 'Description Required' }),
    // images: Z.array(Z.string()).nonempty({ message: "At least one image is required" }),
});


const EditCarForm = ({ carID, setIsOpen }: EditCarFormProps) => {
    const router = useRouter()
    const { data: session } = useSession();
    // @ts-ignore
    const userID = session?.user?._id;

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(addCarSchema),

    });

    const [isLoading, setIsLoading] = useState(false)


    const onSubmit = async (data: any) => {
        // console.log(data, "data")
        const formData = new FormData()

        formData.append("title", data?.title)
        formData.append("type", data?.type)
        formData.append("price", data?.price)
        formData.append("capacity", data?.capacity)
        formData.append("transmission", data?.transmission)
        formData.append("location", data?.location)
        formData.append("fuelCapacity", data?.fuelCapacity)
        formData.append("description", data?.description)



        try {
            setIsLoading(true)
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/car/${carID}/${userID}`, formData)
            toast.success("SuccessFully Updated")
            router.push("/")

        } catch (error) {
            console.log(error, "update error")
        } finally {
            setIsLoading(false)
            setIsOpen(false)

        }
    }

    const car = getCar(carID)

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-3 p-4'>
            <div className='leading-3'>
                <h3 className='text-lg font-normal'>Manage Your Car Destails</h3>
            </div>
            <h1 className='text-md text-blue-500 font-normal'>Car info</h1>
            {/* {getAllCar.isSuccess && <p></p>} */}
            {car &&
                <div className='grid md:grid-cols-2 gap-3 md:gap-x-6 gap-y-8 p-2'>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-bold'>Car Title</label>
                        <input
                            {...register('title')}
                            className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
                            placeholder='Your Title'
                            defaultValue={car?.title}
                        />
                        {errors.title && <p className='text-red-500 text-xs'>{errors.title.message}</p>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-bold'>Car Type</label>
                        <select
                            {...register('type')}
                            className="w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md"
                            defaultValue={car?.type}
                        >
                            <option value="">select</option>
                            <option value="Sport">Sport</option>
                            <option value="SUV">SUV</option>
                            <option value="MPV">MPV</option>
                            <option value="Sedan">Sedan</option>
                            <option value="Coupe">Coupe</option>
                            <option value="Hatchback">Hatchback</option>
                        </select>
                        {errors.type && <p className='text-red-500 text-xs'>{errors.type.message}</p>}

                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-bold'>Rent Price</label>
                        <input
                            {...register('price')}
                            type="number"
                            className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
                            placeholder='Price in ETH (Birr)'
                            defaultValue={car?.price}
                        />
                        {errors.price && <p className='text-red-500 text-xs'>{errors.price.message}</p>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-bold'>Capacity</label>
                        <input
                            {...register('capacity')}
                            type="number"
                            className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
                            placeholder="Capacity in persons"
                            defaultValue={car?.capacity}
                        />
                        {errors.capacity && <p className='text-red-500 text-xs'>{errors.capacity.message}</p>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-bold'>Transmission</label>
                        <select
                            {...register('transmission')}
                            className="w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md"
                            defaultValue={car?.transmission}
                        >
                            <option value="">select</option>
                            <option value="Auto">Auto</option>
                            <option value="Manual">Manual</option>
                        </select>
                        {errors.transmission && <p className='text-red-500 text-xs'>{errors.transmission.message}</p>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-bold'>Location</label>
                        <input
                            {...register('location')}
                            placeholder="Your City"
                            className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
                            defaultValue={car?.location}
                        />
                        {errors.location && <p className='text-red-500 text-xs'>{errors.location.message}</p>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-bold'>Fuel Capacity</label>
                        <input
                            {...register('fuelCapacity')}
                            type="number"
                            placeholder="Fuel Capacity in liters"
                            className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
                            defaultValue={car?.fuelCapacity}
                        />
                        {errors.fuelCapacity && <p className='text-red-500 text-xs'>{errors.fuelCapacity.message}</p>}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-bold'>Short Description</label>
                        <input
                            {...register('description')}
                            placeholder="Enter a short Description"
                            className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
                            defaultValue={car?.description}
                        />
                        {errors.description && <p className='text-red-500 text-xs'>{errors.description.message}</p>}
                    </div>
                </div>
            }
            {/* <div className="flex flex-col gap-1 w-full">
                <h3 className='text-xs font-bold'>Upload Images</h3>
                <label
                    htmlFor="images"
                    className="flex flex-col gap-1 justify-center items-center w-full h-52 border-2 border-dashed rounded-sm overflow-auto p-5">
                    {selectedImages.length > 0 ? (
                        <div className="flex flex-wrap justify-center items-center gap-3 w-full">
                            {selectedImages.map((image, index) => (
                                <div key={index} className="w-52 h-52 overflow-hidden rounded-md">
                                    <img src={URL.createObjectURL(image)} alt="Uploaded" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <MdOutlineFileUpload className="text-2xl text__medium" />
                            <p className="text__medium font-bold">Drag and drop an image or Browse</p>
                            <span className="text__medium">High resolution Images (.png .jpg .gif)</span>
                        </>
                    )}
                    {errors.images && <p className='text-red-500 text-xs'>{errors.images.message}</p>}
                </label>
                <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handleFileChange}
                />
            </div> */}
            <div className='mt-6 flex flex-col gap-2 items-end'>
                <button
                    disabled={!car || isLoading || !userID}
                    type="submit"
                    className={`flex items-center justify-center ${!car || isLoading || !userID ? "bg-gray-500" : "btn__bg"} py-2 px-5 text-xs font-medium text-white rounded-md min-w-32 max-w-32`}>
                    Update
                </button>
                {!userID &&
                    <p className='text-red-500 text-sm animate-bounce'>Login First</p>
                }
            </div>
            <Toaster />
        </form>
    )
}

export default EditCarForm