var HPPSIM = function _HPPSIM(canvas) {
	this.state = 0; 			// stopped
	this.canvas = canvas[0];	
	this.tick = 0;

	// pixels wide x height
	this.groups_w = 250;
	this.groups_h = 250;

	// each pixel is really a 2x2 group
	this.width = this.groups_w*2;
	this.height = this.groups_h*2;

	this.c = this.canvas.getContext('2d');
	this.imgdata = this.c.createImageData(this.canvas.width, this.canvas.height);

	this.cells = new Uint16Array(this.width * this.height);


}

HPPSIM.prototype.mainloop = function() {
	if (this.state == 1) {

		var pi = this.tick*4;

		this.imgdata.data[pi] = 255;
		this.imgdata.data[pi+1] = 10;
		this.imgdata.data[pi+2] = 10;
		this.imgdata.data[pi+3] = 255;
		this.c.putImageData(this.imgdata,0,0);

		this.tick += 1;
		window.requestAnimFrame(HPPSIM.prototype.mainloop.bind(this));
	}	
};

HPPSIM.prototype.start = function(e) {
	if (this.state == 0) {

		// apply shim 
		window.requestAnimFrame = (function() {
		  return  window.requestAnimationFrame       ||
		          window.webkitRequestAnimationFrame ||
		          window.mozRequestAnimationFrame    ||
		          function( callback ) {
		            window.setTimeout(callback, 1000.0 / 60.0);
		          };
		})();

		this.state = 1;
		window.requestAnimFrame(HPPSIM.prototype.mainloop.bind(this));
	}
};

HPPSIM.prototype.stop = function(e) {
	this.state = 0;
};