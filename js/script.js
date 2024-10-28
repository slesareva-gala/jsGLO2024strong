"use strict";

const DomElement = function (
    selector = '',
    width = '0px',
    height = '0px',
    bg = 'rgba(0, 0, 0, 0)',
    fontSize = '1rem'
) {
    this.selector = selector.replaceAll(' ', '');
    this.width = width.replaceAll(' ', '');
    this.height = height.replaceAll(' ', '');
    this.bg = bg.replaceAll(' ', '');
    this.fontSize = fontSize.replaceAll(' ', '');
};

// добавление элемента класса DomElement на страницу
DomElement.prototype.append = function () {
    const tag = this.selector[0];
    const attr = this.selector.slice(1);
    const dictonary = {
        '.': { tag: 'div', attr: 'class' },
        '#': { tag: 'p', attr: 'id' },
    };
    let element = {};

    if (tag in dictonary) {
        // приведение названия стиля JS в соответствие CSS
        const toCSSstyle = (s) => (s.replace(/[A-Z]/g, '-' + '$&').toLowerCase());

        element = document.createElement(dictonary[tag].tag);
        element.setAttribute(dictonary[tag].attr, toCSSstyle(attr));
        element.style.cssText = Object.keys(this)
            .filter(key => key !== 'selector')
            .reduce((text, key) => text += `${key === 'bg' ? 'background' : toCSSstyle(key)}: ${this[key]}; `, '');

        document.body.appendChild(element);
    }
    return element;
};

const obj = new DomElement('#my-p', '150px', 'fit-content', 'pink', '1.2rem');

obj.paddingLeft = '10px';
obj.paddingRight = '10px';
obj.fontStyle = 'italic';
obj.color = 'blue';
obj.append().textContent = 'Это параграф ';

obj.selector = '.myDiv';
obj.height = '150px';
obj.padding = '10px';
obj.append().textContent = 'и в том же стиле дивный блок';
