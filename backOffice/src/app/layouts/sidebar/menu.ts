import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'Claims',
        icon: 'bx-receipt',
        subItems: [
            {
                id: 2,
                label: 'Incident Types',
                link: '/claims/incident-type/list',
                parentId: 3
            },
            {
                id: 4,
                label: 'Claims',
                link: '/claims',
                parentId: 5
            },
            {
                id: 6,
                label: 'MAP',
                link: '/claims/map',
                parentId: 7
            },

            
        ]
    },
];

