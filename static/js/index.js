window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE_1 = "./static/interpolation/114_norm";
var INTERP_BASE_2 = "./static/interpolation/xiaoxin_norm";
var NUM_INTERP_FRAMES_1 = 100;
var NUM_INTERP_FRAMES_2 = 60;

var interp_images_1 = [];
var interp_images_2 = [];

function preloadInterpolationImages(base, imagesArray, numFrames) {
  imagesArray.length = 0; // Clear the existing images
  for (var i = 0; i < numFrames; i++) {
    var path = base + '/' + String(i).padStart(6, '0') + '.jpg';
    imagesArray[i] = new Image();
    imagesArray[i].src = path;
  }
}

function setInterpolationImage(i, imagesArray, wrapperId) {
  var image = imagesArray[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#' + wrapperId).empty().append(image);
}

$(document).ready(function() {
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function() {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  var options = {
    slidesToScroll: 1,
    slidesToShow: 3,
    loop: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
  }

  // Initialize all div with carousel class
  var carousels = bulmaCarousel.attach('.carousel', options);

  // Loop on each carousel initialized
  for(var i = 0; i < carousels.length; i++) {
    // Add listener to event
    carousels[i].on('before:show', state => {
      console.log(state);
    });
  }

  // Access to bulmaCarousel instance of an element
  var element = document.querySelector('#my-element');
  if (element && element.bulmaCarousel) {
    // bulmaCarousel instance is available as element.bulmaCarousel
    element.bulmaCarousel.on('before-show', function(state) {
      console.log(state);
    });
  }

  preloadInterpolationImages(INTERP_BASE_1, interp_images_1, NUM_INTERP_FRAMES_1);
  preloadInterpolationImages(INTERP_BASE_2, interp_images_2, NUM_INTERP_FRAMES_2);

  $('#interpolation-slider-1').on('input', function(event) {
    setInterpolationImage(this.value, interp_images_1, 'interpolation-image-wrapper-1');
  });
  setInterpolationImage(0, interp_images_1, 'interpolation-image-wrapper-1');
  $('#interpolation-slider-1').prop('max', NUM_INTERP_FRAMES_1 - 1);

  $('#interpolation-slider-2').on('input', function(event) {
    setInterpolationImage(this.value, interp_images_2, 'interpolation-image-wrapper-2');
  });
  setInterpolationImage(0, interp_images_2, 'interpolation-image-wrapper-2');
  $('#interpolation-slider-2').prop('max', NUM_INTERP_FRAMES_2 - 1);

  bulmaSlider.attach();
});