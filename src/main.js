import './style.css'
import Swal from 'sweetalert2'

const svg = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1_33)">
<path d="M7.00015 7.83381C4.14107 7.83381 1.7156 6.90936 0.507904 5.52756V5.80594C0.535423 7.71902 3.44766 9.28009 7.00015 9.28009C10.508 9.28009 13.4807 7.67938 13.4921 5.78455V5.5274C12.2845 6.9092 9.85907 7.83381 7.00015 7.83381Z" fill="#A7A7A7"/>
<path d="M7.00015 10.1004C4.14784 10.1004 1.71765 9.17278 0.507904 7.78925V8.15901C0.535423 10.0719 3.44766 11.633 7.00015 11.633C10.508 11.633 13.4807 10.0323 13.4921 8.13762V7.79098C12.2838 9.17452 9.85639 10.1004 7.00015 10.1004Z" fill="#A7A7A7"/>
<path d="M7.00015 12.4535C4.14784 12.4535 1.71765 11.5259 0.507904 10.1424V10.5257C0.535423 12.4389 3.44766 14 7.00015 14C10.508 14 13.4807 12.3993 13.4921 10.5044V10.1441C12.2838 11.5277 9.85639 12.4535 7.00015 12.4535Z" fill="#A7A7A7"/>
<path d="M8.36514 4.4131C8.36514 4.29106 8.29752 4.19889 8.16258 4.1363C8.02747 4.07372 7.82052 4.02669 7.5415 3.99475V4.81399C8.09054 4.76744 8.36514 4.63376 8.36514 4.4131Z" fill="#A7A7A7"/>
<path d="M5.84105 2.88342C5.98261 2.94742 6.19743 2.99681 6.48525 3.03156V2.19489C6.16207 2.21817 5.93857 2.26534 5.81434 2.33644C5.6904 2.40767 5.62845 2.49703 5.62845 2.60443C5.62843 2.72663 5.6992 2.81957 5.84105 2.88342Z" fill="#A7A7A7"/>
<path d="M7.00015 7.01328C10.5193 7.01328 13.4921 5.40753 13.4921 3.50655C13.4921 1.60575 10.5193 0 7.00015 0C3.48099 0 0.507904 1.60575 0.507904 3.50657C0.507904 5.40753 3.48102 7.01328 7.00015 7.01328ZM4.33295 2.1361C4.43941 1.98654 4.59197 1.85724 4.7914 1.74826C4.99067 1.63942 5.23317 1.55151 5.5188 1.48451C5.8044 1.41783 6.12667 1.37128 6.48508 1.34501V0.89631H7.54134V1.33227C7.86452 1.34376 8.19338 1.36782 8.52775 1.40399C8.86197 1.44063 9.1688 1.49064 9.44765 1.55435V2.41715C8.76571 2.27182 8.13034 2.19068 7.54134 2.17306V3.14045C7.82035 3.16955 8.09605 3.20807 8.36843 3.25588C8.64083 3.30385 8.88429 3.37337 9.09912 3.46505C9.3138 3.55658 9.48869 3.67642 9.62393 3.82459C9.75887 3.97259 9.82649 4.16287 9.82649 4.39533C9.82649 4.76729 9.62816 5.05934 9.23216 5.27119C8.83568 5.48336 8.27217 5.61547 7.54147 5.66767V6.11653H6.48522V5.68954C6.05129 5.68073 5.64287 5.65541 5.25975 5.61327C4.87679 5.57111 4.5591 5.5123 4.30653 5.43681V4.58298C4.47938 4.62372 4.64749 4.65925 4.81137 4.68992C4.97525 4.72028 5.14336 4.74638 5.31621 4.76825C5.4889 4.79012 5.67055 4.80741 5.86101 4.82061C6.05116 4.83367 6.25939 4.84168 6.48524 4.84452V3.89017C6.20655 3.86407 5.92975 3.82836 5.65516 3.78339C5.3804 3.73842 5.13364 3.67093 4.9144 3.58083C4.69516 3.49086 4.51696 3.37149 4.37982 3.22351C4.24236 3.0755 4.17394 2.88365 4.17394 2.64837C4.1738 2.45629 4.22681 2.28582 4.33295 2.1361Z" fill="#A7A7A7"/>
</g>
<defs>
<clipPath id="clip0_1_33">
<rect width="14" height="14" fill="white"/>
</clipPath>
</defs>
</svg>`
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
            cote.innerHTML = `${svg}<p class="moeda">${current}</p><p class="valor">${obj[current]}</p>`
            gride.appendChild(cote)
        }
    })
}

button.addEventListener('click', returnCotes)
base.addEventListener('keypress', event => {
    if(event.key === 'Enter') returnCotes();
});