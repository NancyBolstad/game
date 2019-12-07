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
            var url,
              response,
              data,
              name_1,
              titles,
              aliases,
              component,
              cardImage,
              cardTitle,
              cardSubTitle,
              err_1;
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
                  (name_1 = data.name), (titles = data.titles), (aliases = data.aliases);
                  component = document.createElement('div');
                  component.className = 'row__item--card';
                  component.setAttribute('draggable', 'true');
                  component.setAttribute('key', '' + characterNameIndex);
                  cardImage =
                    '<img draggable="false" src=' +
                    createImage_1.default(characterNameIndex) +
                    ' class="item--card-image" alt="Game figure no.' +
                    characterNameIndex +
                    '">';
                  cardTitle = ' <h3>' + name_1 + '</h3>';
                  cardSubTitle = '<span>' + (titles[0] ? titles[0] : aliases[0]) + '</span>';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXgudHMiLCJzcmMvcGxheUdhbWUudHMiLCJzcmMvcmVuZGVyQ2hhcmFjdGVyTGlzdC50cyIsInNyYy9zY3JpcHRzL2JvYXJkLnRzIiwic3JjL3NjcmlwdHMvZ2FtZS50cyIsInNyYy9zY3JpcHRzL2hhbmRsZURyYWcudHMiLCJzcmMvc2NyaXB0cy9oYW5kbGVTZWxlY3Rpb24udHMiLCJzcmMvc2NyaXB0cy9zaG93Q2hhcmFjdGVyLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9jaGFyYWN0ZXJJbmRleC50cyIsInNyYy9zY3JpcHRzL3V0aWwvY29udGFpbmVycy50cyIsInNyYy9zY3JpcHRzL3V0aWwvY3JlYXRlSW1hZ2UudHMiLCJzcmMvc2NyaXB0cy91dGlsL2RpY2UudHMiLCJzcmMvc2NyaXB0cy91dGlsL2hhc1NlbGVjdGVkLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9zdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxrREFBNkM7QUFDN0MsNkRBQXdEO0FBQ3hELHVDQUFpQztBQUVwQixRQUFBLFdBQVcsR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztBQUN6Qyw2QkFBbUIsRUFBRSxDQUFDO0FBQ3RCLGtCQUFPLEVBQUUsQ0FBQzs7Ozs7QUNOVix5Q0FTeUI7QUFDekIsd0RBQXlGO0FBQ3pGLHVDQUE4RDtBQUM5RCxpQ0FBc0M7QUFFdEMsU0FBUyxRQUFRO0lBQ2YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLE1BQWM7SUFDbEMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFVLE1BQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3ZELENBQUM7QUFFRCxTQUFTLE9BQU87SUFDZCxJQUFNLE9BQU8sR0FBVyxtQkFBVyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNsRSxJQUFNLE9BQU8sR0FBVyxtQkFBVyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNsRSxJQUFJLGtCQUFLLElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxPQUFPLEVBQUU7UUFDdkMsbUJBQVcsQ0FBQyxrQkFBSyxDQUFDLENBQUM7UUFDbkIsUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzQixJQUFJLDBCQUFhLElBQUksSUFBSTtZQUFFLHFCQUFjLENBQUMsMEJBQWEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQ3RFO0FBQ0gsQ0FBQztBQUVELFNBQVMsUUFBUSxDQUFDLE9BQWUsRUFBRSxPQUFlO0lBQ2hELElBQU0sVUFBVSxHQUFnQixRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3hFLElBQUksYUFBYSxHQUFXLENBQUMsQ0FBQztJQUM5QixJQUFJLGFBQWEsR0FBVyxDQUFDLENBQUM7SUFDOUIsSUFBSSxhQUFhLEdBQVksSUFBSSxDQUFDO0lBRWxDLHNCQUFjLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BDLHNCQUFjLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BDLG1CQUFZLENBQUMsYUFBYSxFQUFFLHVCQUFVLEVBQUUsdUJBQVUsQ0FBQyxDQUFDO0lBRXBELHVCQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1RCx1QkFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFNUQsU0FBUyxjQUFjO1FBQ3JCLElBQU0sZ0JBQWdCLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDcEMscUJBQWMsQ0FBQywwQkFBYSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBb0IsZ0JBQWtCLENBQUMsQ0FBQztRQUNwRCxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsYUFBYSxJQUFJLGdCQUFnQixDQUFDO1FBRWxDLElBQUksYUFBYSxJQUFJLEVBQUUsRUFBRTtZQUN2QixJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQy9ELHNCQUFjLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZDLHVCQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUMzQix1QkFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQy9CLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBYyxhQUFlLENBQUMsQ0FBQztRQUM5RSxzQkFBYyxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV4QyxJQUFJLGdCQUFnQixLQUFLLENBQUMsRUFBRTtZQUMxQixtQkFBbUIsRUFBRSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOENBQThDLENBQUMsQ0FBQztZQUM1RCxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU07WUFDTCxtQkFBbUIsRUFBRSxDQUFDO1NBQ3ZCO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBaUIsYUFBZSxDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBaUIsYUFBZSxDQUFDLENBQUM7UUFDOUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixtQkFBWSxDQUFDLGFBQWEsRUFBRSx1QkFBVSxFQUFFLHVCQUFVLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsU0FBUyxjQUFjO1FBQ3JCLElBQU0sZ0JBQWdCLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDcEMscUJBQWMsQ0FBQywwQkFBYSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBb0IsZ0JBQWtCLENBQUMsQ0FBQztRQUNwRCxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsYUFBYSxJQUFJLGdCQUFnQixDQUFDO1FBRWxDLElBQUksYUFBYSxJQUFJLEVBQUUsRUFBRTtZQUN2QixJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQy9ELHNCQUFjLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZDLHVCQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUMzQix1QkFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQy9CLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuQixPQUFPLElBQUksQ0FBQztZQUNaLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFjLGFBQWUsQ0FBQyxDQUFDO1FBQzlFLHNCQUFjLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXhDLElBQUksZ0JBQWdCLEtBQUssQ0FBQyxFQUFFO1lBQzFCLG1CQUFtQixFQUFFLENBQUM7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO1lBQzVELE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLG1CQUFtQixFQUFFLENBQUM7U0FDdkI7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFpQixhQUFlLENBQUMsQ0FBQztRQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFpQixhQUFlLENBQUMsQ0FBQztRQUM5QyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLG1CQUFZLENBQUMsYUFBYSxFQUFFLHVCQUFVLEVBQUUsdUJBQVUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFDRCxTQUFTLG1CQUFtQjtRQUMxQixRQUFRLGFBQWEsRUFBRTtZQUNyQixLQUFLLGFBQUs7Z0JBQ1IsYUFBYSxJQUFJLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBa0QsYUFBZSxDQUFDLENBQUM7Z0JBQy9FLE1BQU07WUFDUixLQUFLLGFBQUs7Z0JBQ1IsYUFBYSxJQUFJLENBQUMsQ0FBQztnQkFDbkIsSUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBYyxhQUFlLENBQUMsQ0FBQztnQkFDOUUsc0JBQWMsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQWtELGFBQWUsQ0FBQyxDQUFDO2dCQUMvRSxNQUFNO1lBQ1IsS0FBSyxhQUFLO2dCQUNSLGFBQWEsSUFBSSxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQWtELGFBQWUsQ0FBQyxDQUFDO2dCQUMvRSxNQUFNO1lBQ1IsS0FBSyxhQUFLO2dCQUNSLGFBQWEsSUFBSSxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQWtELGFBQWUsQ0FBQyxDQUFDO2dCQUMvRSxNQUFNO1lBQ1IsS0FBSyxhQUFLO2dCQUNSLGFBQWEsSUFBSSxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQWtELGFBQWUsQ0FBQyxDQUFDO2dCQUMvRSxNQUFNO1lBQ1IsS0FBSyxhQUFLO2dCQUNSLGFBQWEsSUFBSSxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQWtELGFBQWUsQ0FBQyxDQUFDO2dCQUMvRSxNQUFNO1lBQ1I7Z0JBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBZ0MsYUFBZSxDQUFDLENBQUM7Z0JBQzdELE1BQU07U0FDVDtJQUNILENBQUM7SUFDRCxTQUFTLG1CQUFtQjtRQUMxQixRQUFRLGFBQWEsRUFBRTtZQUNyQixLQUFLLGFBQUs7Z0JBQ1IsYUFBYSxJQUFJLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBa0QsYUFBZSxDQUFDLENBQUM7Z0JBQy9FLE1BQU07WUFDUixLQUFLLGFBQUs7Z0JBQ1IsYUFBYSxJQUFJLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBa0QsYUFBZSxDQUFDLENBQUM7Z0JBQy9FLE1BQU07WUFDUixLQUFLLGFBQUs7Z0JBQ1IsYUFBYSxJQUFJLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBa0QsYUFBZSxDQUFDLENBQUM7Z0JBQy9FLE1BQU07WUFDUixLQUFLLGFBQUs7Z0JBQ1IsYUFBYSxJQUFJLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBa0QsYUFBZSxDQUFDLENBQUM7Z0JBQy9FLE1BQU07WUFDUixLQUFLLGFBQUs7Z0JBQ1IsYUFBYSxJQUFJLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBa0QsYUFBZSxDQUFDLENBQUM7Z0JBQy9FLE1BQU07WUFDUixLQUFLLGFBQUs7Z0JBQ1IsYUFBYSxJQUFJLENBQUMsQ0FBQztnQkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBa0QsYUFBZSxDQUFDLENBQUM7Z0JBQy9FLE1BQU07WUFDUjtnQkFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFnQyxhQUFlLENBQUMsQ0FBQztnQkFDN0QsTUFBTTtTQUNUO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFFRCxrQkFBZSxPQUFPLENBQUM7Ozs7O0FDakx2QixtREFBOEM7QUFDOUMsNkRBQTREO0FBQzVELHlEQUF3RDtBQUN4RCxnRUFBMkQ7QUFDM0Qsd0RBQWdGO0FBRWhGLFNBQVMsbUJBQW1CO0lBQzFCLElBQUksMEJBQWEsSUFBSSxJQUFJLEVBQUU7UUFDekIsdUJBQWlCLENBQUMsd0JBQWMsQ0FBQyxDQUFDO1FBQ2xDLG9CQUFVLEVBQUUsQ0FBQztRQUNiLElBQUksaUNBQW9CLElBQUksSUFBSTtZQUM5QixpQ0FBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsaUNBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUMxRTtBQUNILENBQUM7QUFFRCxrQkFBZSxtQkFBbUIsQ0FBQzs7Ozs7QUNmbkMsa0RBQTZDO0FBRWhDLFFBQUEsS0FBSyxHQUFXLENBQUMsQ0FBQztBQUNsQixRQUFBLEtBQUssR0FBVyxDQUFDLENBQUM7QUFDbEIsUUFBQSxLQUFLLEdBQVcsRUFBRSxDQUFDO0FBQ25CLFFBQUEsS0FBSyxHQUFXLEVBQUUsQ0FBQztBQUNuQixRQUFBLEtBQUssR0FBVyxFQUFFLENBQUM7QUFDbkIsUUFBQSxLQUFLLEdBQVcsRUFBRSxDQUFDO0FBRWhDLFNBQWdCLFdBQVcsQ0FBQyxTQUF5QjtJQUNuRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzVCLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsZ0JBQWMsQ0FBRyxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQztTQUN0QzthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1NBQ3ZDO1FBRUQsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDO1NBQ3ZDO1FBRUQsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM3QjtBQUNILENBQUM7QUFsQ0Qsa0NBa0NDO0FBRUQsU0FBZ0IsY0FBYyxDQUFDLFNBQXNCLEVBQUUsV0FBbUI7SUFDeEUsSUFBTSxNQUFNLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFL0QsTUFBTSxDQUFDLEdBQUcsR0FBRyxLQUFHLHFCQUFXLENBQUMsV0FBVyxDQUFHLENBQUM7SUFFM0MsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFFOUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsb0JBQWtCLFdBQWEsQ0FBQyxDQUFDO0lBRTVELE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFlBQVUsV0FBYSxDQUFDLENBQUM7SUFFbkQsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFO1FBQ3JCLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDL0I7QUFDSCxDQUFDO0FBZEQsd0NBY0M7Ozs7O0FDM0RELG9DQUF3QztBQUV4QyxTQUFnQixZQUFZLENBQzFCLFNBQWtCLEVBQ2xCLElBQXVCLEVBQ3ZCLElBQXVCO0lBRXZCLElBQUksU0FBUyxFQUFFO1FBQ2IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7S0FDdEI7U0FBTTtRQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQztBQVpELG9DQVlDO0FBRUQsU0FBZ0IsY0FBYyxDQUFDLFNBQXNCLEVBQUUsS0FBYTtJQUNsRSxTQUFTLENBQUMsU0FBUyxHQUFHLGdCQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzdDLENBQUM7QUFGRCx3Q0FFQzs7Ozs7QUNsQkQsa0NBQXVDO0FBQ3ZDLElBQUksT0FBb0IsQ0FBQztBQUV6QixTQUFTLGVBQWUsQ0FBQyxLQUFnQjtJQUN2QyxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQXFCLENBQUM7SUFDckMsS0FBSyxDQUFDLE1BQXNCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDdEQsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLEtBQWdCO0lBQ3BDLEtBQUssQ0FBQyxNQUFzQixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ25ELENBQUM7QUFFRCxTQUFTLGNBQWMsQ0FBQyxLQUFnQjtJQUN0QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDekIsQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLEtBQWdCO0lBQ3ZDLElBQUssS0FBSyxDQUFDLE1BQXNCLENBQUMsRUFBRSxLQUFLLFdBQVcsRUFBRTtRQUNuRCxLQUFLLENBQUMsTUFBc0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztLQUM1RDtJQUNELElBQUssS0FBSyxDQUFDLE1BQXNCLENBQUMsRUFBRSxLQUFLLFVBQVUsRUFBRTtRQUNsRCxLQUFLLENBQUMsTUFBc0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztLQUM1RDtJQUNELElBQUssS0FBSyxDQUFDLE1BQXNCLENBQUMsRUFBRSxLQUFLLFVBQVUsRUFBRTtRQUNsRCxLQUFLLENBQUMsTUFBc0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztLQUM1RDtBQUNILENBQUM7QUFDRCxTQUFTLGVBQWUsQ0FBQyxLQUFnQjtJQUN2QyxJQUFLLEtBQUssQ0FBQyxNQUFzQixDQUFDLEVBQUUsS0FBSyxXQUFXLEVBQUU7UUFDbkQsS0FBSyxDQUFDLE1BQXNCLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7S0FDckQ7SUFDRCxJQUFLLEtBQUssQ0FBQyxNQUFzQixDQUFDLEVBQUUsS0FBSyxVQUFVLEVBQUU7UUFDbEQsS0FBSyxDQUFDLE1BQXNCLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7S0FDckQ7SUFDRCxJQUFLLEtBQUssQ0FBQyxNQUFzQixDQUFDLEVBQUUsS0FBSyxVQUFVLEVBQUU7UUFDbEQsS0FBSyxDQUFDLE1BQXNCLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7S0FDckQ7QUFDSCxDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsS0FBZ0I7SUFFbEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBR3ZCLElBQUssS0FBSyxDQUFDLE1BQXNCLENBQUMsRUFBRSxJQUFJLFVBQVUsRUFBRTtRQUNsRCxJQUFLLEtBQUssQ0FBQyxNQUFzQixDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ2pELEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQ3ZDLEtBQUssQ0FBQyxNQUFzQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3BELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDQSxLQUFLLENBQUMsTUFBc0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNwRCxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QyxLQUFLLENBQUMsTUFBc0IsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkQsbUJBQVcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUcsQ0FBQyxDQUFDO0tBQ2xFO0lBRUQsSUFBSyxLQUFLLENBQUMsTUFBc0IsQ0FBQyxFQUFFLElBQUksVUFBVSxFQUFFO1FBQ2xELElBQUssS0FBSyxDQUFDLE1BQXNCLENBQUMsYUFBYSxFQUFFLEVBQUU7WUFDakQsS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDdkMsS0FBSyxDQUFDLE1BQXNCLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDcEQsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNBLEtBQUssQ0FBQyxNQUFzQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssQ0FBQyxNQUFzQixDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRCxtQkFBVyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBRyxDQUFDLENBQUM7S0FDbEU7SUFFRCxJQUFLLEtBQUssQ0FBQyxNQUFzQixDQUFDLEVBQUUsSUFBSSxXQUFXLEVBQUU7UUFDbEQsS0FBSyxDQUFDLE1BQXNCLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDcEQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsS0FBSyxDQUFDLE1BQXNCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDdEI7QUFDSCxDQUFDO0FBRUQsU0FBUyxVQUFVO0lBQ2pCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDeEQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNwRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ3RELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDeEQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUN4RCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFFRCxrQkFBZSxVQUFVLENBQUM7Ozs7O0FDckYxQixnREFBdUU7QUFDdkUsa0RBQWlEO0FBQ2pELFNBQWdCLGVBQWU7SUFDN0IsSUFBTSxrQkFBa0IsR0FBRyx5QkFBVyxDQUFDLDZCQUFnQixDQUFDLENBQUM7SUFDekQsSUFBTSxrQkFBa0IsR0FBRyx5QkFBVyxDQUFDLDZCQUFnQixDQUFDLENBQUM7SUFDekQsSUFBSSxrQkFBa0IsSUFBSSxrQkFBa0IsRUFBRTtRQUM1QyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7S0FDcEM7U0FBTTtRQUNMLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0tBQ3REO0FBQ0gsQ0FBQztBQVJELDBDQVFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVkQsZ0RBQWtEO0FBRWxELGtEQUE2QztBQUU3QyxJQUFNLFFBQVEsR0FBVyxtREFBbUQsQ0FBQztBQUU3RSxTQUFTLGlCQUFpQixDQUFDLGNBQXdCO0lBQ2pELGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPO1FBQ3hCLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFlLGFBQWEsQ0FBQyxrQkFBMEI7Ozs7OztvQkFDL0MsR0FBRyxHQUFHLEtBQUcsUUFBUSxHQUFHLGtCQUFvQixDQUFDOzs7O29CQUc1QixXQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBQTs7b0JBQTNCLFFBQVEsR0FBRyxTQUFnQjtvQkFDRixXQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQTs7b0JBQTlDLElBQUksR0FBcUIsU0FBcUI7b0JBQzVDLFNBQXlCLElBQUksS0FBekIsRUFBRSxNQUFNLEdBQWEsSUFBSSxPQUFqQixFQUFFLE9BQU8sR0FBSSxJQUFJLFFBQVIsQ0FBUztvQkFFaEMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2hELFNBQVMsQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUM7b0JBQ3hDLFNBQVMsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUM1QyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFHLGtCQUFvQixDQUFDLENBQUM7b0JBQ2pELFNBQVMsR0FBRyxrQ0FBOEIscUJBQVcsQ0FDekQsa0JBQWtCLENBQ25CLHlEQUFpRCxrQkFBa0IsUUFBSSxDQUFDO29CQUNuRSxTQUFTLEdBQUcsVUFBUSxNQUFJLFVBQU8sQ0FBQztvQkFDaEMsWUFBWSxHQUFHLFlBQVMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBUyxDQUFDO29CQUMxRSxTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsR0FBRyxTQUFTLEdBQUcsWUFBWSxDQUFDO29CQUUzRCwwQkFBYSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFFaEMsV0FBTyxJQUFJLEVBQUM7OztvQkFFWixNQUFNLEtBQUcsQ0FBQzs7Ozs7Q0FFYjtBQUVELGtCQUFlLGlCQUFpQixDQUFDOzs7OztBQ3ZDakMsSUFBTSxPQUFPLEdBQVcsR0FBRyxDQUFDO0FBQzVCLElBQU0sR0FBRyxHQUFXLEdBQUcsQ0FBQztBQUN4QixJQUFNLE1BQU0sR0FBVyxHQUFHLENBQUM7QUFDM0IsSUFBTSxNQUFNLEdBQVcsSUFBSSxDQUFDO0FBQzVCLElBQU0sUUFBUSxHQUFXLEdBQUcsQ0FBQztBQUU3QixJQUFJLGNBQWMsR0FBYSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN4RSxrQkFBZSxjQUFjLENBQUM7Ozs7O0FDTmpCLFFBQUEsYUFBYSxHQUFnQixRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2xFLFFBQUEsZ0JBQWdCLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEUsUUFBQSxnQkFBZ0IsR0FBZ0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwRSxRQUFBLG9CQUFvQixHQUFzQixRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFHckYsUUFBQSxLQUFLLEdBQW1CLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDN0QsUUFBQSxhQUFhLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEUsUUFBQSxTQUFTLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDakUsUUFBQSxVQUFVLEdBQXNCLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDdkUsUUFBQSxVQUFVLEdBQXNCLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7Ozs7O0FDWHBGLFNBQVMsV0FBVyxDQUFDLEtBQWE7SUFDaEMsT0FBTyx3RUFBc0UsS0FBSyxTQUFNLENBQUM7QUFDM0YsQ0FBQztBQUVELGtCQUFlLFdBQVcsQ0FBQzs7Ozs7QUNKZCxRQUFBLFNBQVMsR0FBRztJQUN2QixNQUFNLEVBQ0osNmRBQTZkO0lBQy9kLE1BQU0sRUFDSixxa0JBQXFrQjtJQUN2a0IsTUFBTSxFQUNKLHVuQkFBdW5CO0lBQ3puQixNQUFNLEVBQ0osOHNCQUE4c0I7SUFDaHRCLE1BQU0sRUFDSixnd0JBQWd3QjtJQUNsd0IsTUFBTSxFQUNKLDJ5QkFBMnlCO0NBQzl5QixDQUFDO0FBRVcsUUFBQSxTQUFTLEdBQWE7SUFDakMsaUJBQVMsQ0FBQyxNQUFNO0lBQ2hCLGlCQUFTLENBQUMsTUFBTTtJQUNoQixpQkFBUyxDQUFDLE1BQU07SUFDaEIsaUJBQVMsQ0FBQyxNQUFNO0lBQ2hCLGlCQUFTLENBQUMsTUFBTTtJQUNoQixpQkFBUyxDQUFDLE1BQU07Q0FDakIsQ0FBQztBQUVGLFNBQWdCLGNBQWMsQ0FBQyxTQUFpQjtJQUM5QyxPQUFPLGlCQUFTLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFGRCx3Q0FFQzs7Ozs7QUMxQkQsU0FBZ0IsV0FBVyxDQUFDLFNBQXNCO0lBQ2hELE9BQU8sU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ25DLENBQUM7QUFGRCxrQ0FFQzs7Ozs7QUNGRDtJQUFBO1FBQ1UsWUFBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUEyQnhDLENBQUM7SUF6QkMscUJBQUcsR0FBSCxVQUFJLEdBQVcsRUFBRSxLQUFhO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQscUJBQUcsR0FBSCxVQUFJLEdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCx3QkFBTSxHQUFOLFVBQU8sR0FBVztRQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsOEJBQVksR0FBWixVQUFhLEdBQVcsRUFBRSxLQUFVO1FBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsZ0NBQWMsR0FBZCxVQUFrQixHQUFXO1FBQzNCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFM0IsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFNLENBQUM7SUFDL0IsQ0FBQztJQUNILGNBQUM7QUFBRCxDQTVCQSxBQTRCQyxJQUFBO0FBRUQsa0JBQWUsT0FBTyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9zY3JpcHRzL3V0aWwvc3RvcmFnZSc7XG5pbXBvcnQgcmVuZGVyQ2hhcmFjdGVyTGlzdCBmcm9tICcuL3JlbmRlckNoYXJhY3Rlckxpc3QnO1xuaW1wb3J0IHJ1bkdhbWUgZnJvbSAnLi9wbGF5R2FtZSc7XG5cbmV4cG9ydCBjb25zdCBnYW1lU3RvcmFnZSA9IG5ldyBTdG9yYWdlKCk7XG5yZW5kZXJDaGFyYWN0ZXJMaXN0KCk7XG5ydW5HYW1lKCk7XG4iLCJpbXBvcnQge1xuICBjcmVhdGVCb2FyZCxcbiAgZGlzcGxheVBsYXllcnMsXG4gIHRyYXAxLFxuICB0cmFwMixcbiAgdHJhcDMsXG4gIHRyYXA0LFxuICB0cmFwNSxcbiAgdHJhcDYsXG59IGZyb20gJy4vc2NyaXB0cy9ib2FyZCc7XG5pbXBvcnQgeyBib2FyZCwgZGljZUNvbnRhaW5lciwgcGxheWVyMUJ0biwgcGxheWVyMkJ0biB9IGZyb20gJy4vc2NyaXB0cy91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IHsgdXBkYXRlQnV0dG9uLCBzaG93RGljZVJlc3VsdCB9IGZyb20gJy4vc2NyaXB0cy9nYW1lJztcbmltcG9ydCB7IGdhbWVTdG9yYWdlIH0gZnJvbSAnLi9pbmRleCc7XG5cbmZ1bmN0aW9uIHJvbGxEaWNlKCk6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSArIDE7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVBsYXllcihwbGF5ZXI6IG51bWJlcik6IHZvaWQge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZmlndXJlLSR7cGxheWVyfWApLnJlbW92ZSgpO1xufVxuXG5mdW5jdGlvbiBydW5HYW1lKCk6IHZvaWQge1xuICBjb25zdCBwbGF5ZXIxOiBudW1iZXIgPSBnYW1lU3RvcmFnZS5nZXRVbnNlcmlhbGl6ZSgncGxheWVyMU5hbWUnKTtcbiAgY29uc3QgcGxheWVyMjogbnVtYmVyID0gZ2FtZVN0b3JhZ2UuZ2V0VW5zZXJpYWxpemUoJ3BsYXllcjJOYW1lJyk7XG4gIGlmIChib2FyZCAhPSBudWxsICYmIHBsYXllcjEgJiYgcGxheWVyMikge1xuICAgIGNyZWF0ZUJvYXJkKGJvYXJkKTtcbiAgICBwbGF5R2FtZShwbGF5ZXIxLCBwbGF5ZXIyKTtcbiAgICBpZiAoZGljZUNvbnRhaW5lciAhPSBudWxsKSBzaG93RGljZVJlc3VsdChkaWNlQ29udGFpbmVyLCByb2xsRGljZSgpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwbGF5R2FtZShwbGF5ZXIxOiBudW1iZXIsIHBsYXllcjI6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBzdGFydFBsYWNlOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aWxlLWluZGV4LTEnKTtcbiAgbGV0IHBsYXllcjFTdGF0dXM6IG51bWJlciA9IDE7XG4gIGxldCBwbGF5ZXIyU3RhdHVzOiBudW1iZXIgPSAxO1xuICBsZXQgaXNQbGF5ZXIxVHVybjogYm9vbGVhbiA9IHRydWU7XG5cbiAgZGlzcGxheVBsYXllcnMoc3RhcnRQbGFjZSwgcGxheWVyMSk7XG4gIGRpc3BsYXlQbGF5ZXJzKHN0YXJ0UGxhY2UsIHBsYXllcjIpO1xuICB1cGRhdGVCdXR0b24oaXNQbGF5ZXIxVHVybiwgcGxheWVyMUJ0biwgcGxheWVyMkJ0bik7XG5cbiAgcGxheWVyMUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1blBsYXllcjFUdXJuLCBmYWxzZSk7XG4gIHBsYXllcjJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW5QbGF5ZXIyVHVybiwgZmFsc2UpO1xuXG4gIGZ1bmN0aW9uIHJ1blBsYXllcjFUdXJuKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnREaWNlUG9pbnQgPSByb2xsRGljZSgpO1xuICAgIHNob3dEaWNlUmVzdWx0KGRpY2VDb250YWluZXIsIGN1cnJlbnREaWNlUG9pbnQpO1xuICAgIGNvbnNvbGUubG9nKGBQbGF5ZXIgMSByb2xsZWQ6ICR7Y3VycmVudERpY2VQb2ludH1gKTtcbiAgICByZW1vdmVQbGF5ZXIocGxheWVyMSk7XG4gICAgcGxheWVyMVN0YXR1cyArPSBjdXJyZW50RGljZVBvaW50O1xuXG4gICAgaWYgKHBsYXllcjFTdGF0dXMgPj0gMzApIHtcbiAgICAgIGNvbnN0IGZpbmFsUG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGlsZS1pbmRleC0zMCcpO1xuICAgICAgZGlzcGxheVBsYXllcnMoZmluYWxQb3NpdGlvbiwgcGxheWVyMSk7XG4gICAgICBwbGF5ZXIxQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIHBsYXllcjJCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5sb2coJ1BsYXllciAxIHdpbm5lcicpO1xuICAgICAgYWxlcnQoJ1dpbm5lcicpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlUG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGlsZS1pbmRleC0ke3BsYXllcjFTdGF0dXN9YCk7XG4gICAgZGlzcGxheVBsYXllcnModXBkYXRlUG9zaXRpb24sIHBsYXllcjEpO1xuXG4gICAgaWYgKGN1cnJlbnREaWNlUG9pbnQgPT09IDYpIHtcbiAgICAgIHVwZGF0ZVBsYXllcjFTdGF0dXMoKTsgLy9jaGVja1VwZGF0ZVxuICAgICAgY29uc29sZS5sb2coJ1NpbmNlIHlvdSByb2xsZWQgNiwgeW91IGdvdCBhIEJvbnVzIG1vdmVtZW50Jyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlUGxheWVyMVN0YXR1cygpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgcGxheWVyMVN0YXR1czoke3BsYXllcjFTdGF0dXN9YCk7XG4gICAgY29uc29sZS5sb2coYHBsYXllcjJTdGF0dXM6JHtwbGF5ZXIyU3RhdHVzfWApO1xuICAgIGlzUGxheWVyMVR1cm4gPSBmYWxzZTtcbiAgICB1cGRhdGVCdXR0b24oaXNQbGF5ZXIxVHVybiwgcGxheWVyMUJ0biwgcGxheWVyMkJ0bik7XG4gIH1cblxuICBmdW5jdGlvbiBydW5QbGF5ZXIyVHVybigpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50RGljZVBvaW50ID0gcm9sbERpY2UoKTtcbiAgICBzaG93RGljZVJlc3VsdChkaWNlQ29udGFpbmVyLCBjdXJyZW50RGljZVBvaW50KTtcbiAgICBjb25zb2xlLmxvZyhgUGxheWVyIDIgcm9sbGVkOiAke2N1cnJlbnREaWNlUG9pbnR9YCk7XG4gICAgcmVtb3ZlUGxheWVyKHBsYXllcjIpO1xuICAgIHBsYXllcjFTdGF0dXMgKz0gY3VycmVudERpY2VQb2ludDtcblxuICAgIGlmIChwbGF5ZXIyU3RhdHVzID49IDMwKSB7XG4gICAgICBjb25zdCBmaW5hbFBvc2l0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbGUtaW5kZXgtMzAnKTtcbiAgICAgIGRpc3BsYXlQbGF5ZXJzKGZpbmFsUG9zaXRpb24sIHBsYXllcjIpO1xuICAgICAgcGxheWVyMUJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICBwbGF5ZXIyQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUubG9nKCdQbGF5ZXIgMiB3aW5uZXInKTtcbiAgICAgIGFsZXJ0KCdXaW5uZXIhISEnKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlUG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGlsZS1pbmRleC0ke3BsYXllcjFTdGF0dXN9YCk7XG4gICAgZGlzcGxheVBsYXllcnModXBkYXRlUG9zaXRpb24sIHBsYXllcjIpO1xuXG4gICAgaWYgKGN1cnJlbnREaWNlUG9pbnQgPT09IDYpIHtcbiAgICAgIHVwZGF0ZVBsYXllcjJTdGF0dXMoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdTaW5jZSB5b3Ugcm9sbGVkIDYsIHlvdSBnb3QgYSBCb251cyBtb3ZlbWVudCcpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVwZGF0ZVBsYXllcjJTdGF0dXMoKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYHBsYXllcjFTdGF0dXM6JHtwbGF5ZXIxU3RhdHVzfWApO1xuICAgIGNvbnNvbGUubG9nKGBwbGF5ZXIyU3RhdHVzOiR7cGxheWVyMlN0YXR1c31gKTtcbiAgICBpc1BsYXllcjFUdXJuID0gdHJ1ZTtcbiAgICB1cGRhdGVCdXR0b24oaXNQbGF5ZXIxVHVybiwgcGxheWVyMUJ0biwgcGxheWVyMkJ0bik7XG4gIH1cbiAgZnVuY3Rpb24gdXBkYXRlUGxheWVyMlN0YXR1cygpIHtcbiAgICBzd2l0Y2ggKHBsYXllcjJTdGF0dXMpIHtcbiAgICAgIGNhc2UgdHJhcDE6XG4gICAgICAgIHBsYXllcjJTdGF0dXMgLT0gMTtcbiAgICAgICAgY29uc29sZS5sb2coYFRyYXAgMTogbW92ZSBiYWNrIDEgc3RlcHMgPj4+Q3VycmVudCBwbGF5ZXIgMjogJHtwbGF5ZXIyU3RhdHVzfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJhcDI6XG4gICAgICAgIHBsYXllcjJTdGF0dXMgLT0gMjtcbiAgICAgICAgY29uc3QgdXBkYXRlUG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGlsZS1pbmRleC0ke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICAgIGRpc3BsYXlQbGF5ZXJzKHVwZGF0ZVBvc2l0aW9uLCBwbGF5ZXIyKTtcbiAgICAgICAgY29uc29sZS5sb2coYFRyYXAgMjogbW92ZSBiYWNrIDIgc3RlcHMgPj4+Q3VycmVudCBwbGF5ZXIgMjogJHtwbGF5ZXIyU3RhdHVzfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJhcDM6XG4gICAgICAgIHBsYXllcjJTdGF0dXMgLT0gMztcbiAgICAgICAgY29uc29sZS5sb2coYFRyYXAgMzogbW92ZSBiYWNrIDMgc3RlcHMgPj4+Q3VycmVudCBwbGF5ZXIgMjogJHtwbGF5ZXIyU3RhdHVzfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJhcDQ6XG4gICAgICAgIHBsYXllcjJTdGF0dXMgLT0gNDtcbiAgICAgICAgY29uc29sZS5sb2coYFRyYXAgNDogbW92ZSBiYWNrIDQgc3RlcHMgPj4+Q3VycmVudCBwbGF5ZXIgMjogJHtwbGF5ZXIyU3RhdHVzfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJhcDU6XG4gICAgICAgIHBsYXllcjJTdGF0dXMgLT0gNTtcbiAgICAgICAgY29uc29sZS5sb2coYFRyYXAgNTogbW92ZSBiYWNrIDUgc3RlcHMgPj4+Q3VycmVudCBwbGF5ZXIgMjogJHtwbGF5ZXIyU3RhdHVzfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHJhcDY6XG4gICAgICAgIHBsYXllcjJTdGF0dXMgLT0gNjtcbiAgICAgICAgY29uc29sZS5sb2coYFRyYXAgNjogbW92ZSBiYWNrIDYgc3RlcHMgPj4+Q3VycmVudCBwbGF5ZXIgMjogJHtwbGF5ZXIyU3RhdHVzfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUubG9nKGBOb3JtYWw6ID4+PkN1cnJlbnQgcGxheWVyIDI6ICR7cGxheWVyMlN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHVwZGF0ZVBsYXllcjFTdGF0dXMoKSB7XG4gICAgc3dpdGNoIChwbGF5ZXIxU3RhdHVzKSB7XG4gICAgICBjYXNlIHRyYXAxOlxuICAgICAgICBwbGF5ZXIxU3RhdHVzIC09IDE7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDE6IG1vdmUgYmFjayAxIHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDE6ICR7cGxheWVyMVN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRyYXAyOlxuICAgICAgICBwbGF5ZXIxU3RhdHVzIC09IDI7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDI6IG1vdmUgYmFjayAyIHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDE6ICR7cGxheWVyMVN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRyYXAzOlxuICAgICAgICBwbGF5ZXIxU3RhdHVzIC09IDM7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDM6IG1vdmUgYmFjayAzIHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDE6ICR7cGxheWVyMVN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRyYXA0OlxuICAgICAgICBwbGF5ZXIxU3RhdHVzIC09IDQ7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDQ6IG1vdmUgYmFjayA0IHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDE6ICR7cGxheWVyMVN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRyYXA1OlxuICAgICAgICBwbGF5ZXIxU3RhdHVzIC09IDU7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDU6IG1vdmUgYmFjayA1IHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDE6ICR7cGxheWVyMVN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRyYXA2OlxuICAgICAgICBwbGF5ZXIxU3RhdHVzIC09IDY7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUcmFwIDY6IG1vdmUgYmFjayA2IHN0ZXBzID4+PkN1cnJlbnQgcGxheWVyIDE6ICR7cGxheWVyMVN0YXR1c31gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZyhgTm9ybWFsOiA+Pj5DdXJyZW50IHBsYXllciAxOiAke3BsYXllcjFTdGF0dXN9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBydW5HYW1lO1xuIiwiaW1wb3J0IGhhbmRsZURyYWcgZnJvbSAnLi9zY3JpcHRzL2hhbmRsZURyYWcnO1xuaW1wb3J0IHsgaGFuZGxlU2VsZWN0aW9uIH0gZnJvbSAnLi9zY3JpcHRzL2hhbmRsZVNlbGVjdGlvbic7XG5pbXBvcnQgZ2V0Q2hhcmFjdGVyQ2FyZHMgZnJvbSAnLi9zY3JpcHRzL3Nob3dDaGFyYWN0ZXInO1xuaW1wb3J0IGNoYXJhY3RlckluZGV4IGZyb20gJy4vc2NyaXB0cy91dGlsL2NoYXJhY3RlckluZGV4JztcbmltcG9ydCB7IGNoYXJhY3Rlckxpc3QsIHZhbGlkYXRlU2VsZWN0aW9uQnRuIH0gZnJvbSAnLi9zY3JpcHRzL3V0aWwvY29udGFpbmVycyc7XG5cbmZ1bmN0aW9uIHJlbmRlckNoYXJhY3Rlckxpc3QoKTogdm9pZCB7XG4gIGlmIChjaGFyYWN0ZXJMaXN0ICE9IG51bGwpIHtcbiAgICBnZXRDaGFyYWN0ZXJDYXJkcyhjaGFyYWN0ZXJJbmRleCk7XG4gICAgaGFuZGxlRHJhZygpO1xuICAgIGlmICh2YWxpZGF0ZVNlbGVjdGlvbkJ0biAhPSBudWxsKVxuICAgICAgdmFsaWRhdGVTZWxlY3Rpb25CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVTZWxlY3Rpb24sIGZhbHNlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCByZW5kZXJDaGFyYWN0ZXJMaXN0O1xuIiwiaW1wb3J0IGNyZWF0ZUltYWdlIGZyb20gJy4vdXRpbC9jcmVhdGVJbWFnZSc7XG5cbmV4cG9ydCBjb25zdCB0cmFwMTogbnVtYmVyID0gNDtcbmV4cG9ydCBjb25zdCB0cmFwMjogbnVtYmVyID0gNztcbmV4cG9ydCBjb25zdCB0cmFwMzogbnVtYmVyID0gMTM7XG5leHBvcnQgY29uc3QgdHJhcDQ6IG51bWJlciA9IDE2O1xuZXhwb3J0IGNvbnN0IHRyYXA1OiBudW1iZXIgPSAyMztcbmV4cG9ydCBjb25zdCB0cmFwNjogbnVtYmVyID0gMjk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCb2FyZChjb250YWluZXI6IEhUTUxEaXZFbGVtZW50KTogdm9pZCB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDw9IDMwOyBpKyspIHtcbiAgICBjb25zdCB0aWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGlsZS5jbGFzc05hbWUgPSBgdGlsZWA7XG4gICAgdGlsZS5zZXRBdHRyaWJ1dGUoJ2lkJywgYHRpbGUtaW5kZXgtJHtpfWApO1xuXG4gICAgaWYgKGkgJSAyICE9PSAwKSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdicm93bic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICB9XG5cbiAgICBpZiAoaSA9PSA0KSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2UnO1xuICAgIH1cbiAgICBpZiAoaSA9PSA3KSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2UnO1xuICAgIH1cbiAgICBpZiAoaSA9PSAxMykge1xuICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnb3JhbmdlJztcbiAgICB9XG4gICAgaWYgKGkgPT0gMTYpIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ29yYW5nZSc7XG4gICAgfVxuICAgIGlmIChpID09IDIzKSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2UnO1xuICAgIH1cblxuICAgIGlmIChpID09IDI5KSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdvcmFuZ2UnO1xuICAgIH1cblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aWxlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVBsYXllcnMoY29udGFpbmVyOiBIVE1MRWxlbWVudCwgcGxheWVySW5kZXg6IG51bWJlcikge1xuICBjb25zdCBwbGF5ZXI6IEhUTUxJbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICBwbGF5ZXIuc3JjID0gYCR7Y3JlYXRlSW1hZ2UocGxheWVySW5kZXgpfWA7XG5cbiAgcGxheWVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYm9hcmRfX2ZpZ3VyZScpO1xuXG4gIHBsYXllci5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGBHYW1lIGZpZ3VyZSBuby4ke3BsYXllckluZGV4fWApO1xuXG4gIHBsYXllci5zZXRBdHRyaWJ1dGUoJ2lkJywgYGZpZ3VyZS0ke3BsYXllckluZGV4fWApO1xuXG4gIGlmIChjb250YWluZXIgIT0gbnVsbCkge1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXIpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBkaWNlQXJyYXkgfSBmcm9tICcuL3V0aWwvZGljZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVCdXR0b24oXG4gIGNvbmRpdGlvbjogYm9vbGVhbixcbiAgYnRuMTogSFRNTEJ1dHRvbkVsZW1lbnQsXG4gIGJ0bjI6IEhUTUxCdXR0b25FbGVtZW50LFxuKTogdm9pZCB7XG4gIGlmIChjb25kaXRpb24pIHtcbiAgICBidG4xLmRpc2FibGVkID0gZmFsc2U7XG4gICAgYnRuMi5kaXNhYmxlZCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgYnRuMi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIGJ0bjEuZGlzYWJsZWQgPSB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RGljZVJlc3VsdChjb250YWluZXI6IEhUTUxFbGVtZW50LCBwb2ludDogbnVtYmVyKSB7XG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBkaWNlQXJyYXlbcG9pbnQgLSAxXTtcbn1cbiIsImltcG9ydCB7IGdhbWVTdG9yYWdlIH0gZnJvbSAnLi4vaW5kZXgnO1xubGV0IGRyYWdnZWQ6IEhUTUxFbGVtZW50O1xuXG5mdW5jdGlvbiBoYW5kbGVEcmFnU3RhcnQoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICBkcmFnZ2VkID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWdFbmQoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5vcGFjaXR5ID0gJyc7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWdPdmVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhZ0VudGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnc3RhcnRab25lJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnIzc0NTYyNSc7XG4gIH1cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnZW5kWm9uZTEnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcjNzQ1NjI1JztcbiAgfVxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdlbmRab25lMicpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyM3NDU2MjUnO1xuICB9XG59XG5mdW5jdGlvbiBoYW5kbGVEcmFnTGVhdmUoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdzdGFydFpvbmUnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICB9XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ2VuZFpvbmUxJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgfVxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdlbmRab25lMicpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJvcChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIC8vIHByZXZlbnQgZGVmYXVsdCBhY3Rpb24gKG9wZW4gYXMgbGluayBmb3Igc29tZSBlbGVtZW50cylcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAvLyBtb3ZlIGRyYWdnZWQgZWxlbSB0byB0aGUgc2VsZWN0ZWQgZHJvcCB0YXJnZXRcbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09ICdlbmRab25lMScpIHtcbiAgICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICBhbGVydCgnT25seSBvbmUgY2hhcmFjdGVyIGlzIGFsbG93ZWQuJyk7XG4gICAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGRyYWdnZWQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkcmFnZ2VkKTtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5hcHBlbmRDaGlsZChkcmFnZ2VkKTtcbiAgICBnYW1lU3RvcmFnZS5zZXQoJ3BsYXllcjFOYW1lJywgYCR7ZHJhZ2dlZC5nZXRBdHRyaWJ1dGUoJ2tleScpfWApO1xuICB9XG5cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09ICdlbmRab25lMicpIHtcbiAgICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICBhbGVydCgnT25seSBvbmUgY2hhcmFjdGVyIGlzIGFsbG93ZWQuJyk7XG4gICAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGRyYWdnZWQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkcmFnZ2VkKTtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5hcHBlbmRDaGlsZChkcmFnZ2VkKTtcbiAgICBnYW1lU3RvcmFnZS5zZXQoJ3BsYXllcjJOYW1lJywgYCR7ZHJhZ2dlZC5nZXRBdHRyaWJ1dGUoJ2tleScpfWApO1xuICB9XG5cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09ICdzdGFydFpvbmUnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGRyYWdnZWQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkcmFnZ2VkKTtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5hcHBlbmRDaGlsZChkcmFnZ2VkKTtcbiAgICBjb25zb2xlLmxvZyhkcmFnZ2VkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmFnKCkge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBoYW5kbGVEcmFnU3RhcnQpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgaGFuZGxlRHJhZ0VuZCk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgaGFuZGxlRHJhZ092ZXIpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBoYW5kbGVEcmFnRW50ZXIpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBoYW5kbGVEcmFnTGVhdmUpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgaGFuZGxlRHJvcCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZURyYWc7XG4iLCJpbXBvcnQgeyBwbGF5ZXIxU2VsZWN0aW9uLCBwbGF5ZXIyU2VsZWN0aW9uIH0gZnJvbSAnLi91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IHsgaGFzU2VsZWN0ZWQgfSBmcm9tICcuL3V0aWwvaGFzU2VsZWN0ZWQnO1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVNlbGVjdGlvbigpOiB2b2lkIHtcbiAgY29uc3QgaGFzUGxheWVyMVNlbGVjdGVkID0gaGFzU2VsZWN0ZWQocGxheWVyMVNlbGVjdGlvbik7XG4gIGNvbnN0IGhhc1BsYXllcjJTZWxlY3RlZCA9IGhhc1NlbGVjdGVkKHBsYXllcjJTZWxlY3Rpb24pO1xuICBpZiAoaGFzUGxheWVyMVNlbGVjdGVkICYmIGhhc1BsYXllcjJTZWxlY3RlZCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2dhbWUuaHRtbCc7XG4gIH0gZWxzZSB7XG4gICAgYWxlcnQoJ1NlbGVjdCBjaGFyYWN0ZXIgZmlyc3QsIHRoZW4gc3RhcnQgdGhlIGdhbWUnKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgY2hhcmFjdGVyTGlzdCB9IGZyb20gJy4vdXRpbC9jb250YWluZXJzJztcbmltcG9ydCB7IFJlc3BvbnNlT2JqVHlwZXMgfSBmcm9tICcuL3V0aWwvdHlwZXMnO1xuaW1wb3J0IGNyZWF0ZUltYWdlIGZyb20gJy4vdXRpbC9jcmVhdGVJbWFnZSc7XG5cbmNvbnN0IEJBU0VfVVJMOiBzdHJpbmcgPSAnaHR0cHM6Ly93d3cuYW5hcGlvZmljZWFuZGZpcmUuY29tL2FwaS9jaGFyYWN0ZXJzLyc7XG5cbmZ1bmN0aW9uIGdldENoYXJhY3RlckNhcmRzKGNoYXJhY3RlckluZGV4OiBudW1iZXJbXSkge1xuICBjaGFyYWN0ZXJJbmRleC5tYXAoZWxlbWVudCA9PiB7XG4gICAgc2hvd0NoYXJhY3RlcihlbGVtZW50KTtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNob3dDaGFyYWN0ZXIoY2hhcmFjdGVyTmFtZUluZGV4OiBudW1iZXIpIHtcbiAgY29uc3QgdXJsID0gYCR7QkFTRV9VUkx9JHtjaGFyYWN0ZXJOYW1lSW5kZXh9YDtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICBjb25zdCBkYXRhOiBSZXNwb25zZU9ialR5cGVzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnN0IHsgbmFtZSwgdGl0bGVzLCBhbGlhc2VzfSA9IGRhdGE7XG5cbiAgICBjb25zdCBjb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21wb25lbnQuY2xhc3NOYW1lID0gJ3Jvd19faXRlbS0tY2FyZCc7XG4gICAgY29tcG9uZW50LnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcbiAgICBjb21wb25lbnQuc2V0QXR0cmlidXRlKCdrZXknLCBgJHtjaGFyYWN0ZXJOYW1lSW5kZXh9YCk7XG4gICAgY29uc3QgY2FyZEltYWdlID0gYDxpbWcgZHJhZ2dhYmxlPVwiZmFsc2VcIiBzcmM9JHtjcmVhdGVJbWFnZShcbiAgICAgIGNoYXJhY3Rlck5hbWVJbmRleCxcbiAgICApfSBjbGFzcz1cIml0ZW0tLWNhcmQtaW1hZ2VcIiBhbHQ9XCJHYW1lIGZpZ3VyZSBuby4ke2NoYXJhY3Rlck5hbWVJbmRleH1cIj5gO1xuICAgIGNvbnN0IGNhcmRUaXRsZSA9IGAgPGgzPiR7bmFtZX08L2gzPmA7XG4gICAgY29uc3QgY2FyZFN1YlRpdGxlID0gYDxzcGFuPiR7dGl0bGVzWzBdID8gdGl0bGVzWzBdIDogYWxpYXNlc1swXX08L3NwYW4+YDtcbiAgICBjb21wb25lbnQuaW5uZXJIVE1MID0gY2FyZEltYWdlICsgY2FyZFRpdGxlICsgY2FyZFN1YlRpdGxlO1xuXG4gICAgY2hhcmFjdGVyTGlzdC5hcHBlbmQoY29tcG9uZW50KTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0Q2hhcmFjdGVyQ2FyZHM7XG4iLCJjb25zdCBzYW13ZWxsOiBudW1iZXIgPSA5NTQ7XG5jb25zdCBqb246IG51bWJlciA9IDU4MztcbmNvbnN0IGNlcnNlaTogbnVtYmVyID0gMjM4O1xuY29uc3QgdHlyaW9uOiBudW1iZXIgPSAxMDUyO1xuY29uc3QgZGFlbmVyeXM6IG51bWJlciA9IDI3MTtcblxubGV0IGNoYXJhY3RlckluZGV4OiBudW1iZXJbXSA9IFtzYW13ZWxsLCBqb24sIGNlcnNlaSwgdHlyaW9uLCBkYWVuZXJ5c107XG5leHBvcnQgZGVmYXVsdCBjaGFyYWN0ZXJJbmRleDtcbiIsIi8vcGFnZTpzZWxlY3QtcGxheWVyXG5leHBvcnQgY29uc3QgY2hhcmFjdGVyTGlzdDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnRab25lJyk7XG5leHBvcnQgY29uc3QgcGxheWVyMVNlbGVjdGlvbjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kWm9uZTEnKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXIyU2VsZWN0aW9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmRab25lMicpO1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlU2VsZWN0aW9uQnRuOiBIVE1MQW5jaG9yRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdGEtLXZhbGlkYXRpb24nKTtcblxuLy9wYWdlOmdhbWVcbmV4cG9ydCBjb25zdCBib2FyZDogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZUJvYXJkJyk7XG5leHBvcnQgY29uc3QgZGljZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGljZUltYWdlJyk7XG5leHBvcnQgY29uc3Qgc3RhcnRUaWxlOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aWxlLWluZGV4LTEnKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXIxQnRuOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tUGxheWVyMScpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjJCdG46IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1QbGF5ZXIyJyk7XG4iLCJmdW5jdGlvbiBjcmVhdGVJbWFnZShpbmRleDogbnVtYmVyKSB7XG4gIHJldHVybiBgaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZG5rZmdtenkxL2ltYWdlL3VwbG9hZC92MTU3NTU0OTY3NC9nYW1lLyR7aW5kZXh9LnBuZ2A7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUltYWdlO1xuIiwiZXhwb3J0IGNvbnN0IGRpY2VJY29ucyA9IHtcbiAgcG9pbnQxOlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzek0yNTYgMjA2YTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwelwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQyOlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptMzE2Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bS0yNjggMjY4QTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDM6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem0zMTYuOTcgMzYuMDNBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pNMjU2IDIwNmE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHpNMTIzLjQ3IDM0MC4wM0E1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQ0OlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptNDguOTcgMzYuMDNBNTAgNTAgMCAwIDEgMTcyIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptLTI2OCAyNjhBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50NTpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTQ4Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDE3MiAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6TTI1NiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6TTEyMy40NyAzNDAuMDNBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50NjpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTQ4Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDE3MiAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6TTEyMiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6bTI2OCAwYTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwek0xMjMuNDcgMzQwLjAzQTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxufTtcblxuZXhwb3J0IGNvbnN0IGRpY2VBcnJheTogc3RyaW5nW10gPSBbXG4gIGRpY2VJY29ucy5wb2ludDEsXG4gIGRpY2VJY29ucy5wb2ludDIsXG4gIGRpY2VJY29ucy5wb2ludDMsXG4gIGRpY2VJY29ucy5wb2ludDQsXG4gIGRpY2VJY29ucy5wb2ludDUsXG4gIGRpY2VJY29ucy5wb2ludDYsXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGljZUljb24oZGljZVBvaW50OiBudW1iZXIpIHtcbiAgcmV0dXJuIGRpY2VBcnJheVtkaWNlUG9pbnQgLSAxXTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBoYXNTZWxlY3RlZChjb250YWluZXI6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gIHJldHVybiBjb250YWluZXIuaGFzQ2hpbGROb2RlcygpO1xufVxuIiwiY2xhc3MgU3RvcmFnZSB7XG4gIHByaXZhdGUgc3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG5cbiAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gIH1cblxuICBnZXQoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICB9XG5cbiAgZGVsZXRlKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfVxuXG4gIHNldFNlcmlhbGl6ZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuc2V0KGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgfVxuXG4gIGdldFVuc2VyaWFsaXplPFQ+KGtleTogc3RyaW5nKTogVCB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0KGtleSk7XG5cbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpIGFzIFQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RvcmFnZTtcbiJdfQ==
