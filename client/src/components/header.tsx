"use client"
import { usePathname, useRouter } from "next/navigation"
import Logo from "./logo"
import Link from "next/link"
import { Links } from "@/constants"
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from "next/image"
import { User } from "@/helper"
import axios from "axios"
import { BiLogOut } from "react-icons/bi"



const Header = () => {
    const pathName = usePathname()
    const { data: session } = useSession();
    const router = useRouter()

    // Get user
    const currentUser = User()
    // console.log(currentUser, "user")

    //
    const logout = async () => {
        await signOut({ redirect: false });
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
        router.push("/")
    }

    return (
        <>
            <header className='sticky z-50 top-0 w-full p-5 bg-white flex flex-col gap-y-2 gap-x-12 md:flex-row justify-between items-center'>
                <Logo />
                <div className="flex justify-between w-full">
                    <ul className="flex items-center gap-x-2 md:gap-x-5">
                        {Links.map((link: any, i: number) => (
                            <Link
                                key={i}
                                href={link?.href as string}
                                className={`${pathName.toString() === link?.href as string && "text-blue-500"} header__link`}
                            >{link?.name}</Link>
                        ))}

                    </ul>

                    {!session
                        ? <button className="btn__bg py-1 px-3 text-xs text-white rounded-md"
                            onClick={() => signIn("credentials", { callbackUrl: "/" })}>
                            Sign in
                        </button>
                        : (
                            <div className="flex gap-3 items-center">
                               
                                <BiLogOut onClick={logout}
                                    className="text-3xl p-1 bg-slate-100 text-red-500 hover:bg-red-300 hover:text-white cursor-pointer border rounded-md" />
                                {
                                    currentUser?.profilePicture &&
                                    //@ts-ignore
                                    <Link href={`/me/${session?.user?._id}`}>
                                        <Image
                                            src={`${currentUser?.profilePicture}`}
                                            alt="Profile"
                                            width={20}
                                            height={20}
                                            className="!w-8 !h-8 rounded-full object-cover" />
                                    </Link>
                                }
                            </div>
                        )
                    }
                </div>

            </header >
        </>
    )
}

export default Header