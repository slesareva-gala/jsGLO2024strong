"use strict";

const errMessage = {
    get: {
        404: 'для чтения ожидалсь файл: db.json',
    },
    send: {
        404: 'сервер приема сообщений не найден: ',
    }
}

const getData = (url) => fetch(url)
    .then(response => {
        if (!response.ok) throw new Error(errMessage.get[response.status] || response.statusText)
        return response.json()
    })

const sendDataXMLHR = ({ url, data }) => {

    let xhr = new XMLHttpRequest();
    // настраиваем
    xhr.open("POST", url);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    // отправляем
    xhr.send(JSON.stringify(data));

    // ответ
    xhr.onload = function () {
        if (xhr.status >= 201 && xhr.status < 400) {
            console.log('data', xhr.response)
        } else {
            console.error(`Ошибка: ${errMessage.send[xhr.status] || xhr.statusText} ${xhr.responseURL}`)
        }
    };
    xhr.onerror = function () {
        console.error("Ошибка соединения");
    };
};

document.addEventListener("DOMContentLoaded", () => {
    getData('db.json')
        .then(data => sendDataXMLHR({
            url: 'https://jsonplaceholder.typicode.com/posts',
            data
        }))
        .catch(err => console.error(`Ошибка: ${err.message}`))
});

