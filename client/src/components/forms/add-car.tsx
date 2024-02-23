"use client"
import { useEffect, useState } from 'react';
import * as Z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { MdOutlineFileUpload } from "react-icons/md";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { VscLoading } from 'react-icons/vsc';
import { useSession } from 'next-auth/react';


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
    images: Z.array(Z.string()).nonempty({ message: "At least one image is required" }),
});


const AddCarForm = () => {

    const { data: session } = useSession();
    // @ts-ignore
    const userID = session?.user?._id;

    const router = useRouter()
    const { register, handleSubmit, setValue, formState: { errors, isValid, isLoading } } = useForm<FormValues>({
        resolver: zodResolver(addCarSchema),
        // defaultValues: {
        //     price: 0, // Default value for price
        // }
    });

    useEffect(() => {
        register('images'); // manually register the file input
    }, [register]);


    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedImages(filesArray);
            const fileNames = filesArray.map(file => file.name);
            setValue('images', fileNames);
        }
    };

    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "",
    };

    const onSubmit = async (data: FormValues) => {
        console.log(errors);
        // Handle form submission here 
        data.owner = userID
        try {
            await axios.post(`${process.env.BASE_API_URL}car/add-car`, data, { headers })
            toast.success("Car Registered SuccessFully")
            router.push("/")
        } catch (error) {
            console.log(error)
        }

    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-3 p-4'>
            <div className='leading-3'>
                <h3 className='text-sm font-semibold'>Add a Car for Rent </h3>
                <span className='text__medium'>please enter your car info</span>
            </div>
            <h1 className='text-md text-blue-500 font-normal'>Car info</h1>
            <div className='grid md:grid-cols-2 gap-3 md:gap-x-6 gap-y-8 p-2'>
                <div className='flex flex-col gap-1'>
                    <label className='text-xs font-bold'>Car Title</label>
                    <input
                        {...register('title')}
                        className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
                        placeholder='Your Title' />
                    {errors.title && <p className='text-red-500 text-xs'>{errors.title.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-xs font-bold'>Car Type</label>
                    <select
                        {...register('type')}
                        className="w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md">
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
                        placeholder='Price in ETH (Birr)' />
                    {errors.price && <p className='text-red-500 text-xs'>{errors.price.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-xs font-bold'>Capacity</label>
                    <input
                        {...register('capacity')}
                        type="number"
                        className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
                        placeholder="Capacity in persons" />
                    {errors.capacity && <p className='text-red-500 text-xs'>{errors.capacity.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-xs font-bold'>Transmission</label>
                    <select
                        {...register('transmission')}
                        className="w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md">
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
                        className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md' />
                    {errors.location && <p className='text-red-500 text-xs'>{errors.location.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-xs font-bold'>Fuel Capacity</label>
                    <input
                        {...register('fuelCapacity')}
                        type="number"
                        placeholder="Fuel Capacity in liters"
                        className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md' />
                    {errors.fuelCapacity && <p className='text-red-500 text-xs'>{errors.fuelCapacity.message}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-xs font-bold'>Short Description</label>
                    <input
                        {...register('description')}
                        placeholder="Enter a short Description"
                        className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md' />
                    {errors.description && <p className='text-red-500 text-xs'>{errors.description.message}</p>}
                </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
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
            </div>
            <div className='my-6 flex justify-end'>
                <button
                    disabled={isLoading}
                    type="submit"
                    className={`$ btn__bg py-2 px-5 text-xs font-medium text-white rounded-md`}>
                    {isLoading ? <VscLoading /> : "Register Car"}
                </button>
            </div>
            <Toaster />
        </form>
    )
}

export default AddCarForm