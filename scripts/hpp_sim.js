var HPPSIM = function _HPPSIM(canvas) {
	this.state = 0; //stopped
	this.canvas = canvas[0];	


	this.c_w = this.canvas.width;
	this.c_h = this.canvas.height;

	this.c_2d = this.canvas.getContext('2d');

	this.imgdata = this.c_2d.createImageData(this.c_w, this.c_h);

	this.tick = 0;
}

HPPSIM.prototype.mainloop = function() {
	if (this.state == 1) {

		var pi = this.tick*4;

		this.imgdata.data[pi] = 255;
		this.imgdata.data[pi+1] = 10;
		this.imgdata.data[pi+2] = 10;
		this.imgdata.data[pi+3] = 255;
		this.c_2d.putImageData(this.imgdata,0,0);

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