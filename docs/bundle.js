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
        var storage_1 = require('./scripts/util/storage');
        var renderCharacterList_1 = require('./renderCharacterList');
        var playGame_1 = require('./playGame');
        exports.gameStorage = new storage_1.default();
        renderCharacterList_1.default();
        playGame_1.default();
      },
      { './playGame': 2, './renderCharacterList': 3, './scripts/util/storage': 14 },
    ],
    2: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var board_1 = require('./scripts/board');
        var containers_1 = require('./scripts/util/containers');
        var game_1 = require('./scripts/game');
        var index_1 = require('./index');
        function rollDice() {
          return Math.floor(Math.random() * 6) + 1;
        }
        function removePlayer(player) {
          document.getElementById('figure-' + player).remove();
        }
        function runGame() {
          var player1 = index_1.gameStorage.getUnserialize('player1Name');
          var player2 = index_1.gameStorage.getUnserialize('player2Name');
          if (containers_1.board != null && player1 && player2) {
            board_1.createBoard(containers_1.board);
            playGame(player1, player2);
            if (containers_1.diceContainer != null)
              game_1.showDiceResult(containers_1.diceContainer, rollDice());
          }
        }
        function playGame(player1, player2) {
          var startPlace = document.getElementById('tile-index-1');
          var player1Status = 1;
          var player2Status = 1;
          var isPlayer1Turn = true;
          board_1.displayPlayers(startPlace, player1);
          board_1.displayPlayers(startPlace, player2);
          game_1.updateButton(isPlayer1Turn, containers_1.player1Btn, containers_1.player2Btn);
          containers_1.player1Btn.addEventListener('click', runPlayer1Turn, false);
          containers_1.player2Btn.addEventListener('click', runPlayer2Turn, false);
          function runPlayer1Turn() {
            var currentDicePoint = rollDice();
            game_1.showDiceResult(containers_1.diceContainer, currentDicePoint);
            console.log('Player 1 rolled: ' + currentDicePoint);
            removePlayer(player1);
            player1Status += currentDicePoint;
            if (player1Status >= 30) {
              var finalPosition = document.getElementById('tile-index-30');
              board_1.displayPlayers(finalPosition, player1);
              containers_1.player1Btn.disabled = true;
              containers_1.player2Btn.disabled = true;
              console.log('Player 1 winner');
              alert('Winner');
              return null;
            }
            var updatePosition = document.getElementById('tile-index-' + player1Status);
            board_1.displayPlayers(updatePosition, player1);
            if (currentDicePoint === 6) {
              updatePlayer1Status();
              console.log('Since you rolled 6, you got a Bonus movement');
              return null;
            } else {
              updatePlayer1Status();
            }
            console.log('player1Status:' + player1Status);
            console.log('player2Status:' + player2Status);
            isPlayer1Turn = false;
            game_1.updateButton(isPlayer1Turn, containers_1.player1Btn, containers_1.player2Btn);
          }
          function runPlayer2Turn() {
            var currentDicePoint = rollDice();
            game_1.showDiceResult(containers_1.diceContainer, currentDicePoint);
            console.log('Player 2 rolled: ' + currentDicePoint);
            removePlayer(player2);
            player1Status += currentDicePoint;
            if (player2Status >= 30) {
              var finalPosition = document.getElementById('tile-index-30');
              board_1.displayPlayers(finalPosition, player2);
              containers_1.player1Btn.disabled = true;
              containers_1.player2Btn.disabled = true;
              console.log('Player 2 winner');
              alert('Winner!!!');
              return null;
              return null;
            }
            var updatePosition = document.getElementById('tile-index-' + player1Status);
            board_1.displayPlayers(updatePosition, player2);
            if (currentDicePoint === 6) {
              updatePlayer2Status();
              console.log('Since you rolled 6, you got a Bonus movement');
              return null;
            } else {
              updatePlayer2Status();
            }
            console.log('player1Status:' + player1Status);
            console.log('player2Status:' + player2Status);
            isPlayer1Turn = true;
            game_1.updateButton(isPlayer1Turn, containers_1.player1Btn, containers_1.player2Btn);
          }
          function updatePlayer2Status() {
            switch (player2Status) {
              case board_1.trap1:
                player2Status -= 1;
                console.log('Trap 1: move back 1 steps >>>Current player 2: ' + player2Status);
                break;
              case board_1.trap2:
                player2Status -= 2;
                var updatePosition = document.getElementById('tile-index-' + player2Status);
                board_1.displayPlayers(updatePosition, player2);
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
        exports.default = runGame;
      },
      { './index': 1, './scripts/board': 4, './scripts/game': 5, './scripts/util/containers': 10 },
    ],
    3: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var handleDrag_1 = require('./scripts/handleDrag');
        var handleSelection_1 = require('./scripts/handleSelection');
        var showCharacter_1 = require('./scripts/showCharacter');
        var characterIndex_1 = require('./scripts/util/characterIndex');
        var containers_1 = require('./scripts/util/containers');
        function renderCharacterList() {
          if (containers_1.characterList != null) {
            showCharacter_1.default(characterIndex_1.default);
            handleDrag_1.default();
            if (containers_1.validateSelectionBtn != null)
              containers_1.validateSelectionBtn.addEventListener(
                'click',
                handleSelection_1.handleSelection,
                false,
              );
          }
        }
        exports.default = renderCharacterList;
      },
      {
        './scripts/handleDrag': 6,
        './scripts/handleSelection': 7,
        './scripts/showCharacter': 8,
        './scripts/util/characterIndex': 9,
        './scripts/util/containers': 10,
      },
    ],
    4: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var createImage_1 = require('./util/createImage');
        exports.trap1 = 4;
        exports.trap2 = 7;
        exports.trap3 = 13;
        exports.trap4 = 16;
        exports.trap5 = 23;
        exports.trap6 = 29;
        function createBoard(container) {
          for (var i = 1; i <= 30; i++) {
            var tile = document.createElement('div');
            tile.className = 'tile';
            tile.setAttribute('id', 'tile-index-' + i);
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
        function displayPlayers(container, playerIndex) {
          var player = document.createElement('img');
          player.src = '' + createImage_1.default(playerIndex);
          player.setAttribute('class', 'board__figure');
          player.setAttribute('alt', 'Game figure no.' + playerIndex);
          player.setAttribute('id', 'figure-' + playerIndex);
          if (container != null) {
            container.appendChild(player);
          }
        }
        exports.displayPlayers = displayPlayers;
      },
      { './util/createImage': 11 },
    ],
    5: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var dice_1 = require('./util/dice');
        function updateButton(condition, btn1, btn2) {
          if (condition) {
            btn1.disabled = false;
            btn2.disabled = true;
          } else {
            btn2.disabled = false;
            btn1.disabled = true;
          }
        }
        exports.updateButton = updateButton;
        function showDiceResult(container, point) {
          container.innerHTML = dice_1.diceArray[point - 1];
        }
        exports.showDiceResult = showDiceResult;
      },
      { './util/dice': 12 },
    ],
    6: [
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
    7: [
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
      { './util/containers': 10, './util/hasSelected': 13 },
    ],
    8: [
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
            var url, response, data, component, cardImage, cardTitle, cardSubTitle, err_1;
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
                  component.className = 'block__cards__item';
                  component.setAttribute('draggable', 'true');
                  component.setAttribute('key', '' + characterNameIndex);
                  cardImage =
                    '<img draggable="false" src=' +
                    createImage_1.default(characterNameIndex) +
                    ' class="block__cards__item__image" alt="Game figure no.' +
                    characterNameIndex +
                    '">';
                  cardTitle = ' <h3>' + data.name + '</h3>';
                  cardSubTitle = '<span>' + data.born + '</span>';
                  component.innerHTML = cardImage + cardTitle + cardSubTitle;
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
      { './util/containers': 10, './util/createImage': 11 },
    ],
    9: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var samwell = 954;
        var jon = 583;
        var cersei = 238;
        var tyrion = 1052;
        var daenerys = 271;
        var characterIndex = [samwell, jon, cersei, tyrion, daenerys];
        exports.default = characterIndex;
      },
      {},
    ],
    10: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.characterList = document.getElementById('startZone');
        exports.player1Selection = document.getElementById('endZone1');
        exports.player2Selection = document.getElementById('endZone2');
        exports.validateSelectionBtn = document.querySelector('.cta--validation');
        exports.board = document.querySelector('.gameBoard');
        exports.diceContainer = document.getElementById('diceImage');
        exports.startTile = document.getElementById('tile-index-1');
        exports.player1Btn = document.querySelector('.btn-Player1');
        exports.player2Btn = document.querySelector('.btn-Player2');
      },
      {},
    ],
    11: [
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
    12: [
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
        function createDiceIcon(dicePoint) {
          return exports.diceArray[dicePoint - 1];
        }
        exports.createDiceIcon = createDiceIcon;
      },
      {},
    ],
    13: [
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
    14: [
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXgudHMiLCJzcmMvcGxheUdhbWUudHMiLCJzcmMvcmVuZGVyQ2hhcmFjdGVyTGlzdC50cyIsInNyYy9zY3JpcHRzL2JvYXJkLnRzIiwic3JjL3NjcmlwdHMvZ2FtZS50cyIsInNyYy9zY3JpcHRzL2hhbmRsZURyYWcudHMiLCJzcmMvc2NyaXB0cy9oYW5kbGVTZWxlY3Rpb24udHMiLCJzcmMvc2NyaXB0cy9zaG93Q2hhcmFjdGVyLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9jaGFyYWN0ZXJJbmRleC50cyIsInNyYy9zY3JpcHRzL3V0aWwvY29udGFpbmVycy50cyIsInNyYy9zY3JpcHRzL3V0aWwvY3JlYXRlSW1hZ2UudHMiLCJzcmMvc2NyaXB0cy91dGlsL2RpY2UudHMiLCJzcmMvc2NyaXB0cy91dGlsL2hhc1NlbGVjdGVkLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9zdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxrREFBNkM7QUFDN0MsNkRBQXdEO0FBQ3hELHVDQUFpQztBQUVwQixRQUFBLFdBQVcsR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztBQUN6Qyw2QkFBbUIsRUFBRSxDQUFDO0FBQ3RCLGtCQUFPLEVBQUUsQ0FBQzs7Ozs7QUNOVix5Q0FTeUI7QUFDekIsd0RBQXlGO0FBQ3pGLHVDQUE4RDtBQUM5RCxpQ0FBc0M7QUFFdEMsU0FBUyxRQUFRO0lBQ2YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLE1BQWM7SUFDbEMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFVLE1BQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3ZELENBQUM7QUFFRCxTQUFTLE9BQU87SUFDZCxJQUFNLE9B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Q0FBQyxJQUFJLENBQU0sQ0FBQztJQUMvQixDQUFDO0lBQ0gsY0FBQztBQUFELENBNUJBLEFBNEJDLElBQUE7QUFFRCxrQkFBZSxPQUFPLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgU3RvcmFnZSBmcm9tICcuL3NjcmlwdHMvdXRpbC9zdG9yYWdlJztcbmltcG9ydCByZW5kZXJDaGFyYWN0ZXJMaXN0IGZyb20gJy4vcmVuZGVyQ2hhcmFjdGVyTGlzdCc7XG5pbXBvcnQgcnVuR2FtZSBmcm9tICcuL3BsYXlHYW1lJztcblxuZXhwb3J0IGNvbnN0IGdhbWVTdG9yYWdlID0gbmV3IFN0b3JhZ2UoKTtcbnJlbmRlckNoYXJhY3Rlckxpc3QoKTtcbnJ1bkdhbWUoKTtcbiIsImltcG9ydCB7XG4gIGNyZWF0ZUJvYXJkLFxuICBkaXNwbGF5UGxheWVycyxcbiAgdHJhcDEsXG4gIHRyYXAyLFxuICB0cmFwMyxcbiAgdHJhcDQsXG4gIHRyYXA1LFxuICB0cmFwNixcbn0gZnJvbSAnLi9zY3JpcHRzL2JvYXJkJztcbmltcG9ydCB7IGJvYXJkLCBkaWNlQ29udGFpbmVyLCBwbGF5ZXIxQnRuLCBwbGF5ZXIyQnRuIH0gZnJvbSAnLi9zY3JpcHRzL3V0aWwvY29udGFpbmVycyc7XG5pbXBvcnQgeyB1cGRhdGVCdXR0b24sIHNob3dEaWNlUmVzdWx0IH0gZnJvbSAnLi9zY3JpcHRzL2dhbWUnO1xuaW1wb3J0IHsgZ2FtZVN0b3JhZ2UgfSBmcm9tICcuL2luZGV4JztcblxuZnVuY3Rpb24gcm9sbERpY2UoKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlUGxheWVyKHBsYXllcjogbnVtYmVyKTogdm9pZCB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBmaWd1cmUtJHtwbGF5ZXJ9YCkucmVtb3ZlKCk7XG59XG5cbmZ1bmN0aW9uIHJ1bkdhbWUoKTogdm9pZCB7XG4gIGNvbnN0IHBsYXllcjE6IG51bWJlciA9IGdhbWVTdG9yYWdlLmdldFVuc2VyaWFsaXplKCdwbGF5ZXIxTmFtZScpO1xuICBjb25zdCBwbGF5ZXIyOiBudW1iZXIgPSBnYW1lU3RvcmFnZS5nZXRVbnNlcmlhbGl6ZSgncGxheWVyMk5hbWUnKTtcbiAgaWYgKGJvYXJkICE9IG51bGwgJiYgcGxheWVyMSAmJiBwbGF5ZXIyKSB7XG4gICAgY3JlYXRlQm9hcmQoYm9hcmQpO1xuICAgIHBsYXlHYW1lKHBsYXllcjEsIHBsYXllcjIpO1xuICAgIGlmIChkaWNlQ29udGFpbmVyICE9IG51bGwpIHNob3dEaWNlUmVzdWx0KGRpY2VDb250YWluZXIsIHJvbGxEaWNlKCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBsYXlHYW1lKHBsYXllcjE6IG51bWJlciwgcGxheWVyMjogbnVtYmVyKTogdm9pZCB7XG4gIGNvbnN0IHN0YXJ0UGxhY2U6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbGUtaW5kZXgtMScpO1xuICBsZXQgcGxheWVyMVN0YXR1czogbnVtYmVyID0gMTtcbiAgbGV0IHBsYXllcjJTdGF0dXM6IG51bWJlciA9IDE7XG4gIGxldCBpc1BsYXllcjFUdXJuOiBib29sZWFuID0gdHJ1ZTtcblxuICBkaXNwbGF5UGxheWVycyhzdGFydFBsYWNlLCBwbGF5ZXIxKTtcbiAgZGlzcGxheVBsYXllcnMoc3RhcnRQbGFjZSwgcGxheWVyMik7XG4gIHVwZGF0ZUJ1dHRvbihpc1BsYXllcjFUdXJuLCBwbGF5ZXIxQnRuLCBwbGF5ZXIyQnRuKTtcblxuICBwbGF5ZXIxQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuUGxheWVyMVR1cm4sIGZhbHNlKTtcbiAgcGxheWVyMkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1blBsYXllcjJUdXJuLCBmYWxzZSk7XG5cbiAgZnVuY3Rpb24gcnVuUGxheWVyMVR1cm4oKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudERpY2VQb2ludCA9IHJvbGxEaWNlKCk7XG4gICAgc2hvd0RpY2VSZXN1bHQoZGljZUNvbnRhaW5lciwgY3VycmVudERpY2VQb2ludCk7XG4gICAgY29uc29sZS5sb2coYFBsYXllciAxIHJvbGxlZDogJHtjdXJyZW50RGljZVBvaW50fWApO1xuICAgIHJlbW92ZVBsYXllcihwbGF5ZXIxKTtcbiAgICBwbGF5ZXIxU3RhdHVzICs9IGN1cnJlbnREaWNlUG9pbnQ7XG5cbiAgICBpZiAocGxheWVyMVN0YXR1cyA+PSAzMCkge1xuICAgICAgY29uc3QgZmluYWxQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aWxlLWluZGV4LTMwJyk7XG4gICAgICBkaXNwbGF5UGxheWVycyhmaW5hbFBvc2l0aW9uLCBwbGF5ZXIxKTtcbiAgICAgIHBsYXllcjFCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgcGxheWVyMkJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICBjb25zb2xlLmxvZygnUGxheWVyIDEgd2lubmVyJyk7XG4gICAgICBhbGVydCgnV2lubmVyJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB1cGRhdGVQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0aWxlLWluZGV4LSR7cGxheWVyMVN0YXR1c31gKTtcbiAgICBkaXNwbGF5UGxheWVycyh1cGRhdGVQb3NpdGlvbiwgcGxheWVyMSk7XG5cbiAgICBpZiAoY3VycmVudERpY2VQb2ludCA9PT0gNikge1xuICAgICAgdXBkYXRlUGxheWVyMVN0YXR1cygpOyAvL2NoZWNrVXBkYXRlXG4gICAgICBjb25zb2xlLmxvZygnU2luY2UgeW91IHJvbGxlZCA2LCB5b3UgZ290IGEgQm9udXMgbW92ZW1lbnQnKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVQbGF5ZXIxU3RhdHVzKCk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGBwbGF5ZXIxU3RhdHVzOiR7cGxheWVyMVN0YXR1c31gKTtcbiAgICBjb25zb2xlLmxvZyhgcGxheWVyMlN0YXR1czoke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgaXNQbGF5ZXIxVHVybiA9IGZhbHNlO1xuICAgIHVwZGF0ZUJ1dHRvbihpc1BsYXllcjFUdXJuLCBwbGF5ZXIxQnRuLCBwbGF5ZXIyQnRuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1blBsYXllcjJUdXJuKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnREaWNlUG9pbnQgPSByb2xsRGljZSgpO1xuICAgIHNob3dEaWNlUmVzdWx0KGRpY2VDb250YWluZXIsIGN1cnJlbnREaWNlUG9pbnQpO1xuICAgIGNvbnNvbGUubG9nKGBQbGF5ZXIgMiByb2xsZWQ6ICR7Y3VycmVudERpY2VQb2ludH1gKTtcbiAgICByZW1vdmVQbGF5ZXIocGxheWVyMik7XG4gICAgcGxheWVyMVN0YXR1cyArPSBjdXJyZW50RGljZVBvaW50O1xuXG4gICAgaWYgKHBsYXllcjJTdGF0dXMgPj0gMzApIHtcbiAgICAgIGNvbnN0IGZpbmFsUG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGlsZS1pbmRleC0zMCcpO1xuICAgICAgZGlzcGxheVBsYXllcnMoZmluYWxQb3NpdGlvbiwgcGxheWVyMik7XG4gICAgICBwbGF5ZXIxQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHBsYXllcjJCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5sb2coJ1BsYXllciAyIHdpbm5lcicpO1xuICAgICAgYWxlcnQoJ1dpbm5lciEhIScpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB1cGRhdGVQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0aWxlLWluZGV4LSR7cGxheWVyMVN0YXR1c31gKTtcbiAgICBkaXNwbGF5UGxheWVycyh1cGRhdGVQb3NpdGlvbiwgcGxheWVyMik7XG5cbiAgICBpZiAoY3VycmVudERpY2VQb2ludCA9PT0gNikge1xuICAgICAgdXBkYXRlUGxheWVyMlN0YXR1cygpO1xuICAgICAgY29uc29sZS5sb2coJ1NpbmNlIHlvdSByb2xsZWQgNiwgeW91IGdvdCBhIEJvbnVzIG1vdmVtZW50Jyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlUGxheWVyMlN0YXR1cygpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgcGxheWVyMVN0YXR1czoke3BsYXllcjFTdGF0dXN9YCk7XG4gICAgY29uc29sZS5sb2coYHBsYXllcjJTdGF0dXM6JHtwbGF5ZXIyU3RhdHVzfWApO1xuICAgIGlzUGxheWVyMVR1cm4gPSB0cnVlO1xuICAgIHVwZGF0ZUJ1dHRvbihpc1BsYXllcjFUdXJuLCBwbGF5ZXIxQnRuLCBwbGF5ZXIyQnRuKTtcbiAgfVxuICBmdW5jdGlvbiB1cGRhdGVQbGF5ZXIyU3RhdHVzKCkge1xuICAgIHN3aXRjaCAocGxheWVyMlN0YXR1cykge1xuICAgICAgY2FzZSB0cmFwMTpcbiAgICAgICAgcGxheWVyMlN0YXR1cyAtPSAxO1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCAxOiBtb3ZlIGJhY2sgMSBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAyOiAke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cmFwMjpcbiAgICAgICAgcGxheWVyMlN0YXR1cyAtPSAyO1xuICAgICAgICBjb25zdCB1cGRhdGVQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0aWxlLWluZGV4LSR7cGxheWVyMlN0YXR1c31gKTtcbiAgICAgICAgZGlzcGxheVBsYXllcnModXBkYXRlUG9zaXRpb24sIHBsYXllcjIpO1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCAyOiBtb3ZlIGJhY2sgMiBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAyOiAke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cmFwMzpcbiAgICAgICAgcGxheWVyMlN0YXR1cyAtPSAzO1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCAzOiBtb3ZlIGJhY2sgMyBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAyOiAke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cmFwNDpcbiAgICAgICAgcGxheWVyMlN0YXR1cyAtPSA0O1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCA0OiBtb3ZlIGJhY2sgNCBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAyOiAke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cmFwNTpcbiAgICAgICAgcGxheWVyMlN0YXR1cyAtPSA1O1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCA1OiBtb3ZlIGJhY2sgNSBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAyOiAke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cmFwNjpcbiAgICAgICAgcGxheWVyMlN0YXR1cyAtPSA2O1xuICAgICAgICBjb25zb2xlLmxvZyhgVHJhcCA2OiBtb3ZlIGJhY2sgNiBzdGVwcyA+Pj5DdXJyZW50IHBsYXllciAyOiAke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coYE5vcm1hbDogPj4+Q3VycmVudCBwbGF5ZXIgMjogJHtwbGF5ZXIyU3RhdHVzfWApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gdXBkYXRlUGxheWVyMVN0YXR1cygpIHtcbiAgICBzd2l0Y2ggKHBsYXllcjFTdGF0dXMpIHtcbiAgICAgIGNhc2UgdHJhcDE6XG4gICAgICAgIHBsYXllcjFTdGF0dXMgLT0gMTtcbiAgICAgICAgY29uc29sZS5sb2coYFRyYXAgMTogbW92ZSBiYWNrIDEgc3RlcHMgPj4+Q3VycmVudCBwbGF5ZXIgMTogJHtwbGF5ZXIxU3RhdHVzfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJhcDI6XG4gICAgICAgIHBsYXllcjFTdGF0dXMgLT0gMjtcbiAgICAgICAgY29uc29sZS5sb2coYFRyYXAgMjogbW92ZSBiYWNrIDIgc3RlcHMgPj4+Q3VycmVudCBwbGF5ZXIgMTogJHtwbGF5ZXIxU3RhdHVzfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJhcDM6XG4gICAgICAgIHBsYXllcjFTdGF0dXMgLT0gMztcbiAgICAgICAgY29uc29sZS5sb2coYFRyYXAgMzogbW92ZSBiYWNrIDMgc3RlcHMgPj4+Q3VycmVudCBwbGF5ZXIgMTogJHtwbGF5ZXIxU3RhdHVzfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJhcDQ6XG4gICAgICAgIHBsYXllcjFTdGF0dXMgLT0gNDtcbiAgICAgICAgY29uc29sZS5sb2coYFRyYXAgNDogbW92ZSBiYWNrIDQgc3RlcHMgPj4+Q3VycmVudCBwbGF5ZXIgMTogJHtwbGF5ZXIxU3RhdHVzfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJhcDU6XG4gICAgICAgIHBsYXllcjFTdGF0dXMgLT0gNTtcbiAgICAgICAgY29uc29sZS5sb2coYFRyYXAgNTogbW92ZSBiYWNrIDUgc3RlcHMgPj4+Q3VycmVudCBwbGF5ZXIgMTogJHtwbGF5ZXIxU3RhdHVzfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJhcDY6XG4gICAgICAgIHBsYXllcjFTdGF0dXMgLT0gNjtcbiAgICAgICAgY29uc29sZS5sb2coYFRyYXAgNjogbW92ZSBiYWNrIDYgc3RlcHMgPj4+Q3VycmVudCBwbGF5ZXIgMTogJHtwbGF5ZXIxU3RhdHVzfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUubG9nKGBOb3JtYWw6ID4+PkN1cnJlbnQgcGxheWVyIDE6ICR7cGxheWVyMVN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJ1bkdhbWU7XG4iLCJpbXBvcnQgaGFuZGxlRHJhZyBmcm9tICcuL3NjcmlwdHMvaGFuZGxlRHJhZyc7XG5pbXBvcnQgeyBoYW5kbGVTZWxlY3Rpb24gfSBmcm9tICcuL3NjcmlwdHMvaGFuZGxlU2VsZWN0aW9uJztcbmltcG9ydCBnZXRDaGFyYWN0ZXJDYXJkcyBmcm9tICcuL3NjcmlwdHMvc2hvd0NoYXJhY3Rlcic7XG5pbXBvcnQgY2hhcmFjdGVySW5kZXggZnJvbSAnLi9zY3JpcHRzL3V0aWwvY2hhcmFjdGVySW5kZXgnO1xuaW1wb3J0IHsgY2hhcmFjdGVyTGlzdCwgdmFsaWRhdGVTZWxlY3Rpb25CdG4gfSBmcm9tICcuL3NjcmlwdHMvdXRpbC9jb250YWluZXJzJztcblxuZnVuY3Rpb24gcmVuZGVyQ2hhcmFjdGVyTGlzdCgpOiB2b2lkIHtcbiAgaWYgKGNoYXJhY3Rlckxpc3QgIT0gbnVsbCkge1xuICAgIGdldENoYXJhY3RlckNhcmRzKGNoYXJhY3RlckluZGV4KTtcbiAgICBoYW5kbGVEcmFnKCk7XG4gICAgaWYgKHZhbGlkYXRlU2VsZWN0aW9uQnRuICE9IG51bGwpXG4gICAgICB2YWxpZGF0ZVNlbGVjdGlvbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVNlbGVjdGlvbiwgZmFsc2UpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlbmRlckNoYXJhY3Rlckxpc3Q7XG4iLCJpbXBvcnQgY3JlYXRlSW1hZ2UgZnJvbSAnLi91dGlsL2NyZWF0ZUltYWdlJztcblxuZXhwb3J0IGNvbnN0IHRyYXAxOiBudW1iZXIgPSA0O1xuZXhwb3J0IGNvbnN0IHRyYXAyOiBudW1iZXIgPSA3O1xuZXhwb3J0IGNvbnN0IHRyYXAzOiBudW1iZXIgPSAxMztcbmV4cG9ydCBjb25zdCB0cmFwNDogbnVtYmVyID0gMTY7XG5leHBvcnQgY29uc3QgdHJhcDU6IG51bWJlciA9IDIzO1xuZXhwb3J0IGNvbnN0IHRyYXA2OiBudW1iZXIgPSAyOTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJvYXJkKGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQpOiB2b2lkIHtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMzA7IGkrKykge1xuICAgIGNvbnN0IHRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aWxlLmNsYXNzTmFtZSA9IGB0aWxlYDtcbiAgICB0aWxlLnNldEF0dHJpYnV0ZSgnaWQnLCBgdGlsZS1pbmRleC0ke2l9YCk7XG5cbiAgICBpZiAoaSAlIDIgIT09IDApIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2Jyb3duJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgIH1cblxuICAgIGlmIChpID09IDQpIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZSc7XG4gICAgfVxuICAgIGlmIChpID09IDcpIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZSc7XG4gICAgfVxuICAgIGlmIChpID09IDEzKSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2UnO1xuICAgIH1cbiAgICBpZiAoaSA9PSAxNikge1xuICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnb3JhbmdlJztcbiAgICB9XG4gICAgaWYgKGkgPT0gMjMpIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZSc7XG4gICAgfVxuXG4gICAgaWYgKGkgPT0gMjkpIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZSc7XG4gICAgfVxuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRpbGUpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5UGxheWVycyhjb250YWluZXI6IEhUTUxFbGVtZW50LCBwbGF5ZXJJbmRleDogbnVtYmVyKSB7XG4gIGNvbnN0IHBsYXllcjogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gIHBsYXllci5zcmMgPSBgJHtjcmVhdGVJbWFnZShwbGF5ZXJJbmRleCl9YDtcblxuICBwbGF5ZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdib2FyZF9fZmlndXJlJyk7XG5cbiAgcGxheWVyLnNldEF0dHJpYnV0ZSgnYWx0JywgYEdhbWUgZmlndXJlIG5vLiR7cGxheWVySW5kZXh9YCk7XG5cbiAgcGxheWVyLnNldEF0dHJpYnV0ZSgnaWQnLCBgZmlndXJlLSR7cGxheWVySW5kZXh9YCk7XG5cbiAgaWYgKGNvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllcik7XG4gIH1cbn1cbiIsImltcG9ydCB7IGRpY2VBcnJheSB9IGZyb20gJy4vdXRpbC9kaWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUJ1dHRvbihcbiAgY29uZGl0aW9uOiBib29sZWFuLFxuICBidG4xOiBIVE1MQnV0dG9uRWxlbWVudCxcbiAgYnRuMjogSFRNTEJ1dHRvbkVsZW1lbnQsXG4pOiB2b2lkIHtcbiAgaWYgKGNvbmRpdGlvbikge1xuICAgIGJ0bjEuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBidG4yLmRpc2FibGVkID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBidG4yLmRpc2FibGVkID0gZmFsc2U7XG4gICAgYnRuMS5kaXNhYmxlZCA9IHRydWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dEaWNlUmVzdWx0KGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHBvaW50OiBudW1iZXIpIHtcbiAgY29udGFpbmVyLmlubmVySFRNTCA9IGRpY2VBcnJheVtwb2ludCAtIDFdO1xufVxuIiwiaW1wb3J0IHsgZ2FtZVN0b3JhZ2UgfSBmcm9tICcuLi9pbmRleCc7XG5sZXQgZHJhZ2dlZDogSFRNTEVsZW1lbnQ7XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWdTdGFydChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIGRyYWdnZWQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLm9wYWNpdHkgPSAnMC41Jztcbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhZ0VuZChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLm9wYWNpdHkgPSAnJztcbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhZ092ZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmFnRW50ZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdzdGFydFpvbmUnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcjNzQ1NjI1JztcbiAgfVxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdlbmRab25lMScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyM3NDU2MjUnO1xuICB9XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ2VuZFpvbmUyJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnIzc0NTYyNSc7XG4gIH1cbn1cbmZ1bmN0aW9uIGhhbmRsZURyYWdMZWF2ZShldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ3N0YXJ0Wm9uZScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gIH1cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnZW5kWm9uZTEnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICB9XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ2VuZFpvbmUyJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVEcm9wKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgLy8gcHJldmVudCBkZWZhdWx0IGFjdGlvbiAob3BlbiBhcyBsaW5rIGZvciBzb21lIGVsZW1lbnRzKVxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIC8vIG1vdmUgZHJhZ2dlZCBlbGVtIHRvIHRoZSBzZWxlY3RlZCBkcm9wIHRhcmdldFxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT0gJ2VuZFpvbmUxJykge1xuICAgIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIGFsZXJ0KCdPbmx5IG9uZSBjaGFyYWN0ZXIgaXMgYWxsb3dlZC4nKTtcbiAgICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgZHJhZ2dlZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRyYWdnZWQpO1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgIGdhbWVTdG9yYWdlLnNldCgncGxheWVyMU5hbWUnLCBgJHtkcmFnZ2VkLmdldEF0dHJpYnV0ZSgna2V5Jyl9YCk7XG4gIH1cblxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT0gJ2VuZFpvbmUyJykge1xuICAgIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIGFsZXJ0KCdPbmx5IG9uZSBjaGFyYWN0ZXIgaXMgYWxsb3dlZC4nKTtcbiAgICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgZHJhZ2dlZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRyYWdnZWQpO1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgIGdhbWVTdG9yYWdlLnNldCgncGxheWVyMk5hbWUnLCBgJHtkcmFnZ2VkLmdldEF0dHJpYnV0ZSgna2V5Jyl9YCk7XG4gIH1cblxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT0gJ3N0YXJ0Wm9uZScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgZHJhZ2dlZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRyYWdnZWQpO1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgIGNvbnNvbGUubG9nKGRyYWdnZWQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWcoKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGhhbmRsZURyYWdTdGFydCk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBoYW5kbGVEcmFnRW5kKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBoYW5kbGVEcmFnT3Zlcik7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGhhbmRsZURyYWdFbnRlcik7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGhhbmRsZURyYWdMZWF2ZSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBoYW5kbGVEcm9wKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlRHJhZztcbiIsImltcG9ydCB7IHBsYXllcjFTZWxlY3Rpb24sIHBsYXllcjJTZWxlY3Rpb24gfSBmcm9tICcuL3V0aWwvY29udGFpbmVycyc7XG5pbXBvcnQgeyBoYXNTZWxlY3RlZCB9IGZyb20gJy4vdXRpbC9oYXNTZWxlY3RlZCc7XG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU2VsZWN0aW9uKCk6IHZvaWQge1xuICBjb25zdCBoYXNQbGF5ZXIxU2VsZWN0ZWQgPSBoYXNTZWxlY3RlZChwbGF5ZXIxU2VsZWN0aW9uKTtcbiAgY29uc3QgaGFzUGxheWVyMlNlbGVjdGVkID0gaGFzU2VsZWN0ZWQocGxheWVyMlNlbGVjdGlvbik7XG4gIGlmIChoYXNQbGF5ZXIxU2VsZWN0ZWQgJiYgaGFzUGxheWVyMlNlbGVjdGVkKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnZ2FtZS5odG1sJztcbiAgfSBlbHNlIHtcbiAgICBhbGVydCgnU2VsZWN0IGNoYXJhY3RlciBmaXJzdCwgdGhlbiBzdGFydCB0aGUgZ2FtZScpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBjaGFyYWN0ZXJMaXN0IH0gZnJvbSAnLi91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IHsgUmVzcG9uc2VPYmpUeXBlcyB9IGZyb20gJy4vdXRpbC90eXBlcyc7XG5pbXBvcnQgY3JlYXRlSW1hZ2UgZnJvbSAnLi91dGlsL2NyZWF0ZUltYWdlJztcblxuY29uc3QgQkFTRV9VUkw6IHN0cmluZyA9ICdodHRwczovL3d3dy5hbmFwaW9maWNlYW5kZmlyZS5jb20vYXBpL2NoYXJhY3RlcnMvJztcblxuZnVuY3Rpb24gZ2V0Q2hhcmFjdGVyQ2FyZHMoY2hhcmFjdGVySW5kZXg6IG51bWJlcltdKSB7XG4gIGNoYXJhY3RlckluZGV4Lm1hcChlbGVtZW50ID0+IHtcbiAgICBzaG93Q2hhcmFjdGVyKGVsZW1lbnQpO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2hvd0NoYXJhY3RlcihjaGFyYWN0ZXJOYW1lSW5kZXg6IG51bWJlcikge1xuICBjb25zdCB1cmwgPSBgJHtCQVNFX1VSTH0ke2NoYXJhY3Rlck5hbWVJbmRleH1gO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgIGNvbnN0IGRhdGE6IFJlc3BvbnNlT2JqVHlwZXMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICBjb25zdCBjb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21wb25lbnQuY2xhc3NOYW1lID0gJ2Jsb2NrX19jYXJkc19faXRlbSc7XG4gICAgY29tcG9uZW50LnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcbiAgICBjb21wb25lbnQuc2V0QXR0cmlidXRlKCdrZXknLCBgJHtjaGFyYWN0ZXJOYW1lSW5kZXh9YCk7XG4gICAgY29uc3QgY2FyZEltYWdlID0gYDxpbWcgZHJhZ2dhYmxlPVwiZmFsc2VcIiBzcmM9JHtjcmVhdGVJbWFnZShcbiAgICAgIGNoYXJhY3Rlck5hbWVJbmRleCxcbiAgICApfSBjbGFzcz1cImJsb2NrX19jYXJkc19faXRlbV9faW1hZ2VcIiBhbHQ9XCJHYW1lIGZpZ3VyZSBuby4ke2NoYXJhY3Rlck5hbWVJbmRleH1cIj5gO1xuICAgIGNvbnN0IGNhcmRUaXRsZSA9IGAgPGgzPiR7ZGF0YS5uYW1lfTwvaDM+YDtcbiAgICBjb25zdCBjYXJkU3ViVGl0bGUgPSBgPHNwYW4+JHtkYXRhLmJvcm59PC9zcGFuPmA7XG4gICAgY29tcG9uZW50LmlubmVySFRNTCA9IGNhcmRJbWFnZSArIGNhcmRUaXRsZSArIGNhcmRTdWJUaXRsZTtcblxuICAgIGNoYXJhY3Rlckxpc3QuYXBwZW5kKGNvbXBvbmVudCk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhyb3cgZXJyO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldENoYXJhY3RlckNhcmRzO1xuIiwiY29uc3Qgc2Ftd2VsbDogbnVtYmVyID0gOTU0O1xuY29uc3Qgam9uOiBudW1iZXIgPSA1ODM7XG5jb25zdCBjZXJzZWk6IG51bWJlciA9IDIzODtcbmNvbnN0IHR5cmlvbjogbnVtYmVyID0gMTA1MjtcbmNvbnN0IGRhZW5lcnlzOiBudW1iZXIgPSAyNzE7XG5cbmxldCBjaGFyYWN0ZXJJbmRleDogbnVtYmVyW10gPSBbc2Ftd2VsbCwgam9uLCBjZXJzZWksIHR5cmlvbiwgZGFlbmVyeXNdO1xuZXhwb3J0IGRlZmF1bHQgY2hhcmFjdGVySW5kZXg7XG4iLCIvL3BhZ2U6c2VsZWN0LXBsYXllclxuZXhwb3J0IGNvbnN0IGNoYXJhY3Rlckxpc3Q6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Wm9uZScpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjFTZWxlY3Rpb246IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZFpvbmUxJyk7XG5leHBvcnQgY29uc3QgcGxheWVyMlNlbGVjdGlvbjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kWm9uZTInKTtcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVNlbGVjdGlvbkJ0bjogSFRNTEFuY2hvckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3RhLS12YWxpZGF0aW9uJyk7XG5cbi8vcGFnZTpnYW1lXG5leHBvcnQgY29uc3QgYm9hcmQ6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVCb2FyZCcpO1xuZXhwb3J0IGNvbnN0IGRpY2VDb250YWluZXI6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpY2VJbWFnZScpO1xuZXhwb3J0IGNvbnN0IHN0YXJ0VGlsZTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGlsZS1pbmRleC0xJyk7XG5leHBvcnQgY29uc3QgcGxheWVyMUJ0bjogSFRNTEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLVBsYXllcjEnKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXIyQnRuOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tUGxheWVyMicpO1xuIiwiZnVuY3Rpb24gY3JlYXRlSW1hZ2UoaW5kZXg6IG51bWJlcikge1xuICByZXR1cm4gYGh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2Rua2ZnbXp5MS9pbWFnZS91cGxvYWQvdjE1NzU1NDk2NzQvZ2FtZS8ke2luZGV4fS5wbmdgO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVJbWFnZTtcbiIsImV4cG9ydCBjb25zdCBkaWNlSWNvbnMgPSB7XG4gIHBvaW50MTpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3pNMjU2IDIwNmE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHpcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50MjpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTMxNi45NyAzNi4wM0E1MCA1MCAwIDAgMSA0NDAgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0tMjY4IDI2OEE1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQzOlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptMzE2Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6TTI1NiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6TTEyMy40NyAzNDAuMDNBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50NDpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTQ4Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDE3MiAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bS0yNjggMjY4QTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDU6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem00OC45NyAzNi4wM0E1MCA1MCAwIDAgMSAxNzIgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3ek0yNTYgMjA2YTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwek0xMjMuNDcgMzQwLjAzQTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDY6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem00OC45NyAzNi4wM0E1MCA1MCAwIDAgMSAxNzIgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3ek0xMjIgMjA2YTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwem0yNjggMGE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHpNMTIzLjQ3IDM0MC4wM0E1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBkaWNlQXJyYXk6IHN0cmluZ1tdID0gW1xuICBkaWNlSWNvbnMucG9pbnQxLFxuICBkaWNlSWNvbnMucG9pbnQyLFxuICBkaWNlSWNvbnMucG9pbnQzLFxuICBkaWNlSWNvbnMucG9pbnQ0LFxuICBkaWNlSWNvbnMucG9pbnQ1LFxuICBkaWNlSWNvbnMucG9pbnQ2LFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpY2VJY29uKGRpY2VQb2ludDogbnVtYmVyKSB7XG4gIHJldHVybiBkaWNlQXJyYXlbZGljZVBvaW50IC0gMV07XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaGFzU2VsZWN0ZWQoY29udGFpbmVyOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gY29udGFpbmVyLmhhc0NoaWxkTm9kZXMoKTtcbn1cbiIsImNsYXNzIFN0b3JhZ2Uge1xuICBwcml2YXRlIHN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICB9XG5cbiAgZ2V0KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgfVxuXG4gIGRlbGV0ZShrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gIH1cblxuICBzZXRTZXJpYWxpemUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNldChrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gIH1cblxuICBnZXRVbnNlcmlhbGl6ZTxUPihrZXk6IHN0cmluZyk6IFQge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmdldChrZXkpO1xuXG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKSBhcyBUO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0b3JhZ2U7XG4iXX0=
