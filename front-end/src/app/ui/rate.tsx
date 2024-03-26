import React, { useState, useEffect } from 'react'
import { Rating } from '../interface/interface'
import URLS from '../services/urls';
import CSRFToken from '../services/csrfToken';

export default function Rate({ id }: any) {
    const [rate, setRate] = useState<Rating>({ rate: 0 });
    const [dataRate, setDataRate] = useState();
    const [usersRating, setUsersRating] = useState();

    const ratingFilm = async (id: any) => {
        try {
            const response = await URLS.rating_film(id)
            const data = await response.data
            setDataRate(data?.average_rating);
            setUsersRating(data?.total_users)
            if (data && data.ratings && data.ratings.length > 0 && data.ratings[0].rating) {
                setRate({ rate: data.ratings[0].rating });
            } else {
                setRate({ rate: 0 }); 
            }


        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        ratingFilm(id);
    }, [id])

    async function postRating(addFormData: Rating) {
        URLS.created_rate(id, addFormData).then(response => {

        })
            .catch(e => {
                console.log(e);
            });
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setRate({
            ...rate,
            rate: parseFloat(value) 
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await postRating(rate);
        setTimeout(() => {
            ratingFilm(id)
        }, 400);
        
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='self-center content-center mt-2 '>
                <CSRFToken />
                <div className="flex flex-row-reverse justify-end items-center relative">
                    <p className="text-xs font-medium text-white underline hover:no-underline"> {usersRating} reviews</p>
                    <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                    <input id="hs-ratings-readonly-1" type="radio" className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="5" onChange={handleChange} checked={rate.rate === 5} />
                    <label htmlFor="hs-ratings-readonly-1" className="pointer-events-none peer-checked:text-yellow-600 text-gray-600">
                        <svg className="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                    </label>
                    <input id="hs-ratings-readonly-2" type="radio" className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="4" onChange={handleChange} checked={rate.rate === 4} />
                    <label htmlFor="hs-ratings-readonly-2" className="pointer-events-none peer-checked:text-yellow-600 text-gray-600">
                        <svg className="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                    </label>
                    <input id="hs-ratings-readonly-3" type="radio" className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="3" onChange={handleChange} checked={rate.rate === 3} />
                    <label htmlFor="hs-ratings-readonly-3" className="pointer-events-none peer-checked:text-yellow-600 text-gray-600">
                        <svg className="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                    </label>
                    <input id="hs-ratings-readonly-4" type="radio" className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="2" onChange={handleChange} checked={rate.rate === 2} />
                    <label htmlFor="hs-ratings-readonly-4" className="pointer-events-none peer-checked:text-yellow-600 text-gray-600">
                        <svg className="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                    </label>
                    <input id="hs-ratings-readonly-5" type="radio" className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0" name="hs-ratings-readonly" value="1" onChange={handleChange} checked={rate.rate === 1} />
                    <label htmlFor="hs-ratings-readonly-5" className="pointer-events-none peer-checked:text-yellow-600 text-gray-600">
                        <svg className="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                    </label>

                    <p className="ms-1 text-xs font-medium  text-gray-400 mr-2">5</p>
                    <p className="ms-1 text-xs font-medium  text-gray-400">out of</p>
                    <p className="ms-1 text-xs font-medium  text-gray-400">{dataRate}</p>
                </div>

                <button className="w-full mt-2 shadow-lg shadow-purple-800/80 py-2.5 px-5 me-2  text-sm font-medium rounded-full borde bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700 ">Rate</button>

            </form>
        </>
    )
}
