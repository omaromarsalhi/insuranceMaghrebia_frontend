import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 69,
        label: 'Claims',
        icon: 'bx-receipt',
        subItems: [
            {
                id: 2,
                label: 'Incident Types',
                link: '/claims/incident-type/list',
                parentId: 69
            },
            {
                id: 4,
                label: 'Claims',
                link: '/claims',
                parentId: 69
            },
            {
                id: 6,
                label: 'MAP',
                link: '/claims/map',
                parentId: 69
            },


        ]
    },
    {
        id: 2,
        label: 'MENUITEMS.INSURANCE.TEXT',
        icon: 'bx-store',
        subItems: [
             {
                id: 3,
                label: 'MENUITEMS.INSURANCE.LIST.CATEGORY',
                link: '/insurance/categories',
                parentId: 2
            },
            {
                id: 4,
                label: 'MENUITEMS.INSURANCE.LIST.ADDOFFER',
                link: '/insurance/offer-manager',
                parentId: 2
            },
            {
                id: 5,
                label: 'MENUITEMS.INSURANCE.LIST.OFFER',
                link: '/insurance/offers',
                parentId: 2
            },
            {
                id: 6,
                label: 'MENUITEMS.INSURANCE.LIST.EDITOFFER',
                link: '/insurance/edit-offer',
                parentId: 2
            },
            {
                id: 7,
                label: 'MENUITEMS.INSURANCE.LIST.APPOINTMENTS',
                link: '/insurance/appointments',
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
    },
    {
        id: 48,
        label: 'MENUITEMS.CONTACTS.TEXT',
        icon: 'bxs-user-detail',
        subItems: [
            {
                id: 49,
                label: 'MENUITEMS.CONTACTS.LIST.USERGRID',
                link: '/listComplaints/list',
                parentId: 48
            },
        ]
    },
    {
        id: 48,
        label: 'MENUITEMS.USERACTION.TEXT',
        icon: 'bxs-user-detail',
        subItems: [
            {
                id: 49,
                label: 'MENUITEMS.USERACTION.LIST.RAPPORT',
                link: '/report/showReport',
                parentId: 48
            },
        ]
    }
];

