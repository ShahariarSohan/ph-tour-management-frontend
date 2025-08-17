/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ComponentType } from "react";
import type { ISendOtp, ILogin, IVerifyOtp } from "./auth.type";
export type { ITourPackage } from "./tour.type";
export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    Component: ComponentType;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "GUIDE" | "USER";
