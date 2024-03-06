const popupLinks = document.querySelectorAll('.popup__link'); /* Эта ссылку будет открывать модальное окно. на есть в нескольких элементах
на странице */
const body = document.querySelector('body'); 
const lockPadding = document.querySelectorAll(".lock-padding"); /* буду блокировать паддинг для скрыитя линии скрола сбоку т.к. при открытии 
и закрытии модальног окна страничка может ездить вправо-лево из-за полосы прокрутки */

let unlock = true; /* это чтобы не было двойныъ кликов */

const timeout = 800; /* это для время которые я указывал в транзишене у модальному окну. Это для того, чтобы вовермя высчитывать
и прятать паддингом боковую линию прокрутки, чтобы оно работало одновременно */

if (popupLinks.length > 0) { /* проверяю есить ли вообще такие ссылки на странице popupLinks. Если есть тогда запускаю событие*/
    for(let index = 0; index < popupLinks.length; index++) { /* прохожусь по всем ссылкам где есть клас popupLinks */
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function(e) { /* вешаем событие */
            const popupName = popupLink.getAttribute('href').replace('#',''); /*В случае находения popupLinks убераем из id знак #, чтобы получить чистое имя */
            const curentPopup = document.getElementById(popupName); /* и сюда получаю чистое имя элемента */
            popupOpen(curentPopup); /* и потом отправляю его в функцию окрытия окна */
            e.preventDefault();/* т.к. это ссылка я запрещаю переход по ней и перезагрузку страницы */
        });
    }
}


/* Поиск закрывающих классов модального окна. Найденный элемент передадим в функцию закрытия */
const popupCloseIcon = document.querySelectorAll('.close-popup'); /* закрывам по этому классу. Это так делаю для того, 
чтобы когда есть текст или форма и там обычно есть кнкопки "Отправить и Закрыть" так мы сможем закрыть по любым объект включая крестик который есть у меня в разметке или в самом окне*/
if (popupCloseIcon.length > 0) { /* проверка на наличие элементов  с таким классом */
    for (let index = 0; index < popupCloseIcon.length; index++) { /* проверяю циклом */
        const el = popupCloseIcon[index]; /* полученные элементы складываю сюда */
        el.addEventListener('click', function(e){ /* на полученный элемент вещаю событие */
            popupClose(el.closest('.popup')); /* при событии я отправляю в фунцию popupClose элемент, который является ближайшим родителем
            нажатой ссылке с классом  .popup. Т.е. цикл будет будет идти в верх по родителям окна и искать у кого есть этот класс */
            e.preventDefault();
        });
    }
}


/* Функция открытия окна и закрытия ранее открытых модальных окон*/

function popupOpen(curentPopup) { /* вот сюда получаем готовый элемент с чистым именем id без # */
    if(curentPopup && unlock) { /* проверяем есть ли такой элемент и окрыта ли перменная unlock - изначально мы её открыли true */
        const popupActive = document.querySelector('.popup.open'); /* получаем открытый элемент.т.е. окно с классмо опен */
        if (popupActive) { /* и если у нас сущесвует открытое окно с эим классом, то закрыть его */
            popupClose(popupActive, false); /* сюда мы отправляем элемент, который нам надо закрыть */
        } else {
            bodyLock(); /* а если такого нет, то продолжаем блокировать нашу страницу от скрола и продолжаем показывать открытое окно */
        }
       
        curentPopup.classList.add('open');  /* после всей процедуры добавляем к полученному элементу класс open и открываем его */
        curentPopup.addEventListener("click", function(e){ /*  и тут же окну, что открылось вешаем событие при клике на всё вокруг кроме тёмной области вокруг окна*/
            if(!e.target.closest('.popup__content')) { /* проверяем, что если у нажатого элемента нету и в его родителях элементов с классом popup__content */
                popupClose(e.target.closest('.popup')); /* тогда мы окно закрываем. Т.е. передаем в закрытие блийжай элемент с класом popup */
            } /* короче это всё говорит о том, что при клике на любое место в модальном окне у нас ничего не будет проиходить потому, что у нас есть проверка 
            !e.target.closest('.popup__content') на если нету в родителях .popup__content (если НЕТУ), а его нет, только у элементов уторые за приделами модального окна
            , а это как раз и будет поле вокруг окна. И как только нажмем на область за окном, тогда оно закоется, а на если на самом окне, то оно не будет закрыватся*/
        });
    }
}

/* Функция закрытия  */
/* передаем сюда активное открытое окно popupActive и вместе с этим значение стоил ли нам использовать блокировать скрол в этот раз или нет.
 Это для того, чтобы можно блыо открывать ещё опапы. Т.е. мы открыли попал и скрол у нас скрыт и чтобы его не открывать в момент переключения далее обяъяснение в unLockPopup */
 /* Т.е. когда мы открываем, новый попап и при том, что у нас есть уже открытый попап в этот момент мы запрещаем ему выполнять расблокировку*/
function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if(doUnlock) {
            bodyUnlock();
        }
    }
}

/* Функция скрытия линии скрола сбоку страницы для того, чтобы не прыгала станичка влево-право */

function bodyLock() {
    /* для начала высчитываю разницу между шириной viewport(экрана целиком) и шириной того, что внутри т.е. самого сайта и 
    таким образом мы получим ширину самой линии прокрутки. Это нужно для того, что когда открываем окно, то скрол страницы пропадает и сайт скдивается на место строла, 
    а когда закрываем, то линия скрола возврщается и сайт смещается влево, а линия скрола будет только для окна и сдвига небудет*/
    const lockPaddingValue = window.innerWidth - document.querySelector('.header').offsetWidth + 'px'; /* разница ложится сюда */
   
    if (lockPadding.length > 0) { /* проверяем, а если элементы с таким класом вообще */
        for( let index = 0; index < lockPadding.length; index++) { /* проходимся по всем у кого есть lock-padding и добавляем тоже самое, что и боди
    т.е. высчитанный этот паддинг. Допустим шапке сайта */
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
    }
}
    body.style.paddingRight = lockPaddingValue; /* присваиваю это значение в видк паддинга справа */
    body.classList.add('lock'); /* и присваием его самому боди */

    /* а вот тут на время  блокием переменную unlock т.к. во время открытия окна мы проверяем открыта она или и нет пока открывается окно, 
    а отом через 800 мсек снимаем запрет. Это сделано для того, чтобы не было двойного клика пока коно открывается и не словить глюк*/
    unlock = false; 
    setTimeout(function () {
        unlock = true;
        }, timeout);
}

 /* Тут когда мы открываем, новый попап и при том, что у нас есть уже открытый попап в этот момент мы запрещаем ему выполнять расблокировку*/
/* Показываем скрол так, как и убераем т.к. через время 800 мсек когда окно закрывается, чтобы это было одновременно */
 function bodyUnlock() {
    setTimeout(function() {
        if(lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
        }
    }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}

/* Закрытие нажатем ESC */
let KEYCODE_ESC = 27;
document.addEventListener('keydown', function(e) {
    if(e.keyCode == KEYCODE_ESC) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

