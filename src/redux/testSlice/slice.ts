// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const getCurrencies = createAsyncThunk("currency/getCurrencies", async () => {
//   try {
//     const data = await fetch("https://dummyjson.com/products");
//     const res = await data.json();

//     if (res) return res;
//   } catch (err) {
//     alert("Ошибка при загрузке валют.");
//     console.warn("Ошибка при загрузке валют.");
//   }
// });

// const initialState = {
//   test: {
//     count: 0,
//     price: 0,
//   },
// };

// const toastSlice = createSlice({
//   name: "test",
//   initialState,
//   reducers: {
//     plusOne: (state) => {
//       state.test = {
//         ...state.test,
//         count: state.test.count + 1,
//       };
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getCurrencies.fulfilled, (state, action) => {
//       state.test = {
//         ...state.test,
//         price: action.payload,
//       };
//     });
//   },
// });

// export const { plusOne } = toastSlice.actions;

// export default toastSlice.reducer;
