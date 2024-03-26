'use client'

import React, { useState, useEffect } from 'react'
import URLS from '../services/urls';
import { Film, User } from '../interface/interface';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Image from 'next/image';
import WatchButton from './movie/watchButton';
import Rate from './rate';


export default function WatchListPage() {
  const [watch, setWatch] = useState<Film[]>([]);
  const [userData, setUserData] = useState<User>();
  const router = useRouter()
  const token = Cookies.get('csrftoken');
  const [showNothingYet, setShowNothingYet] = useState(false);

  

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
      if(!token || userData && userData.username === '' ){
        
        router.push("/movies")
      }
    };

    fetchUserData();
  }, [router,userData,token]);


  useEffect(() => {
    async function fetchWatchList() {
      try {
        const response = await URLS.userWatch();
        setWatch(response.data);
      } catch (error) {
        console.error('Error fetching watch list:', error);
      }
    }

    fetchWatchList();
    setTimeout(() => {
      setShowNothingYet(true);
    }, 2000);
  }, []);

  return (
    <>
  
        {watch.length === 0 && showNothingYet ? 
        <div className='text-white m-4'>Nothing in watch list go and add some movie</div>  
        : 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 pl-3 pr-3 gap-5 flex-wrap justify-center">
        {watch.map((movie, index) => {
          return (
            <div key={index} className='flex flex-col'>
                <article key={movie.imdbId} className=" group/item hover:opacity-60 w-full h-full relative isolate flex flex-col justify-end rounded-2xl px-8 p-52 max-w-sm mx-auto mt-8 ">
                    <Link href={`/trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                        <Image src={movie.backdrops[3]} loading="lazy" sizes="1200px" quality={100} width={1200} height={1200} alt="University of Southern California " className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                        <div className='absolute top-0 group-hover/item:invisible'>
                            <h3 className="z-10 text-3xl font-bold text-white"> {movie.title} </h3>
                        </div>
                    </Link>
                    <div className='relative h-1 mb-10 flex flex-col self-center content-center group/edit invisible group-hover/item:visible '>

                        <WatchButton imdbId={movie.imdbId} />


                        {token && userData && userData.username !== '' ?
                            <button onClick={() => router.push(`reviews/${movie.imdbId}`)} className="relative  shadow-lg shadow-purple-800/80 py-2.5 px-5 me-2 mb-2 text-sm font-medium  focus:outline-none  rounded-full border    focus:z-10 focus:ring-4  focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 ">
                                Reviews
                            </button>
                            :
                            ''
                        }

                    </div>

                </article >
                {token && userData && userData.username !== '' ?
                <Rate id={movie.id} />
                :
                ''
                }
            </div>
        )
        })
        }
        </div>
        }
      
    </>
  );
}