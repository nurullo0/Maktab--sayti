'use strict';

(function (doc) {
	var path = document.querySelector('[data-svg-path]').getAttribute('data-svg-path');
	var scripts = doc.getElementsByTagName('script');
	var script = scripts[scripts.length - 1];
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		var div = doc.createElement('div');
		div.innerHTML = this.responseText;
		div.className += div.className ? ' visuallyhidden' : 'visuallyhidden';
		script.parentNode.insertBefore(div, script);
	};
	xhr.open('get', path, true);
	xhr.send();
})(document);
//# sourceMappingURL=icons.js.map
