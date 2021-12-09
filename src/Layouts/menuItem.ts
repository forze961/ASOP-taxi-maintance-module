import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Профіль',
    icon: { name: 'home' },
    link: { href: '/profile' },
  },
  {
    title: 'Змінити маршрут',
    icon: { name: 'swap' },
    link: { href: '/route' },
  },
  {
    title: 'Валідації',
    icon: { name: 'checkmark-circle' },
    link: { href: '/validations' },
  },
  {
    title: 'Вийти',
    icon: { name: 'log-out' },
    link: { href: '/auth/login' },
  },
];

export default items;
