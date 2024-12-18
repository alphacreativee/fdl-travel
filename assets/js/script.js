$(document).ready(function () {
  if (document.querySelector(".gsap-section")) {
    const lenis = new Lenis({
      smooth: true,
      easing: (t) => t,
      duration: 0,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

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
  loadProvinces();
  closeSelect2();
  toggleWishlist();
  filterTourList();
  chooseTime();
  modalCheckoutTour();
  viewCalendarModal();
  toggleSubmenuMobile();
  paymentFilter();
  removeVisibleSearchMobile();
  scrollableTab();
});
window.onload = function () {
  if ($(".gsap-section").length) {
    window.scrollTo(0, 0);
  }
  pinCards();
  parallaxImage();
  ScrollTrigger.refresh();
};
function validateFormCheckout() {
  const fullName = document.getElementById("full-name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");

  let isValid = true;

  // Hàm kiểm tra và cập nhật class error
  function validateField(input, condition) {
    if (condition) {
      input.classList.remove("error");
    } else {
      input.classList.add("error");
      isValid = false;
    }
  }

  // Kiểm tra Full Name
  validateField(fullName, fullName.value.trim() !== "");

  // Kiểm tra Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  validateField(email, emailRegex.test(email.value.trim()));

  // Kiểm tra Phone
  const phoneRegex = /^[+]?[0-9]{9,15}$/;
  validateField(phone, phoneRegex.test(phone.value.trim()));

  return isValid;
}

// Thêm sự kiện cho nút submit
if ($("#btnSubmit").length) {
  document.getElementById("btnSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    const isFormValid = validateFormCheckout();
    if (isFormValid) {
      console.log("Form is valid, proceeding to submit...");
    } else {
      console.log("Form is invalid, please correct errors.");
    }
  });
}
if ($(".contact-sec__right--button").length) {
  const btnSend = $("#btn-send");

  const updateButtonState = () => {
    // Chọn các input cần kiểm tra (loại bỏ input ẩn và disabled)
    const isEmpty = $(
      ".contact-sec__right input:not([type='hidden']):not([disabled])"
    )
      .toArray()
      .some((input) => {
        const value = $(input).val();
        console.log("Input value:", value); // Gỡ lỗi giá trị
        return !value || value.trim() === ""; // Kiểm tra nếu rỗng
      });

    console.log("Is empty:", isEmpty); // Gỡ lỗi trạng thái

    if (isEmpty) {
      btnSend.prop("disabled", true); // Vô hiệu hóa nút
      btnSend.addClass("non-active"); // Thêm class chỉ trạng thái không hoạt động
    } else {
      btnSend.prop("disabled", false); // Bật nút
      btnSend.removeClass("non-active"); // Loại bỏ class không hoạt động
    }
  };

  // Chạy kiểm tra ban đầu
  updateButtonState();

  // Lắng nghe sự kiện (nhập liệu, thay đổi hoặc blur)
  $(".contact-sec__right input").on("input change blur", updateButtonState);
}

function chooseTime() {
  if ($("#rentalDay").length) {
    var pickerRental = new Lightpick({
      field: document.getElementById("rentalDay"),
      singleDate: false,
      numberOfMonths: 1,
      minDate: new Date(),
      onOpen: function () {
        var input = pickerRental._opts.field; // Use pickerArrival instead of picker
        var rect = input.getBoundingClientRect();
        var calendar = pickerRental.el; // Use pickerArrival instead of picker
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

  if ($("#checkoutModalCalendar").length) {
    var pickerCheckoutModal = new Lightpick({
      field: document.getElementById("checkoutModalCalendar"),
      singleDate: true,
      numberOfMonths: 1,
      minDate: new Date(),
      startDate: new Date(),
      inline: true,
      lang: "vi",
    });
  }
}
function parallaxImage() {
  gsap.registerPlugin(ScrollTrigger);
  if ($(".overlay-image").length) {
    const sections = document.querySelectorAll(".strategies_image-wrapper");

    sections.forEach((section) => {
      const image = section.querySelector(".strategies_image");
      const overlay = section.querySelector(".strategies_image-overlay");
      const yPercent = $(window).width() < 1090 ? "40" : "100";
      gsap.set([image, overlay], {
        y: yPercent,
        willChange: "transform",
        transformStyle: "preserve-3d",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 55%",
          end: "top 35%",
          scrub: 2,
          // markers: true,
        },
      });

      tl.to(image, { y: 0, ease: "none", duration: 20 }).to(
        overlay,
        { y: 0, ease: "none", duration: 20 },
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
  if ($(window).width() < 992) return;

  gsap.registerPlugin(ScrollTrigger);
  let headerInner =
    document.querySelector(".header__inner")?.getBoundingClientRect().height ||
    0;

  let height = window.innerWidth < 1200 ? -40 : -33;

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
          calendar.style.top = rect.bottom + window.scrollY + 19 + "px";
          calendar.style.left = rect.left + window.scrollX - 30 + "px";
        }
      },
    });
  }
}
function paymentFilter() {
  if ($(".payment-sec").length) {
    $(".filter-step").not("[data-fitler-step='step1']").hide();
    $(".payment-sec__step[data-step]").on("click", function (e) {
      const $step = $(this);
      const $stepIndex = $step.data("step");
      console.log($stepIndex);
      $step.addClass("active");
      gsap.to(".filter-step", {
        autoAlpha: 0,
        duration: 0.5,
        onComplete: () => {
          gsap.to(".filter-step", {
            autoAlpha: 1,
          });
        },
      });
      setTimeout(() => {
        $(".filter-step")
          .not("[data-fitler-step='" + $stepIndex + "']")
          .hide();
        $("[data-fitler-step='" + $stepIndex + "']").show();
      }, 500);
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
  if ($(".tour-sec__result").length || $(".main-detail").length) {
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
  // Lấy tất cả các phần tử có class `countdown`
  const countdownElements = document.querySelectorAll(".countdown");

  countdownElements.forEach((countdownElement) => {
    // Lấy thời gian đếm ngược từ thuộc tính `data-time`
    const countDownDate = new Date(
      countdownElement.getAttribute("data-time")
    ).getTime();

    const hoursContainer = countdownElement.querySelector(".js-hours span");
    const minutesContainer = countdownElement.querySelector(".js-minutes span");
    const secondsContainer = countdownElement.querySelector(".js-seconds span");

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
        hoursContainer.innerHTML =
          totalHours < 10 ? `0${totalHours}` : totalHours;
        minutesContainer.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
        secondsContainer.innerHTML = seconds < 10 ? `0${seconds}` : seconds;
      }, 1000);
    };

    startCountdown();
  });
}

function swiperTopTour() {
  if ($(".top-tour").length) {
    var swiperTopTour = new Swiper(".swiper-tour-top", {
      slidesPerView: 1.5,
      spaceBetween: 16,
      slidesOffsetAfter: 32,
      navigation: {
        nextEl: ".top-tour .swiper-button-next",
        prevEl: ".top-tour .swiper-button-prev",
      },
      breakpoints: {
        1023: {
          slidesOffsetAfter: 0,
          slidesPerView: 4,
          spaceBetween: 24,
        },
        991: {
          slidesPerView: 4,
          spaceBetween: 24,
          slidesOffsetAfter: 84,
        },
        767: {
          slidesPerView: 2.5,
          slidesOffsetAfter: 84,
          spaceBetween: 24,
        },
      },
    });
  }
}
function swiperTravelGuide() {
  if ($(".travel-guide").length || $(".related-tour").length) {
    var swiperTravelGuide = new Swiper(".swiper-travel-guide", {
      slidesPerView: 1.4,
      spaceBetween: 16,
      slidesOffsetAfter: 32,
      navigation: {
        nextEl: ".swiper-travel-guide + .swiper-control .swiper-button-next",
        prevEl: ".swiper-travel-guide + .swiper-control .swiper-button-prev",
      },
      breakpoints: {
        1023: {
          slidesOffsetAfter: 0,
          slidesPerView: 4,
          spaceBetween: 24,
        },
        991: {
          slidesPerView: 4,
          spaceBetween: 24,
          slidesOffsetAfter: 84,
        },
        767: {
          slidesPerView: 2.5,
          slidesOffsetAfter: 84,
          spaceBetween: 24,
        },
      },
    });
  }
}

function swiperCustomStory() {
  if ($(".customer-story").length) {
    var swiperCustomStory = new Swiper(".swiper-customer-story", {
      slidesPerView: 1.5,
      spaceBetween: 16,
      speed: 8000,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      freeMode: true,
      freeModeMomentum: true,
      freeModeMomentumRatio: 0.5,
      loopedSlides: 5,
      // loopAdditionalSlides: 5,
      breakpoints: {
        992: {
          slidesPerView: 4.5,
          spaceBetween: 24,
          autoplay: {
            delay: 1,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          },
        },
        767: {
          slidesPerView: 2.5,
          spaceBetween: 24,
        },
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
  let triggerStart = $(window).width() < 991 ? "top top" : "top 42%";
  let triggerStartContent = $(window).width() < 991 ? "top 40%" : "top 28%";

  const triggerEndTitle = $(window).width() < 991 ? "top 8%" : "top 20%";
  const triggerEndDesc = $(window).width() < 991 ? "top 10%" : "top 20%";

  gsap.set([".hero-about__title", ".hero-about__desc"], {
    y: 0,
    willChange: "transform",
    transformStyle: "preserve-3d",
  });
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero-about__title",
      start: triggerStart,
      end: triggerEndTitle,
      scrub: 1.5,
    },
  });
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero-about__desc",
      start: triggerStartContent,
      end: triggerEndDesc,
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
    const element = document.querySelector(".why-choose");
    let startPoint;

    if (window.innerWidth < 991) {
      startPoint = element.classList.contains("animation-center")
        ? "top 30%"
        : "top 30%";
    } else {
      startPoint = element.classList.contains("animation-center")
        ? "top 40%"
        : "top 30%";
    }

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
          start: startPoint,
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
          backgroundColor: "#d8d8d8",
        });
      }
    });
  }
}

async function loadProvinces() {
  if ($(".js-province-matcher").length > 0) {
    try {
      const response = await fetch("./assets/data/province.json");
      const provinces = await response.json();

      $(".js-province-matcher").select2({
        data: provinces,
        matcher: matchCustom,
        placeholder:
          $(".js-province-matcher").data("placeholder") !== ""
            ? $(".js-province-matcher").data("placeholder")
            : "Điểm đến",
        allowClear: true,
      });
    } catch (error) {
      console.error("Không thể tải dữ liệu từ province.json:", error);
    }
  } else {
    console.warn("Phần tử có class 'hero-sec__search' không tồn tại.");
  }
}

function matchCustom(params, data) {
  if ($.trim(params.term) === "") {
    return data;
  }

  if (typeof data.text === "undefined") {
    return null;
  }

  const searchTerm = params.term.toLowerCase();
  const text = data.text.toLowerCase();

  if (text.indexOf(searchTerm) > -1) {
    return data;
  }

  return null;
}

function closeSelect2() {
  $(document).on("click", function (e) {
    if (
      !$(e.target).closest(".select2-container").length &&
      !$(e.target).closest(".js-example-matcher").length
    ) {
      $(".js-example-matcher").select2("close");
    }
  });
}

function toggleWishlist() {
  $(".wish-list.action").on("click", function (event) {
    event.preventDefault();

    $(this).toggleClass("active");

    if ($(".wish-list.action.active").length) {
      openNotiToast();
    }
  });
}

function openNotiToast() {
  $(".toastSuccess").addClass("active");
  $(".toastSuccess .progress").addClass("active");

  setTimeout(() => {
    $(".toastSuccess").removeClass("active");
  }, 5000);

  setTimeout(() => {
    $(".toastSuccess .progress").removeClass("active");
  }, 5300);
}

function closeNotiToast() {
  $(".toastSuccess").removeClass("active");

  setTimeout(() => {
    $(".toastSuccess .progress").removeClass("active");
  }, 300);
}

function filterTourList() {
  $(".filter-list .top-location li").on("click", function () {
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
  });
}

function modalCheckoutTour() {
  let step = 1;

  $("#apply-btn").on("click", function () {
    step = 2;
    updateLayoutModalCheckout(step);
  });

  $("#checkoutModal [minus]").on("click", function () {
    const thisButton = $(this);
    const action = "decrease";
    changeQuantity(thisButton, action);
  });

  $("#checkoutModal [plus]").on("click", function () {
    const thisButton = $(this);
    const action = "increase";
    changeQuantity(thisButton, action);
  });

  if ($(window).width() < 992) {
    $("#checkoutModal").on("show.bs.modal", function () {
      $("body").addClass("overflow-hidden");
    });

    $("#checkoutModal").on("hidden.bs.modal", function () {
      $("body").removeClass("overflow-hidden");
    });
  }
}

function updateLayoutModalCheckout(step) {
  const modalCheckout = $("#checkoutModal");

  if (step == 2) {
    $("#apply-btn").addClass("d-none");
    modalCheckout.find(".total").removeClass("d-none").addClass("d-flex");
    modalCheckout
      .find(".departure-quantity")
      .removeClass("d-none")
      .addClass("d-flex");

    modalCheckout
      .find(".departure-calendar__main--list")
      .removeClass("d-none")
      .addClass("d-flex");
    modalCheckout.find(".lightpick").addClass("d-none");

    modalCheckout.attr("step-2", "true");
  } else {
    $("#apply-btn").addClass("d-block").removeClass("d-none");
    modalCheckout.find(".total").removeClass("d-flex").addClass("d-none");
    modalCheckout
      .find(".departure-quantity")
      .removeClass("d-flex")
      .addClass("d-none");

    modalCheckout
      .find(".departure-calendar__main--list")
      .removeClass("d-flex")
      .addClass("d-none");
    modalCheckout.find(".lightpick").removeClass("d-none");

    modalCheckout.attr("step-2", "false");
  }
}

function viewCalendarModal() {
  const modalCheckout = $("#checkoutModal");

  $("#checkoutModal .view-calendar").on("click", function () {
    const step = 1;
    updateLayoutModalCheckout(step);
  });

  $(
    "#checkoutModal .departure-calendar__main--list li:not('.view-calendar')"
  ).on("click", function () {
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
  });
}

function changeQuantity(thisButton, action) {
  var $numberDiv = thisButton.siblings(".number");
  var min = parseInt($numberDiv.data("min"));
  var max = parseInt($numberDiv.data("max"));
  var currentQuantity = parseInt($numberDiv.text());
  var price = $numberDiv.data("price");

  if (action === "increase") {
    if (currentQuantity < max) {
      $numberDiv.text(currentQuantity + 1);
      priceModalCheckout(price, 'increase');
    }
    thisButton.attr(
      "disabled",
      currentQuantity + 1 >= max ? "disabled" : false
    );
    $numberDiv.siblings("[minus]").attr("disabled", false);
  } else if (action === "decrease") {
    if (currentQuantity > min) {
      $numberDiv.text(currentQuantity - 1);
      priceModalCheckout(price, 'decrease');
    }
    $numberDiv
      .siblings("[minus]")
      .attr("disabled", currentQuantity - 1 <= min ? "disabled" : false);
    $numberDiv.siblings("[plus]").attr("disabled", false);
  }
}

function updateNumber() {
  var currentQuantity = parseInt($(this).text());
  var min = parseInt($(this).data("min"));
  var max = parseInt($(this).data("max"));

  if (currentQuantity < min) {
    $(this).text(min);
  } else if (currentQuantity > max) {
    $(this).text(max);
  }
}

function priceModalCheckout(price, type) {
  if (!$("#checkoutModal").length) return;

  const priceHtml = $("#checkoutModal .modal-footer .price");
  let priceTotal = priceHtml.data("price");

  if (type === 'increase') {
    priceTotal += price;
  } else if (type === 'decrease') {
    priceTotal -= price;
  }

  if (priceTotal < 0) {
    priceTotal = 0;
  }
 
  priceHtml.data("price", priceTotal);

  const formattedPrice = priceTotal.toLocaleString('vi-VN');

  priceHtml.html(`${formattedPrice}đ`);
}

function openMenuMobile(event) {
  event.preventDefault();

  const isBtnBackDetail = $(event.currentTarget).hasClass("detail");

  if (isBtnBackDetail) {
    if (document.referrer) {
      window.history.back();
    } else {
      window.location.href = "/";
    }

    return;
  }

  $("body").addClass("overflow-hidden");

  if (!$(".header.not-has-sub").length) {
    $(".header").removeClass("has-sub");
  }

  $(".header-mobile .header-mobile__menu").addClass("open");
  $("header .header__wishlist").addClass("d-none");

  $(".header-mobile .header-mobile__list li").removeClass("active");
  $(".header-mobile .header-mobile__list li.menu").addClass("active");

  $(".header-mobile .menu-item-has-children").removeClass("open");
  $(".header-mobile__backdrop").removeClass("visible");

  $("header").addClass("open-menu-mobile");
}

function toggleSubmenuMobile() {
  $(".header-mobile .menu-item-has-children > a").on("click", function (e) {
    e.preventDefault();

    $(".header-mobile .menu-item-has-children").removeClass("open");
    $(this).closest(".menu-item-has-children").toggleClass("open");

    if ($(".header-mobile .menu-item-has-children.open").length) {
      $(".header-mobile__backdrop").addClass("visible");
    }

    $(".header__search--mobile").removeClass("visible");
  });

  $(".header-mobile__backdrop").on("click", function (e) {
    e.preventDefault();

    $(this).removeClass("visible");
    $(".menu-item-has-children").removeClass("open");
  });
}

function openSearchHeaderMobile(event) {
  if ($(window).width() > 1201) return;

  event.preventDefault();

  $(".header__search--mobile").toggleClass("visible");
}

function removeVisibleSearchMobile() {
  $(document).on("click", function (event) {
    if (
      !$(event.target).closest(".header__search--mobile").length &&
      !$(event.target).is('[onclick="openSearchHeaderMobile(event)"]')
    ) {
      $(".header__search--mobile").removeClass("visible");
    }
  });
}

function toggleSidebarFilter(event) {
  if ($(window).width() > 767) return;

  event.preventDefault();
  $("body").toggleClass("overflow-hidden");
  $("section.tour-list .tour-list__main .content-left").toggleClass("open");
}

function whyChooseUs(event) {
  if ($(window).width() > 991) return;

  event.preventDefault();
  let $element = $(".why-choose-us");
  let currentHeight = "42px";
  let actualHeight = $element[0].scrollHeight + 12;

  $element.toggleClass("open");

  if ($element.hasClass("open")) {
    $element.css("height", actualHeight);
  } else {
    $element.css("height", currentHeight);
  }
}

function scrollableTab() {
  if (!$(".scrollable-tab").length || $(window).width() > 481) return;

  // Biến theo dõi trạng thái người dùng đang cuộn
  let isUserScrolling = false;
  let scrollTimeout;

  const itemActive = $(".scrollable-tab li.active");
  checkTabScroll(itemActive)

  $(window).on("scroll", function() {
    isUserScrolling = true; // Đặt trạng thái là đang cuộn

    // Đặt lại timeout để kiểm tra khi người dùng dừng cuộn
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      isUserScrolling = false; // Reset trạng thái sau khi người dùng dừng cuộn
    }, 100); // Khoảng thời gian chờ để xác định người dùng đã dừng cuộn

    var scrollPos = $(window).scrollTop();

    var $mainDetailContainer = $('.main-detail__container');
    var windowTop = $(window).scrollTop();
    var containerTop = $mainDetailContainer.offset().top;
    var containerHeight = $mainDetailContainer.outerHeight();

    // Cập nhật trạng thái sticky
    if (windowTop > containerTop + containerHeight || windowTop == 0) {
      $(".scrollable-tab").removeClass('sticky');
    } else {
      $(".scrollable-tab").addClass('sticky');
    }

    // Cập nhật tab active khi cuộn
    $('.tour-information__item').each(function() {
      var sectionTop = $(this).offset().top;
      var sectionHeight = $(this).outerHeight();
      var sectionId = $(this).attr('id');

      // Kiểm tra nếu section nằm trong viewport
      if (scrollPos >= sectionTop - 150 && scrollPos < sectionTop + sectionHeight - 150) {
        $(".scrollable-tab ul li").removeClass('active');
        $(".scrollable-tab ul li[data-tab='" + sectionId + "']").addClass('active');

        var thisItem = $(".scrollable-tab ul li[data-tab='" + sectionId + "']");
        checkTabScroll(thisItem); // Gọi hàm kiểm tra và cuộn tab
      }
    });
  });

  // Khi người dùng click vào tab
  $(".scrollable-tab ul li").on("click", function() {
    var targetTab = $(this).data('tab');
    var targetSection = $("#" + targetTab);
    
    $('html, body').animate({
      scrollTop: targetSection.offset().top
    }, 500);
    
    isUserScrolling = false;
  });

  // Hàm kiểm tra và cuộn tab
  function checkTabScroll(thisItem) {
    var $ul = $(".scrollable-tab ul");
    
    // Chỉ thực hiện cuộn nếu người dùng không đang cuộn thủ công
    var ulWidth = $ul.width();

    if (thisItem.is(":nth-child(1), :nth-child(2)")) {
      $ul.animate({ scrollLeft: 0 }, 300);
    }
    else if (thisItem.is(":nth-child(4), :nth-child(5)")) {
      var dist = $ul[0].scrollWidth - ulWidth;
      $ul.animate({ scrollLeft: dist }, 300);
    }
  }
}

