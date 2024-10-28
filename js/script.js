"use strict";

const DomElement = function (
    selector = '',
    width = '0px',
    height = '0px',
    bg = 'rgba(0, 0, 0, 0)',
    fontSize = '1rem'
) {
    this.selector = selector;
    this.width = width;
    this.height = height;
    this.bg = bg;
    this.fontSize = fontSize;
};

DomElement.prototype.attach = function (parent) {
    const tag = this.selector[0];
    const attr = this.selector.slice(1);
    const dictonary = {
        '.': { tag: 'div', attr: 'class' },
        '#': { tag: 'p', attr: 'id' },
    };
    let element;

    if (tag in dictonary) {
        const toCSSstyle = (s) => (s.replace(/[A-Z]/g, '-$&').toLowerCase());

        element = document.createElement(dictonary[tag].tag);
        element.setAttribute(dictonary[tag].attr, attr);
        element.style.cssText = Object.keys(this)
            .filter(key => key !== 'selector')
            .reduce((text, key) => text += `${key === 'bg' ? 'background' : toCSSstyle(key)}: ${this[key]}; `, '');

        (parent instanceof Element ? parent : document.body).appendChild(element);
    }
    return element;
};

const move = function (e) {
    const step = 10;

    let x = parseInt(this.style.left) || 0;
    let width = parseInt(this.style.width);
    let y = parseInt(this.style.top) || 0;
    let height = parseInt(this.style.height);

    switch (e.key) {
        case 'ArrowRight':
            x = (x + width + step) > window.innerWidth ? window.innerWidth - width : x + step;
            break;
        case 'ArrowLeft':
            x = x < step ? 0 : x - step;
            break;
        case 'ArrowDown':
            y = (y + height + step) > window.innerHeight ? window.innerHeight - height : y + step;
            break;
        case 'ArrowUp':
            y = y < step ? 0 : y - step;
            break;
    }
    this.style.left = x + 'px';
    this.style.top = y + 'px';
}

const start = function () {
    const element = this.attach();

    if (element) document.addEventListener('keydown', move.bind(element));
}

const square = new DomElement('.', '100px', '100px', 'pink');
square.position = 'absolute';
square.left = '0';
square.top = '0';

document.addEventListener('DOMContentLoaded', start.bind(square))
