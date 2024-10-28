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
    let element = {};

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

const obj = document.querySelector('.container')
const myP = new DomElement('#my-p', '150px', 'fit-content', 'pink', '1.2rem');
const myDiv = new DomElement();

myDiv.selector = '.my-div';
myDiv.width = '150px';
myDiv.height = '150px';
myDiv.bg = '#e614ed69';
myDiv.fontSize = '20px';

myP.attach(obj).textContent = 'это параграф, ';
myDiv.attach(obj).textContent = 'а это дивный блок';