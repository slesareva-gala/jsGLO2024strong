/* Урок № 4. Усложненное задание */
'use strict';

const ruDaysWeek = "понедельник, вторник, среда, четверг, пятница, суббота, воскресенье";
const enDaysWeek = "Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday";
const daysWeek = [["ru", ruDaysWeek], ["en", enDaysWeek]];

let lang = confirm("Дни недели выводить на английском языке ?") ? "en" : "ru";

if (lang == "en") console.log(enDaysWeek);
else console.log(ruDaysWeek);

switch (lang) {
    case "en":
        console.log(enDaysWeek);
        break;
    default:
        console.log(ruDaysWeek);
}

console.log(daysWeek[daysWeek.findIndex(el => el[0] == lang)][1]);

let namePerson = prompt("Введите Ваше имя:") || "студент";
console.log(namePerson == "Артем" ? "директор"
    : namePerson == "Александр" ? "преподаватель"
        : "студент");
