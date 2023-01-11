var globe = planetaryjs.planet();
// Load our custom `autorotate` plugin; see below.
globe.loadPlugin(autorotate(1));
// The `earth` plugin draws the oceans and the land; it's actually
// a combination of several separate built-in plugins.
globe.loadPlugin(autocenter({ extraHeight: -120 })); // WWWWWWWWWWWWWWWWWWWWWWWWWWWW
globe.loadPlugin(autoscale({ extraHeight: -120 })); // WWWWWWWWWWWWWWWWWWWWWWWWWWWW
globe.loadPlugin(planetaryjs.plugins.earth({
  topojson: { file: './world-110m.json' },
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


// var canvas = document.getElementById('rotatingGlobe');
// // Special code to handle high-density displays (e.g. retina, some phones)
// // In the future, Planetary.js will handle this by itself (or via a plugin).
// if (window.devicePixelRatio == 2) {
//   canvas.width = 800;
//   canvas.height = 800;
//   context = canvas.getContext('2d');
//   context.scale(2, 2);
// }
// Draw that globe!
var canvas = document.getElementById('rotatingGlobe');
globe.draw(canvas);









// Plugin to resize the canvas to fill the window and to
// automatically center the planet when the window size changes
function autocenter(options) {
  options = options || {};
  var needsCentering = false;
  var globe = null;

  if (window.devicePixelRatio >= 2) {
    globe.canvas.width = width * 2;
    globe.canvas.height = height * 2;
    context = canvas.getContext('2d');
    context.scale(2, 2);
  } else if (window.devicePixelRatio >= 3) {
    globe.canvas.width = width * 3;
    globe.canvas.height = height * 3;
    context = canvas.getContext('2d');
    context.scale(3, 3);
  }

  var resize = function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    globe.canvas.width = width;
    globe.canvas.height = height;
    globe.projection.translate([width / 2, height / 2]);
  };

  return function (planet) {
    globe = planet;
    planet.onInit(function () {
      needsCentering = true;
      d3.select(window).on('resize', function () {
        needsCentering = true;
      });
    });

    planet.onDraw(function () {
      if (needsCentering) { resize(); needsCentering = false; }
    });
  };
};

// Plugin to automatically scale the planet's projection based
// on the window size when the planet is initialized
function autoscale(options) {
  options = options || {};
  return function (planet) {
    planet.onInit(function () {
      var width = window.innerWidth;
      var height = window.innerHeight;
      if (width >= 787) {
        planet.projection.scale(Math.min(width, height) / 1.2);
      } else {
        planet.projection.scale(Math.min(width, height) / 0.9);
      }

    });
  };
};












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