var HPPWRAP = function _HPPWRAP(width, height) {
    this.width = width;
    this.height = height;

    this.grid = new HPPGRID(width, height);
}

HPPWRAP.prototype.randomize = function() {

    for (var i = 0; i < 1000; i++) {
        var x = Math.floor(Math.random() * 100);
        var y = Math.floor(Math.random() * 100);
        var d = 1 << Math.floor(Math.random() * 4);
        this.grid.set_v(x, y, d, true);
    };

}

HPPWRAP.prototype.propagate_wrapped = function() {
    var newgrid = new HPPGRID(this.width, this.height);

    var minx = 1; 
    var maxx = this.width * 2 - 1;
    var miny = 1;
    var maxy = this.height * 2 - 1;

    // core
    for (var y = miny; y < maxy; y++) {
        for (var x = minx; x < maxx; x++) {

            newgrid.set_up(x,y, this.grid.get_up(x, y+1));
            newgrid.set_down(x,y, this.grid.get_down(x, y-1));
            newgrid.set_left(x,y, this.grid.get_left(x+1, y));
            newgrid.set_right(x,y, this.grid.get_right(x-1, y));

        };
    };

    // border regions
    // left/right
    for(var y = miny; y < maxy; y++) {
        // x = 0
        newgrid.set_up(0,y, this.grid.get_up(0, y+1));
        newgrid.set_down(0,y, this.grid.get_down(0, y-1));
        newgrid.set_left(0,y, this.grid.get_left(1, y));
        newgrid.set_right(0,y, this.grid.get_right(maxx, y));

        // x = maxx
        newgrid.set_up(maxx,y, this.grid.get_up(maxx, y+1));
        newgrid.set_down(maxx,y, this.grid.get_down(maxx, y-1));
        newgrid.set_left(maxx,y, this.grid.get_left(0, y));
        newgrid.set_right(maxx,y, this.grid.get_right(maxx-1, y));
    }

    // top/bottom
    for(var x = minx; x < maxx; x++) {
        // y = 0
        newgrid.set_up(x,0, this.grid.get_up(x, 1));
        newgrid.set_down(x,0, this.grid.get_down(x, maxy));
        newgrid.set_left(x,0, this.grid.get_left(x+1, 0));
        newgrid.set_right(x,0, this.grid.get_right(x-1, 0));

        // y = maxy
        newgrid.set_up(x,maxy, this.grid.get_up(x, 0));
        newgrid.set_down(x,maxy, this.grid.get_down(x, maxy-1));
        newgrid.set_left(x,maxy, this.grid.get_left(x+1, maxy));
        newgrid.set_right(x,maxy, this.grid.get_right(x-1, maxy));
    }

    // corner regions
    // top left
    newgrid.set_up(0,0, this.grid.get_up(0, 1));
    newgrid.set_down(0,0, this.grid.get_down(0, maxy));
    newgrid.set_left(0,0, this.grid.get_left(1, 0));
    newgrid.set_right(0,0, this.grid.get_right(maxx, 0));

    // top right
    newgrid.set_up(maxx,0, this.grid.get_up(maxx, 1));
    newgrid.set_down(maxx,0, this.grid.get_down(maxx, maxy));
    newgrid.set_left(maxx,0, this.grid.get_left(0, 0));
    newgrid.set_right(maxx,0, this.grid.get_right(maxx-1, 0));

    // bottom right
    newgrid.set_up(maxx,maxy, this.grid.get_up(maxx, 0));
    newgrid.set_down(maxx,maxy, this.grid.get_down(maxx, maxy-1));
    newgrid.set_left(maxx,maxy, this.grid.get_left(0, maxy));
    newgrid.set_right(maxx,maxy, this.grid.get_right(maxx-1, maxy));

    // bottom left
    newgrid.set_up(0,maxy, this.grid.get_up(0, 0));
    newgrid.set_down(0,maxy, this.grid.get_down(0, maxy-1));
    newgrid.set_left(0,maxy, this.grid.get_left(1, maxy));
    newgrid.set_right(0,maxy, this.grid.get_right(maxx, maxy));

    this.grid = newgrid;
};


HPPWRAP.prototype.propagate_bounced = function() {
    var newgrid = new HPPGRID(this.width, this.height);

    var minx = 1; 
    var maxx = this.width * 2 - 1;
    var miny = 1;
    var maxy = this.height * 2 - 1;

    // core
    for (var y = miny; y < maxy; y++) {
        for (var x = minx; x < maxx; x++) {

            newgrid.set_up(x,y, this.grid.get_up(x, y+1));
            newgrid.set_down(x,y, this.grid.get_down(x, y-1));
            newgrid.set_left(x,y, this.grid.get_left(x+1, y));
            newgrid.set_right(x,y, this.grid.get_right(x-1, y));

        };
    };

    // border regions
    // left/right
    for(var y = miny; y < maxy; y++) {
        // x = 0
        newgrid.set_up(0,y, this.grid.get_up(0, y+1));
        newgrid.set_down(0,y, this.grid.get_down(0, y-1));
        newgrid.set_left(0,y, this.grid.get_left(1, y));
        newgrid.set_right(0,y, this.grid.get_left(0, y));

        // x = maxx
        newgrid.set_up(maxx,y, this.grid.get_up(maxx, y+1));
        newgrid.set_down(maxx,y, this.grid.get_down(maxx, y-1));
        newgrid.set_left(maxx,y, this.grid.get_right(maxx, y));
        newgrid.set_right(maxx,y, this.grid.get_right(maxx-1, y));
    }

    // top/bottom
    for(var x = minx; x < maxx; x++) {
        // y = 0
        newgrid.set_up(x,0, this.grid.get_up(x, 1));
        newgrid.set_down(x,0, this.grid.get_up(x, 0));
        newgrid.set_left(x,0, this.grid.get_left(x+1, 0));
        newgrid.set_right(x,0, this.grid.get_right(x-1, 0));

        // y = maxy
        newgrid.set_up(x,maxy, this.grid.get_down(x, maxy));
        newgrid.set_down(x,maxy, this.grid.get_down(x, maxy-1));
        newgrid.set_left(x,maxy, this.grid.get_left(x+1, maxy));
        newgrid.set_right(x,maxy, this.grid.get_right(x-1, maxy));
    }

    // corner regions
    // top left
    newgrid.set_up(0,0, this.grid.get_up(0, 1));
    newgrid.set_down(0,0, this.grid.get_up(0, 0));
    newgrid.set_left(0,0, this.grid.get_left(1, 0));
    newgrid.set_right(0,0, this.grid.get_left(0, 0));

    // top right
    newgrid.set_up(maxx,0, this.grid.get_up(maxx, 1));
    newgrid.set_down(maxx,0, this.grid.get_up(maxx, 0));
    newgrid.set_left(maxx,0, this.grid.get_right(maxx, 0));
    newgrid.set_right(maxx,0, this.grid.get_right(maxx-1, 0));

    // bottom right
    newgrid.set_up(maxx,maxy, this.grid.get_down(maxx, maxy));
    newgrid.set_down(maxx,maxy, this.grid.get_down(maxx, maxy-1));
    newgrid.set_left(maxx,maxy, this.grid.get_right(maxx, maxy));
    newgrid.set_right(maxx,maxy, this.grid.get_right(maxx-1, maxy));

    // bottom left
    newgrid.set_up(0,maxy, this.grid.get_down(0, maxy));
    newgrid.set_down(0,maxy, this.grid.get_down(0, maxy-1));
    newgrid.set_left(0,maxy, this.grid.get_left(1, maxy));
    newgrid.set_right(0,maxy, this.grid.get_left(0, maxy));

    this.grid = newgrid;
};


