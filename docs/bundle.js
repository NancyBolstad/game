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
        var handleDrag_1 = require('./scripts/handleDrag');
        var handleSelection_1 = require('./scripts/handleSelection');
        var playGame_1 = require('./scripts/playGame');
        var showCharacter_1 = require('./scripts/showCharacter');
        var showWinner_1 = require('./scripts/showWinner');
        var characterIndex_1 = require('./scripts/util/characterIndex');
        var containers_1 = require('./scripts/util/containers');
        var gameHelpers_1 = require('./scripts/util/gameHelpers');
        var storage_1 = require('./scripts/util/storage');
        exports.gameStorage = new storage_1.default();
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
        if (containers_1.board != null && containers_1.diceContainer != null) {
          var player1 = exports.gameStorage.getUnserialize('player1Index');
          var player2 = exports.gameStorage.getUnserialize('player2Index');
          gameHelpers_1.createBoard(containers_1.board);
          gameHelpers_1.showDiceResult(containers_1.diceContainer, gameHelpers_1.rollDice());
          if (player1 && player2) {
            playGame_1.default(player1, player2);
          }
        }
        if (containers_1.winnerContainer != null) {
          var winner = exports.gameStorage.getUnserialize('winner');
          console.log(winner);
          showWinner_1.default(winner);
        }
        if (containers_1.resetBtn != null) {
          containers_1.resetBtn.addEventListener(
            'click',
            function() {
              exports.gameStorage.delete('player1Index');
              exports.gameStorage.delete('player2Index');
              exports.gameStorage.delete('winner');
              window.location.href = 'select.html';
            },
            false,
          );
        }
      },
      {
        './scripts/handleDrag': 2,
        './scripts/handleSelection': 3,
        './scripts/playGame': 4,
        './scripts/showCharacter': 5,
        './scripts/showWinner': 6,
        './scripts/util/characterIndex': 7,
        './scripts/util/containers': 8,
        './scripts/util/gameHelpers': 11,
        './scripts/util/storage': 13,
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
      { './util/containers': 8, './util/hasSelected': 12 },
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
              var winner = {
                index: player1,
                name: 'Player 1',
              };
              index_1.gameStorage.setSerialize('winner', winner);
              gameHelpers_1.removePlayer(player1);
              gameHelpers_1.displayPlayers(finalPosition, player1);
              gameHelpers_1.gameEnd(player1);
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
                    gameHelpers_1.removePlayer(player1);
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
              var winner = {
                index: player2,
                name: 'Player 2',
              };
              index_1.gameStorage.setSerialize('winner', winner);
              gameHelpers_1.removePlayer(player2);
              gameHelpers_1.displayPlayers(finalPosition, player2);
              gameHelpers_1.gameEnd(player2);
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
      { './../index': 1, './util/containers': 8, './util/gameHelpers': 11 },
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
      { './util/containers': 8, './util/createImage': 9 },
    ],
    6: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var containers_1 = require('./util/containers');
        var createImage_1 = require('./util/createImage');
        function showWinner(_a) {
          var index = _a.index,
            name = _a.name;
          if (containers_1.winnerContainer != null) {
            var winnerImage = document.createElement('img');
            winnerImage.className = 'item--winner-image';
            winnerImage.src = '' + createImage_1.default(index);
            winnerImage.alt = 'Featured image for the winner';
            containers_1.winnerContainer.appendChild(winnerImage);
          }
          if (containers_1.congratulationMessage != null) {
            containers_1.congratulationMessage.innerText = name + ' claimed the crown!';
          }
        }
        exports.default = showWinner;
      },
      { './util/containers': 8, './util/createImage': 9 },
    ],
    7: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var samwell = 954;
        var jon = 583;
        var cersei = 238;
        var tyrion = 1052;
        var daenerys = 271;
        var sansa = 957;
        var characterIndex = [samwell, jon, cersei, tyrion, daenerys, sansa];
        exports.default = characterIndex;
      },
      {},
    ],
    8: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        exports.characterList = document.getElementById('startZone');
        exports.player1Selection = document.getElementById('endZone1');
        exports.player2Selection = document.getElementById('endZone2');
        exports.validateSelectionBtn = document.querySelector('.cta--validation');
        exports.board = document.getElementById('gameBoard');
        exports.diceContainer = document.getElementById('diceImage');
        exports.player1Btn = document.querySelector('.btn--Player1');
        exports.player2Btn = document.querySelector('.btn--Player2');
        exports.winnerContainer = document.getElementById('winner');
        exports.congratulationMessage = document.getElementById('congratulation');
        exports.resetBtn = document.getElementById('reset');
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
        function createDiceIcon(dicePoint) {
          return exports.diceArray[dicePoint - 1];
        }
        exports.createDiceIcon = createDiceIcon;
      },
      {},
    ],
    11: [
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
            tile.className = 'board__tile';
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
      { './containers': 8, './createImage': 9, './dice': 10 },
    ],
    12: [
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
    13: [
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXgudHMiLCJzcmMvc2NyaXB0cy9oYW5kbGVEcmFnLnRzIiwic3JjL3NjcmlwdHMvaGFuZGxlU2VsZWN0aW9uLnRzIiwic3JjL3NjcmlwdHMvcGxheUdhbWUudHMiLCJzcmMvc2NyaXB0cy9zaG93Q2hhcmFjdGVyLnRzIiwic3JjL3NjcmlwdHMvc2hvd1dpbm5lci50cyIsInNyYy9zY3JpcHRzL3V0aWwvY2hhcmFjdGVySW5kZXgudHMiLCJzcmMvc2NyaXB0cy91dGlsL2NvbnRhaW5lcnMudHMiLCJzcmMvc2NyaXB0cy91dGlsL2NyZWF0ZUltYWdlLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9kaWNlLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9nYW1lSGVscGVycy50cyIsInNyYy9zY3JpcHRzL3V0aWwvaGFzU2VsZWN0ZWQudHMiLCJzcmMvc2NyaXB0cy91dGlsL3N0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLG1EQUE4QztBQUM5Qyw2REFBNEQ7QUFDNUQsK0NBQTBDO0FBQzFDLHlEQUF3RDtBQUN4RCxtREFBd0U7QUFDeEUsZ0VBQTJEO0FBQzNELHdEQU9tQztBQUNuQywwREFBbUY7QUFDbkYsa0RBQTZDO0FBRWhDLFFBQUEsV0FBVyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO0FBRXpDLElBQUksMEJBQWEsSUFBSSxJQUFJLEVBQUU7SUFDekIsdUJBQWlCLENBQUMsd0JBQWMsQ0FBQyxDQUFDO0lBQ2xDLG9CQUFVLEVBQUUsQ0FBQztJQUNiLElBQUksaUNBQW9CLElBQUksSUFBSTtRQUM5QixpQ0FBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsaUNBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUMxRTtBQUVELElBQUksa0JBQUssSUFBSSxJQUFJLElBQUksMEJBQWEsSUFBSSxJQUFJLEVBQUU7SUFDMUMsSUFBTSxPQUFPLEdB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R0M7Ozs7O0FDbEhELFNBQWdCLFdBQVcsQ0FBQyxTQUFzQjtJQUNoRCxPQUFPLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUNuQyxDQUFDO0FBRkQsa0NBRUM7Ozs7O0FDRkQ7SUFBQTtRQUNVLFlBQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO0lBMkJ4QyxDQUFDO0lBekJDLHFCQUFHLEdBQUgsVUFBSSxHQUFXLEVBQUUsS0FBYTtRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELHFCQUFHLEdBQUgsVUFBSSxHQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsd0JBQU0sR0FBTixVQUFPLEdBQVc7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELDhCQUFZLEdBQVosVUFBYSxHQUFXLEVBQUUsS0FBVTtRQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELGdDQUFjLEdBQWQsVUFBa0IsR0FBVztRQUMzQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBTSxDQUFDO0lBQy9CLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0E1QkEsQUE0QkMsSUFBQTtBQUVELGtCQUFlLE9BQU8sQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBoYW5kbGVEcmFnIGZyb20gJy4vc2NyaXB0cy9oYW5kbGVEcmFnJztcbmltcG9ydCB7IGhhbmRsZVNlbGVjdGlvbiB9IGZyb20gJy4vc2NyaXB0cy9oYW5kbGVTZWxlY3Rpb24nO1xuaW1wb3J0IHBsYXlHYW1lIGZyb20gJy4vc2NyaXB0cy9wbGF5R2FtZSc7XG5pbXBvcnQgZ2V0Q2hhcmFjdGVyQ2FyZHMgZnJvbSAnLi9zY3JpcHRzL3Nob3dDaGFyYWN0ZXInO1xuaW1wb3J0IHNob3dXaW5uZXIsIHsgV2lubmVyIGFzIFdpbm5lclR5cGUgfSBmcm9tICcuL3NjcmlwdHMvc2hvd1dpbm5lcic7XG5pbXBvcnQgY2hhcmFjdGVySW5kZXggZnJvbSAnLi9zY3JpcHRzL3V0aWwvY2hhcmFjdGVySW5kZXgnO1xuaW1wb3J0IHtcbiAgYm9hcmQsXG4gIGNoYXJhY3Rlckxpc3QsXG4gIGRpY2VDb250YWluZXIsXG4gIHJlc2V0QnRuLFxuICB2YWxpZGF0ZVNlbGVjdGlvbkJ0bixcbiAgd2lubmVyQ29udGFpbmVyLFxufSBmcm9tICcuL3NjcmlwdHMvdXRpbC9jb250YWluZXJzJztcbmltcG9ydCB7IGNyZWF0ZUJvYXJkLCByb2xsRGljZSwgc2hvd0RpY2VSZXN1bHQgfSBmcm9tICcuL3NjcmlwdHMvdXRpbC9nYW1lSGVscGVycyc7XG5pbXBvcnQgU3RvcmFnZSBmcm9tICcuL3NjcmlwdHMvdXRpbC9zdG9yYWdlJztcblxuZXhwb3J0IGNvbnN0IGdhbWVTdG9yYWdlID0gbmV3IFN0b3JhZ2UoKTtcblxuaWYgKGNoYXJhY3Rlckxpc3QgIT0gbnVsbCkge1xuICBnZXRDaGFyYWN0ZXJDYXJkcyhjaGFyYWN0ZXJJbmRleCk7XG4gIGhhbmRsZURyYWcoKTtcbiAgaWYgKHZhbGlkYXRlU2VsZWN0aW9uQnRuICE9IG51bGwpXG4gICAgdmFsaWRhdGVTZWxlY3Rpb25CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVTZWxlY3Rpb24sIGZhbHNlKTtcbn1cblxuaWYgKGJvYXJkICE9IG51bGwgJiYgZGljZUNvbnRhaW5lciAhPSBudWxsKSB7XG4gIGNvbnN0IHBsYXllcjE6IG51bWJlciA9IGdhbWVTdG9yYWdlLmdldFVuc2VyaWFsaXplKCdwbGF5ZXIxSW5kZXgnKTtcbiAgY29uc3QgcGxheWVyMjogbnVtYmVyID0gZ2FtZVN0b3JhZ2UuZ2V0VW5zZXJpYWxpemUoJ3BsYXllcjJJbmRleCcpO1xuICBjcmVhdGVCb2FyZChib2FyZCk7XG4gIHNob3dEaWNlUmVzdWx0KGRpY2VDb250YWluZXIsIHJvbGxEaWNlKCkpO1xuXG4gIGlmIChwbGF5ZXIxICYmIHBsYXllcjIpIHtcbiAgICBwbGF5R2FtZShwbGF5ZXIxLCBwbGF5ZXIyKTtcbiAgfVxufVxuXG5pZiAod2lubmVyQ29udGFpbmVyICE9IG51bGwpIHtcbiAgY29uc3Qgd2lubmVyOiBXaW5uZXJUeXBlID0gZ2FtZVN0b3JhZ2UuZ2V0VW5zZXJpYWxpemUoJ3dpbm5lcicpO1xuICBjb25zb2xlLmxvZyh3aW5uZXIpO1xuICBzaG93V2lubmVyKHdpbm5lcik7XG59XG5cbmlmIChyZXNldEJ0biAhPSBudWxsKSB7XG4gIHJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgJ2NsaWNrJyxcbiAgICBmdW5jdGlvbigpIHtcbiAgICAgIGdhbWVTdG9yYWdlLmRlbGV0ZSgncGxheWVyMUluZGV4Jyk7XG4gICAgICBnYW1lU3RvcmFnZS5kZWxldGUoJ3BsYXllcjJJbmRleCcpO1xuICAgICAgZ2FtZVN0b3JhZ2UuZGVsZXRlKCd3aW5uZXInKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ3NlbGVjdC5odG1sJztcbiAgICB9LFxuICAgIGZhbHNlLFxuICApO1xufVxuIiwiaW1wb3J0IHsgZ2FtZVN0b3JhZ2UgfSBmcm9tICcuLi9pbmRleCc7XG5sZXQgZHJhZ2dlZDogSFRNTEVsZW1lbnQ7XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWdTdGFydChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIGRyYWdnZWQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLm9wYWNpdHkgPSAnMC41Jztcbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhZ0VuZChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLm9wYWNpdHkgPSAnJztcbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhZ092ZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmFnRW50ZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdzdGFydFpvbmUnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcjNzQ1NjI1JztcbiAgfVxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdlbmRab25lMScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyM3NDU2MjUnO1xuICB9XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ2VuZFpvbmUyJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnIzc0NTYyNSc7XG4gIH1cbn1cbmZ1bmN0aW9uIGhhbmRsZURyYWdMZWF2ZShldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ3N0YXJ0Wm9uZScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gIH1cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnZW5kWm9uZTEnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICB9XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ2VuZFpvbmUyJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVEcm9wKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgLy8gcHJldmVudCBkZWZhdWx0IGFjdGlvbiAob3BlbiBhcyBsaW5rIGZvciBzb21lIGVsZW1lbnRzKVxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIC8vIG1vdmUgZHJhZ2dlZCBlbGVtIHRvIHRoZSBzZWxlY3RlZCBkcm9wIHRhcmdldFxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT0gJ2VuZFpvbmUxJykge1xuICAgIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIGFsZXJ0KCdPbmx5IG9uZSBjaGFyYWN0ZXIgaXMgYWxsb3dlZC4nKTtcbiAgICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgZHJhZ2dlZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRyYWdnZWQpO1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgIGdhbWVTdG9yYWdlLnNldCgncGxheWVyMUluZGV4JywgYCR7ZHJhZ2dlZC5nZXRBdHRyaWJ1dGUoJ2tleScpfWApO1xuICB9XG5cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09ICdlbmRab25lMicpIHtcbiAgICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICBhbGVydCgnT25seSBvbmUgY2hhcmFjdGVyIGlzIGFsbG93ZWQuJyk7XG4gICAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGRyYWdnZWQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkcmFnZ2VkKTtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5hcHBlbmRDaGlsZChkcmFnZ2VkKTtcbiAgICBnYW1lU3RvcmFnZS5zZXQoJ3BsYXllcjJJbmRleCcsIGAke2RyYWdnZWQuZ2V0QXR0cmlidXRlKCdrZXknKX1gKTtcbiAgfVxuXG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PSAnc3RhcnRab25lJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICBkcmFnZ2VkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZHJhZ2dlZCk7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgY29uc29sZS5sb2coZHJhZ2dlZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhZygpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgaGFuZGxlRHJhZ1N0YXJ0KTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIGhhbmRsZURyYWdFbmQpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGhhbmRsZURyYWdPdmVyKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgaGFuZGxlRHJhZ0VudGVyKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgaGFuZGxlRHJhZ0xlYXZlKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGhhbmRsZURyb3ApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVEcmFnO1xuIiwiaW1wb3J0IHsgcGxheWVyMVNlbGVjdGlvbiwgcGxheWVyMlNlbGVjdGlvbiB9IGZyb20gJy4vdXRpbC9jb250YWluZXJzJztcbmltcG9ydCB7IGhhc1NlbGVjdGVkIH0gZnJvbSAnLi91dGlsL2hhc1NlbGVjdGVkJztcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVTZWxlY3Rpb24oKTogdm9pZCB7XG4gIGNvbnN0IGhhc1BsYXllcjFTZWxlY3RlZCA9IGhhc1NlbGVjdGVkKHBsYXllcjFTZWxlY3Rpb24pO1xuICBjb25zdCBoYXNQbGF5ZXIyU2VsZWN0ZWQgPSBoYXNTZWxlY3RlZChwbGF5ZXIyU2VsZWN0aW9uKTtcbiAgaWYgKGhhc1BsYXllcjFTZWxlY3RlZCAmJiBoYXNQbGF5ZXIyU2VsZWN0ZWQpIHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdnYW1lLmh0bWwnO1xuICB9IGVsc2Uge1xuICAgIGFsZXJ0KCdTZWxlY3QgY2hhcmFjdGVyIGZpcnN0LCB0aGVuIHN0YXJ0IHRoZSBnYW1lJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGdhbWVTdG9yYWdlIH0gZnJvbSAnLi8uLi9pbmRleCc7XG5pbXBvcnQge1xuICBzaG93RGljZVJlc3VsdCxcbiAgdXBkYXRlUGxheWVyMUJ1dHRvbixcbiAgcm9sbERpY2UsXG4gIGRpc3BsYXlQbGF5ZXJzLFxuICByZW1vdmVQbGF5ZXIsXG4gIGNoZWNrV2lubmVyLFxuICBnYW1lRW5kLFxuICB0cmFwcyxcbn0gZnJvbSAnLi91dGlsL2dhbWVIZWxwZXJzJztcbmltcG9ydCB7IGRpY2VDb250YWluZXIsIHBsYXllcjFCdG4sIHBsYXllcjJCdG4gfSBmcm9tICcuL3V0aWwvY29udGFpbmVycyc7XG5pbXBvcnQgeyBXaW5uZXIgYXMgV2lubmVyVHlwZXMgfSBmcm9tICcuLi9zY3JpcHRzL3Nob3dXaW5uZXInO1xuXG5mdW5jdGlvbiBwbGF5R2FtZShwbGF5ZXIxOiBudW1iZXIsIHBsYXllcjI6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBzdGFydFBvc2l0aW9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aWxlLWluZGV4LTEnKTtcbiAgY29uc3QgZmluYWxQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aWxlLWluZGV4LTMwJyk7XG5cbiAgbGV0IHBsYXllcjFTdGF0dXM6IG51bWJlciA9IDE7XG4gIGxldCBwbGF5ZXIyU3RhdHVzOiBudW1iZXIgPSAxO1xuXG4gIGRpc3BsYXlQbGF5ZXJzKHN0YXJ0UG9zaXRpb24sIHBsYXllcjEpO1xuICBkaXNwbGF5UGxheWVycyhzdGFydFBvc2l0aW9uLCBwbGF5ZXIyKTtcbiAgdXBkYXRlUGxheWVyMUJ1dHRvbih0cnVlKTtcbiAgcGxheWVyMUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1blBsYXllcjFUdXJuLCBmYWxzZSk7XG4gIHBsYXllcjJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW5QbGF5ZXIyVHVybiwgZmFsc2UpO1xuXG4gIGZ1bmN0aW9uIHJ1blBsYXllcjFUdXJuKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnREaWNlUG9pbnQgPSByb2xsRGljZSgpO1xuICAgIHNob3dEaWNlUmVzdWx0KGRpY2VDb250YWluZXIsIGN1cnJlbnREaWNlUG9pbnQpO1xuICAgIHBsYXllcjFTdGF0dXMgKz0gY3VycmVudERpY2VQb2ludDtcblxuICAgIGlmIChjaGVja1dpbm5lcihwbGF5ZXIxU3RhdHVzKSkge1xuICAgICAgY29uc3Qgd2lubmVyOiBXaW5uZXJUeXBlcyA9IHtcbiAgICAgICAgaW5kZXg6IHBsYXllcjEsXG4gICAgICAgIG5hbWU6ICdQbGF5ZXIgMScsXG4gICAgICB9O1xuICAgICAgZ2FtZVN0b3JhZ2Uuc2V0U2VyaWFsaXplKCd3aW5uZXInLCB3aW5uZXIpO1xuICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjEpO1xuICAgICAgZGlzcGxheVBsYXllcnMoZmluYWxQb3NpdGlvbiwgcGxheWVyMSk7XG4gICAgICBnYW1lRW5kKHBsYXllcjEpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnd2lubmVyLmh0bWwnO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KGBQbGF5ZXIgMSByb2xsZWQ6ICR7Y3VycmVudERpY2VQb2ludH1gKTtcblxuICAgICAgY29uc3QgdXBkYXRlUG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGlsZS1pbmRleC0ke3BsYXllcjFTdGF0dXN9YCk7XG4gICAgICByZW1vdmVQbGF5ZXIocGxheWVyMSk7XG4gICAgICBkaXNwbGF5UGxheWVycyh1cGRhdGVQb3NpdGlvbiwgcGxheWVyMSk7XG5cbiAgICAgIHRyYXBzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGlmIChlbGVtZW50LnRva2VuID09IHBsYXllcjFTdGF0dXMpIHtcbiAgICAgICAgICBjb25zdCB7IGFjdGlvbiwgbWVzc2FnZSB9ID0gZWxlbWVudDtcbiAgICAgICAgICBwbGF5ZXIxU3RhdHVzIC09IGFjdGlvbjtcbiAgICAgICAgICBjb25zdCBuZXdQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0aWxlLWluZGV4LSR7cGxheWVyMVN0YXR1c31gKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhuZXdQb3NpdGlvbik7XG5cbiAgICAgICAgICBhbGVydChgJHttZXNzYWdlfWApO1xuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlbW92ZVBsYXllcihwbGF5ZXIxKTtcbiAgICAgICAgICAgIGRpc3BsYXlQbGF5ZXJzKG5ld1Bvc2l0aW9uLCBwbGF5ZXIxKTtcbiAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHVwZGF0ZVBsYXllcjFCdXR0b24oZmFsc2UpO1xuXG4gICAgICBpZiAoY3VycmVudERpY2VQb2ludCA9PT0gNikge1xuICAgICAgICBhbGVydCgnU2luY2UgeW91IHJvbGxlZCA2LCB5b3UgZ290IGEgQm9udXMgbW92ZW1lbnQuIFJvbGwgdGhlIGRpY2UgYWdhaW4nKTtcbiAgICAgICAgdXBkYXRlUGxheWVyMUJ1dHRvbih0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBydW5QbGF5ZXIyVHVybigpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50RGljZVBvaW50ID0gcm9sbERpY2UoKTtcbiAgICBzaG93RGljZVJlc3VsdChkaWNlQ29udGFpbmVyLCBjdXJyZW50RGljZVBvaW50KTtcbiAgICBwbGF5ZXIyU3RhdHVzICs9IGN1cnJlbnREaWNlUG9pbnQ7XG5cbiAgICBpZiAoY2hlY2tXaW5uZXIocGxheWVyMlN0YXR1cykpIHtcbiAgICAgIGNvbnN0IHdpbm5lcjogV2lubmVyVHlwZXMgPSB7XG4gICAgICAgIGluZGV4OiBwbGF5ZXIyLFxuICAgICAgICBuYW1lOiAnUGxheWVyIDInLFxuICAgICAgfTtcbiAgICAgIGdhbWVTdG9yYWdlLnNldFNlcmlhbGl6ZSgnd2lubmVyJywgd2lubmVyKTtcbiAgICAgIHJlbW92ZVBsYXllcihwbGF5ZXIyKTtcbiAgICAgIGRpc3BsYXlQbGF5ZXJzKGZpbmFsUG9zaXRpb24sIHBsYXllcjIpO1xuICAgICAgZ2FtZUVuZChwbGF5ZXIyKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ3dpbm5lci5odG1sJztcbiAgICAgIH0sIDEwMDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChgUGxheWVyIDIgcm9sbGVkOiAke2N1cnJlbnREaWNlUG9pbnR9YCk7XG5cbiAgICAgIGNvbnN0IHVwZGF0ZVBvc2l0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRpbGUtaW5kZXgtJHtwbGF5ZXIyU3RhdHVzfWApO1xuICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjIpO1xuICAgICAgZGlzcGxheVBsYXllcnModXBkYXRlUG9zaXRpb24sIHBsYXllcjIpO1xuXG4gICAgICB0cmFwcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudC50b2tlbiA9PSBwbGF5ZXIyU3RhdHVzKSB7XG4gICAgICAgICAgY29uc3QgeyBhY3Rpb24sIG1lc3NhZ2UgfSA9IGVsZW1lbnQ7XG4gICAgICAgICAgcGxheWVyMlN0YXR1cyAtPSBhY3Rpb247XG4gICAgICAgICAgY29uc3QgbmV3UG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGlsZS1pbmRleC0ke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICAgICAgY29uc29sZS5sb2cobmV3UG9zaXRpb24pO1xuXG4gICAgICAgICAgYWxlcnQoYCR7bWVzc2FnZX1gKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygxMTExMTExKTtcbiAgICAgICAgICAgIHJlbW92ZVBsYXllcihwbGF5ZXIyKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKDIyMjIyMjIpO1xuICAgICAgICAgICAgZGlzcGxheVBsYXllcnMobmV3UG9zaXRpb24sIHBsYXllcjIpO1xuICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdXBkYXRlUGxheWVyMUJ1dHRvbih0cnVlKTtcblxuICAgICAgaWYgKGN1cnJlbnREaWNlUG9pbnQgPT09IDYpIHtcbiAgICAgICAgYWxlcnQoJ1NpbmNlIHlvdSByb2xsZWQgNiwgeW91IGdvdCBhIEJvbnVzIG1vdmVtZW50LiBSb2xsIHRoZSBkaWNlIGFnYWluJyk7XG4gICAgICAgIHVwZGF0ZVBsYXllcjFCdXR0b24oZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwbGF5R2FtZTtcbiIsImltcG9ydCB7IGNoYXJhY3Rlckxpc3QgfSBmcm9tICcuL3V0aWwvY29udGFpbmVycyc7XG5pbXBvcnQgeyBSZXNwb25zZU9ialR5cGVzIH0gZnJvbSAnLi91dGlsL3R5cGVzJztcbmltcG9ydCBjcmVhdGVJbWFnZSBmcm9tICcuL3V0aWwvY3JlYXRlSW1hZ2UnO1xuXG5jb25zdCBCQVNFX1VSTDogc3RyaW5nID0gJ2h0dHBzOi8vd3d3LmFuYXBpb2ZpY2VhbmRmaXJlLmNvbS9hcGkvY2hhcmFjdGVycy8nO1xuXG5mdW5jdGlvbiBnZXRDaGFyYWN0ZXJDYXJkcyhjaGFyYWN0ZXJJbmRleDogbnVtYmVyW10pIHtcbiAgY2hhcmFjdGVySW5kZXgubWFwKGVsZW1lbnQgPT4ge1xuICAgIHNob3dDaGFyYWN0ZXIoZWxlbWVudCk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzaG93Q2hhcmFjdGVyKGNoYXJhY3Rlck5hbWVJbmRleDogbnVtYmVyKSB7XG4gIGNvbnN0IHVybCA9IGAke0JBU0VfVVJMfSR7Y2hhcmFjdGVyTmFtZUluZGV4fWA7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgY29uc3QgZGF0YTogUmVzcG9uc2VPYmpUeXBlcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zdCB7IG5hbWUsIHRpdGxlcywgYWxpYXNlcyB9ID0gZGF0YTtcblxuICAgIGNvbnN0IGNvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbXBvbmVudC5jbGFzc05hbWUgPSAncm93X19pdGVtLS1jYXJkJztcbiAgICBjb21wb25lbnQuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xuICAgIGNvbXBvbmVudC5zZXRBdHRyaWJ1dGUoJ2tleScsIGAke2NoYXJhY3Rlck5hbWVJbmRleH1gKTtcbiAgICBjb25zdCBjYXJkSW1hZ2UgPSBgPGltZyBkcmFnZ2FibGU9XCJmYWxzZVwiIHNyYz0ke2NyZWF0ZUltYWdlKFxuICAgICAgY2hhcmFjdGVyTmFtZUluZGV4LFxuICAgICl9IGNsYXNzPVwiaXRlbS0tY2FyZC1pbWFnZVwiIGFsdD1cIkdhbWUgZmlndXJlIG5vLiR7Y2hhcmFjdGVyTmFtZUluZGV4fVwiPmA7XG4gICAgY29uc3QgY2FyZFRpdGxlID0gYCA8aDM+JHtuYW1lfTwvaDM+YDtcbiAgICBjb25zdCBjYXJkU3ViVGl0bGUgPSBgPHNwYW4+JHt0aXRsZXNbMF0gPyB0aXRsZXNbMF0gOiBhbGlhc2VzWzBdfTwvc3Bhbj5gO1xuICAgIGNvbXBvbmVudC5pbm5lckhUTUwgPSBjYXJkSW1hZ2UgKyBjYXJkVGl0bGUgKyBjYXJkU3ViVGl0bGU7XG5cbiAgICBjaGFyYWN0ZXJMaXN0LmFwcGVuZChjb21wb25lbnQpO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRocm93IGVycjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRDaGFyYWN0ZXJDYXJkcztcbiIsImltcG9ydCB7IGNvbmdyYXR1bGF0aW9uTWVzc2FnZSwgd2lubmVyQ29udGFpbmVyIH0gZnJvbSAnLi91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IGNyZWF0ZUltYWdlIGZyb20gJy4vdXRpbC9jcmVhdGVJbWFnZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2lubmVyIHtcbiAgaW5kZXg6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBzaG93V2lubmVyKHsgaW5kZXgsIG5hbWUgfTogV2lubmVyKTogdm9pZCB7XG4gIGlmICh3aW5uZXJDb250YWluZXIgIT0gbnVsbCkge1xuICAgIGNvbnN0IHdpbm5lckltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgd2lubmVySW1hZ2UuY2xhc3NOYW1lID0gJ2l0ZW0tLXdpbm5lci1pbWFnZSc7XG4gICAgd2lubmVySW1hZ2Uuc3JjID0gYCR7Y3JlYXRlSW1hZ2UoaW5kZXgpfWA7XG4gICAgd2lubmVySW1hZ2UuYWx0ID0gJ0ZlYXR1cmVkIGltYWdlIGZvciB0aGUgd2lubmVyJztcbiAgICB3aW5uZXJDb250YWluZXIuYXBwZW5kQ2hpbGQod2lubmVySW1hZ2UpO1xuICB9XG5cbiAgaWYgKGNvbmdyYXR1bGF0aW9uTWVzc2FnZSAhPSBudWxsKSB7XG4gICAgY29uZ3JhdHVsYXRpb25NZXNzYWdlLmlubmVyVGV4dCA9IGAke25hbWV9IGNsYWltZWQgdGhlIGNyb3duIWA7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2hvd1dpbm5lcjtcbiIsImNvbnN0IHNhbXdlbGw6IG51bWJlciA9IDk1NDtcbmNvbnN0IGpvbjogbnVtYmVyID0gNTgzO1xuY29uc3QgY2Vyc2VpOiBudW1iZXIgPSAyMzg7XG5jb25zdCB0eXJpb246IG51bWJlciA9IDEwNTI7XG5jb25zdCBkYWVuZXJ5czogbnVtYmVyID0gMjcxO1xuY29uc3Qgc2Fuc2E6IG51bWJlciA9IDk1NztcblxuY29uc3QgY2hhcmFjdGVySW5kZXg6IG51bWJlcltdID0gW3NhbXdlbGwsIGpvbiwgY2Vyc2VpLCB0eXJpb24sIGRhZW5lcnlzLCBzYW5zYSxdO1xuZXhwb3J0IGRlZmF1bHQgY2hhcmFjdGVySW5kZXg7XG4iLCIvL3BhZ2U6c2VsZWN0LXBsYXllclxuZXhwb3J0IGNvbnN0IGNoYXJhY3Rlckxpc3Q6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Wm9uZScpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjFTZWxlY3Rpb246IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZFpvbmUxJyk7XG5leHBvcnQgY29uc3QgcGxheWVyMlNlbGVjdGlvbjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kWm9uZTInKTtcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVNlbGVjdGlvbkJ0bjogSFRNTEFuY2hvckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3RhLS12YWxpZGF0aW9uJyk7XG5cbi8vcGFnZTpnYW1lXG5leHBvcnQgY29uc3QgYm9hcmQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVCb2FyZCcpO1xuZXhwb3J0IGNvbnN0IGRpY2VDb250YWluZXI6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpY2VJbWFnZScpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjFCdG46IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi0tUGxheWVyMScpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjJCdG46IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi0tUGxheWVyMicpO1xuXG4vL3BhZ2U6d2lubmVyXG5leHBvcnQgY29uc3Qgd2lubmVyQ29udGFpbmVyOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5uZXInKTtcbmV4cG9ydCBjb25zdCBjb25ncmF0dWxhdGlvbk1lc3NhZ2U6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbmdyYXR1bGF0aW9uJyk7XG5leHBvcnQgY29uc3QgcmVzZXRCdG46IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0Jyk7XG4iLCJmdW5jdGlvbiBjcmVhdGVJbWFnZShpbmRleDogbnVtYmVyKSB7XG4gIHJldHVybiBgaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZG5rZmdtenkxL2ltYWdlL3VwbG9hZC92MTU3NTU0OTY3NC9nYW1lLyR7aW5kZXh9LnBuZ2A7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUltYWdlO1xuIiwiZXhwb3J0IGNvbnN0IGRpY2VJY29ucyA9IHtcbiAgcG9pbnQxOlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzek0yNTYgMjA2YTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwelwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQyOlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptMzE2Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bS0yNjggMjY4QTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDM6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem0zMTYuOTcgMzYuMDNBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pNMjU2IDIwNmE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHpNMTIzLjQ3IDM0MC4wM0E1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQ0OlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptNDguOTcgMzYuMDNBNTAgNTAgMCAwIDEgMTcyIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptLTI2OCAyNjhBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50NTpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTQ4Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDE3MiAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6TTI1NiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6TTEyMy40NyAzNDAuMDNBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50NjpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTQ4Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDE3MiAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6TTEyMiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6bTI2OCAwYTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwek0xMjMuNDcgMzQwLjAzQTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxufTtcblxuZXhwb3J0IGNvbnN0IGRpY2VBcnJheTogc3RyaW5nW10gPSBbXG4gIGRpY2VJY29ucy5wb2ludDEsXG4gIGRpY2VJY29ucy5wb2ludDIsXG4gIGRpY2VJY29ucy5wb2ludDMsXG4gIGRpY2VJY29ucy5wb2ludDQsXG4gIGRpY2VJY29ucy5wb2ludDUsXG4gIGRpY2VJY29ucy5wb2ludDYsXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGljZUljb24oZGljZVBvaW50OiBudW1iZXIpIHtcbiAgcmV0dXJuIGRpY2VBcnJheVtkaWNlUG9pbnQgLSAxXTtcbn1cbiIsImltcG9ydCB7IHBsYXllcjFCdG4sIHBsYXllcjJCdG4gfSBmcm9tICcuL2NvbnRhaW5lcnMnO1xuaW1wb3J0IHsgZGljZUFycmF5IH0gZnJvbSAnLi9kaWNlJztcbmltcG9ydCBjcmVhdGVJbWFnZSBmcm9tICcuL2NyZWF0ZUltYWdlJztcblxuaW50ZXJmYWNlIHRyYXAge1xuICB0b2tlbjogbnVtYmVyO1xuICBhY3Rpb246IG51bWJlcjtcbiAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5jb25zdCB0cmFwMTogdHJhcCA9IHtcbiAgdG9rZW46IDgsXG4gIGFjdGlvbjogMSxcbiAgbWVzc2FnZTogJ1BpcmF0ZXMgYWhlYWQhIFJldHJlYXQgb25lIGZpZWxkIHRvIGF2b2lkIGJlaW5nIG5vdGljZWQuJyxcbn07XG5cbmNvbnN0IHRyYXAyOiB0cmFwID0ge1xuICB0b2tlbjogMTQsXG4gIGFjdGlvbjogMixcbiAgbWVzc2FnZTogJ0Egd29sZiBlbWVyZ2VzIGZyb20gdGhlIG5pZ2h0IHdvb2RzLiBSZXRyZWF0IHR3byBmaWVsZHMgdG8gZXNjYXBlIGl0cyBjaGFzZS4nLFxufTtcblxuY29uc3QgdHJhcDM6IHRyYXAgPSB7XG4gIHRva2VuOiAxOCxcbiAgYWN0aW9uOiAzLFxuICBtZXNzYWdlOlxuICAgICdBIHdoaXRlIHdhbGtlciBoYXMgYmVlbiBzcG90dGVkISBJbW1lZGlhdGVseSByZXRyZWF0IHRocmVlIGZpZWxkcyB0byBuYXJyb3dseSBlc2NhcGUgZGVhdGguJyxcbn07XG5cbmNvbnN0IHRyYXA0OiB0cmFwID0ge1xuICB0b2tlbjogMjQsXG4gIGFjdGlvbjogNCxcbiAgbWVzc2FnZTogJ0VuZW15IGhvcnNlbWVuIG9uIHRoZSBob3Jpem9uISBPdXRudW1iZXJlZCwgeW91IG11c3QgcmV0cmVhdCBmb3VyIGZpZWxkcycsXG59O1xuXG5jb25zdCB0cmFwNTogdHJhcCA9IHtcbiAgdG9rZW46IDI4LFxuICBhY3Rpb246IDUsXG4gIG1lc3NhZ2U6ICdGaXJlLWJyZWF0aGluZyBkcmFnb25zIGFwcGVhciEgUmV0cmVhdCBmaXZlIGZpZWxkcyB0byBlc2NhcGUgdGhlaXIgbG9uZyBnYXplLicsXG59O1xuXG5leHBvcnQgY29uc3QgdHJhcHM6IHRyYXBbXSA9IFt0cmFwMSwgdHJhcDIsIHRyYXAzLCB0cmFwNCwgdHJhcDVdO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQm9hcmQoY29udGFpbmVyOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICBmb3IgKGxldCBpOiBudW1iZXIgPSAxOyBpIDw9IDMwOyBpKyspIHtcbiAgICBjb25zdCB0aWxlOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRpbGUuY2xhc3NOYW1lID0gYGJvYXJkX190aWxlYDtcbiAgICB0aWxlLnNldEF0dHJpYnV0ZSgnaWQnLCBgdGlsZS1pbmRleC0ke2l9YCk7XG5cbiAgICBpZiAoaSAlIDIgIT09IDApIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2Jyb3duJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgIH1cblxuICAgIHRyYXBzLm1hcChlbGVtZW50ID0+IHtcbiAgICAgIGlmIChlbGVtZW50LnRva2VuID09PSBpKSB7XG4gICAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvdyc7XG4gICAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZG5rZmdtenkxL2ltYWdlL3VwbG9hZC92MTU3NTY1NTczNC9nYW1lL3RyYXAke2VsZW1lbnQuYWN0aW9ufS5zdmcnKWA7XG4gICAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnNHJlbSc7XG4gICAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9ICduby1yZXBlYXQnO1xuICAgICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICdjZW50ZXIgY2VudGVyJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aWxlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUGxheWVyMUJ1dHRvbihpc1BsYXllcjFUdXJuOiBib29sZWFuKTogdm9pZCB7XG4gIGlmIChpc1BsYXllcjFUdXJuKSB7XG4gICAgcGxheWVyMUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHBsYXllcjJCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHBsYXllcjFCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIHBsYXllcjJCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0RpY2VSZXN1bHQoY29udGFpbmVyOiBIVE1MRWxlbWVudCwgcG9pbnQ6IG51bWJlcikge1xuICBjb250YWluZXIuaW5uZXJIVE1MID0gZGljZUFycmF5W3BvaW50IC0gMV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb2xsRGljZSgpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNikgKyAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlUGxheWVyKHBsYXllcjogbnVtYmVyKTogdm9pZCB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBmaWd1cmUtJHtwbGF5ZXJ9YCkucmVtb3ZlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5UGxheWVycyhjb250YWluZXI6IEhUTUxFbGVtZW50LCBwbGF5ZXJJbmRleDogbnVtYmVyKSB7XG4gIGNvbnN0IHBsYXllcjogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gIHBsYXllci5zcmMgPSBgJHtjcmVhdGVJbWFnZShwbGF5ZXJJbmRleCl9YDtcblxuICBwbGF5ZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdib2FyZF9fZmlndXJlJyk7XG5cbiAgcGxheWVyLnNldEF0dHJpYnV0ZSgnYWx0JywgYEdhbWUgZmlndXJlIG5vLiR7cGxheWVySW5kZXh9YCk7XG5cbiAgcGxheWVyLnNldEF0dHJpYnV0ZSgnaWQnLCBgZmlndXJlLSR7cGxheWVySW5kZXh9YCk7XG5cbiAgaWYgKGNvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllcik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrV2lubmVyKHBsYXllclN0YXR1czogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBwbGF5ZXJTdGF0dXMgPj0gMzAgPyB0cnVlIDogZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lRW5kKHdpbm5lcjogbnVtYmVyKSB7XG4gIHBsYXllcjFCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICBwbGF5ZXIyQnRuLmRpc2FibGVkID0gdHJ1ZTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBoYXNTZWxlY3RlZChjb250YWluZXI6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gIHJldHVybiBjb250YWluZXIuaGFzQ2hpbGROb2RlcygpO1xufVxuIiwiY2xhc3MgU3RvcmFnZSB7XG4gIHByaXZhdGUgc3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG5cbiAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gIH1cblxuICBnZXQoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICB9XG5cbiAgZGVsZXRlKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfVxuXG4gIHNldFNlcmlhbGl6ZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuc2V0KGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgfVxuXG4gIGdldFVuc2VyaWFsaXplPFQ+KGtleTogc3RyaW5nKTogVCB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0KGtleSk7XG5cbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpIGFzIFQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RvcmFnZTtcbiJdfQ==
