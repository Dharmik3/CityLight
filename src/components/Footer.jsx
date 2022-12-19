import React from 'react'
import Logo from '../img/logo.png'
const Footer = () => {
  return (
    

<footer class="w-screen p-4 bg-primary   md:px-6 md:py-8 border-t border-gray-200  shadow-lg" id='services'>
    <div class="sm:flex sm:items-center sm:justify-between">
        <a href="#" class="flex items-center mb-4 sm:mb-0">
            <img src={Logo} class="mr-3 h-8" alt="logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap ">CityLight</span>
        </a>
        <ul class="flex flex-wrap items-center mb-6 text-[14px]   text-gray-500 sm:mb-0 ">
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6 ">Licensing</a>
            </li>
            <li>
                <a href="#" class="hover:underline">Contact</a>
            </li>
        </ul>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
    <span class="block text-sm text-gray-500 sm:text-center ">© 2022 <a href="#" class="hover:underline">CityLight™</a>. All Rights Reserved.
    </span>
</footer>


  )
}

export default Footer;