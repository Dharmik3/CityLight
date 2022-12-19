import React,{useState,useEffect} from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { motion } from 'framer-motion';
import { RiRefreshFill } from 'react-icons/ri'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer'
import EmptyCart from '../img/emptyCart.svg'
import CartItem from './CartItem';
import { fetchCart } from '../utils/fetchLocalStorageData';
import { deleteUserCart } from '../utils/FirebaseFunctions';
import { loadScript } from '../utils/paymentFunctions';
import Logo from '../img/logo.png'
const CartContainer = () => {
    
    const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
    const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
    const showCart = () => {
         
        dispatch(
            {
                type: actionType.SET_CART_SHOW,
                cartShow:!cartShow,
            }
        )
    }
    const handleClear = () => {
        localStorage.removeItem('cartItems');
        const cartInfo = fetchCart()
        dispatch(
            {
                type: actionType.SET_CART_ITEMS,
                cartItems:cartInfo
            }
        )
        if (user) {
            deleteUserCart(user.uid);
        }
    }
    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
            return accumulator + item.qty * item.price
        }, 0)
        setTot(totalPrice);
    }, [tot, flag])
    
   
    const processPayment =async (amount) => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        if (!res) {
            alert('technical glitch');
            return;
        }
        console.log('script is loaded successfully')
        var options = {
    "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
    "amount": parseInt(amount*100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "CityLight",
    "description": "Test Transaction",
    "image": Logo,
   
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "prefill": {
        "name": "Dharmik Patel",
        "email": "dharmik.patel@example.com",
        "contact": "9999999999"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
            },
    "handler": function (response){
    alert(response.razorpay_payment_id);
    alert(response.razorpay_order_id);
    alert(response.razorpay_signature)}
};
        var rzp1 = new window.Razorpay(options);
         rzp1.open();
    // e.preventDefault();
    }
  return (
      <motion.div
        initial={{opacity:0,x:200}}
        animate={{opacity:1,x:0}}
        exit={{opacity:0,x:200}}
          className='fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]' id='cart'>
          <div className='w-full flex items-center justify-between p-4 cursor-pointer' id='cart'>
              <motion.div whileTap={{scale:0.75}} onClick={showCart}>
                  <MdOutlineKeyboardBackspace className='text-textColor text-3xl' />
              </motion.div>
                  <p  className='text-textColor text-lg font-semibold'>Cart</p>
                  <motion.p whileTap={{scale:0.75}} className='flex items-center gap-2 p-1 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base' onClick={handleClear}>Clear<RiRefreshFill/></motion.p>
          </div>
          {/* bottom section */}
          {cartItems && cartItems.length > 0 ?
              (
                   <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col' id='cart'>
               {/*cart item section */}
              <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'id='cart'>
                  {/* each  cart item */}
                  { cartItems && cartItems.map(item => (
                      <CartItem key={item.id} item={item} flag={flag} setFlag={setFlag} />
                  ))}
              </div>

              {/* billing section */}
              <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2' id='cart'>
                  <div className='w-full flex items-center justify-between' id='cart'>
                      <p className='text-gray-400 text-lg'>Sub Total</p>
                              <p className='text-gray-400 text-lg'>&#8360; { tot}</p>
                  </div>
                  <div className='w-full flex items-center justify-between' id='cart'>
                      <p className='text-gray-400 text-lg'>Delivery</p>
                      <p className='text-gray-400 text-lg'>&#8360; 40</p>
                  </div>

                  <div className='w-full border-b border-gray-600 my-2'></div>
                  <div className='w-full flex items-center justify-between' id='cart'>
                      <p className='text-gray-200 text-xl font-semibold'>Total</p>
                              <p className='text-gray-200 text-xl font-semibold'>&#8360; { tot + 40}</p>
                  </div>
                  {user ? (<motion.button
                      whileTap={{ scale: 0.8 }}
                      type="button"
                      className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out'
                           onClick={()=>processPayment(tot+40)}>Check Out</motion.button>) :
                              (
                                  <p className='text-lg bg-orange-400 py-2 px-4 text-gray-50 rounded-full font-semibold'>Please Login to Checkout</p>
                  )
                  }
              </div>
          </div>
              ) : (
                  <div className='w-full h-full flex flex-col items-center justify-center gap-6' >
                      <img src={EmptyCart} classNamew-300 alt="cart" />
                      <p className='text-xl text-textColor font-semibold'>Add some items to cart</p>
                  </div>
          )}
         
    </motion.div>
  )
}

export default CartContainer