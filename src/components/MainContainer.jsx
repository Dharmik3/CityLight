import React, { useEffect } from 'react'
import { HomeContainer,FruitsBar,MenuContainer ,CartContainer,Footer} from '../components'
import { useStateValue } from '../context/StateProvider'

const MainContainer = () => {
  const [{ cartShow }, dispatch] = useStateValue();
  useEffect(()=>{},[cartShow])
  return (
      <div className='flex flex-col w-full h-auto items-center justify-center'>
          <HomeContainer/>
        <FruitsBar/>
      <MenuContainer />
      {cartShow && <CartContainer />}
      <Footer/>
    </div>
  )
}

export default MainContainer;