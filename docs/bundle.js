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
        const storage_1 = require('./scripts/util/storage');
        const apiService_1 = require('./scripts/util/apiService');
        const gameStorage = new storage_1.default();
        let player1 = {
          selectedCharacter: 'one',
          isWinner: false,
          currentPosition: '',
        };
        let player2 = {
          selectedCharacter: 'two',
          isWinner: false,
          currentPosition: '',
        };
        gameStorage.set('player1', player1.selectedCharacter);
        gameStorage.set('player2', player2.selectedCharacter);
        apiService_1.default({ page: 1, pageSize: 10 });
      },
      { './scripts/util/apiService': 2, './scripts/util/storage': 3 },
    ],
    2: [
      function(require, module, exports) {
        'use strict';
        var __awaiter =
          (this && this.__awaiter) ||
          function(thisArg, _arguments, P, generator) {
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
                  step(generator.throw(value));
                } catch (e) {
                  reject(e);
                }
              }
              function step(result) {
                result.done
                  ? resolve(result.value)
                  : new P(function(resolve) {
                      resolve(result.value);
                    }).then(fulfilled, rejected);
              }
              step((generator = generator.apply(thisArg, _arguments)).next());
            });
          };
        const PAGE_SIZE = 10;
        const PAGE = 1;
        const BASE_URL = 'https://www.anapioficeandfire.com/api/characters?';
        function ApiService({ page, pageSize }) {
          return __awaiter(this, void 0, void 0, function*() {
            const url = `${BASE_URL}page=${page ? page : PAGE}&pageSize=${
              pageSize ? pageSize : PAGE_SIZE
            }`;
            try {
              const response = yield fetch(url);
              const data = yield response.json();
              console.log(111111);
              console.log(data);
              return data;
            } catch (err) {
              throw err;
            }
          });
        }
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.default = ApiService;
      },
      {},
    ],
    3: [
      function(require, module, exports) {
        'use strict';
        class Storage {
          constructor() {
            this.storage = window.localStorage;
          }
          set(key, value) {
            this.storage.setItem(key, value);
          }
          get(key) {
            return this.storage.getItem(key);
          }
          delete(key) {
            this.storage.removeItem(key);
          }
          setSerialize(key, value) {
            this.set(key, JSON.stringify(value));
          }
          getUnserialize(key) {
            const data = this.get(key);
            if (!data) {
              return null;
            }
            return JSON.parse(data);
          }
        }
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.default = Storage;
      },
      {},
    ],
  },
  {},
  [1],
);
