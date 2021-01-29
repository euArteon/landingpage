document.addEventListener('contextmenu', event => event.preventDefault());

/* Siema */
/* 
const mySiema = new Siema({
    perPage: {
      768: 2,
      1024: 3,
      },
    });
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
      prev.addEventListener('click', () => mySiema.prev());  next.addEventListener('click', () => mySiema.next());  
      next.onclick = () => { fbq('trackCustom','next', {content_type: 'product', content_ids: content_id})}
       */
/* Siema /*/

/* Stock */
initialHidden();
escrever();
diminuir();

function initialHidden() {
  setTimeout(function () {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('stock').style.display = 'block';
  }, 3500);

}

function escrever() {
    if (isNaN(localStorage.diminuido)){
        localStorage.diminuido = '13';
      }
    if (localStorage.diminuido) {
        unidades = localStorage.diminuido
    } else {
        unidades = '13';
    }
    document.getElementById('estoque').innerHTML = unidades;
}

function rnd(min = 1, max = 4) {
  valor = Math.floor((Math.random() * (max - min) + min));
  return valor;
}

function diminuir() {
  setInterval(function () {
    estoque = parseInt(document.getElementById('estoque').innerHTML);
    diminuir = estoque - rnd();
    document.getElementById('stock').style.display = 'none';
    lOn();
    setTimeout(function () {
      lOff();
      document.getElementById('stock').style.display = 'block';
    }, 3500);
    document.getElementById('estoque').innerHTML = diminuir;
    localStorage.setItem('diminuido', diminuir);
    if (estoque <= 3) {
      document.getElementById('estoque').innerHTML = estoque + 20;
      setTimeout(function () {
        document.getElementById('renovado').style.display = 'block';
      }, 1000);
      setTimeout(function () {
        document.getElementById('renovado').style.display = 'none';
      }, 15000);
    }
  }, 150000);
}

function lOff() {
  document.getElementById('loading').style.display = 'none';
}

function lOn() {
  document.getElementById('loading').style.display = 'block';
}
/* Stock /*/


/* Countdown */
aCountdown();

function aCountdown() {
  
    if (isNaN(localStorage.minutes)){
        localStorage.minutes = document.getElementById('a-minutes').innerHTML;
      }
    if (localStorage.minutes) {
        mnt = localStorage.minutes;
        setTimeout(() => {
          document.getElementById('a-minutes').innerHTML = localStorage.minutes;        
        }, 1000);        
    } else {
        mnt = document.getElementById('a-minutes').innerHTML;
    }

    if (isNaN(localStorage.seconds)){
      localStorage.seconds = document.getElementById('a-seconds').innerHTML;
    }
  if (localStorage.seconds) {
      sec = localStorage.seconds;
  } else {
      sec = document.getElementById('a-seconds').innerHTML;
  }
  localStorage.setItem('minutes', mnt);
  localStorage.setItem('seconds', sec);
  var myInterval = setInterval(function () {
    --sec;
    document.getElementById('a-seconds').innerHTML = sec;
    localStorage.setItem('seconds', sec);
    if (sec == 0) {
      sec = 60;
      mnt = mnt - 1;
      localStorage.setItem('minutes', mnt);
      setTimeout(function () {
        document.getElementById('a-minutes').innerHTML = mnt;        
      }, 1000);
    }
    if (mnt < 0) {
      document.getElementById('a-countdown').style.display = 'none';
      document.getElementById('a-msgPrazo').style.display = 'block';
    }
    if (mnt < 0) {
      clearInterval(myInterval);
    }
  }, 1000);
}
/* Countdown /*/


/* Offer Increment & Decrement */
function increment(id) {  
  max = parseInt(localStorage.diminuido);
  value = document.getElementById(id).value;
  value = isNaN(value) ? 0 : value;
  if (value >= max) {
    value = max;
    document.getElementById('msg1').style.display = 'block';
    setTimeout(function () {
      document.getElementById('msg1').style.display = 'none'
    }, 6000)
  } else {
    value++;
    fbq('track','addItem', {content_type: 'product', content_ids: content_id})
  }
  document.getElementById(id).value = value;
  //cont();
}

function decrement(id) {  
  min = 1;
  value = document.getElementById(id).value;
  value = isNaN(value) ? 0 : value;
  if (value <= min) {
    value = min;
  } else {
    value--;
  }
  document.getElementById(id).value = value;
  //cont();
}
/* Offer  Increment & Decrement /*/


/* Offer Image Select */
let imgproduct = document.querySelector('[data-product="product"]');
let imgvar1 = document.querySelector('[data-product="img-v1"]');
let imgvar2 = document.querySelector('[data-product="img-v2"]');
let imgvar3 = document.querySelector('[data-product="img-v3"]');
let imgvar4 = document.querySelector('[data-product="img-v4"]');

imgvar1.onclick = () => {imgproduct.setAttribute('src', 'images/product/var1.webp')}
imgvar2.onclick = () => {imgproduct.setAttribute('src', 'images/product/var2.webp')}
imgvar3.onclick = () => {imgproduct.setAttribute('src', 'images/product/var3.webp')}
imgvar4.onclick = () => {imgproduct.setAttribute('src', 'images/product/var4.webp')}

/* Offer Image Select /*/


/* Buy Button */

function firstBtn(){
  location.href='#price';
  fbq('trackCustom','firstBtn', {content_type: 'product', content_ids: content_id})
}

function secondBtn(){
  location.href='#price';
  fbq('trackCustom','secondBtn', {content_type: 'product', content_ids: content_id})
}

function thirdBtn(){
  location.href='#price';
  fbq('trackCustom','thirdBtn', {content_type: 'product', content_ids: content_id})
}

function buy(){
  fbq('trackCustom', 'cktBtn', {content_type: 'product', content_ids: content_id})
  qtd = document.querySelector('#v1').value;
  window.open(`https://deatly.com/checkout/?id=102&v1=${qtd}&color=ec7453&`, "_blank")
}
/* Buy Button /*/


/* Notifications */
let clsBtn = document.querySelector('#close-button');
let depBtn = document.querySelector('#depBtn');
let RstBtn = document.querySelector('#rastreio');
let TrcBtn = document.querySelector('#trocas');
let TrmBtn = document.querySelector('#termos');
let PltBtn = document.querySelector('#politicas');
let loading = document.querySelector('[data-loading]')

clsBtn.onclick = () => document.querySelector('#black-wrap').style.display = 'none';

depBtn.onclick = () => {
  fbq('trackCustom','next', {content_type: 'product', content_ids: content_id})
  document.querySelector('#black-wrap').style.display = 'block';
  document.querySelector('#response').innerHTML = '';
  loading.style.display = 'block';
  ajax = new XMLHttpRequest();
  ajax.open('GET','./proof.html');
  ajax.onloadend = () => {
      document.querySelector('#response').innerHTML = ajax.response;
      loading.style.display = 'none';
      var arr = document.getElementsByClassName('proofScript');
      for (var n = 0; n < arr.length; n++)
          eval(arr[n].innerHTML);
  }
  ajax.send();
}

RstBtn.onclick = () => {
  document.querySelector('#black-wrap').style.display = 'block';
  document.querySelector('#response').innerHTML = '';  
  loading.style.display = 'block';
  ajax = new XMLHttpRequest();
  ajax.open('GET','../footer/rastreio.html');
  ajax.onloadend = () => {
      document.querySelector('#response').innerHTML = ajax.response;
      loading.style.display = 'none';
  }
  ajax.send();
}
TrcBtn.onclick = () => {
  document.querySelector('#black-wrap').style.display = 'block';
  document.querySelector('#response').innerHTML = '';  
  loading.style.display = 'block';
  ajax = new XMLHttpRequest();
  ajax.open('GET','../footer/trocas.html');
  ajax.onloadend = () => {
      document.querySelector('#response').innerHTML = ajax.response;
      loading.style.display = 'none';
  }
  ajax.send();
}
TrmBtn.onclick = () => {
  document.querySelector('#black-wrap').style.display = 'block';
  document.querySelector('#response').innerHTML = '';  
  loading.style.display = 'block';
  ajax = new XMLHttpRequest();
  ajax.open('GET','../footer/termos.html');
  ajax.onloadend = () => {
      document.querySelector('#response').innerHTML = ajax.response;
      loading.style.display = 'none';
  }
  ajax.send();
}
PltBtn.onclick = () => {
  document.querySelector('#black-wrap').style.display = 'block';
  document.querySelector('#response').innerHTML = '';  
  loading.style.display = 'block';
  ajax = new XMLHttpRequest();
  ajax.open('GET','../footer/politicas.html');
  ajax.onloadend = () => {
      document.querySelector('#response').innerHTML = ajax.response;
      loading.style.display = 'none';
  }
  ajax.send();
}
/* Notifications /*/

