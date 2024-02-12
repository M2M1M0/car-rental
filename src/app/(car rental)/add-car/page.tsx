"use client"
import { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

const initialCarsData = {
  title: "",
  type: "0",
  price: 0,
  capacity: 0,
  transmission: "0",
  location: "",
  fuelCapacity: 0,
  description: "",

}
const page = () => {
  const [carForm, setCarForm] = useState(initialCarsData)
  const [images, setImages] = useState(null)

  const handleChange = (e: any) => {
    setCarForm({ ...carForm, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: any) => {
    setImages(e.target.files)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (carForm.type === "0") {
      alert("Please Select Car Type")
    } else if (carForm.transmission === "0") {
      alert("Please Select Transmission")
    } else alert("Submitted Success")

  }


  return (
    <section className='md:px-16'>
      <main className='md:mx-16 my-4 p-3 bg-white'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 p-4'>
          <div className='leading-3'>
            <h3 className='text-sm font-semibold'>Add a Car for Rent </h3>
            <span className='text__medium'>please enter your car info</span>
          </div>
          <h1 className='text-md text-blue-500 font-normal'>Car info</h1>
          <div className='grid md:grid-cols-2 gap-3 md:gap-x-6 gap-y-8 p-2'>
            <div className='flex flex-col gap-1'>
              <label className='text-xs font-bold'>Car Title</label>
              <input type="text" name="title" onChange={handleChange}
                className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
                placeholder='Your Title' />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-xs font-bold'>Car Type</label>
              <select name="type" onChange={handleChange}
                className="w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md">
                <option value="0">select</option>
                <option value="Sport">Sport</option>
                <option value="SUV">SUV</option>
                <option value="MPV">MPV</option>
                <option value="Sedan">Sedan</option>
                <option value="Couple">Couple</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-xs font-bold'>Rent Price</label>
              <input type="number" name="price" onChange={handleChange}
                className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
                placeholder='Price in ETH (Birr)' />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-xs font-bold'>Capacity</label>
              <input type="number" name="capacity" onChange={handleChange}
                className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md'
                placeholder="Capacity in persons" />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-xs font-bold'>Transmission</label>
              <select name="transmission" onChange={handleChange}
                className="w-full bg-[#f1f1f1] p-2 outline-none text-sm rounded-md">
                <option value="0">select</option>
                <option value="Auto">Auto</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-xs font-bold'>Location</label>
              <input type="text" name="location" onChange={handleChange} placeholder="Your City"
                className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md' />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-xs font-bold'>Fuel Capacity</label>
              <input type="number" name="fuelCapacity" onChange={handleChange} placeholder="Fuel Capacity in liters"
                className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md' />
            </div>
            <div className='flex flex-col gap-1'>
              <label className='text-xs font-bold'>Short Description</label>
              <input type="text" name="description" onChange={handleChange} placeholder="Enter a short Description"
                className='bg-[#f1f1f1] p-2 outline-none text-sm rounded-md' />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <h3 className='text-xs font-bold'>Upload Images</h3>
            <label htmlFor="images"
              className="flex flex-col gap-1 justify-center items-center w-full h-52 border-2 border-dashed rounded-sm">
              <MdOutlineFileUpload className="text-2xl text__medium" />
              <p className="text__medium font-bold">Drag and drop an image or Browse</p>
              <span className="text__medium">High resolution Images (.png .jpg .gif)</span>
            </label>
            <input onChange={handleFileChange}
              type="file" id="images" name="images" accept="image/*" multiple hidden />
          </div>
          <div className='my-6 flex justify-end'>
            <button type="submit"
              className="btn__bg py-2 px-5 text-xs font-medium text-white rounded-md">
              Register Car
            </button>
          </div>
        </form>
      </main>
    </section>
  )
}

export default page