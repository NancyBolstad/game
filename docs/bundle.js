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
        var playGame_1 = require('./scripts/playGame');
        var gameHelpers_1 = require('./scripts/util/gameHelpers');
        var containers_1 = require('./scripts/util/containers');
        var handleDrag_1 = require('./scripts/handleDrag');
        var handleSelection_1 = require('./scripts/handleSelection');
        var showCharacter_1 = require('./scripts/showCharacter');
        var characterIndex_1 = require('./scripts/util/characterIndex');
        var containers_2 = require('./scripts/util/containers');
        exports.gameStorage = new storage_1.default();
        var player1 = exports.gameStorage.getUnserialize('player1Index');
        var player2 = exports.gameStorage.getUnserialize('player2Index');
        if (containers_2.characterList != null) {
          showCharacter_1.default(characterIndex_1.default);
          handleDrag_1.default();
          if (containers_2.validateSelectionBtn != null)
            containers_2.validateSelectionBtn.addEventListener(
              'click',
              handleSelection_1.handleSelection,
              false,
            );
        }
        if (containers_1.board != null && containers_1.diceContainer) {
          gameHelpers_1.createBoard(containers_1.board);
          gameHelpers_1.showDiceResult(containers_1.diceContainer, gameHelpers_1.rollDice());
        }
        if (player1 && player2) {
          playGame_1.default(player1, player2);
        }
      },
      {
        './scripts/handleDrag': 2,
        './scripts/handleSelection': 3,
        './scripts/playGame': 4,
        './scripts/showCharacter': 5,
        './scripts/util/characterIndex': 6,
        './scripts/util/containers': 7,
        './scripts/util/gameHelpers': 10,
        './scripts/util/storage': 12,
      },
    ],
    2: [
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
            index_1.gameStorage.set('player1Index', '' + dragged.getAttribute('key'));
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
            index_1.gameStorage.set('player2Index', '' + dragged.getAttribute('key'));
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
    3: [
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
      { './util/containers': 7, './util/hasSelected': 11 },
    ],
    4: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var index_1 = require('./../index');
        var gameHelpers_1 = require('./util/gameHelpers');
        var containers_1 = require('./util/containers');
        function playGame(player1, player2) {
          var startPosition = document.getElementById('tile-index-1');
          var finalPosition = document.getElementById('tile-index-30');
          var player1Status = 1;
          var player2Status = 1;
          gameHelpers_1.displayPlayers(startPosition, player1);
          gameHelpers_1.displayPlayers(startPosition, player2);
          gameHelpers_1.updatePlayer1Button(true);
          containers_1.player1Btn.addEventListener('click', runPlayer1Turn, false);
          containers_1.player2Btn.addEventListener('click', runPlayer2Turn, false);
          function runPlayer1Turn() {
            var currentDicePoint = gameHelpers_1.rollDice();
            gameHelpers_1.showDiceResult(containers_1.diceContainer, currentDicePoint);
            player1Status += currentDicePoint;
            if (gameHelpers_1.checkWinner(player1Status)) {
              gameHelpers_1.removePlayer(player1);
              gameHelpers_1.displayPlayers(finalPosition, player1);
              gameHelpers_1.gameEnd(player1);
              index_1.gameStorage.set('winner', '' + player1);
              setTimeout(function() {
                window.location.href = 'winner.html';
              }, 1000);
            } else {
              alert('Player 1 rolled: ' + currentDicePoint);
              var updatePosition = document.getElementById('tile-index-' + player1Status);
              gameHelpers_1.removePlayer(player1);
              gameHelpers_1.displayPlayers(updatePosition, player1);
              gameHelpers_1.traps.forEach(function(element) {
                if (element.token == player1Status) {
                  var action = element.action,
                    message = element.message;
                  player1Status -= action;
                  var newPosition_1 = document.getElementById('tile-index-' + player1Status);
                  console.log(newPosition_1);
                  alert('' + message);
                  setTimeout(function() {
                    console.log(1111111);
                    gameHelpers_1.removePlayer(player1);
                    console.log(2222222);
                    gameHelpers_1.displayPlayers(newPosition_1, player1);
                  }, 1000);
                }
              });
              gameHelpers_1.updatePlayer1Button(false);
              if (currentDicePoint === 6) {
                alert('Since you rolled 6, you got a Bonus movement. Roll the dice again');
                gameHelpers_1.updatePlayer1Button(true);
              }
            }
          }
          function runPlayer2Turn() {
            var currentDicePoint = gameHelpers_1.rollDice();
            gameHelpers_1.showDiceResult(containers_1.diceContainer, currentDicePoint);
            player2Status += currentDicePoint;
            if (gameHelpers_1.checkWinner(player2Status)) {
              gameHelpers_1.removePlayer(player2);
              gameHelpers_1.displayPlayers(finalPosition, player2);
              gameHelpers_1.gameEnd(player2);
              index_1.gameStorage.set('winner', '' + player2);
              setTimeout(function() {
                window.location.href = 'winner.html';
              }, 1000);
            } else {
              alert('Player 2 rolled: ' + currentDicePoint);
              var updatePosition = document.getElementById('tile-index-' + player2Status);
              gameHelpers_1.removePlayer(player2);
              gameHelpers_1.displayPlayers(updatePosition, player2);
              gameHelpers_1.traps.forEach(function(element) {
                if (element.token == player2Status) {
                  var action = element.action,
                    message = element.message;
                  player2Status -= action;
                  var newPosition_2 = document.getElementById('tile-index-' + player2Status);
                  console.log(newPosition_2);
                  alert('' + message);
                  setTimeout(function() {
                    console.log(1111111);
                    gameHelpers_1.removePlayer(player2);
                    console.log(2222222);
                    gameHelpers_1.displayPlayers(newPosition_2, player2);
                  }, 1000);
                }
              });
              gameHelpers_1.updatePlayer1Button(true);
              if (currentDicePoint === 6) {
                alert('Since you rolled 6, you got a Bonus movement. Roll the dice again');
                gameHelpers_1.updatePlayer1Button(false);
              }
            }
          }
        }
        exports.default = playGame;
      },
      { './../index': 1, './util/containers': 7, './util/gameHelpers': 10 },
    ],
    5: [
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
      { './util/containers': 7, './util/createImage': 8 },
    ],
    6: [
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
    7: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.characterList = document.getElementById('startZone');
        exports.player1Selection = document.getElementById('endZone1');
        exports.player2Selection = document.getElementById('endZone2');
        exports.validateSelectionBtn = document.querySelector('.cta--validation');
        exports.board = document.querySelector('.gameBoard');
        exports.diceContainer = document.getElementById('diceImage');
        exports.player1Btn = document.querySelector('.btn-Player1');
        exports.player2Btn = document.querySelector('.btn-Player2');
      },
      {},
    ],
    8: [
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
        function createDiceIcon(dicePoint) {
          return exports.diceArray[dicePoint - 1];
        }
        exports.createDiceIcon = createDiceIcon;
      },
      {},
    ],
    10: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var containers_1 = require('./containers');
        var dice_1 = require('./dice');
        var createImage_1 = require('./createImage');
        var trap1 = {
          token: 8,
          action: 1,
          message: 'Pirates ahead! Retreat one field to avoid being noticed.',
        };
        var trap2 = {
          token: 14,
          action: 2,
          message: 'A wolf emerges from the night woods. Retreat two fields to escape its chase.',
        };
        var trap3 = {
          token: 18,
          action: 3,
          message:
            'A white walker has been spotted! Immediately retreat three fields to narrowly escape death.',
        };
        var trap4 = {
          token: 24,
          action: 4,
          message: 'Enemy horsemen on the horizon! Outnumbered, you must retreat four fields',
        };
        var trap5 = {
          token: 28,
          action: 5,
          message: 'Fire-breathing dragons appear! Retreat five fields to escape their long gaze.',
        };
        exports.traps = [trap1, trap2, trap3, trap4, trap5];
        function createBoard(container) {
          var _loop_1 = function(i) {
            var tile = document.createElement('div');
            tile.className = 'tile';
            tile.setAttribute('id', 'tile-index-' + i);
            if (i % 2 !== 0) {
              tile.style.backgroundColor = 'brown';
            } else {
              tile.style.backgroundColor = 'white';
            }
            exports.traps.map(function(element) {
              if (element.token === i) {
                tile.style.backgroundColor = 'yellow';
                tile.style.backgroundImage =
                  "url('https://res.cloudinary.com/dnkfgmzy1/image/upload/v1575655734/game/trap" +
                  element.action +
                  ".svg')";
                tile.style.backgroundSize = '4rem';
                tile.style.backgroundRepeat = 'no-repeat';
                tile.style.backgroundPosition = 'center center';
              }
            });
            container.appendChild(tile);
          };
          for (var i = 1; i <= 30; i++) {
            _loop_1(i);
          }
        }
        exports.createBoard = createBoard;
        function updatePlayer1Button(isPlayer1Turn) {
          if (isPlayer1Turn) {
            containers_1.player1Btn.disabled = false;
            containers_1.player2Btn.disabled = true;
          } else {
            containers_1.player1Btn.disabled = true;
            containers_1.player2Btn.disabled = false;
          }
        }
        exports.updatePlayer1Button = updatePlayer1Button;
        function showDiceResult(container, point) {
          container.innerHTML = dice_1.diceArray[point - 1];
        }
        exports.showDiceResult = showDiceResult;
        function rollDice() {
          return Math.floor(Math.random() * 6) + 1;
        }
        exports.rollDice = rollDice;
        function removePlayer(player) {
          document.getElementById('figure-' + player).remove();
        }
        exports.removePlayer = removePlayer;
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
        function checkWinner(playerStatus) {
          return playerStatus >= 30 ? true : false;
        }
        exports.checkWinner = checkWinner;
        function gameEnd(winner) {
          containers_1.player1Btn.disabled = true;
          containers_1.player2Btn.disabled = true;
        }
        exports.gameEnd = gameEnd;
      },
      { './containers': 7, './createImage': 8, './dice': 9 },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXgudHMiLCJzcmMvc2NyaXB0cy9oYW5kbGVEcmFnLnRzIiwic3JjL3NjcmlwdHMvaGFuZGxlU2VsZWN0aW9uLnRzIiwic3JjL3NjcmlwdHMvcGxheUdhbWUudHMiLCJzcmMvc2NyaXB0cy9zaG93Q2hhcmFjdGVyLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9jaGFyYWN0ZXJJbmRleC50cyIsInNyYy9zY3JpcHRzL3V0aWwvY29udGFpbmVycy50cyIsInNyYy9zY3JpcHRzL3V0aWwvY3JlYXRlSW1hZ2UudHMiLCJzcmMvc2NyaXB0cy91dGlsL2RpY2UudHMiLCJzcmMvc2NyaXB0cy91dGlsL2dhbWVIZWxwZXJzLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9oYXNTZWxlY3RlZC50cyIsInNyYy9zY3JpcHRzL3V0aWwvc3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsa0RBQTZDO0FBQzdDLCtDQUEwQztBQUMxQywwREFBbUY7QUFDbkYsd0RBQWlFO0FBQ2pFLG1EQUE4QztBQUM5Qyw2REFBNEQ7QUFDNUQseURBQXdEO0FBQ3hELGdFQUEyRDtBQUMzRCx3REFBZ0Y7QUFFbkUsUUFBQSxXQUFXLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7QUFDekMsSUFBTSxPQUFPLEdBQVcsbUJBQVcsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDbkUsSUFBTSxPQUFPLEdBQVcsbUJBQVcsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFbkUsSUFBSSwwQkFBYSxJQUFJLElBQUksRUFBRTtJQUN6Qix1QkFBaUIsQ0FBQyx3QkFBYyxDQUFDLENBQUM7SUFDbEMsb0JBQVUsRUFBRSxDQUFDO0lBQ2IsSUFBSSxpQ0FBb0IsSUFBSSxJQUFJO1FBQzlCLGlDQUFvQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxpQ0FBZSxFQUFFLEtBQUss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T0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCx3QkFBTSxHQUFOLFVBQU8sR0FBVztRQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsOEJBQVksR0FBWixVQUFhLEdBQVcsRUFBRSxLQUFVO1FBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsZ0NBQWMsR0FBZCxVQUFrQixHQUFXO1FBQzNCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFM0IsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFNLENBQUM7SUFDL0IsQ0FBQztJQUNILGNBQUM7QUFBRCxDQTVCQSxBQTRCQyxJQUFBO0FBRUQsa0JBQWUsT0FBTyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IFN0b3JhZ2UgZnJvbSAnLi9zY3JpcHRzL3V0aWwvc3RvcmFnZSc7XG5pbXBvcnQgcGxheUdhbWUgZnJvbSAnLi9zY3JpcHRzL3BsYXlHYW1lJztcbmltcG9ydCB7IHNob3dEaWNlUmVzdWx0LCByb2xsRGljZSwgY3JlYXRlQm9hcmQgfSBmcm9tICcuL3NjcmlwdHMvdXRpbC9nYW1lSGVscGVycyc7XG5pbXBvcnQgeyBib2FyZCwgZGljZUNvbnRhaW5lciB9IGZyb20gJy4vc2NyaXB0cy91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IGhhbmRsZURyYWcgZnJvbSAnLi9zY3JpcHRzL2hhbmRsZURyYWcnO1xuaW1wb3J0IHsgaGFuZGxlU2VsZWN0aW9uIH0gZnJvbSAnLi9zY3JpcHRzL2hhbmRsZVNlbGVjdGlvbic7XG5pbXBvcnQgZ2V0Q2hhcmFjdGVyQ2FyZHMgZnJvbSAnLi9zY3JpcHRzL3Nob3dDaGFyYWN0ZXInO1xuaW1wb3J0IGNoYXJhY3RlckluZGV4IGZyb20gJy4vc2NyaXB0cy91dGlsL2NoYXJhY3RlckluZGV4JztcbmltcG9ydCB7IGNoYXJhY3Rlckxpc3QsIHZhbGlkYXRlU2VsZWN0aW9uQnRuIH0gZnJvbSAnLi9zY3JpcHRzL3V0aWwvY29udGFpbmVycyc7XG5cbmV4cG9ydCBjb25zdCBnYW1lU3RvcmFnZSA9IG5ldyBTdG9yYWdlKCk7XG5jb25zdCBwbGF5ZXIxOiBudW1iZXIgPSBnYW1lU3RvcmFnZS5nZXRVbnNlcmlhbGl6ZSgncGxheWVyMUluZGV4Jyk7XG5jb25zdCBwbGF5ZXIyOiBudW1iZXIgPSBnYW1lU3RvcmFnZS5nZXRVbnNlcmlhbGl6ZSgncGxheWVyMkluZGV4Jyk7XG5cbmlmIChjaGFyYWN0ZXJMaXN0ICE9IG51bGwpIHtcbiAgZ2V0Q2hhcmFjdGVyQ2FyZHMoY2hhcmFjdGVySW5kZXgpO1xuICBoYW5kbGVEcmFnKCk7XG4gIGlmICh2YWxpZGF0ZVNlbGVjdGlvbkJ0biAhPSBudWxsKVxuICAgIHZhbGlkYXRlU2VsZWN0aW9uQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlU2VsZWN0aW9uLCBmYWxzZSk7XG59XG5cbmlmIChib2FyZCAhPSBudWxsICYmIGRpY2VDb250YWluZXIpIHtcbiAgY3JlYXRlQm9hcmQoYm9hcmQpO1xuICBzaG93RGljZVJlc3VsdChkaWNlQ29udGFpbmVyLCByb2xsRGljZSgpKTtcbn1cblxuaWYgKHBsYXllcjEgJiYgcGxheWVyMikge1xuICBwbGF5R2FtZShwbGF5ZXIxLCBwbGF5ZXIyKTtcbn1cbiIsImltcG9ydCB7IGdhbWVTdG9yYWdlIH0gZnJvbSAnLi4vaW5kZXgnO1xubGV0IGRyYWdnZWQ6IEhUTUxFbGVtZW50O1xuXG5mdW5jdGlvbiBoYW5kbGVEcmFnU3RhcnQoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICBkcmFnZ2VkID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWdFbmQoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5vcGFjaXR5ID0gJyc7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWdPdmVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhZ0VudGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnc3RhcnRab25lJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnIzc0NTYyNSc7XG4gIH1cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnZW5kWm9uZTEnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcjNzQ1NjI1JztcbiAgfVxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdlbmRab25lMicpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyM3NDU2MjUnO1xuICB9XG59XG5mdW5jdGlvbiBoYW5kbGVEcmFnTGVhdmUoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdzdGFydFpvbmUnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICB9XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ2VuZFpvbmUxJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgfVxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdlbmRab25lMicpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJvcChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIC8vIHByZXZlbnQgZGVmYXVsdCBhY3Rpb24gKG9wZW4gYXMgbGluayBmb3Igc29tZSBlbGVtZW50cylcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAvLyBtb3ZlIGRyYWdnZWQgZWxlbSB0byB0aGUgc2VsZWN0ZWQgZHJvcCB0YXJnZXRcbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09ICdlbmRab25lMScpIHtcbiAgICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICBhbGVydCgnT25seSBvbmUgY2hhcmFjdGVyIGlzIGFsbG93ZWQuJyk7XG4gICAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGRyYWdnZWQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkcmFnZ2VkKTtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5hcHBlbmRDaGlsZChkcmFnZ2VkKTtcbiAgICBnYW1lU3RvcmFnZS5zZXQoJ3BsYXllcjFJbmRleCcsIGAke2RyYWdnZWQuZ2V0QXR0cmlidXRlKCdrZXknKX1gKTtcbiAgfVxuXG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PSAnZW5kWm9uZTInKSB7XG4gICAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgYWxlcnQoJ09ubHkgb25lIGNoYXJhY3RlciBpcyBhbGxvd2VkLicpO1xuICAgICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICBkcmFnZ2VkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZHJhZ2dlZCk7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgZ2FtZVN0b3JhZ2Uuc2V0KCdwbGF5ZXIySW5kZXgnLCBgJHtkcmFnZ2VkLmdldEF0dHJpYnV0ZSgna2V5Jyl9YCk7XG4gIH1cblxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT0gJ3N0YXJ0Wm9uZScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgZHJhZ2dlZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRyYWdnZWQpO1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgIGNvbnNvbGUubG9nKGRyYWdnZWQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWcoKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGhhbmRsZURyYWdTdGFydCk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBoYW5kbGVEcmFnRW5kKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBoYW5kbGVEcmFnT3Zlcik7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGhhbmRsZURyYWdFbnRlcik7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGhhbmRsZURyYWdMZWF2ZSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBoYW5kbGVEcm9wKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlRHJhZztcbiIsImltcG9ydCB7IHBsYXllcjFTZWxlY3Rpb24sIHBsYXllcjJTZWxlY3Rpb24gfSBmcm9tICcuL3V0aWwvY29udGFpbmVycyc7XG5pbXBvcnQgeyBoYXNTZWxlY3RlZCB9IGZyb20gJy4vdXRpbC9oYXNTZWxlY3RlZCc7XG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU2VsZWN0aW9uKCk6IHZvaWQge1xuICBjb25zdCBoYXNQbGF5ZXIxU2VsZWN0ZWQgPSBoYXNTZWxlY3RlZChwbGF5ZXIxU2VsZWN0aW9uKTtcbiAgY29uc3QgaGFzUGxheWVyMlNlbGVjdGVkID0gaGFzU2VsZWN0ZWQocGxheWVyMlNlbGVjdGlvbik7XG4gIGlmIChoYXNQbGF5ZXIxU2VsZWN0ZWQgJiYgaGFzUGxheWVyMlNlbGVjdGVkKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnZ2FtZS5odG1sJztcbiAgfSBlbHNlIHtcbiAgICBhbGVydCgnU2VsZWN0IGNoYXJhY3RlciBmaXJzdCwgdGhlbiBzdGFydCB0aGUgZ2FtZScpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBnYW1lU3RvcmFnZSB9IGZyb20gJy4vLi4vaW5kZXgnO1xuaW1wb3J0IHtcbiAgc2hvd0RpY2VSZXN1bHQsXG4gIHVwZGF0ZVBsYXllcjFCdXR0b24sXG4gIHJvbGxEaWNlLFxuICBkaXNwbGF5UGxheWVycyxcbiAgcmVtb3ZlUGxheWVyLFxuICBjaGVja1dpbm5lcixcbiAgZ2FtZUVuZCxcbiAgdHJhcHMsXG59IGZyb20gJy4vdXRpbC9nYW1lSGVscGVycyc7XG5pbXBvcnQgeyBkaWNlQ29udGFpbmVyLCBwbGF5ZXIxQnRuLCBwbGF5ZXIyQnRuIH0gZnJvbSAnLi91dGlsL2NvbnRhaW5lcnMnO1xuXG5mdW5jdGlvbiBwbGF5R2FtZShwbGF5ZXIxOiBudW1iZXIsIHBsYXllcjI6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBzdGFydFBvc2l0aW9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aWxlLWluZGV4LTEnKTtcbiAgY29uc3QgZmluYWxQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aWxlLWluZGV4LTMwJyk7XG5cbiAgbGV0IHBsYXllcjFTdGF0dXM6IG51bWJlciA9IDE7XG4gIGxldCBwbGF5ZXIyU3RhdHVzOiBudW1iZXIgPSAxO1xuXG4gIGRpc3BsYXlQbGF5ZXJzKHN0YXJ0UG9zaXRpb24sIHBsYXllcjEpO1xuICBkaXNwbGF5UGxheWVycyhzdGFydFBvc2l0aW9uLCBwbGF5ZXIyKTtcbiAgdXBkYXRlUGxheWVyMUJ1dHRvbih0cnVlKTtcbiAgcGxheWVyMUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1blBsYXllcjFUdXJuLCBmYWxzZSk7XG4gIHBsYXllcjJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW5QbGF5ZXIyVHVybiwgZmFsc2UpO1xuXG4gIGZ1bmN0aW9uIHJ1blBsYXllcjFUdXJuKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnREaWNlUG9pbnQgPSByb2xsRGljZSgpO1xuICAgIHNob3dEaWNlUmVzdWx0KGRpY2VDb250YWluZXIsIGN1cnJlbnREaWNlUG9pbnQpO1xuICAgIHBsYXllcjFTdGF0dXMgKz0gY3VycmVudERpY2VQb2ludDtcblxuICAgIGlmIChjaGVja1dpbm5lcihwbGF5ZXIxU3RhdHVzKSkge1xuICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjEpO1xuICAgICAgZGlzcGxheVBsYXllcnMoZmluYWxQb3NpdGlvbiwgcGxheWVyMSk7XG4gICAgICBnYW1lRW5kKHBsYXllcjEpO1xuICAgICAgZ2FtZVN0b3JhZ2Uuc2V0KCd3aW5uZXInLCBgJHtwbGF5ZXIxfWApO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnd2lubmVyLmh0bWwnO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KGBQbGF5ZXIgMSByb2xsZWQ6ICR7Y3VycmVudERpY2VQb2ludH1gKTtcblxuICAgICAgY29uc3QgdXBkYXRlUG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGlsZS1pbmRleC0ke3BsYXllcjFTdGF0dXN9YCk7XG4gICAgICByZW1vdmVQbGF5ZXIocGxheWVyMSk7XG4gICAgICBkaXNwbGF5UGxheWVycyh1cGRhdGVQb3NpdGlvbiwgcGxheWVyMSk7XG5cbiAgICAgIHRyYXBzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGlmIChlbGVtZW50LnRva2VuID09IHBsYXllcjFTdGF0dXMpIHtcbiAgICAgICAgICBjb25zdCB7IGFjdGlvbiwgbWVzc2FnZSB9ID0gZWxlbWVudDtcbiAgICAgICAgICBwbGF5ZXIxU3RhdHVzIC09IGFjdGlvbjtcbiAgICAgICAgICBjb25zdCBuZXdQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0aWxlLWluZGV4LSR7cGxheWVyMVN0YXR1c31gKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhuZXdQb3NpdGlvbik7XG5cbiAgICAgICAgICBhbGVydChgJHttZXNzYWdlfWApO1xuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKDExMTExMTEpO1xuICAgICAgICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coMjIyMjIyMik7XG4gICAgICAgICAgICBkaXNwbGF5UGxheWVycyhuZXdQb3NpdGlvbiwgcGxheWVyMSk7XG4gICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB1cGRhdGVQbGF5ZXIxQnV0dG9uKGZhbHNlKTtcblxuICAgICAgaWYgKGN1cnJlbnREaWNlUG9pbnQgPT09IDYpIHtcbiAgICAgICAgYWxlcnQoJ1NpbmNlIHlvdSByb2xsZWQgNiwgeW91IGdvdCBhIEJvbnVzIG1vdmVtZW50LiBSb2xsIHRoZSBkaWNlIGFnYWluJyk7XG4gICAgICAgIHVwZGF0ZVBsYXllcjFCdXR0b24odHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcnVuUGxheWVyMlR1cm4oKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudERpY2VQb2ludCA9IHJvbGxEaWNlKCk7XG4gICAgc2hvd0RpY2VSZXN1bHQoZGljZUNvbnRhaW5lciwgY3VycmVudERpY2VQb2ludCk7XG4gICAgcGxheWVyMlN0YXR1cyArPSBjdXJyZW50RGljZVBvaW50O1xuXG4gICAgaWYgKGNoZWNrV2lubmVyKHBsYXllcjJTdGF0dXMpKSB7XG4gICAgICByZW1vdmVQbGF5ZXIocGxheWVyMik7XG4gICAgICBkaXNwbGF5UGxheWVycyhmaW5hbFBvc2l0aW9uLCBwbGF5ZXIyKTtcbiAgICAgIGdhbWVFbmQocGxheWVyMik7XG4gICAgICBnYW1lU3RvcmFnZS5zZXQoJ3dpbm5lcicsIGAke3BsYXllcjJ9YCk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICd3aW5uZXIuaHRtbCc7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoYFBsYXllciAyIHJvbGxlZDogJHtjdXJyZW50RGljZVBvaW50fWApO1xuXG4gICAgICBjb25zdCB1cGRhdGVQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0aWxlLWluZGV4LSR7cGxheWVyMlN0YXR1c31gKTtcbiAgICAgIHJlbW92ZVBsYXllcihwbGF5ZXIyKTtcbiAgICAgIGRpc3BsYXlQbGF5ZXJzKHVwZGF0ZVBvc2l0aW9uLCBwbGF5ZXIyKTtcblxuICAgICAgdHJhcHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQudG9rZW4gPT0gcGxheWVyMlN0YXR1cykge1xuICAgICAgICAgIGNvbnN0IHsgYWN0aW9uLCBtZXNzYWdlIH0gPSBlbGVtZW50O1xuICAgICAgICAgIHBsYXllcjJTdGF0dXMgLT0gYWN0aW9uO1xuICAgICAgICAgIGNvbnN0IG5ld1Bvc2l0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRpbGUtaW5kZXgtJHtwbGF5ZXIyU3RhdHVzfWApO1xuICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1Bvc2l0aW9uKTtcblxuICAgICAgICAgIGFsZXJ0KGAke21lc3NhZ2V9YCk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coMTExMTExMSk7XG4gICAgICAgICAgICByZW1vdmVQbGF5ZXIocGxheWVyMik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygyMjIyMjIyKTtcbiAgICAgICAgICAgIGRpc3BsYXlQbGF5ZXJzKG5ld1Bvc2l0aW9uLCBwbGF5ZXIyKTtcbiAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHVwZGF0ZVBsYXllcjFCdXR0b24odHJ1ZSk7XG5cbiAgICAgIGlmIChjdXJyZW50RGljZVBvaW50ID09PSA2KSB7XG4gICAgICAgIGFsZXJ0KCdTaW5jZSB5b3Ugcm9sbGVkIDYsIHlvdSBnb3QgYSBCb251cyBtb3ZlbWVudC4gUm9sbCB0aGUgZGljZSBhZ2FpbicpO1xuICAgICAgICB1cGRhdGVQbGF5ZXIxQnV0dG9uKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGxheUdhbWU7XG4iLCJpbXBvcnQgeyBjaGFyYWN0ZXJMaXN0IH0gZnJvbSAnLi91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IHsgUmVzcG9uc2VPYmpUeXBlcyB9IGZyb20gJy4vdXRpbC90eXBlcyc7XG5pbXBvcnQgY3JlYXRlSW1hZ2UgZnJvbSAnLi91dGlsL2NyZWF0ZUltYWdlJztcblxuY29uc3QgQkFTRV9VUkw6IHN0cmluZyA9ICdodHRwczovL3d3dy5hbmFwaW9maWNlYW5kZmlyZS5jb20vYXBpL2NoYXJhY3RlcnMvJztcblxuZnVuY3Rpb24gZ2V0Q2hhcmFjdGVyQ2FyZHMoY2hhcmFjdGVySW5kZXg6IG51bWJlcltdKSB7XG4gIGNoYXJhY3RlckluZGV4Lm1hcChlbGVtZW50ID0+IHtcbiAgICBzaG93Q2hhcmFjdGVyKGVsZW1lbnQpO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2hvd0NoYXJhY3RlcihjaGFyYWN0ZXJOYW1lSW5kZXg6IG51bWJlcikge1xuICBjb25zdCB1cmwgPSBgJHtCQVNFX1VSTH0ke2NoYXJhY3Rlck5hbWVJbmRleH1gO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgIGNvbnN0IGRhdGE6IFJlc3BvbnNlT2JqVHlwZXMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc3QgeyBuYW1lLCB0aXRsZXMsIGFsaWFzZXMgfSA9IGRhdGE7XG5cbiAgICBjb25zdCBjb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21wb25lbnQuY2xhc3NOYW1lID0gJ3Jvd19faXRlbS0tY2FyZCc7XG4gICAgY29tcG9uZW50LnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcbiAgICBjb21wb25lbnQuc2V0QXR0cmlidXRlKCdrZXknLCBgJHtjaGFyYWN0ZXJOYW1lSW5kZXh9YCk7XG4gICAgY29uc3QgY2FyZEltYWdlID0gYDxpbWcgZHJhZ2dhYmxlPVwiZmFsc2VcIiBzcmM9JHtjcmVhdGVJbWFnZShcbiAgICAgIGNoYXJhY3Rlck5hbWVJbmRleCxcbiAgICApfSBjbGFzcz1cIml0ZW0tLWNhcmQtaW1hZ2VcIiBhbHQ9XCJHYW1lIGZpZ3VyZSBuby4ke2NoYXJhY3Rlck5hbWVJbmRleH1cIj5gO1xuICAgIGNvbnN0IGNhcmRUaXRsZSA9IGAgPGgzPiR7bmFtZX08L2gzPmA7XG4gICAgY29uc3QgY2FyZFN1YlRpdGxlID0gYDxzcGFuPiR7dGl0bGVzWzBdID8gdGl0bGVzWzBdIDogYWxpYXNlc1swXX08L3NwYW4+YDtcbiAgICBjb21wb25lbnQuaW5uZXJIVE1MID0gY2FyZEltYWdlICsgY2FyZFRpdGxlICsgY2FyZFN1YlRpdGxlO1xuXG4gICAgY2hhcmFjdGVyTGlzdC5hcHBlbmQoY29tcG9uZW50KTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0Q2hhcmFjdGVyQ2FyZHM7XG4iLCJjb25zdCBzYW13ZWxsOiBudW1iZXIgPSA5NTQ7XG5jb25zdCBqb246IG51bWJlciA9IDU4MztcbmNvbnN0IGNlcnNlaTogbnVtYmVyID0gMjM4O1xuY29uc3QgdHlyaW9uOiBudW1iZXIgPSAxMDUyO1xuY29uc3QgZGFlbmVyeXM6IG51bWJlciA9IDI3MTtcblxuY29uc3QgY2hhcmFjdGVySW5kZXg6IG51bWJlcltdID0gW3NhbXdlbGwsIGpvbiwgY2Vyc2VpLCB0eXJpb24sIGRhZW5lcnlzXTtcbmV4cG9ydCBkZWZhdWx0IGNoYXJhY3RlckluZGV4O1xuIiwiLy9wYWdlOnNlbGVjdC1wbGF5ZXJcbmV4cG9ydCBjb25zdCBjaGFyYWN0ZXJMaXN0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydFpvbmUnKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXIxU2VsZWN0aW9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmRab25lMScpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjJTZWxlY3Rpb246IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZFpvbmUyJyk7XG5leHBvcnQgY29uc3QgdmFsaWRhdGVTZWxlY3Rpb25CdG46IEhUTUxBbmNob3JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN0YS0tdmFsaWRhdGlvbicpO1xuXG4vL3BhZ2U6Z2FtZVxuZXhwb3J0IGNvbnN0IGJvYXJkOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lQm9hcmQnKTtcbmV4cG9ydCBjb25zdCBkaWNlQ29udGFpbmVyOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWNlSW1hZ2UnKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXIxQnRuOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tUGxheWVyMScpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjJCdG46IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1QbGF5ZXIyJyk7XG4iLCJmdW5jdGlvbiBjcmVhdGVJbWFnZShpbmRleDogbnVtYmVyKSB7XG4gIHJldHVybiBgaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZG5rZmdtenkxL2ltYWdlL3VwbG9hZC92MTU3NTU0OTY3NC9nYW1lLyR7aW5kZXh9LnBuZ2A7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUltYWdlO1xuIiwiZXhwb3J0IGNvbnN0IGRpY2VJY29ucyA9IHtcbiAgcG9pbnQxOlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzek0yNTYgMjA2YTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwelwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQyOlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptMzE2Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bS0yNjggMjY4QTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDM6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem0zMTYuOTcgMzYuMDNBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pNMjU2IDIwNmE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHpNMTIzLjQ3IDM0MC4wM0E1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQ0OlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptNDguOTcgMzYuMDNBNTAgNTAgMCAwIDEgMTcyIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptLTI2OCAyNjhBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50NTpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTQ4Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDE3MiAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6TTI1NiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6TTEyMy40NyAzNDAuMDNBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50NjpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTQ4Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDE3MiAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6TTEyMiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6bTI2OCAwYTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwek0xMjMuNDcgMzQwLjAzQTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxufTtcblxuZXhwb3J0IGNvbnN0IGRpY2VBcnJheTogc3RyaW5nW10gPSBbXG4gIGRpY2VJY29ucy5wb2ludDEsXG4gIGRpY2VJY29ucy5wb2ludDIsXG4gIGRpY2VJY29ucy5wb2ludDMsXG4gIGRpY2VJY29ucy5wb2ludDQsXG4gIGRpY2VJY29ucy5wb2ludDUsXG4gIGRpY2VJY29ucy5wb2ludDYsXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGljZUljb24oZGljZVBvaW50OiBudW1iZXIpIHtcbiAgcmV0dXJuIGRpY2VBcnJheVtkaWNlUG9pbnQgLSAxXTtcbn1cbiIsImltcG9ydCB7IHBsYXllcjFCdG4sIHBsYXllcjJCdG4gfSBmcm9tICcuL2NvbnRhaW5lcnMnO1xuaW1wb3J0IHsgZGljZUFycmF5IH0gZnJvbSAnLi9kaWNlJztcbmltcG9ydCBjcmVhdGVJbWFnZSBmcm9tICcuL2NyZWF0ZUltYWdlJztcblxuaW50ZXJmYWNlIHRyYXAge1xuICB0b2tlbjogbnVtYmVyO1xuICBhY3Rpb246IG51bWJlcjtcbiAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5jb25zdCB0cmFwMTogdHJhcCA9IHtcbiAgdG9rZW46IDgsXG4gIGFjdGlvbjogMSxcbiAgbWVzc2FnZTogJ1BpcmF0ZXMgYWhlYWQhIFJldHJlYXQgb25lIGZpZWxkIHRvIGF2b2lkIGJlaW5nIG5vdGljZWQuJyxcbn07XG5cbmNvbnN0IHRyYXAyOiB0cmFwID0ge1xuICB0b2tlbjogMTQsXG4gIGFjdGlvbjogMixcbiAgbWVzc2FnZTogJ0Egd29sZiBlbWVyZ2VzIGZyb20gdGhlIG5pZ2h0IHdvb2RzLiBSZXRyZWF0IHR3byBmaWVsZHMgdG8gZXNjYXBlIGl0cyBjaGFzZS4nLFxufTtcblxuY29uc3QgdHJhcDM6IHRyYXAgPSB7XG4gIHRva2VuOiAxOCxcbiAgYWN0aW9uOiAzLFxuICBtZXNzYWdlOlxuICAgICdBIHdoaXRlIHdhbGtlciBoYXMgYmVlbiBzcG90dGVkISBJbW1lZGlhdGVseSByZXRyZWF0IHRocmVlIGZpZWxkcyB0byBuYXJyb3dseSBlc2NhcGUgZGVhdGguJyxcbn07XG5cbmNvbnN0IHRyYXA0OiB0cmFwID0ge1xuICB0b2tlbjogMjQsXG4gIGFjdGlvbjogNCxcbiAgbWVzc2FnZTogJ0VuZW15IGhvcnNlbWVuIG9uIHRoZSBob3Jpem9uISBPdXRudW1iZXJlZCwgeW91IG11c3QgcmV0cmVhdCBmb3VyIGZpZWxkcycsXG59O1xuXG5jb25zdCB0cmFwNTogdHJhcCA9IHtcbiAgdG9rZW46IDI4LFxuICBhY3Rpb246IDUsXG4gIG1lc3NhZ2U6ICdGaXJlLWJyZWF0aGluZyBkcmFnb25zIGFwcGVhciEgUmV0cmVhdCBmaXZlIGZpZWxkcyB0byBlc2NhcGUgdGhlaXIgbG9uZyBnYXplLicsXG59O1xuXG5leHBvcnQgY29uc3QgdHJhcHM6IHRyYXBbXSA9IFt0cmFwMSwgdHJhcDIsIHRyYXAzLCB0cmFwNCwgdHJhcDVdO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQm9hcmQoY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCk6IHZvaWQge1xuICBmb3IgKGxldCBpOiBudW1iZXIgPSAxOyBpIDw9IDMwOyBpKyspIHtcbiAgICBjb25zdCB0aWxlOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRpbGUuY2xhc3NOYW1lID0gYHRpbGVgO1xuICAgIHRpbGUuc2V0QXR0cmlidXRlKCdpZCcsIGB0aWxlLWluZGV4LSR7aX1gKTtcblxuICAgIGlmIChpICUgMiAhPT0gMCkge1xuICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYnJvd24nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSc7XG4gICAgfVxuXG4gICAgdHJhcHMubWFwKGVsZW1lbnQgPT4ge1xuICAgICAgaWYgKGVsZW1lbnQudG9rZW4gPT09IGkpIHtcbiAgICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAneWVsbG93JztcbiAgICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCdodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kbmtmZ216eTEvaW1hZ2UvdXBsb2FkL3YxNTc1NjU1NzM0L2dhbWUvdHJhcCR7ZWxlbWVudC5hY3Rpb259LnN2ZycpYDtcbiAgICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICc0cmVtJztcbiAgICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gJ25vLXJlcGVhdCc7XG4gICAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlciBjZW50ZXInO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRpbGUpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVQbGF5ZXIxQnV0dG9uKGlzUGxheWVyMVR1cm46IGJvb2xlYW4pOiB2b2lkIHtcbiAgaWYgKGlzUGxheWVyMVR1cm4pIHtcbiAgICBwbGF5ZXIxQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgcGxheWVyMkJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcGxheWVyMUJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgcGxheWVyMkJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RGljZVJlc3VsdChjb250YWluZXI6IEhUTUxFbGVtZW50LCBwb2ludDogbnVtYmVyKSB7XG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBkaWNlQXJyYXlbcG9pbnQgLSAxXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvbGxEaWNlKCk6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSArIDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVQbGF5ZXIocGxheWVyOiBudW1iZXIpOiB2b2lkIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGZpZ3VyZS0ke3BsYXllcn1gKS5yZW1vdmUoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlQbGF5ZXJzKGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHBsYXllckluZGV4OiBudW1iZXIpIHtcbiAgY29uc3QgcGxheWVyOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgcGxheWVyLnNyYyA9IGAke2NyZWF0ZUltYWdlKHBsYXllckluZGV4KX1gO1xuXG4gIHBsYXllci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2JvYXJkX19maWd1cmUnKTtcblxuICBwbGF5ZXIuc2V0QXR0cmlidXRlKCdhbHQnLCBgR2FtZSBmaWd1cmUgbm8uJHtwbGF5ZXJJbmRleH1gKTtcblxuICBwbGF5ZXIuc2V0QXR0cmlidXRlKCdpZCcsIGBmaWd1cmUtJHtwbGF5ZXJJbmRleH1gKTtcblxuICBpZiAoY29udGFpbmVyICE9IG51bGwpIHtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tXaW5uZXIocGxheWVyU3RhdHVzOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIHBsYXllclN0YXR1cyA+PSAzMCA/IHRydWUgOiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdhbWVFbmQod2lubmVyOiBudW1iZXIpIHtcbiAgcGxheWVyMUJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gIHBsYXllcjJCdG4uZGlzYWJsZWQgPSB0cnVlO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGhhc1NlbGVjdGVkKGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgcmV0dXJuIGNvbnRhaW5lci5oYXNDaGlsZE5vZGVzKCk7XG59XG4iLCJjbGFzcyBTdG9yYWdlIHtcbiAgcHJpdmF0ZSBzdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcblxuICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgfVxuXG4gIGdldChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gIH1cblxuICBkZWxldGUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICB9XG5cbiAgc2V0U2VyaWFsaXplKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5zZXQoa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICB9XG5cbiAgZ2V0VW5zZXJpYWxpemU8VD4oa2V5OiBzdHJpbmcpOiBUIHtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5nZXQoa2V5KTtcblxuICAgIGlmICghZGF0YSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSkgYXMgVDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdG9yYWdlO1xuIl19
