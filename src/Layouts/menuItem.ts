import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Профіль',
    icon: { name: 'home' },
    link: { href: '/dashboard' },
  },
  {
    title: 'Змінити маршрут',
    icon: { name: 'swap' },
    link: { href: '/dashboard' },
  },
  {
    title: 'Валідації',
    icon: { name: 'checkmark-circle' },
    link: { href: '/dashboard' },
  },
  {
    title: 'Вийти',
    icon: { name: 'log-out' },
    link: { href: '/dashboard' },
  },
];

export default items;
