var globe = planetaryjs.planet();
// Load our custom `autorotate` plugin; see below.
globe.loadPlugin(autorotate(1));
// The `earth` plugin draws the oceans and the land; it's actually
// a combination of several separate built-in plugins.
globe.loadPlugin(planetaryjs.plugins.earth({
  topojson: { file: '/world-110m.json' },
  oceans: { fill: '#94b6e4' },
  land: { fill: '#aae57e' },
  borders: { stroke: '#aae57e' }
}));
// The `pings` plugin draws animated pings on the globe.
globe.loadPlugin(planetaryjs.plugins.pings());
// The `drag` plugin enables
// manipulating the globe with the mouse.
globe.loadPlugin(planetaryjs.plugins.drag({
  // Dragging the globe should pause the
  // automatic rotation until we release the mouse.
  onDragStart: function () {
    this.plugins.autorotate.pause();
  },
  onDragEnd: function () {
    this.plugins.autorotate.resume();
  }
}));
// Set up the globe's initial scale, offset, and rotation.
globe.projection.scale(720).translate([960, 960]).rotate([0, -10, 0]);

var canvas = document.getElementById('rotatingGlobe');
// Special code to handle high-density displays (e.g. retina, some phones)
// In the future, Planetary.js will handle this by itself (or via a plugin).
if (window.devicePixelRatio == 2) {
  canvas.width = 800;
  canvas.height = 800;
  context = canvas.getContext('2d');
  context.scale(2, 2);
}
// Draw that globe!
globe.draw(canvas);

// This plugin will automatically rotate the globe around its vertical
// axis a configured number of degrees every second.
function autorotate(degPerSec) {
  // Planetary.js plugins are functions that take a `planet` instance
  // as an argument...
  return function (planet) {
    var lastTick = null;
    var paused = false;
    planet.plugins.autorotate = {
      pause: function () { paused = true; },
      resume: function () { paused = false; }
    };
    // ...and configure hooks into certain pieces of its lifecycle.
    planet.onDraw(function () {
      if (paused || !lastTick) {
        lastTick = new Date();
      } else {
        var now = new Date();
        var delta = now - lastTick;
        // This plugin uses the built-in projection (provided by D3)
        // to rotate the globe each time we draw it.
        var rotation = planet.projection.rotate();
        rotation[0] += degPerSec * delta / 1000;
        if (rotation[0] >= 180) rotation[0] -= 360;
        planet.projection.rotate(rotation);
        lastTick = now;
      }
    });
  };
};