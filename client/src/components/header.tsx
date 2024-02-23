"use client"
import { usePathname, useRouter } from "next/navigation"
import Logo from "./logo"
import Link from "next/link"
import { Links } from "@/constants"
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from "next/image"
import { User } from "@/helper"



const Header = () => {
    const pathName = usePathname()
    const { data: session } = useSession();
    const router = useRouter()

    // Get user
    const currentUser = User()

    //
    const logout = () => {
        signOut()
        router.replace("/")
    }

    return (
        <>
            <header className='sticky z-50 top-0 w-full p-5 bg-white flex justify-between items-center'>
                <Logo />
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
                        <div className="flex gap-2 items-center">
                            <button className="btn__bg py-1 px-3 text-xs text-white rounded-md hidden md:flex"
                                onClick={logout}>
                                Sign out
                            </button>
                            {
                                //@ts-ignore
                                <Link href={`/me/${session?.user?._id}`}>
                                    <Image
                                        src={`/${currentUser?.profilePicture}`}
                                        alt="Profile"
                                        width={20}
                                        height={20}
                                        className="!w-8 !h-8 rounded-full object-cover" />
                                </Link>
                            }
                        </div>
                    )
                }
                {/* <button onClick={async () => {
                    const result: any = await signIn();

                    alert(result)
                    if (result.error) {
                        // Handle the error
                        console.log(result.error, "Error")
                    }
                }}>Sign in</button> */}
                {/* <Link href="/me" >
                    <Image
                        src="/nissan-gt-r.jpg"
                        alt="Profile"
                        width={20}
                        height={20}
                        className="!w-8 !h-8 rounded-full object-cover" />
                </Link> */}
            </header>
        </>
    )
}

export default Header