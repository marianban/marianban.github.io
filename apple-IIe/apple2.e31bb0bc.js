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
console.clear();
var keys = [{
  key: 'Esc',
  key2: ''
}, {
  key: 'bang',
  key2: '1'
}, {
  key: 'at',
  key2: '2'
}, {
  key: 'hash',
  key2: '3'
}, {
  key: 'dolar',
  key2: '4'
}, {
  key: 'prc',
  key2: '5'
}, {
  key: 'caret',
  key2: '6'
}, {
  key: 'amp',
  key2: '7'
}, {
  key: 'star',
  key2: '8'
}, {
  key: 'lp',
  key2: '9'
}, {
  key: 'rp',
  key2: '0'
}, {
  key: '-',
  key2: '_'
}, {
  key: 'plus',
  key2: 'eq'
}, {
  key: 'Del',
  key2: ''
}, {
  key: '⇥',
  key2: ''
}, {
  key: 'Q',
  key2: ''
}, {
  key: 'W',
  key2: ''
}, {
  key: 'E',
  key2: ''
}, {
  key: 'R',
  key2: ''
}, {
  key: 'T',
  key2: ''
}, {
  key: 'Y',
  key2: ''
}, {
  key: 'U',
  key2: ''
}, {
  key: 'I',
  key2: ''
}, {
  key: 'O',
  key2: ''
}, {
  key: 'P',
  key2: ''
}, {
  key: 'lb',
  key2: 'lbr'
}, {
  key: 'rb',
  key2: 'rbr'
}, {
  key: '↵',
  key2: ''
}, {
  key: 'Ctrl',
  key2: ''
}, {
  key: 'A',
  key2: ''
}, {
  key: 'S',
  key2: ''
}, {
  key: 'D',
  key2: ''
}, {
  key: 'F',
  key2: ''
}, {
  key: 'G',
  key2: ''
}, {
  key: 'H',
  key2: ''
}, {
  key: 'J',
  key2: ''
}, {
  key: 'K',
  key2: ''
}, {
  key: 'L',
  key2: ''
}, {
  key: 'semi',
  key2: 'colon'
}, {
  key: 'dquote',
  key2: 'quote'
}, {
  key: 'tild',
  key2: 'dot'
}, {
  key: '⇧L',
  key2: ''
}, {
  key: 'pipe',
  key2: 'backslash'
}, {
  key: 'Z',
  key2: ''
}, {
  key: 'X',
  key2: ''
}, {
  key: 'C',
  key2: ''
}, {
  key: 'V',
  key2: ''
}, {
  key: 'B',
  key2: ''
}, {
  key: 'N',
  key2: ''
}, {
  key: 'M',
  key2: ''
}, {
  key: 'langleb',
  key2: 'comma'
}, {
  key: 'rangleb',
  key2: 'dot'
}, {
  key: 'qmark',
  key2: 'slash'
}, {
  key: '⇧',
  key2: ''
}, {
  key: '⇩',
  key2: ''
}, {
  key: 'none',
  key2: ''
}, {
  key: '',
  key2: ''
}, {
  key: '_',
  key2: ''
}, {
  key: 'r',
  key2: ''
}, {
  key: '⭠',
  key2: ''
}, {
  key: '⭢',
  key2: ''
}, {
  key: '⭣',
  key2: ''
}, {
  key: '⭡',
  key2: ''
}];
var keysContainer, keyTemplate;
document.addEventListener('DOMContentLoaded', function () {
  keysContainer = document.querySelector('.keys-container');
  keyTemplate = document.querySelector('.key--template');

  for (var i = 0; i < keys.length; i++) {
    var key = keyTemplate.cloneNode(true);
    key.classList.remove('key--template');
    key.classList.add('key--' + keys[i].key);
    var keyLabelTop = key.querySelector('.key__label-top');

    if (keys[i].key === '') {
      var appleFilled = document.createElement('div');
      appleFilled.classList.add('apple-outlined');
      keyLabelTop.appendChild(appleFilled);
    } else if (keys[i].key === 'r') {
      var _appleFilled = document.createElement('div');

      _appleFilled.classList.add('apple-filled');

      keyLabelTop.appendChild(_appleFilled);
    } else {
      keyLabelTop.innerText = getKeyLabel(keys[i].key);
    }

    var keyLabelBottom = key.querySelector('.key__label-bottom');
    keyLabelBottom.innerText = getKeyLabel(keys[i].key2);
    keysContainer.appendChild(key);
  }

  updateKeysZ();
});
window.addEventListener('resize', updateKeysZ);

function updateKeysZ() {
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () {
      for (var i = 0; i < keys.length; i++) {
        var keyClass = '.key--' + keys[i].key;
        var key = keysContainer.querySelector(keyClass);

        if (key) {
          var keyRight = key.querySelector('.key__side--right');
          var z = key.offsetWidth;
          keyRight.style.setProperty('--key-right-z', 'calc(-0.75vmin + ' + z + 'px)');

          if (keys[i].key === '↵') {
            var keyFront = key.querySelector('.key__side--front');
            console.log('front', key.offsetHeight);
            var frontOffset = key.offsetHeight;
            console.log({
              frontOffset: frontOffset
            }, keyFront);
            console.dir(keyFront);
            keyFront.style.setProperty('--height-half', 'calc(-0.75vmin + ' + frontOffset + 'px)');
          }
        } else {
          console.log(keys[i].key);
        }
      }
    });
  });
}

function getKeyLabel(key) {
  switch (key) {
    case '⇧L':
      return '⇧';

    case 'plus':
      return '+';

    case 'lb':
      return '[';

    case 'rb':
      return ']';

    case 'semi':
      return ';';

    case 'dquote':
      return '"';

    case 'tild':
      return '~';

    case 'langleb':
      return '<';

    case 'rangleb':
      return '>';

    case 'qmark':
      return '?';

    case 'backslash':
      return '\\';

    case 'r':
      return '';

    case 'quote':
      return "'";

    case 'colon':
      return ':';

    case 'pipe':
      return '|';

    case 'bang':
      return '!';

    case 'at':
      return '@';

    case 'hash':
      return '#';

    case 'prc':
      return '%';

    case 'dolar':
      return '$';

    case 'caret':
      return '^';

    case 'amp':
      return '&';

    case 'star':
      return '*';

    case 'lp':
      return '(';

    case 'rp':
      return ')';

    case 'eq':
      return '=';

    case 'lbr':
      return '{';

    case 'rbr':
      return '}';

    case 'slash':
      return '/';

    case 'comma':
      return ',';

    case 'dot':
      return '.';
  }

  return key;
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50225" + '/');

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
//# sourceMappingURL=/apple2.e31bb0bc.js.map