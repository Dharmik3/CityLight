import React from 'react'
import { HomeContainer,FruitsBar,MenuContainer ,CartContainer} from '../components'

const MainContainer = () => {
  
  return (
      <div className='flex flex-col w-full h-auto items-center justify-center'>
          <HomeContainer/>
        <FruitsBar/>
      <MenuContainer />
      <CartContainer/>
    </div>
  )
}

export default MainContainer;