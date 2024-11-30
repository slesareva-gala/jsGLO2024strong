// Урок 28 Задание 1. Выбери тачку
"use strict";

// применение обработчика ошибок при подключении слушателя на несуществующий элемент
const cars = document.querySelector('#cars');
const result = document.querySelector('.result');

// получение по AJAX запросу 
const getData = () => fetch('./db.json')
    .then(response => response.json())
    .catch(() => { return { cars: [] }; });

// вывод результа выбора
const outChoice = (dataCar) => {
    if (cars.selectedIndex) {
        let text = ``;
        dataCar.forEach((car) => {
            text += `Тачка ${car.brand} ${car.model}
            Цена: ${car.price}$
            `;
        });
        result.innerText = text;
    } else {
        result.textContent = cars[0].value;
    }
};

// формирование списка машинок
const addCars = () => {
    getData()
        .then(data => {
            data.cars.forEach(car => {
                const option = document.createElement('option');
                option.textContent = car.brand;
                option.value = car.brand;
                cars.append(option);
            });
            outChoice();
        });
};

// отбор бренда машинок
const selectBrend = (brand) => {
    getData()
        .then(data => {
            const dataCar = data.cars.filter(car => car.brand.includes(brand));
            outChoice(dataCar);
        });
};

// выбор машинки
cars.addEventListener('change', (e) => {
    if (e.target.selectedIndex) {
        selectBrend(e.target[e.target.selectedIndex].value);
    } else {
        outChoice();
    }
});


addCars();

