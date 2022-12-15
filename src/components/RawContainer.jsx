import React, { useEffect, useRef } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import {motion} from 'framer-motion'

const RawContainer = ({ flag, data, scrollValue }) => {
    const rowContainer = useRef();
    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue;
    },[scrollValue])
    return (
        
        <div
            ref={rowContainer}
            className={`w-full  gap-3 flex items-center my-12 ${flag ? 'overflow-x-scroll scrollbar-none scroll-smooth' : 'overflow-x-hidden flex-wrap'}`}>
          {data && data.map(item => (
            <div key={item?.id} className='w-300 min-w-[300px] md:min-w-340 md:w-340  h-[225px] my-12 bg-cardOverlay rounded-lg p-2 hover:drop-shadow-lg backdrop-blur-md flex flex-col items-center justify-between'>
              <div className='w-full flex items-center justify-between'>
                  <motion.img whileHover={{ scale: 1.2 }} src={item?.imageURL} alt=""
                  className='w-40 -mt-8 drop-shadow-2xl' />
                  <motion.div whileTap={{scale:0.75}} className='w-10 h-10 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md'>
                      <MdShoppingBasket className='text-white'/>
                  </motion.div>
              </div>
              <div className='w-full flex flex-col gap-1 items-end justify-end'>
                      <p className='text-textColor font-semibold text-base md:text-lg'>{item?.title }</p>
                  <p className=' text-sm text-gray-500'>{item?.calories} Calories</p>
                  <div className='flex items-center gap-4'>
                          <p className='text-lg text-headingColor font-semibold'><span className='text-sm text-red-500'>&#8360; </span>{item?.price}</p>
                  </div>
              </div>
          </div>
         ))}
        </div>
  )
}

export default RawContainer