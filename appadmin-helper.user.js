// ==UserScript==
// @namespace    https://openuserjs.org/users/floodmeadows
// @name         AppAdmin email helper
// @description  Avoid replying as yourself - reply as "HMRC App Team"
// @copyright    2019, floodmeadows (https://openuserjs.org/users/floodmeadows)
// @license      MIT
// @version      0.2.0
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

    var h = document.getElementById('__top_header');

    // Select the node that will be observed for mutations
    var targetNode = document;

    // Options for the observer (which mutations to observe)
    var config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    var callback = function(mutationsList, observer) {
        for(var mutation of mutationsList) {
            if (mutation.type == 'childList') {
                updateAlert();
            }
            else if (mutation.type == 'attributes') {
                console.log('The ' + mutation.attributeName + ' attribute was modified.');
            }
        }
    };

    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    function isFromAddressSetToHmrcAppTeam() {
        var found = false;
        for (var i = 0; i < document.getElementsByClassName("F0XO1GC-m-f").length; i++) {
            var a = document.getElementsByClassName("F0XO1GC-m-f")[i];
            if(a.children.length > 0) {
                if(a.children[0].innerHTML == "Post on behalf of HMRC App Team") {
                    found = true;
                }
            }
        }
        return found;
    }

    function updateAlert() {
        // document.getElementsByClassName('F0XO1GC-m-a')[1].children[1].textContent
        var buttons = document.getElementsByClassName('F0XO1GC-m-a');
        var i = 0;
        var b = [];
        if(isFromAddressSetToHmrcAppTeam()) {
            // All OK - remove any custom alert styling
            document.getElementsByClassName("F0XO1GC-vb-r")[0].children[0].children[0].children[0].children[0].style.padding = "";
            document.getElementsByClassName("F0XO1GC-vb-r")[0].children[0].children[0].children[0].children[1].style.padding = "";
            document.getElementsByClassName("F0XO1GC-vb-r")[0].children[0].children[0].children[0].style.backgroundColor = "";
            // Reset colour of "Post" buttons back to green and enable them
            for (i = 0; i < buttons.length; i++) {
                b = buttons[i];
                if(b.children.length > 0) {
                    if(b.children[1].textContent == "Post") {
                        b.classList.remove("jfk-button-standard");
                        b.classList.add("jfk-button-default");
                        b.disabled = false;
                    }
                }
            }
        } else {
            // WOAH! You're about to post as yourself, when you really should be posting as HMRC App Team!
            document.getElementsByClassName("F0XO1GC-vb-r")[0].children[0].children[0].children[0].style.backgroundColor = "red";
            // Change "Post" buttons to grey and disable them
            for (i = 0; i < buttons.length; i++) {
                b = buttons[i];
                if(b.children.length > 0) {
                    if(b.children[1].textContent == "Post") {
                        b.classList.remove("jfk-button-default");
                        b.classList.add("jfk-button-standard");
                        b.disabled = true;
                    }
                }
            }
        }
    }

})();
