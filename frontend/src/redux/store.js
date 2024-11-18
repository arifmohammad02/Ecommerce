import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./API/apiSlice";
import authReducer from "./features/auth/authSlice";
import favoritesReducer from "../redux/features/favorite/favoriteSlice";
import {getFavoritesFromLocalStorage} from "../Utils/localStorage";
import cartSliceReducer from "../redux/features/cart/cartSlice"
import shopReducer from "../redux/features/shop/shopSlice";




const initialFavorites = getFavoritesFromLocalStorage() || [];



const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
    cart:cartSliceReducer,
    shop:shopReducer,
  },

  preloadedState: {
    favorites: initialFavorites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
