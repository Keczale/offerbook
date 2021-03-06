# Offerbook

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

Deploy https://keczale.github.io/offerbook

Исходники - в ветке Develop

Стек фич:


Аутентификация(Firebase):
1. Регистрация по емейлу
2. Логин по емейлу
3. Восстановление пароля
4. Логин по аккаунту Google
5. Валидация полей
6. Отработка и вывод ошибок
7. Гард на незалогиненных пользователей - редирект на компонент Логин
8. Обратный гард - залогиненные редирект на модуль Офербук
9. Каждый пользователь при первой регистрации вводится объектом в БД
10. При каждой авторизации проверка на юзера в БД - иначе при синхронизации из стора придут нулевые данные = юзер обнулится без референдума

Дизайн и поведение

1. Полный адаптив - в мобильной версии переход на иконки, перерисовка некоторых компонентов.
2. Хедер при скроле вниз сужается.
3. Фильтры в мобильной версии выезжают из кнопки фильтр вызова.
4. При скроле вниз фильтры прячутся, вверх - выезжают - как у ютуба.
5. Кнопки меняют содержание, видимость, стиль в зависимости от условий, расположения, ширины экрана, наличия/отсутствия напр. комментариев

Кабинет

1. При первом входе открыть попап с выбором города.
2. Подключение продавца - двойной клик - откроется панель настроек продавца
3. Проверка идентификатора пользователя.
4. Выбор категорий для получения запросов покупателей - автоматическое формирование списка - из массива в моделях.
5. Выбор городов присутствия продавца - автоматически формируется из списка городов в массиве в моделях. Первый город подтягивается из стартового выбора города.
6. Кнопка очистить список - просто очищает чекбоксы выбораю
7. Довавить сведения о пользователе - имя, телефон, адрес.

Хедер

1. Логотип - редирект на рабочий стол покупателя
2. Кнопка переключатель продавца и покупателя - две роли совмещены
3. Меню: 
	- кнопка принимает имя юзера и его фото из гугла
	- выбор города - открыть попап. Выбранный город будет автоматом подгружаться при создании заказа.
	- вход в кабинет
	- выход из приложения
4. Прогресс бар для каждого модуля

Модуль Оффербук

1. Закрузка через LazyLoading
2. Генерация имени запроса\щффера\загружаемых файлов - через тайистамп + часть родного имени
3. Компрессор - загружаемые фото( при создании заказа, офера и изменении закза) подвергаются сжатию до 600px или остаются неизменными, если ширина меньше 600 px;

Реквест (рабочий стол покупателя)

1. если заказов ещё нет - вывести кнопку по центру "Сделать первый заказ", после кнопка в верхней панели
2. по клику - открыть попап оформлпения Заказа (город подтягивается автоматически из выбранного ранее)
3. верификация полей required
4. загрузка фотографий - с ограничением по размеру
5. если фото не загружено  - применяем изображение заглушку
6. кнопка задизейблена пока невалидны поля
7. карточки заказов в кабинете покупателя сортируются по дате
8. карточку запрос можно удалить - в том числе удаляет фото из БД 
9. карточку запрос можно изменить:
	- изменить можно любое поле
	- город, категория и б/у автоматически подгружаются из старого запроса

10. фильтры по реквестам: активные и завершенные

11. счетчик новых ответов на запрос + отображение в карточке лучшей цены из предложений
12. по клику на ссылку открываем список всех запросов - номинально отсортированы по цене от меньшей к большей

13. фото оффера можно открыть в попапе
14. возможность принять и утвердить запрос:
	- запрос выделяется и подписывается как принятый 
	- остальные запросы отмечены как отклоненные
	- продавцы в кабинете также видят изменение статусов своих офферов

15. "завершенный" запрос уходит из общей выдачи запросов для продавцов
16. Юзер после принятия оффера - может ставить оценку и оставить комментарий.
17. В карточке оффера юзер видит рейтинг продавца - средняя оценка и количество оценкок.
18. По клику на рейтинг продавца(класс актив) - открывается попап с последними комментариями по продавцу с указанием номера и заголовка заказа.


Оффер (рабочий стол продавца)

1. выгружает запросы покупателей исходя из города(-ов) и категорий, которые выбрал в настройке
2. из выдачи исключены собственные запросы на покупку
3. список сортируется в порядке последнего изменения запроса
4. фильтры: активные, отвеченные( на которые продавец откликнулся), отклоненные продавцом
5. пагинатор - выдача с учетом текущего фильтра + сохранение настроек для каждого фильтра
6. счетчик новых запросов от момента последнего обновления
7. кнопка обновить - обновляет список заказов
8. фото запроса можно открыть в попапе
9. отменить запрос:
	- по двойному клику удаляет запрос (но не из базы) - для удобства( 1. чтобы случайно не убрать 2. чтобы поштучно не удалять)
	- открывается кнопка сохранить - по клику удаляет, чтобы больше запрос в выдаче активных не появлялся, он переходит в фильтр отклоненные
10. откликнуться на запрос:
	- открыть попап с вводом данных и изображения
	- валидатор на ввод цены - только числа
	- отвеченный реквест переходит во вкладку отвеченные
	- покупатель получает в список офферов на свой реквест
	- у продавца появляется кнопка посмотреть детали оффера
11. отвеченный оффер выделяется в случае приема или отклонения покупателем (покупатель должен забрать товар)
12. Если Оффер принят - продавец получает доступ к данным покупателя - телефон, адрес и т.д.


Total 59

