import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'Claims',
        icon: 'bx-receipt',
        subItems: [
            {
                id: 2,
                label: 'Create Incident Type',
                link: '/claims/incident-type/create',
                parentId: 3
            },
            {
                id: 4,
                label: 'Incident Type List',
                link: '/invoices/detail',
                parentId: 5
            },
        ]
    },
];

