import AddDivision from "@/pages/admin/AddDivision";
import AddTour from "@/pages/admin/AddTour";
import AddTourType from "@/pages/admin/AddTourType";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";
const Analytics = lazy(() => import("@/pages/admin/Analytics"));
export const adminSidebarItems:ISidebarItem[] = [
  {
    title: "Dashboard",
    
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        Component: Analytics,
      },
    ],
  },
  {
    title: "Tour Management",
    
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        Component:AddTourType,
      },
      {
        title: "Add Division",
        url: "/admin/add-division",
        Component:AddDivision,
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        Component: AddTour,
      },
    ],
  },
];
