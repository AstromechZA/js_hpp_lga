


var sim = null;

$(function(){
	sim = new HPPSIM($('#maincanvas'), 400, 400);

	function start (e) {
		sim.start();
	}

	function stop (e) {
		sim.stop();
	}

	$('#start_button').click(start);
	$('#stop_button').click(stop);

});