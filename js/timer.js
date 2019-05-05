var timer = new Timer();
$('#bip #start').click(function () {
    timer.start();
});

$('#bip #restart').click(function () {
    timer.reset();
});

timer.addEventListener('secondsUpdated', function (e) {
    $('#bip .timer').html(timer.getTimeValues().toString());
});

timer.addEventListener('started', function (e) {
    $('#bip .timer').html(timer.getTimeValues().toString());
});

timer.addEventListener('reset', function (e) {
    $('#bip .timer').html(timer.getTimeValues().toString());
});
                