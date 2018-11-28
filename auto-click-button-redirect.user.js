// ==UserScript==
// @name         Auto Click Button Redirect
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  Auto click button redirect.
// @author       Aztec Rabbit
// @homepage     https://github.com/AztecRabbit/Auto-Click-Button-Redirect/
// @supportURL   https://github.com/AztecRabbit/Auto-Click-Button-Redirect/issues
// @updateURL    https://raw.githubusercontent.com/AztecRabbit/Auto-Click-Button-Redirect/master/auto-click-button-redirect.user.js
// @downloadURL  https://raw.githubusercontent.com/AztecRabbit/Auto-Click-Button-Redirect/master/auto-click-button-redirect.user.js
// @include      *
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function log(value) {
        console.log('auto-click-button-redirect: ' + value);
    }

    function changeTitle(value = '') {
        if (value) {
            document.title = value;
        } else {
            document.title = 'Auto Click Button Redirect';            
        }
    }

    function changeLink() {
        changeTitle('Close this tab');
        function main () {
            changeLink();
        }

        var script = document.createElement('script');
        script.appendChild(document.createTextNode('('+ main +')();'));
        (document.body).appendChild(script);
    }

    function pattern_0() {
        changeLink();
        window.open('', '_self').close();
    }

    function pattern_1() {
        changeTitle();
        var button = document.querySelector('div.humancheck>form>input.sorasubmit[value=Submit]');
        if (button) {
            button.click();
        } else {
            changeLink();
        }
    }

    function pattern_2(element) {
        var button = document.querySelector(element);
        if (button) {
            var url = button.getAttribute('href');
            if (url) {
                changeTitle();
                window.open(url, '_self');
            }
        }
    }

    function pattern_3(element) {
        var button = document.querySelector(element);
        if (button) {
            var onclick = button.getAttribute('onclick');
            if (onclick) {
                changeTitle();
                eval(onclick.replace('_blank', '_self'));
            }
        }
    }

    switch (window.location.host) {
        case 'ljutkeunvpn.blogspot.com':
            changeLink();
            break;
        case 'androidbusiness.us':
            pattern_0();
            break;
        case 'davinsurance.com':
        case 'sweetlantern.com':
        case 'lonelymoon.net':
            pattern_1();
            break;
        case 'www.greget.space':
        case 'www.tetew.info':
            pattern_2('div.download-link>a');
            break;
        case 'spacetica.com':
            pattern_2('div[align=center]>p>a.btn.btn-primary.btn-xs');
            break;
        case 'telolet.in':
            pattern_2('#skip');
            break;
        case 'giga74.com':
            pattern_3('#d>a>div.button.green');
            break;
        case 'decrypt2.safelinkconverter.com':
            pattern_3('.content_box>.decrypt>.redirect_url>div');
            break;

        default: break;
    }
})();
