import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "MENUITEMS.MENU.TEXT",
    isTitle: true,
  },
  {
    id: 2,
    label: "MENUITEMS.INSURANCE.TEXT",
    icon: "bx-store",
    subItems: [
      {
        id: 3,
        label: "MENUITEMS.INSURANCE.LIST.CATEGORY",
        link: "/insurance/categories",
        parentId: 2,
      },
      {
        id: 4,
        label: "MENUITEMS.INSURANCE.LIST.ADDOFFER",
        link: "/insurance/offer-manager",
        parentId: 2,
      },
      {
        id: 5,
        label: "MENUITEMS.INSURANCE.LIST.OFFER",
        link: "/insurance/offers",
        parentId: 2,
      },
      {
        id: 6,
        label: "MENUITEMS.INSURANCE.LIST.EDITOFFER",
        link: "/insurance/edit-offer",
        parentId: 2,
      },
      {
        id: 7,
        label: "MENUITEMS.INSURANCE.LIST.APPOINTMENTS",
        link: "/insurance/appointments",
        parentId: 2,
      },
    ],
  },
  {
    id: 5,
    label: "Payment",
    icon: "bx-credit-card",
    subItems: [
      {
        label: "Payment ",
        link: "/payment/contract",
        parentId: 5,
      },
      {
        id: 7,
        label: "Payment Details",
        link: "/payment/details/:userId",
        parentId: 5,
      },
    ],
  },
];
