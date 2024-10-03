"use client";

import { useState, useEffect } from 'react';

const DataPage = () => {
    const [filter, setFilter] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/getStuden?student_name=${encodeURIComponent(filter)}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();

                if (result.statusCode === 200) {
                    const filteredData = result.data.map((item, index) => ({
                        id: index,
                        student_name: item.student_name,
                        school: item.school,
                        payment_status: item.payment_status,
                        created_at: item.created_at
                    }));
                    setData(filteredData);
                } else {
                    console.error("Data tidak tersedia");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        const debounceFetch = setTimeout(() => {
            fetchData();
        },);

        return () => clearTimeout(debounceFetch);
    }, [filter]);

    return (
        <div className='bg-white min-h-screen flex flex-col  items-center'>
            <div className='w-full max-w-[430px] mx-auto p-3 border-2 border-gray-300'>
                <nav className='border-b-2 border-gray-300 -mx-3 -my-3 p-4 mb-5 max-w-[551px] relative left-0 right-0'>
                    <div className='relative flex items-center'>
                        <img src='/logo.png' alt='Logo' className='w-[40px] h-[40px] mr-4' />
                        <p className='text-black text-[20px]'>
                            Applicant / <span className='italic'>Pendaftar</span>
                        </p>
                    </div>
                </nav>
                <div className='relative mb-5 w-full'>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className='border-2 text-[20px] border-gray-300 text-black rounded-lg py-3 w-full pl-12' // tambahkan pl-12 untuk ruang ikon
                    />
                    {/* Ikon search */}
                    <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a7 7 0 015.938 11.031l4.72 4.719a1 1 0 01-1.414 1.414l-4.72-4.719A7 7 0 1111 4zm0 2a5 5 0 100 10 5 5 0 000-10z" />
                        </svg>
                    </div>
                </div>


                {/* Header for the table */}
                <div className='relative bg-gray-200 w-full rounded-lg'>
                    <div className='border-4 border-gray-300 rounded-lg text-[18px] py-3 w-full'>
                        <p className='text-black ml-3'>Applicant | School | Registration</p>
                    </div>
                </div>

                {loading ? (
                    <div className='w-full min-w-full h-full min-h-full'>
                        <p className='mt-2 text-center text-gray-500'>Loading data...</p>
                    </div>
                ) : (
                    <ul className='w-full mt-3'>
                        {data.map((item, index) => (
                            <li key={index} className='border-2 border-gray-300 rounded-[5px] mt-2 py-2 px-4'>
                                <p className='text-gray-400 text-[14px]'>{new Date(item.created_at).toLocaleString()}</p>
                                <div className='flex flex-row'>
                                    <p className='pr-2 border-r-2 border-gray-300 text-black'>{item.student_name}</p>
                                    <p className='pr-4 border-r-2 border-gray-300 ml-2 text-black'>{item.school}</p>
                                    <div className={`flex items-center ml-4 px-2 py-1 rounded ${item.payment_status === 'complete' ? 'bg-green-200' : 'bg-red-200'}`}>
                                        {item.payment_status === 'complete' ? (
                                            <svg className='w-4 h-4 text-green-600' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                                <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7'></path>
                                            </svg>
                                        ) : (
                                            <svg className='w-4 h-4 text-red-600' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12'></path>
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <a
                href="https://wa.me/6285186689140" // Ganti dengan nomor WhatsApp yang diinginkan
                className="fixed bottom-5 right-5 bg-green-500 p-3 rounded-full shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="/icon-whasapp.png" // Ganti dengan path gambar WhatsApp yang diinginkan
                    alt="WhatsApp"
                    className="h-8 w-8" // Mengatur ukuran gambar
                />
            </a>
        </div>
    );
};

export default DataPage;
