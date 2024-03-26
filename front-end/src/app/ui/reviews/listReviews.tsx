'use client'

import { Film, User } from '@/app/interface/interface';
import React, { useState, useEffect, Suspense } from 'react'
import URLS from '../../services/urls'
import { usePathname, useRouter } from 'next/navigation'
import { Card, CardHeader } from "@material-tailwind/react";
import PostReview from './postReview';
import Cookies from 'js-cookie';


const ListReviews = () => {

  const [review, setReview] = useState<Film[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const path = usePathname();
  const idOfMovie = path.split('/')[2];
  const [refreshPage, setRefreshPage] = useState(Math.random());
  const router = useRouter();
  const token = Cookies.get('csrftoken');
  const [userData, setUserData] = useState<User>();

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
    const fetchData = async () => {
      try {
        await URLS.getById(idOfMovie).then((response) => {
          setReview([response.data]);
        })

      } catch (error) {
        router.push("/notFound")
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [router,refreshPage, idOfMovie]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const usersPromises = review.flatMap(film =>
          film.reviewIds && film.reviewIds.map(async review => {
            const response = await URLS.getOneUser(review.user);
            return response.data;
          })
        );
        const usersData = await Promise.all(usersPromises);
        setUsers(usersData);
      } catch (error) {
        console.error("error", error);
      }
    };


    getUser();
  }, [review]);

  const handleRefresh = async () => {
    try {
      const response = await URLS.getById(idOfMovie);
      setReview([response.data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } 
  };


  return (
    <>
      <main className="text-white">
        {review.map((film) => {
          
          return (
           
            <div key={film.imdbId} className='flex flex-col lg:flex-row '>
              
              <Card placeholder={'card'}
                shadow={true}
                className="flex-initial relative grid h-[45rem] w-full lg:max-w-[28rem]"
              >
                <CardHeader placeholder={'card header'}
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
                  style={{ backgroundImage: `url(${film?.poster})` }}
                >
                  <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                </CardHeader>
              </Card>
              
              <div className='lg:ml-96 w-96 h-auto mt-8'>
                <Suspense fallback={<p>Loading review...</p>}>
                  <PostReview id={film.imdbId} handleRefresh={handleRefresh} />
                </Suspense>

                {film.reviewIds && film.reviewIds.map((review, index) => (
                  <div className='text-white pb-6' key={index}>
                    {users[index] && <div className="text-red-500 pb-1">{users[index].username} at {review.dateCreated} : <br />
                    </div>}
                    <div className='ml-6'>
                      {review.body}
                    </div><hr />

                  </div>
                ))}

              </div>
            </div>
          )

        })}
      </main>

    </>
  )
}

export default ListReviews;
