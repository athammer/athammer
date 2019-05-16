// Wrap every letter in a span
$('.home-animation .letters').each(function () {
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});

var animation = anime.timeline({})
    .add({
        targets: '.home-animation .letter',
        scale: [0, 1],
        opacity: [0.5, 1],
        duration: 1200,
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
                    duration: 200,
                    delay: function (el, i) {
                        return 500 * i;
                    }
                })
        }
    })

var buttonEl = document.querySelector('.divRepo');

function animateButton(scale, duration, elasticity) {
    anime.remove(buttonEl);
    anime({
        targets: buttonEl,
        scale: scale,
        duration: duration,
        elasticity: elasticity
    });
}

function enterButton() {
    animateButton(1.2, 800, 400)
};

function leaveButton() {
    animateButton(1.0, 600, 300)
};

buttonEl.addEventListener('mouseenter', enterButton, false);
buttonEl.addEventListener('mouseleave', leaveButton, false);
