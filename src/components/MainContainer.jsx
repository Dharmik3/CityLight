import React from 'react'
import { HomeContainer,FruitsBar,MenuContainer } from '../components'

const MainContainer = () => {
  
  return (
      <div className='flex flex-col w-full h-auto items-center justify-center'>
          <HomeContainer/>
          <FruitsBar/>
          <MenuContainer/>
    </div>
  )
}

export default MainContainer;