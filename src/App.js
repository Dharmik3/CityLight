import React, { useEffect } from "react";
import { Header,MainContainer,CreateContainer } from "./components";
import { Route, Routes } from 'react-router-dom'
import {AnimatePresence, FlatTree} from 'framer-motion'
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/FirebaseFunctions";
import { actionType } from "./context/reducer";
import StripeContainer from "./components/StripeContainer";
import Bill from "./components/Invoice";


const App = () => {
    const [{ foodItems,cartShow}, dispatch] = useStateValue();
    const fetchData = async () => {
        await getAllFoodItems().then((data) => {
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems:data
            })
        })
    }
    const handleDisappearMenu = (e) => {
        if (cartShow && e.target.parentNode.id !== 'cart') {
            
            dispatch({
                type: actionType.SET_CART_SHOW,
                cartShow: !cartShow,
            })
        }  
    }
    useEffect(() => {
        fetchData();
    },[])
    return (
      <AnimatePresence exitBeforeEnter={false}>
            <div className="w-screen h-auto flex flex-col bg-primary" >
            <Header />
                <main className="mt-14  w-full md:mt-20 md:px-16 px-4 pt-4" onClick={handleDisappearMenu}>
                <Routes>
                    <Route path="/" element={ <MainContainer/>} />
                    <Route path="/createItem" element={ <CreateContainer/>} />
                    <Route path="/payment" element={ <StripeContainer/>} />
                    <Route path="/bill" element={ <Bill/>} />
                </Routes>
            </main>
        </div>
      </AnimatePresence>  
        
    )
}
export default App;