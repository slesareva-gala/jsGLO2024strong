// Урок 17 Практика ООП
"use strict";

// форма ввода соседей
const neighborForm = {
    form: document.forms['neighbor-form'].elements,
    el: {
        type: document.getElementById('neighbor-type'),
        adult: document.querySelector('.adult'),
        kid: document.querySelector('.kid'),
        hobbies: document.querySelector('.hobbies')
    },

    refresh: function () {
        const type = this.el.type.value
        this.el.adult.style.display = (type === 'adult') ? 'block' : 'none';
        this.el.kid.style.display = (type === 'kid') ? 'block' : 'none';
    },

    clear: function () {
        [...this.form].forEach(el => {
            switch (el.type) {
                case 'text':
                case 'date':
                case 'number':
                    el.value = '';
                    break;
                case 'radio':
                    this.form[el.name].value = 'false'
                    break;
                case 'select-one':
                    if (el.id !== 'neighbor-type') el.selectedIndex = 0;
                    break;
                case 'checkbox':
                    el.checked = false;
                    break;
            }
        });
    },

    validate: function () {
        const isAdult = this.el.type.value === 'adult';
        const regName = /^[А-Яа-яA-Za-z\-]+$/;
        const regDate = /^\d{4}.\d{2}.\d{2}$/;
        const setStyle = (el, isValid) => el.style.border = isValid ? '' : '1px solid red';
        const dict = [
            ['flat', el => el.value >= Neighbor.minFlat && el.value <= Neighbor.maxFlat],
            ['surname', el => regName.test(el.value.trim())],
            ['name', el => regName.test(el.value.trim())],
            ['patronymic', el => regName.test(el.value.trim()) || (!isAdult && el.value.trim().length < 1)],
            ['date-birth', el => regDate.test(el.value)],
            ['telephone', el => !isAdult || el.value.trim().length > 0],
            ['notes', el => !isAdult || el.value.trim().length > 0],
        ]

        let isValid = true;

        dict.forEach(arr => {
            if (arr[1](this.form[arr[0]])) setStyle(this.form[arr[0]], true)
            else {
                isValid = false
                setStyle(this.form[arr[0]], false)
            }
        })
        if (isAdult || [...this.form].filter(el => el.id.includes('hobbies') && el.checked).length > 0)
            setStyle(this.el.hobbies, true)
        else {
            isValid = false
            setStyle(this.el.hobbies, false)
        }
        return isValid;
    },
}

// таблица информации о соседях
const neighborTable = {
    el: {
        table: document.querySelector('table'),
    },

    render: function () {
        const neighbors = [...storage.read()];
        let inTable = '';

        this.el.table.querySelectorAll('.line').forEach((line) => {
            line.remove();
        });

        neighbors.sort((a, b) => (a.line.flat * 100 + (a.type === 'kid')) - (b.line.flat * 100 + (b.type === 'kid')));
        neighbors.forEach((obj, index) => {
            const isAdult = obj.type === 'adult';
            const line = isAdult ? new Adult() : new Kid();

            for (let key in obj.line) {
                line[key] = obj.line[key];
            }

            inTable += `
                <tr class="line">
                <td>${line.flat}</td>
                <td>${line.fullName}</td>
                <td>${line.gender ? 'мужской' : 'женский'}</td>
                <td>${line.dateBirthDMY}</td>
                <td>${isAdult ? line.telephone : ''}</td>
                <td>${isAdult ? line.notes : 'ребенок'}</td>
                <td>${isAdult ? '' : line.petName}</td>
                <td>${isAdult ? '' : line.hobbiesList}</td >
                <td align="middle">
                    <div class="button-del" id="${obj.id}"></div>
                </td>
                </tr > `;
        });
        this.el.table.querySelector('tbody').innerHTML += inTable;
    },
}

// базовый класс: сосед
class Neighbor {
    static minFlat = 1;
    static maxFlat = 80;

    constructor() {
        this.flat = 0;
        this._fullName = { surname: '', name: '', patronymic: '' };
        this.gender = true;
        this.dateBirth = '';
    }

    set fullName({ surname, name, patronymic }) {
        const uL = (str) => {
            str = str.replaceAll(' ', '').toLowerCase();
            return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : '';
        }

        this._fullName.surname = uL(surname);
        this._fullName.name = uL(name);
        this._fullName.patronymic = uL(patronymic);
    }

    get fullName() {
        return `${this._fullName.surname} ${this._fullName.name} ${this._fullName.patronymic}`;
    }
    get dateBirthDMY() {
        return this.dateBirth.split('-').reverse().join('.');
    }
}

// класс взрослый сосед
class Adult extends Neighbor {

    constructor() {
        super();
        this._telephone = '';
        this._notes = '';
    }
    set telephone(value) {
        this._telephone = value.trim().replace(/\s{2,}/g, " ");
    }
    get telephone() {
        return this._telephone;
    }
    set notes(value) {
        this._notes = value.trim().replace(/\s{2,}/g, " ");
    }
    get notes() {
        return this._notes;
    }
}

// класс ребенок сосед
class Kid extends Neighbor {
    static petDict = [];
    static hobbiesDict = [];

    constructor() {
        super();
        this.pet = 0;
        this._hobbies = Array(6).fill(false);
    }

    set hobbies(arr) {
        arr.forEach((l, i) => this._hobbies[i] = l)
    };
    get hobbies() { return this._hobbies }

    get petName() {
        return this.pet < Kid.petDict.length ? Kid.petDict[this.pet] : ''
    };
    get hobbiesList() {
        return this.hobbies.reduce((arr, is, i) => {
            if (is) arr.push(Kid.hobbiesDict[i])
            return arr;
        }, []).join(', ');
    }
}
Kid.petDict.push(...[...neighborForm.el.kid.querySelectorAll('.pet option')].map(el => el.value))
Kid.hobbiesDict.push(...[...neighborForm.el.kid.querySelectorAll('.hobbies input')].map(el => el.value))

// операции с localStorage
const storage = {
    is: ((type) => {    // проверка на доступность
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return false;
        }
    })('localStorage'),

    save: neighbors => {
        if (storage.is) localStorage.setItem('neighbors', JSON.stringify(neighbors));
    },
    read: () => {
        return (storage.is && JSON.parse(localStorage.getItem('neighbors')) || []);
    },
    add: function (line) {
        const neighbors = this.read();
        neighbors.push(line);
        this.save(neighbors);
    },
    delete: function (id) {
        this.save(this.read().filter(obj => obj.id !== id));
    }
}

// выбор блока форм для ввода нового соседа согласно выбранного типа
neighborForm.el.type.addEventListener('change', (e) => { neighborForm.refresh() });

// сохранение данных из формы ввода
document.querySelector('#neighbor-form').addEventListener('submit', (event) => {
    event.preventDefault();

    if (neighborForm.validate()) {
        const form = neighborForm.form;
        const type = neighborForm.el.type.value;
        const lineData = (type === 'adult') ? new Adult() : new Kid();

        lineData.flat = +form.flat.value;
        lineData.fullName = {
            surname: form.surname.value,
            name: form.name.value,
            patronymic: form.patronymic.value
        };
        lineData.gender = form.gender1.checked;
        lineData.dateBirth = form['date-birth'].value;

        if (type === 'adult') {
            lineData.telephone = form.telephone.value;
            lineData.notes = form.notes.value;
        } else {
            lineData.pet = form.pet.selectedIndex;
            lineData.hobbies = [
                form.hobbies0.checked, form.hobbies1.checked, form.hobbies2.checked,
                form.hobbies3.checked, form.hobbies4.checked, form.hobbies5.checked
            ];
        }

        storage.add({ id: (new Date()).getTime() + '', type, line: lineData });

        neighborForm.clear()
        neighborForm.refresh()

        neighborTable.render();
    }
});

// удаление из таблицы соседей
neighborTable.el.table.addEventListener('click', (e) => {
    if (e.target.classList.contains('button-del')) {
        storage.delete(e.target.id);
    }
    neighborTable.render();
})

// подключение на реагирования изменений на другой странице
window.addEventListener('storage', () => { neighborTable.render(); });

// запуск
neighborTable.render();

