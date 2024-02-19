Данное веб приложение было сконфигурировано c помощью cra https://create-react-app.dev/docs/getting-started

Запуск проекта
Установите зависимости:
npm install

Запустите приложение:
npm start

Функциональность
Пользователь вводит свое имя перед началом тестирования.
Пользователь отвечает на вопросы теста, выбирая один из предложенных вариантов ответа.
После завершения теста отображается результат: количество правильных ответов из общего числа вопросов.

Структура проекта: 
Задана с помощью FSD https://feature-sliced.design/docs/get-started/overview, c целью дальнеишего масштабирования
features содержит основной функционал       
pages страницы
app точка входа в приложение

Технологии
React: для построения пользовательского интерфейса.
React Router: для маршрутизации между страницами.
Effector: для управления состоянием приложения.
TypeScript: для статической типизации JavaScript.
SCSS: для стилей.
JSON: для хранения данных о вопросах теста.

Дополнительно было сделано: 1)	Подсветка правильных и не правильных ответов при прохождении теста.
                            2)	Случайные позиции для правильного ответа при каждом новом прохождении.
