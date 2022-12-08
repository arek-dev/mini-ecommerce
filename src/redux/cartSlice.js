import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'


const CartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action)=>{
            state.products.push(action.payload)
            state.quantity += 1
            console.log(current(state))
        },
    },
});

export const {addProduct} = CartSlice.actions;
export const CartReducer = CartSlice.reducer;

