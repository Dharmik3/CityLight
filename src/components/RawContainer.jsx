import React, { useEffect, useRef ,useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import {motion} from 'framer-motion'
import NotFound from '../img/NotFound.svg'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { cart, fetchCart } from '../utils/fetchLocalStorageData'
import {  saveUserCart } from '../utils/FirebaseFunctions'
const RawContainer = ({ flag, data, scrollValue }) => {
    const [{ cartItems,user }, dispatch] = useStateValue();
    const rowContainer = useRef();
    let userCartData=fetchCart();
    useEffect(() => {
        
        cart().then((res) => {
       
            userCartData = res;
            setItems(userCartData)
          
        });
    },[])
    const [items, setItems] = useState(userCartData);
    
    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue;
    }, [scrollValue])
    
    const addToCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems:items
        }
        )
        localStorage.setItem('cartItems', JSON.stringify(items));
        if (user) {
            const { uid, email } = user;
        const data = {
            id: uid,
            email:email,
            carts:{items}
        }
        saveUserCart(data);
        }
    }
    useEffect(() => {
        addToCart();
    }, [items])
    
    const handleCart = (item) => {
        let flag = false;

        const newItems = cartItems.map((elm) => {
           let newObj = {};
            if (elm.id === item.id) {
                elm.qty += 1;
                flag = true;
            }
            newObj = elm;
            return newObj;
        })
        if (flag === false) {
            newItems.push(item);
        }
        setItems(newItems)
    }
    return (
        
        <div
            ref={rowContainer}
            className={`w-full  gap-3 flex items-center my-12 ${flag ? 'overflow-x-scroll scrollbar-none scroll-smooth' : 'overflow-x-hidden flex-wrap justify-center'}`}>
          {(data && data.length>0) ? data.map(item => (
            <div key={item?.id} className='w-300 min-w-[300px] md:min-w-340 md:w-340  h-[225px] my-12   bg-cardOverlay rounded-lg p-2 hover:drop-shadow-lg backdrop-blur-md flex flex-col items-center justify-between'>
                  <div className='w-full flex items-center justify-between'>
                      <motion.div whileHover={{ scale: 1.2 }} className='w-40 h-40 -mt-8 drop-shadow-2xl'>
                          <img  src={item?.imageURL} alt=""
                        className='w-full h-full object-contain' />
                      </motion.div>
                  
                  <motion.div whileTap={{scale:0.75}} className='w-10 h-10 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md' onClick={()=>handleCart(item)}>
                      <MdShoppingBasket className='text-white' />
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
          )):(
                <div className='w-full flex flex-col justify-center items-center'>
                    <img src={NotFound} alt="not found" className='h-340 ' />
                    <p className='text-xl text-headingColor font-semibold my-2'>Items not available!</p>
                    </div>
          )
         }
        </div>
  )
}

export default RawContainer