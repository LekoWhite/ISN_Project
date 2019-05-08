var timer = new Timer();
$('#chrono .start').click(function() {
    timer.start();
});

$('#chrono .restart').click(function(){
    timer.stop();
});

timer.addEventListener('secondsUpdated', function(e){
    $('#chrono .values').html(timer.getTimeValues().toString());
});

timer.addEventListener('started', function(e){
    $('#chrono .values').html(timer.getTimeValues().toString());
});