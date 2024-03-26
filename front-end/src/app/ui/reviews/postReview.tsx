'use client';

import React, { useState } from 'react'
import { Reviews } from '@/app/interface/interface';
import URLS from '../../services/urls'
import CSRFToken from '@/app/services/csrfToken';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function PostReview({ id, handleRefresh }: any) {
    const [formData, setFormData] = useState<Reviews>({});
    const [submitted, setSubmitted] = useState(false);


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        postReview(formData);
        setFormData({ body: '' });
        setTimeout(() => {
            handleRefresh();
        }, 400);
    };

    async function postReview(addFormData: Reviews) {
        URLS.addReview(id, addFormData).then(response => {
            setSubmitted(true);
        })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CSRFToken />
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">Comment : </label>
                <textarea value={formData.body || ''} onChange={handleChange} name='body' id="message" rows={4} className="block p-2.5 w-full text-sm   rounded-lg border 0   bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." required />
                <div className="lg:ml-72 ml-auto flex items-center justify-between px-3 py-2 border-t border-gray-600">
                    <button type="submit" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Post
                    </button>
                </div>
            </form>
        </>
    )

}

