import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
// import { toast } from "react-hot-toast";

const initializeCart = () => {
    try {
        const cartData = localStorage.getItem("cart");
        return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        localStorage.removeItem("cart");
        return [];
    }
};

const initializeTotal = () => {
    try {
        const totalData = localStorage.getItem("total");
        return totalData ? JSON.parse(totalData) : 0;
    } catch (error) {
        console.error("Error parsing total from localStorage:", error);
        localStorage.removeItem("total");
        return 0;
    }
};

const initializeTotalItems = () => {
    try {
        const totalItemsData = localStorage.getItem("totalItems");
        return totalItemsData ? JSON.parse(totalItemsData) : 0;
    } catch (error) {
        console.error("Error parsing totalItems from localStorage:", error);
        localStorage.removeItem("totalItems");
        return 0;
    }
};

const initialState = {
    cart: initializeCart(),
    total: initializeTotal(),
    totalItems : initializeTotalItems(),
}


const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers :{
        // add to cart 
        addToCart : (state , action) =>{
            // Ensure cart is always an array
            if (!Array.isArray(state.cart)) {
                state.cart = [];
            }
            
            const course = action.payload
            const index = state.cart.findIndex((item) => item._id === course._id )

            if(index >= 0){
                toast.error("Cart is already added")
                return
            }

            state.cart.push(course);
            state.totalItems++
            state.total += course.price
            localStorage.setItem("cart" , JSON.stringify(state.cart))
            localStorage.setItem("total" , JSON.stringify(state.total))
            localStorage.setItem("totalItems" , JSON.stringify(state.totalItems))
            toast.success("Course added to cart")
        },
        // remove from cart

        removeFromCart : (state , action) =>{
            // Ensure cart is always an array
            if (!Array.isArray(state.cart)) {
                state.cart = [];
                return;
            }

            const courseId = action.payload
            const index = state.cart.findIndex((item) => item._id === courseId)

            if(index >= 0){
                state.totalItems--;
                state.total -= state.cart[index].price
                state.cart.splice(index , 1);
                localStorage.setItem("cart" , JSON.stringify(state.cart))
                localStorage.setItem("total" , JSON.stringify(state.total))
                localStorage.setItem("totalItems" , JSON.stringify(state.totalItems))
                toast.success("Course removed from cart")
            }
        },
        // reset cart
        resetCart : (state) =>{
            state.cart = []
            state.total = 0
            state.totalItems = 0
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }
    }
})

export const {addToCart , removeFromCart , resetCart} = cartSlice.actions;
export default cartSlice.reducer;