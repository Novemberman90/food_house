
const menuImg = document.querySelector('.mobile-menu-img');
const mobilMenu = document.querySelector('.mobile-menu');

if(menuImg){
    menuImg.addEventListener('click', ()=>{
        document.documentElement.classList.toggle('_lock');
        menuImg.classList.toggle('__active');
        mobilMenu.classList.toggle('__active');
    });
}


const closeMenu = ()=>{
    menuImg.classList.remove('__active');
    mobilMenu.classList.remove('__active');
}

document.body.addEventListener('click', (e)=>{
    if(
    e.target.closest('.mobile-menu-img') == null && 
    e.target.closest('.mobile-menu') != mobilMenu
    )
    {closeMenu()}
});

mobilMenu.addEventListener('click', ()=>{
    if(mobilMenu.classList.contains('active')) {
        closeMenu();
    } else {
        menuImg.classList.remove('__active');
        mobilMenu.classList.remove('__active');
        document.documentElement.classList.remove('_lock');
    }
});

const swiper = new Swiper ('.swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    breakpoints: {

       
        920: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
       
        768: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        0: {
            slidesPerView: 1,
        },
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

  });

  var swiper2 = new Swiper(".mySwiper", {
    loop: true,
    slidesPerView:1,
    spaceBetween: 20,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView:1,
            spaceBetween: 20,
        }
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });