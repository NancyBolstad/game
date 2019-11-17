(function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = 'function' == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = 'MODULE_NOT_FOUND'), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function(r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t,
        );
      }
      return n[i].exports;
    }
    for (var u = 'function' == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function(require, module, exports) {
        'use strict';
        var Greeter_1 = require('./scripts/Greeter');
        var greeter = new Greeter_1['default']('Hello');
        document.body.innerHTML = greeter.greet();
      },
      { './scripts/Greeter': 2 },
    ],
    2: [
      function(require, module, exports) {
        'use strict';
        var Name_1 = require('./Name');
        var Greeter = (function() {
          function Greeter(greeting) {
            this.greeting = greeting;
          }
          Greeter.prototype.greet = function() {
            return '<h1>' + this.greeting + Name_1.name + '</h1>';
          };
          return Greeter;
        })();
        exports.__esModule = true;
        exports['default'] = Greeter;
      },
      { './Name': 3 },
    ],
    3: [
      function(require, module, exports) {
        'use strict';
        exports.name = 'Knut';
      },
      {},
    ],
  },
  {},
  [1],
);
