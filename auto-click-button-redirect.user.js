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

(function() { 'use strict';

    String.prototype.replaceAll = function(search, replacement) {
        var target = this
        return target.split(search).join(replacement)
    }

    function regexp(location) {
        location = location.replaceAll('*', '[^\/]+')
        location = location.replaceAll('\?', '\\?')
        location = location.replaceAll('\=', '\\=')
        return new RegExp('https?://' + location, 'i')
    }

    function change_title(value = '') {
        document.title = (value != '') ? value : 'Auto Click Button Redirect'
    }

    function pattern_href(selector) {
        if (selector == '') {
            console.log('Update selector')
            return true
        }

        var element = document.querySelector(selector);
        if (!element) {
            return false
        }

        var href = element.getAttribute('href');
        if (!href) {
            return false
        }

        change_title()
        window.open(href, '_self');
        return true
    }

    function pattern_click(selector) {
        if (selector == '') {
            console.log('Update selector')
            return true
        }

        var element = document.querySelector(selector);
        if (!element) {
            return false
        }

        change_title();
        element.click()
        return true
    }

    function pattern_onclick(selector) {
        if (selector == '') {
            console.log('Update selector')
            return true
        }

        var element = document.querySelector(selector);
        if (element) {
            return false
        }

        var onclick = button.getAttribute('onclick');
        if (!onclick) {
            return false
        }

        change_title();
        eval(onclick.replace('_blank', '_self'));
        return true
    }

    function pattern_javascript(commands, close) {
        if (commands == '') {
            console.log('Update commands')
            return true
        }

        function execute_commands(commands, close) {
            eval(commands)
            if (close == true) window.open('', '_self').close()
        }

        change_title((close == 'true') ? 'Close this tab' : '');

        var script = document.createElement('script');
        script.appendChild(document.createTextNode('(' + execute_commands + ')('+ commands + ', ' + close + ');'));
        (document.body).appendChild(script);
        return true
    }

    //

    var location = window.location.href 
    var data = {
        'href': [
            {
                'location': '*.zippyshare.com/v/*',
                'selector': '#dlbutton'
            },
            {
                'location': 'www.tetew.info/njir/[^\?]*',
                'selector': 'div.download-link>a'
            },
            {
                'location': 'www.greget.space/*',
                'selector': 'div.download-link>a'
            },
            {
                'location': 'spacetica.com/*',
                'selector': 'div[align=center]>p>a.btn.btn-primary.btn-xs'
            },
            {
                'location': 'subscene.com/subtitles/*/*/*',
                'selector': '#downloadButton'
            }
        ],

        'click': [
            {
                'location': 'davinsurance.com/?id=*',
                'selector': 'div.humancheck>form>input.sorasubmit'
            },
            {
                'location': 'sweetlantern.com/?id=*',
                'selector': 'div.humancheck>form>input.sorasubmit'
            },
            {
                'location': 'lonelymoon.net/?id=*',
                'selector': 'div.humancheck>form>input.sorasubmit'
            }
        ],

        'onclick': [
            {
                'location': 'asdasd-giga74.com',
                'selector': '#d>a>div.button.green'
            },
            {
                'location': 'asdasd-decrypt2.safelinkconverter.com',
                'selector': '.content_box>.decrypt>.redirect_url>div'
            }
        ],

        'javascript': [
            {
                'location': 'davinsurance.com/*/',
                'commands': 'changeLink()',
                'close': 'true'
            },
            {
                'location': 'sweetlantern.com/*/',
                'commands': 'changeLink()',
                'close': 'true'
            },
            {
                'location': 'lonelymoon.net/*/',
                'commands': 'changeLink()',
                'close': 'true'
            },
            {
                'location': 'ljutkeunvpn.blogspot.com/p/vpn.html?url=*',
                'commands': 'changeLink()',
                'close': 'false'
            }
        ]
    }

    var i

    for (i in data.href) {
        if (location.match(regexp(data.href[i].location))) {
            if (pattern_href(data.href[i].selector)) return true
        }
    }

    for (i in data.click) {
        if (location.match(regexp(data.click[i].location))) {
            if (pattern_click(data.click[i].selector)) return true
        }
    }

    for (i in data.javascript) {
        if (location.match(regexp(data.javascript[i].location))) {
            if (pattern_javascript(data.javascript[i].commands, data.javascript[i].close)) return true
        }
    }

})();
