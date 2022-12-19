import React from 'react'
import Delivery from '../img/delivery.png'
import HeroBg from '../img/heroBg.png'
import { heroData } from '../utils/data'

 const HomeContainer = () => {
     return (
<section id='home' className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full '>
    <div className='py-2 flex-1 flex flex-col items-start justify-center  gap-6'>
              <div className='flex items-center gap-2 justify-center bg-orange-100 px-2 py-1 rounded-full'>
                  <p className='text-base text-orange-500 font-semibold'>Bike Delivery</p>
                  <div className='w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl'>
                      <img src={Delivery} className="w-full h-full object-contain" alt="" />
                  </div>
              </div>
              <p className='text-[2.5rem] font-bold tracking-wide text-headingColor   lg:text-[4.3rem]'>The Fastest Delivery in <span className='text-orange-600 text-[3rem] lg:text-[5rem]'>Your City</span></p>
                 <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident sed quisquam sapiente ullam nulla vel, quam totam eum a possimus, doloremque accusantium doloribus numquam perferendis porro itaque dolores iusto ratione.</p>
                 <a href="#menu">
                     <button type='button' className='bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-100 ease-in-out md:w-auto'>Order Now</button>
                     </a>
     </div>
    <div className='py-2 flex-1 flex items-center relative'>
        <img src={HeroBg} alt="hero-bg" className='lg:h-650 h-420 ml-auto w-full lg:w-auto' />
             <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center  py-4 gap-4 flex-wrap fle lg:px-14'>  
                     {heroData && heroData.map((elm) => {
                return( <div key={elm.id} className='lg:min-w-[150px] lg:min-h-[230px] lg:max-h-[250px] min-w-[148px] min-h-[153px] p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex items-center justify-center flex-col drop-shadow-md'>
                         <img src={elm.imgSrs} alt="I1" className='w-20 lg:w-40 lg:-mt-20 -mt-10' />
                     <p className='text-base lg:text-lg font-semibold text-textColor mt-2 lg:mt-4'>{ elm.name}</p>
                     <p className='text-[12px] lg:text-sm text-lighttextGray font-semibold lg:my-3 my-1'>{ elm.desc}</p>
                         <p className='text-sm font-semibold text-headingColor'><span className='text-xs text-red-600'>&#8360;</span> {elm.price}</p>
                 </div>)
            })}
                    
         </div>
    </div>        
</section>
  )
}

export default HomeContainer;