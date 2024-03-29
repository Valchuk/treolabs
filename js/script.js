"use strict";

window.onload = function () {
  var slider = new Slider({
    content: '.main-slider__wrapper > div',
    btnPrev: '.main-slider__arrows input[name=prev]',
    btnNext: '.main-slider__arrows input[name=next]',
    dots: '.main-slider__dots',
    auto: false
  });
  var animateWow = new WOW().init();
  var fontScaleButton = document.querySelectorAll('.font-scale__btn');
  var menuButton = document.querySelector('.main-navigation__mobile-btn');
  var menuContent = document.querySelector('.header__menu');
  basicScrollTop();

  for (var i = fontScaleButton.length - 1; i >= 0; i--) {
    fontScaleButton[i].onclick = function () {
      for (var i = 0; i < fontScaleButton.length; i++) {
        fontScaleButton[i].classList.remove('font-scale__btn_active');
      }

      this.classList.add('font-scale__btn_active');
      document.body.style.fontSize = this.value + 'px';
    };
  }

  menuButton.onclick = function () {
    this.classList.toggle('active');
    menuContent.classList.toggle('open');
  };
};

function basicScrollTop() {
  var scrollBtn = document.getElementById('scrollButton');
  var newsItem = document.querySelector('.main-news__wrapper');

  var btnReveal = function btnReveal() {
    if (document.documentElement.scrollTop >= 300) {
      if (window.matchMedia('(max-width: 992px)').matches) {
        document.querySelector('.header').classList.add('header__top_sticky');
      }

      scrollBtn.classList.add('is-visible');
    } else {
      scrollBtn.classList.remove('is-visible');

      if (window.matchMedia('(max-width: 992px)').matches) {
        document.querySelector('.header').classList.remove('header__top_sticky');
      }
    }
  };

  var TopscrollTo = function TopscrollTo() {
    if (document.documentElement.scrollTop != 0) {
      setTimeout(function () {
        window.scrollTo(0, document.documentElement.scrollTop - 30);
        TopscrollTo();
      }, 5);
    }
  };

  window.addEventListener('scroll', btnReveal);
  scrollBtn.addEventListener('click', TopscrollTo);
}

;

function Slider(slider) {
  var that = this;
  var i = 0;
  var timer;
  this.content = document.querySelectorAll(slider['content']);
  this.btnPrev = document.querySelector(slider['btnPrev']);
  this.btnNext = document.querySelector(slider['btnNext']);
  this.auto = slider['auto'];
  this.rate = slider.rate || 5000;
  this.dots = document.querySelector(slider['dots']);
  this.btnPrev.onclick = prev;
  this.btnNext.onclick = next;

  if (that.dots) {
    var slideQuantity = this.content.length;

    for (var j = 0; j <= slideQuantity - 1; j++) {
      var dotsButton = document.createElement('input');
      dotsButton.type = 'button';
      dotsButton.name = j;
      dotsButton.onclick = switchSlide;
      this.dots.appendChild(dotsButton);
    }

    this.dots.querySelector('input').classList.add('current');
  }

  if (that.auto) {
    setInterval(next, that.rate);
  }

  function prev() {
    that.content[i].classList.remove('active');
    that.dots.querySelector('input[name="' + i + '"]').classList.remove('current');
    i--;

    if (i < 0) {
      i = that.content.length - 1;
    }

    that.content[i].classList.add('active');
    that.dots.querySelector('input[name="' + i + '"]').classList.add('current');
  }

  function next() {
    that.content[i].classList.remove('active');
    that.dots.querySelector('input[name="' + i + '"]').classList.remove('current');
    i++;

    if (i >= that.content.length) {
      i = 0;
    }

    that.content[i].classList.add('active');
    that.dots.querySelector('input[name="' + i + '"]').classList.add('current');
  }

  function switchSlide() {
    that.content[i].classList.remove('active');
    that.dots.querySelector('input.current').classList.remove('current');
    that.content[this.name].classList.add('active');
    this.classList.add('current');
    i = this.name;
  }
}