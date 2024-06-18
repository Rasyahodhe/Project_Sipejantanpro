let swiper = new Swiper(".slide-content", {
  slidesPerView: 4,
  spaceBetween: 10,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    220: {
      slidesPerView: 2,
    },
    450: {
      slidesPerView: 3,
    },
    500: {
      slidesPerView: 4,
    },
  },
});
