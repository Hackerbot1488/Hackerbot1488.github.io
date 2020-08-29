$(document).ready(function () {
  const mMenuBtn = $('.mobile-menu-button')
  const mMenu = $('.m-menu')
  const tab = $('.tab')
  mMenuBtn.on('click', function () {
    mMenu.toggleClass('m-menu_active')
    $('body').toggleClass('no-scroll')
  });
  tab.on('click', function () {
    tab.removeClass('cast__title_active')
    $(this).toggleClass('cast__title_active')
    let activeTabContent = $(this).attr('data-target')
    $('.tabs__content').removeClass('tabs__content_visible')
    $(activeTabContent).toggleClass('tabs__content_visible')
  })
  const mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 4,
    spaceBetween: 25,
    breakpoints: {
      992: {
        slidesPerView: 4
      },
      768: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 1,
        navigation: {
          nextEl: '.button-next'
        }
      }
    },
    loop: true,
  })
})