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
        console.log(1111111987798);
        if (containers_1.winnerContainer != null) {
          var winner = {
            index: 238,
            name: 'Player 1',
          };
          console.log(99999999);
          showWinner_1.default(winner);
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
        var gameHelpers_1 = require('./util/gameHelpers');
        var containers_1 = require('./util/containers');
        var showWinner_1 = require('../scripts/showWinner');
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
              var winner_1 = {
                index: player1,
                name: 'Player 1',
              };
              gameHelpers_1.removePlayer(player1);
              gameHelpers_1.displayPlayers(finalPosition, player1);
              gameHelpers_1.gameEnd(player1);
              setTimeout(function() {
                window.location.href = 'winner.html';
                showWinner_1.default(winner_1);
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
              var winner_2 = {
                index: player2,
                name: 'Player 2',
              };
              gameHelpers_1.removePlayer(player2);
              gameHelpers_1.displayPlayers(finalPosition, player2);
              gameHelpers_1.gameEnd(player2);
              setTimeout(function() {
                window.location.href = 'winner.html';
                showWinner_1.default(winner_2);
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
      { '../scripts/showWinner': 6, './util/containers': 8, './util/gameHelpers': 11 },
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
        var characterIndex = [samwell, jon, cersei, tyrion, daenerys];
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
        exports.board = document.querySelector('.gameBoard');
        exports.diceContainer = document.getElementById('diceImage');
        exports.player1Btn = document.querySelector('.btn-Player1');
        exports.player2Btn = document.querySelector('.btn-Player2');
        exports.winnerContainer = document.getElementById('winner');
        exports.congratulationMessage = document.getElementById('congratulation');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXgudHMiLCJzcmMvc2NyaXB0cy9oYW5kbGVEcmFnLnRzIiwic3JjL3NjcmlwdHMvaGFuZGxlU2VsZWN0aW9uLnRzIiwic3JjL3NjcmlwdHMvcGxheUdhbWUudHMiLCJzcmMvc2NyaXB0cy9zaG93Q2hhcmFjdGVyLnRzIiwic3JjL3NjcmlwdHMvc2hvd1dpbm5lci50cyIsInNyYy9zY3JpcHRzL3V0aWwvY2hhcmFjdGVySW5kZXgudHMiLCJzcmMvc2NyaXB0cy91dGlsL2NvbnRhaW5lcnMudHMiLCJzcmMvc2NyaXB0cy91dGlsL2NyZWF0ZUltYWdlLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9kaWNlLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9nYW1lSGVscGVycy50cyIsInNyYy9zY3JpcHRzL3V0aWwvaGFzU2VsZWN0ZWQudHMiLCJzcmMvc2NyaXB0cy91dGlsL3N0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLG1EQUE4QztBQUM5Qyw2REFBNEQ7QUFDNUQsK0NBQTBDO0FBQzFDLHlEQUF3RDtBQUN4RCxtREFBeUU7QUFDekUsZ0VBQTJEO0FBQzNELHdEQU1tQztBQUNuQywwREFBbUY7QUFDbkYsa0RBQTZDO0FBRWhDLFFBQUEsV0FBVyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO0FBRXpDLElBQUksMEJBQWEsSUFBSSxJQUFJLEVBQUU7SUFDekIsdUJBQWlCLENBQUMsd0JBQWMsQ0FBQyxDQUFDO0lBQ2xDLG9CQUFVLEVBQUUsQ0FBQztJQUNiLElBQUksaUNBQW9CLElBQUksSUFBSTtRQUM5QixpQ0FBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsaUNBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUMxRTtBQUVELElBQUksa0JBQUssSUFBSSxJQUFJLElBQUksMEJBQWEsSUFBSSxJQUFJLEVBQUU7SUFDMUMsSUFBTSxPQUFPLEdB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RUQsd0JBQU0sR0FBTixVQUFPLEdBQVc7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELDhCQUFZLEdBQVosVUFBYSxHQUFXLEVBQUUsS0FBVTtRQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELGdDQUFjLEdBQWQsVUFBa0IsR0FBVztRQUMzQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBTSxDQUFDO0lBQy9CLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0E1QkEsQUE0QkMsSUFBQTtBQUVELGtCQUFlLE9BQU8sQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBoYW5kbGVEcmFnIGZyb20gJy4vc2NyaXB0cy9oYW5kbGVEcmFnJztcbmltcG9ydCB7IGhhbmRsZVNlbGVjdGlvbiB9IGZyb20gJy4vc2NyaXB0cy9oYW5kbGVTZWxlY3Rpb24nO1xuaW1wb3J0IHBsYXlHYW1lIGZyb20gJy4vc2NyaXB0cy9wbGF5R2FtZSc7XG5pbXBvcnQgZ2V0Q2hhcmFjdGVyQ2FyZHMgZnJvbSAnLi9zY3JpcHRzL3Nob3dDaGFyYWN0ZXInO1xuaW1wb3J0IHNob3dXaW5uZXIsIHsgV2lubmVyIGFzIFdpbm5lclR5cGVzIH0gZnJvbSAnLi9zY3JpcHRzL3Nob3dXaW5uZXInO1xuaW1wb3J0IGNoYXJhY3RlckluZGV4IGZyb20gJy4vc2NyaXB0cy91dGlsL2NoYXJhY3RlckluZGV4JztcbmltcG9ydCB7XG4gIGJvYXJkLFxuICBjaGFyYWN0ZXJMaXN0LFxuICBkaWNlQ29udGFpbmVyLFxuICB2YWxpZGF0ZVNlbGVjdGlvbkJ0bixcbiAgd2lubmVyQ29udGFpbmVyLFxufSBmcm9tICcuL3NjcmlwdHMvdXRpbC9jb250YWluZXJzJztcbmltcG9ydCB7IGNyZWF0ZUJvYXJkLCByb2xsRGljZSwgc2hvd0RpY2VSZXN1bHQgfSBmcm9tICcuL3NjcmlwdHMvdXRpbC9nYW1lSGVscGVycyc7XG5pbXBvcnQgU3RvcmFnZSBmcm9tICcuL3NjcmlwdHMvdXRpbC9zdG9yYWdlJztcblxuZXhwb3J0IGNvbnN0IGdhbWVTdG9yYWdlID0gbmV3IFN0b3JhZ2UoKTtcblxuaWYgKGNoYXJhY3Rlckxpc3QgIT0gbnVsbCkge1xuICBnZXRDaGFyYWN0ZXJDYXJkcyhjaGFyYWN0ZXJJbmRleCk7XG4gIGhhbmRsZURyYWcoKTtcbiAgaWYgKHZhbGlkYXRlU2VsZWN0aW9uQnRuICE9IG51bGwpXG4gICAgdmFsaWRhdGVTZWxlY3Rpb25CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVTZWxlY3Rpb24sIGZhbHNlKTtcbn1cblxuaWYgKGJvYXJkICE9IG51bGwgJiYgZGljZUNvbnRhaW5lciAhPSBudWxsKSB7XG4gIGNvbnN0IHBsYXllcjE6IG51bWJlciA9IGdhbWVTdG9yYWdlLmdldFVuc2VyaWFsaXplKCdwbGF5ZXIxSW5kZXgnKTtcbiAgY29uc3QgcGxheWVyMjogbnVtYmVyID0gZ2FtZVN0b3JhZ2UuZ2V0VW5zZXJpYWxpemUoJ3BsYXllcjJJbmRleCcpO1xuICBjcmVhdGVCb2FyZChib2FyZCk7XG4gIHNob3dEaWNlUmVzdWx0KGRpY2VDb250YWluZXIsIHJvbGxEaWNlKCkpO1xuXG4gIGlmIChwbGF5ZXIxICYmIHBsYXllcjIpIHtcbiAgICBwbGF5R2FtZShwbGF5ZXIxLCBwbGF5ZXIyKTtcbiAgfVxufVxuXG5jb25zb2xlLmxvZygxMTExMTExOTg3Nzk4KTtcblxuaWYgKHdpbm5lckNvbnRhaW5lciAhPSBudWxsKSB7XG4gIGNvbnN0IHdpbm5lcjogV2lubmVyVHlwZXMgPSB7XG4gICAgaW5kZXg6IDIzOCxcbiAgICBuYW1lOiAnUGxheWVyIDEnLFxuICB9O1xuICBjb25zb2xlLmxvZyg5OTk5OTk5OSk7XG4gIHNob3dXaW5uZXIod2lubmVyKTtcbn1cbiIsImltcG9ydCB7IGdhbWVTdG9yYWdlIH0gZnJvbSAnLi4vaW5kZXgnO1xubGV0IGRyYWdnZWQ6IEhUTUxFbGVtZW50O1xuXG5mdW5jdGlvbiBoYW5kbGVEcmFnU3RhcnQoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICBkcmFnZ2VkID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5vcGFjaXR5ID0gJzAuNSc7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWdFbmQoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5vcGFjaXR5ID0gJyc7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWdPdmVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhZ0VudGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnc3RhcnRab25lJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnIzc0NTYyNSc7XG4gIH1cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnZW5kWm9uZTEnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcjNzQ1NjI1JztcbiAgfVxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdlbmRab25lMicpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyM3NDU2MjUnO1xuICB9XG59XG5mdW5jdGlvbiBoYW5kbGVEcmFnTGVhdmUoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdzdGFydFpvbmUnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICB9XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ2VuZFpvbmUxJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgfVxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdlbmRab25lMicpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJvcChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIC8vIHByZXZlbnQgZGVmYXVsdCBhY3Rpb24gKG9wZW4gYXMgbGluayBmb3Igc29tZSBlbGVtZW50cylcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAvLyBtb3ZlIGRyYWdnZWQgZWxlbSB0byB0aGUgc2VsZWN0ZWQgZHJvcCB0YXJnZXRcbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09ICdlbmRab25lMScpIHtcbiAgICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICBhbGVydCgnT25seSBvbmUgY2hhcmFjdGVyIGlzIGFsbG93ZWQuJyk7XG4gICAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGRyYWdnZWQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkcmFnZ2VkKTtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5hcHBlbmRDaGlsZChkcmFnZ2VkKTtcbiAgICBnYW1lU3RvcmFnZS5zZXQoJ3BsYXllcjFJbmRleCcsIGAke2RyYWdnZWQuZ2V0QXR0cmlidXRlKCdrZXknKX1gKTtcbiAgfVxuXG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PSAnZW5kWm9uZTInKSB7XG4gICAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgYWxlcnQoJ09ubHkgb25lIGNoYXJhY3RlciBpcyBhbGxvd2VkLicpO1xuICAgICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICBkcmFnZ2VkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZHJhZ2dlZCk7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgZ2FtZVN0b3JhZ2Uuc2V0KCdwbGF5ZXIySW5kZXgnLCBgJHtkcmFnZ2VkLmdldEF0dHJpYnV0ZSgna2V5Jyl9YCk7XG4gIH1cblxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT0gJ3N0YXJ0Wm9uZScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgZHJhZ2dlZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRyYWdnZWQpO1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgIGNvbnNvbGUubG9nKGRyYWdnZWQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWcoKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGhhbmRsZURyYWdTdGFydCk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBoYW5kbGVEcmFnRW5kKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBoYW5kbGVEcmFnT3Zlcik7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGhhbmRsZURyYWdFbnRlcik7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGhhbmRsZURyYWdMZWF2ZSk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBoYW5kbGVEcm9wKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlRHJhZztcbiIsImltcG9ydCB7IHBsYXllcjFTZWxlY3Rpb24sIHBsYXllcjJTZWxlY3Rpb24gfSBmcm9tICcuL3V0aWwvY29udGFpbmVycyc7XG5pbXBvcnQgeyBoYXNTZWxlY3RlZCB9IGZyb20gJy4vdXRpbC9oYXNTZWxlY3RlZCc7XG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlU2VsZWN0aW9uKCk6IHZvaWQge1xuICBjb25zdCBoYXNQbGF5ZXIxU2VsZWN0ZWQgPSBoYXNTZWxlY3RlZChwbGF5ZXIxU2VsZWN0aW9uKTtcbiAgY29uc3QgaGFzUGxheWVyMlNlbGVjdGVkID0gaGFzU2VsZWN0ZWQocGxheWVyMlNlbGVjdGlvbik7XG4gIGlmIChoYXNQbGF5ZXIxU2VsZWN0ZWQgJiYgaGFzUGxheWVyMlNlbGVjdGVkKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnZ2FtZS5odG1sJztcbiAgfSBlbHNlIHtcbiAgICBhbGVydCgnU2VsZWN0IGNoYXJhY3RlciBmaXJzdCwgdGhlbiBzdGFydCB0aGUgZ2FtZScpO1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBzaG93RGljZVJlc3VsdCxcbiAgdXBkYXRlUGxheWVyMUJ1dHRvbixcbiAgcm9sbERpY2UsXG4gIGRpc3BsYXlQbGF5ZXJzLFxuICByZW1vdmVQbGF5ZXIsXG4gIGNoZWNrV2lubmVyLFxuICBnYW1lRW5kLFxuICB0cmFwcyxcbn0gZnJvbSAnLi91dGlsL2dhbWVIZWxwZXJzJztcbmltcG9ydCB7IGRpY2VDb250YWluZXIsIHBsYXllcjFCdG4sIHBsYXllcjJCdG4gfSBmcm9tICcuL3V0aWwvY29udGFpbmVycyc7XG5pbXBvcnQgc2hvd1dpbm5lciwgeyBXaW5uZXIgYXMgV2lubmVyVHlwZXMgfSBmcm9tICcuLi9zY3JpcHRzL3Nob3dXaW5uZXInO1xuXG5mdW5jdGlvbiBwbGF5R2FtZShwbGF5ZXIxOiBudW1iZXIsIHBsYXllcjI6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBzdGFydFBvc2l0aW9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aWxlLWluZGV4LTEnKTtcbiAgY29uc3QgZmluYWxQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aWxlLWluZGV4LTMwJyk7XG5cbiAgbGV0IHBsYXllcjFTdGF0dXM6IG51bWJlciA9IDE7XG4gIGxldCBwbGF5ZXIyU3RhdHVzOiBudW1iZXIgPSAxO1xuXG4gIGRpc3BsYXlQbGF5ZXJzKHN0YXJ0UG9zaXRpb24sIHBsYXllcjEpO1xuICBkaXNwbGF5UGxheWVycyhzdGFydFBvc2l0aW9uLCBwbGF5ZXIyKTtcbiAgdXBkYXRlUGxheWVyMUJ1dHRvbih0cnVlKTtcbiAgcGxheWVyMUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1blBsYXllcjFUdXJuLCBmYWxzZSk7XG4gIHBsYXllcjJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW5QbGF5ZXIyVHVybiwgZmFsc2UpO1xuXG4gIGZ1bmN0aW9uIHJ1blBsYXllcjFUdXJuKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnREaWNlUG9pbnQgPSByb2xsRGljZSgpO1xuICAgIHNob3dEaWNlUmVzdWx0KGRpY2VDb250YWluZXIsIGN1cnJlbnREaWNlUG9pbnQpO1xuICAgIHBsYXllcjFTdGF0dXMgKz0gY3VycmVudERpY2VQb2ludDtcblxuICAgIGlmIChjaGVja1dpbm5lcihwbGF5ZXIxU3RhdHVzKSkge1xuICAgICAgY29uc3Qgd2lubmVyOiBXaW5uZXJUeXBlcyA9IHtcbiAgICAgICAgaW5kZXg6IHBsYXllcjEsXG4gICAgICAgIG5hbWU6ICdQbGF5ZXIgMScsXG4gICAgICB9O1xuICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjEpO1xuICAgICAgZGlzcGxheVBsYXllcnMoZmluYWxQb3NpdGlvbiwgcGxheWVyMSk7XG4gICAgICBnYW1lRW5kKHBsYXllcjEpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnd2lubmVyLmh0bWwnO1xuICAgICAgICBzaG93V2lubmVyKHdpbm5lcik7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoYFBsYXllciAxIHJvbGxlZDogJHtjdXJyZW50RGljZVBvaW50fWApO1xuXG4gICAgICBjb25zdCB1cGRhdGVQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0aWxlLWluZGV4LSR7cGxheWVyMVN0YXR1c31gKTtcbiAgICAgIHJlbW92ZVBsYXllcihwbGF5ZXIxKTtcbiAgICAgIGRpc3BsYXlQbGF5ZXJzKHVwZGF0ZVBvc2l0aW9uLCBwbGF5ZXIxKTtcblxuICAgICAgdHJhcHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQudG9rZW4gPT0gcGxheWVyMVN0YXR1cykge1xuICAgICAgICAgIGNvbnN0IHsgYWN0aW9uLCBtZXNzYWdlIH0gPSBlbGVtZW50O1xuICAgICAgICAgIHBsYXllcjFTdGF0dXMgLT0gYWN0aW9uO1xuICAgICAgICAgIGNvbnN0IG5ld1Bvc2l0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRpbGUtaW5kZXgtJHtwbGF5ZXIxU3RhdHVzfWApO1xuICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1Bvc2l0aW9uKTtcblxuICAgICAgICAgIGFsZXJ0KGAke21lc3NhZ2V9YCk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjEpO1xuICAgICAgICAgICAgZGlzcGxheVBsYXllcnMobmV3UG9zaXRpb24sIHBsYXllcjEpO1xuICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdXBkYXRlUGxheWVyMUJ1dHRvbihmYWxzZSk7XG5cbiAgICAgIGlmIChjdXJyZW50RGljZVBvaW50ID09PSA2KSB7XG4gICAgICAgIGFsZXJ0KCdTaW5jZSB5b3Ugcm9sbGVkIDYsIHlvdSBnb3QgYSBCb251cyBtb3ZlbWVudC4gUm9sbCB0aGUgZGljZSBhZ2FpbicpO1xuICAgICAgICB1cGRhdGVQbGF5ZXIxQnV0dG9uKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1blBsYXllcjJUdXJuKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnREaWNlUG9pbnQgPSByb2xsRGljZSgpO1xuICAgIHNob3dEaWNlUmVzdWx0KGRpY2VDb250YWluZXIsIGN1cnJlbnREaWNlUG9pbnQpO1xuICAgIHBsYXllcjJTdGF0dXMgKz0gY3VycmVudERpY2VQb2ludDtcblxuICAgIGlmIChjaGVja1dpbm5lcihwbGF5ZXIyU3RhdHVzKSkge1xuICAgICAgY29uc3Qgd2lubmVyOiBXaW5uZXJUeXBlcyA9IHtcbiAgICAgICAgaW5kZXg6IHBsYXllcjIsXG4gICAgICAgIG5hbWU6ICdQbGF5ZXIgMicsXG4gICAgICB9O1xuICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjIpO1xuICAgICAgZGlzcGxheVBsYXllcnMoZmluYWxQb3NpdGlvbiwgcGxheWVyMik7XG4gICAgICBnYW1lRW5kKHBsYXllcjIpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnd2lubmVyLmh0bWwnO1xuICAgICAgICBzaG93V2lubmVyKHdpbm5lcik7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoYFBsYXllciAyIHJvbGxlZDogJHtjdXJyZW50RGljZVBvaW50fWApO1xuXG4gICAgICBjb25zdCB1cGRhdGVQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0aWxlLWluZGV4LSR7cGxheWVyMlN0YXR1c31gKTtcbiAgICAgIHJlbW92ZVBsYXllcihwbGF5ZXIyKTtcbiAgICAgIGRpc3BsYXlQbGF5ZXJzKHVwZGF0ZVBvc2l0aW9uLCBwbGF5ZXIyKTtcblxuICAgICAgdHJhcHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQudG9rZW4gPT0gcGxheWVyMlN0YXR1cykge1xuICAgICAgICAgIGNvbnN0IHsgYWN0aW9uLCBtZXNzYWdlIH0gPSBlbGVtZW50O1xuICAgICAgICAgIHBsYXllcjJTdGF0dXMgLT0gYWN0aW9uO1xuICAgICAgICAgIGNvbnN0IG5ld1Bvc2l0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRpbGUtaW5kZXgtJHtwbGF5ZXIyU3RhdHVzfWApO1xuICAgICAgICAgIGNvbnNvbGUubG9nKG5ld1Bvc2l0aW9uKTtcblxuICAgICAgICAgIGFsZXJ0KGAke21lc3NhZ2V9YCk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coMTExMTExMSk7XG4gICAgICAgICAgICByZW1vdmVQbGF5ZXIocGxheWVyMik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygyMjIyMjIyKTtcbiAgICAgICAgICAgIGRpc3BsYXlQbGF5ZXJzKG5ld1Bvc2l0aW9uLCBwbGF5ZXIyKTtcbiAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHVwZGF0ZVBsYXllcjFCdXR0b24odHJ1ZSk7XG5cbiAgICAgIGlmIChjdXJyZW50RGljZVBvaW50ID09PSA2KSB7XG4gICAgICAgIGFsZXJ0KCdTaW5jZSB5b3Ugcm9sbGVkIDYsIHlvdSBnb3QgYSBCb251cyBtb3ZlbWVudC4gUm9sbCB0aGUgZGljZSBhZ2FpbicpO1xuICAgICAgICB1cGRhdGVQbGF5ZXIxQnV0dG9uKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGxheUdhbWU7XG4iLCJpbXBvcnQgeyBjaGFyYWN0ZXJMaXN0IH0gZnJvbSAnLi91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IHsgUmVzcG9uc2VPYmpUeXBlcyB9IGZyb20gJy4vdXRpbC90eXBlcyc7XG5pbXBvcnQgY3JlYXRlSW1hZ2UgZnJvbSAnLi91dGlsL2NyZWF0ZUltYWdlJztcblxuY29uc3QgQkFTRV9VUkw6IHN0cmluZyA9ICdodHRwczovL3d3dy5hbmFwaW9maWNlYW5kZmlyZS5jb20vYXBpL2NoYXJhY3RlcnMvJztcblxuZnVuY3Rpb24gZ2V0Q2hhcmFjdGVyQ2FyZHMoY2hhcmFjdGVySW5kZXg6IG51bWJlcltdKSB7XG4gIGNoYXJhY3RlckluZGV4Lm1hcChlbGVtZW50ID0+IHtcbiAgICBzaG93Q2hhcmFjdGVyKGVsZW1lbnQpO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2hvd0NoYXJhY3RlcihjaGFyYWN0ZXJOYW1lSW5kZXg6IG51bWJlcikge1xuICBjb25zdCB1cmwgPSBgJHtCQVNFX1VSTH0ke2NoYXJhY3Rlck5hbWVJbmRleH1gO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgIGNvbnN0IGRhdGE6IFJlc3BvbnNlT2JqVHlwZXMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc3QgeyBuYW1lLCB0aXRsZXMsIGFsaWFzZXMgfSA9IGRhdGE7XG5cbiAgICBjb25zdCBjb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21wb25lbnQuY2xhc3NOYW1lID0gJ3Jvd19faXRlbS0tY2FyZCc7XG4gICAgY29tcG9uZW50LnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcbiAgICBjb21wb25lbnQuc2V0QXR0cmlidXRlKCdrZXknLCBgJHtjaGFyYWN0ZXJOYW1lSW5kZXh9YCk7XG4gICAgY29uc3QgY2FyZEltYWdlID0gYDxpbWcgZHJhZ2dhYmxlPVwiZmFsc2VcIiBzcmM9JHtjcmVhdGVJbWFnZShcbiAgICAgIGNoYXJhY3Rlck5hbWVJbmRleCxcbiAgICApfSBjbGFzcz1cIml0ZW0tLWNhcmQtaW1hZ2VcIiBhbHQ9XCJHYW1lIGZpZ3VyZSBuby4ke2NoYXJhY3Rlck5hbWVJbmRleH1cIj5gO1xuICAgIGNvbnN0IGNhcmRUaXRsZSA9IGAgPGgzPiR7bmFtZX08L2gzPmA7XG4gICAgY29uc3QgY2FyZFN1YlRpdGxlID0gYDxzcGFuPiR7dGl0bGVzWzBdID8gdGl0bGVzWzBdIDogYWxpYXNlc1swXX08L3NwYW4+YDtcbiAgICBjb21wb25lbnQuaW5uZXJIVE1MID0gY2FyZEltYWdlICsgY2FyZFRpdGxlICsgY2FyZFN1YlRpdGxlO1xuXG4gICAgY2hhcmFjdGVyTGlzdC5hcHBlbmQoY29tcG9uZW50KTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0Q2hhcmFjdGVyQ2FyZHM7XG4iLCJpbXBvcnQgeyBjb25ncmF0dWxhdGlvbk1lc3NhZ2UsIHdpbm5lckNvbnRhaW5lciB9IGZyb20gJy4vdXRpbC9jb250YWluZXJzJztcbmltcG9ydCBjcmVhdGVJbWFnZSBmcm9tICcuL3V0aWwvY3JlYXRlSW1hZ2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFdpbm5lciB7XG4gIGluZGV4OiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbn1cblxuZnVuY3Rpb24gc2hvd1dpbm5lcih7IGluZGV4LCBuYW1lIH06IFdpbm5lcik6IHZvaWQge1xuICBpZiAod2lubmVyQ29udGFpbmVyICE9IG51bGwpIHtcbiAgICBjb25zdCB3aW5uZXJJbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHdpbm5lckltYWdlLmNsYXNzTmFtZSA9ICdpdGVtLS13aW5uZXItaW1hZ2UnO1xuICAgIHdpbm5lckltYWdlLnNyYyA9IGAke2NyZWF0ZUltYWdlKGluZGV4KX1gO1xuICAgIHdpbm5lckltYWdlLmFsdCA9ICdGZWF0dXJlZCBpbWFnZSBmb3IgdGhlIHdpbm5lcic7XG4gICAgd2lubmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHdpbm5lckltYWdlKTtcbiAgfVxuXG4gIGlmIChjb25ncmF0dWxhdGlvbk1lc3NhZ2UgIT0gbnVsbCkge1xuICAgIGNvbmdyYXR1bGF0aW9uTWVzc2FnZS5pbm5lclRleHQgPSBgJHtuYW1lfSBjbGFpbWVkIHRoZSBjcm93biFgO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNob3dXaW5uZXI7XG4iLCJjb25zdCBzYW13ZWxsOiBudW1iZXIgPSA5NTQ7XG5jb25zdCBqb246IG51bWJlciA9IDU4MztcbmNvbnN0IGNlcnNlaTogbnVtYmVyID0gMjM4O1xuY29uc3QgdHlyaW9uOiBudW1iZXIgPSAxMDUyO1xuY29uc3QgZGFlbmVyeXM6IG51bWJlciA9IDI3MTtcblxuY29uc3QgY2hhcmFjdGVySW5kZXg6IG51bWJlcltdID0gW3NhbXdlbGwsIGpvbiwgY2Vyc2VpLCB0eXJpb24sIGRhZW5lcnlzXTtcbmV4cG9ydCBkZWZhdWx0IGNoYXJhY3RlckluZGV4O1xuIiwiLy9wYWdlOnNlbGVjdC1wbGF5ZXJcbmV4cG9ydCBjb25zdCBjaGFyYWN0ZXJMaXN0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydFpvbmUnKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXIxU2VsZWN0aW9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmRab25lMScpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjJTZWxlY3Rpb246IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZFpvbmUyJyk7XG5leHBvcnQgY29uc3QgdmFsaWRhdGVTZWxlY3Rpb25CdG46IEhUTUxBbmNob3JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN0YS0tdmFsaWRhdGlvbicpO1xuXG4vL3BhZ2U6Z2FtZVxuZXhwb3J0IGNvbnN0IGJvYXJkOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lQm9hcmQnKTtcbmV4cG9ydCBjb25zdCBkaWNlQ29udGFpbmVyOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWNlSW1hZ2UnKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXIxQnRuOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tUGxheWVyMScpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjJCdG46IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1QbGF5ZXIyJyk7XG5cbi8vcGFnZTp3aW5uZXJcbmV4cG9ydCBjb25zdCB3aW5uZXJDb250YWluZXI6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbm5lcicpO1xuZXhwb3J0IGNvbnN0IGNvbmdyYXR1bGF0aW9uTWVzc2FnZTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29uZ3JhdHVsYXRpb24nKTtcbiIsImZ1bmN0aW9uIGNyZWF0ZUltYWdlKGluZGV4OiBudW1iZXIpIHtcbiAgcmV0dXJuIGBodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kbmtmZ216eTEvaW1hZ2UvdXBsb2FkL3YxNTc1NTQ5Njc0L2dhbWUvJHtpbmRleH0ucG5nYDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlSW1hZ2U7XG4iLCJleHBvcnQgY29uc3QgZGljZUljb25zID0ge1xuICBwb2ludDE6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6TTI1NiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDI6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem0zMTYuOTcgMzYuMDNBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptLTI2OCAyNjhBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50MzpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTMxNi45NyAzNi4wM0E1MCA1MCAwIDAgMSA0NDAgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3ek0yNTYgMjA2YTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwek0xMjMuNDcgMzQwLjAzQTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDQ6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem00OC45NyAzNi4wM0E1MCA1MCAwIDAgMSAxNzIgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0tMjY4IDI2OEE1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQ1OlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptNDguOTcgMzYuMDNBNTAgNTAgMCAwIDEgMTcyIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pNMjU2IDIwNmE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHpNMTIzLjQ3IDM0MC4wM0E1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQ2OlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptNDguOTcgMzYuMDNBNTAgNTAgMCAwIDEgMTcyIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pNMTIyIDIwNmE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHptMjY4IDBhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6TTEyMy40NyAzNDAuMDNBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG59O1xuXG5leHBvcnQgY29uc3QgZGljZUFycmF5OiBzdHJpbmdbXSA9IFtcbiAgZGljZUljb25zLnBvaW50MSxcbiAgZGljZUljb25zLnBvaW50MixcbiAgZGljZUljb25zLnBvaW50MyxcbiAgZGljZUljb25zLnBvaW50NCxcbiAgZGljZUljb25zLnBvaW50NSxcbiAgZGljZUljb25zLnBvaW50Nixcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEaWNlSWNvbihkaWNlUG9pbnQ6IG51bWJlcikge1xuICByZXR1cm4gZGljZUFycmF5W2RpY2VQb2ludCAtIDFdO1xufVxuIiwiaW1wb3J0IHsgcGxheWVyMUJ0biwgcGxheWVyMkJ0biB9IGZyb20gJy4vY29udGFpbmVycyc7XG5pbXBvcnQgeyBkaWNlQXJyYXkgfSBmcm9tICcuL2RpY2UnO1xuaW1wb3J0IGNyZWF0ZUltYWdlIGZyb20gJy4vY3JlYXRlSW1hZ2UnO1xuXG5pbnRlcmZhY2UgdHJhcCB7XG4gIHRva2VuOiBudW1iZXI7XG4gIGFjdGlvbjogbnVtYmVyO1xuICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmNvbnN0IHRyYXAxOiB0cmFwID0ge1xuICB0b2tlbjogOCxcbiAgYWN0aW9uOiAxLFxuICBtZXNzYWdlOiAnUGlyYXRlcyBhaGVhZCEgUmV0cmVhdCBvbmUgZmllbGQgdG8gYXZvaWQgYmVpbmcgbm90aWNlZC4nLFxufTtcblxuY29uc3QgdHJhcDI6IHRyYXAgPSB7XG4gIHRva2VuOiAxNCxcbiAgYWN0aW9uOiAyLFxuICBtZXNzYWdlOiAnQSB3b2xmIGVtZXJnZXMgZnJvbSB0aGUgbmlnaHQgd29vZHMuIFJldHJlYXQgdHdvIGZpZWxkcyB0byBlc2NhcGUgaXRzIGNoYXNlLicsXG59O1xuXG5jb25zdCB0cmFwMzogdHJhcCA9IHtcbiAgdG9rZW46IDE4LFxuICBhY3Rpb246IDMsXG4gIG1lc3NhZ2U6XG4gICAgJ0Egd2hpdGUgd2Fsa2VyIGhhcyBiZWVuIHNwb3R0ZWQhIEltbWVkaWF0ZWx5IHJldHJlYXQgdGhyZWUgZmllbGRzIHRvIG5hcnJvd2x5IGVzY2FwZSBkZWF0aC4nLFxufTtcblxuY29uc3QgdHJhcDQ6IHRyYXAgPSB7XG4gIHRva2VuOiAyNCxcbiAgYWN0aW9uOiA0LFxuICBtZXNzYWdlOiAnRW5lbXkgaG9yc2VtZW4gb24gdGhlIGhvcml6b24hIE91dG51bWJlcmVkLCB5b3UgbXVzdCByZXRyZWF0IGZvdXIgZmllbGRzJyxcbn07XG5cbmNvbnN0IHRyYXA1OiB0cmFwID0ge1xuICB0b2tlbjogMjgsXG4gIGFjdGlvbjogNSxcbiAgbWVzc2FnZTogJ0ZpcmUtYnJlYXRoaW5nIGRyYWdvbnMgYXBwZWFyISBSZXRyZWF0IGZpdmUgZmllbGRzIHRvIGVzY2FwZSB0aGVpciBsb25nIGdhemUuJyxcbn07XG5cbmV4cG9ydCBjb25zdCB0cmFwczogdHJhcFtdID0gW3RyYXAxLCB0cmFwMiwgdHJhcDMsIHRyYXA0LCB0cmFwNV07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCb2FyZChjb250YWluZXI6IEhUTUxEaXZFbGVtZW50KTogdm9pZCB7XG4gIGZvciAobGV0IGk6IG51bWJlciA9IDE7IGkgPD0gMzA7IGkrKykge1xuICAgIGNvbnN0IHRpbGU6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGlsZS5jbGFzc05hbWUgPSBgdGlsZWA7XG4gICAgdGlsZS5zZXRBdHRyaWJ1dGUoJ2lkJywgYHRpbGUtaW5kZXgtJHtpfWApO1xuXG4gICAgaWYgKGkgJSAyICE9PSAwKSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdicm93bic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICB9XG5cbiAgICB0cmFwcy5tYXAoZWxlbWVudCA9PiB7XG4gICAgICBpZiAoZWxlbWVudC50b2tlbiA9PT0gaSkge1xuICAgICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnO1xuICAgICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJ2h0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2Rua2ZnbXp5MS9pbWFnZS91cGxvYWQvdjE1NzU2NTU3MzQvZ2FtZS90cmFwJHtlbGVtZW50LmFjdGlvbn0uc3ZnJylgO1xuICAgICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRTaXplID0gJzRyZW0nO1xuICAgICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSAnbm8tcmVwZWF0JztcbiAgICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSAnY2VudGVyIGNlbnRlcic7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGlsZSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVBsYXllcjFCdXR0b24oaXNQbGF5ZXIxVHVybjogYm9vbGVhbik6IHZvaWQge1xuICBpZiAoaXNQbGF5ZXIxVHVybikge1xuICAgIHBsYXllcjFCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBwbGF5ZXIyQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBwbGF5ZXIxQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBwbGF5ZXIyQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dEaWNlUmVzdWx0KGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHBvaW50OiBudW1iZXIpIHtcbiAgY29udGFpbmVyLmlubmVySFRNTCA9IGRpY2VBcnJheVtwb2ludCAtIDFdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm9sbERpY2UoKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVBsYXllcihwbGF5ZXI6IG51bWJlcik6IHZvaWQge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZmlndXJlLSR7cGxheWVyfWApLnJlbW92ZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVBsYXllcnMoY29udGFpbmVyOiBIVE1MRWxlbWVudCwgcGxheWVySW5kZXg6IG51bWJlcikge1xuICBjb25zdCBwbGF5ZXI6IEhUTUxJbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICBwbGF5ZXIuc3JjID0gYCR7Y3JlYXRlSW1hZ2UocGxheWVySW5kZXgpfWA7XG5cbiAgcGxheWVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYm9hcmRfX2ZpZ3VyZScpO1xuXG4gIHBsYXllci5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGBHYW1lIGZpZ3VyZSBuby4ke3BsYXllckluZGV4fWApO1xuXG4gIHBsYXllci5zZXRBdHRyaWJ1dGUoJ2lkJywgYGZpZ3VyZS0ke3BsYXllckluZGV4fWApO1xuXG4gIGlmIChjb250YWluZXIgIT0gbnVsbCkge1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1dpbm5lcihwbGF5ZXJTdGF0dXM6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gcGxheWVyU3RhdHVzID49IDMwID8gdHJ1ZSA6IGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2FtZUVuZCh3aW5uZXI6IG51bWJlcikge1xuICBwbGF5ZXIxQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgcGxheWVyMkJ0bi5kaXNhYmxlZCA9IHRydWU7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaGFzU2VsZWN0ZWQoY29udGFpbmVyOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gY29udGFpbmVyLmhhc0NoaWxkTm9kZXMoKTtcbn1cbiIsImNsYXNzIFN0b3JhZ2Uge1xuICBwcml2YXRlIHN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICB9XG5cbiAgZ2V0KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgfVxuXG4gIGRlbGV0ZShrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gIH1cblxuICBzZXRTZXJpYWxpemUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNldChrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gIH1cblxuICBnZXRVbnNlcmlhbGl6ZTxUPihrZXk6IHN0cmluZyk6IFQge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmdldChrZXkpO1xuXG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKSBhcyBUO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0b3JhZ2U7XG4iXX0=
