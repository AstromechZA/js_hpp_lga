


var sim = null;

$(function(){
	sim = new HPPSIM($('#maincanvas'));

	function start (e) {
		sim.start();
	}

	function stop (e) {
		sim.stop();
	}

	$('#start_button').click(start);
	$('#stop_button').click(stop);

});