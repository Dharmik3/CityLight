import React, { useState } from 'react'
import Logo from '../img/logo.png'
import { MdShoppingBasket,MdAdd,MdLogout } from 'react-icons/md'
import Avatar from '../img/avatar.png'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from '../firebase.config'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import { cart } from '../utils/fetchLocalStorageData'

function Header() {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user,cartShow,cartItems }, dispatch] = useStateValue()
    const [isMenu,setIsMenu]=useState(false)
    const login =async () => {
        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
        dispatch({
            type: actionType.SET_USER,
            user:providerData[0],
        })
        
            localStorage.setItem('user', JSON.stringify(providerData[0]))
            cart().then((res) => {
                 dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems:res
        }
        )
            localStorage.setItem('cartItems',JSON.stringify(res))
        
        });
        }
        else {
            setIsMenu(!isMenu)
        }
       
    }

    const logout = () => {
        setIsMenu(false);
        localStorage.clear();
        dispatch(
            {
                type: actionType.SET_USER,
                user:null,
            }
        )
    }

    const showCart = () => {
        dispatch(
            {
                type: actionType.SET_CART_SHOW,
                cartShow:!cartShow,
            }
        )
    }

  return (
    <header className="w-screen fixed z-50  p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* desktop navigation */}
      <div className="hidden md:flex h-full w-full items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-10  object-cover  " />
          <p className="text-headingColor text-xl font-bold">CityLight</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <Link to="/">
              <li className="text-base text-textColor duration-100 transition-all ease-in-out hover:text-headingColor cursor-pointer">
                Home
              </li>
            </Link>
            <Link to="/">
              <li className="text-base text-textColor duration-100 transition-all ease-in-out hover:text-headingColor cursor-pointer">
                Menu
              </li>
            </Link>
            <Link to="/">
              <li className="text-base text-textColor duration-100 transition-all ease-in-out hover:text-headingColor cursor-pointer">
                About Us
              </li>
            </Link>
            <Link to="/">
              <li className="text-base text-textColor duration-100 transition-all ease-in-out hover:text-headingColor cursor-pointer">
                Service
              </li>
            </Link>
          </motion.ul>

          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer " />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              alt="user profile img"
              className="w-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              onClick={login}
              referrerPolicy="no-referrer"
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50  py-2 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.email === "dharmikpatel.pepalla@gmail.com" && (
                  <Link to="createItem" onClick={() => setIsMenu(false)}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      <MdAdd />
                      New Item
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  <MdLogout />
                  Logout
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* phone navigation */}
      <div className="flex items-center  justify-between  md:hidden w-full h-full">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold">CityLight</p>
        </Link>
        <div className="flex items-center justify-between gap-5">
          <div
            className="relative flex items-center justify-center  "
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer " />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              alt="user profile img"
              className="w-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              onClick={login}
              referrerPolicy="no-referrer"
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50  py-2 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.email === "dharmikpatel.pepalla@gmail.com" && (
                  <Link to="createItem" onClick={() => setIsMenu(false)}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      New Item
                      <MdAdd />
                    </p>
                  </Link>
                )}
                <ul className="flex flex-col  ">
                  <a href="#">
                    <li
                      className="text-base text-textColor duration-100 transition-all ease-in-out hover:text-headingColor cursor-pointer px-4 py-2"
                      onClick={() => setIsMenu(false)}
                    >
                      Home
                    </li>
                  </a>
                  <a href="#menu">
                    <li
                      className="text-base text-textColor duration-100 transition-all ease-in-out hover:text-headingColor cursor-pointer px-4 py-2"
                      onClick={() => setIsMenu(false)}
                    >
                      Menu
                    </li>
                  </a>
                  <a href="#">
                    <li
                      className="text-base text-textColor duration-100 transition-all ease-in-out hover:text-headingColor cursor-pointer px-4 py-2"
                      onClick={() => setIsMenu(false)}
                    >
                      About Us
                    </li>
                  </a>
                  <a href="#services">
                    <li
                      className="text-base text-textColor duration-100 transition-all ease-in-out hover:text-headingColor cursor-pointer px-4 py-2"
                      onClick={() => setIsMenu(false)}
                    >
                      Service
                    </li>
                  </a>
                </ul>

                <p
                  className="m-2 p-2 rounded-md shadow-md px-4 py-2 flex items-center gap-3 justify-center bg-gray-200 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout
                  <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;