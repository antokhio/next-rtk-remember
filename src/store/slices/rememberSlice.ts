/* eslint-disable no-param-reassign */
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";
import { REMEMBER_REHYDRATED } from "redux-remember";

type RememberSliceState = {
  values: number[];
};

export const rememberSlice = createSlice({
  name: "remember",
  initialState: {
    values: [],
  } as RememberSliceState,
  reducers: {
    addValue: (state, { payload }: PayloadAction<void>) => {
      state.values.push(Date.now());
    },
    clearValues: (state, { payload }: PayloadAction<void>) => {
      state.values = [];
    },
  },
});

export const { addValue, clearValues } = rememberSlice.actions;
export default rememberSlice;

export const remeberValuesSelector = createSelector(
  (state: RootState) => state.remember,
  (remember) => remember.values.length
);
