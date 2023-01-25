var globe = planetaryjs.planet();

// Load our custom `autorotate` plugin; see below.
globe.loadPlugin(autorotate(1));

// The `earth` plugin draws the oceans and the land
globe.loadPlugin(planetaryjs.plugins.earth({
  topojson: { file: './world-110m.json' },
  oceans: { fill: '#94b6e4' },
  land: { fill: '#aae57e' },
  borders: { stroke: '#aae57e' }
}));

// The `pings` plugin draws animated pings on the globe.
globe.loadPlugin(planetaryjs.plugins.pings());

// The `drag` plugin enables manipulating the globe with the mouse
globe.loadPlugin(planetaryjs.plugins.drag({

  // Dragging the globe should pause the automatic rotation until we release the mouse
  onDragStart: function () {
    this.plugins.autorotate.pause();
  },
  onDragEnd: function () {
    this.plugins.autorotate.resume();
  }
}));

// Set initial globe rotation
globe.projection.rotate([-20, -20, 0]);

// Zeichne die Welt!
var canvas = document.getElementById('rotatingGlobe');
globe.draw(canvas);




var dpr = window.devicePixelRatio;
var width = window.innerWidth;
var height = window.innerHeight;

// Set initial globe size on page load
document.addEventListener("DOMContentLoaded", function() {
  // Grab new window dimensions
  width = window.innerWidth;
  height = window.innerHeight;
  // Update canvas dimensions
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  var context = canvas.getContext('2d');
  context.scale(dpr, dpr);

  // Update globe's translation and scale
  globe.projection.translate([width / 2, height / 2]);
  globe.projection.scale((width * dpr) / 2.4);
}, false);


// Listen for window resize events
// Same code as function above
window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  var context = canvas.getContext('2d');
  context.scale(dpr, dpr);
  globe.projection.translate([width / 2, height / 2]);
  globe.projection.scale((width * dpr) / 2.4);
}, {passive: false});





// This plugin will automatically rotate the globe around its vertical axis
function autorotate(degPerSec) {
  // Planetary.js plugins are functions that take a `planet` instance as an argument...
  return function (planet) {
    var lastTick = null;
    var paused = false;
    planet.plugins.autorotate = {
      pause: function () { paused = true; },
      resume: function () { paused = false; }
    };
    // ...and configure hooks into certain pieces of its lifecycle
    planet.onDraw(function () {
      if (paused || !lastTick) {
        lastTick = new Date();
      } else {
        var now = new Date();
        var delta = now - lastTick;
        // This plugin uses the built-in projection (provided by D3) to rotate the globe each time we draw iy
        var rotation = planet.projection.rotate();
        rotation[0] += degPerSec * delta / 1000;
        if (rotation[0] >= 180) rotation[0] -= 360;
        planet.projection.rotate(rotation);
        lastTick = now;
      }
    });
  };
};