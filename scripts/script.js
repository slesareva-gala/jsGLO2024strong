const square = document.querySelector('.square-body')
const bloks = [...document.querySelectorAll('.block')]
const btnReset = document.querySelector('.btn-reset')

const exchange = (id1, id2) => {
    const s = bloks[id1].firstElementChild.textContent

    bloks[id1].firstElementChild.textContent = bloks[id2].firstElementChild.textContent
    bloks[id2].firstElementChild.textContent = s
}

square.addEventListener('click', (e) => {
    const button = e.target.closest('.arrow')
    if (!button) return

    const id = bloks.indexOf(button.parentNode.parentNode)

    switch (button.className.replace(/\s*arrow\s*/g, '')) {
        case 'left':
            if (id > 0) exchange(id, id - 1)
            break
        case 'right':
            if (id < 24) exchange(id, id + 1)
            break
        case 'top':
            if (id - 5 > -1) exchange(id, id - 5)
            break
        case 'bottom':
            if (id + 5 < 25) exchange(id, id + 5)
            break
    }
})

btnReset.addEventListener('click', () => { bloks.map((el, i) => el.firstElementChild.textContent = i + 1) })