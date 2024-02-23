import React from 'react'

const PickUp = () => {
    return (
        <section className='w-full p-3 space-y-3'>
            <div className='flex gap-2 items-center'>
                <input type="checkbox" className='w-4! h-4! rounded-full' />
                <label className='text-xs'>Pick-Up</label>
            </div>
            <div className='grid grid-cols-3 gap-5'>
                <div className='flex flex-col gap-2'>
                    <h4 className='text-xs'>Locations</h4>
                    {/* TODO: options */}


                </div>
                <div className='flex flex-col gap-2'>
                    <h4 className='text-xs'>Date</h4>
                    {/* TODO: options */}

                </div>
                <div className='flex flex-col gap-2'>
                    <h4 className='text-xs'>Time</h4>
                    {/* TODO: options */}


                </div>
            </div>
        </section>
    )
}

export default PickUp