$(document).ready(function () {
  customDropdown();
  scrollHeader();
  swiperBanner();
  searchBar();
  createFilter();
  swiperTours();
});
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
  if ($(".tour-sec__filter").length) {
    $(".filter-button[data-type]").on("click", function () {
      const $this = $(this);
      const $filter = $this.data("type");
      $this.addClass("active").siblings().removeClass("active");
      // animation
      gsap.to(".tour-sec__result", {
        autoAlpha: 0,
        duration: 0.25,
        onComplete: () => {
          gsap.to(".tour-sec__result", {
            autoAlpha: 1,
          });
        },
      });
      // result filter
      setTimeout(() => {
        if ($filter === "all") {
          $(".tour-sec__item[data-filter]").show();
        } else {
          $(".tour-sec__result > div, .tour-sec__result > img")
            .not("[data-filter='" + $filter + "']")
            .hide();
          $(".tour-sec__item[data-filter='" + $filter + "']").show();
        }
      }, 250);
    });
  }
}
function swiperTours() {
  if ($(".tour-sec__result").length) {
    let interleaveOffsetSuites = 0.8;
    var swiperSuites = $(".swiper-tour");
    swiperSuites.each(function () {
      var $this = $(this);
      console.log($this[0]);

      new Swiper($this[0], {
        slidesPerView: 1,
        speed: 1000,
        pagination: {
          el: $this.find(".swiper-pagination")[0],
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
              var innerOffset = swiper.width * interleaveOffsetSuites;
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
