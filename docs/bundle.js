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
        Object.defineProperty(exports, '__esModule', { value: true });
        var containers_1 = require('./scripts/util/containers');
        var storage_1 = require('./scripts/util/storage');
        var showCharacter_1 = require('./scripts/showCharacter');
        var dice_1 = require('./scripts/util/dice');
        var board_1 = require('./scripts/board');
        var characters_1 = require('./scripts/util/characters');
        var gameStorage = new storage_1.default();
        gameStorage.get('test');
        if (containers_1.characterList != null) {
          showCharacter_1.default(characters_1.Samwell);
          showCharacter_1.default(characters_1.Jon);
          showCharacter_1.default(characters_1.Sansa);
        }
        var defaultIndex = Math.floor(Math.random() * 6) + 1;
        if (containers_1.diceContainer != null)
          containers_1.diceContainer.innerHTML = dice_1.diceArray[defaultIndex - 1];
        if (containers_1.board != null) board_1.createBoard(containers_1.board);
        if (containers_1.startTile != null)
          containers_1.startTile.innerHTML = dice_1.diceArray[defaultIndex - 1];
        var dragged;
        var hasSelected;
        document.addEventListener('drag', function(event) {}, false);
        document.addEventListener(
          'dragstart',
          function(event) {
            dragged = event.target;
            event.target.style.background = 'yellow';
          },
          false,
        );
        document.addEventListener(
          'dragend',
          function(event) {
            event.target.style.background = 'black';
          },
          false,
        );
        document.addEventListener(
          'dragover',
          function(event) {
            event.preventDefault();
          },
          false,
        );
        document.addEventListener(
          'dragenter',
          function(event) {
            if (event.target.className == 'dropzone1') {
              event.target.style.background = 'purple';
            }
            if (event.target.className == 'dropzone2') {
              event.target.style.background = 'purple';
            }
          },
          false,
        );
        document.addEventListener(
          'dragleave',
          function(event) {
            if (event.target.className == 'dropzone1') {
              event.target.style.background = '';
            }
            if (event.target.className == 'dropzone2') {
              event.target.style.background = '';
            }
          },
          false,
        );
        document.addEventListener(
          'drop',
          function(event) {
            event.preventDefault();
            if (hasSelected && event.target.className == 'dropzone2') {
              alert('Only one character is allowed.');
            }
            if (!hasSelected && event.target.className == 'dropzone2') {
              event.target.style.background = '';
              dragged.parentNode.removeChild(dragged);
              event.target.appendChild(dragged);
              var character = dragged.getAttribute('key');
              console.log('helloe ' + character);
              gameStorage.set('player1Name', '' + character);
              hasSelected = true;
            }
            if (event.target.className == 'dropzone1') {
              hasSelected = false;
              event.target.style.background = '';
              dragged.parentNode.removeChild(dragged);
              event.target.appendChild(dragged);
            }
          },
          false,
        );
      },
      {
        './scripts/board': 2,
        './scripts/showCharacter': 3,
        './scripts/util/characters': 4,
        './scripts/util/containers': 5,
        './scripts/util/dice': 6,
        './scripts/util/storage': 7,
      },
    ],
    2: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        function createBoard(container) {
          for (var i = 1; i <= 30; i++) {
            var tile = document.createElement('div');
            tile.className = 'tile tile-index-' + i;
            tile.setAttribute('tile-index', '' + i);
            if (i % 2 !== 0) {
              tile.style.backgroundColor = 'brown';
            } else {
              tile.style.backgroundColor = 'white';
            }
            if (i == 4) {
              tile.style.backgroundColor = 'orange';
            }
            if (i == 7) {
              tile.style.backgroundColor = 'orange';
            }
            if (i == 13) {
              tile.style.backgroundColor = 'orange';
            }
            if (i == 16) {
              tile.style.backgroundColor = 'orange';
            }
            if (i == 23) {
              tile.style.backgroundColor = 'orange';
            }
            if (i == 29) {
              tile.style.backgroundColor = 'orange';
            }
            container.appendChild(tile);
          }
        }
        exports.createBoard = createBoard;
      },
      {},
    ],
    3: [
      function(require, module, exports) {
        'use strict';
        var __awaiter =
          (this && this.__awaiter) ||
          function(thisArg, _arguments, P, generator) {
            function adopt(value) {
              return value instanceof P
                ? value
                : new P(function(resolve) {
                    resolve(value);
                  });
            }
            return new (P || (P = Promise))(function(resolve, reject) {
              function fulfilled(value) {
                try {
                  step(generator.next(value));
                } catch (e) {
                  reject(e);
                }
              }
              function rejected(value) {
                try {
                  step(generator['throw'](value));
                } catch (e) {
                  reject(e);
                }
              }
              function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
              }
              step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
          };
        var __generator =
          (this && this.__generator) ||
          function(thisArg, body) {
            var _ = {
                label: 0,
                sent: function() {
                  if (t[0] & 1) throw t[1];
                  return t[1];
                },
                trys: [],
                ops: [],
              },
              f,
              y,
              t,
              g;
            return (
              (g = { next: verb(0), throw: verb(1), return: verb(2) }),
              typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function() {
                  return this;
                }),
              g
            );
            function verb(n) {
              return function(v) {
                return step([n, v]);
              };
            }
            function step(op) {
              if (f) throw new TypeError('Generator is already executing.');
              while (_)
                try {
                  if (
                    ((f = 1),
                    y &&
                      (t =
                        op[0] & 2
                          ? y['return']
                          : op[0]
                          ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                          : y.next) &&
                      !(t = t.call(y, op[1])).done)
                  )
                    return t;
                  if (((y = 0), t)) op = [op[0] & 2, t.value];
                  switch (op[0]) {
                    case 0:
                    case 1:
                      t = op;
                      break;
                    case 4:
                      _.label++;
                      return { value: op[1], done: false };
                    case 5:
                      _.label++;
                      y = op[1];
                      op = [0];
                      continue;
                    case 7:
                      op = _.ops.pop();
                      _.trys.pop();
                      continue;
                    default:
                      if (
                        !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                        (op[0] === 6 || op[0] === 2)
                      ) {
                        _ = 0;
                        continue;
                      }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                        _.label = op[1];
                        break;
                      }
                      if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                      }
                      if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                      }
                      if (t[2]) _.ops.pop();
                      _.trys.pop();
                      continue;
                  }
                  op = body.call(thisArg, _);
                } catch (e) {
                  op = [6, e];
                  y = 0;
                } finally {
                  f = t = 0;
                }
              if (op[0] & 5) throw op[1];
              return { value: op[0] ? op[1] : void 0, done: true };
            }
          };
        Object.defineProperty(exports, '__esModule', { value: true });
        var containers_1 = require('./util/containers');
        var BASE_URL = 'https://www.anapioficeandfire.com/api/characters/';
        function showCharacter(characterName) {
          return __awaiter(this, void 0, void 0, function() {
            var url, response, data, component, err_1;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  url = '' + BASE_URL + characterName;
                  _a.label = 1;
                case 1:
                  _a.trys.push([1, 4, , 5]);
                  return [4, fetch(url)];
                case 2:
                  response = _a.sent();
                  return [4, response.json()];
                case 3:
                  data = _a.sent();
                  component = document.createElement('div');
                  component.setAttribute('draggable', 'true');
                  component.setAttribute('key', '' + data.name);
                  component.innerHTML = ' <h4>' + data.name + '</h4><p>' + data.born + '</p>';
                  containers_1.characterList.append(component);
                  console.log(data);
                  return [2, data];
                case 4:
                  err_1 = _a.sent();
                  throw err_1;
                case 5:
                  return [2];
              }
            });
          });
        }
        exports.default = showCharacter;
      },
      { './util/containers': 5 },
    ],
    4: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.Samwell = 954;
        exports.Jon = 583;
        exports.Cersei = 238;
        exports.Tyrion = 1052;
        exports.Sansa = 957;
      },
      {},
    ],
    5: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.board = document.querySelector('.gameBoard');
        exports.diceContainer = document.getElementById('diceImage');
        exports.characterList = document.querySelector('.dropzone1');
        exports.startTile = document.querySelector('tile-index-1');
      },
      {},
    ],
    6: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var diceIcons = {
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
        };
        exports.diceArray = [
          diceIcons.point1,
          diceIcons.point2,
          diceIcons.point3,
          diceIcons.point4,
          diceIcons.point5,
          diceIcons.point6,
        ];
      },
      {},
    ],
    7: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var Storage = (function() {
          function Storage() {
            this.storage = window.localStorage;
          }
          Storage.prototype.set = function(key, value) {
            this.storage.setItem(key, value);
          };
          Storage.prototype.get = function(key) {
            return this.storage.getItem(key);
          };
          Storage.prototype.delete = function(key) {
            this.storage.removeItem(key);
          };
          Storage.prototype.setSerialize = function(key, value) {
            this.set(key, JSON.stringify(value));
          };
          Storage.prototype.getUnserialize = function(key) {
            var data = this.get(key);
            if (!data) {
              return null;
            }
            return JSON.parse(data);
          };
          return Storage;
        })();
        exports.default = Storage;
      },
      {},
    ],
  },
  {},
  [1],
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXgudHMiLCJzcmMvc2NyaXB0cy9ib2FyZC50cyIsInNyYy9zY3JpcHRzL3Nob3dDaGFyYWN0ZXIudHMiLCJzcmMvc2NyaXB0cy91dGlsL2NoYXJhY3RlcnMudHMiLCJzcmMvc2NyaXB0cy91dGlsL2NvbnRhaW5lcnMudHMiLCJzcmMvc2NyaXB0cy91dGlsL2RpY2UudHMiLCJzcmMvc2NyaXB0cy91dGlsL3N0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLHdEQUEyRjtBQUMzRixrREFBNkM7QUFDN0MseURBQW9EO0FBQ3BELDRDQUFnRDtBQUNoRCx5Q0FBOEM7QUFDOUMsd0RBQWdFO0FBRWhFLElBQU0sV0FBVyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO0FBQ2xDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFeEIsSUFBSSwwQkFBYSxJQUFJLElBQUksRUFBRTtJQUN6Qix1QkFBYSxDQUFDLG9CQUFPLENBQUMsQ0FBQztJQUN2Qix1QkFBYSxDQUFDLGdCQUFHLENBQUMsQ0FBQztJQUNuQix1QkFBYSxDQUFDLGtCQUFLLENBQUMsQ0FBQztDQUN0QjtBQUVELElBQU0sWUFBWSxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUUvRCxJQUFJLDBCQUFhLElBQUksSUFBSTtJQUFFLDBCQUFhLENBQUMsU0FBUyxHQUFHLGdCQUFTLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBRWpGLElBQUksa0JBQUssSUFBSSxJQUFJO0lBQUUsbUJBQVcsQ0FBQyxrQkFBSyxDQUFDLENBQUM7QUFFdEMsSUFBSSxzQkFBUyxJQUFJLElBQUk7SUFBRSxzQkFBUyxDQUFDLFNBQVMsR0FBRyxnQkFBUyxDQUFDLFlBQVksR0FBRyxDQUFD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SCxVQUFJLEdBQVcsRUFBRSxLQUFhO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQscUJBQUcsR0FBSCxVQUFJLEdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCx3QkFBTSxHQUFOLFVBQU8sR0FBVztRQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsOEJBQVksR0FBWixVQUFhLEdBQVcsRUFBRSxLQUFVO1FBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsZ0NBQWMsR0FBZCxVQUFrQixHQUFXO1FBQzNCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFM0IsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFNLENBQUM7SUFDL0IsQ0FBQztJQUNILGNBQUM7QUFBRCxDQTVCQSxBQTRCQyxJQUFBO0FBRUQsa0JBQWUsT0FBTyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgYm9hcmQsIGRpY2VDb250YWluZXIsIHN0YXJ0VGlsZSwgY2hhcmFjdGVyTGlzdCB9IGZyb20gJy4vc2NyaXB0cy91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9zY3JpcHRzL3V0aWwvc3RvcmFnZSc7XG5pbXBvcnQgc2hvd0NoYXJhY3RlciBmcm9tICcuL3NjcmlwdHMvc2hvd0NoYXJhY3Rlcic7XG5pbXBvcnQgeyBkaWNlQXJyYXkgfSBmcm9tICcuL3NjcmlwdHMvdXRpbC9kaWNlJztcbmltcG9ydCB7IGNyZWF0ZUJvYXJkIH0gZnJvbSAnLi9zY3JpcHRzL2JvYXJkJztcbmltcG9ydCB7IEpvbiwgU2Ftd2VsbCwgU2Fuc2EgfSBmcm9tICcuL3NjcmlwdHMvdXRpbC9jaGFyYWN0ZXJzJztcblxuY29uc3QgZ2FtZVN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpO1xuZ2FtZVN0b3JhZ2UuZ2V0KCd0ZXN0Jyk7XG5cbmlmIChjaGFyYWN0ZXJMaXN0ICE9IG51bGwpIHtcbiAgc2hvd0NoYXJhY3RlcihTYW13ZWxsKTtcbiAgc2hvd0NoYXJhY3RlcihKb24pO1xuICBzaG93Q2hhcmFjdGVyKFNhbnNhKTtcbn1cblxuY29uc3QgZGVmYXVsdEluZGV4OiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSArIDE7XG5cbmlmIChkaWNlQ29udGFpbmVyICE9IG51bGwpIGRpY2VDb250YWluZXIuaW5uZXJIVE1MID0gZGljZUFycmF5W2RlZmF1bHRJbmRleCAtIDFdO1xuXG5pZiAoYm9hcmQgIT0gbnVsbCkgY3JlYXRlQm9hcmQoYm9hcmQpO1xuXG5pZiAoc3RhcnRUaWxlICE9IG51bGwpIHN0YXJ0VGlsZS5pbm5lckhUTUwgPSBkaWNlQXJyYXlbZGVmYXVsdEluZGV4IC0gMV07XG5cbnZhciBkcmFnZ2VkOkhUTUxFbGVtZW50O1xudmFyIGhhc1NlbGVjdGVkOmJvb2xlYW47XG5cbi8qIGV2ZW50cyBmaXJlZCBvbiB0aGUgZHJhZ2dhYmxlIHRhcmdldCAqL1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdcIiwgZnVuY3Rpb24oZXZlbnQpIHtcblxufSwgZmFsc2UpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGZ1bmN0aW9uKGV2ZW50OkRyYWdFdmVudCkge1xuICAvLyBzdG9yZSBhIHJlZi4gb24gdGhlIGRyYWdnZWQgZWxlbVxuICBkcmFnZ2VkID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG4gIC8vIG1ha2UgaXQgaGFsZiB0cmFuc3BhcmVudFxuICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3llbGxvdyc7XG59LCBmYWxzZSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIGZ1bmN0aW9uKGV2ZW50OkRyYWdFdmVudCkge1xuICAvLyByZXNldCB0aGUgdHJhbnNwYXJlbmN5XG4gIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSBcImJsYWNrXCI7XG59LCBmYWxzZSk7XG5cbi8qIGV2ZW50cyBmaXJlZCBvbiB0aGUgZHJvcCB0YXJnZXRzICovXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZnVuY3Rpb24oZXZlbnQ6RHJhZ0V2ZW50KSB7XG4gIC8vIHByZXZlbnQgZGVmYXVsdCB0byBhbGxvdyBkcm9wXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59LCBmYWxzZSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW50ZXJcIiwgZnVuY3Rpb24oZXZlbnQ6RHJhZ0V2ZW50KSB7XG4gIC8vIGhpZ2hsaWdodCBwb3RlbnRpYWwgZHJvcCB0YXJnZXQgd2hlbiB0aGUgZHJhZ2dhYmxlIGVsZW1lbnQgZW50ZXJzIGl0XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbGFzc05hbWUgPT0gXCJkcm9wem9uZTFcIikge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSBcInB1cnBsZVwiO1xuICB9XG5cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTmFtZSA9PSBcImRyb3B6b25lMlwiKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9IFwicHVycGxlXCI7XG4gIH1cblxufSwgZmFsc2UpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIGZ1bmN0aW9uKGV2ZW50OkRyYWdFdmVudCkge1xuICAvLyByZXNldCBiYWNrZ3JvdW5kIG9mIHBvdGVudGlhbCBkcm9wIHRhcmdldCB3aGVuIHRoZSBkcmFnZ2FibGUgZWxlbWVudCBsZWF2ZXMgaXRcbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTmFtZSA9PSBcImRyb3B6b25lMVwiKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9IFwiXCI7XG4gIH1cblxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuY2xhc3NOYW1lID09IFwiZHJvcHpvbmUyXCIpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gXCJcIjtcbiAgfVxuXG59LCBmYWxzZSk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIC8vIHByZXZlbnQgZGVmYXVsdCBhY3Rpb24gKG9wZW4gYXMgbGluayBmb3Igc29tZSBlbGVtZW50cylcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICBpZihoYXNTZWxlY3RlZCAmJihldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTmFtZSA9PSBcImRyb3B6b25lMlwiKXtcbiAgICBhbGVydCgnT25seSBvbmUgY2hhcmFjdGVyIGlzIGFsbG93ZWQuJylcbiAgfVxuXG4gIC8vIG1vdmUgZHJhZ2dlZCBlbGVtIHRvIHRoZSBzZWxlY3RlZCBkcm9wIHRhcmdldFxuICBpZiAoIWhhc1NlbGVjdGVkJiYoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbGFzc05hbWUgPT0gXCJkcm9wem9uZTJcIikge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSBcIlwiO1xuICAgIGRyYWdnZWQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggZHJhZ2dlZCApO1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmFwcGVuZENoaWxkKCBkcmFnZ2VkICk7XG4gICAgY29uc3QgY2hhcmFjdGVyPWRyYWdnZWQuZ2V0QXR0cmlidXRlKCdrZXknKTtcbiAgICBjb25zb2xlLmxvZyhgaGVsbG9lICR7Y2hhcmFjdGVyfWApO1xuICAgIGdhbWVTdG9yYWdlLnNldCgncGxheWVyMU5hbWUnLGAke2NoYXJhY3Rlcn1gKTtcbiAgICBoYXNTZWxlY3RlZD10cnVlO1xuICB9XG5cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTmFtZSA9PSBcImRyb3B6b25lMVwiKSB7XG4gICAgaGFzU2VsZWN0ZWQ9ZmFsc2U7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9IFwiXCI7XG4gICAgZHJhZ2dlZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCBkcmFnZ2VkICk7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuYXBwZW5kQ2hpbGQoIGRyYWdnZWQgKTtcbiAgfVxufSwgZmFsc2UpOyIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCb2FyZChjb250YWluZXI6IEhUTUxEaXZFbGVtZW50KTogdm9pZCB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDw9IDMwOyBpKyspIHtcbiAgICBjb25zdCB0aWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGlsZS5jbGFzc05hbWUgPSBgdGlsZSB0aWxlLWluZGV4LSR7aX1gO1xuXG4gICAgdGlsZS5zZXRBdHRyaWJ1dGUoJ3RpbGUtaW5kZXgnLCBgJHtpfWApO1xuXG4gICAgaWYgKGkgJSAyICE9PSAwKSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdicm93bic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICB9XG5cbiAgICBpZiAoaSA9PSA0KSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2UnO1xuICAgIH1cbiAgICBpZiAoaSA9PSA3KSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2UnO1xuICAgIH1cbiAgICBpZiAoaSA9PSAxMykge1xuICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnb3JhbmdlJztcbiAgICB9XG4gICAgaWYgKGkgPT0gMTYpIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZSc7XG4gICAgfVxuICAgIGlmIChpID09IDIzKSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2UnO1xuICAgIH1cblxuICAgIGlmIChpID09IDI5KSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2UnO1xuICAgIH1cblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aWxlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY2hhcmFjdGVyTGlzdCB9IGZyb20gJy4vdXRpbC9jb250YWluZXJzJztcbmltcG9ydCB7IFJlc3BvbnNlT2JqVHlwZXMgfSBmcm9tICcuL3V0aWwvdHlwZXMnO1xuXG5jb25zdCBCQVNFX1VSTDogc3RyaW5nID0gJ2h0dHBzOi8vd3d3LmFuYXBpb2ZpY2VhbmRmaXJlLmNvbS9hcGkvY2hhcmFjdGVycy8nO1xuXG5hc3luYyBmdW5jdGlvbiBzaG93Q2hhcmFjdGVyKGNoYXJhY3Rlck5hbWU6IG51bWJlcikge1xuICBjb25zdCB1cmwgPSBgJHtCQVNFX1VSTH0ke2NoYXJhY3Rlck5hbWV9YDtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICBjb25zdCBkYXRhOiBSZXNwb25zZU9ialR5cGVzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgY29uc3QgY29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29tcG9uZW50LnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcbiAgICBjb21wb25lbnQuc2V0QXR0cmlidXRlKCdrZXknLGAke2RhdGEubmFtZX1gKTtcbiAgICBjb21wb25lbnQuaW5uZXJIVE1MID0gYCA8aDQ+JHtkYXRhLm5hbWV9PC9oND48cD4ke2RhdGEuYm9ybn08L3A+YDtcblxuICAgIGNoYXJhY3Rlckxpc3QuYXBwZW5kKGNvbXBvbmVudCk7XG5cbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2hvd0NoYXJhY3RlcjtcbiIsImV4cG9ydCBjb25zdCBTYW13ZWxsOiBudW1iZXIgPSA5NTQ7XG5leHBvcnQgY29uc3QgSm9uOiBudW1iZXIgPSA1ODM7XG5leHBvcnQgY29uc3QgQ2Vyc2VpOiBudW1iZXIgPSAyMzg7XG5leHBvcnQgY29uc3QgVHlyaW9uOiBudW1iZXIgPSAxMDUyO1xuZXhwb3J0IGNvbnN0IFNhbnNhOiBudW1iZXIgPSA5NTc7XG4iLCJleHBvcnQgY29uc3QgYm9hcmQ6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVCb2FyZCcpO1xuZXhwb3J0IGNvbnN0IGRpY2VDb250YWluZXI6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpY2VJbWFnZScpO1xuZXhwb3J0IGNvbnN0IGNoYXJhY3Rlckxpc3Q6SFRNTERpdkVsZW1lbnQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wem9uZTEnKTtcbmV4cG9ydCBjb25zdCBzdGFydFRpbGU6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGlsZS1pbmRleC0xJyk7XG4iLCJjb25zdCBkaWNlSWNvbnMgPSB7XG4gIHBvaW50MTpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3pNMjU2IDIwNmE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHpcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50MjpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTMxNi45NyAzNi4wM0E1MCA1MCAwIDAgMSA0NDAgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0tMjY4IDI2OEE1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQzOlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptMzE2Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6TTI1NiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6TTEyMy40NyAzNDAuMDNBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50NDpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTQ4Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDE3MiAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bS0yNjggMjY4QTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDU6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem00OC45NyAzNi4wM0E1MCA1MCAwIDAgMSAxNzIgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3ek0yNTYgMjA2YTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwek0xMjMuNDcgMzQwLjAzQTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDY6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem00OC45NyAzNi4wM0E1MCA1MCAwIDAgMSAxNzIgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3ek0xMjIgMjA2YTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwem0yNjggMGE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHpNMTIzLjQ3IDM0MC4wM0E1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBkaWNlQXJyYXk6IHN0cmluZ1tdID0gW1xuICBkaWNlSWNvbnMucG9pbnQxLFxuICBkaWNlSWNvbnMucG9pbnQyLFxuICBkaWNlSWNvbnMucG9pbnQzLFxuICBkaWNlSWNvbnMucG9pbnQ0LFxuICBkaWNlSWNvbnMucG9pbnQ1LFxuICBkaWNlSWNvbnMucG9pbnQ2LFxuXTtcbiIsImNsYXNzIFN0b3JhZ2Uge1xuICBwcml2YXRlIHN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICB9XG5cbiAgZ2V0KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgfVxuXG4gIGRlbGV0ZShrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gIH1cblxuICBzZXRTZXJpYWxpemUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNldChrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gIH1cblxuICBnZXRVbnNlcmlhbGl6ZTxUPihrZXk6IHN0cmluZyk6IFQge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmdldChrZXkpO1xuXG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKSBhcyBUO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0b3JhZ2U7XG4iXX0=
