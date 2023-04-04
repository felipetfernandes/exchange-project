import './style.css'
import Swal from 'sweetalert2'
import coin from '../images/coin.svg'

const base = document.querySelector('input');
const button = document.querySelector('button');
const gride = document.querySelector('.wrapper-cotes');
const h2 = document.querySelector('h2');

const returnCotes = () => {
    fetch(`https://api.exchangerate.host/latest?base=${base.value}`)
    .then((response) => response.json())
    .then((date) => {
        try {
            gride.innerHTML = '';
            createElement(date.rates);
            h2.innerHTML = `Valores referentes a 1 ${base.value.toUpperCase() || 'EUR'}`;
            base.value = '';
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
              })
        }
    });
}

const createElement = (obj) => {
    if (!base.value) throw new Error('Você precisa informar uma moeda!')
    const currents = Object.keys(obj)
    if (!currents.includes(base.value.toUpperCase())) throw new Error('Moeda inválida')
    currents.forEach((current) => {
        if (current !== base.value.toUpperCase()) {
            const cote = document.createElement('div')
            cote.innerHTML = `<img src=${coin} /><p class="moeda">${current}</p><p class="valor">${obj[current]}</p>`
            gride.appendChild(cote)
        }
    })
}

button.addEventListener('click', returnCotes)
base.addEventListener('keypress', event => {
    if(event.key === 'Enter') returnCotes();
});