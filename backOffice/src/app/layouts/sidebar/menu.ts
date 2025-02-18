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
    }
];

