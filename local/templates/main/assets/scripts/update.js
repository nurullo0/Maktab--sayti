$(document).on("click", ".js-news-load", function(e) {

	let $this = $(this);
	let paramsPageN = parseInt($this.attr("data-page-n"));
	let paramsCountAll = parseInt($this.attr("data-count-all"));

	if(!$this.hasClass("js-is-busy")) {

		$.ajax({
			type: 'POST',
			dataType: 'html',
			beforeSend: function(){
				$this.addClass("js-is-busy");
			},
			url : $this.data("url"),
			data: {
				PAGEN_1: paramsPageN
			}
		}).done(function(res) {

			$(".js-news-box").append(res);

			if($(".js-news-box li").length === paramsCountAll) {
				$this.hide();
			}
			else{
				$this.attr("data-page-n", paramsPageN+1);
				$this.removeClass("js-is-busy");
			}

			myApp.lazyload();

			if ('objectFit' in document.documentElement.style === false) {
				myApp.objectFitFallback($('[data-object-fit]'));
			}

			AOS.init({
				duration: 1000
			});

		});

	}

	e.preventDefault();

});

$(document).on("click", ".js-video-load", function(e) {

	let $this = $(this);
	let paramsPageN = parseInt($this.attr("data-page-n"));
	let paramsCountAll = parseInt($this.attr("data-count-all"));

	if(!$this.hasClass("js-is-busy")) {

		$.ajax({
			type: 'POST',
			dataType: 'html',
			beforeSend: function(){
				$this.addClass("js-is-busy");
			},
			url : $this.data("url"),
			data: {
				PAGEN_1: paramsPageN
			}
		}).done(function(res) {

			$(".js-video-list").append(res);

			if($(".js-video-list li").length === paramsCountAll) {
				$this.hide();
			}
			else{
				$this.attr("data-page-n", paramsPageN+1);
				$this.removeClass("js-is-busy");
			}
			AOS.init({
				duration: 1000
			});

		});

	}

	e.preventDefault();

});

// Form popup feedback
$(document).on("submit", "form#form-feedback", function(e) {

	let $form = $(this);
	let params = {};

	params['userName'] = $("input[name=userName]", $form).val();
	params['userPhone'] = $("input[name=userPhone]", $form).val();
	params['userEmail'] = $("input[name=userEmail]", $form).val();
	params['userMessage'] = $("textarea[name=userMessage]", $form).val();

	$.ajax({
		type: "POST",
		dataType: "json",
		beforeSend: function() {
			$("input, button, textarea", $form).prop("disabled", true);
		},
		data: params,
		url: $form.data("url")
	}).done(function(res) {

		if(res.status === "ok") {

			$(".js-form-success", $form).removeClass("js-hidden");

		} else {

			$("input, button, textarea", $form).prop("disabled", false);

		}
		
	});

	e.preventDefault();

});

$(document).on("click", ".js-images-load", function(e) {

	let $this = $(this);
	let paramsPageN = parseInt($this.attr("data-page-n"));
	let paramsCountAll = parseInt($this.attr("data-count-all"));
	let paramItemsCount = parseInt($this.attr("data-items-count"));
	let paramParentSection = parseInt($this.attr("data-parent-section"));

	if(!$this.hasClass("js-is-busy")) {

		$.ajax({
			type: 'POST',
			dataType: 'html',
			beforeSend: function(){
				$this.addClass("js-is-busy");
			},
			url : $this.data("url"),
			data: {
				PAGEN_1: paramsPageN,
				paramItemsCount: paramItemsCount,
				paramParentSection: paramParentSection
			}
		}).done(function(res) {

			$(".js-images-list").append(res);

			if($(".js-images-list li").length === paramsCountAll) {
				$this.hide();
			}
			else{
				$this.attr("data-page-n", paramsPageN+1);
				$this.removeClass("js-is-busy");
			}

			myApp.lazyload();

			if ('objectFit' in document.documentElement.style === false) {
				myApp.objectFitFallback($('[data-object-fit]'));
			}

			AOS.init({
				duration: 1000
			});

		});

	}

	e.preventDefault();

});