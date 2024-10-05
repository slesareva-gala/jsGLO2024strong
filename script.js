/* Урок № 5. Усложненное задание 1*/
/*
 1) Создать массив arr = []
— Записать в него 7 любых многозначных чисел в виде строк
— Вывести в консоль только те, что начинаются с цифры 2 или 4 (Должны присутствовать в массиве)
2) Вывести в столбик все простые числа от 1 до 100 (сделать при помощи цикла)
— Рядом с каждым числом написать оба делителя данного числа
    Например: “Делители этого числа: 1 и n”
*/

'use strict';

let arr = [];
let primeNumbers = [];

// запись в arr 7 случайных целых чисел
for (let i = 0; i < 7; i++) {
    arr[i] = Math.trunc(Math.random() * 10000) + "";
}

// запись в primeNumbers простых чисел до 100
for (let i = 2; i < 101; i++) {
    let isPrimary = true;

    for (let j = i - 1; j > 1; j--) {
        if (i % j) continue;
        isPrimary = false;
        break;
    }
    if (isPrimary) primeNumbers[primeNumbers.length] = i;
}

console.log('Ответ на задание 1:');
console.log('исходный массив:', arr);
console.log('числа массива, начинающиеся с 2 или 4:',
    arr.filter(item => "24".includes(item[0])));

console.log(`\nОтвет на задание 2 (простые числа до 100):`);
primeNumbers.forEach(elem => console.log(`${elem} Делители этого числа: 1 и ${elem}`))
