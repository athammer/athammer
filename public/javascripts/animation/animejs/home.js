// Wrap every letter in a span
$('.home-animation .letters').each(function () {
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});

var animation = anime.timeline({})
    .add({
        targets: '.home-animation .letter',
        scale: [0, 1],
        opacity: [0.5, 1],
        duration: 1500,
        elasticity: 600,
        delay: function (el, i) {
            return 80 * (i + 1)
        },
        complete: function (anim) {
            animation.pause();
            anime.timeline({})
                .add({
                    targets: '.icon-animation .icon',
                    scale: [8, 1],
                    opacity: [0, 1],
                    easing: "easeOutCirc",
                    duration: 800,
                    delay: function (el, i) {
                        return 800 * i;
                    }
                })
        }
    })
