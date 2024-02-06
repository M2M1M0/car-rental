import Image from "next/image"

const Hero = ({title}: any) => {
    return (
        <section className="flex gap-8 w-full h-48">
            <div className="flex-1 bg-sky-600 rounded-lg p-5 flex flex-col">
                <div className="w-3/4 md:w-3/5 flex flex-col gap-2">
                    <h2 className="text-white text-lg font-medium leading-5">
                        The Best Platform for<br />
                        Car Rent
                    </h2>
                    <p className="text-sm text-slate-200 font-mono leading-4">
                        Ease of doing a car rental safely and
                        reliably Of course at a low price
                    </p>
                    {title}
                </div>
                <div className="relative w-full h-full flex justify-center -mt-12">
                    <Image src="/nissan.png" alt="Hero Car" width={400} height={100}
                        className="object-cover" />
                </div>
            </div>
            <div className="hidden sm:flex flex-1 bg-indigo-700 rounded-lg p-5 flex-col">
                <div className="w-3/5 flex flex-col gap-2">
                    <h2 className="text-white text-lg font-medium leading-5">
                        Easy way to rent a car <br />
                        at a low price
                    </h2>
                    <p className="text-sm text-slate-200 font-mono leading-4">
                        Provide cheap car rental services
                        and safe and comfortable facilities.
                    </p>
                </div>
                <div className="w-full h-full flex justify-end -mt-12">
                    <Image src="/rolls-royce.png" alt="Hero Car" width={400} height={300}
                        className=" h-full w-full object-contain" />
                </div>
            </div>
        </section>
    )
}

export default Hero