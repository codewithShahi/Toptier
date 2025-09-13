import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import type { LayoutType } from "@src/@types/theme";
import {
  setMode,
  setDirection,
  setLocale,
  setLayoutType,
  setCurrency,
  setCountry,
  setDestination,
  setSidebarExpanded
} from "./actions";

// 1. Destination interface defines the structure of each destination object
interface Destination {
  id: number;
  airport: string;
  city: string;
  country: string;
  code: string;
  late: string;
  long: string;
  region: string;
  type: string;
  status: string;
}

// 2. Destination interface is used here to type the destination property in the State interface
interface State {
  mode: string;
  direction: string;
  locale: string;
  layoutType: LayoutType;
  currency: string;
  country: string;
  destination: Destination[]; // Uses Destination interface
  sidebarExpanded?: boolean; // Optional property for sidebar expansion state
}

const initialState: State = {
  mode: "light",
  direction: "ltr",
  locale: "en",
  layoutType: "default",
  currency: "",
  country: "",
  destination: [], // Empty array of Destination objects
  sidebarExpanded: true,
};

export const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setMode, (state, action: PayloadAction<string>) => {
      state.mode = action.payload;
    })
    .addCase(setDirection, (state, action: PayloadAction<string>) => {
      state.direction = action.payload;
    })
    .addCase(setLocale, (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    })
    .addCase(setLayoutType, (state, action: PayloadAction<LayoutType>) => {
      state.layoutType = action.payload;
    })
    .addCase(setCurrency, (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    })
    .addCase(setCountry, (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    })
    // 3. Destination interface is used here to type the action.payload
    .addCase(setDestination, (state, action: PayloadAction<Destination[]>) => {
      state.destination = action.payload; // Payload is an array of Destination objects
    })
    .addCase(setSidebarExpanded, (state, action: PayloadAction<boolean>) => {
      state.sidebarExpanded = action.payload;
    });
});