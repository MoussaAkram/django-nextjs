'use client'

import { Film, Reviews, User } from "../../interface/interface";
import Image from 'next/image';
import URLS from '../../services/urls';
import React, { useState, useEffect } from "react";
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import Link from "next/link";
import './carousel.model.css'
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";

const Carousels = () => {
    const [poster, setPoster] = useState<Film[]>([]);
    const router = useRouter()
    const [userData, setUserData] = useState<User>();
    const token = Cookies.get('csrftoken');
    const [isModalOpen, setIsModalOpen] = useState(false);

    function showModel() {
        setIsModalOpen(!isModalOpen);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await URLS.getAll();
                setPoster(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, []);

    return (
        <>
            <div className='movie-carousel-container'>
                <Carousel>
                    {poster?.map((movie) => {
                        return (
                            <Paper key={movie.imdbId}>

                                <div className='movie-card-container'>
                                    <div className="movie-card" style={{ '--img': `url(${movie.backdrops[0]})` } as React.CSSProperties}>
                                        <div className="movie-detail">
                                            <div className="movie-poster">
                                                <Image src={movie.poster} alt="movie poster" width={560} height={620} />
                                            </div>
                                            <div className="movie-title">
                                                <h4>{movie.title}</h4>
                                            </div>

                                            <div className="movie-buttons-container">
                                                <Link href={`/trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>

                                                    <div className="absolute inset-y-0 grid items-center">
                                                        <div className="hover:scale-125 hover:duration-300 w-10 h-10 bg-transparent rounded-full ring-4 ring-white grid place-items-center">
                                                            <svg className="ml-1 w-4" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15 7.26795C16.3333 8.03775 16.3333 9.96225 15 10.7321L3 17.6603C1.66667 18.4301 1.01267e-06 17.4678 1.07997e-06 15.9282L1.68565e-06 2.0718C1.75295e-06 0.532196 1.66667 -0.430054 3 0.339746L15 7.26795Z" fill="white" />
                                                            </svg>
                                                        </div>

                                                    </div>

                                                </Link>

                                                <div className="movie-review-button-container">
                                                    {token && userData && userData.username !== '' ?
                                                        <button onClick={() => router.push(`reviews/${movie.imdbId}`)} className="shadow-lg shadow-blue-500/50 bg-transparent relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-transparent to-purple-400 hover:bg-gradient-to-bl hover:text-white focus:outline-none focus:ring-pink-200 ">
                                                            <span className="bg-transparent relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0">
                                                                Reviews
                                                            </span>
                                                        </button>
                                                        :
                                                        <div>
                                                            <button onClick={showModel} className="shadow-lg shadow-blue-500/50 bg-transparent relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-transparent to-purple-400 hover:bg-gradient-to-bl hover:text-white focus:outline-none focus:ring-pink-200 ">
                                                                <span className="bg-transparent relative px-5 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0">
                                                                    Reviews
                                                                </span>
                                                            </button>
                                                            <div className={`${isModalOpen ? '' : 'hidden'} absolute  z-20`} >
                                                                <div className="h-screen w-screen bg-black opacity-80 fixed top-0 right-0"></div>
                                                                <div id="deleteModal" aria-hidden="true" className=" justify-center  grid content-center fixed top-0 overflow-y-auto overflow-x-hidden right-0 left-0 z-50  items-center w-full md:inset-0 h-modal md:h-full">
                                                                    <div className="relative p-4 w-full max-w-md h-full md:h-auto">

                                                                        <div className="relative p-4 text-center  rounded-lg shadow bg-gray-800 sm:p-5">
                                                                            <button onClick={showModel} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white" data-modal-toggle="deleteModal">
                                                                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                                                <span className="sr-only">Close modal</span>
                                                                            </button>
                                                                            <svg className="mx-auto mb-4  w-12 h-12 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                            </svg>
                                                                            <p className="mb-4 w-80 text-gray-300">You need to login first</p>
                                                                            <div className="flex justify-center items-center space-x-4">
                                                                                <button onClick={showModel} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium rounded-lg border focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">
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
                                                        </div>

                                                    }

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>


                        )
                    })
                    }
                </Carousel>
            </div>
        </>
    );
};

export default Carousels;
