var HPPWRAP = function _HPPWRAP(width, height) {
    this.width = width;
    this.height = height;

    this.grid = new HPPGRID(width, height);
}

HPPWRAP.prototype.randomize = function() {

    for (var i = 0; i < 100; i++) {
        var x = Math.floor(Math.random() * 100);
        var y = Math.floor(Math.random() * 100);
        var d = 1 << Math.floor(Math.random() * 4);
        this.grid.set_v(x, y, d, true);
    };

}

HPPWRAP.prototype.propagate_wrapped = function() {
    var newgrid = new HPPGRID(this.width, this.height);

    var minx = 0; 
    var maxx = this.width * 2;
    var miny = 0;
    var maxy = this.height * 2;

    for (var y = miny; y < maxy; y++) {
        for (var x = minx; x < maxx; x++) {
            newgrid.set_up(x,y, this.grid.get_up(x, y+1));
            newgrid.set_down(x,y, this.grid.get_down(x, y-1));

            newgrid.set_left(x,y, this.grid.get_left(x+1, y));
            newgrid.set_right(x,y, this.grid.get_right(x-1, y));
        };
    };

    this.grid = newgrid;
};

