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
        var characterIndex_1 = require('./scripts/util/characterIndex');
        var containers_1 = require('./scripts/util/containers');
        var dice_1 = require('./scripts/util/dice');
        var storage_1 = require('./scripts/util/storage');
        exports.gameStorage = new storage_1.default();
        if (containers_1.characterList != null) {
          showCharacter_1.default(characterIndex_1.default);
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
        console.log(exports.gameStorage.get('player1Name'));
      },
      {
        './scripts/board': 2,
        './scripts/handleDrag': 3,
        './scripts/handleSelection': 4,
        './scripts/rollDice': 5,
        './scripts/showCharacter': 6,
        './scripts/util/characterIndex': 7,
        './scripts/util/containers': 8,
        './scripts/util/dice': 10,
        './scripts/util/storage': 12,
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
      { './util/containers': 8, './util/hasSelected': 11 },
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
      { './util/dice': 10 },
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
        var createImage_1 = require('./util/createImage');
        var BASE_URL = 'https://www.anapioficeandfire.com/api/characters/';
        function getCharacterCards(characterIndex) {
          characterIndex.map(function(element) {
            showCharacter(element);
          });
        }
        function showCharacter(characterNameIndex) {
          return __awaiter(this, void 0, void 0, function() {
            var url, response, data, component, cardImage, cardTitle, err_1;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  url = '' + BASE_URL + characterNameIndex;
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
                  component.setAttribute('key', '' + characterNameIndex);
                  cardImage =
                    '<img draggable="false" src=' +
                    createImage_1.default(characterNameIndex) +
                    ' class="card__image">';
                  cardTitle = ' <h3>' + data.name + '</h3>';
                  component.innerHTML = cardImage + cardTitle;
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
      { './util/containers': 8, './util/createImage': 9 },
    ],
    7: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var Samwell = 954;
        var Jon = 583;
        var Cersei = 238;
        var Tyrion = 1052;
        var Sansa = 271;
        var characterIndex = [Samwell, Jon, Cersei, Tyrion, Sansa];
        exports.default = characterIndex;
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
        function createImage(index) {
          return (
            'https://res.cloudinary.com/dnkfgmzy1/image/upload/v1575549674/game/' + index + '.png'
          );
        }
        exports.default = createImage;
      },
      {},
    ],
    10: [
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
    11: [
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
    12: [
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXgudHMiLCJzcmMvc2NyaXB0cy9ib2FyZC50cyIsInNyYy9zY3JpcHRzL2hhbmRsZURyYWcudHMiLCJzcmMvc2NyaXB0cy9oYW5kbGVTZWxlY3Rpb24udHMiLCJzcmMvc2NyaXB0cy9yb2xsRGljZS50cyIsInNyYy9zY3JpcHRzL3Nob3dDaGFyYWN0ZXIudHMiLCJzcmMvc2NyaXB0cy91dGlsL2NoYXJhY3RlckluZGV4LnRzIiwic3JjL3NjcmlwdHMvdXRpbC9jb250YWluZXJzLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9jcmVhdGVJbWFnZS50cyIsInNyYy9zY3JpcHRzL3V0aWwvZGljZS50cyIsInNyYy9zY3JpcHRzL3V0aWwvaGFzU2VsZWN0ZWQudHMiLCJzcmMvc2NyaXB0cy91dGlsL3N0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLHlDQUF3RjtBQUN4RixtREFBOEM7QUFDOUMsNkRBQTREO0FBQzVELCtDQUE4QztBQUM5Qyx5REFBd0Q7QUFDeEQsZ0VBQTJEO0FBQzNELHdEQVFtQztBQUNuQyw0Q0FBZ0Q7QUFDaEQsa0RBQTZDO0FBRWhDLFFBQUEsV0FBVyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO0FBRXpDLElBQUksMEJBQWEsSUFBSSxJQUFJLEVBQUU7SUFDekIsdUJBQWlCLENBQUMsd0JBQWMsQ0FBQyxDQUFDO0lBQ2xDLG9CQUFVLEVBQUUsQ0FBQztDQUNkO0FBQ0QsSUFBSSxrQkFBSyxJQUFJLElBQUksRUFBRTtJQUNqQixtQkFBVyxDQUFDLGtCQUFLLENBQUMsQ0FBQztJQUNuQixRQUFRLEVBQUUsQ0FBQztDQUNaO0FBRUQsSUFBTSxZQUFZLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRS9ELElBQUksMEJBQWEsSUFBSSxJ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ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgY3JlYXRlQm9hcmQsIHRyYXAxLCB0cmFwMiwgdHJhcDMsIHRyYXA0LCB0cmFwNSwgdHJhcDYgfSBmcm9tICcuL3NjcmlwdHMvYm9hcmQnO1xuaW1wb3J0IGhhbmRsZURyYWcgZnJvbSAnLi9zY3JpcHRzL2hhbmRsZURyYWcnO1xuaW1wb3J0IHsgaGFuZGxlU2VsZWN0aW9uIH0gZnJvbSAnLi9zY3JpcHRzL2hhbmRsZVNlbGVjdGlvbic7XG5pbXBvcnQgeyByb2xsRGljZSB9IGZyb20gJy4vc2NyaXB0cy9yb2xsRGljZSc7XG5pbXBvcnQgZ2V0Q2hhcmFjdGVyQ2FyZHMgZnJvbSAnLi9zY3JpcHRzL3Nob3dDaGFyYWN0ZXInO1xuaW1wb3J0IGNoYXJhY3RlckluZGV4IGZyb20gJy4vc2NyaXB0cy91dGlsL2NoYXJhY3RlckluZGV4JztcbmltcG9ydCB7XG4gIGJvYXJkLFxuICBjaGFyYWN0ZXJMaXN0LFxuICBkaWNlQ29udGFpbmVyLFxuICBzdGFydFRpbGUsXG4gIHZhbGlkYXRlU2VsZWN0aW9uQnRuLFxuICBwbGF5ZXIxQnRuLFxuICBwbGF5ZXIyQnRuLFxufSBmcm9tICcuL3NjcmlwdHMvdXRpbC9jb250YWluZXJzJztcbmltcG9ydCB7IGRpY2VBcnJheSB9IGZyb20gJy4vc2NyaXB0cy91dGlsL2RpY2UnO1xuaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9zY3JpcHRzL3V0aWwvc3RvcmFnZSc7XG5cbmV4cG9ydCBjb25zdCBnYW1lU3RvcmFnZSA9IG5ldyBTdG9yYWdlKCk7XG5cbmlmIChjaGFyYWN0ZXJMaXN0ICE9IG51bGwpIHtcbiAgZ2V0Q2hhcmFjdGVyQ2FyZHMoY2hhcmFjdGVySW5kZXgpO1xuICBoYW5kbGVEcmFnKCk7XG59XG5pZiAoYm9hcmQgIT0gbnVsbCkge1xuICBjcmVhdGVCb2FyZChib2FyZCk7XG4gIHBsYXlHYW1lKCk7XG59XG5cbmNvbnN0IGRlZmF1bHRJbmRleDogbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNikgKyAxO1xuXG5pZiAoZGljZUNvbnRhaW5lciAhPSBudWxsKSBzaG93RGljZVJlc3VsdCgpO1xuXG5pZiAoc3RhcnRUaWxlICE9IG51bGwpIHN0YXJ0VGlsZS5pbm5lckhUTUwgPSBkaWNlQXJyYXlbZGVmYXVsdEluZGV4IC0gMV07XG5cbmlmICh2YWxpZGF0ZVNlbGVjdGlvbkJ0biAhPSBudWxsKVxuICB2YWxpZGF0ZVNlbGVjdGlvbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVNlbGVjdGlvbiwgZmFsc2UpO1xuXG5pZiAocGxheWVyMUJ0bikgcGxheWVyMUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dEaWNlUmVzdWx0LCBmYWxzZSk7XG5pZiAocGxheWVyMkJ0bikgcGxheWVyMkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dEaWNlUmVzdWx0LCBmYWxzZSk7XG5cbmZ1bmN0aW9uIHNob3dEaWNlUmVzdWx0KCkge1xuICBjb25zdCBkZWZhdWx0SW5kZXg6IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMTtcbiAgZGljZUNvbnRhaW5lci5pbm5lckhUTUwgPSBkaWNlQXJyYXlbZGVmYXVsdEluZGV4IC0gMV07XG59XG5cbmZ1bmN0aW9uIHBsYXlHYW1lKCkge1xuICBsZXQgaXNQbGF5aW5nOiBib29sZWFuID0gdHJ1ZTtcbiAgbGV0IHBsYXllcjFTdGF0dXM6IG51bWJlciA9IDE7XG4gIGxldCBwbGF5ZXIyU3RhdHVzOiBudW1iZXIgPSAxO1xuXG4gIHdoaWxlIChpc1BsYXlpbmcpIHtcbiAgICBydW5QbGF5ZXIxVHVybigpO1xuICAgIHJ1blBsYXllcjJUdXJuKCk7XG4gIH1cblxuICBmdW5jdGlvbiBydW5QbGF5ZXIxVHVybigpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50RGljZVBvaW50ID0gcm9sbERpY2UoKTtcbiAgICBjb25zb2xlLmxvZyhgUGxheWVyIDEgcm9sbGVkOiAke2N1cnJlbnREaWNlUG9pbnR9YCk7XG5cbiAgICBpZiAoY3VycmVudERpY2VQb2ludCA9PT0gNikge1xuICAgICAgcGxheWVyMVN0YXR1cyArPSBjdXJyZW50RGljZVBvaW50OyAvL3VwZGF0ZVxuICAgICAgdXBkYXRlUGxheWVyMVN0YXR1cygpOyAvL2NoZWNrVXBkYXRlXG4gICAgICBjb25zb2xlLmxvZygnU2luY2UgeW91IHJvbGxlZCA2LCB5b3UgZ290IGEgQm9udXMgbW92ZW1lbnQnKTtcbiAgICAgIHJ1blBsYXllcjFUdXJuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBsYXllcjFTdGF0dXMgKz0gY3VycmVudERpY2VQb2ludDtcbiAgICAgIHVwZGF0ZVBsYXllcjFTdGF0dXMoKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYHBsYXllcjFTdGF0dXM6JHtwbGF5ZXIxU3RhdHVzfWApO1xuICAgIGNvbnNvbGUubG9nKGBwbGF5ZXIyU3RhdHVzOiR7cGxheWVyMlN0YXR1c31gKTtcblxuICAgIGlmIChwbGF5ZXIxU3RhdHVzID49IDMwKSB7XG4gICAgICBjb25zb2xlLmxvZygnUGxheWVyIDEgd2lubmVyJyk7XG4gICAgICBpc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1blBsYXllcjJUdXJuKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnREaWNlUG9pbnQgPSByb2xsRGljZSgpO1xuICAgIGNvbnNvbGUubG9nKGBQbGF5ZXIgMiByb2xsZWQ6ICR7Y3VycmVudERpY2VQb2ludH1gKTtcblxuICAgIGlmIChjdXJyZW50RGljZVBvaW50ID09PSA2KSB7XG4gICAgICBwbGF5ZXIyU3RhdHVzICs9IGN1cnJlbnREaWNlUG9pbnQ7XG4gICAgICB1cGRhdGVQbGF5ZXIyU3RhdHVzKCk7XG4gICAgICBjb25zb2xlLmxvZygnU2luY2UgeW91IHJvbGxlZCA2LCB5b3UgZ290IGEgQm9udXMgbW92ZW1lbnQnKTtcbiAgICAgIHJ1blBsYXllcjJUdXJuKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBsYXllcjJTdGF0dXMgKz0gY3VycmVudERpY2VQb2ludDtcbiAgICAgIHVwZGF0ZVBsYXllcjJTdGF0dXMoKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYHBsYXllcjFTdGF0dXM6JHtwbGF5ZXIxU3RhdHVzfWApO1xuICAgIGNvbnNvbGUubG9nKGBwbGF5ZXIyU3RhdHVzOiR7cGxheWVyMlN0YXR1c31gKTtcblxuICAgIGlmIChwbGF5ZXIyU3RhdHVzID49IDMwKSB7XG4gICAgICBjb25zb2xlLmxvZygnUGxheWVyIDIgd2lubmVyJyk7XG4gICAgICBpc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVBsYXllcjJTdGF0dXMoKSB7XG4gICAgc3dpdGNoIChwbGF5ZXIyU3RhdHVzKSB7XG4gICAgICBjYXNlIHRyYXAxOlxuICAgICAgICBwbGF5ZXIyU3RhdHVzIC09IDE7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDE6IG1vdmUgYmFjayAxIHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDI6ICR7cGxheWVyMlN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRyYXAyOlxuICAgICAgICBwbGF5ZXIyU3RhdHVzIC09IDI7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDI6IG1vdmUgYmFjayAyIHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDI6ICR7cGxheWVyMlN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRyYXAzOlxuICAgICAgICBwbGF5ZXIyU3RhdHVzIC09IDM7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDM6IG1vdmUgYmFjayAzIHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDI6ICR7cGxheWVyMlN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRyYXA0OlxuICAgICAgICBwbGF5ZXIyU3RhdHVzIC09IDQ7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDQ6IG1vdmUgYmFjayA0IHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDI6ICR7cGxheWVyMlN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRyYXA1OlxuICAgICAgICBwbGF5ZXIyU3RhdHVzIC09IDU7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDU6IG1vdmUgYmFjayA1IHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDI6ICR7cGxheWVyMlN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRyYXA2OlxuICAgICAgICBwbGF5ZXIyU3RhdHVzIC09IDY7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDY6IG1vdmUgYmFjayA2IHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDI6ICR7cGxheWVyMlN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZyhgTm9ybWFsOiA+Pj5DdXJyZW50IHBsYXllciAyOiAke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVBsYXllcjFTdGF0dXMoKSB7XG4gICAgc3dpdGNoIChwbGF5ZXIxU3RhdHVzKSB7XG4gICAgICBjYXNlIHRyYXAxOlxuICAgICAgICBwbGF5ZXIxU3RhdHVzIC09IDE7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDE6IG1vdmUgYmFjayAxIHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDE6ICR7cGxheWVyMVN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRyYXAyOlxuICAgICAgICBwbGF5ZXIxU3RhdHVzIC09IDI7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDI6IG1vdmUgYmFjayAyIHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDE6ICR7cGxheWVyMVN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRyYXAzOlxuICAgICAgICBwbGF5ZXIxU3RhdHVzIC09IDM7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDM6IG1vdmUgYmFjayAzIHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDE6ICR7cGxheWVyMVN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRyYXA0OlxuICAgICAgICBwbGF5ZXIxU3RhdHVzIC09IDQ7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDQ6IG1vdmUgYmFjayA0IHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDE6ICR7cGxheWVyMVN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRyYXA1OlxuICAgICAgICBwbGF5ZXIxU3RhdHVzIC09IDU7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDU6IG1vdmUgYmFjayA1IHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDE6ICR7cGxheWVyMVN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRyYXA2OlxuICAgICAgICBwbGF5ZXIxU3RhdHVzIC09IDY7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDY6IG1vdmUgYmFjayA2IHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDE6ICR7cGxheWVyMVN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZyhgTm9ybWFsOiA+Pj5DdXJyZW50IHBsYXllciAxOiAke3BsYXllcjFTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG5jb25zb2xlLmxvZyhnYW1lU3RvcmFnZS5nZXQoJ3BsYXllcjFOYW1lJykpO1xuIiwiZXhwb3J0IGNvbnN0IHRyYXAxOiBudW1iZXIgPSA0O1xuZXhwb3J0IGNvbnN0IHRyYXAyOiBudW1iZXIgPSA3O1xuZXhwb3J0IGNvbnN0IHRyYXAzOiBudW1iZXIgPSAxMztcbmV4cG9ydCBjb25zdCB0cmFwNDogbnVtYmVyID0gMTY7XG5leHBvcnQgY29uc3QgdHJhcDU6IG51bWJlciA9IDIzO1xuZXhwb3J0IGNvbnN0IHRyYXA2OiBudW1iZXIgPSAyOTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJvYXJkKGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQpOiB2b2lkIHtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMzA7IGkrKykge1xuICAgIGNvbnN0IHRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aWxlLmNsYXNzTmFtZSA9IGB0aWxlIHRpbGUtaW5kZXgtJHtpfWA7XG5cbiAgICB0aWxlLnNldEF0dHJpYnV0ZSgndGlsZS1pbmRleCcsIGAke2l9YCk7XG5cbiAgICBpZiAoaSAlIDIgIT09IDApIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2Jyb3duJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgIH1cblxuICAgIGlmIChpID09IDQpIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZSc7XG4gICAgfVxuICAgIGlmIChpID09IDcpIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZSc7XG4gICAgfVxuICAgIGlmIChpID09IDEzKSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2UnO1xuICAgIH1cbiAgICBpZiAoaSA9PSAxNikge1xuICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnb3JhbmdlJztcbiAgICB9XG4gICAgaWYgKGkgPT0gMjMpIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZSc7XG4gICAgfVxuXG4gICAgaWYgKGkgPT0gMjkpIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZSc7XG4gICAgfVxuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRpbGUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBnYW1lU3RvcmFnZSB9IGZyb20gJy4uL2luZGV4JztcbmxldCBkcmFnZ2VkOiBIVE1MRWxlbWVudDtcblxuZnVuY3Rpb24gaGFuZGxlRHJhZ1N0YXJ0KGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgZHJhZ2dlZCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUub3BhY2l0eSA9ICcwLjUnO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmFnRW5kKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUub3BhY2l0eSA9ICcnO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmFnT3ZlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWdFbnRlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ3N0YXJ0Wm9uZScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyM3NDU2MjUnO1xuICB9XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ2VuZFpvbmUxJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnIzc0NTYyNSc7XG4gIH1cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnZW5kWm9uZTInKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcjNzQ1NjI1JztcbiAgfVxufVxuZnVuY3Rpb24gaGFuZGxlRHJhZ0xlYXZlKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnc3RhcnRab25lJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgfVxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdlbmRab25lMScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gIH1cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnZW5kWm9uZTInKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyb3AoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAvLyBwcmV2ZW50IGRlZmF1bHQgYWN0aW9uIChvcGVuIGFzIGxpbmsgZm9yIHNvbWUgZWxlbWVudHMpXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgLy8gbW92ZSBkcmFnZ2VkIGVsZW0gdG8gdGhlIHNlbGVjdGVkIGRyb3AgdGFyZ2V0XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PSAnZW5kWm9uZTEnKSB7XG4gICAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgYWxlcnQoJ09ubHkgb25lIGNoYXJhY3RlciBpcyBhbGxvd2VkLicpO1xuICAgICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICBkcmFnZ2VkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZHJhZ2dlZCk7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgZ2FtZVN0b3JhZ2Uuc2V0KCdwbGF5ZXIxTmFtZScsIGAke2RyYWdnZWQuZ2V0QXR0cmlidXRlKCdrZXknKX1gKTtcbiAgfVxuXG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PSAnZW5kWm9uZTInKSB7XG4gICAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgYWxlcnQoJ09ubHkgb25lIGNoYXJhY3RlciBpcyBhbGxvd2VkLicpO1xuICAgICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICBkcmFnZ2VkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZHJhZ2dlZCk7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgZ2FtZVN0b3JhZ2Uuc2V0KCdwbGF5ZXIyTmFtZScsIGAke2RyYWdnZWQuZ2V0QXR0cmlidXRlKCdrZXknKX1gKTtcbiAgfVxuXG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PSAnc3RhcnRab25lJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICBkcmFnZ2VkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZHJhZ2dlZCk7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgY29uc29sZS5sb2coZHJhZ2dlZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhZygpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgaGFuZGxlRHJhZ1N0YXJ0KTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIGhhbmRsZURyYWdFbmQpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGhhbmRsZURyYWdPdmVyKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgaGFuZGxlRHJhZ0VudGVyKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgaGFuZGxlRHJhZ0xlYXZlKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGhhbmRsZURyb3ApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVEcmFnO1xuIiwiaW1wb3J0IHsgcGxheWVyMVNlbGVjdGlvbiwgcGxheWVyMlNlbGVjdGlvbiB9IGZyb20gJy4vdXRpbC9jb250YWluZXJzJztcbmltcG9ydCB7IGhhc1NlbGVjdGVkIH0gZnJvbSAnLi91dGlsL2hhc1NlbGVjdGVkJztcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVTZWxlY3Rpb24oKTogdm9pZCB7XG4gIGNvbnN0IGhhc1BsYXllcjFTZWxlY3RlZCA9IGhhc1NlbGVjdGVkKHBsYXllcjFTZWxlY3Rpb24pO1xuICBjb25zdCBoYXNQbGF5ZXIyU2VsZWN0ZWQgPSBoYXNTZWxlY3RlZChwbGF5ZXIyU2VsZWN0aW9uKTtcbiAgaWYgKGhhc1BsYXllcjFTZWxlY3RlZCAmJiBoYXNQbGF5ZXIyU2VsZWN0ZWQpIHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdnYW1lLmh0bWwnO1xuICB9IGVsc2Uge1xuICAgIGFsZXJ0KCdTZWxlY3QgY2hhcmFjdGVyIGZpcnN0LCB0aGVuIHN0YXJ0IHRoZSBnYW1lJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGRpY2VBcnJheSB9IGZyb20gJy4vdXRpbC9kaWNlJztcblxuZXhwb3J0IGNvbnN0IGRpY2VOdW1iZXIgPSAoKSA9PiB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiByb2xsRGljZSgpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNikgKyAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGljZUljb24oZGljZVBvaW50OiBudW1iZXIpIHtcbiAgcmV0dXJuIGRpY2VBcnJheVtkaWNlUG9pbnQgKyAxXTtcbn1cbiIsImltcG9ydCB7IGNoYXJhY3Rlckxpc3QgfSBmcm9tICcuL3V0aWwvY29udGFpbmVycyc7XG5pbXBvcnQgeyBSZXNwb25zZU9ialR5cGVzIH0gZnJvbSAnLi91dGlsL3R5cGVzJztcbmltcG9ydCBjcmVhdGVJbWFnZSBmcm9tICcuL3V0aWwvY3JlYXRlSW1hZ2UnO1xuXG5jb25zdCBCQVNFX1VSTDogc3RyaW5nID0gJ2h0dHBzOi8vd3d3LmFuYXBpb2ZpY2VhbmRmaXJlLmNvbS9hcGkvY2hhcmFjdGVycy8nO1xuXG5mdW5jdGlvbiBnZXRDaGFyYWN0ZXJDYXJkcyhjaGFyYWN0ZXJJbmRleDogbnVtYmVyW10pIHtcbiAgY2hhcmFjdGVySW5kZXgubWFwKGVsZW1lbnQgPT4ge1xuICAgIHNob3dDaGFyYWN0ZXIoZWxlbWVudCk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzaG93Q2hhcmFjdGVyKGNoYXJhY3Rlck5hbWVJbmRleDogbnVtYmVyKSB7XG4gIGNvbnN0IHVybCA9IGAke0JBU0VfVVJMfSR7Y2hhcmFjdGVyTmFtZUluZGV4fWA7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgY29uc3QgZGF0YTogUmVzcG9uc2VPYmpUeXBlcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIGNvbnN0IGNvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbXBvbmVudC5jbGFzc05hbWUgPSAnY2FyZCc7XG4gICAgY29tcG9uZW50LnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcbiAgICBjb21wb25lbnQuc2V0QXR0cmlidXRlKCdrZXknLCBgJHtjaGFyYWN0ZXJOYW1lSW5kZXh9YCk7XG4gICAgY29uc3QgY2FyZEltYWdlID0gYDxpbWcgZHJhZ2dhYmxlPVwiZmFsc2VcIiBzcmM9JHtjcmVhdGVJbWFnZShjaGFyYWN0ZXJOYW1lSW5kZXgpfSBjbGFzcz1cImNhcmRfX2ltYWdlXCI+YDtcbiAgICBjb25zdCBjYXJkVGl0bGUgPSBgIDxoMz4ke2RhdGEubmFtZX08L2gzPmA7XG4gICAgY29tcG9uZW50LmlubmVySFRNTCA9IGNhcmRJbWFnZSArIGNhcmRUaXRsZTtcblxuICAgIGNoYXJhY3Rlckxpc3QuYXBwZW5kKGNvbXBvbmVudCk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhyb3cgZXJyO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldENoYXJhY3RlckNhcmRzO1xuIiwiY29uc3QgU2Ftd2VsbDogbnVtYmVyID0gOTU0O1xuY29uc3QgSm9uOiBudW1iZXIgPSA1ODM7XG5jb25zdCBDZXJzZWk6IG51bWJlciA9IDIzODtcbmNvbnN0IFR5cmlvbjogbnVtYmVyID0gMTA1MjtcbmNvbnN0IFNhbnNhOiBudW1iZXIgPSAyNzE7XG5cbmxldCBjaGFyYWN0ZXJJbmRleDogbnVtYmVyW10gPSBbU2Ftd2VsbCwgSm9uLCBDZXJzZWksIFR5cmlvbiwgU2Fuc2FdO1xuZXhwb3J0IGRlZmF1bHQgY2hhcmFjdGVySW5kZXg7XG4iLCIvL3BhZ2U6c2VsZWN0LXBsYXllclxuZXhwb3J0IGNvbnN0IGNoYXJhY3Rlckxpc3Q6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRzJyk7XG5leHBvcnQgY29uc3QgcGxheWVyMVNlbGVjdGlvbjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kWm9uZTEnKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXIyU2VsZWN0aW9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmRab25lMicpO1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlU2VsZWN0aW9uQnRuOiBIVE1MQW5jaG9yRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdGEtLXZhbGlkYXRpb24nKTtcblxuLy9wYWdlOmdhbWVcbmV4cG9ydCBjb25zdCBib2FyZDogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZUJvYXJkJyk7XG5leHBvcnQgY29uc3QgZGljZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGljZUltYWdlJyk7XG5leHBvcnQgY29uc3Qgc3RhcnRUaWxlOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RpbGUtaW5kZXgtMScpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjFCdG46IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1QbGF5ZXIxJyk7XG5leHBvcnQgY29uc3QgcGxheWVyMkJ0bjogSFRNTEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLVBsYXllcjInKTtcbiIsImZ1bmN0aW9uIGNyZWF0ZUltYWdlKGluZGV4OiBudW1iZXIpIHtcbiAgcmV0dXJuIGBodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kbmtmZ216eTEvaW1hZ2UvdXBsb2FkL3YxNTc1NTQ5Njc0L2dhbWUvJHtpbmRleH0ucG5nYDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSW1hZ2U7XG4iLCJleHBvcnQgY29uc3QgZGljZUljb25zID0ge1xuICBwb2ludDE6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6TTI1NiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDI6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem0zMTYuOTcgMzYuMDNBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptLTI2OCAyNjhBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50MzpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTMxNi45NyAzNi4wM0E1MCA1MCAwIDAgMSA0NDAgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3ek0yNTYgMjA2YTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwek0xMjMuNDcgMzQwLjAzQTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDQ6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem00OC45NyAzNi4wM0E1MCA1MCAwIDAgMSAxNzIgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0tMjY4IDI2OEE1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQ1OlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptNDguOTcgMzYuMDNBNTAgNTAgMCAwIDEgMTcyIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pNMjU2IDIwNmE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHpNMTIzLjQ3IDM0MC4wM0E1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQ2OlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptNDguOTcgMzYuMDNBNTAgNTAgMCAwIDEgMTcyIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pNMTIyIDIwNmE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHptMjY4IDBhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6TTEyMy40NyAzNDAuMDNBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG59O1xuXG5leHBvcnQgY29uc3QgZGljZUFycmF5OiBzdHJpbmdbXSA9IFtcbiAgZGljZUljb25zLnBvaW50MSxcbiAgZGljZUljb25zLnBvaW50MixcbiAgZGljZUljb25zLnBvaW50MyxcbiAgZGljZUljb25zLnBvaW50NCxcbiAgZGljZUljb25zLnBvaW50NSxcbiAgZGljZUljb25zLnBvaW50Nixcbl07XG4iLCJleHBvcnQgZnVuY3Rpb24gaGFzU2VsZWN0ZWQoY29udGFpbmVyOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gY29udGFpbmVyLmhhc0NoaWxkTm9kZXMoKTtcbn1cbiIsImNsYXNzIFN0b3JhZ2Uge1xuICBwcml2YXRlIHN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICB9XG5cbiAgZ2V0KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgfVxuXG4gIGRlbGV0ZShrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gIH1cblxuICBzZXRTZXJpYWxpemUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNldChrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gIH1cblxuICBnZXRVbnNlcmlhbGl6ZTxUPihrZXk6IHN0cmluZyk6IFQge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmdldChrZXkpO1xuXG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKSBhcyBUO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0b3JhZ2U7XG4iXX0=
