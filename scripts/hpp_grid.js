var HPPGRID = function _HPPGRID(width, height) {
	this.width = width;
	this.height = height;
	this.doublewidth = width*2;
	this.doubleheight = height*2;

	this.grid = new Uint16Array(this.width * this.height);
}

// Get the numeric value (4 bits) of the cell ANDED by the val
HPPGRID.prototype.get_v = function(x, y, p) {
	x = (x + this.doublewidth) % this.doublewidth;
	y = (y + this.doubleheight) % this.doubleheight;

	var _x = Math.floor(x / 2);
	var _y = Math.floor(y / 2);

	var _ox = x % 2;
	var _oy = y % 2;

	// 16 bit cell value
	var _v = this.grid[_y * this.width + _x];

	var _shift = 4 * (_oy * 2 + _ox);

	var _p = p & 15;
	return (_v >> _shift) & _p;
};

HPPGRID.prototype.get_up = function(x, y) {
	return (this.get_v(x, y, 8) > 0);
};

HPPGRID.prototype.get_right = function(x, y) {
	return (this.get_v(x, y, 4) > 0);
};

HPPGRID.prototype.get_down = function(x, y) {
	return (this.get_v(x, y, 2) > 0);
};

HPPGRID.prototype.get_left = function(x, y) {
	return (this.get_v(x, y, 1) > 0);
};

// Set the numeric value (4 bits) of the cell
HPPGRID.prototype.set_v = function(x, y, p, bool) {

	var _x = Math.floor(x / 2);
	var _y = Math.floor(y / 2);

	var _ox = x % 2;
	var _oy = y % 2;

	var A = this.grid[_y * this.width + _x];

	var B = p & 15;

	var C = 4 * (_oy * 2 + _ox);
	var D = (A - (A & (B << C)));
	if (bool) D = D |(B << C);
	this.grid[_y * this.width + _x] = D;
};

HPPGRID.prototype.set_up = function(x, y, b) {
	this.set_v(x, y, 8, b);
};

HPPGRID.prototype.set_right = function(x, y, b) {
	this.set_v(x, y, 4, b);
};

HPPGRID.prototype.set_down = function(x, y, b) {
	this.set_v(x, y, 2, b);
};

HPPGRID.prototype.set_left = function(x, y, b) {
	this.set_v(x, y, 1, b);
};

HPPGRID.prototype.get_density = function(x, y) {
	var v = this.get_v(x, y, 15);
	return [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4][v];
};

HPPGRID.prototype.print = function() {
	var s = '';
	for (var y = 0; y < this.height*2; y++) {
		for (var x = 0; x < this.width*2; x++) {
			if (x > 0) s += ", ";
			s += this.get_v(x, y, 15);
		};
		s += "\n";
	};
	console.log(s);
};

HPPGRID.prototype.print_density = function() {
	var s = '';
	for (var y = 0; y < this.height*2; y++) {
		for (var x = 0; x < this.width*2; x++) {
			s += this.get_density(x, y);
		};
		s += "\n";
	};
	console.log(s);
};