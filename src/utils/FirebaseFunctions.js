// saving new items
import { collection, doc, getDocs, deleteDoc, orderBy, query, setDoc, getDoc } from "firebase/firestore"
import { firestore } from "../firebase.config"

export const saveItem = async (data) => {
    await setDoc(doc(firestore, 'foodItems', `${Date.now()}`), data, { merge: true });
}
export const saveUserCart = async (data) => {
    await setDoc(doc(firestore, 'userCarts', `${data.id}`), data, { merge: true });
}

export const getAllFoodItems = async () => {
    const items = await getDocs(
        query(collection(firestore, 'foodItems'), orderBy('id', 'desc'))
    );

    return items.docs.map((doc) => doc.data());
}


export const getUserCart =async (id) => {
    const docRef = doc(firestore, "userCarts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().carts.items;
    } else {
        return [];
    }
}

export const deleteUserCart =async (id) => {
    
    await deleteDoc(doc(firestore, "userCarts", id));
}


