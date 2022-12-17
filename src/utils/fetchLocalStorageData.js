import { getUserCart } from "./FirebaseFunctions";
export const fetchUser = () => {
    const userInfo = localStorage.getItem('user') !== 'undefined' ?
        JSON.parse(localStorage.getItem('user')) :
        localStorage.clear()
    return userInfo;
};

export const fetchCart = () => {
    const cartInfo = localStorage.getItem('cartItems') !== 'undefined' ?
        JSON.parse(localStorage.getItem('cartItems')) :
        localStorage.clear()
    console.log('cart info ',cartInfo);
    return cartInfo ? cartInfo : [];
};

export const cart =async  () => {
    const id =await  fetchUser().uid;
    const res =await  getUserCart(id);
    return res ? res :[];
};
