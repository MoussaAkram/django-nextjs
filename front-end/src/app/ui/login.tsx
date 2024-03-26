'use client'

import React, { useState, useEffect, Suspense } from 'react'
import URLS from '../services/urls';
import { User } from '../interface/interface';
import { useRouter } from 'next/navigation';
import CSRFToken from '../services/csrfToken';
import Link from 'next/link';

export default function Login() {
    const [formData, setFormData] = useState<User>({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.username == '' || formData.password == '') {
            setErrorMessage('Please fill in all fields.');
        }
        else {
            setErrorMessage('');
            postLog(formData);
            setFormData({ username: '', password: '' });
        }
    };

    async function postLog(addFormData: User) {
         await URLS.login(addFormData).then(response => {
                router.push('/movies')
        })
            .catch((e) => {
                setErrorMessage('wrong information.');
            });

    }

    return (
        <>

            <div>
                <div className="relative min-h-screen  grid bg-black ">
                    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
                        <div className=" sm:w-1/2 xl:w-3/5 bg-black h-full w-4/5 md:flex flex-auto items-center justify-center p-10 overflow-hidden  text-white bg-no-repeat bg-cover relative" style={{ backgroundImage: "url(https://i.pinimg.com/originals/52/53/cf/5253cf935d176074e92fc1eb8ae9c30a.jpg)" }} >
                            <div className="absolute bg-black  opacity-25 inset-0 z-0"></div>
                            <div className="w-full  lg:max-w-2xl md:max-w-md z-10 items-center text-center ">
                                <div className=" font-bold leading-tight mb-6 mx-auto w-full content-center items-center ">

                                </div>
                            </div>
                        </div>

                        <div className="md:flex md:items-center md:justify-left w-full sm:w-auto md:h-full xl:w-1/2 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none ">
                            <div className="max-w-xl w-full space-y-12">
                                <div className="lg:text-left text-center">

                                    <div className="flex items-center justify-center ">
                                        <div className="bg-black flex flex-col w-80 border border-gray-900 rounded-lg px-8 py-10">

                                            <form onSubmit={handleSubmit} className="flex flex-col space-y-5 mt-5">
                                                <CSRFToken />
                                                <label htmlFor='username_input' className="font-bold text-lg text-white " >Username:</label>
                                                <input id="username_input" value={formData.username || ''} onChange={handleChange} name='username' type="text" placeholder="username" className="border rounded-lg py-3 px-3 mt-2 bg-black border-indigo-600 placeholder-white-500 text-white" />
                                                <label htmlFor='password' className="font-bold text-lg text-white">Password:</label>
                                                <input id="password" value={formData.password || ''} onChange={handleChange} name='password' type="password" placeholder="****" className="border rounded-lg py-3 px-3 bg-black border-indigo-600 placeholder-white-500 text-white" />
                                                <div className='pt-4'>
                                                    <button className="border h-full w-full border-indigo-600 bg-black text-white rounded-lg py-3 font-semibold" >Login</button>
                                                </div>
                                            </form>
                                            {errorMessage && (
                                                <div className="error-message p-4 mt-4 text-sm = rounded-lg  bg-gray-800 text-yellow-300" role="alert">
                                                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                                                    <span className="sr-only">Info</span>
                                                    {errorMessage}
                                                </div>
                                            )}
                                            <p className="text-sm  font-light text-gray-400 mt-5">
                                                Don’t have an account yet? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here.</Link>
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>

        </>
    )
}
