import React from 'react';
import SearchInput from './SearchInput';


function Hero(props) {
    return (
       <>
       <div className='bg-hero-pattern h-[70vh] content-center text-center relative overflow-hidden bg-cover'>
        <span className="font-extrabold text-8xl text-inherit text-white my-4">
        Mealo
        </span>
        <h1 className='font-bold text-3xl text-inherit text-white my-4'>
            Discover the best food & drinks
            </h1>
            <div className='content-center flex justify-center my-4'>
            <SearchInput />
            </div>
        </div>
       </>
       
    );
}

export default Hero;