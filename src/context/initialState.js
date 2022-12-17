import { async } from "@firebase/util";
import { cart, fetchCart, fetchUser } from "../utils/fetchLocalStorageData"
import { getUserCart } from "../utils/FirebaseFunctions"

const userInfo = fetchUser()
const cartInfo = fetchCart()
const carts = cart();




export const initialState = {
    user: userInfo,
    foodItems: null,
    cartShow: false,
    cartItems:cartInfo
}