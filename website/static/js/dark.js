/**
 * Copyright (c) 2019-present, GAMA-Platform
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// If "dark_mode" cookie is set
// activate dark mode on GAMA
if (/(^|;)\s*dark_mode/.test(document.cookie)) {

	var css = "body { background-color: #333 !important; } body, p, h1, h2, h3, h4, h5, h6 { color: white !important; }",
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

	head.appendChild(style);

	style.type = 'text/css';
	if (style.styleSheet){
	  // This is required for IE8 and below.
	  style.styleSheet.cssText = css;
	} else {
	  style.appendChild(document.createTextNode(css));
	}

}