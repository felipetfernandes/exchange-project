import './style.css'
import Swal from 'sweetalert2'

const base = document.querySelector('input');
const button = document.querySelector('button');
const gride = document.querySelector('.wrapper-cotes');
const h2 = document.querySelector('h2');


// https://api.exchangerate.host/convert?from=USD&to=EUR

const returnCotes = () => {
    fetch(`https://api.exchangerate.host/latest?base=${base.value}`)
    .then((response) => response.json())
    .catch((erro) => console.log(erro))
    .then((date) => {
        try {
            gride.innerHTML = '';
            createElement(date.rates);
            h2.innerHTML = `Valores referentes a 1 ${base.value || 'EUR'}`;
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
    if (!currents.includes(base.value)) throw new Error('Moeda inválida')
    currents.forEach((current) => {
        if (current !== base.value) {
            const cote = document.createElement('div')
            cote.innerHTML = `<img src="src/coins.svg"><p class="moeda">${current}</p><p class="valor">${obj[current]}</p>`
            gride.appendChild(cote)
        }
    })
    
}

button.addEventListener('click', returnCotes)