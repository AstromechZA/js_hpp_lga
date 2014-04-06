var HPPSIM = function _HPPSIM(canvas) {
	this.state = 0; 			// stopped
	this.canvas = canvas[0];
	this.tick = 0;


	// pixel wide x height
	this.width = canvas.width();
	this.height = canvas.height();

	// groups wide x height
	this.half_w = this.width >> 1;
	this.half_h = this.height >> 1;

	this.c = this.canvas.getContext('2d');
	this.imgdata = this.c.createImageData(this.width, this.height);

	this.grid = new HPPWRAP(this.half_w, this.half_h);
	this.grid.randomize();

}

HPPSIM.prototype.mainloop = function() {
	if (this.state == 1) {
		this.grid.propagate();


		var pi = 0;
		var d = 0;
		var ri = 0;
		var f = 255.0/4;
		for (var y = 0; y < this.height; y++) {
			ri = y * this.width;
			for (var x = 0; x < this.width; x++) {
				pi = (ri + x) * 4;

				d = this.grid.grid.get_density(x, y);

				this.imgdata.data[pi] = f * d;
				this.imgdata.data[pi+1] = f * d;
				this.imgdata.data[pi+2] = f * d;
				this.imgdata.data[pi+3] = 255;

			}
		}

		this.c.putImageData(this.imgdata, 0, 0);

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