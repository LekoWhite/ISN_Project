var timer = new Timer();

$('#chrono .startButton').click(function() {
    timer.start();
});

$('#chrono .restartButton').click(function(){
    timer.stop();
});

timer.addEventListener('secondsUpdated', function(e){
    $('#chrono .values').html(timer.getTimeValues().toString());
});

timer.addEventListener('started', function(e){
    $('#chrono .values').html(timer.getTimeValues().toString());
});