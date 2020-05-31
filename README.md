# naumen-test-frontend

[![Maintainability](https://api.codeclimate.com/v1/badges/e31bf6ff9c493617808f/maintainability)](https://codeclimate.com/github/popkovandrey/naumen-test-frontend/maintainability)

Тестовое задание для стажировки в компании Naumen. Поиск в Википедии (Wikipedia Api).

[Preview is here](https://frozen-beyond-18925.herokuapp.com/)

Реализовано приложение для поиска информации с помощью Wikipedia Api. 
Структура MVC реализована на простом подходе:
* Model - состояние приложения (объект state);
* Controller - навешивание обработчиков с помощью addEventListener;
* View - реализована конценция Observer с помощью вотчеров (melanke-watchjs). Отрисовка DOM.

Для асинхронных запросов к Wiki API задействована библиотека Axios.
Реализован перевод (en, ru). Библиотека i18next. Все тексты хранятся в директории locales. Добавление нового перевода не составит труда. Кроме перевода текстов, при смене языка меняется и поиск в соответствующей части Wikipedia (ru.wikipedia.org || en.wikipedia.org)
Темная тема выполнена на отключении/подключении соответствующего css с инверсией цвета. Дешево и сердито ).Сохранение выбранной темы и текущего перевода в Cookie.

Плюсы:
* темная тема;
* перевод;

Минусы:
* отсутствие модных фреймворков (Angular, React, Vue);
* зря прикрутил Bootstrap - не раскрыл его мощь;
* нет сохранения результатов предыдущих запросов;


