import {MenuItem} from './menu.model';

export const MENU: MenuItem[] = [

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

