'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var myApp = {
	// сет брейкпоинтов для js
	// должны совпадать с теми что в body:after
	mediaBreakpoint: {
		sm: 576,
		md: 768,
		lg: 992,
		xl: 1200
	},
	initBefore: function initBefore() {
		var app = this;
		document.documentElement.className = document.documentElement.className.replace("no-js", "js");
		
		// при первом посещении показать прелоадер
		if (!Cookies.get('preloaderShowed')) {
			Cookies.set('preloaderShowed', true, { expires: 1 });
			app.logoAnimated = new app.animateLogo();
			app.logoAnimated.start();
		} else {
			$('.preloader').hide(0);
		}
		
		this.detectIE();
	},

	init: function init() {
		$('html').addClass('page-ready');
		this.lazyload();
		AOS.init({
			duration: 1000
		});

		if ('objectFit' in document.documentElement.style === false) {
			this.objectFitFallback($('[data-object-fit]'));
		}

		$('.js-tel').mask('+7 (999) 999-99-99', {
			placeholder: '+7 (___) ___-__-__'
		});

		this.buttons();
		this.closeOnFocusLost();

		this.parallaxInit();

		this.mainSlider();
		this.projectsSlider();
		this.partnersSlider();
		this.sliderGallery();
		this.docSlider();

		this.modals();
		this.galleryGrid();
		this.mapInit();

		this.magnificGallery({
			imagesList: '.js-gallery',
			delegate: '.js-gallery-item'
		});
	},
	
	initOnLoad: function initOnLoad() {
		this.preloader();
		$('html').addClass('page-loaded');
		$('.dot').dotdotdot({ watch: 'window' });
	},

	parallaxInit: function parallaxInit() {
		var scenes = document.querySelectorAll('.js-scene');
		for (var i = 0; i < scenes.length; i++) {
			var parallaxInstance = new Parallax(scenes[i]);
		}
	},
	
	animateLogo: function animateLogo() {
		var selectors = {
			JS: '.js-logo',
			MAIN: '.preloader-img',
			LETTER: '.preloader-img__letter',
			SYMBOL: '.preloader-img__symbol'
		};
		var timer = void 0;
		function render() {
			var letters = document.querySelectorAll(selectors.LETTER);
			var classesArr = [];
			for (var i = 0; i < letters.length; i++) {
				var letter = letters[i];
				// берем текущие имена классов
				classesArr.push(letter.classList.value);
				// удаляем класс с буквы
				letter.classList = "";
			}
			for (var i = 0; i < letters.length; i++) {
				var _letter = letters[i];
				var k = i == 0 ? letters.length - 1 : i - 1;
				// ставим класс с предыдущей буквы
				_letter.classList = classesArr[k];
			}
		}
		
		this.init = function () {
			render();
		};
		this.start = function () {
			timer = setInterval(render, 800);
		};
		
		this.stop = function () {
			clearInterval(timer);
		};
	},
	
	preloader: function preloader() {
		var app = this;
		$('.preloader').addClass('preloader--disabled');
		if (app.logoAnimated) {
			app.logoAnimated.stop();
		}
	},

	mainSlider: function mainSlider() {
		var app = this;
		var mySwiper = new Swiper('.top-block__slider', {
			loop: true,
			lazy: true,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			// autoplay: {
			// 	delay: 5000,
			// },
			navigation: {
				nextEl: '.top-block__next',
				prevEl: '.top-block__prev'
			}
		});
		mySwiper.on('lazyImageReady', function (slideEl, imageEl) {
			if ('objectFit' in document.documentElement.style === false) {
				app.objectFitFallback($(imageEl));
			}
		});
	},

	projectsSlider: function projectsSlider() {
		var app = this;
		var $slide = $('.b-projects__slide');
		if ($slide.length == 0) {
			return false;
		}
		for (var i = 0; i < $slide.length; i++) {
			var title = $('.b-projects__sub-title', $slide[i]).text();
			var isActive = i == 0 ? ' active' : '';
			$('.b-projects__dots').append('<li class="js-projects-bullet' + isActive + '" data-id="' + (i + 1) + '"></li>');
			$('.b-projects__links').append('<li class="js-projects-bullet' + isActive + '" data-id="' + (i + 1) + '">' + title + '</li>');
		}
		var mySwiper = new Swiper('.b-projects__slider', {
			loop: true,
			lazy: true,
			// allowTouchMove: false,
			slidesPerView: 1,
			// autoHeight: true,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			pagination: {
				el: '.b-projects__pagination',
				type: 'fraction'
			},
			navigation: {
				nextEl: '.b-projects__next',
				prevEl: '.b-projects__prev'
			},
			breakpoints: {
				991: {
					autoHeight: true
				}
			}
		});

		mySwiper.on('lazyImageReady', function (slideEl, imageEl) {
			if ('objectFit' in document.documentElement.style === false) {
				app.objectFitFallback($(imageEl));
			}
		}).on('slideChange', function () {
			$('.js-projects-bullet').removeClass('active');
			$('.js-projects-bullet[data-id=' + (this.realIndex + 1) + ']').addClass('active');
		});

		$(document).on('click', '.js-projects-bullet:not(.active)', function () {
			mySwiper.slideTo($(this).data().id);
		});
	},

	partnersSlider: function partnersSlider() {
		var app = this;
		var mySwiper = new Swiper('.b-partners__slider', {
			// loop: true,
			slidesPerView: 4,
			slidesPerColumn: 2,
			spaceBetween: 20,
			// autoplay: {
			// 	delay: 5000,
			// },

			pagination: {
				el: '.b-partners__pagination',
				type: 'fraction'
			},
			navigation: {
				nextEl: '.b-partners__next',
				prevEl: '.b-partners__prev'
			},
			breakpoints: {
				767: {
					slidesPerView: 1,
					slidesPerColumn: 3,
					spaceBetween: 30
				},
				991: {
					slidesPerView: 2
				}
			}
		});
	},

	sliderGallery: function sliderGallery() {
		var app = this;
		var mySwiper = new Swiper('.slider-gallery__carousel', {
			loop: false,
			lazy: true,
			slidesPerView: 3,
			spaceBetween: 20,
			pagination: {
				el: '.slider-gallery__pagination',
				type: 'fraction'
			},
			navigation: {
				nextEl: '.slider-gallery__next',
				prevEl: '.slider-gallery__prev'
			},
			breakpoints: {
				575: {
					slidesPerView: 1
				},
				991: {
					slidesPerView: 2
				}
			}
		});
		mySwiper.on('lazyImageReady', function (slideEl, imageEl) {
			if ('objectFit' in document.documentElement.style === false) {
				app.objectFitFallback($(imageEl));
			}
		});
	},

	docSlider: function docSlider() {
		var mySwiper = new Swiper('.docs__slider', {
			loop: false,
			slidesPerView: 5,
			spaceBetween: 22,
			pagination: {
				el: '.docs__pagination',
				type: 'fraction'
			},
			navigation: {
				nextEl: '.docs__next',
				prevEl: '.docs__prev'
			},
			breakpoints: {
				767: {
					slidesPerView: 'auto',
					centeredSlides: true
				},
				991: {
					slidesPerView: 3
				},

				1199: {
					slidesPerView: 4
				}
			}
		});
	},

	certsSlider: function certsSlider() {
		var mySwiper = new Swiper('.m-person__certs', {
			slidesPerView: 3,
			spaceBetween: 14
		});
	},

	buttons: function buttons() {
		var app = this;
		$(document).on('click', '.menu-trigger', function () {
			$('body').toggleClass('nav-showed');
		});

		$(document).on('click', '.js-scroll-to', function (e) {
			e.preventDefault();
			var $target = $($(this).data().scrollTo);
			$('html, body').animate({
				scrollTop: $target.offset().top
			}, 1200);
		});

		$(document).on('click', '.top-nav__item.has-submenu', function () {
			if (app.getScreenSize() >= app.mediaBreakpoint.lg) {
				return;
			}
			var $navItem = $(this);
			$navItem.toggleClass('active-submenu');
			if ($navItem.is('.active-submenu')) {
				$navItem.find('.top-nav__sub-menu').show(200);
			} else {
				$navItem.find('.top-nav__sub-menu').hide(200, function () {
					$(this).removeAttr('style');
				});
			}
		});
	},

	closeOnFocusLost: function closeOnFocusLost() {
		$(document).click(function (e) {
			var $trg = $(e.target);
			if (!$trg.closest(".header").length) {
				$('body').removeClass('nav-showed');
			}
		});
	},

	modals: function modals() {
		var app = this;
		var closeSpeed = 200;
		$('.js-popup-youtube, .js-popup-vimeo, .js-popup-gmaps').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade mfp-bg-dark',
			removalDelay: closeSpeed,
			// preloader: false,

			fixedContentPos: true,
			fixedBgPos: true
		});

		$('.js-image-popup').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			removalDelay: closeSpeed,
			mainClass: 'mfp-fade mfp-img-mobile mfp-bg-dark',
			fixedContentPos: true,
			fixedBgPos: true,
			image: {
				verticalFit: true
			}
		});

		$(document).on('click', '.js-modal', function (e) {
			e.preventDefault();
			var $this = $(this);
			$.magnificPopup.open({
				items: {
					src: $this.attr('href')
				},
				type: 'ajax',
				mainClass: 'mfp-fade mfp-close-style',
				removalDelay: closeSpeed,
				fixedContentPos: true,
				fixedBgPos: true,
				callbacks: {
					open: function open() {
						var $modalContent = $(this.content);
					},
					ajaxContentAdded: function ajaxContentAdded() {
						var $modalContent = $(this.content);
						if ('objectFit' in document.documentElement.style === false) {
							app.objectFitFallback($('[data-object-fit]', $modalContent));
						}
						app.certsSlider();
						$('.js-tel', $modalContent).mask('+7 (999) 999-99-99', {
							placeholder: '+7 (___) ___-__-__'
						});
					},
					close: function close() {}
				}
			});
		});
	},

	galleryGrid: function galleryGrid() {
		var app = this;
		var trottle = 0;

		app.adaptGrid('.js-masonry li', 3);

		window.onresize = function () {
			clearTimeout(trottle);
			trottle = setTimeout(function () {
				app.adaptGrid('.js-masonry li', 3);
			}, 200);
		};
	},

	adaptGrid: function(selector, columns) {
		var app = this
		if (app.getScreenSize() >= app.mediaBreakpoint.md) {
			app.verticalCorrect($(selector), columns);
		} else {
			$(selector).removeAttr('style')
		}
	},

	verticalCorrect: function verticalCorrect(arr, n) {
		arr.css('margin-top', 0);
		var collection = arr;
		for (var i = 0; i + n < collection.size(); i++) {
			var currElement = collection.eq(i);
			var offset;
			offset = collection.eq(i + n).offset().top - (currElement.offset().top + currElement.outerHeight() + parseInt(currElement.css('margin-bottom')));
			if (offset > 0) {
				collection.eq(i + n).css('margin-top', -offset);
			}
		}
	},

	lazyload: function (_lazyload) {
		function lazyload() {
			return _lazyload.apply(this, arguments);
		}

		lazyload.toString = function () {
			return _lazyload.toString();
		};

		return lazyload;
	}(function () {
		try {
			lazyload();
		} catch (e) {
			console.log('lazyload fallback');
			$('.lazyload').each(function () {
				var $t = $(this);
				var src = $(this).attr('src');
				var dataSrc = $t.data().src;
				if ((typeof src === "undefined" ? "undefined" : _typeof(src)) !== (typeof undefined === "undefined" ? "undefined" : _typeof(undefined)) && src !== false && $t.is('img')) {
					$t.attr('src', dataSrc);
				} else {
					$t.css({
						'background-image': 'url(' + dataSrc + ')'
					});
				}
			});
		}
	}),

	/**
	 * [magnificGallery]
	 * галерея фоток
	 * @param  {object} obj {
	 *                      	imagesList: selector,
	 *                      	delegate: selector,
	 *                      }
	 */
	magnificGallery: function magnificGallery(obj) {
		var settings = {
			delegate: obj.delegate,
			type: 'image',
			tLoading: 'Загрузка изображения #%curr%...',
			removalDelay: 300,
			mainClass: 'mfp-fade mfp-bg-dark',
			fixedContentPos: true,
			fixedBgPos: true,
			// prependTo: '.wrap-site',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0, 1]
			},
			image: {
				tError: '<a href="%url%">Изображение #%curr%</a> не загрузилось.'
			}
		};
		if (this.getScreenSize() < this.mediaBreakpoint.md) {
			settings.callbacks = {

				buildControls: function buildControls() {
					this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
				}

			};
		}
		$(obj.imagesList).magnificPopup(settings);
	},

	mapInit: function mapInit() {
		if ($('#map').length) {
			ymaps.ready(init);
		}

		var myMap = void 0;
		var multiRoute = 0;
		var latLng = [48.720883, 44.517676];

		function init() {
			myMap = new ymaps.Map("map", {
				center: latLng,
				zoom: 12
			});
			var suggestView = new ymaps.SuggestView('suggest', {
				results: 4,
				offset: [0, 0]
			});
			var myPlacemark = new ymaps.Placemark(latLng, {
				hintContent: 'Ткачева, д. 7',
				balloonContent: 'Ткачева, д. 7'
			}, {
				// Опции.
				// Необходимо указать данный тип макета.
				iconLayout: 'default#image',
				// Своё изображение иконки метки.
				iconImageHref: 'images/icons/Maktab.svg',
				// Размеры метки.
				iconImageSize: [31, 49]
				// Смещение левого верхнего угла иконки относительно
				// её "ножки" (точки привязки).
				// iconImageOffset: [-5, -38]
			});
			myMap.geoObjects.add(myPlacemark);
		}

		$(document).on('change', '.js-suggest', function () {
			var addrString = $(this).val();
			if (multiRoute) multiRoute.destroy();
			multiRoute = new ymaps.multiRouter.MultiRoute({
				referencePoints: [addrString, latLng]
			}, {
				boundsAutoApply: true
			});
			multiRoute.model.events.add("requestsuccess", function (event) {
				// console.log('requestsuccess');
				setTimeout(function () {
					myMap.setZoom(myMap._zoom - 1);
				}, 1000);
			}).add("requestfail", function (event) {
				console.log("Ошибка: " + event.get("error").message);
			});
			myMap.geoObjects.add(multiRoute);
		});
		$(document).on('submit', '.js-suggest-form', function (e) {
			e.preventDefault();
			var $suggest = $('.js-suggest');
			$suggest.trigger('change');
		});
	},

	objectFitFallback: function objectFitFallback($selector) {
		$selector.each(function (i, item) {
			var $t = $(item);
			var imgUrl = $t.attr('src');
			var fitStyle = $t.attr('data-object-fit');
			if (imgUrl) {
				$t.parent().css({
					'backgroundImage': 'url(' + imgUrl + ')',
					'backgroundSize': fitStyle
				}).addClass('fit-img');
			}
		});
	},

	detectIE: function detectIE() {
		/**
		 * detect IE
		 * returns version of IE or false, if browser is not Internet Explorer
		 */

		(function detectIE() {
			var ua = window.navigator.userAgent;

			var msie = ua.indexOf('MSIE ');
			if (msie > 0) {
				// IE 10 or older => return version number
				var ieV = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
				document.querySelector('body').className += ' IE';
			}

			var trident = ua.indexOf('Trident/');
			if (trident > 0) {
				// IE 11 => return version number
				var rv = ua.indexOf('rv:');
				var ieV = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
				document.querySelector('body').className += ' IE';
			}

			var edge = ua.indexOf('Edge/');
			if (edge > 0) {
				// IE 12 (aka Edge) => return version number
				var ieV = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
				document.querySelector('body').className += ' IE';
			}

			// other browser
			return false;
		})();
	},

	getScrollbarSize: function getScrollbarSize() {
		var scrollbarSize = void 0;
		if (scrollbarSize === undefined) {
			var scrollDiv = document.createElement('div');
			scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
			document.body.appendChild(scrollDiv);
			scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
			document.body.removeChild(scrollDiv);
		}
		return scrollbarSize;
	},

	getScreenSize: function getScreenSize() {
		var screenSize = window.getComputedStyle(document.querySelector('body'), ':after').getPropertyValue('content');
		screenSize = parseInt(screenSize.match(/\d+/));
		return screenSize;
	}
};

myApp.initBefore();

$(function () {
	myApp.init();
});

$(window).on('load', function () {
	myApp.initOnLoad();
});
//# sourceMappingURL=main.js.map
