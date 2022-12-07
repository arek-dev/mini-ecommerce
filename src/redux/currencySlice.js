import { createSlice } from '@reduxjs/toolkit'

export const CurrencySlice = createSlice({
    name: 'currency',
    initialState: {
      activeCurrency: "USD",
    },
    reducers: {  
      setActiveCurrency: (state, action) => {
        return {
          ...state,
          activeCurrency: action.payload,
        };
      },
    },
  });
  
  export const { setActiveCurrency } = CurrencySlice.actions;
  export const CurrencyReducer = CurrencySlice.reducer;
  