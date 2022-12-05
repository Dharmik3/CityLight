import React from 'react'
import Delivery from '../img/delivery.png'
import HeroBg from '../img/heroBg.png'
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
              <button type='button' className='bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-100 ease-in-out md:w-auto'>Order Now</button>
             </div>
             <div className='py-2 flex-1 flex items-center'>
                 <img src={HeroBg} alt="hero-bg" className='lg:h-650 h-420 ml-auto w-full lg:w-full' />
                 <div className='w-full h-full absolute flex items-center justify-center'></div>
             </div>
</section>
  )
}

export default HomeContainer;