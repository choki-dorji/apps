import { configureStore } from "@reduxjs/toolkit";

import favoritesReducers from "./favourite"

export const store = configureStore({
    reducer: {
        favoriteMeals : favoritesReducers
    }
});

function Store(){

}

export default Store;