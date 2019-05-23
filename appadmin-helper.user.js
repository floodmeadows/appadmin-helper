// ==UserScript==
// @namespace    https://openuserjs.org/users/floodmeadows
// @name         AppAdmin email helper
// @description  Avoid replying as yourself - reply as "HMRC App Team"
// @copyright    2019, floodmeadows (https://openuserjs.org/users/floodmeadows)
// @license      MIT
// @version      0.1.2
// @updateURL    https://openuserjs.org/meta/floodmeadows/AppAdmin_email_helper.meta.js
// @downloadURL  https://openuserjs.org/src/scripts/floodmeadows/AppAdmin_email_helper.user.js
// @include      https://groups.google.com/a/digital.hmrc.gov.uk/forum/
// @grant        none
// ==/UserScript==

// ==OpenUserJS==
// @author       floodmeadows
// ==/OpenUserJS==

(function() {
    'use strict';

    var found = false;
    for (var i = 0; i < document.getElementsByClassName("F0XO1GC-m-f").length; i++) {
        var a = document.getElementsByClassName("F0XO1GC-m-f")[i];
        if(a.children.length > 0) {
            if(a.children[0].innerHTML == "Post on behalf of HMRC App Team") {
                found = true;
            }
        }
    }
    if(found === true) {
        document.getElementsByClassName("F0XO1GC-vb-r")[0].children[0].children[0].children[0].children[0].style.padding = "";
        document.getElementsByClassName("F0XO1GC-vb-r")[0].children[0].children[0].children[0].children[1].style.padding = "";
        document.getElementsByClassName("F0XO1GC-vb-r")[0].children[0].children[0].children[0].style.backgroundColor = "";
    } else {
        document.getElementsByClassName("F0XO1GC-vb-r")[0].children[0].children[0].children[0].children[0].style.padding = "3px";
        document.getElementsByClassName("F0XO1GC-vb-r")[0].children[0].children[0].children[0].children[1].style.padding = "3px";
        document.getElementsByClassName("F0XO1GC-vb-r")[0].children[0].children[0].children[0].style.backgroundColor = "red";
    }
})();
