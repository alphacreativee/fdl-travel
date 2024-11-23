if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

$(document).ready(function () {
  const lenis = new Lenis({
    smooth: true,
    easing: (t) => 1 - Math.pow(1 - t, 3), // Eases out the scroll
    duration: 1.25, // Adjust for smoother scroll duration
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Adjusting speed factor for smoother performance
  });

  gsap.ticker.lagSmoothing(0);
  closeModalBoot();
  customDropdown();
  scrollHeader();
  swiperBanner();
  searchBar();
  createFilter();
  swiperTours();
  countDown();
  swiperTopTour();
  swiperTravelGuide();
  swiperCustomStory();
  scrollCTA();
  parrallaxAboutBanner();
});
window.onload = function () {
  window.scrollTo(0, 0);
  pinCards();
  parallaxImage();
  ScrollTrigger.refresh();
};
function parallaxImage() {
  gsap.registerPlugin(ScrollTrigger);
  if ($(".overlay-image").length) {
    const sections = document.querySelectorAll(".strategies_image-wrapper");

    sections.forEach((section) => {
      const image = section.querySelector(".strategies_image");
      const overlay = section.querySelector(".strategies_image-overlay");

      gsap.set([image, overlay], {
        y: 100,
        willChange: "transform",
        transformStyle: "preserve-3d",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 55%",
          end: "top 10%",
          scrub: true,
          // markers: true,
        },
      });

      tl.to(image, { y: 0, ease: "none", duration: 5 }).to(
        overlay,
        { y: 0, ease: "none", duration: 5 },
        "<"
      );
    });
  }
}
function scrollCTA() {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    start: "top top",
    end: 99999,
    onUpdate: (self) => {
      if (self.direction === -1) {
        $(".footer__cta").removeClass("hide");
      } else {
        $(".footer__cta").addClass("hide");
      }
    },
  });

  ScrollTrigger.create({
    trigger: ".footer",
    start: "top bottom",
    end: "bottom 80vh", // Điều chỉnh vị trí end nếu cần
    toggleClass: "freeze",
    scrub: 0.5,
  });
}

$(window).on("load", scrollCTA);

function closeModalBoot() {
  const modals = document.querySelectorAll(".modal"); // Chọn tất cả modal
  modals.forEach((modalElement) => {
    const modal = new bootstrap.Modal(modalElement, {
      backdrop: true,
    });
  });
}
function scrollHeader() {
  gsap.registerPlugin(ScrollTrigger);
  let height = 33 * -1;
  function initializeScrollTrigger() {
    navTop = gsap
      .from(".header", {
        y: height,
        paused: true,
        duration: 0.5,
        ease: "power1.out",
        trigger: "header",
      })
      .progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      // markers: true,
      onUpdate: (self) => {
        self.direction === -1 ? navTop.play() : navTop.reverse();
      },
    });
  }

  initializeScrollTrigger();

  // Re-initialize ScrollTrigger when page is refreshed
  $(window).on("load", initializeScrollTrigger);
}
function customDropdown() {
  const $dropdowns = $(".dropdown-custom");

  $dropdowns.each(function () {
    const $dropdown = $(this);
    const $btnDropdown = $dropdown.find(".dropdown-custom__btn");
    const $dropdownMenu = $dropdown.find(".dropdown-custom__menu");
    const $dropdownItems = $dropdown.find(".dropdown-custom__item");
    const $textDropdown = $dropdown.find(".dropdown-custom__text");

    $btnDropdown.on("click", function (e) {
      e.stopPropagation();
      closeAllDropdowns($dropdown);
      $dropdownMenu.toggleClass("dropdown--active");
      $btnDropdown.toggleClass("--active");
    });

    $(document).on("click", function () {
      closeAllDropdowns();
    });

    $dropdownItems.on("click", function (e) {
      e.stopPropagation();
      const $item = $(this);
      let tmpText = $textDropdown.text();
      const tmpImgSrc = $textDropdown.find("img").attr("src"); // Get the current image src if present
      const $img = $item.find("img"); // Check if the clicked item contains an img

      // Swap text content
      $textDropdown.text($item.text());

      // If the item has an image, swap the img src
      if ($img.length) {
        $textDropdown.html($item.html()); // Swap the entire HTML, including the img

        if ($item.hasClass("language__item")) {
          tmpText = `<span>${tmpText}</span>`;
        }

        $item.html(
          `${tmpImgSrc ? `<img src="${tmpImgSrc}" />` : ""} ${tmpText}`
        ); // Swap img and text back to the item
      } else if ($item.hasClass("language__item")) {
        $item.text(tmpText);
      }

      closeAllDropdowns();
    });

    function closeAllDropdowns(exception) {
      $(".dropdown-custom__btn").removeClass("active");
      $dropdowns.each(function () {
        const $menu = $(this).find(".dropdown-custom__menu");
        const $ic = $(this).find(".dropdown-custom__btn");
        if (!exception || !$(this).is(exception)) {
          $menu.removeClass("dropdown--active");
          $ic.removeClass("--active");
        }
      });
    }
  });
}

function swiperBanner() {
  if ($(".hero-sec").length) {
    var interleaveOffset = 0.9;

    var swiperBanner = new Swiper(".swiper-banner", {
      loop: true,
      speed: 1500,
      grabCursor: true,
      watchSlidesProgress: true,
      mousewheelControl: true,
      keyboardControl: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: true,
      },
      on: {
        progress: function (swiper) {
          swiper.slides.forEach(function (slide) {
            var slideProgress = slide.progress || 0;
            var innerOffset = swiper.width * interleaveOffset;
            var innerTranslate = slideProgress * innerOffset;
            // Kiểm tra nếu innerTranslate không phải là NaN
            if (!isNaN(innerTranslate)) {
              var slideInner = slide.querySelector(".slide-banner");
              if (slideInner) {
                slideInner.style.transform =
                  "translate3d(" + innerTranslate + "px, 0, 0)";
              }
            }
          });
        },
        touchStart: function (swiper) {
          swiper.slides.forEach(function (slide) {
            slide.style.transition = "";
          });
        },
        setTransition: function (swiper, speed) {
          var easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";
          swiper.slides.forEach(function (slide) {
            slide.style.transition = speed + "ms " + easing;
            var slideInner = slide.querySelector(".slide-banner");
            if (slideInner) {
              slideInner.style.transition = speed + "ms " + easing;
            }
          });
        },
      },
    });
  }
}
function searchBar() {
  $(".dropdown-custom__destination .dropdown-custom__btn").on(
    "click",
    function (e) {
      const clickYPosition = e.clientY;
      const viewportHeight = $(window).height();
      console.log(viewportHeight);

      if (clickYPosition > viewportHeight / 2) {
        console.log("aa");
        $(".dropdown-custom__menu").addClass("dropdown-up");
      } else {
        console.log("abb");
        $(".dropdown-custom__menu").removeClass("dropdown-up");
      }
    }
  );
  //

  if ($(".hero-sec__search").length) {
    var pickerArrival = new Lightpick({
      field: document.getElementById("dateArrival"),
      singleDate: true,
      numberOfMonths: 1,
      minDate: new Date(),
      onOpen: function () {
        var input = pickerArrival._opts.field; // Use pickerArrival instead of picker
        var rect = input.getBoundingClientRect();
        var calendar = pickerArrival.el; // Use pickerArrival instead of picker
        if (rect.top >= window.innerHeight / 2) {
          calendar.style.top =
            rect.top + window.scrollY - calendar.offsetHeight - 38 + "px";
          calendar.style.left = rect.left + window.scrollX - 30 + "px";
        } else {
          calendar.style.top = rect.bottom + window.scrollY + 20 + "px";
          calendar.style.left = rect.left + window.scrollX - 30 + "px";
        }
      },
    });
  }
}

function createFilter() {
  $(".tour-sec__filter").each(function () {
    const $filterSection = $(this);
    const $resultContainer = $filterSection.siblings(".tour-sec__result");
    $filterSection.find(".filter-button[data-type]").on("click", function () {
      const $this = $(this);
      const filterType = $this.data("type");
      console.log("Filter Type:", filterType);
      $this.addClass("active").siblings().removeClass("active");
      gsap.to($resultContainer, {
        autoAlpha: 0,
        duration: 0.25,
        onComplete: () => {
          if (filterType === "all") {
            $resultContainer.find(".tour-sec__item[data-filter]").show();
          } else {
            $resultContainer.find(".tour-sec__item").hide();
            $resultContainer
              .find(`.tour-sec__item[data-filter='${filterType}']`)
              .show();
          }

          gsap.to($resultContainer, {
            autoAlpha: 1,
            duration: 0.25,
          });
        },
      });
    });
  });
}

function swiperTours() {
  if ($(".tour-sec__result").length) {
    let interleaveOffsetTour = 0.8;
    var swiperSuites = $(".swiper-tour");
    swiperSuites.each(function () {
      var $this = $(this);

      new Swiper($this[0], {
        slidesPerView: 1,
        speed: 1000,
        init: true,
        pagination: {
          el: $this.find(".swiper-pagination")[0],
          clickable: true,
          hideOnClick: false,
          type: "bullets",
          dynamicBullets: true,
          // dynamicMainBullets: 5,
        },
        navigation: {
          nextEl: $this.find(".swiper-button-next")[0],
          prevEl: $this.find(".swiper-button-prev")[0],
        },
        watchSlidesProgress: true,
        mousewheelControl: true,
        keyboardControl: true,

        on: {
          progress: function (swiper) {
            swiper.slides.forEach(function (slide) {
              var slideProgress = slide.progress || 0;
              var innerOffset = swiper.width * interleaveOffsetTour;
              var innerTranslate = slideProgress * innerOffset;
              // Kiểm tra nếu innerTranslate không phải là NaN
              if (!isNaN(innerTranslate)) {
                var slideInner = slide.querySelector(".slide-banner");
                if (slideInner) {
                  slideInner.style.transform =
                    "translate3d(" + innerTranslate + "px, 0, 0)";
                }
              }
            });
          },
          touchStart: function (swiper) {
            swiper.slides.forEach(function (slide) {
              slide.style.transition = "";
            });
          },
          setTransition: function (swiper, speed) {
            var easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";
            swiper.slides.forEach(function (slide) {
              slide.style.transition = speed + "ms " + easing;
              var slideInner = slide.querySelector(".slide-banner");
              if (slideInner) {
                slideInner.style.transition = speed + "ms " + easing;
              }
            });
          },
        },
      });
    });
  }
}

function countDown() {
  // Lấy thời gian đếm ngược từ HTML (dùng thuộc tính `data-time`)
  const countdownElement = document.querySelector(".countdown");
  if (countdownElement) {
    const countDownDate = new Date(
      countdownElement.getAttribute("data-time")
    ).getTime();

    const hourscontainer = countdownElement.querySelector(".js-hours span");
    const minutescontainer = countdownElement.querySelector(".js-minutes span");
    const secondscontainer = countdownElement.querySelector(".js-seconds span");

    const startCountdown = () => {
      const timer = setInterval(function () {
        // Lấy thời gian hiện tại
        let now = new Date().getTime();

        // Tính khoảng cách giữa hiện tại và thời gian đếm ngược
        let distance = countDownDate - now;

        // Nếu đã hết thời gian, dừng bộ đếm
        if (distance < 0) {
          countdownElement.remove(); // Xóa bộ đếm ngược
          clearInterval(timer); // Dừng bộ đếm
          return; // Thoát
        }

        // Tính toán số giờ, phút, giây còn lại
        let totalHours = Math.floor(distance / (1000 * 60 * 60)); // Tổng giờ
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); // Phút
        let seconds = Math.floor((distance % (1000 * 60)) / 1000); // Giây

        // Cập nhật nội dung các container
        hourscontainer.innerHTML =
          totalHours < 10 ? `0${totalHours}` : totalHours;
        minutescontainer.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
        secondscontainer.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
      }, 1000);
    };

    startCountdown();
  }
}

function swiperTopTour() {
  if ($(".top-tour").length) {
    var swiperTopTour = new Swiper(".swiper-tour-top", {
      slidesPerView: 5,
      spaceBetween: 24,
      navigation: {
        nextEl: ".top-tour .swiper-button-next",
        prevEl: ".top-tour .swiper-button-prev",
      },
    });
  }
}
function swiperTravelGuide() {
  if ($(".travel-guide").length) {
    var swiperTravelGuide = new Swiper(".swiper-travel-guide", {
      slidesPerView: 4,
      spaceBetween: 24,
      navigation: {
        nextEl: ".travel-guide__list .swiper-button-next",
        prevEl: ".travel-guide__list .swiper-button-prev",
      },
    });
  }
}

function swiperCustomStory() {
  if ($(".customer-story").length) {
    var swiperCustomStory = new Swiper(".swiper-customer-story", {
      slidesPerView: 4.5,
      spaceBetween: 24,
      speed: 3000,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      },
    });
  }
  if ($(".customer-story").length) {
    let interleaveOffsetStory = 0.8;
    var swiperSuites = $(".swiper-gallery-story");

    swiperSuites.each(function () {
      var $this = $(this);

      var swiperInstance = new Swiper($this[0], {
        slidesPerView: 1,
        speed: 1000,
        watchSlidesProgress: true,
        mousewheelControl: true,
        keyboardControl: true,
        navigation: {
          nextEl: $this.find(".swiper-button-next")[0],
          prevEl: $this.find(".swiper-button-prev")[0],
        },
        on: {
          progress: function (swiper) {
            swiper.slides.forEach(function (slide) {
              var slideProgress = slide.progress || 0;
              var innerOffset = swiper.width * interleaveOffsetStory;
              var innerTranslate = slideProgress * innerOffset;
              if (!isNaN(innerTranslate)) {
                var slideInner = slide.querySelector(".slide-banner");
                if (slideInner) {
                  slideInner.style.transform =
                    "translate3d(" + innerTranslate + "px, 0, 0)";
                }
              }
            });
          },
          touchStart: function (swiper) {
            swiper.slides.forEach(function (slide) {
              slide.style.transition = "";
            });
          },
          setTransition: function (swiper, speed) {
            var easing = "cubic-bezier(0.25, 0.1, 0.25, 1)";
            swiper.slides.forEach(function (slide) {
              slide.style.transition = speed + "ms " + easing;
              var slideInner = slide.querySelector(".slide-banner");
              if (slideInner) {
                slideInner.style.transition = speed + "ms " + easing;
              }
            });
          },
        },
      });

      // Khi modal được mở, cập nhật Swiper
      $this.closest(".modal").on("shown.bs.modal", function () {
        swiperInstance.update();
      });
    });
  }
}
function parrallaxAboutBanner() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.set([".hero-about__title", ".hero-about__desc"], {
    y: 0,
    willChange: "transform",
    transformStyle: "preserve-3d",
  });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero-about__title",
      start: "top 42%",
      end: "top 20%",
      scrub: 1.5,
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero-about__desc",
      start: "top 28%",
      end: "top 20%",
      scrub: 1.5,
    },
  });

  tl.to(".hero-about__title", {
    y: -25,
    ease: "none",
    duration: 5,
  });
  tl2.to(".hero-about__desc", {
    y: -25,
    ease: "none",
    duration: 5,
  });
}
function pinCards() {
  if ($(".why-choose").length) {
    const items = gsap.utils.toArray(".why-choose__card");
    const lastCard = items[items.length - 1];
    let lastCardHeight = lastCard.clientHeight + 80;
    console.log(lastCardHeight);

    let endPointImage =
      document.querySelector(".why-choose__animation").clientHeight -
      lastCardHeight;
    gsap.timeline({
      scrollTrigger: {
        trigger: ".why-choose__image",
        start: "top top",
        end: `+=${endPointImage}px`,
        pin: true,
        pinSpacing: false,
        scrub: true,
        // markers: true,
      },
    });
    items.forEach((item, index) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 30%",
          endTrigger: ".why-choose__container--card",
          end: `bottom top+=${lastCardHeight}px`,
          pin: true,
          scrub: true,
        },
      });

      if (item === lastCard) {
        tl.to(item, {
          scale: 1,
          transformOrigin: "center center",
        });
      } else {
        tl.to(item, {
          scale: 0.8 + 0.02 * index,
          transformOrigin: "center center",
        });
      }
    });
  }
}
