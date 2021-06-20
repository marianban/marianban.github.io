// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

console.clear();
var ASTEROID_MIN_SPEED = 0.1;
var ASTEROID_MAX_SPEED = 3.5;
var ASTEROID_MIN_HEALTH = 1;
var ASTEROID_MAX_HEALTH = 10;
var ASTEROID_MIN_SIZE = 30;
var ASTEROID_MAX_SIZE = 60;
var ASTEROID_MIN_POINTS = 7;
var ASTEROID_MAX_POINTS = 15;
var asteroidBg;
var bgPadding = ASTEROID_MAX_SIZE * 3;
var bgWidth = 1920 - bgPadding;
var bgHeight = 1080 - bgPadding;
var thrustImg = null;
var spaceShip;

function rotatePoint(point, origin, angle) {
  var delta = p5.Vector.sub(origin, point); // distance from triangle center to vertex

  var r = delta.mag(); // angle between triangle center and vertex

  var tangle = atan2(point.y - origin.y, point.x - origin.x); // rotates point around origin by angle (incremented each frame)
  // alse make sure that it starts from original angle between vertex and center

  var x = origin.x + cos(angle + tangle) * r;
  var y = origin.y + sin(angle + tangle) * r;
  return createVector(x, y);
}

function asteroidShape(x, y, radiuses) {
  var xOffset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var yOffset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var highlight = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  strokeWeight(0);

  if (highlight) {
    tint(255, 127);
  }

  push();
  translate(x, y, -10);
  texture(asteroidBg);
  beginShape();
  var angle = TWO_PI / (radiuses.length - 1);
  var i = 0;

  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = cos(a) * radiuses[i];
    var sy = sin(a) * radiuses[i];
    vertex(sx, sy, sx + radiuses[i] + xOffset, sy + radiuses[i] + yOffset);
    i++;
  }

  endShape(CLOSE);
  pop();
  noTint();
}

var Asteroid = /*#__PURE__*/function () {
  function Asteroid(location, velocity) {
    var _this = this;

    _classCallCheck(this, Asteroid);

    this.location = location;
    this.velocity = velocity;
    this.angle = 0;
    var speed = p5.Vector.sub(location, p5.Vector.add(location, velocity)).mag(); // static asteroids

    this.aVelocity = speed ? map(speed, ASTEROID_MIN_SPEED, ASTEROID_MAX_SPEED, 0.01, 0.1) : 0;
    this.isVisible = false;
    this.isOut = false;
    this.health = Math.round(random(ASTEROID_MIN_HEALTH, ASTEROID_MAX_HEALTH));
    this.size = map(this.health, ASTEROID_MIN_HEALTH, ASTEROID_MAX_HEALTH, ASTEROID_MIN_SIZE, ASTEROID_MAX_SIZE);
    this.npoints = Math.round(random(ASTEROID_MIN_POINTS, ASTEROID_MAX_POINTS));
    var offset = this.size * 0.45;
    this.radiuses = Array.from({
      length: this.npoints + 1
    }).map(function () {
      return random(_this.size - offset, _this.size);
    });
    this.bgXOffset = random(0, bgWidth);
    this.bgYOffset = random(0, bgHeight);
    this.wasHit = false;
  }

  _createClass(Asteroid, [{
    key: "update",
    value: function update() {
      this.wasHit = false;
      this.angle += this.aVelocity;
      this.location.add(this.velocity);
      this.updateOut();
      this.updateVisibility();
    }
  }, {
    key: "draw",
    value: function draw() {
      push();
      translate(this.location.x, this.location.y);
      rotate(this.angle);
      asteroidShape(0, 0, this.radiuses, this.XOffset, this.bgYOffset, this.wasHit);
      pop();
    }
  }, {
    key: "updateVisibility",
    value: function updateVisibility() {
      if (this.location.x > 0 && this.location.x < width && this.location.y > 0 && this.location.y < height) {
        this.isVisible = true;
      }
    }
  }, {
    key: "updateOut",
    value: function updateOut() {
      if (!this.isVisible) {
        return;
      }

      if (this.location.x < 0 || this.location.x > width || this.location.y < 0 || this.location.y > height) {
        this.isOut = true;
      }
    }
  }, {
    key: "isDead",
    value: function isDead() {
      return this.health <= 0;
    }
  }, {
    key: "contains",
    value: function contains(point) {
      var half = this.size / 2;

      if (this.location.x - half <= point.x && point.x <= this.location.x + half && this.location.y - half <= point.y && point.y <= this.location.y + half) {
        return true;
      }

      return false;
    }
  }, {
    key: "hit",
    value: function hit(value) {
      this.health -= value;
      this.wasHit = true;
    }
  }]);

  return Asteroid;
}();

var sides = ['L', 'R', 'T', 'B'];

var Asteroids = /*#__PURE__*/function () {
  function Asteroids() {
    _classCallCheck(this, Asteroids);

    this.asteroids = new Set();
  }

  _createClass(Asteroids, [{
    key: "add",
    value: function add(target) {
      if (frameCount % 10 !== 0) {
        return;
      }

      var value = random();

      if (value > 0.1) {
        return;
      }

      var xOffset = width * 0.2;
      var yOffset = height * 0.2;
      var xmin;
      var xmax;
      var ymin;
      var ymax;
      var side = random(sides);

      if (side === 'T') {
        xmin = -xOffset;
        xmax = width + xOffset;
        ymin = 0;
        ymax = -yOffset;
      }

      if (side === 'R') {
        xmin = width;
        xmax = width + xOffset;
        ymin = -yOffset;
        ymax = height + yOffset;
      }

      if (side === 'B') {
        xmin = -xOffset;
        xmax = width + xOffset;
        ymin = height;
        ymax = height + yOffset;
      }

      if (side === 'L') {
        xmin = -xOffset;
        xmax = 0;
        ymin = -yOffset;
        ymax = height + yOffset;
      }

      var x = random(xmin, xmax);
      var y = random(ymin, ymax);
      var location = createVector(x, y);
      var velocity = p5.Vector.sub(target, location);
      velocity.normalize();
      velocity.mult(random(ASTEROID_MIN_SPEED, ASTEROID_MAX_SPEED));
      this.asteroids.add(new Asteroid(location, velocity));
    }
  }, {
    key: "update",
    value: function update() {
      var _this2 = this;

      this.asteroids.forEach(function (a) {
        a.update();

        if (a.isOut || a.isDead()) {
          _this2.asteroids.delete(a);
        }
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      this.asteroids.forEach(function (a) {
        a.draw();
      });
    }
  }, {
    key: "hitBy",
    value: function hitBy(ship) {
      var score = 0;
      this.asteroids.forEach(function (a) {
        score += ship.hit(a);
      });
      return score;
    }
  }]);

  return Asteroids;
}();

var Projectile = /*#__PURE__*/function () {
  function Projectile(location, direction) {
    _classCallCheck(this, Projectile);

    this.life = 255;
    this.location = location.copy();
    this.prevLocation = this.location.copy();
    this.direction = direction;
    this.angle = 0;
    this.size = 5;
  }

  _createClass(Projectile, [{
    key: "update",
    value: function update() {
      var dir = this.direction.copy();
      dir.setMag(15);
      dir.mult(-1);
      this.prevLocation = this.location.copy();
      this.location.add(dir);
      this.life -= 1;
    }
  }, {
    key: "isDead",
    value: function isDead() {
      return this.location.x < 0 || this.location.x > width || this.location.y < 0 || this.location.y > height;
    }
  }, {
    key: "draw",
    value: function draw() {
      stroke(color('#E6F7D2'));
      strokeWeight(3);
      line(this.prevLocation.x, this.prevLocation.y, this.location.x, this.location.y);
    }
  }]);

  return Projectile;
}();

var Projectiles = /*#__PURE__*/function () {
  function Projectiles() {
    _classCallCheck(this, Projectiles);

    this.projectiles = new Set();
  }

  _createClass(Projectiles, [{
    key: "add",
    value: function add(location, direction) {
      this.projectiles.add(new Projectile(location, direction));
    }
  }, {
    key: "update",
    value: function update() {
      var _this3 = this;

      this.projectiles.forEach(function (p) {
        p.update();

        if (p.isDead()) {
          _this3.projectiles.delete(p);
        }
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      this.projectiles.forEach(function (p) {
        p.draw();
      });
    }
  }, {
    key: "hit",
    value: function hit(asteroid) {
      var _this4 = this;

      var nailedProjectiles = Array.from(this.projectiles).filter(function (p) {
        return asteroid.contains(p.location);
      });
      var hitCount = nailedProjectiles.length;

      if (hitCount > 0) {
        asteroid.hit(hitCount);
      }

      nailedProjectiles.forEach(function (p) {
        _this4.projectiles.delete(p);
      });
      return nailedProjectiles;
    }
  }]);

  return Projectiles;
}();

var ImpactProjectile = /*#__PURE__*/function () {
  function ImpactProjectile(location) {
    _classCallCheck(this, ImpactProjectile);

    this.lifeSpan = 60 * 1;
    this.life = this.lifeSpan;
    this.lifeStep = 255 / this.life;
    var offset = 20;
    this.location = p5.Vector.add(location, createVector(random(-offset, offset), random(-offset, offset)));
    this.size = random(2, 10);
  }

  _createClass(ImpactProjectile, [{
    key: "update",
    value: function update() {
      this.life -= this.lifeStep;
    }
  }, {
    key: "isDead",
    value: function isDead() {
      return this.life <= 0;
    }
  }, {
    key: "draw",
    value: function draw() {
      push();
      translate(this.location.x, this.location.y, 5);
      scale(max(1, this.life) / max(1, this.lifeSpan));
      var c = color('#F4F590');
      c.setAlpha(this.life);
      blendMode(SCREEN);
      fill(c);
      stroke(c);
      circle(0, 0, this.size);
      blendMode(BLEND);
      pop();
    }
  }]);

  return ImpactProjectile;
}();

var ImpactProjectiles = /*#__PURE__*/function () {
  function ImpactProjectiles() {
    _classCallCheck(this, ImpactProjectiles);

    this.projectiles = new Set();
  }

  _createClass(ImpactProjectiles, [{
    key: "add",
    value: function add(location) {
      for (var i = 0; i <= 3; i++) {
        this.projectiles.add(new ImpactProjectile(location));
      }
    }
  }, {
    key: "update",
    value: function update() {
      var _this5 = this;

      this.projectiles.forEach(function (p) {
        p.update();

        if (p.isDead()) {
          _this5.projectiles.delete(p);
        }
      });
    }
  }, {
    key: "draw",
    value: function draw() {
      this.projectiles.forEach(function (p) {
        p.draw();
      });
    }
  }]);

  return ImpactProjectiles;
}();

var Ship = /*#__PURE__*/function () {
  function Ship() {
    _classCallCheck(this, Ship);

    this.angle = radians(0);
    this.location = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.direction = createVector(0, 0);
    this.origin = createVector(0, 0);
    this.angleAcceleration = 0.1;
    this.projectiles = new Projectiles();
    this.impactProjectiles = new ImpactProjectiles();
    this.size = 25;
    this.half = this.size / 2;
  }

  _createClass(Ship, [{
    key: "update",
    value: function update() {
      this.velocity.add(this.acceleration);
      var maxVelocity = 3;
      this.velocity.x = constrain(this.velocity.x, -maxVelocity, maxVelocity);
      this.velocity.y = constrain(this.velocity.y, -maxVelocity, maxVelocity);
      this.location.add(this.velocity);
      this.acceleration.mult(0);
      this.projectiles.update();
      this.impactProjectiles.update();
    }
  }, {
    key: "applyForce",
    value: function applyForce(force) {
      this.acceleration.add(force);
    }
  }, {
    key: "shoot",
    value: function shoot() {
      var SPACE = 32;

      if (keyIsDown(SPACE) && frameCount % 4 == 0) {
        var rightCannon = createVector(this.origin.x + 28, this.origin.y - 10);
        rightCannon = rotatePoint(rightCannon, this.origin, this.angle);
        var leftCannon = createVector(this.origin.x - 28, this.origin.y - 10);
        leftCannon = rotatePoint(leftCannon, this.origin, this.angle);
        this.projectiles.add(leftCannon, this.direction);
        this.projectiles.add(rightCannon, this.direction);
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      var size = this.size;
      var half = this.half;
      stroke(0);
      strokeWeight(1);
      var x1 = this.location.x - half;
      var y1 = this.location.y;
      var x2 = this.location.x;
      var y2 = this.location.y - size;
      var x3 = this.location.x + half;
      var y3 = this.location.y;
      this.origin = createVector(this.location.x, this.location.y - size / 2.5);
      var v1 = createVector(x1, y1);
      v1 = rotatePoint(v1, this.origin, this.angle);
      var v2 = createVector(x2, y2);
      v2 = rotatePoint(v2, this.origin, this.angle);
      var v3 = createVector(x3, y3);
      v3 = rotatePoint(v3, this.origin, this.angle);
      this.direction = p5.Vector.sub(this.origin, v2).normalize();
      push();
      stroke(color('#6D4717'));
      fill('#FFEFC0');
      strokeWeight(0.5);
      ambientLight(150);
      directionalLight(255, 255, 255, 400, 200, 0);
      translate(this.origin.x, this.origin.y, 7);
      scale(0.3);
      rotateZ(this.angle);
      rotateX(radians(90));
      model(spaceShip);
      pop();
      /*
      blendMode(SCREEN);
      for(let i=0; i<10; i++) {
        push();
         translate(this.origin.x + random(-2, 2), this.origin.y + i + random(-2, 2));
        rotateZ(this.angle);
        translate(0, 45);
        scale(1/15);
        strokeWeight(0);
        rotate(radians(-90));
        fill(0,0,0,0);
        texture(thrustImg);
        plane(thrustImg.width, thrustImg.height);
        pop();
      }
      blendMode(BLEND);
      */

      this.projectiles.draw();
      this.impactProjectiles.draw();
    }
  }, {
    key: "left",
    value: function left() {
      this.angle -= this.angleAcceleration;
    }
  }, {
    key: "right",
    value: function right() {
      this.angle += this.angleAcceleration;
    }
  }, {
    key: "forward",
    value: function forward() {
      var force = createVector(-0.05, -0.05);
      force.mult(this.direction);
      this.applyForce(force);
    }
  }, {
    key: "backward",
    value: function backward() {
      var force = createVector(0.05, 0.05);
      force.mult(this.direction);
      this.applyForce(force);
    }
  }, {
    key: "bounds",
    value: function bounds() {
      if (this.location.x < 0) {
        this.location.x = width;
      } else if (this.location.x > width) {
        this.location.x = 0;
      }

      if (this.location.y < 0) {
        this.location.y = height;
      } else if (this.location.y > height) {
        this.location.y = 0;
      }
    }
  }, {
    key: "hit",
    value: function hit(asteroid) {
      var _this6 = this;

      var projectiles = this.projectiles.hit(asteroid);
      projectiles.forEach(function (p) {
        _this6.impactProjectiles.add(p.location);
      });
      return projectiles.length;
    }
  }]);

  return Ship;
}();

var ship;
var asteroids;
var gameScore;
var $gameScore = null;

function preload() {
  asteroidBg = loadImage('https://res.cloudinary.com/dzadmlxnt/image/upload/v1606642498/asteroids/asteroids-bg_p4dfyc-optimized_oidd13.jpg'); // https://free3d.com/3d-model/low-poly-spaceship-37605.html

  spaceShip = loadModel('https://res.cloudinary.com/dzadmlxnt/raw/upload/v1605625376/asteroids/SpaceShip_x7aymb.obj', true);
}

function setup() {
  document.querySelector('.loader').remove();
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('game-container');
  ship = new Ship();
  asteroids = new Asteroids();
  gameScore = 0;
  $gameScore = document.getElementById('score');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  translate(-width / 2, -height / 2, 0);
  clear();

  if (keyIsDown(LEFT_ARROW)) {
    ship.left();
  }

  if (keyIsDown(RIGHT_ARROW)) {
    ship.right();
  }

  if (keyIsDown(UP_ARROW)) {
    ship.forward();
  }

  if (keyIsDown(DOWN_ARROW)) {
    ship.backward();
  }

  asteroids.update();
  asteroids.add(ship.location);
  gameScore += asteroids.hitBy(ship);
  asteroids.draw();
  drawScore();
  ship.update();
  ship.bounds();
  ship.shoot();
  ship.draw();
}

function drawScore() {
  var sScore = gameScore.toString().padStart('4', '0');
  $gameScore.innerText = sScore;
}
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50719" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/asteroids.e31bb0bc.js.map