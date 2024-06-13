!function() {
    "use strict";
    var e = function(e) {
        return document.querySelectorAll(e)
    }
      , t = function(e, t) {
        if (!document.createEvent) {
            var n = document.createEventObject();
            return t.fireEvent("on" + e, n)
        }
        var r = document.createEvent("HTMLEvents");
        r.initEvent(e, !0, !1),
        t.dispatchEvent(r)
    }
      , n = function(e) {
        if (document.addEventListener)
            document.addEventListener("DOMContentLoaded", e);
        else
            var t = setInterval(function() {
                "complete" === document.readyState && (clearInterval(t),
                e())
            }, 5)
    }
      , r = function(e, t) {
        for (var n = 0, r = e.length; r > n; n++)
            t(e[n], n)
    }
      , o = function() {
        this.userCountryCode = this.getCurrentCountry(),
        this.nginxCountryCode = this.getCurrentCountry(),
        this.defaultCountry = null,
        this.params = {
            countrySelector: ".country_select",
            mainPriceSelector: ".price_main",
            oldPriceSelector: ".price_old",
            phoneHelperSelector: ".phone_helper",
            nameHelperSelector: ".name_helper"
        },
        this.countries = window.countryList,
        "object" == typeof this.countries && (this.prepareCountries(),
        this.initEvents(),
        this.fillCountrySelect(),
        this.setActiveCountrySelect())
    };
    o.prototype.prepareCountries = function() {
        for (var e in this.countries)
            if (!0 === this.countries[e].isDefault) {
                this.defaultCountry = e;
                break
            }
    }
    ,
    o.prototype.getCurrentCountry = function() {
        var e = window.location.search;
        if ("" === e)
            return this.defaultCountry;
        var t = e.match(/c\=([a-z]{2})/i);
        return t ? t[1].toLowerCase() : this.defaultCountry
    }
    ,
    o.prototype.initEvents = function() {
        var t = this
          , n = e(this.params.countrySelector);
        if (n.length > 0)
            for (var r = 0, o = n.length; o > r; r++)
                n[r].onchange = function(e) {
                    t.changeSelectCountry.call(t, e)
                }
    }
    ,
    o.prototype.changeSelectCountry = function(t) {
        var n = ((t = t || window.event).currentTarget || t.srcElement).value
          , o = this.countries[n];
        this.userCountryCode = n,
        r(e(this.params.mainPriceSelector), function(e, t) {
            e.innerHTML = '<span class="price_main_value">' + o.price + '</span><span class="price_main_currency">' + o.labelPrice + "</span>"
        }),
        r(e(this.params.oldPriceSelector), function(e, t) {
            e.innerHTML = '<span class="price_main_value">' + o.oldPrice + '</span><span class="price_main_currency">' + o.labelPrice + "</span>"
        }),
        o.phoneHelper && r(e(this.params.phoneHelperSelector), function(e, t) {
            e.innerHTML = o.phoneHelper
        }),
        o.nameHelper && r(e(this.params.nameHelperSelector), function(e, t) {
            e.innerHTML = o.nameHelper
        })
    }
    ,
    o.prototype.fillCountrySelect = function() {
        var t, n = function(e) {
            var t = document.createElement("OPTION");
            return t.value = e.code,
            t.text = e.name,
            t
        }, r = e(this.params.countrySelector);
        if (r.length > 0)
            for (var o = 0, i = r.length; i > o; o++)
                if ("SELECT" === r[o].nodeName)
                    for (var c in this.countries)
                        t = this.countries[c],
                        r[o].options.add(n(t))
    }
    ,
    o.prototype.setActiveCountrySelect = function() {
        var n = e(this.params.countrySelector)
          , r = this.nginxCountryCode || this.defaultCountry;
        if (void 0 === this.countries[this.nginxCountryCode] && (r = this.defaultCountry),
        n.length > 0)
            for (var o = 0, i = n.length; i > o; o++)
                n[o].value = r,
                t("change", n[o])
    }
    ,
    n(function() {
        window.lCountries = new o
    })
}();
 