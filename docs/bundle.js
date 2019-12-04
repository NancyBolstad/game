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
        var board_1 = require('./scripts/board');
        var handleDrag_1 = require('./scripts/handleDrag');
        var handleSelection_1 = require('./scripts/handleSelection');
        var rollDice_1 = require('./scripts/rollDice');
        var showCharacter_1 = require('./scripts/showCharacter');
        var characters_1 = require('./scripts/util/characters');
        var containers_1 = require('./scripts/util/containers');
        var dice_1 = require('./scripts/util/dice');
        var storage_1 = require('./scripts/util/storage');
        exports.gameStorage = new storage_1.default();
        if (containers_1.characterList != null) {
          showCharacter_1.default(characters_1.default);
          handleDrag_1.default();
        }
        if (containers_1.board != null) {
          board_1.createBoard(containers_1.board);
          playGame();
        }
        var defaultIndex = Math.floor(Math.random() * 6) + 1;
        if (containers_1.diceContainer != null) showDiceResult();
        if (containers_1.startTile != null)
          containers_1.startTile.innerHTML = dice_1.diceArray[defaultIndex - 1];
        if (containers_1.validateSelectionBtn != null)
          containers_1.validateSelectionBtn.addEventListener(
            'click',
            handleSelection_1.handleSelection,
            false,
          );
        if (containers_1.player1Btn)
          containers_1.player1Btn.addEventListener('click', showDiceResult, false);
        if (containers_1.player2Btn)
          containers_1.player2Btn.addEventListener('click', showDiceResult, false);
        function showDiceResult() {
          console.log(99999999999999);
          var defaultIndex = Math.floor(Math.random() * 6) + 1;
          containers_1.diceContainer.innerHTML = dice_1.diceArray[defaultIndex - 1];
        }
        function playGame() {
          var isPlaying = true;
          var player1Status = 1;
          var player2Status = 1;
          while (isPlaying) {
            runPlayer1Turn();
            runPlayer2Turn();
          }
          function runPlayer1Turn() {
            var currentDicePoint = rollDice_1.rollDice();
            console.log('Player 1 rolled: ' + currentDicePoint);
            if (currentDicePoint === 6) {
              player1Status += currentDicePoint;
              updatePlayer1Status();
              console.log('Since you rolled 6, you got a Bonus movement');
              runPlayer1Turn();
            } else {
              player1Status += currentDicePoint;
              updatePlayer1Status();
            }
            console.log('player1Status:' + player1Status);
            console.log('player2Status:' + player2Status);
            if (player1Status >= 30) {
              console.log('Player 1 winner');
              isPlaying = false;
              return null;
            }
          }
          function runPlayer2Turn() {
            var currentDicePoint = rollDice_1.rollDice();
            console.log('Player 2 rolled: ' + currentDicePoint);
            if (currentDicePoint === 6) {
              player2Status += currentDicePoint;
              updatePlayer2Status();
              console.log('Since you rolled 6, you got a Bonus movement');
              runPlayer2Turn();
            } else {
              player2Status += currentDicePoint;
              updatePlayer2Status();
            }
            console.log('player1Status:' + player1Status);
            console.log('player2Status:' + player2Status);
            if (player2Status >= 30) {
              console.log('Player 2 winner');
              isPlaying = false;
              return null;
            }
          }
          function updatePlayer2Status() {
            switch (player2Status) {
              case board_1.trap1:
                player2Status -= 1;
                console.log('Trap 1: move back 1 steps >>>Current player 2: ' + player2Status);
                break;
              case board_1.trap2:
                player2Status -= 2;
                console.log('Trap 2: move back 2 steps >>>Current player 2: ' + player2Status);
                break;
              case board_1.trap3:
                player2Status -= 3;
                console.log('Trap 3: move back 3 steps >>>Current player 2: ' + player2Status);
                break;
              case board_1.trap4:
                player2Status -= 4;
                console.log('Trap 4: move back 4 steps >>>Current player 2: ' + player2Status);
                break;
              case board_1.trap5:
                player2Status -= 5;
                console.log('Trap 5: move back 5 steps >>>Current player 2: ' + player2Status);
                break;
              case board_1.trap6:
                player2Status -= 6;
                console.log('Trap 6: move back 6 steps >>>Current player 2: ' + player2Status);
                break;
              default:
                console.log('Normal: >>>Current player 2: ' + player2Status);
                break;
            }
          }
          function updatePlayer1Status() {
            switch (player1Status) {
              case board_1.trap1:
                player1Status -= 1;
                console.log('Trap 1: move back 1 steps >>>Current player 1: ' + player1Status);
                break;
              case board_1.trap2:
                player1Status -= 2;
                console.log('Trap 2: move back 2 steps >>>Current player 1: ' + player1Status);
                break;
              case board_1.trap3:
                player1Status -= 3;
                console.log('Trap 3: move back 3 steps >>>Current player 1: ' + player1Status);
                break;
              case board_1.trap4:
                player1Status -= 4;
                console.log('Trap 4: move back 4 steps >>>Current player 1: ' + player1Status);
                break;
              case board_1.trap5:
                player1Status -= 5;
                console.log('Trap 5: move back 5 steps >>>Current player 1: ' + player1Status);
                break;
              case board_1.trap6:
                player1Status -= 6;
                console.log('Trap 6: move back 6 steps >>>Current player 1: ' + player1Status);
                break;
              default:
                console.log('Normal: >>>Current player 1: ' + player1Status);
                break;
            }
          }
        }
      },
      {
        './scripts/board': 2,
        './scripts/handleDrag': 3,
        './scripts/handleSelection': 4,
        './scripts/rollDice': 5,
        './scripts/showCharacter': 6,
        './scripts/util/characters': 7,
        './scripts/util/containers': 8,
        './scripts/util/dice': 9,
        './scripts/util/storage': 11,
      },
    ],
    2: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.trap1 = 4;
        exports.trap2 = 7;
        exports.trap3 = 13;
        exports.trap4 = 16;
        exports.trap5 = 23;
        exports.trap6 = 29;
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
        Object.defineProperty(exports, '__esModule', { value: true });
        var index_1 = require('../index');
        var dragged;
        function handleDragStart(event) {
          dragged = event.target;
          event.target.style.opacity = '0.5';
        }
        function handleDragEnd(event) {
          event.target.style.opacity = '';
        }
        function handleDragOver(event) {
          event.preventDefault();
        }
        function handleDragEnter(event) {
          if (event.target.id === 'startZone') {
            event.target.style.background = '#745625';
          }
          if (event.target.id === 'endZone1') {
            event.target.style.background = '#745625';
          }
          if (event.target.id === 'endZone2') {
            event.target.style.background = '#745625';
          }
        }
        function handleDragLeave(event) {
          if (event.target.id === 'startZone') {
            event.target.style.background = '';
          }
          if (event.target.id === 'endZone1') {
            event.target.style.background = '';
          }
          if (event.target.id === 'endZone2') {
            event.target.style.background = '';
          }
        }
        function handleDrop(event) {
          event.preventDefault();
          if (event.target.id == 'endZone1') {
            if (event.target.hasChildNodes()) {
              alert('Only one character is allowed.');
              event.target.style.background = '';
              return null;
            }
            event.target.style.background = '';
            dragged.parentNode.removeChild(dragged);
            event.target.appendChild(dragged);
            index_1.gameStorage.set('player1Name', '' + dragged.getAttribute('key'));
          }
          if (event.target.id == 'endZone2') {
            if (event.target.hasChildNodes()) {
              alert('Only one character is allowed.');
              event.target.style.background = '';
              return null;
            }
            event.target.style.background = '';
            dragged.parentNode.removeChild(dragged);
            event.target.appendChild(dragged);
            index_1.gameStorage.set('player2Name', '' + dragged.getAttribute('key'));
          }
          if (event.target.id == 'startZone') {
            event.target.style.background = '';
            dragged.parentNode.removeChild(dragged);
            event.target.appendChild(dragged);
            console.log(dragged);
          }
        }
        function handleDrag() {
          document.addEventListener('dragstart', handleDragStart);
          document.addEventListener('dragend', handleDragEnd);
          document.addEventListener('dragover', handleDragOver);
          document.addEventListener('dragenter', handleDragEnter);
          document.addEventListener('dragleave', handleDragLeave);
          document.addEventListener('drop', handleDrop);
        }
        exports.default = handleDrag;
      },
      { '../index': 1 },
    ],
    4: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var containers_1 = require('./util/containers');
        var hasSelected_1 = require('./util/hasSelected');
        function handleSelection() {
          var hasPlayer1Selected = hasSelected_1.hasSelected(containers_1.player1Selection);
          var hasPlayer2Selected = hasSelected_1.hasSelected(containers_1.player2Selection);
          if (hasPlayer1Selected && hasPlayer2Selected) {
            window.location.href = 'game.html';
          } else {
            alert('Select character first, then start the game');
          }
        }
        exports.handleSelection = handleSelection;
      },
      { './util/containers': 8, './util/hasSelected': 10 },
    ],
    5: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var dice_1 = require('./util/dice');
        exports.diceNumber = function() {
          return Math.floor(Math.random() * 6);
        };
        function rollDice() {
          return Math.floor(Math.random() * 6) + 1;
        }
        exports.rollDice = rollDice;
        function createDiceIcon(dicePoint) {
          return dice_1.diceArray[dicePoint + 1];
        }
        exports.createDiceIcon = createDiceIcon;
      },
      { './util/dice': 9 },
    ],
    6: [
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
                  step(generator['throw'](value));
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
        var dice_1 = require('./util/dice');
        var BASE_URL = 'https://www.anapioficeandfire.com/api/characters/';
        function getCharacterCards(characters) {
          characters.map(function(element) {
            showCharacter(element);
          });
        }
        function showCharacter(characterName) {
          return __awaiter(this, void 0, void 0, function() {
            var url, response, data, component, cardTitle, cardSubTitle, err_1;
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
                  component.className = 'card';
                  component.setAttribute('draggable', 'true');
                  component.setAttribute('key', '' + data.name);
                  cardTitle = ' <h3>' + data.name + '</h3>';
                  cardSubTitle = '<p>' + data.titles[0] + '</p>';
                  component.innerHTML = cardTitle + dice_1.diceIcons.point1 + cardSubTitle;
                  containers_1.characterList.append(component);
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
        exports.default = getCharacterCards;
      },
      { './util/containers': 8, './util/dice': 9 },
    ],
    7: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var Samwell = 954;
        var Jon = 583;
        var Cersei = 238;
        var Tyrion = 1052;
        var Sansa = 957;
        var characters = [Samwell, Jon, Cersei, Tyrion, Sansa];
        exports.default = characters;
      },
      {},
    ],
    8: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.characterList = document.querySelector('.cards');
        exports.player1Selection = document.getElementById('endZone1');
        exports.player2Selection = document.getElementById('endZone2');
        exports.validateSelectionBtn = document.querySelector('.cta--validation');
        exports.board = document.querySelector('.gameBoard');
        exports.diceContainer = document.getElementById('diceImage');
        exports.startTile = document.querySelector('tile-index-1');
        exports.player1Btn = document.querySelector('.btn-Player1');
        exports.player2Btn = document.querySelector('.btn-Player2');
      },
      {},
    ],
    9: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.diceIcons = {
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
          exports.diceIcons.point1,
          exports.diceIcons.point2,
          exports.diceIcons.point3,
          exports.diceIcons.point4,
          exports.diceIcons.point5,
          exports.diceIcons.point6,
        ];
      },
      {},
    ],
    10: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        function hasSelected(container) {
          return container.hasChildNodes();
        }
        exports.hasSelected = hasSelected;
      },
      {},
    ],
    11: [
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXgudHMiLCJzcmMvc2NyaXB0cy9ib2FyZC50cyIsInNyYy9zY3JpcHRzL2hhbmRsZURyYWcudHMiLCJzcmMvc2NyaXB0cy9oYW5kbGVTZWxlY3Rpb24udHMiLCJzcmMvc2NyaXB0cy9yb2xsRGljZS50cyIsInNyYy9zY3JpcHRzL3Nob3dDaGFyYWN0ZXIudHMiLCJzcmMvc2NyaXB0cy91dGlsL2NoYXJhY3RlcnMudHMiLCJzcmMvc2NyaXB0cy91dGlsL2NvbnRhaW5lcnMudHMiLCJzcmMvc2NyaXB0cy91dGlsL2RpY2UudHMiLCJzcmMvc2NyaXB0cy91dGlsL2hhc1NlbGVjdGVkLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9zdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSx5Q0FBd0Y7QUFDeEYsbURBQThDO0FBQzlDLDZEQUE0RDtBQUM1RCwrQ0FBOEM7QUFDOUMseURBQXdEO0FBQ3hELHdEQUFtRDtBQUNuRCx3REFRbUM7QUFDbkMsNENBQWdEO0FBQ2hELGtEQUE2QztBQUVoQyxRQUFBLFdBQVcsR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztBQUV6QyxJQUFJLDBCQUFhLElBQUksSUFBSSxFQUFFO0lBQ3pCLHVCQUFpQixDQUFDLG9CQUFVLENBQUMsQ0FBQztJQUM5QixvQkFBVSxFQUFFLENBQUM7Q0FDZDtBQUNELElBQUksa0JBQUssSUFBSSxJQUFJLEVBQUU7SUFDakIsbUJBQVcsQ0FBQyxrQkFBSyxDQUFDLENBQUM7SUFDbkIsUUFBUSxFQUFFLENBQUM7Q0FDWjtBQUVELElBQU0sWUFBWSxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUUvRCxJQUFJLDBCQUFhLElBQUksSUFBSTtJQUFFLGNBQWMsRUFBRSxDQUFDO0FBRTVDLElBQUksc0JB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QUFTLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDbkMsQ0FBQztBQUZELGtDQUVDOzs7OztBQ0ZEO0lBQUE7UUFDVSxZQUFPLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztJQTJCeEMsQ0FBQztJQXpCQyxxQkFBRyxHQUFILFVBQUksR0FBVyxFQUFFLEtBQWE7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxxQkFBRyxHQUFILFVBQUksR0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELHdCQUFNLEdBQU4sVUFBTyxHQUFXO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCw4QkFBWSxHQUFaLFVBQWEsR0FBVyxFQUFFLEtBQVU7UUFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxnQ0FBYyxHQUFkLFVBQWtCLEdBQVc7UUFDM0IsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUzQixJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQU0sQ0FBQztJQUMvQixDQUFDO0lBQ0gsY0FBQztBQUFELENBNUJBLEFBNEJDLElBQUE7QUFFRCxrQkFBZSxPQUFPLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBjcmVhdGVCb2FyZCwgdHJhcDEsIHRyYXAyLCB0cmFwMywgdHJhcDQsIHRyYXA1LCB0cmFwNiB9IGZyb20gJy4vc2NyaXB0cy9ib2FyZCc7XG5pbXBvcnQgaGFuZGxlRHJhZyBmcm9tICcuL3NjcmlwdHMvaGFuZGxlRHJhZyc7XG5pbXBvcnQgeyBoYW5kbGVTZWxlY3Rpb24gfSBmcm9tICcuL3NjcmlwdHMvaGFuZGxlU2VsZWN0aW9uJztcbmltcG9ydCB7IHJvbGxEaWNlIH0gZnJvbSAnLi9zY3JpcHRzL3JvbGxEaWNlJztcbmltcG9ydCBnZXRDaGFyYWN0ZXJDYXJkcyBmcm9tICcuL3NjcmlwdHMvc2hvd0NoYXJhY3Rlcic7XG5pbXBvcnQgY2hhcmFjdGVycyBmcm9tICcuL3NjcmlwdHMvdXRpbC9jaGFyYWN0ZXJzJztcbmltcG9ydCB7XG4gIGJvYXJkLFxuICBjaGFyYWN0ZXJMaXN0LFxuICBkaWNlQ29udGFpbmVyLFxuICBzdGFydFRpbGUsXG4gIHZhbGlkYXRlU2VsZWN0aW9uQnRuLFxuICBwbGF5ZXIxQnRuLFxuICBwbGF5ZXIyQnRuLFxufSBmcm9tICcuL3NjcmlwdHMvdXRpbC9jb250YWluZXJzJztcbmltcG9ydCB7IGRpY2VBcnJheSB9IGZyb20gJy4vc2NyaXB0cy91dGlsL2RpY2UnO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9zY3JpcHRzL3V0aWwvc3RvcmFnZSc7XG5cbmV4cG9ydCBjb25zdCBnYW1lU3RvcmFnZSA9IG5ldyBTdG9yYWdlKCk7XG5cbmlmIChjaGFyYWN0ZXJMaXN0ICE9IG51bGwpIHtcbiAgZ2V0Q2hhcmFjdGVyQ2FyZHMoY2hhcmFjdGVycyk7XG4gIGhhbmRsZURyYWcoKTtcbn1cbmlmIChib2FyZCAhPSBudWxsKSB7XG4gIGNyZWF0ZUJvYXJkKGJvYXJkKTtcbiAgcGxheUdhbWUoKTtcbn1cblxuY29uc3QgZGVmYXVsdEluZGV4OiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSArIDE7XG5cbmlmIChkaWNlQ29udGFpbmVyICE9IG51bGwpIHNob3dEaWNlUmVzdWx0KCk7XG5cbmlmIChzdGFydFRpbGUgIT0gbnVsbCkgc3RhcnRUaWxlLmlubmVySFRNTCA9IGRpY2VBcnJheVtkZWZhdWx0SW5kZXggLSAxXTtcblxuaWYgKHZhbGlkYXRlU2VsZWN0aW9uQnRuICE9IG51bGwpXG4gIHZhbGlkYXRlU2VsZWN0aW9uQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlU2VsZWN0aW9uLCBmYWxzZSk7XG5cbmlmIChwbGF5ZXIxQnRuKSBwbGF5ZXIxQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0RpY2VSZXN1bHQsIGZhbHNlKTtcbmlmIChwbGF5ZXIyQnRuKSBwbGF5ZXIyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0RpY2VSZXN1bHQsIGZhbHNlKTtcblxuZnVuY3Rpb24gc2hvd0RpY2VSZXN1bHQoKSB7XG4gIGNvbnNvbGUubG9nKDk5OTk5OTk5OTk5OTk5KTtcbiAgY29uc3QgZGVmYXVsdEluZGV4OiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSArIDE7XG4gIGRpY2VDb250YWluZXIuaW5uZXJIVE1MID0gZGljZUFycmF5W2RlZmF1bHRJbmRleCAtIDFdO1xufVxuXG5mdW5jdGlvbiBwbGF5R2FtZSgpIHtcbiAgbGV0IGlzUGxheWluZzogYm9vbGVhbiA9IHRydWU7XG4gIGxldCBwbGF5ZXIxU3RhdHVzOiBudW1iZXIgPSAxO1xuICBsZXQgcGxheWVyMlN0YXR1czogbnVtYmVyID0gMTtcblxuICB3aGlsZSAoaXNQbGF5aW5nKSB7XG4gICAgcnVuUGxheWVyMVR1cm4oKTtcbiAgICBydW5QbGF5ZXIyVHVybigpO1xuICB9XG5cbiAgZnVuY3Rpb24gcnVuUGxheWVyMVR1cm4oKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudERpY2VQb2ludCA9IHJvbGxEaWNlKCk7XG4gICAgY29uc29sZS5sb2coYFBsYXllciAxIHJvbGxlZDogJHtjdXJyZW50RGljZVBvaW50fWApO1xuXG4gICAgaWYgKGN1cnJlbnREaWNlUG9pbnQgPT09IDYpIHtcbiAgICAgIHBsYXllcjFTdGF0dXMgKz0gY3VycmVudERpY2VQb2ludDsgLy91cGRhdGVcbiAgICAgIHVwZGF0ZVBsYXllcjFTdGF0dXMoKTsgLy9jaGVja1VwZGF0ZVxuICAgICAgY29uc29sZS5sb2coJ1NpbmNlIHlvdSByb2xsZWQgNiwgeW91IGdvdCBhIEJvbnVzIG1vdmVtZW50Jyk7XG4gICAgICBydW5QbGF5ZXIxVHVybigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwbGF5ZXIxU3RhdHVzICs9IGN1cnJlbnREaWNlUG9pbnQ7XG4gICAgICB1cGRhdGVQbGF5ZXIxU3RhdHVzKCk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGBwbGF5ZXIxU3RhdHVzOiR7cGxheWVyMVN0YXR1c31gKTtcbiAgICBjb25zb2xlLmxvZyhgcGxheWVyMlN0YXR1czoke3BsYXllcjJTdGF0dXN9YCk7XG5cbiAgICBpZiAocGxheWVyMVN0YXR1cyA+PSAzMCkge1xuICAgICAgY29uc29sZS5sb2coJ1BsYXllciAxIHdpbm5lcicpO1xuICAgICAgaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBydW5QbGF5ZXIyVHVybigpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50RGljZVBvaW50ID0gcm9sbERpY2UoKTtcbiAgICBjb25zb2xlLmxvZyhgUGxheWVyIDIgcm9sbGVkOiAke2N1cnJlbnREaWNlUG9pbnR9YCk7XG5cbiAgICBpZiAoY3VycmVudERpY2VQb2ludCA9PT0gNikge1xuICAgICAgcGxheWVyMlN0YXR1cyArPSBjdXJyZW50RGljZVBvaW50O1xuICAgICAgdXBkYXRlUGxheWVyMlN0YXR1cygpO1xuICAgICAgY29uc29sZS5sb2coJ1NpbmNlIHlvdSByb2xsZWQgNiwgeW91IGdvdCBhIEJvbnVzIG1vdmVtZW50Jyk7XG4gICAgICBydW5QbGF5ZXIyVHVybigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwbGF5ZXIyU3RhdHVzICs9IGN1cnJlbnREaWNlUG9pbnQ7XG4gICAgICB1cGRhdGVQbGF5ZXIyU3RhdHVzKCk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGBwbGF5ZXIxU3RhdHVzOiR7cGxheWVyMVN0YXR1c31gKTtcbiAgICBjb25zb2xlLmxvZyhgcGxheWVyMlN0YXR1czoke3BsYXllcjJTdGF0dXN9YCk7XG5cbiAgICBpZiAocGxheWVyMlN0YXR1cyA+PSAzMCkge1xuICAgICAgY29uc29sZS5sb2coJ1BsYXllciAyIHdpbm5lcicpO1xuICAgICAgaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQbGF5ZXIyU3RhdHVzKCkge1xuICAgIHN3aXRjaCAocGxheWVyMlN0YXR1cykge1xuICAgICAgY2FzZSB0cmFwMTpcbiAgICAgICAgcGxheWVyMlN0YXR1cyAtPSAxO1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCAxOiBtb3ZlIGJhY2sgMSBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAyOiAke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cmFwMjpcbiAgICAgICAgcGxheWVyMlN0YXR1cyAtPSAyO1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCAyOiBtb3ZlIGJhY2sgMiBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAyOiAke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cmFwMzpcbiAgICAgICAgcGxheWVyMlN0YXR1cyAtPSAzO1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCAzOiBtb3ZlIGJhY2sgMyBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAyOiAke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cmFwNDpcbiAgICAgICAgcGxheWVyMlN0YXR1cyAtPSA0O1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCA0OiBtb3ZlIGJhY2sgNCBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAyOiAke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cmFwNTpcbiAgICAgICAgcGxheWVyMlN0YXR1cyAtPSA1O1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCA1OiBtb3ZlIGJhY2sgNSBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAyOiAke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cmFwNjpcbiAgICAgICAgcGxheWVyMlN0YXR1cyAtPSA2O1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCA2OiBtb3ZlIGJhY2sgNiBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAyOiAke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coYE5vcm1hbDogPj4+Q3VycmVudCBwbGF5ZXIgMjogJHtwbGF5ZXIyU3RhdHVzfWApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQbGF5ZXIxU3RhdHVzKCkge1xuICAgIHN3aXRjaCAocGxheWVyMVN0YXR1cykge1xuICAgICAgY2FzZSB0cmFwMTpcbiAgICAgICAgcGxheWVyMVN0YXR1cyAtPSAxO1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCAxOiBtb3ZlIGJhY2sgMSBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAxOiAke3BsYXllcjFTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cmFwMjpcbiAgICAgICAgcGxheWVyMVN0YXR1cyAtPSAyO1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCAyOiBtb3ZlIGJhY2sgMiBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAxOiAke3BsYXllcjFTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cmFwMzpcbiAgICAgICAgcGxheWVyMVN0YXR1cyAtPSAzO1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCAzOiBtb3ZlIGJhY2sgMyBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAxOiAke3BsYXllcjFTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cmFwNDpcbiAgICAgICAgcGxheWVyMVN0YXR1cyAtPSA0O1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCA0OiBtb3ZlIGJhY2sgNCBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAxOiAke3BsYXllcjFTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cmFwNTpcbiAgICAgICAgcGxheWVyMVN0YXR1cyAtPSA1O1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCA1OiBtb3ZlIGJhY2sgNSBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAxOiAke3BsYXllcjFTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cmFwNjpcbiAgICAgICAgcGxheWVyMVN0YXR1cyAtPSA2O1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCA2OiBtb3ZlIGJhY2sgNiBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAxOiAke3BsYXllcjFTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coYE5vcm1hbDogPj4+Q3VycmVudCBwbGF5ZXIgMTogJHtwbGF5ZXIxU3RhdHVzfWApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCB0cmFwMTogbnVtYmVyID0gNDtcbmV4cG9ydCBjb25zdCB0cmFwMjogbnVtYmVyID0gNztcbmV4cG9ydCBjb25zdCB0cmFwMzogbnVtYmVyID0gMTM7XG5leHBvcnQgY29uc3QgdHJhcDQ6IG51bWJlciA9IDE2O1xuZXhwb3J0IGNvbnN0IHRyYXA1OiBudW1iZXIgPSAyMztcbmV4cG9ydCBjb25zdCB0cmFwNjogbnVtYmVyID0gMjk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCb2FyZChjb250YWluZXI6IEhUTUxEaXZFbGVtZW50KTogdm9pZCB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDw9IDMwOyBpKyspIHtcbiAgICBjb25zdCB0aWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGlsZS5jbGFzc05hbWUgPSBgdGlsZSB0aWxlLWluZGV4LSR7aX1gO1xuXG4gICAgdGlsZS5zZXRBdHRyaWJ1dGUoJ3RpbGUtaW5kZXgnLCBgJHtpfWApO1xuXG4gICAgaWYgKGkgJSAyICE9PSAwKSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdicm93bic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICB9XG5cbiAgICBpZiAoaSA9PSA0KSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2UnO1xuICAgIH1cbiAgICBpZiAoaSA9PSA3KSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2UnO1xuICAgIH1cbiAgICBpZiAoaSA9PSAxMykge1xuICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnb3JhbmdlJztcbiAgICB9XG4gICAgaWYgKGkgPT0gMTYpIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZSc7XG4gICAgfVxuICAgIGlmIChpID09IDIzKSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2UnO1xuICAgIH1cblxuICAgIGlmIChpID09IDI5KSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2UnO1xuICAgIH1cblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aWxlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2FtZVN0b3JhZ2UgfSBmcm9tICcuLi9pbmRleCc7XG5sZXQgZHJhZ2dlZDogSFRNTEVsZW1lbnQ7XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWdTdGFydChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIGRyYWdnZWQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLm9wYWNpdHkgPSAnMC41Jztcbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhZ0VuZChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLm9wYWNpdHkgPSAnJztcbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhZ092ZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmFnRW50ZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdzdGFydFpvbmUnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcjNzQ1NjI1JztcbiAgfVxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdlbmRab25lMScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyM3NDU2MjUnO1xuICB9XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ2VuZFpvbmUyJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnIzc0NTYyNSc7XG4gIH1cbn1cbmZ1bmN0aW9uIGhhbmRsZURyYWdMZWF2ZShldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ3N0YXJ0Wm9uZScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gIH1cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnZW5kWm9uZTEnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICB9XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ2VuZFpvbmUyJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVEcm9wKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgLy8gcHJldmVudCBkZWZhdWx0IGFjdGlvbiAob3BlbiBhcyBsaW5rIGZvciBzb21lIGVsZW1lbnRzKVxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIC8vIG1vdmUgZHJhZ2dlZCBlbGVtIHRvIHRoZSBzZWxlY3RlZCBkcm9wIHRhcmdldFxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT0gJ2VuZFpvbmUxJykge1xuICAgIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIGFsZXJ0KCdPbmx5IG9uZSBjaGFyYWN0ZXIgaXMgYWxsb3dlZC4nKTtcbiAgICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgZHJhZ2dlZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRyYWdnZWQpO1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgIGdhbWVTdG9yYWdlLnNldCgncGxheWVyMU5hbWUnLCBgJHtkcmFnZ2VkLmdldEF0dHJpYnV0ZSgna2V5Jyl9YCk7XG4gIH1cblxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT0gJ2VuZFpvbmUyJykge1xuICAgIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIGFsZXJ0KCdPbmx5IG9uZSBjaGFyYWN0ZXIgaXMgYWxsb3dlZC4nKTtcbiAgICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgZHJhZ2dlZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRyYWdnZWQpO1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgIGdhbWVTdG9yYWdlLnNldCgncGxheWVyMk5hbWUnLCBgJHtkcmFnZ2VkLmdldEF0dHJpYnV0ZSgna2V5Jyl9YCk7XG4gIH1cblxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT0gJ3N0YXJ0Wm9uZScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgZHJhZ2dlZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRyYWdnZWQpO1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgIGNvbnNvbGUubG9nKGRyYWdnZWQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWcoKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGhhbmRsZURyYWdTdGFydCk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBoYW5kbGVEcmFnRW5kKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBoYW5kbGVEcmFnT3Zlcik7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGhhbmRsZURyYWdFbnRlcik7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGhhbmRsZURyYWdMZWF2ZSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBoYW5kbGVEcm9wKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlRHJhZztcbiIsImltcG9ydCB7IHBsYXllcjFTZWxlY3Rpb24sIHBsYXllcjJTZWxlY3Rpb24gfSBmcm9tICcuL3V0aWwvY29udGFpbmVycyc7XG5pbXBvcnQgeyBoYXNTZWxlY3RlZCB9IGZyb20gJy4vdXRpbC9oYXNTZWxlY3RlZCc7XG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU2VsZWN0aW9uKCk6IHZvaWQge1xuICBjb25zdCBoYXNQbGF5ZXIxU2VsZWN0ZWQgPSBoYXNTZWxlY3RlZChwbGF5ZXIxU2VsZWN0aW9uKTtcbiAgY29uc3QgaGFzUGxheWVyMlNlbGVjdGVkID0gaGFzU2VsZWN0ZWQocGxheWVyMlNlbGVjdGlvbik7XG4gIGlmIChoYXNQbGF5ZXIxU2VsZWN0ZWQgJiYgaGFzUGxheWVyMlNlbGVjdGVkKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnZ2FtZS5odG1sJztcbiAgfSBlbHNlIHtcbiAgICBhbGVydCgnU2VsZWN0IGNoYXJhY3RlciBmaXJzdCwgdGhlbiBzdGFydCB0aGUgZ2FtZScpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBkaWNlQXJyYXkgfSBmcm9tICcuL3V0aWwvZGljZSc7XG5cbmV4cG9ydCBjb25zdCBkaWNlTnVtYmVyID0gKCkgPT4ge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNik7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcm9sbERpY2UoKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpY2VJY29uKGRpY2VQb2ludDogbnVtYmVyKSB7XG4gIHJldHVybiBkaWNlQXJyYXlbZGljZVBvaW50ICsgMV07XG59XG4iLCJpbXBvcnQgeyBjaGFyYWN0ZXJMaXN0IH0gZnJvbSAnLi91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IHsgUmVzcG9uc2VPYmpUeXBlcyB9IGZyb20gJy4vdXRpbC90eXBlcyc7XG5pbXBvcnQgeyBkaWNlSWNvbnMgfSBmcm9tICcuL3V0aWwvZGljZSc7XG5cbmNvbnN0IEJBU0VfVVJMOiBzdHJpbmcgPSAnaHR0cHM6Ly93d3cuYW5hcGlvZmljZWFuZGZpcmUuY29tL2FwaS9jaGFyYWN0ZXJzLyc7XG5cbmZ1bmN0aW9uIGdldENoYXJhY3RlckNhcmRzKGNoYXJhY3RlcnM6IG51bWJlcltdKSB7XG4gIGNoYXJhY3RlcnMubWFwKGVsZW1lbnQgPT4ge1xuICAgIHNob3dDaGFyYWN0ZXIoZWxlbWVudCk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzaG93Q2hhcmFjdGVyKGNoYXJhY3Rlck5hbWU6IG51bWJlcikge1xuICBjb25zdCB1cmwgPSBgJHtCQVNFX1VSTH0ke2NoYXJhY3Rlck5hbWV9YDtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICBjb25zdCBkYXRhOiBSZXNwb25zZU9ialR5cGVzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXG4gICAgY29uc3QgY29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29tcG9uZW50LmNsYXNzTmFtZSA9ICdjYXJkJztcbiAgICBjb21wb25lbnQuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xuICAgIGNvbXBvbmVudC5zZXRBdHRyaWJ1dGUoJ2tleScsIGAke2RhdGEubmFtZX1gKTtcbiAgICBjb25zdCBjYXJkVGl0bGUgPSBgIDxoMz4ke2RhdGEubmFtZX08L2gzPmA7XG4gICAgY29uc3QgY2FyZFN1YlRpdGxlID0gYDxwPiR7ZGF0YS50aXRsZXNbMF19PC9wPmA7XG4gICAgY29tcG9uZW50LmlubmVySFRNTCA9IGNhcmRUaXRsZSArIGRpY2VJY29ucy5wb2ludDEgKyBjYXJkU3ViVGl0bGU7XG5cbiAgICBjaGFyYWN0ZXJMaXN0LmFwcGVuZChjb21wb25lbnQpO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRocm93IGVycjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRDaGFyYWN0ZXJDYXJkcztcbiIsImNvbnN0IFNhbXdlbGw6IG51bWJlciA9IDk1NDtcbmNvbnN0IEpvbjogbnVtYmVyID0gNTgzO1xuY29uc3QgQ2Vyc2VpOiBudW1iZXIgPSAyMzg7XG5jb25zdCBUeXJpb246IG51bWJlciA9IDEwNTI7XG5jb25zdCBTYW5zYTogbnVtYmVyID0gOTU3O1xuXG5sZXQgY2hhcmFjdGVyczogbnVtYmVyW10gPSBbU2Ftd2VsbCwgSm9uLCBDZXJzZWksIFR5cmlvbiwgU2Fuc2FdO1xuZXhwb3J0IGRlZmF1bHQgY2hhcmFjdGVycztcbiIsIi8vcGFnZTpzZWxlY3QtcGxheWVyXG5leHBvcnQgY29uc3QgY2hhcmFjdGVyTGlzdDogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZHMnKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXIxU2VsZWN0aW9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmRab25lMScpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjJTZWxlY3Rpb246IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZFpvbmUyJyk7XG5leHBvcnQgY29uc3QgdmFsaWRhdGVTZWxlY3Rpb25CdG46IEhUTUxBbmNob3JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN0YS0tdmFsaWRhdGlvbicpO1xuXG4vL3BhZ2U6Z2FtZVxuZXhwb3J0IGNvbnN0IGJvYXJkOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lQm9hcmQnKTtcbmV4cG9ydCBjb25zdCBkaWNlQ29udGFpbmVyOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWNlSW1hZ2UnKTtcbmV4cG9ydCBjb25zdCBzdGFydFRpbGU6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcigndGlsZS1pbmRleC0xJyk7XG5leHBvcnQgY29uc3QgcGxheWVyMUJ0bjpIVE1MQnV0dG9uRWxlbWVudD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLVBsYXllcjEnKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXIyQnRuOkhUTUxCdXR0b25FbGVtZW50PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tUGxheWVyMicpO1xuIiwiZXhwb3J0IGNvbnN0IGRpY2VJY29ucyA9IHtcbiAgcG9pbnQxOlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzek0yNTYgMjA2YTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwelwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQyOlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptMzE2Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bS0yNjggMjY4QTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDM6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem0zMTYuOTcgMzYuMDNBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pNMjU2IDIwNmE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHpNMTIzLjQ3IDM0MC4wM0E1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQ0OlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptNDguOTcgMzYuMDNBNTAgNTAgMCAwIDEgMTcyIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptLTI2OCAyNjhBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50NTpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTQ4Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDE3MiAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6TTI1NiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6TTEyMy40NyAzNDAuMDNBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50NjpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTQ4Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDE3MiAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6TTEyMiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6bTI2OCAwYTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwek0xMjMuNDcgMzQwLjAzQTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxufTtcblxuZXhwb3J0IGNvbnN0IGRpY2VBcnJheTogc3RyaW5nW10gPSBbXG4gIGRpY2VJY29ucy5wb2ludDEsXG4gIGRpY2VJY29ucy5wb2ludDIsXG4gIGRpY2VJY29ucy5wb2ludDMsXG4gIGRpY2VJY29ucy5wb2ludDQsXG4gIGRpY2VJY29ucy5wb2ludDUsXG4gIGRpY2VJY29ucy5wb2ludDYsXG5dO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGhhc1NlbGVjdGVkKGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgcmV0dXJuIGNvbnRhaW5lci5oYXNDaGlsZE5vZGVzKCk7XG59XG4iLCJjbGFzcyBTdG9yYWdlIHtcbiAgcHJpdmF0ZSBzdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcblxuICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgfVxuXG4gIGdldChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gIH1cblxuICBkZWxldGUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICB9XG5cbiAgc2V0U2VyaWFsaXplKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5zZXQoa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICB9XG5cbiAgZ2V0VW5zZXJpYWxpemU8VD4oa2V5OiBzdHJpbmcpOiBUIHtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5nZXQoa2V5KTtcblxuICAgIGlmICghZGF0YSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSkgYXMgVDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdG9yYWdlO1xuIl19
