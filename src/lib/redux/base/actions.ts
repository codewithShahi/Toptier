import { createAction } from "@reduxjs/toolkit";
import { Theme, LayoutType } from "@src/@types/theme";

type ModeType = Theme;
export const setMode = createAction<ModeType["mode"]>("SET_MODE");
export const setDirection = createAction<"ltr" | "rtl">("SET_DIRECTION");
export const setLocale = createAction<string>("SET_LOCALE");
export const setLayoutType = createAction<LayoutType>("SET_LAYOUT_TYPE");
export const setCurrency = createAction<string>("SET_CURRENCY");
export const setCountry = createAction<string>("SET_COUNTRY");
export const setDestination = createAction<
  {
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
  }[]
>("SET_DESTINATION");
export const setSidebarExpanded = createAction<boolean>("SET_SIDEBAR_EXPANDED");

