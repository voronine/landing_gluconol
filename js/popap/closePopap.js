$(function () {
    $(".popupBox").css({
    height: $(document).height() + "px"
    }), $(".close").click(function () {
    $(".popupBox").fadeOut(200)
    });
    $(".knopka").click(function () {
    $(".popupBox").fadeOut(200)
    });
    var c = !0;
    $(window).mouseout(function (e) {
    e.pageY - $(window).scrollTop() < 1 && 1 == c && ($(".popupBox").fadeIn(200), c = !1)
    })
});