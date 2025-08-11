

import Bookings from "@/pages/user/Bookings";
import type { ISidebarItem } from "@/types";

export const userSidebarItems:ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Bookings",
        url: "/user/bookings",
        Component:Bookings,
      },
    ],
  },
 
];
