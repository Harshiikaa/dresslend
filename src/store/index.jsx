import { configureStore } from "@reduxjs/toolkit";
import FavoriteSlice from "./slices/FavoriteSlice";

const store = configureStore({
    reducer: {
        favorites: FavoriteSlice,

    }
});
export default store;