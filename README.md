<h1 align="center">Вас вітає E-TICKET 👋</h1>
<h2 align="center">DC8 E-Ticket — statistic module</h2>
<p>
  <img alt="Версія" src="https://img.shields.io/badge/version-0.25-blue.svg?cacheSeconds=2592000" />
  <a href="-" target="_blank">
    <img alt="License: ttc Licenc #" src="https://img.shields.io/badge/License-ttc Licenc #-yellow.svg" />
  </a>
</p>

##Призначення програмного забезпечення: 

**Програмне забезпечення «Моніторинг рухомого складу» призначено для:**
>- Оперативного контролю наявності зв’язку з об’єктом по комунікаційній мережі АСОП.
>- Оперативного контролю технічного стану технічних засобів АСОП, що працюють на лінії.
>- Моніторинг виконання маршрутних рейсів рухомими одиницями (РО).
>- Визначенню наявності валідацій.
>- Моніторингу дій водія.

##Призначення модулю: statistic module: 

>Даний модуль забезпечує збереження, аналіз та механізми відтворення статистичних даних для кінцевого користувача.

### 🏠 [ Домашня сторінка ](http://#/)

## Стек
- [React](https://reactjs.org)
- [Nextjs](https://nextjs.org/)
- [Material-ui](http://material-ui.com)
- [Styled components](https://www.styled-components.com)
- [WebPack](https://webpack.js.org/)

## Структура пакету

- **pages** - кінцеві маршрути для сторінок
  - **api** - кінцеві маршрути для сервісів
- **components** - компоненти пакету
- **containers** - глобальні компоненти
- **lib** - допоміжні бібліотеки
- **public** - статичні дані (зображення, стилі)
- **static** - статичні дані (звуки)
- **util** - Утиліти та допоміжні бібліотеки
- **scripts** - Допоміжні функції для розробника

## Встановлення залежностей

> 1. Встановлення необхідного ПЗ.

- [NodeJS(13.14.0 або вище) + YARN](https://nodejs.org/uk/download/) [Обов'язково]
- [PostgeSQL (13.2 або вище)](https://www.postgresql.org/download/) [Обов'язково]
- [NGINX (1.10.3 або вище)](http://nginx.org/ru/download.html) [Обов'язково]
- [Crontab](https://crontab.guru/) [Обов'язково]

> 2. Встановлення модульних залежностей.

```sh
cd <distribution kit home catalog/asop_statistic_packet/>
yarn install
```

## Запуск синтетичних тестів (при необхідності)

```sh
yarn test
```

## Конфігурація і запуск

> Налаштування  конфігурації змінних середи **../distribution kit home catalog/asop_statistic_packet/.env.local**

```
    postgresHost=<адреса сервере PostgreSQL>
    postgresPort=5432<порт>
    postgresDatabase=<Назва БД>
    postgresUser=<Користувач>
    postgresPassword=<Пароль>
    APPLICATION_SECRET=<секретний ключ для токенізації сервісу авторизацію (32 символи)>
    BACKEND_SERVICE=<URL-адреса пакету оперативних даних>
	ZABBIX_REDIRECT=<Адреса для переадресації клієнта до системи Zabbix>
	USER_INFO_SERVICE=<Сервіс для визначення мета-даних користувача>
	SESSION_TTL=<Тривалість авторизаційної сесії користувача у мілісекундах>
```

> Даний пакет використовує технологію SSR, тому для запуску необхідно "зібрати" проект:
>
> - Необхідно запустити інтерфейс зборки проекту;
> - Необхідно запустити проект;
```sh
cd <distribution kit home catalog/asop_statistic_packet>
yarn build
...
yarn start
```

> Запуск у режимі розробника:
>
```sh
cd <distribution kit home catalog/asop_statistic_packet>
yarn dev
```

> Плановий запуск функціоналу для збору та збереження статистики:
>
> - Даний функціонал забезпечує збір та збереження статистичних даних (архіву)  з дискретністю 10 хвилин (дискретність можливо змінювати) для подальшого використання цим пакетом.
```sh
sudo crontab -e;
*/10 * * * * <шлях для виконуювачого файлу nodeJS> distribution kit home catalog/asop_statistic_packet/util/getDataASOP.js
*save*
```
>Приклад: (Unix)
```sh
sudo crontab -e;
*/10 * * * * /usr/bin/node /var/nodejshome/asop_statistic_packet/util/getDataASOP.js
*save*
```

## Авторизація

Тестові дані для авторизації користувачів в системі знаходяться : **../distribution kit home catalog/asop_operation_packet/AuthData.txt**.
Увага! Для забезпечення інформаційної безпеки у промисловому використанні ПЗ — необхідно змінити дані авторизації.

### 📚 [ Документація ](#)

## Автори

👤 **ТОВ «ЕПАРКГРАД»©**

- Веб-сайт: 
- Офіс:
- Відділ продажів: 
- Бугалтерія: 
- Техпідтримка: 
- Факс: 

## 📝 Ліцензія

Даний продукт має ліцензію [] всі права захищені.

---
