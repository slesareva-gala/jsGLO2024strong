// Урок 28 Задание 3. Конвертер валют
"use strict";

// вводимые данные формы запроса
const converter = document.forms.converter.elements;
// отображаемые данные формы
const nameIn = document.querySelector('.name-in');
const nameTo = document.querySelector('.name-to');
// кнопка конвертирования
const сonvert = document.querySelector('.converter .button');

// курсы
const exchangeRates = {
    EUR: "",
    USD: "",
    error: true
};

// отображения выбора валют
const sayChoice = () => {
    const currency = {
        RUB: "Российский рубль (RUB)",
        EUR: "Евро (EUR)",
        USD: "Доллар США (USD)"
    };
    nameIn.textContent = converter['in-rub'].checked ? currency.RUB :
        converter.usd.checked ? currency.USD : currency.EUR;
    nameTo.textContent = converter['in-cur'].checked ? currency.RUB :
        converter.usd.checked ? currency.USD : currency.EUR;
};

document.forms.converter.addEventListener('change', (e) => {
    if (e.target.name === 'in-choise' || e.target.name === 'currency') {
        sayChoice();
        converter['curr-in-curr'].value = '';
    }
});
document.forms.converter.addEventListener('input', (e) => {
    if (e.target.name === 'input-in') {
        e.target.value = e.target.value.replace(/\D+/gi, "");
        converter['curr-in-curr'].value = '';
    }
});
document.forms.converter.addEventListener('submit', (e) => {
    e.preventDefault();
});

// конвертация
сonvert.addEventListener('click', (e) => {
    const inCurr = converter['in-rub'].checked ? 'RUB' :
        converter.usd.checked ? 'USD' : 'EUR';
    const toCurr = converter['in-cur'].checked ? 'RUB' :
        converter.usd.checked ? 'USD' : 'EUR';
    let value = 0;
    if (exchangeRates.error) {
    } else if (inCurr === 'RUB') {
        value = Math.round(+converter['input-in'].value / exchangeRates[toCurr] * 10000) / 10000;
    } else {
        value = Math.round(+converter['input-in'].value * exchangeRates[inCurr] * 10000) / 10000;
    }
    converter['curr-in-curr'].value = value ? +value.toFixed(4) : '';
});


fetch("https://www.cbr-xml-daily.ru/daily_json.js")
    .then(response => response.json())
    .then((data) => {
        exchangeRates.EUR = data.Valute.EUR.Value;
        exchangeRates.USD = data.Valute.USD.Value;
        document.getElementById('comment').textContent =
            `* по официальному курсу на ${data.Date.slice(8, 10) + data.Date.slice(4, 8) + data.Date.slice(0, 4)}`;
        exchangeRates.error = false;
    })
    .catch(error => {
        exchangeRates.EUR = '';
        exchangeRates.USD = '';
        document.getElementById('comment').textContent = '* курсы валют недоступны ';
        exchangeRates.error = true;
    });
// текущий выбор валют    
sayChoice();
