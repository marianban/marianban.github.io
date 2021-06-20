parcelRequire = (function (e, r, t, n) {
  var i,
    o = 'function' == typeof parcelRequire && parcelRequire,
    u = 'function' == typeof require && require;
  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = 'function' == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && 'string' == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw ((c.code = 'MODULE_NOT_FOUND'), c);
      }
      (p.resolve = function (r) {
        return e[t][1][r] || r;
      }),
        (p.cache = {});
      var l = (r[t] = new f.Module(t));
      e[t][0].call(l.exports, p, l, l.exports, this);
    }
    return r[t].exports;
    function p(e) {
      return f(p.resolve(e));
    }
  }
  (f.isParcelRequire = !0),
    (f.Module = function (e) {
      (this.id = e), (this.bundle = f), (this.exports = {});
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function (r, t) {
      e[r] = [
        function (e, r) {
          r.exports = t;
        },
        {},
      ];
    });
  for (var c = 0; c < t.length; c++)
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  if (t.length) {
    var l = f(t[t.length - 1]);
    'object' == typeof exports && 'undefined' != typeof module
      ? (module.exports = l)
      : 'function' == typeof define && define.amd
      ? define(function () {
          return l;
        })
      : n && (this[n] = l);
  }
  if (((parcelRequire = f), i)) throw i;
  return f;
})(
  {
    Focm: [
      function (require, module, exports) {
        function t(t, i) {
          if (!(t instanceof i))
            throw new TypeError('Cannot call a class as a function');
        }
        function i(t, i) {
          for (var e = 0; e < i.length; e++) {
            var o = i[e];
            (o.enumerable = o.enumerable || !1),
              (o.configurable = !0),
              'value' in o && (o.writable = !0),
              Object.defineProperty(t, o.key, o);
          }
        }
        function e(t, e, o) {
          return e && i(t.prototype, e), o && i(t, o), t;
        }
        console.clear();
        var o,
          n,
          a = 0.1,
          s = 3.5,
          r = 1,
          h = 10,
          c = 30,
          l = 60,
          u = 7,
          d = 15,
          f = 3 * l,
          p = 1920 - f,
          y = 1080 - f,
          v = null;
        function g(t, i, e) {
          var o = p5.Vector.sub(i, t).mag(),
            n = atan2(t.y - i.y, t.x - i.x),
            a = i.x + cos(e + n) * o,
            s = i.y + sin(e + n) * o;
          return createVector(a, s);
        }
        function w(t, i, e) {
          var n =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : 0,
            a =
              arguments.length > 4 && void 0 !== arguments[4]
                ? arguments[4]
                : 0,
            s = arguments.length > 5 && void 0 !== arguments[5] && arguments[5];
          strokeWeight(0),
            s && tint(255, 127),
            push(),
            translate(t, i, -10),
            texture(o),
            beginShape();
          for (
            var r = TWO_PI / (e.length - 1), h = 0, c = 0;
            c < TWO_PI;
            c += r
          ) {
            var l = cos(c) * e[h],
              u = sin(c) * e[h];
            vertex(l, u, l + e[h] + n, u + e[h] + a), h++;
          }
          endShape(CLOSE), pop(), noTint();
        }
        var k,
          m,
          x,
          b = (function () {
            function i(e, o) {
              var n = this;
              t(this, i),
                (this.location = e),
                (this.velocity = o),
                (this.angle = 0);
              var f = p5.Vector.sub(e, p5.Vector.add(e, o)).mag();
              (this.aVelocity = f ? map(f, a, s, 0.01, 0.1) : 0),
                (this.isVisible = !1),
                (this.isOut = !1),
                (this.health = Math.round(random(r, h))),
                (this.size = map(this.health, r, h, c, l)),
                (this.npoints = Math.round(random(u, d)));
              var v = 0.45 * this.size;
              (this.radiuses = Array.from({ length: this.npoints + 1 }).map(
                function () {
                  return random(n.size - v, n.size);
                }
              )),
                (this.bgXOffset = random(0, p)),
                (this.bgYOffset = random(0, y)),
                (this.wasHit = !1);
            }
            return (
              e(i, [
                {
                  key: 'update',
                  value: function () {
                    (this.wasHit = !1),
                      (this.angle += this.aVelocity),
                      this.location.add(this.velocity),
                      this.updateOut(),
                      this.updateVisibility();
                  },
                },
                {
                  key: 'draw',
                  value: function () {
                    push(),
                      translate(this.location.x, this.location.y),
                      rotate(this.angle),
                      w(
                        0,
                        0,
                        this.radiuses,
                        this.XOffset,
                        this.bgYOffset,
                        this.wasHit
                      ),
                      pop();
                  },
                },
                {
                  key: 'updateVisibility',
                  value: function () {
                    this.location.x > 0 &&
                      this.location.x < width &&
                      this.location.y > 0 &&
                      this.location.y < height &&
                      (this.isVisible = !0);
                  },
                },
                {
                  key: 'updateOut',
                  value: function () {
                    this.isVisible &&
                      (this.location.x < 0 ||
                        this.location.x > width ||
                        this.location.y < 0 ||
                        this.location.y > height) &&
                      (this.isOut = !0);
                  },
                },
                {
                  key: 'isDead',
                  value: function () {
                    return this.health <= 0;
                  },
                },
                {
                  key: 'contains',
                  value: function (t) {
                    var i = this.size / 2;
                    return (
                      this.location.x - i <= t.x &&
                      t.x <= this.location.x + i &&
                      this.location.y - i <= t.y &&
                      t.y <= this.location.y + i
                    );
                  },
                },
                {
                  key: 'hit',
                  value: function (t) {
                    (this.health -= t), (this.wasHit = !0);
                  },
                },
              ]),
              i
            );
          })(),
          V = ['L', 'R', 'T', 'B'],
          j = (function () {
            function i() {
              t(this, i), (this.asteroids = new Set());
            }
            return (
              e(i, [
                {
                  key: 'add',
                  value: function (t) {
                    if (frameCount % 10 == 0 && !(random() > 0.1)) {
                      var i,
                        e,
                        o,
                        n,
                        r = 0.2 * width,
                        h = 0.2 * height,
                        c = random(V);
                      'T' === c &&
                        ((i = -r), (e = width + r), (o = 0), (n = -h)),
                        'R' === c &&
                          ((i = width),
                          (e = width + r),
                          (o = -h),
                          (n = height + h)),
                        'B' === c &&
                          ((i = -r),
                          (e = width + r),
                          (o = height),
                          (n = height + h)),
                        'L' === c &&
                          ((i = -r), (e = 0), (o = -h), (n = height + h));
                      var l = random(i, e),
                        u = random(o, n),
                        d = createVector(l, u),
                        f = p5.Vector.sub(t, d);
                      f.normalize(),
                        f.mult(random(a, s)),
                        this.asteroids.add(new b(d, f));
                    }
                  },
                },
                {
                  key: 'update',
                  value: function () {
                    var t = this;
                    this.asteroids.forEach(function (i) {
                      i.update(),
                        (i.isOut || i.isDead()) && t.asteroids.delete(i);
                    });
                  },
                },
                {
                  key: 'draw',
                  value: function () {
                    this.asteroids.forEach(function (t) {
                      t.draw();
                    });
                  },
                },
                {
                  key: 'hitBy',
                  value: function (t) {
                    var i = 0;
                    return (
                      this.asteroids.forEach(function (e) {
                        i += t.hit(e);
                      }),
                      i
                    );
                  },
                },
              ]),
              i
            );
          })(),
          E = (function () {
            function i(e, o) {
              t(this, i),
                (this.life = 255),
                (this.location = e.copy()),
                (this.prevLocation = this.location.copy()),
                (this.direction = o),
                (this.angle = 0),
                (this.size = 5);
            }
            return (
              e(i, [
                {
                  key: 'update',
                  value: function () {
                    var t = this.direction.copy();
                    t.setMag(15),
                      t.mult(-1),
                      (this.prevLocation = this.location.copy()),
                      this.location.add(t),
                      (this.life -= 1);
                  },
                },
                {
                  key: 'isDead',
                  value: function () {
                    return (
                      this.location.x < 0 ||
                      this.location.x > width ||
                      this.location.y < 0 ||
                      this.location.y > height
                    );
                  },
                },
                {
                  key: 'draw',
                  value: function () {
                    stroke(color('#E6F7D2')),
                      strokeWeight(3),
                      line(
                        this.prevLocation.x,
                        this.prevLocation.y,
                        this.location.x,
                        this.location.y
                      );
                  },
                },
              ]),
              i
            );
          })(),
          O = (function () {
            function i() {
              t(this, i), (this.projectiles = new Set());
            }
            return (
              e(i, [
                {
                  key: 'add',
                  value: function (t, i) {
                    this.projectiles.add(new E(t, i));
                  },
                },
                {
                  key: 'update',
                  value: function () {
                    var t = this;
                    this.projectiles.forEach(function (i) {
                      i.update(), i.isDead() && t.projectiles.delete(i);
                    });
                  },
                },
                {
                  key: 'draw',
                  value: function () {
                    this.projectiles.forEach(function (t) {
                      t.draw();
                    });
                  },
                },
                {
                  key: 'hit',
                  value: function (t) {
                    var i = this,
                      e = Array.from(this.projectiles).filter(function (i) {
                        return t.contains(i.location);
                      }),
                      o = e.length;
                    return (
                      o > 0 && t.hit(o),
                      e.forEach(function (t) {
                        i.projectiles.delete(t);
                      }),
                      e
                    );
                  },
                },
              ]),
              i
            );
          })(),
          S = (function () {
            function i(e) {
              t(this, i),
                (this.lifeSpan = 60),
                (this.life = this.lifeSpan),
                (this.lifeStep = 255 / this.life);
              (this.location = p5.Vector.add(
                e,
                createVector(random(-20, 20), random(-20, 20))
              )),
                (this.size = random(2, 10));
            }
            return (
              e(i, [
                {
                  key: 'update',
                  value: function () {
                    this.life -= this.lifeStep;
                  },
                },
                {
                  key: 'isDead',
                  value: function () {
                    return this.life <= 0;
                  },
                },
                {
                  key: 'draw',
                  value: function () {
                    push(),
                      translate(this.location.x, this.location.y, 5),
                      scale(max(1, this.life) / max(1, this.lifeSpan));
                    var t = color('#F4F590');
                    t.setAlpha(this.life),
                      blendMode(SCREEN),
                      fill(t),
                      stroke(t),
                      circle(0, 0, this.size),
                      blendMode(BLEND),
                      pop();
                  },
                },
              ]),
              i
            );
          })(),
          z = (function () {
            function i() {
              t(this, i), (this.projectiles = new Set());
            }
            return (
              e(i, [
                {
                  key: 'add',
                  value: function (t) {
                    for (var i = 0; i <= 3; i++) this.projectiles.add(new S(t));
                  },
                },
                {
                  key: 'update',
                  value: function () {
                    var t = this;
                    this.projectiles.forEach(function (i) {
                      i.update(), i.isDead() && t.projectiles.delete(i);
                    });
                  },
                },
                {
                  key: 'draw',
                  value: function () {
                    this.projectiles.forEach(function (t) {
                      t.draw();
                    });
                  },
                },
              ]),
              i
            );
          })(),
          D = (function () {
            function i() {
              t(this, i),
                (this.angle = radians(0)),
                (this.location = createVector(width / 2, height / 2)),
                (this.velocity = createVector(0, 0)),
                (this.acceleration = createVector(0, 0)),
                (this.direction = createVector(0, 0)),
                (this.origin = createVector(0, 0)),
                (this.angleAcceleration = 0.1),
                (this.projectiles = new O()),
                (this.impactProjectiles = new z()),
                (this.size = 25),
                (this.half = this.size / 2);
            }
            return (
              e(i, [
                {
                  key: 'update',
                  value: function () {
                    this.velocity.add(this.acceleration);
                    (this.velocity.x = constrain(this.velocity.x, -3, 3)),
                      (this.velocity.y = constrain(this.velocity.y, -3, 3)),
                      this.location.add(this.velocity),
                      this.acceleration.mult(0),
                      this.projectiles.update(),
                      this.impactProjectiles.update();
                  },
                },
                {
                  key: 'applyForce',
                  value: function (t) {
                    this.acceleration.add(t);
                  },
                },
                {
                  key: 'shoot',
                  value: function () {
                    if (keyIsDown(32) && frameCount % 4 == 0) {
                      var t = createVector(
                        this.origin.x + 28,
                        this.origin.y - 10
                      );
                      t = g(t, this.origin, this.angle);
                      var i = createVector(
                        this.origin.x - 28,
                        this.origin.y - 10
                      );
                      (i = g(i, this.origin, this.angle)),
                        this.projectiles.add(i, this.direction),
                        this.projectiles.add(t, this.direction);
                    }
                  },
                },
                {
                  key: 'draw',
                  value: function () {
                    var t = this.size,
                      i = this.half;
                    stroke(0), strokeWeight(1);
                    var e = this.location.x - i,
                      o = this.location.y,
                      a = this.location.x,
                      s = this.location.y - t,
                      r = this.location.x + i,
                      h = this.location.y;
                    this.origin = createVector(
                      this.location.x,
                      this.location.y - t / 2.5
                    );
                    var c = createVector(e, o);
                    c = g(c, this.origin, this.angle);
                    var l = createVector(a, s);
                    l = g(l, this.origin, this.angle);
                    var u = createVector(r, h);
                    (u = g(u, this.origin, this.angle)),
                      (this.direction = p5.Vector.sub(
                        this.origin,
                        l
                      ).normalize()),
                      push(),
                      stroke(color('#6D4717')),
                      fill('#FFEFC0'),
                      strokeWeight(0.5),
                      ambientLight(150),
                      directionalLight(255, 255, 255, 400, 200, 0),
                      translate(this.origin.x, this.origin.y, 7),
                      scale(0.3),
                      rotateZ(this.angle),
                      rotateX(radians(90)),
                      model(n),
                      pop(),
                      this.projectiles.draw(),
                      this.impactProjectiles.draw();
                  },
                },
                {
                  key: 'left',
                  value: function () {
                    this.angle -= this.angleAcceleration;
                  },
                },
                {
                  key: 'right',
                  value: function () {
                    this.angle += this.angleAcceleration;
                  },
                },
                {
                  key: 'forward',
                  value: function () {
                    var t = createVector(-0.05, -0.05);
                    t.mult(this.direction), this.applyForce(t);
                  },
                },
                {
                  key: 'backward',
                  value: function () {
                    var t = createVector(0.05, 0.05);
                    t.mult(this.direction), this.applyForce(t);
                  },
                },
                {
                  key: 'bounds',
                  value: function () {
                    this.location.x < 0
                      ? (this.location.x = width)
                      : this.location.x > width && (this.location.x = 0),
                      this.location.y < 0
                        ? (this.location.y = height)
                        : this.location.y > height && (this.location.y = 0);
                  },
                },
                {
                  key: 'hit',
                  value: function (t) {
                    var i = this,
                      e = this.projectiles.hit(t);
                    return (
                      e.forEach(function (t) {
                        i.impactProjectiles.add(t.location);
                      }),
                      e.length
                    );
                  },
                },
              ]),
              i
            );
          })(),
          W = null;
        function L() {
          (o = loadImage(
            'https://closure.vps.wbsprt.com/files/asteroids/asteroids-bg_p4dfyc-optimized_oidd13.jpg'
          )),
            (n = loadModel(
              'https://closure.vps.wbsprt.com/files/asteroids/SpaceShip_x7aymb.obj',
              !0
            ));
        }
        function R() {
          document.querySelector('.loader').remove(),
            createCanvas(windowWidth, windowHeight, WEBGL).parent(
              'game-container'
            ),
            (k = new D()),
            (m = new j()),
            (x = 0),
            (W = document.getElementById('score'));
        }
        function A() {
          resizeCanvas(windowWidth, windowHeight);
        }
        function F() {
          translate(-width / 2, -height / 2, 0),
            clear(),
            keyIsDown(LEFT_ARROW) && k.left(),
            keyIsDown(RIGHT_ARROW) && k.right(),
            keyIsDown(UP_ARROW) && k.forward(),
            keyIsDown(DOWN_ARROW) && k.backward(),
            m.update(),
            m.add(k.location),
            (x += m.hitBy(k)),
            m.draw(),
            I(),
            k.update(),
            k.bounds(),
            k.shoot(),
            k.draw();
        }
        function I() {
          var t = x.toString().padStart('4', '0');
          W.innerText = t;
        }
      },
      {},
    ],
  },
  {},
  ['Focm'],
  null
);
//# sourceMappingURL=asteroids.6b89b342.js.map
