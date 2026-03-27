
const img_clima = document.querySelector('.img-clima-celsius img');
const campo_conteudo = document.querySelector('.campo-conteudo');
const alerta_erro = document.querySelector('.alerta-erro');

async function chamarAPI(cidade) {
    try {
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cidade)}&appid=721c6b439f303ad1b39f30a29934c57e&units=metric&lang=pt_br`;

        const res = await fetch(url);
        const data = await res.json();
        
        imprimirInfos({
            city: data.name,
            pais: data.sys.country,
            tempAtual: data.main.temp,
            tempMax: data.main.temp_max,
            tempMin: data.main.temp_min,
            vento: data.wind.speed,
            umidade: data.main.humidity,
            descricao: data.weather[0].description,
            img: data.weather[0].icon
        })
    }catch (e) {
        alerta_erro.classList.add('show');
        alerta_erro.innerHTML = `Cidade ${cidade} não localizada`
    }
}

function imprimirInfos(infos) {
    campo_conteudo.classList.add('show');
    alerta_erro.classList.remove('show');
    //h1
    document.querySelector('.titulo h1').innerHTML = `${infos.city.toUpperCase()}`

    //bandeira de pais
    document.querySelector('.titulo img').setAttribute('src', `https://flagsapi.com/${infos.pais}/flat/64.png`);

    //img
    document.querySelector('.img-clima-celsius img').setAttribute('src', `https://openweathermap.org/payload/api/media/file/${infos.img}.png`);

    //Temperatura Atual
    document.querySelector('.img-clima-celsius p').innerHTML = `${infos.tempAtual.toFixed(1).toString().replace('.', ',')}<sup>°C</sup>`;

    //Temperatura Max e Min
    document.querySelector('.info-max p').innerHTML = `${infos.tempMax.toFixed(1).toString().replace('.', ',')}<sup>°C</sup>`;
    document.querySelector('.info-min p').innerHTML = `${infos.tempMin.toFixed(1).toString().replace('.', ',')}<sup>°C</sup>`;

    //Umindade
    document.querySelector('.info-umidade p').innerHTML = `${infos.umidade}<span>%</span>`;

    //Velocidade do Vento
    document.querySelector('.info-vento p').innerHTML = `${infos.vento}<span>Km/h</span>`;

    document.querySelector('h2').innerHTML = infos.descricao;
}

const input_pesquisa = document.querySelector('.campo-pesquisa input');
const btn_pesquisar = document.querySelector('.campo-pesquisa button');

btn_pesquisar.addEventListener('click', (e) => {
    e.preventDefault();
    campo_conteudo.classList.remove('show');
    chamarAPI(input_pesquisa.value);
})

input_pesquisa.addEventListener('keyup', (e) => {
    e.preventDefault();
    if(e.key === 'Enter') {
        chamarAPI(input_pesquisa.value);     
        campo_conteudo.classList.remove('show');
    }
})

