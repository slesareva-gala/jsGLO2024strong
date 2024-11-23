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

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // настраиваем
        xhr.open("POST", url);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');


        // ожидаем ответ 
        xhr.onload = () => resolve(xhr)
        xhr.onerror = () => reject({ message: `проблемы соединения с сервером ${xhr.responseURL}` })

        // отправляем
        xhr.send(JSON.stringify(data));
    })
        .then(xhr => {
            if (xhr.status >= 201 && xhr.status < 400) {
                return xhr.response
            } else {
                throw new Error(`${errMessage.send[xhr.status] || xhr.statusText} ${xhr.responseURL}`)
            }
        })
}

document.addEventListener("DOMContentLoaded", () => {
    getData('db.json')
        .then(dataGet => sendDataXMLHR({
            url: 'https://jsonplaceholder.typicode.com/posts',
            data: dataGet
        }))
        .then(dataSend => console.log(dataSend))
        .catch(err => console.error(`Ошибка: ${err.message}`))
});

