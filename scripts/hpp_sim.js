var HPPSIM = function _HPPSIM(canvas, w, h) {
	this.state = 0; 			// stopped
	this.canvas = canvas[0];
	this.tick = 0;

	// pixels wide x height
	this.groups_w = w;
	this.groups_h = h;

	// each pixel is really a 2x2 group
	this.width = this.groups_w*2;
	this.height = this.groups_h*2;

	this.c = this.canvas.getContext('2d');
	this.imgdata = this.c.createImageData(this.groups_w, this.groups_h);

	this.grid = new HPPWRAP(this.groups_w, this.groups_h);
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

			};
		};

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