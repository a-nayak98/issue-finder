// import { useDispatch } from "react-redux";
// import {createWrapper} from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

export const makeStore = () =>{
    return configureStore({
        reducer: rootReducer,
    })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const wrapper = createWrapper<AppStore>(makeStore);