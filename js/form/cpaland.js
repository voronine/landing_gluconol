(function () {
    'use strict';

    var $ = window.lq = {
        domReady: function(fn) {
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', fn);
            } else {
                var readyStateCheckInterval = setInterval(function() {
                    if (document.readyState === "complete") {
                        clearInterval(readyStateCheckInterval);
                        fn();
                    }
                }, 5);
            }
        },
        on: function(el, eventName, callback, context) {
            if (el.addEventListener) {
                el.addEventListener(eventName, function (e) {
                    callback.call(context, e);
                }, false);
            } else if(el.attachEvent) {
                el.attachEvent('on' + eventName, function (e) {
                    callback.call(context, e);
                });
            }
        },
        serialize: function(form) {
            var obj = {};
            for (var i = 0, l = form.length; i < l; i++) {
                obj[form[i].getAttribute('name')] = form[i].value;
            }
            return obj;
        },
        urlGET: function(name) {
            if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search));
            return (name === null) ? '' : decodeURIComponent(name[1]);
        },
        JSONP: function(url) {
            var script = document.createElement('script');
                script.async = true;
                script.setAttribute('src', url);

            document.body.appendChild(script);
        },
        isPhone: function(value) {
            return value.length > 7 ? true : false;
        },
        isName: function(value) {
            return value.length > 2 ? true : false;
        },
        isEmail: function(value) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(value);
        },
        extend: function(defaults, options) {
            var extended = {},
                prop;
            for (prop in defaults) {
                if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                    extended[prop] = defaults[prop];
                }
            }
            for (prop in options) {
                if (Object.prototype.hasOwnProperty.call(options, prop)) {
                    extended[prop] = options[prop];
                }
            }
            return extended;
        },
    };
    

    var CpaLand = function (params) {
        var _this = this;

        this.params = $.extend({
            oDomain: 'localhost', // Заглушка для домена
            location: document.location.hostname + document.location.pathname,
            successPage: './js/utilites/success.hu.html', // Страница, на которую перенаправлять после успешной отправки формы
            sid: $.urlGET('sid'),
            tid: $.urlGET('tid')
        }, params);

        $.domReady(function() {
            _this.initDOM.call(_this);
        });

        return this;
    };

    CpaLand.prototype = {
        initDOM: function () {
            this.initEvents();
        },
        initEvents: function () {
            // Навесить на все формы
            var _this = this,
                orderForms = document.querySelectorAll('.cpa__order_form');

            // Обработка onsubmit
            for (var i = 0; i < orderForms.length; i++) {
                orderForms[i].onsubmit = function (event) {
                    _this.submitOrderForm.call(_this, event);
                }
            }
        },
        submitOrderForm: function (event) {
            event.preventDefault(); // Предотвращаем стандартное действие формы
            var _this = this,
                form = event.currentTarget,
                formData = $.serialize(form);

            console.log('Form data:', formData); // Вывод данных формы в консоль

            // Перенаправляем на страницу успеха
            window.location.href = this.params.successPage;
        },
    };

    window.CpaLand = CpaLand;
})();

var cpaLand = new CpaLand({});
