import React, { useState, useEffect } from 'react';
import URLS from '@/app/services/urls';
import { Film, User } from '@/app/interface/interface';
import Cookies from 'js-cookie';

export default function WatchButton({ imdbId }: any) {
    const [watch, setWatch] = useState<Film[]>([]);
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
        };

        fetchUserData();
    }, [token]);

    useEffect(() => {
        async function checkWatchStatus() {
            if (token && userData && userData?.username !== '') {
            try {
                const response = await URLS.userWatch();
                console.log('http', response.data); 
                setWatch(response.data instanceof Array ? response.data : []);
            } catch (error) {
                console.error('Error fetching watch list:', error);
            }
        }
    }
       
        checkWatchStatus();
        
    }, [token,userData,imdbId]);

    async function addToWatchList(id: any) {
        try {
            const response = await URLS.watch_list(id);
            setWatch(response.data);
        } catch (error) {
            console.error('Error adding/removing from watch list:', error);
        }
        try {
            const response = await URLS.userWatch();
            console.log('http', response.data); 
            setWatch(response.data instanceof Array ? response.data : []);
        } catch (error) {
            console.error('Error fetching watch list:', error);
        }
    }

    const isInWatchList = watch instanceof Array && watch.some(film => film.imdbId === imdbId);

    return (
        <div>
        {token && userData && userData.username !== '' ?
        <button onClick={() => addToWatchList(imdbId)} type="button" className="z-10 w-full shadow-lg shadow-purple-800/80 py-2.5 px-5 me-2 mb-2 text-sm font-medium focus:outline-none rounded-full border focus:z-10 focus:ring-4 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700">
            {isInWatchList ?
                'Remove from watch list'
                :
                'Add to watch list'
            }
        </button>
        :
        ''
}
</div>
    );
}