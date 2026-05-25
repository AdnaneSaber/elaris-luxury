import { AnalyticsIcon } from "../assets/icons/AnalyticsIcon";
import { BugIcon } from "../assets/icons/BugIcon";
import { CalendarIcon } from "../assets/icons/CalendarIcon";
import { DashboardIcon } from "../assets/icons/DashboardIcon";
import { DonutIcon } from "../assets/icons/DonutIcon";
import { EcommerceIcon } from "../assets/icons/EcommerceIcon";
import { FormsIcon } from "../assets/icons/FormsIcon";
import { PasswordIcon } from "../assets/icons/PasswordIcon";
import { TablesIcon } from "../assets/icons/TablesIcon";
import { UIElementsIcon } from "../assets/icons/UIElementsIcon";
import { UserProfileIcon } from "../assets/icons/UserProfileIcon";
import type { MenuConfigEntry } from "../components/layout/sideMenu/types";

/**
 * Central navigation config used by SideMenu, SideMenuMobile and search input.
 * All admin routes prefixed with /admin for backoffice.
 */
export const menuConfig: MenuConfigEntry[] = [
  { type: "category", titleKey: "pages" },
  {
    type: "item",
    titleKey: "dashboard",
    Icon: DashboardIcon,
    path: "/admin/dashboard",
    sections: [
      { id: "revenueOverTime", titleKey: "revenueOverTime" },
      { id: "bestsellingProducts", titleKey: "bestsellingProducts" },
      { id: "customerSatisfaction", titleKey: "customerSatisfaction" },
      { id: "revenuePerCountry", titleKey: "revenuePerCountry" },
    ],
  },
  {
    type: "item",
    titleKey: "leads",
    Icon: DonutIcon,
    path: "/admin/leads",
    sections: [{ id: "leads", titleKey: "leads" }],
  },
  {
    type: "submenu",
    titleKey: "eCommerce",
    Icon: EcommerceIcon,
    submenuItems: [
      {
        titleKey: "orders",
        path: "/admin/orders",
        sections: [{ id: "orders", titleKey: "orders" }],
      },
      {
        titleKey: "customers",
        path: "/admin/customers",
        sections: [{ id: "customers", titleKey: "customers" }],
      },
      {
        titleKey: "products",
        path: "/admin/products",
        sections: [{ id: "products", titleKey: "products" }],
      },
    ],
  },
  {
    type: "item",
    titleKey: "agents",
    Icon: UserProfileIcon,
    path: "/admin/agents",
    sections: [{ id: "agents", titleKey: "agents" }],
  },
  {
    type: "item",
    titleKey: "analytics",
    Icon: AnalyticsIcon,
    path: "/admin/analytics",
    sections: [
      { id: "assetPerformance", titleKey: "assetPerformance" },
      { id: "todaysSales", titleKey: "todaysSales" },
      { id: "totalProfit", titleKey: "totalProfit" },
      { id: "revenueTrends", titleKey: "revenueTrends" },
      { id: "yearOverview", titleKey: "yearOverview" },
      { id: "marketMetrics", titleKey: "marketMetrics" },
      { id: "revenueDistribution", titleKey: "revenueDistribution" },
    ],
  },
  {
    type: "item",
    titleKey: "userProfile",
    Icon: UserProfileIcon,
    path: "/admin/profile",
    sections: [
      { id: "about", titleKey: "about" },
      { id: "accountSettings", titleKey: "accountSettings" },
      { id: "recentActivity", titleKey: "recentActivity" },
    ],
  },
  {
    type: "item",
    titleKey: "calendar",
    Icon: CalendarIcon,
    path: "/admin/calendar",
    sections: [{ id: "calendar", titleKey: "calendar" }],
  },
  {
    type: "submenu",
    titleKey: "authentication",
    Icon: PasswordIcon,
    submenuItems: [
      { titleKey: "userManagement", path: "/admin/user-management" },
      { titleKey: "login", path: "/login", newTab: true },
      { titleKey: "register", path: "/register", newTab: true },
      { titleKey: "forgotPassword", path: "/forgot-password", newTab: true },
    ],
  },
  {
    type: "submenu",
    titleKey: "errorPages",
    Icon: BugIcon,
    submenuItems: [
      { titleKey: "error401", path: "/error-401", newTab: true },
      { titleKey: "error404", path: "/error-404", newTab: true },
      { titleKey: "error500", path: "/error-500", newTab: true },
    ],
  },
  { type: "category", titleKey: "components" },
  {
    type: "item",
    titleKey: "uiElements",
    Icon: UIElementsIcon,
    path: "/admin/ui-elements",
    sections: [
      { id: "buttons", titleKey: "buttons" },
      { id: "command", titleKey: "command" },
      { id: "avatars", titleKey: "avatars" },
      { id: "tooltips", titleKey: "tooltips" },
      { id: "alerts", titleKey: "alerts" },
      { id: "toasts", titleKey: "toasts" },
      { id: "skeletons", titleKey: "skeletons" },
      { id: "dialogs", titleKey: "dialogs" },
      { id: "dropdownMenu", titleKey: "dropdownMenu" },
      { id: "badges", titleKey: "badges" },
      { id: "popover", titleKey: "popover" },
      { id: "progress", titleKey: "progress" },
      { id: "breadcrumbs", titleKey: "breadcrumbs" },
      { id: "tabs", titleKey: "tabs" },
      { id: "separators", titleKey: "separators" },
      { id: "pagination", titleKey: "pagination" },
    ],
  },
  {
    type: "item",
    titleKey: "forms",
    Icon: FormsIcon,
    path: "/admin/forms",
    sections: [
      { id: "inputFields", titleKey: "inputFields" },
      { id: "selectInputs", titleKey: "selectInputs" },
      { id: "textarea", titleKey: "textarea" },
      { id: "colorPicker", titleKey: "colorPicker" },
      { id: "formValidation", titleKey: "formValidation" },
      { id: "checkboxes", titleKey: "checkboxes" },
      { id: "radioButtons", titleKey: "radioButtons" },
      { id: "toggleSwitch", titleKey: "toggleSwitch" },
      { id: "datePicker", titleKey: "datePicker" },
      { id: "fileUpload", titleKey: "fileUpload" },
      { id: "sliders", titleKey: "sliders" },
    ],
  },
  {
    type: "item",
    titleKey: "tables",
    Icon: TablesIcon,
    path: "/admin/tables",
    sections: [
      { id: "basicTable", titleKey: "basicTable" },
      { id: "advancedTable", titleKey: "advancedTable" },
      { id: "userTable", titleKey: "userTable" },
      { id: "inventoryTable", titleKey: "inventoryTable" },
    ],
  },
  {
    type: "item",
    titleKey: "charts",
    Icon: DonutIcon,
    path: "/admin/charts",
    sections: [
      { id: "areaChart", titleKey: "areaChart" },
      { id: "scatterChart", titleKey: "scatterChart" },
      { id: "pieChart", titleKey: "pieChart" },
      { id: "radarChart", titleKey: "radarChart" },
      { id: "composedChart", titleKey: "composedChart" },
      { id: "stackedBarChart", titleKey: "stackedBarChart" },
      { id: "radialBarChart", titleKey: "radialBarChart" },
      { id: "twoAxisLineChart", titleKey: "twoAxisLineChart" },
      { id: "mixedLineChart", titleKey: "mixedLineChart" },
      { id: "verticalBarChart", titleKey: "verticalBarChart" },
      { id: "areaFillByValue", titleKey: "areaFillByValue" },
      { id: "gradientPieChart", titleKey: "gradientPieChart" },
      { id: "lineChart", titleKey: "lineChart" },
    ],
  },
];
