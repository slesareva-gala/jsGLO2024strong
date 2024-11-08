"use strict";

const getInput = document.querySelector('#get_input');
getInput.outputTimeout = document.querySelector('#out_input');

getInput.addEventListener('input', (e) => {
    const debounce = function (o, v, t) {
        if (e.target.callTimmer) clearTimeout(e.target.callTimmer);
        e.target.callTimmer = setTimeout(() => {
            o.textContent = v;
            e.target.callTimmer = 0;
        }, t);
    };
    if ('outputTimeout' in e.target)
        debounce(e.target.outputTimeout, e.target.value, 300);
});


