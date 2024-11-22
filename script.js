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


const sendData = ({ url, data }) => fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then(response => {
        if (!response.ok) throw new Error(errMessage.send[response.status] + url || response.statusText)
        return response.json()
    })

document.addEventListener("DOMContentLoaded", () => {
    getData('db.json')
        .then(data => sendData({
            url: 'https://jsonplaceholder.typicode.com/posts',
            data
        }))
        .then(data => console.log('data', data))
        .catch(err => console.error(`Ошибка: ${err.message}`))
});

