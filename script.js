/* Урок № 5. Усложненное задание 1*/
'use strict';

let varNumber;

const isNumber = function (str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
};

// сохранять в переменную ответ пользователя после проверки на число именно как число
do {
    varNumber = (prompt("Введите число:", "0") || "0").trim();
} while (!isNumber(varNumber));

console.log('varNumber:', varNumber, typeof (varNumber));
console.log('+varNumber:', +varNumber, typeof (+varNumber));
