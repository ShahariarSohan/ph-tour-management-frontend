import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebar";
import { userSidebarItems } from "@/routes/userSidebar";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.superAdmin:
      return [...adminSidebarItems,...userSidebarItems];
    case role.admin:
      return [...adminSidebarItems];
    case role.user:
      return [...userSidebarItems];
    default:
      return [];
  }
};
