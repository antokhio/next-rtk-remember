import { configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { rememberEnhancer, rememberReducer } from "redux-remember";
import { api } from "./api/api";
import remember from "./slices/rememberSlice";

const rememberedKeys = ["remember"];

export const makeStore = () =>
  configureStore({
    reducer: rememberReducer({
      [api.reducerPath]: api.reducer,
      [remember.name]: remember.reducer,
    }),
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    enhancers: (getDefaultEnhancers) =>
      typeof window !== "undefined"
        ? getDefaultEnhancers().concat(
            rememberEnhancer(window.localStorage, rememberedKeys, {
              initActionType: HYDRATE,
              prefix: "~",
              persistWholeStore: false,
            })
          )
        : getDefaultEnhancers(),
  });

export type MakeStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<MakeStore["getState"]>;
export type AppDispatch = MakeStore["dispatch"];

export const wrapper = createWrapper<MakeStore>(makeStore);
