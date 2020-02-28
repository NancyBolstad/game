parcelRequire = (function(e, r, t, n) {
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
      (p.resolve = function(r) {
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
    (f.Module = function(e) {
      (this.id = e), (this.bundle = f), (this.exports = {});
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function(r, t) {
      e[r] = [
        function(e, r) {
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
      ? define(function() {
          return l;
        })
      : n && (this[n] = l);
  }
  if (((parcelRequire = f), i)) throw i;
  return f;
})(
  {
    TV2N: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 });
        var e,
          t = require('./index');
        function r(t) {
          (e = t.target), (t.target.style.opacity = '0.5');
        }
        function a(e) {
          e.target.style.opacity = '';
        }
        function n(e) {
          e.preventDefault();
        }
        function d(e) {
          'startZone' === e.target.id && (e.target.style.background = '#745625'),
            'endZone1' === e.target.id && (e.target.style.background = '#745625'),
            'endZone2' === e.target.id && (e.target.style.background = '#745625');
        }
        function o(e) {
          'startZone' === e.target.id && (e.target.style.background = ''),
            'endZone1' === e.target.id && (e.target.style.background = ''),
            'endZone2' === e.target.id && (e.target.style.background = '');
        }
        function g(r) {
          if ((r.preventDefault(), 'endZone1' == r.target.id)) {
            if (r.target.hasChildNodes())
              return (
                alert('Only one character is allowed.'), (r.target.style.background = ''), null
              );
            (r.target.style.background = ''),
              e.parentNode.removeChild(e),
              r.target.appendChild(e),
              t.gameStorage.set('player1Index', '' + e.getAttribute('key'));
          }
          if ('endZone2' == r.target.id) {
            if (r.target.hasChildNodes())
              return (
                alert('Only one character is allowed.'), (r.target.style.background = ''), null
              );
            (r.target.style.background = ''),
              e.parentNode.removeChild(e),
              r.target.appendChild(e),
              t.gameStorage.set('player2Index', '' + e.getAttribute('key'));
          }
          'startZone' == r.target.id &&
            ((r.target.style.background = ''),
            e.parentNode.removeChild(e),
            r.target.appendChild(e));
        }
        function i() {
          document.addEventListener('dragstart', r),
            document.addEventListener('dragend', a),
            document.addEventListener('dragover', n),
            document.addEventListener('dragenter', d),
            document.addEventListener('dragleave', o),
            document.addEventListener('drop', g);
        }
        exports.default = i;
      },
      { './index': 'KqmS' },
    ],
    xBI4: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.characterList = document.getElementById('startZone')),
          (exports.player1Selection = document.getElementById('endZone1')),
          (exports.player2Selection = document.getElementById('endZone2')),
          (exports.validateSelectionBtn = document.querySelector('.cta--validation')),
          (exports.board = document.getElementById('gameBoard')),
          (exports.diceContainer = document.getElementById('diceImage')),
          (exports.player1Btn = document.querySelector('.btn--Player1')),
          (exports.player2Btn = document.querySelector('.btn--Player2')),
          (exports.overlay = document.getElementById('overlay')),
          (exports.message = document.getElementById('message')),
          (exports.winnerContainer = document.getElementById('winner')),
          (exports.congratulationMessage = document.getElementById('congratulation')),
          (exports.resetBtn = document.getElementById('reset')),
          (exports.canvas = document.getElementById('canvas'));
      },
      {},
    ],
    mxTk: [
      function(require, module, exports) {
        'use strict';
        function e(e) {
          return e.hasChildNodes();
        }
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.hasSelected = e);
      },
      {},
    ],
    Q142: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 });
        var e = require('./util/containers'),
          t = require('./util/hasSelected');
        function r() {
          var r = t.hasSelected(e.player1Selection),
            a = t.hasSelected(e.player2Selection);
          r && a
            ? (window.location.href = 'game.html')
            : alert('Select character first, then start the game');
        }
        exports.handleSelection = r;
      },
      { './util/containers': 'xBI4', './util/hasSelected': 'mxTk' },
    ],
    fIe4: [
      function(require, module, exports) {
        'use strict';
        function t(t) {
          return exports.diceArray[t - 1];
        }
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.diceIcons = {
            point1:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 80x; width: 80px;"><rect fill="#000" fill-opacity="1" height="512" width="512" rx="32" ry="32"></rect><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zM256 206a50 50 0 0 1 0 100 50 50 0 0 1 0-100z" fill="#fff" fill-opacity="1"></path></g></svg>',
            point2:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 80px; width: 80px;"><rect fill="#000" fill-opacity="1" height="512" width="512" rx="32" ry="32"></rect><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zm316.97 36.03A50 50 0 0 1 440 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm-268 268A50 50 0 0 1 172 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97z" fill="#fff" fill-opacity="1"></path></g></svg>',
            point3:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 80px; width: 80px;"><rect fill="#000" fill-opacity="1" height="512" width="512" rx="32" ry="32"></rect><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zm316.97 36.03A50 50 0 0 1 440 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zM256 206a50 50 0 0 1 0 100 50 50 0 0 1 0-100zM123.47 340.03A50 50 0 0 1 172 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97z" fill="#fff" fill-opacity="1"></path></g></svg>',
            point4:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 80px; width: 80px;"><rect fill="#000" fill-opacity="1" height="512" width="512" rx="32" ry="32"></rect><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zm48.97 36.03A50 50 0 0 1 172 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm-268 268A50 50 0 0 1 172 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97z" fill="#fff" fill-opacity="1"></path></g></svg>',
            point5:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 80px; width: 80px;"><rect fill="#000" fill-opacity="1" height="512" width="512" rx="32" ry="32"></rect><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zm48.97 36.03A50 50 0 0 1 172 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zM256 206a50 50 0 0 1 0 100 50 50 0 0 1 0-100zM123.47 340.03A50 50 0 0 1 172 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97z" fill="#fff" fill-opacity="1"></path></g></svg>',
            point6:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="height: 80px; width: 80px;"><rect fill="#000" fill-opacity="1" height="512" width="512" rx="32" ry="32"></rect><g class="" transform="translate(0,0)" style="touch-action: none;"><path d="M74.5 36A38.5 38.5 0 0 0 36 74.5v363A38.5 38.5 0 0 0 74.5 476h363a38.5 38.5 0 0 0 38.5-38.5v-363A38.5 38.5 0 0 0 437.5 36h-363zm48.97 36.03A50 50 0 0 1 172 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 122a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zM122 206a50 50 0 0 1 0 100 50 50 0 0 1 0-100zm268 0a50 50 0 0 1 0 100 50 50 0 0 1 0-100zM123.47 340.03A50 50 0 0 1 172 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97zm268 0A50 50 0 0 1 440 390a50 50 0 0 1-100 0 50 50 0 0 1 51.47-49.97z" fill="#fff" fill-opacity="1"></path></g></svg>',
          }),
          (exports.diceArray = [
            exports.diceIcons.point1,
            exports.diceIcons.point2,
            exports.diceIcons.point3,
            exports.diceIcons.point4,
            exports.diceIcons.point5,
            exports.diceIcons.point6,
          ]),
          (exports.createDiceIcon = t);
      },
      {},
    ],
    JtL7: [
      function(require, module, exports) {
        'use strict';
        function e(e) {
          return 'https://res.cloudinary.com/dnkfgmzy1/image/upload/v1575549674/game/' + e + '.png';
        }
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.default = e);
      },
      {},
    ],
    fbZQ: [
      function(require, module, exports) {
        'use strict';
        var e =
          (this && this.__importDefault) ||
          function(e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(exports, '__esModule', { value: !0 });
        var t = require('./containers'),
          r = require('./dice'),
          a = e(require('./createImage')),
          o = {
            token: 8,
            action: 1,
            message: 'Pirates ahead! Retreat one field to avoid being noticed.',
          },
          n = {
            token: 14,
            action: 2,
            message: 'A wolf emerges from the night woods. Retreat two fields.',
          },
          s = {
            token: 18,
            action: 3,
            message: 'A white walker! Retreat three fields to escape death.',
          },
          i = {
            token: 24,
            action: 4,
            message: 'Enemy horsemen on the horizon! You must retreat four fields.',
          },
          l = {
            token: 28,
            action: 5,
            message: 'Dragons! Retreat five fields to escape their fire-breath.',
          };
        function d(e) {
          for (
            var t = function(t) {
                var r = document.createElement('div');
                (r.className = 'board__tile'),
                  r.setAttribute('id', 'tile-index-' + t),
                  (r.innerHTML = "<span class='tile__number'>" + t + '</span>'),
                  (r.style.backgroundColor = t % 2 != 0 ? 'brown' : 'white'),
                  exports.traps.map(function(e) {
                    e.token === t &&
                      ((r.style.backgroundColor = 'yellow'),
                      (r.style.backgroundImage =
                        "url('https://res.cloudinary.com/dnkfgmzy1/image/upload/v1575655734/game/trap" +
                        e.action +
                        ".svg')"),
                      (r.style.backgroundSize = '4rem'),
                      (r.style.backgroundRepeat = 'no-repeat'),
                      (r.style.backgroundPosition = 'center center'));
                  }),
                  30 == t &&
                    ((r.style.backgroundImage =
                      "url('https://res.cloudinary.com/dnkfgmzy1/image/upload/v1575655553/game/throne.svg')"),
                    (r.style.backgroundSize = '4rem'),
                    (r.style.backgroundRepeat = 'no-repeat'),
                    (r.style.backgroundPosition = 'center center')),
                  e.appendChild(r);
              },
              r = 1;
            r <= 30;
            r++
          )
            t(r);
        }
        function u(e) {
          e
            ? ((t.player1Btn.disabled = !1), (t.player2Btn.disabled = !0))
            : ((t.player1Btn.disabled = !0), (t.player2Btn.disabled = !1));
        }
        function c(e, t, a) {
          (e.innerHTML = r.diceArray[t - 1]),
            (e.className += ' item--shake'),
            setTimeout(function() {
              e.classList.remove('item--shake');
            }, a);
        }
        function m() {
          return Math.floor(6 * Math.random()) + 1;
        }
        function p(e) {
          document.getElementById('figure-' + e).remove();
        }
        function g(e, t) {
          var r = document.createElement('img');
          (r.src = '' + a.default(t)),
            r.setAttribute('class', 'board__figure'),
            r.setAttribute('alt', 'Game figure no.' + t),
            r.setAttribute('id', 'figure-' + t),
            null != e && e.append(r);
        }
        function f(e) {
          return e >= 30;
        }
        function y() {
          (t.player1Btn.disabled = !0), (t.player2Btn.disabled = !0);
        }
        function b(e) {
          (t.message.innerText = e), (t.overlay.style.display = 'block');
        }
        function h() {
          setTimeout(function() {
            t.overlay.style.display = 'none';
          }, 1500);
        }
        (exports.rollAgainMessage = 'You rolled a 6 and get another turn. Roll again!'),
          (exports.traps = [o, n, s, i, l]),
          (exports.createBoard = d),
          (exports.updatePlayer1Button = u),
          (exports.showDiceResult = c),
          (exports.rollDice = m),
          (exports.removePlayer = p),
          (exports.displayPlayers = g),
          (exports.checkWinner = f),
          (exports.gameEnd = y),
          (exports.showMessage = b),
          (exports.deleteMessage = h);
      },
      { './containers': 'xBI4', './dice': 'fIe4', './createImage': 'JtL7' },
    ],
    lNZh: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 });
        var e = require('./index'),
          t = require('./util/gameHelpers'),
          a = require('./util/containers');
        function n(n, r) {
          var i = document.getElementById('tile-index-1'),
            l = document.getElementById('tile-index-30'),
            s = 1,
            o = 1;
          t.displayPlayers(i, n),
            t.displayPlayers(i, r),
            t.updatePlayer1Button(!0),
            a.player1Btn.addEventListener(
              'click',
              function() {
                var r = t.rollDice();
                if ((t.showDiceResult(a.diceContainer, r, 300), (s += r), t.checkWinner(s))) {
                  var i = { index: n, name: 'Player 1' };
                  return (
                    e.gameStorage.setSerialize('winner', i),
                    t.removePlayer(n),
                    t.displayPlayers(l, n),
                    t.gameEnd(),
                    void setTimeout(function() {
                      window.location.href = 'winner.html';
                    }, 1e3)
                  );
                }
                var o = document.getElementById('tile-index-' + s);
                t.removePlayer(n),
                  t.displayPlayers(o, n),
                  t.traps.forEach(function(e) {
                    if (e.token == s) {
                      var a = e.action,
                        r = e.message;
                      s -= a;
                      var i = document.getElementById('tile-index-' + s);
                      t.showMessage('' + r),
                        t.deleteMessage(),
                        setTimeout(function() {
                          t.removePlayer(n), t.displayPlayers(i, n);
                        }, 3e3);
                    }
                  }),
                  t.updatePlayer1Button(!1);
                6 === r &&
                  (t.showMessage('' + t.rollAgainMessage),
                  t.deleteMessage(),
                  t.updatePlayer1Button(!0));
              },
              !1,
            ),
            a.player2Btn.addEventListener(
              'click',
              function() {
                var n = t.rollDice();
                if ((t.showDiceResult(a.diceContainer, n, 300), (o += n), t.checkWinner(o))) {
                  var i = { index: r, name: 'Player 2' };
                  return (
                    e.gameStorage.setSerialize('winner', i),
                    t.removePlayer(r),
                    t.displayPlayers(l, r),
                    t.gameEnd(),
                    void setTimeout(function() {
                      window.location.href = 'winner.html';
                    }, 1e3)
                  );
                }
                var s = document.getElementById('tile-index-' + o);
                t.removePlayer(r),
                  t.displayPlayers(s, r),
                  t.traps.forEach(function(e) {
                    if (e.token == o) {
                      var a = e.action,
                        n = e.message;
                      o -= a;
                      var i = document.getElementById('tile-index-' + o);
                      t.showMessage('' + n),
                        t.deleteMessage(),
                        setTimeout(function() {
                          t.removePlayer(r), t.displayPlayers(i, r);
                        }, 3e3);
                    }
                  }),
                  t.updatePlayer1Button(!0);
                6 === n &&
                  (t.showMessage('' + t.rollAgainMessage),
                  t.deleteMessage(),
                  t.updatePlayer1Button(!1));
              },
              !1,
            );
        }
        exports.default = n;
      },
      { './index': 'KqmS', './util/gameHelpers': 'fbZQ', './util/containers': 'xBI4' },
    ],
    W5hJ: [
      function(require, module, exports) {
        'use strict';
        function e() {
          setTimeout(function() {
            var e = document.getElementsByClassName('loading')[0];
            (e.innerHTML = ''), e.classList.remove('loading');
          }, 3e3);
        }
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.default = e);
      },
      {},
    ],
    IgTL: [
      function(require, module, exports) {
        'use strict';
        var e =
            (this && this.__awaiter) ||
            function(e, t, r, n) {
              return new (r || (r = Promise))(function(a, i) {
                function u(e) {
                  try {
                    c(n.next(e));
                  } catch (t) {
                    i(t);
                  }
                }
                function o(e) {
                  try {
                    c(n.throw(e));
                  } catch (t) {
                    i(t);
                  }
                }
                function c(e) {
                  var t;
                  e.done
                    ? a(e.value)
                    : ((t = e.value),
                      t instanceof r
                        ? t
                        : new r(function(e) {
                            e(t);
                          })).then(u, o);
                }
                c((n = n.apply(e, t || [])).next());
              });
            },
          t =
            (this && this.__generator) ||
            function(e, t) {
              var r,
                n,
                a,
                i,
                u = {
                  label: 0,
                  sent: function() {
                    if (1 & a[0]) throw a[1];
                    return a[1];
                  },
                  trys: [],
                  ops: [],
                };
              return (
                (i = { next: o(0), throw: o(1), return: o(2) }),
                'function' == typeof Symbol &&
                  (i[Symbol.iterator] = function() {
                    return this;
                  }),
                i
              );
              function o(i) {
                return function(o) {
                  return (function(i) {
                    if (r) throw new TypeError('Generator is already executing.');
                    for (; u; )
                      try {
                        if (
                          ((r = 1),
                          n &&
                            (a =
                              2 & i[0]
                                ? n.return
                                : i[0]
                                ? n.throw || ((a = n.return) && a.call(n), 0)
                                : n.next) &&
                            !(a = a.call(n, i[1])).done)
                        )
                          return a;
                        switch (((n = 0), a && (i = [2 & i[0], a.value]), i[0])) {
                          case 0:
                          case 1:
                            a = i;
                            break;
                          case 4:
                            return u.label++, { value: i[1], done: !1 };
                          case 5:
                            u.label++, (n = i[1]), (i = [0]);
                            continue;
                          case 7:
                            (i = u.ops.pop()), u.trys.pop();
                            continue;
                          default:
                            if (
                              !(a = (a = u.trys).length > 0 && a[a.length - 1]) &&
                              (6 === i[0] || 2 === i[0])
                            ) {
                              u = 0;
                              continue;
                            }
                            if (3 === i[0] && (!a || (i[1] > a[0] && i[1] < a[3]))) {
                              u.label = i[1];
                              break;
                            }
                            if (6 === i[0] && u.label < a[1]) {
                              (u.label = a[1]), (a = i);
                              break;
                            }
                            if (a && u.label < a[2]) {
                              (u.label = a[2]), u.ops.push(i);
                              break;
                            }
                            a[2] && u.ops.pop(), u.trys.pop();
                            continue;
                        }
                        i = t.call(e, u);
                      } catch (o) {
                        (i = [6, o]), (n = 0);
                      } finally {
                        r = a = 0;
                      }
                    if (5 & i[0]) throw i[1];
                    return { value: i[0] ? i[1] : void 0, done: !0 };
                  })([i, o]);
                };
              }
            },
          r =
            (this && this.__importDefault) ||
            function(e) {
              return e && e.__esModule ? e : { default: e };
            };
        Object.defineProperty(exports, '__esModule', { value: !0 });
        var n = require('./util/containers'),
          a = r(require('./util/createImage')),
          i = r(require('./util/gameLoader')),
          u = 'https://www.anapioficeandfire.com/api/characters/';
        function o(e) {
          i.default(),
            e.map(function(e) {
              c(e);
            });
        }
        function c(r) {
          return e(this, void 0, void 0, function() {
            var e, i, o, c, l, s, f, h;
            return t(this, function(t) {
              switch (t.label) {
                case 0:
                  (e = '' + u + r), (t.label = 1);
                case 1:
                  return t.trys.push([1, 4, , 5]), [4, fetch(e)];
                case 2:
                  return [4, t.sent().json()];
                case 3:
                  return (
                    (i = t.sent()),
                    (o = i.name),
                    (c = i.titles),
                    'Humble Man Without Title',
                    ((l = document.createElement('div')).className = 'row__item--card'),
                    l.setAttribute('draggable', 'true'),
                    l.setAttribute('key', '' + r),
                    (s =
                      '<img draggable="false" src=' +
                      a.default(r) +
                      ' class="item--card-image" alt="Game figure no.' +
                      r +
                      '">'),
                    (f = ' <h3>' + o + '</h3>'),
                    (h = '<span>' + (c[0] ? c[0] : 'Humble Man Without Title') + '</span>'),
                    (l.innerHTML = s + f + h),
                    n.characterList.append(l),
                    [2, i]
                  );
                case 4:
                  throw t.sent();
                case 5:
                  return [2];
              }
            });
          });
        }
        exports.default = o;
      },
      { './util/containers': 'xBI4', './util/createImage': 'JtL7', './util/gameLoader': 'W5hJ' },
    ],
    jG7D: [
      function(require, module, exports) {
        'use strict';
        var e =
          (this && this.__importDefault) ||
          function(e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(exports, '__esModule', { value: !0 });
        var t = require('./util/containers'),
          n = e(require('./util/createImage'));
        function r(e) {
          var r = e.index,
            a = e.name;
          if (null != t.winnerContainer) {
            var i = document.createElement('img');
            (i.className = 'item item--winner-image'),
              (i.src = '' + n.default(r)),
              (i.alt = 'Featured image for the winner'),
              t.winnerContainer.appendChild(i);
          }
          null != t.congratulationMessage &&
            (t.congratulationMessage.innerText = a + ' claimed the crown!');
        }
        exports.default = r;
      },
      { './util/containers': 'xBI4', './util/createImage': 'JtL7' },
    ],
    yuzu: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 });
        var e = 954,
          t = 583,
          r = 238,
          s = 1052,
          o = 271,
          u = 957,
          a = 2069,
          d = 190,
          l = 600,
          p = 700,
          c = 750,
          f = 50,
          i = [e, t, r, s, o, u, a, d, l, p, c, f];
        exports.default = i;
      },
      {},
    ],
    brI8: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 });
        var t = (function() {
          function t() {
            this.storage = window.localStorage;
          }
          return (
            (t.prototype.set = function(t, e) {
              this.storage.setItem(t, e);
            }),
            (t.prototype.get = function(t) {
              return this.storage.getItem(t);
            }),
            (t.prototype.delete = function(t) {
              this.storage.removeItem(t);
            }),
            (t.prototype.setSerialize = function(t, e) {
              this.set(t, JSON.stringify(e));
            }),
            (t.prototype.getUnserialize = function(t) {
              var e = this.get(t);
              return e ? JSON.parse(e) : null;
            }),
            t
          );
        })();
        exports.default = t;
      },
      {},
    ],
    hCmj: [
      function(require, module, exports) {
        'use strict';
        function e(e) {
          return Math.floor(Math.random() * e);
        }
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.getRandomNumber = e);
      },
      {},
    ],
    Ihss: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 });
        var e = require('./util/getRandomNumber'),
          o = function() {
            return {
              coordinateX: e.getRandomNumber(window.innerWidth),
              coordinateY: e.getRandomNumber(window.innerHeight),
              color: r(),
            };
          };
        function t(e, o) {
          var t = o.coordinateX,
            r = o.coordinateY,
            n = o.color;
          e.beginPath(),
            e.moveTo(t, r),
            e.lineTo(t + 5, r + 10),
            (e.lineWidth = 5),
            (e.strokeStyle = n),
            e.stroke();
        }
        function r() {
          var o = ['#FF0000', '#FFFF00', '#00FF00', '#80FFFF', '#FF4000', '#FF00FF'];
          return o[e.getRandomNumber(o.length)];
        }
        function n(e, o) {
          e.clearRect(0, 0, o.width, o.height);
        }
        function i(r, a) {
          n(r, a);
          for (var d = [], u = 0; u < 10; u++) d.push(o());
          for (var c = 0, F = d; c < F.length; c++) {
            var l = F[c];
            l.coordinateY >= a.height &&
              ((l.coordinateX = e.getRandomNumber(window.innerWidth)), (l.coordinateY = 0)),
              r.save(),
              (r.fillStyle = l.color),
              t(r, l),
              r.rotate(50),
              r.restore();
          }
          window.requestAnimationFrame(i.bind(null, r, a));
        }
        exports.default = i;
      },
      { './util/getRandomNumber': 'hCmj' },
    ],
    KqmS: [
      function(require, module, exports) {
        'use strict';
        var e =
          (this && this.__importDefault) ||
          function(e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(exports, '__esModule', { value: !0 });
        var r = e(require('./handleDrag')),
          t = require('./handleSelection'),
          a = e(require('./playGame')),
          n = e(require('./showCharacter')),
          i = e(require('./showWinner')),
          l = e(require('./util/characterIndex')),
          o = require('./util/containers'),
          d = require('./util/gameHelpers'),
          u = e(require('./util/storage')),
          s = e(require('./drawConfetti'));
        if (
          ((exports.gameStorage = new u.default()),
          null != o.characterList &&
            (n.default(l.default),
            r.default(),
            null != o.validateSelectionBtn &&
              o.validateSelectionBtn.addEventListener('click', t.handleSelection, !1)),
          null != o.board && null != o.diceContainer)
        ) {
          var c = exports.gameStorage.getUnserialize('player1Index'),
            g = exports.gameStorage.getUnserialize('player2Index');
          d.createBoard(o.board),
            d.showDiceResult(o.diceContainer, d.rollDice()),
            c && g && a.default(c, g);
        }
        if (null != o.winnerContainer) {
          var h = exports.gameStorage.getUnserialize('winner');
          i.default(h);
        }
        if (
          (null != o.resetBtn &&
            o.resetBtn.addEventListener(
              'click',
              function() {
                exports.gameStorage.delete('player1Index'),
                  exports.gameStorage.delete('player2Index'),
                  exports.gameStorage.delete('winner'),
                  (window.location.href = 'select.html');
              },
              !1,
            ),
          null != o.canvas)
        ) {
          var f = o.canvas.getContext('2d');
          (o.canvas.width = window.innerWidth),
            (o.canvas.height = window.innerHeight),
            s.default(f, o.canvas);
        }
      },
      {
        './handleDrag': 'TV2N',
        './handleSelection': 'Q142',
        './playGame': 'lNZh',
        './showCharacter': 'IgTL',
        './showWinner': 'jG7D',
        './util/characterIndex': 'yuzu',
        './util/containers': 'xBI4',
        './util/gameHelpers': 'fbZQ',
        './util/storage': 'brI8',
        './drawConfetti': 'Ihss',
      },
    ],
  },
  {},
  ['KqmS'],
  null,
);
//# sourceMappingURL=scripts.9af424f6.js.map
