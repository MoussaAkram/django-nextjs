'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { User } from '../../interface/interface'
import URLS from '../../services/urls'
import { useRouter } from 'next/navigation'


export default function Header() {
    const pathname = usePathname();
    const [userData, setUserData] = useState<User>();
    let [isModalOpen, setIsModalOpen] = useState(false);
    const [watchModal, setWatchModal] = useState(false);
    const token = Cookies.get('csrftoken');
    const router = useRouter()
    const mystyle = {
        width: '1em',
        height: '1em',
        verticalAlign: 'middle', 
        fill: 'currentColor',
        overflow: 'hidden',
    };
    function showModel() {
        setIsModalOpen(!isModalOpen);
    }
    function ModalOpen() {
        setWatchModal(!watchModal);
    }

    async function dologout() {
        await URLS.doLogout().then(response => {
            if(pathname.startsWith("movies")){
                location.reload();
            }
            else{
                location.replace('/movies')
            
            }

        })
    }

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                try {
                    const response = await URLS.getUser()
                    const data = await response.data
                    setUserData(data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, [token]);

    return (
        <>
            <header>
                <nav className="bg-gray-800 border-gray-200 px-4 lg:px-6 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <div className="flex items-center  order-2">
                            {token && userData && userData.username !== '' ?
                                <div className="flex items-center justify-between">
                                    <div className=" flex items-center">
                                        <button onClick={showModel} className="flex items-center gap-3 text-white hover:bg-gray-500 hover:text-gray-700 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                                            <Image
                                                src="https://upload-os-bbs.hoyolab.com/upload/2022/09/16/074db8f69d6b4eb66139b837405416f6_2637497491200521781.png"
                                                className="rounded-full"
                                                alt={`${userData.username}'s profile picture`}
                                                width={28}
                                                height={28}
                                            />
                                            <p>{userData.username}</p>
                                        </button>

                                        <button onClick={dologout} className={`flex items-center  absolute  hover:bg-slate-400 right-16 top-12 z-10 mt-3 lg:w-40 max-w-md overflow-hidden rounded-3xl bg-gray-600 shadow-lg ring-1 ring-gray-900/5 ${isModalOpen ? '' : 'hidden'}`} >
                                            <div className="p-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" style={mystyle} viewBox="0 0 1024 1024" version="1.1"><path d="M768 106V184c97.2 76 160 194.8 160 328 0 229.6-186.4 416-416 416S96 741.6 96 512c0-133.2 62.8-251.6 160-328V106C121.6 190.8 32 341.2 32 512c0 265.2 214.8 480 480 480s480-214.8 480-480c0-170.8-89.6-321.2-224-406z" fill="" /><path d="M512 32c-17.6 0-32 14.4-32 32v448c0 17.6 14.4 32 32 32s32-14.4 32-32V64c0-17.6-14.4-32-32-32z" fill="" /></svg>
                                            </div>
                                            <div className='pr-6'>Log out</div>

                                        </button>

                                    </div>
                                </div>
                                :
                                <Link href="/login" className="text-white bg-gray-700 hover:bg-gray-300 hover:text-gray-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 ">Log in</Link>
                            }
                        </div>
                        <div className="flex w-auto order-1 justify-between items-center" id="menu">
                            <ul className="flex flex-col-2 mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <Link href="/movies" className={clsx(
                                        "block py-2 pr-4 pl-3 lg:border-0  lg:p-0 text-gray-400 lg:hover:text-white hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700",
                                        {
                                            'text-white': pathname === '/movies',
                                        },
                                    )}
                                    >Home</Link>
                                </li>
                                {token && userData && userData.username !== '' ?
                                    <li>

                                        <Link href="/watchlist" className={clsx(
                                            "block py-2 pr-4 pl-3 lg:border-0  lg:p-0 text-gray-400 lg:hover:text-white hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700",
                                            {
                                                'text-white': pathname === '/watchlist',
                                            },
                                        )}
                                        >Watch List</Link>
                                    </li>
                                    :
                                    <li>
                                        <button onClick={ModalOpen} className="block py-2 pr-4 pl-3 lg:border-0  lg:p-0 text-gray-400 lg:hover:text-white hover:bg-gray-700 hover:text-white lg:hover:bg-transparent border-gray-700"
                                        >Watch List</button>
                                        <div className={`${watchModal ? '' : 'hidden'} absolute  z-20`} >
                                                                <div className="h-screen w-screen bg-black opacity-80 fixed top-0 right-0"></div>
                                                                <div id="deleteModal" aria-hidden="true" className=" justify-center  grid content-center fixed top-0 overflow-y-auto overflow-x-hidden right-0 left-0 z-50  items-center w-full md:inset-0 h-modal md:h-full">
                                                                    <div className="relative p-4 w-full max-w-md h-full md:h-auto">

                                                                        <div className="relative p-4 text-center  rounded-lg shadow bg-gray-800 sm:p-5">
                                                                            <button onClick={ModalOpen} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white" data-modal-toggle="deleteModal">
                                                                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                                                <span className="sr-only">Close modal</span>
                                                                            </button>
                                                                            <svg className="mx-auto mb-4  w-12 h-12 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                            </svg>
                                                                            <p className="mb-4 w-80 text-gray-300">You need to login first</p>
                                                                            <div className="flex justify-center items-center space-x-4">
                                                                                <button onClick={ModalOpen} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium rounded-lg border focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">
                                                                                    No, cancel
                                                                                </button>
                                                                                <button  onClick={() => router.push(`login`)} type="submit" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 shadow-lg shadow-purple-800/80">
                                                                                    Go to login page
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                    </li>
                                }


                            </ul>
                        </div>
                    </div>
                </nav >
            </header >

        </>
    )
}
