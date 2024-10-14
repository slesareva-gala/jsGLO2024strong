"use strict";

const elTimepiece = document.querySelector('.timepiece');
const txtFormat = elTimepiece.querySelectorAll('p');

const currentDate = () => {
    const date = new Date();
    return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        dayWeek: date.getDay(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        second: date.getSeconds(),
    }
};

// формат а)
const toFormat1 = (oDate) => {
    let endH, endM, endS;

    // формирование окончаний слов по числу
    const ending = (num, aEnding) => {
        const lastNum = +(num + '').slice(-1);

        return aEnding[
            (lastNum === 1 && num !== 11) ? 0 :
                (lastNum > 1 && lastNum < 5 && ![12, 13, 14].includes(num)) ? 1 : 2
        ];
    };

    // переводим название дня недели в строку
    oDate.dayWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг',
        'Пятница', 'Суббота', 'Воскресенье'][(oDate.dayWeek) ? oDate.dayWeek - 1 : 6];
    // переводим названия месяцев в родительном падеже
    oDate.month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'][oDate.month];

    // окончания названий единиц времени
    endH = ending(oDate.hours, ['', 'а', 'ов']);
    endM = ending(oDate.minutes, ['а', 'ы', '']);
    endS = ending(oDate.second, ['а', 'ы', '']);

    txtFormat[0].innerHTML = `Сегодня ${oDate.dayWeek},
    ${oDate.day} ${oDate.month} ${oDate.year} года,
    ${oDate.hours} час${endH} ${oDate.minutes} минут${endM} ${oDate.second} секунд${endS}`;
};

// формат б)
const toFormat2 = (oDate) => {
    const leadingZero = (num) => ('0' + num + ' ').slice(-3, -1);

    // начинаем нумерацию месяцев с 1
    oDate.month++;
    // проставляем ведущие нули
    for (let key in oDate) {
        if ('day,month,hours,minutes,second,'.includes(key + ',')) {
            oDate[key] = leadingZero(oDate[key]);
        }
    }

    txtFormat[1].innerHTML = `<b>${oDate.day}.${oDate.month}.${oDate.year}` +
        ` - ${oDate.hours}:${oDate.minutes}:${oDate.second}</b>`;
};

// первоначальный вывод 
toFormat1(currentDate());
toFormat2(currentDate());

// запускаем обновление каждую секунду
// для останова clearInterval(idTimer)
let idTimer = setInterval(() => {
    // выводим текущие значения
    toFormat1(currentDate());
    toFormat2(currentDate());
}, 1000);
