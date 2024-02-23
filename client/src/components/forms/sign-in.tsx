"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form"
import { useMutation } from "react-query";

import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { signIn } from "next-auth/react";

interface IFormInput {
    username: string
    password: string
}

const SignInForm = () => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit } = useForm<IFormInput>()

    const userLogin = async (userData: any) => {

        try {
            setIsLoading(true)
            const result = await signIn('credentials', {
                username: userData.username,
                password: userData.password,
                redirect: true,
                callbackUrl: "/"
            });

            if (result?.error) {
                // Handle error (e.g., wrong credentials)
                console.log(result?.error)
                toast.error(result.error);

            } else {
                // No error, proceed to redirect
                toast.success("Login");
                router.prefetch('/');
                router.push(result?.url || "/");
            }
            // const response = await axios.post(
            //     process.env.NEXT_PUBLIC_BASE_URL! + "login",
            //     userData
            // );
            // return response.data.data;

        } catch (error: any) {
            console.log(error);
            toast.error("Wrong Credentials!")

        } finally {
            setIsLoading(false)
        }
    };

    const mutation = useMutation(userLogin);

    const onSubmit: SubmitHandler<IFormInput> = async (userData) => {
        mutation.mutate(userData);

    }


    return (
        <>
            <article className="w-full h-[70vh] flex items-center justify-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-2 p-8 bg-white">
                    <p className="text-center font-bold text-lg uppercase">Sign In</p>

                    <div>
                        <label>Username</label>
                        <input
                            {...register("username")}
                            placeholder="Username"
                            className="border text-sm w-full bg-slate-100 rounded-md p-1.5" />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            {...register("password")}
                            placeholder="Password"
                            type="password"
                            className="border text-sm w-full bg-slate-100 rounded-md p-1.5" />
                    </div>

                    <div className="flex flex-col gap-2 pt-4">
                        <input
                            disabled={isLoading}
                            type="submit"
                            value={"Login"}
                            className="btn__bg px-6 py-1 uppercase rounded-md text-white disabled:bg-white" />

                        <p>
                            Have no account? {" "}
                            <Link href={"/sign-up"}
                                className="text-blue-500">Sign Up</Link>
                        </p>
                    </div>
                    <Toaster />
                </form>
            </article>
        </>
    );
};

export default SignInForm;