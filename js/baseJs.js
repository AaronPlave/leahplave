function checkScrollBars() {
    var b = $('body');
    var normalw = 0;
    var scrollw = 0;
    if (b.prop('scrollHeight') > b.height()) {
        normalw = window.innerWidth;
        scrollw = normalw - b.width();
        $("body").css({
            marginRight: '-' + scrollw + 'px'
        });
    }
}


$(document).ready(function() {
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        checkScrollBars()
    }
    $(".naverNav").naver({
        maxWidth: "800"
    });

})