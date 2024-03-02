
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
    document.documentElement.classList.remove('_lock');
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
       /* 920: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
       
        768: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },*/
        0: {
            slidesPerView: 1,
            spaceBetween: 20,
            
        },
        620: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        920: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
    navigation: {
        nextEl: ".swiperNext",
        prevEl: ".swiperPrev",
      },

  });
  const swiperPrev = document.getElementById('swiperPrev')
  const swiperNext = document.getElementById('swiperNext')
  
  swiperPrev.addEventListener('click', () => {
    swiper.slidePrev();
  })
  swiperNext.addEventListener('click', () => {
    swiper.slideNext();
  });


  var swiper2 = new Swiper(".testimonial-slider", {
    slidesPerView: 1,
   spaceBetween: 20,
      
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        480: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
         640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      autoHeight: true,
    },
    
 
  });