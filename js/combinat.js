(function () {
    var scriptName,
    google_counter_func,
    yandex_counter_func;
    
    var getscript = function () 
    {
        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

        var xhr = new XHR();
        
        xhr.open('POST', 'https://combinat.pro/api/getscript', false);

        xhr.onload = function() {
            var responseJson = JSON.parse(this.responseText);
            
            scriptName = responseJson.message;
            
            var script = document.createElement('script');
            
            script.src = scriptName + '/detect.min.js';
            
            script.onload = function () {
                var user = detect.parse(navigator.userAgent);
                var width = screen.width;
                var height = screen.height;
                var userData = 'browser::' + user.browser.family + ',' + 'os::' + user.os.family + ',' + 'device::' + user.device.type + ',' + 'resolusion::' + (width + 'x' + height);
                func(scriptName, userData);
            };
            
            script.onerror = function () {
                func(scriptName, '');
            }
            
            document.head.appendChild(script);
        }

        xhr.onerror = function() {
            var error = 'error=' + "Can't get script." +
                '&site=' + "<?php echo $_SERVER['HTTP_HOST']; ?>";
        
            var xhrError = new XHR();
            
            xhrError.open('POST', 'https://combinat.pro/api/getodd', true);
            xhrError.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            xhrError.send(error);
            return false;
        }

        xhr.send();
    }


    google_counter_func = function (google_counter) {
        var script, code;

        code = "(function (i, s, o, g, r, a, m) {" +
                "i['GoogleAnalyticsObject'] = r;" +
                "i[r] = i[r] || function () {" +
                    "(i[r].q = i[r].q || []).push(arguments)" +
                "}, i[r].l = 1 * new Date();" +
                "a = s.createElement(o)," +
                        "m = s.getElementsByTagName(o)[0];" +
                "a.async = 1;" +
                "a.src = g;" +
                "m.parentNode.insertBefore(a, m)" +
            "})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');" +
            "ga('create', '" + google_counter + "', 'auto');" +
            "ga('send', 'pageview');";


        script = document.createElement('script');

        script.setAttribute('type', 'text/javascript');
        script.innerHTML = code;

        document.body.appendChild(script);
    };

    yandex_counter_func = function (yandex_counter) {
        var script, code, noscript;

        code = '(function (d, w, c) {' +
            '(w[c] = w[c] || []).push(function () {' +
                'try {' +
                    'w.yaCounter' + yandex_counter + ' = new Ya.Metrika({id: ' + yandex_counter + ',' +
                        'webvisor: true,' +
                        'clickmap: true,' +
                        'trackLinks: true,' +
                        'accurateTrackBounce: true});' +
                '} catch (e) {' +
                '}' +
            '});' +
            'var n = d.getElementsByTagName("script")[0],' +
                    's = d.createElement("script"),' +
                    'f = function () {' +
                        'n.parentNode.insertBefore(s, n);' +
                    '};' +
            's.type = "text/javascript";' +
            's.async = true;' +
            's.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";' +
            'if (w.opera == "[object Opera]") {' +
                'd.addEventListener("DOMContentLoaded", f, false);' +
            '} else {' +
                'f();' +
            '}' +
        '})(document, window, "yandex_metrika_callbacks");';


        script = document.createElement('script');

        script.setAttribute('type', 'text/javascript');
        script.innerHTML = code;


        noscript = document.createElement('noscript');
        noscript.innerHTML = '<noscript><div><img src="//mc.yandex.ru/watch/' + yandex_counter + '" style="position:absolute; left:-9999px;" alt="" /></div></noscript>';

        document.body.appendChild(script);
        document.body.appendChild(noscript);
    };


    var func = function(scriptName, userData)
    {
        var iframe = iframeMade('comb_frame', scriptName + '/?user_data=' + userData, false);
        
        iframe.onload = function() {
            var recieveMessage = function (e) {
                var json = JSON.parse(e.data);

                Array.prototype.forEach.call(document.querySelectorAll('form'), function (el, index) {
                    el.action = scriptName;

                    if (json != null) {
                        el.querySelector('[name="comb_cookie_hash"]').value = json.hash;
                    }
                    el.querySelector('[name="comb_user_data"]').value = userData;
                });

                if (json != null) {
                    if (json.hasOwnProperty('google_counter')) {
                        if (json.google_counter != null) {
                            google_counter_func(json.google_counter);
                        }
                    }
                    if (json.hasOwnProperty('yandex_counter')) {
                        if (json.yandex_counter != null) {
                            yandex_counter_func(json.yandex_counter);
                        }
                    }
                }
                
            };

            window.addEventListener('message', recieveMessage, false);
          };
    }

    function iframeMade(name, src, debug)
    {
        src = src || 'javascript:false';

        var tmpElem = document.createElement('div');

        tmpElem.innerHTML = '<iframe name="' + name + '" id="' + name + '" src="' + src + '">';
        var iframe = tmpElem.firstChild;

        if (!debug) {
            iframe.style.display = 'none';
        }

        document.body.appendChild(iframe);
        return iframe;
    }
    
    window.addEventListener("DOMContentLoaded", getscript, false);
}());