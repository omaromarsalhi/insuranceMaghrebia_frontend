import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.INSURANCE.TEXT',
        icon: 'bx-store',
        subItems: [
            {
                id: 3,
                label: 'MENUITEMS.INSURANCE.LIST.CATEGORY',
                link: 'insurance/particular/category',
                parentId: 2
            },
            {
                id: 4,
                label: 'MENUITEMS.INSURANCE.LIST.PRODUCTDETAIL',
                link: '/INSURANCE/product-detail/1',
                parentId: 2
            },

        ]
    },
    {
        id: 5,
        label: 'Payment',
        icon: 'bx-credit-card',
        subItems: [
            {
                id: 6,
                label: 'Payment ',
                link: '/payment/contract',
                parentId: 5
            },
            {
                id: 7,
                label: 'Payment Details',
                link: '/payment/details/:userId',
                parentId: 5
            }
        ]

    }
];

