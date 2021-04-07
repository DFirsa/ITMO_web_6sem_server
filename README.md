# ИТМО web-программирование сервер 6 семестр

![Last commit date](https://img.shields.io/github/last-commit/DFirsa/ITMO_web_6sem_server?color=%230082f3&style=for-the-badge)
![Most used language](https://img.shields.io/github/languages/top/DFirsa/ITMO_web_6sem_server?color=%2324&style=for-the-badge)
![Repo size](https://img.shields.io/github/repo-size/DFirsa/ITMO_web_6sem_server?color=%23EE5500&style=for-the-badge)
![Languages counter](https://img.shields.io/github/languages/count/DFirsa/ITMO_web_6sem_server?style=for-the-badge)

> Сервер, реализованный на Node.js для [web-проекта прогноза погоды](https://github.com/DFirsa/ITMO_web_6sem)

## Что использовал:
+ Node.js
+ MongoDB

## :space_invader:Библиотеки node.js:
+ Express
+ Eslint
+ Dotenv
+ Axios

## Endpoints
| Запрос |       Endpoint      |               Пример               |
|:------:| ------------------- | ---------------------------------- |
|    GET | /weather/city       | /weather/city?q=Moscow             |
|    GET | /weather/coordinates| /weather/coordinates?lat=23&lon=23 |
|    GET | /favorites          | /favorites                         |
|   POST | /favorites          | /favorites?city=Moscow             |
| DELETE | /favorites          | /favorites?city=Moscow             |
