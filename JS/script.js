
const img_clima = document.querySelector('.img-clima-celsius img');

async function chamarAPI(cidade) {
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
}

function imprimirInfos(infos) {
    //h1
    document.querySelector('.infos-principais h1').innerHTML = `${infos.city}, ${infos.pais}`

    //img
    document.querySelector('.img-clima-celsius img').setAttribute('src', `https://openweathermap.org/payload/api/media/file/${infos.img}.png`);

    //Temperatura Atual
    document.querySelector('.img-clima-celsius p').innerHTML = infos.tempAtual;

    //Temperatura Max e Min
    document.querySelector('.info-max').innerHTML = infos.tempMax;
    document.querySelector('.info-min').innerHTML = infos.tempMin;

    //Umindade
    document.querySelector('.info-umidade p').innerHTML = infos.umidade;

    //Velocidade do Vento
    document.querySelector('.info-vento p').innerHTML = infos.vento;

    document.querySelector('h2').innerHTML = infos.descricao;
}


const input_pesquisa = document.querySelector('.campo-pesquisa input');
const btn_pesquisar = document.querySelector('.campo-pesquisa button');

btn_pesquisar.addEventListener('click', (e) => {
    e.preventDefault();

    chamarAPI(input_pesquisa.value);
})
