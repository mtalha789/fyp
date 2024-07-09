import React from 'react';
// import logo from "../../images/Domino's_pizza_logo.svg.png" 

function BrandCard({goto,BrandLogo,BrandName}) {
   
    return (
        <>
           <section className='bg-white rounded-full w-40 h-40 '>
                <section className='w-40 h-40 '>
                    <a href={goto}>
                        <img src={BrandLogo} alt="" className='w-40 h-40 flex justify-center ' />
                        <h1 className='font-medium text-xl flex justify-center content-center mt-4 pr-4'>{BrandName}</h1>
                    </a>
                </section>
            </section> 
        </>
    );
}

export default BrandCard;