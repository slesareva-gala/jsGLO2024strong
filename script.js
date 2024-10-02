/* Урок № 4. Усложненное задание */
'use strict';

// замена части строк после 30 символа на '...'
const cutChar30 = (str) => {
    const maxCount = 30;

    if (typeof (str) == "string") {
        str = str.trim();
        if (str.length > maxCount) {
            str = str.slice(0, maxCount) + '...';
        }
    } else {
        console.error(`Параметр str функции cutChar30(str) должен иметь тип string \n передано: str = ${str},  тип: ${typeof (str)}`);
    }

    return str;
};

cutChar30(100000);
console.log(cutChar30('           Строка маленькая             '));
console.log(cutChar30('  Строка обрезается на символе30, а следом ... ')); 
