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
        id : 3,
        label : 'MENUITEMS.USER.TEXT',
        icon: 'bxs-user-rectangle',
        subItems: [
            {
                id: 1,
                label: 'MENUITEMS.USER.LIST.USERS',
                link: '/user/list',
                parentId: 3
            },
            {
                id: 2,
                label: 'MENUITEMS.USER.LIST.ROLE',
                link: '/user/roles',
                parentId: 3
            },

        ]
    },
    {
        id : 3,
        label : 'MENUITEMS.HR.TEXT',
        icon: 'bx bxs-briefcase',
        subItems: [
            {
                id: 1,
                label: 'MENUITEMS.HR.LIST.JOBS',
                link: '/hr/jobs',
                parentId: 3
            },
            {
                id: 2,
                label: 'MENUITEMS.HR.LIST.INTERVIEWS',
                link: '/hr/interviews',
                parentId: 3
            },

        ]
    }
];

