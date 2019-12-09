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
        function showMessage(content) {
          containers_1.message.innerText = content;
          containers_1.overlay.style.visibility = 'visible';
        }
        function deleteMessage() {
          setTimeout(function() {
            containers_1.overlay.style.visibility = 'hidden';
          }, 2000);
        }
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
              var updatePosition = document.getElementById('tile-index-' + player1Status);
              gameHelpers_1.removePlayer(player1);
              gameHelpers_1.displayPlayers(updatePosition, player1);
              gameHelpers_1.traps.forEach(function(element) {
                if (element.token == player1Status) {
                  var action = element.action,
                    message_1 = element.message;
                  player1Status -= action;
                  var newPosition_1 = document.getElementById('tile-index-' + player1Status);
                  showMessage('' + message_1);
                  deleteMessage();
                  setTimeout(function() {
                    gameHelpers_1.removePlayer(player1);
                    gameHelpers_1.displayPlayers(newPosition_1, player1);
                  }, 2000);
                }
              });
              gameHelpers_1.updatePlayer1Button(false);
              if (currentDicePoint === 6) {
                showMessage('Since you rolled 6, you got a Bonus movement. Roll the dice again');
                deleteMessage();
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
              var updatePosition = document.getElementById('tile-index-' + player2Status);
              gameHelpers_1.removePlayer(player2);
              gameHelpers_1.displayPlayers(updatePosition, player2);
              gameHelpers_1.traps.forEach(function(element) {
                if (element.token == player2Status) {
                  var action = element.action,
                    message_2 = element.message;
                  player2Status -= action;
                  var newPosition_2 = document.getElementById('tile-index-' + player2Status);
                  console.log(newPosition_2);
                  showMessage('' + message_2);
                  deleteMessage();
                  setTimeout(function() {
                    gameHelpers_1.removePlayer(player2);
                    gameHelpers_1.displayPlayers(newPosition_2, player2);
                  }, 2000);
                }
              });
              gameHelpers_1.updatePlayer1Button(true);
              if (currentDicePoint === 6) {
                showMessage('Since you rolled 6, you got a Bonus movement. Roll the dice again');
                deleteMessage();
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
            winnerImage.className = 'item item--winner-image item--shake';
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
        var varys = 2069;
        var beric = 190;
        var joyeuse = 600;
        var malwyn = 700;
        var merrell = 750;
        var aemon = 50;
        var characterIndex = [
          samwell,
          jon,
          cersei,
          tyrion,
          daenerys,
          sansa,
          varys,
          beric,
          joyeuse,
          malwyn,
          merrell,
          aemon,
        ];
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
        exports.overlay = document.getElementById('overlay');
        exports.message = document.getElementById('message');
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
            tile.innerHTML = "<span class='tile__number'>" + i + '</span>';
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
            if (i == 30) {
              tile.style.backgroundImage =
                "url('https://res.cloudinary.com/dnkfgmzy1/image/upload/v1575655553/game/throne.svg')";
              tile.style.backgroundSize = '4rem';
              tile.style.backgroundRepeat = 'no-repeat';
              tile.style.backgroundPosition = 'center center';
            }
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
            container.append(player);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXgudHMiLCJzcmMvc2NyaXB0cy9oYW5kbGVEcmFnLnRzIiwic3JjL3NjcmlwdHMvaGFuZGxlU2VsZWN0aW9uLnRzIiwic3JjL3NjcmlwdHMvcGxheUdhbWUudHMiLCJzcmMvc2NyaXB0cy9zaG93Q2hhcmFjdGVyLnRzIiwic3JjL3NjcmlwdHMvc2hvd1dpbm5lci50cyIsInNyYy9zY3JpcHRzL3V0aWwvY2hhcmFjdGVySW5kZXgudHMiLCJzcmMvc2NyaXB0cy91dGlsL2NvbnRhaW5lcnMudHMiLCJzcmMvc2NyaXB0cy91dGlsL2NyZWF0ZUltYWdlLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9kaWNlLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9nYW1lSGVscGVycy50cyIsInNyYy9zY3JpcHRzL3V0aWwvaGFzU2VsZWN0ZWQudHMiLCJzcmMvc2NyaXB0cy91dGlsL3N0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLG1EQUE4QztBQUM5Qyw2REFBNEQ7QUFDNUQsK0NBQTBDO0FBQzFDLHlEQUF3RDtBQUN4RCxtREFBd0U7QUFDeEUsZ0VBQTJEO0FBQzNELHdEQU9tQztBQUNuQywwREFBbUY7QUFDbkYsa0RBQTZDO0FBRWhDLFFBQUEsV0FBVyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO0FBRXpDLElBQUksMEJBQWEsSUFBSSxJQUFJLEVBQUU7SUFDekIsdUJBQWlCLENBQUMsd0JBQWMsQ0FBQyxDQUFDO0lBQ2xDLG9CQUFVLEVBQUUsQ0FBQztJQUNiLElBQUksaUNBQW9CLElBQUksSUFBSTtRQUM5QixpQ0FBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsaUNBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUMxRTtBQUVELElBQUksa0JBQUssSUFBSSxJQUFJLElBQUksMEJBQWEsSUFBSSxJQUFJLEVBQUU7SUFDMUMsSUFBTSxPQUFPLEdB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QnhDLENBQUM7SUF6QkMscUJBQUcsR0FBSCxVQUFJLEdBQVcsRUFBRSxLQUFhO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQscUJBQUcsR0FBSCxVQUFJLEdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCx3QkFBTSxHQUFOLFVBQU8sR0FBVztRQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsOEJBQVksR0FBWixVQUFhLEdBQVcsRUFBRSxLQUFVO1FBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsZ0NBQWMsR0FBZCxVQUFrQixHQUFXO1FBQzNCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFM0IsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFNLENBQUM7SUFDL0IsQ0FBQztJQUNILGNBQUM7QUFBRCxDQTVCQSxBQTRCQyxJQUFBO0FBRUQsa0JBQWUsT0FBTyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IGhhbmRsZURyYWcgZnJvbSAnLi9zY3JpcHRzL2hhbmRsZURyYWcnO1xuaW1wb3J0IHsgaGFuZGxlU2VsZWN0aW9uIH0gZnJvbSAnLi9zY3JpcHRzL2hhbmRsZVNlbGVjdGlvbic7XG5pbXBvcnQgcGxheUdhbWUgZnJvbSAnLi9zY3JpcHRzL3BsYXlHYW1lJztcbmltcG9ydCBnZXRDaGFyYWN0ZXJDYXJkcyBmcm9tICcuL3NjcmlwdHMvc2hvd0NoYXJhY3Rlcic7XG5pbXBvcnQgc2hvd1dpbm5lciwgeyBXaW5uZXIgYXMgV2lubmVyVHlwZSB9IGZyb20gJy4vc2NyaXB0cy9zaG93V2lubmVyJztcbmltcG9ydCBjaGFyYWN0ZXJJbmRleCBmcm9tICcuL3NjcmlwdHMvdXRpbC9jaGFyYWN0ZXJJbmRleCc7XG5pbXBvcnQge1xuICBib2FyZCxcbiAgY2hhcmFjdGVyTGlzdCxcbiAgZGljZUNvbnRhaW5lcixcbiAgcmVzZXRCdG4sXG4gIHZhbGlkYXRlU2VsZWN0aW9uQnRuLFxuICB3aW5uZXJDb250YWluZXIsXG59IGZyb20gJy4vc2NyaXB0cy91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IHsgY3JlYXRlQm9hcmQsIHJvbGxEaWNlLCBzaG93RGljZVJlc3VsdCB9IGZyb20gJy4vc2NyaXB0cy91dGlsL2dhbWVIZWxwZXJzJztcbmltcG9ydCBTdG9yYWdlIGZyb20gJy4vc2NyaXB0cy91dGlsL3N0b3JhZ2UnO1xuXG5leHBvcnQgY29uc3QgZ2FtZVN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpO1xuXG5pZiAoY2hhcmFjdGVyTGlzdCAhPSBudWxsKSB7XG4gIGdldENoYXJhY3RlckNhcmRzKGNoYXJhY3RlckluZGV4KTtcbiAgaGFuZGxlRHJhZygpO1xuICBpZiAodmFsaWRhdGVTZWxlY3Rpb25CdG4gIT0gbnVsbClcbiAgICB2YWxpZGF0ZVNlbGVjdGlvbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVNlbGVjdGlvbiwgZmFsc2UpO1xufVxuXG5pZiAoYm9hcmQgIT0gbnVsbCAmJiBkaWNlQ29udGFpbmVyICE9IG51bGwpIHtcbiAgY29uc3QgcGxheWVyMTogbnVtYmVyID0gZ2FtZVN0b3JhZ2UuZ2V0VW5zZXJpYWxpemUoJ3BsYXllcjFJbmRleCcpO1xuICBjb25zdCBwbGF5ZXIyOiBudW1iZXIgPSBnYW1lU3RvcmFnZS5nZXRVbnNlcmlhbGl6ZSgncGxheWVyMkluZGV4Jyk7XG4gIGNyZWF0ZUJvYXJkKGJvYXJkKTtcbiAgc2hvd0RpY2VSZXN1bHQoZGljZUNvbnRhaW5lciwgcm9sbERpY2UoKSk7XG5cbiAgaWYgKHBsYXllcjEgJiYgcGxheWVyMikge1xuICAgIHBsYXlHYW1lKHBsYXllcjEsIHBsYXllcjIpO1xuICB9XG59XG5cbmlmICh3aW5uZXJDb250YWluZXIgIT0gbnVsbCkge1xuICBjb25zdCB3aW5uZXI6IFdpbm5lclR5cGUgPSBnYW1lU3RvcmFnZS5nZXRVbnNlcmlhbGl6ZSgnd2lubmVyJyk7XG4gIGNvbnNvbGUubG9nKHdpbm5lcik7XG4gIHNob3dXaW5uZXIod2lubmVyKTtcbn1cblxuaWYgKHJlc2V0QnRuICE9IG51bGwpIHtcbiAgcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAnY2xpY2snLFxuICAgIGZ1bmN0aW9uKCkge1xuICAgICAgZ2FtZVN0b3JhZ2UuZGVsZXRlKCdwbGF5ZXIxSW5kZXgnKTtcbiAgICAgIGdhbWVTdG9yYWdlLmRlbGV0ZSgncGxheWVyMkluZGV4Jyk7XG4gICAgICBnYW1lU3RvcmFnZS5kZWxldGUoJ3dpbm5lcicpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnc2VsZWN0Lmh0bWwnO1xuICAgIH0sXG4gICAgZmFsc2UsXG4gICk7XG59XG4iLCJpbXBvcnQgeyBnYW1lU3RvcmFnZSB9IGZyb20gJy4uL2luZGV4JztcbmxldCBkcmFnZ2VkOiBIVE1MRWxlbWVudDtcblxuZnVuY3Rpb24gaGFuZGxlRHJhZ1N0YXJ0KGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgZHJhZ2dlZCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUub3BhY2l0eSA9ICcwLjUnO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmFnRW5kKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUub3BhY2l0eSA9ICcnO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmFnT3ZlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWdFbnRlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ3N0YXJ0Wm9uZScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyM3NDU2MjUnO1xuICB9XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ2VuZFpvbmUxJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnIzc0NTYyNSc7XG4gIH1cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnZW5kWm9uZTInKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcjNzQ1NjI1JztcbiAgfVxufVxuZnVuY3Rpb24gaGFuZGxlRHJhZ0xlYXZlKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnc3RhcnRab25lJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgfVxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdlbmRab25lMScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gIH1cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnZW5kWm9uZTInKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyb3AoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAvLyBwcmV2ZW50IGRlZmF1bHQgYWN0aW9uIChvcGVuIGFzIGxpbmsgZm9yIHNvbWUgZWxlbWVudHMpXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgLy8gbW92ZSBkcmFnZ2VkIGVsZW0gdG8gdGhlIHNlbGVjdGVkIGRyb3AgdGFyZ2V0XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PSAnZW5kWm9uZTEnKSB7XG4gICAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgYWxlcnQoJ09ubHkgb25lIGNoYXJhY3RlciBpcyBhbGxvd2VkLicpO1xuICAgICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICBkcmFnZ2VkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZHJhZ2dlZCk7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgZ2FtZVN0b3JhZ2Uuc2V0KCdwbGF5ZXIxSW5kZXgnLCBgJHtkcmFnZ2VkLmdldEF0dHJpYnV0ZSgna2V5Jyl9YCk7XG4gIH1cblxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT0gJ2VuZFpvbmUyJykge1xuICAgIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIGFsZXJ0KCdPbmx5IG9uZSBjaGFyYWN0ZXIgaXMgYWxsb3dlZC4nKTtcbiAgICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgZHJhZ2dlZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRyYWdnZWQpO1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgIGdhbWVTdG9yYWdlLnNldCgncGxheWVyMkluZGV4JywgYCR7ZHJhZ2dlZC5nZXRBdHRyaWJ1dGUoJ2tleScpfWApO1xuICB9XG5cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09ICdzdGFydFpvbmUnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGRyYWdnZWQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkcmFnZ2VkKTtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5hcHBlbmRDaGlsZChkcmFnZ2VkKTtcbiAgICBjb25zb2xlLmxvZyhkcmFnZ2VkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmFnKCkge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBoYW5kbGVEcmFnU3RhcnQpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgaGFuZGxlRHJhZ0VuZCk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgaGFuZGxlRHJhZ092ZXIpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBoYW5kbGVEcmFnRW50ZXIpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBoYW5kbGVEcmFnTGVhdmUpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgaGFuZGxlRHJvcCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZURyYWc7XG4iLCJpbXBvcnQgeyBwbGF5ZXIxU2VsZWN0aW9uLCBwbGF5ZXIyU2VsZWN0aW9uIH0gZnJvbSAnLi91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IHsgaGFzU2VsZWN0ZWQgfSBmcm9tICcuL3V0aWwvaGFzU2VsZWN0ZWQnO1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVNlbGVjdGlvbigpOiB2b2lkIHtcbiAgY29uc3QgaGFzUGxheWVyMVNlbGVjdGVkID0gaGFzU2VsZWN0ZWQocGxheWVyMVNlbGVjdGlvbik7XG4gIGNvbnN0IGhhc1BsYXllcjJTZWxlY3RlZCA9IGhhc1NlbGVjdGVkKHBsYXllcjJTZWxlY3Rpb24pO1xuICBpZiAoaGFzUGxheWVyMVNlbGVjdGVkICYmIGhhc1BsYXllcjJTZWxlY3RlZCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2dhbWUuaHRtbCc7XG4gIH0gZWxzZSB7XG4gICAgYWxlcnQoJ1NlbGVjdCBjaGFyYWN0ZXIgZmlyc3QsIHRoZW4gc3RhcnQgdGhlIGdhbWUnKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2FtZVN0b3JhZ2UgfSBmcm9tICcuLy4uL2luZGV4JztcbmltcG9ydCB7XG4gIHNob3dEaWNlUmVzdWx0LFxuICB1cGRhdGVQbGF5ZXIxQnV0dG9uLFxuICByb2xsRGljZSxcbiAgZGlzcGxheVBsYXllcnMsXG4gIHJlbW92ZVBsYXllcixcbiAgY2hlY2tXaW5uZXIsXG4gIGdhbWVFbmQsXG4gIHRyYXBzLFxufSBmcm9tICcuL3V0aWwvZ2FtZUhlbHBlcnMnO1xuaW1wb3J0IHsgZGljZUNvbnRhaW5lciwgcGxheWVyMUJ0biwgcGxheWVyMkJ0biwgb3ZlcmxheSwgbWVzc2FnZSB9IGZyb20gJy4vdXRpbC9jb250YWluZXJzJztcbmltcG9ydCB7IFdpbm5lciBhcyBXaW5uZXJUeXBlcyB9IGZyb20gJy4uL3NjcmlwdHMvc2hvd1dpbm5lcic7XG5cbmZ1bmN0aW9uIHNob3dNZXNzYWdlKGNvbnRlbnQ6IHN0cmluZykge1xuICBtZXNzYWdlLmlubmVyVGV4dCA9IGNvbnRlbnQ7XG4gIG92ZXJsYXkuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbn1cblxuZnVuY3Rpb24gZGVsZXRlTWVzc2FnZSgpIHtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBvdmVybGF5LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgfSwgMjAwMCk7XG59XG5cbmZ1bmN0aW9uIHBsYXlHYW1lKHBsYXllcjE6IG51bWJlciwgcGxheWVyMjogbnVtYmVyKTogdm9pZCB7XG4gIGNvbnN0IHN0YXJ0UG9zaXRpb246IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbGUtaW5kZXgtMScpO1xuICBjb25zdCBmaW5hbFBvc2l0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbGUtaW5kZXgtMzAnKTtcblxuICBsZXQgcGxheWVyMVN0YXR1czogbnVtYmVyID0gMTtcbiAgbGV0IHBsYXllcjJTdGF0dXM6IG51bWJlciA9IDE7XG5cbiAgZGlzcGxheVBsYXllcnMoc3RhcnRQb3NpdGlvbiwgcGxheWVyMSk7XG4gIGRpc3BsYXlQbGF5ZXJzKHN0YXJ0UG9zaXRpb24sIHBsYXllcjIpO1xuICB1cGRhdGVQbGF5ZXIxQnV0dG9uKHRydWUpO1xuICBwbGF5ZXIxQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuUGxheWVyMVR1cm4sIGZhbHNlKTtcbiAgcGxheWVyMkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1blBsYXllcjJUdXJuLCBmYWxzZSk7XG5cbiAgZnVuY3Rpb24gcnVuUGxheWVyMVR1cm4oKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudERpY2VQb2ludCA9IHJvbGxEaWNlKCk7XG4gICAgc2hvd0RpY2VSZXN1bHQoZGljZUNvbnRhaW5lciwgY3VycmVudERpY2VQb2ludCk7XG4gICAgcGxheWVyMVN0YXR1cyArPSBjdXJyZW50RGljZVBvaW50O1xuXG4gICAgaWYgKGNoZWNrV2lubmVyKHBsYXllcjFTdGF0dXMpKSB7XG4gICAgICBjb25zdCB3aW5uZXI6IFdpbm5lclR5cGVzID0ge1xuICAgICAgICBpbmRleDogcGxheWVyMSxcbiAgICAgICAgbmFtZTogJ1BsYXllciAxJyxcbiAgICAgIH07XG4gICAgICBnYW1lU3RvcmFnZS5zZXRTZXJpYWxpemUoJ3dpbm5lcicsIHdpbm5lcik7XG4gICAgICByZW1vdmVQbGF5ZXIocGxheWVyMSk7XG4gICAgICBkaXNwbGF5UGxheWVycyhmaW5hbFBvc2l0aW9uLCBwbGF5ZXIxKTtcbiAgICAgIGdhbWVFbmQocGxheWVyMSk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICd3aW5uZXIuaHRtbCc7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdXBkYXRlUG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGlsZS1pbmRleC0ke3BsYXllcjFTdGF0dXN9YCk7XG4gICAgICByZW1vdmVQbGF5ZXIocGxheWVyMSk7XG4gICAgICBkaXNwbGF5UGxheWVycyh1cGRhdGVQb3NpdGlvbiwgcGxheWVyMSk7XG5cbiAgICAgIHRyYXBzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGlmIChlbGVtZW50LnRva2VuID09IHBsYXllcjFTdGF0dXMpIHtcbiAgICAgICAgICBjb25zdCB7IGFjdGlvbiwgbWVzc2FnZSB9ID0gZWxlbWVudDtcbiAgICAgICAgICBwbGF5ZXIxU3RhdHVzIC09IGFjdGlvbjtcbiAgICAgICAgICBjb25zdCBuZXdQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0aWxlLWluZGV4LSR7cGxheWVyMVN0YXR1c31gKTtcblxuICAgICAgICAgIHNob3dNZXNzYWdlKGAke21lc3NhZ2V9YCk7XG4gICAgICAgICAgZGVsZXRlTWVzc2FnZSgpO1xuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlbW92ZVBsYXllcihwbGF5ZXIxKTtcbiAgICAgICAgICAgIGRpc3BsYXlQbGF5ZXJzKG5ld1Bvc2l0aW9uLCBwbGF5ZXIxKTtcbiAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHVwZGF0ZVBsYXllcjFCdXR0b24oZmFsc2UpO1xuXG4gICAgICBpZiAoY3VycmVudERpY2VQb2ludCA9PT0gNikge1xuICAgICAgICBzaG93TWVzc2FnZSgnU2luY2UgeW91IHJvbGxlZCA2LCB5b3UgZ290IGEgQm9udXMgbW92ZW1lbnQuIFJvbGwgdGhlIGRpY2UgYWdhaW4nKTtcbiAgICAgICAgZGVsZXRlTWVzc2FnZSgpO1xuICAgICAgICB1cGRhdGVQbGF5ZXIxQnV0dG9uKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1blBsYXllcjJUdXJuKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnREaWNlUG9pbnQgPSByb2xsRGljZSgpO1xuICAgIHNob3dEaWNlUmVzdWx0KGRpY2VDb250YWluZXIsIGN1cnJlbnREaWNlUG9pbnQpO1xuICAgIHBsYXllcjJTdGF0dXMgKz0gY3VycmVudERpY2VQb2ludDtcblxuICAgIGlmIChjaGVja1dpbm5lcihwbGF5ZXIyU3RhdHVzKSkge1xuICAgICAgY29uc3Qgd2lubmVyOiBXaW5uZXJUeXBlcyA9IHtcbiAgICAgICAgaW5kZXg6IHBsYXllcjIsXG4gICAgICAgIG5hbWU6ICdQbGF5ZXIgMicsXG4gICAgICB9O1xuICAgICAgZ2FtZVN0b3JhZ2Uuc2V0U2VyaWFsaXplKCd3aW5uZXInLCB3aW5uZXIpO1xuICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjIpO1xuICAgICAgZGlzcGxheVBsYXllcnMoZmluYWxQb3NpdGlvbiwgcGxheWVyMik7XG4gICAgICBnYW1lRW5kKHBsYXllcjIpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnd2lubmVyLmh0bWwnO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHVwZGF0ZVBvc2l0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRpbGUtaW5kZXgtJHtwbGF5ZXIyU3RhdHVzfWApO1xuICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjIpO1xuICAgICAgZGlzcGxheVBsYXllcnModXBkYXRlUG9zaXRpb24sIHBsYXllcjIpO1xuXG4gICAgICB0cmFwcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudC50b2tlbiA9PSBwbGF5ZXIyU3RhdHVzKSB7XG4gICAgICAgICAgY29uc3QgeyBhY3Rpb24sIG1lc3NhZ2UgfSA9IGVsZW1lbnQ7XG4gICAgICAgICAgcGxheWVyMlN0YXR1cyAtPSBhY3Rpb247XG4gICAgICAgICAgY29uc3QgbmV3UG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGlsZS1pbmRleC0ke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICAgICAgY29uc29sZS5sb2cobmV3UG9zaXRpb24pO1xuXG4gICAgICAgICAgc2hvd01lc3NhZ2UoYCR7bWVzc2FnZX1gKTtcbiAgICAgICAgICBkZWxldGVNZXNzYWdlKCk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjIpO1xuICAgICAgICAgICAgZGlzcGxheVBsYXllcnMobmV3UG9zaXRpb24sIHBsYXllcjIpO1xuICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdXBkYXRlUGxheWVyMUJ1dHRvbih0cnVlKTtcblxuICAgICAgaWYgKGN1cnJlbnREaWNlUG9pbnQgPT09IDYpIHtcbiAgICAgICAgc2hvd01lc3NhZ2UoJ1NpbmNlIHlvdSByb2xsZWQgNiwgeW91IGdvdCBhIEJvbnVzIG1vdmVtZW50LiBSb2xsIHRoZSBkaWNlIGFnYWluJyk7XG4gICAgICAgIGRlbGV0ZU1lc3NhZ2UoKTtcbiAgICAgICAgdXBkYXRlUGxheWVyMUJ1dHRvbihmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXlHYW1lO1xuIiwiaW1wb3J0IHsgY2hhcmFjdGVyTGlzdCB9IGZyb20gJy4vdXRpbC9jb250YWluZXJzJztcbmltcG9ydCB7IFJlc3BvbnNlT2JqVHlwZXMgfSBmcm9tICcuL3V0aWwvdHlwZXMnO1xuaW1wb3J0IGNyZWF0ZUltYWdlIGZyb20gJy4vdXRpbC9jcmVhdGVJbWFnZSc7XG5cbmNvbnN0IEJBU0VfVVJMOiBzdHJpbmcgPSAnaHR0cHM6Ly93d3cuYW5hcGlvZmljZWFuZGZpcmUuY29tL2FwaS9jaGFyYWN0ZXJzLyc7XG5cbmZ1bmN0aW9uIGdldENoYXJhY3RlckNhcmRzKGNoYXJhY3RlckluZGV4OiBudW1iZXJbXSkge1xuICBjaGFyYWN0ZXJJbmRleC5tYXAoZWxlbWVudCA9PiB7XG4gICAgc2hvd0NoYXJhY3RlcihlbGVtZW50KTtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNob3dDaGFyYWN0ZXIoY2hhcmFjdGVyTmFtZUluZGV4OiBudW1iZXIpIHtcbiAgY29uc3QgdXJsID0gYCR7QkFTRV9VUkx9JHtjaGFyYWN0ZXJOYW1lSW5kZXh9YDtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICBjb25zdCBkYXRhOiBSZXNwb25zZU9ialR5cGVzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnN0IHsgbmFtZSwgdGl0bGVzLCBhbGlhc2VzIH0gPSBkYXRhO1xuXG4gICAgY29uc3QgY29tcG9uZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29tcG9uZW50LmNsYXNzTmFtZSA9ICdyb3dfX2l0ZW0tLWNhcmQnO1xuICAgIGNvbXBvbmVudC5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsICd0cnVlJyk7XG4gICAgY29tcG9uZW50LnNldEF0dHJpYnV0ZSgna2V5JywgYCR7Y2hhcmFjdGVyTmFtZUluZGV4fWApO1xuICAgIGNvbnN0IGNhcmRJbWFnZSA9IGA8aW1nIGRyYWdnYWJsZT1cImZhbHNlXCIgc3JjPSR7Y3JlYXRlSW1hZ2UoXG4gICAgICBjaGFyYWN0ZXJOYW1lSW5kZXgsXG4gICAgKX0gY2xhc3M9XCJpdGVtLS1jYXJkLWltYWdlXCIgYWx0PVwiR2FtZSBmaWd1cmUgbm8uJHtjaGFyYWN0ZXJOYW1lSW5kZXh9XCI+YDtcbiAgICBjb25zdCBjYXJkVGl0bGUgPSBgIDxoMz4ke25hbWV9PC9oMz5gO1xuICAgIGNvbnN0IGNhcmRTdWJUaXRsZSA9IGA8c3Bhbj4ke3RpdGxlc1swXSA/IHRpdGxlc1swXSA6IGFsaWFzZXNbMF19PC9zcGFuPmA7XG4gICAgY29tcG9uZW50LmlubmVySFRNTCA9IGNhcmRJbWFnZSArIGNhcmRUaXRsZSArIGNhcmRTdWJUaXRsZTtcblxuICAgIGNoYXJhY3Rlckxpc3QuYXBwZW5kKGNvbXBvbmVudCk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhyb3cgZXJyO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldENoYXJhY3RlckNhcmRzO1xuIiwiaW1wb3J0IHsgY29uZ3JhdHVsYXRpb25NZXNzYWdlLCB3aW5uZXJDb250YWluZXIgfSBmcm9tICcuL3V0aWwvY29udGFpbmVycyc7XG5pbXBvcnQgY3JlYXRlSW1hZ2UgZnJvbSAnLi91dGlsL2NyZWF0ZUltYWdlJztcblxuZXhwb3J0IGludGVyZmFjZSBXaW5uZXIge1xuICBpbmRleDogbnVtYmVyO1xuICBuYW1lOiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHNob3dXaW5uZXIoeyBpbmRleCwgbmFtZSB9OiBXaW5uZXIpOiB2b2lkIHtcbiAgaWYgKHdpbm5lckNvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgY29uc3Qgd2lubmVySW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICB3aW5uZXJJbWFnZS5jbGFzc05hbWUgPSAnaXRlbSBpdGVtLS13aW5uZXItaW1hZ2UgaXRlbS0tc2hha2UnO1xuICAgIHdpbm5lckltYWdlLnNyYyA9IGAke2NyZWF0ZUltYWdlKGluZGV4KX1gO1xuICAgIHdpbm5lckltYWdlLmFsdCA9ICdGZWF0dXJlZCBpbWFnZSBmb3IgdGhlIHdpbm5lcic7XG4gICAgd2lubmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHdpbm5lckltYWdlKTtcbiAgfVxuXG4gIGlmIChjb25ncmF0dWxhdGlvbk1lc3NhZ2UgIT0gbnVsbCkge1xuICAgIGNvbmdyYXR1bGF0aW9uTWVzc2FnZS5pbm5lclRleHQgPSBgJHtuYW1lfSBjbGFpbWVkIHRoZSBjcm93biFgO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNob3dXaW5uZXI7XG4iLCJjb25zdCBzYW13ZWxsOiBudW1iZXIgPSA5NTQ7XG5jb25zdCBqb246IG51bWJlciA9IDU4MztcbmNvbnN0IGNlcnNlaTogbnVtYmVyID0gMjM4O1xuY29uc3QgdHlyaW9uOiBudW1iZXIgPSAxMDUyO1xuY29uc3QgZGFlbmVyeXM6IG51bWJlciA9IDI3MTtcbmNvbnN0IHNhbnNhOiBudW1iZXIgPSA5NTc7XG5jb25zdCB2YXJ5czogbnVtYmVyID0gMjA2OTtcbmNvbnN0IGJlcmljOiBudW1iZXIgPSAxOTA7XG5jb25zdCBqb3lldXNlOiBudW1iZXIgPSA2MDA7XG5jb25zdCBtYWx3eW46IG51bWJlciA9IDcwMDtcbmNvbnN0IG1lcnJlbGw6IG51bWJlciA9IDc1MDtcbmNvbnN0IGFlbW9uOiBudW1iZXIgPSA1MDtcblxuY29uc3QgY2hhcmFjdGVySW5kZXg6IG51bWJlcltdID0gW1xuICBzYW13ZWxsLFxuICBqb24sXG4gIGNlcnNlaSxcbiAgdHlyaW9uLFxuICBkYWVuZXJ5cyxcbiAgc2Fuc2EsXG4gIHZhcnlzLFxuICBiZXJpYyxcbiAgam95ZXVzZSxcbiAgbWFsd3luLFxuICBtZXJyZWxsLFxuICBhZW1vbixcbl07XG5leHBvcnQgZGVmYXVsdCBjaGFyYWN0ZXJJbmRleDtcbiIsIi8vcGFnZTpzZWxlY3QtcGxheWVyXG5leHBvcnQgY29uc3QgY2hhcmFjdGVyTGlzdDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnRab25lJyk7XG5leHBvcnQgY29uc3QgcGxheWVyMVNlbGVjdGlvbjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kWm9uZTEnKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXIyU2VsZWN0aW9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmRab25lMicpO1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlU2VsZWN0aW9uQnRuOiBIVE1MQW5jaG9yRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdGEtLXZhbGlkYXRpb24nKTtcblxuLy9wYWdlOmdhbWVcbmV4cG9ydCBjb25zdCBib2FyZDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZUJvYXJkJyk7XG5leHBvcnQgY29uc3QgZGljZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGljZUltYWdlJyk7XG5leHBvcnQgY29uc3QgcGxheWVyMUJ0bjogSFRNTEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLS1QbGF5ZXIxJyk7XG5leHBvcnQgY29uc3QgcGxheWVyMkJ0bjogSFRNTEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLS1QbGF5ZXIyJyk7XG5leHBvcnQgY29uc3Qgb3ZlcmxheTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheScpO1xuZXhwb3J0IGNvbnN0IG1lc3NhZ2U6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2UnKTtcblxuLy9wYWdlOndpbm5lclxuZXhwb3J0IGNvbnN0IHdpbm5lckNvbnRhaW5lcjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lubmVyJyk7XG5leHBvcnQgY29uc3QgY29uZ3JhdHVsYXRpb25NZXNzYWdlOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25ncmF0dWxhdGlvbicpO1xuZXhwb3J0IGNvbnN0IHJlc2V0QnRuOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldCcpO1xuIiwiZnVuY3Rpb24gY3JlYXRlSW1hZ2UoaW5kZXg6IG51bWJlcikge1xuICByZXR1cm4gYGh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2Rua2ZnbXp5MS9pbWFnZS91cGxvYWQvdjE1NzU1NDk2NzQvZ2FtZS8ke2luZGV4fS5wbmdgO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVJbWFnZTtcbiIsImV4cG9ydCBjb25zdCBkaWNlSWNvbnMgPSB7XG4gIHBvaW50MTpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3pNMjU2IDIwNmE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHpcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50MjpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTMxNi45NyAzNi4wM0E1MCA1MCAwIDAgMSA0NDAgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0tMjY4IDI2OEE1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQzOlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptMzE2Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6TTI1NiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6TTEyMy40NyAzNDAuMDNBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50NDpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTQ4Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDE3MiAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bS0yNjggMjY4QTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDU6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem00OC45NyAzNi4wM0E1MCA1MCAwIDAgMSAxNzIgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3ek0yNTYgMjA2YTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwek0xMjMuNDcgMzQwLjAzQTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDY6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem00OC45NyAzNi4wM0E1MCA1MCAwIDAgMSAxNzIgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3ek0xMjIgMjA2YTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwem0yNjggMGE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHpNMTIzLjQ3IDM0MC4wM0E1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBkaWNlQXJyYXk6IHN0cmluZ1tdID0gW1xuICBkaWNlSWNvbnMucG9pbnQxLFxuICBkaWNlSWNvbnMucG9pbnQyLFxuICBkaWNlSWNvbnMucG9pbnQzLFxuICBkaWNlSWNvbnMucG9pbnQ0LFxuICBkaWNlSWNvbnMucG9pbnQ1LFxuICBkaWNlSWNvbnMucG9pbnQ2LFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpY2VJY29uKGRpY2VQb2ludDogbnVtYmVyKSB7XG4gIHJldHVybiBkaWNlQXJyYXlbZGljZVBvaW50IC0gMV07XG59XG4iLCJpbXBvcnQgeyBwbGF5ZXIxQnRuLCBwbGF5ZXIyQnRuIH0gZnJvbSAnLi9jb250YWluZXJzJztcbmltcG9ydCB7IGRpY2VBcnJheSB9IGZyb20gJy4vZGljZSc7XG5pbXBvcnQgY3JlYXRlSW1hZ2UgZnJvbSAnLi9jcmVhdGVJbWFnZSc7XG5cbmludGVyZmFjZSB0cmFwIHtcbiAgdG9rZW46IG51bWJlcjtcbiAgYWN0aW9uOiBudW1iZXI7XG4gIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuY29uc3QgdHJhcDE6IHRyYXAgPSB7XG4gIHRva2VuOiA4LFxuICBhY3Rpb246IDEsXG4gIG1lc3NhZ2U6ICdQaXJhdGVzIGFoZWFkISBSZXRyZWF0IG9uZSBmaWVsZCB0byBhdm9pZCBiZWluZyBub3RpY2VkLicsXG59O1xuXG5jb25zdCB0cmFwMjogdHJhcCA9IHtcbiAgdG9rZW46IDE0LFxuICBhY3Rpb246IDIsXG4gIG1lc3NhZ2U6ICdBIHdvbGYgZW1lcmdlcyBmcm9tIHRoZSBuaWdodCB3b29kcy4gUmV0cmVhdCB0d28gZmllbGRzIHRvIGVzY2FwZSBpdHMgY2hhc2UuJyxcbn07XG5cbmNvbnN0IHRyYXAzOiB0cmFwID0ge1xuICB0b2tlbjogMTgsXG4gIGFjdGlvbjogMyxcbiAgbWVzc2FnZTpcbiAgICAnQSB3aGl0ZSB3YWxrZXIgaGFzIGJlZW4gc3BvdHRlZCEgSW1tZWRpYXRlbHkgcmV0cmVhdCB0aHJlZSBmaWVsZHMgdG8gbmFycm93bHkgZXNjYXBlIGRlYXRoLicsXG59O1xuXG5jb25zdCB0cmFwNDogdHJhcCA9IHtcbiAgdG9rZW46IDI0LFxuICBhY3Rpb246IDQsXG4gIG1lc3NhZ2U6ICdFbmVteSBob3JzZW1lbiBvbiB0aGUgaG9yaXpvbiEgT3V0bnVtYmVyZWQsIHlvdSBtdXN0IHJldHJlYXQgZm91ciBmaWVsZHMnLFxufTtcblxuY29uc3QgdHJhcDU6IHRyYXAgPSB7XG4gIHRva2VuOiAyOCxcbiAgYWN0aW9uOiA1LFxuICBtZXNzYWdlOiAnRmlyZS1icmVhdGhpbmcgZHJhZ29ucyBhcHBlYXIhIFJldHJlYXQgZml2ZSBmaWVsZHMgdG8gZXNjYXBlIHRoZWlyIGxvbmcgZ2F6ZS4nLFxufTtcblxuZXhwb3J0IGNvbnN0IHRyYXBzOiB0cmFwW10gPSBbdHJhcDEsIHRyYXAyLCB0cmFwMywgdHJhcDQsIHRyYXA1XTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJvYXJkKGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgZm9yIChsZXQgaTogbnVtYmVyID0gMTsgaSA8PSAzMDsgaSsrKSB7XG4gICAgY29uc3QgdGlsZTogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aWxlLmNsYXNzTmFtZSA9IGBib2FyZF9fdGlsZWA7XG4gICAgdGlsZS5zZXRBdHRyaWJ1dGUoJ2lkJywgYHRpbGUtaW5kZXgtJHtpfWApO1xuICAgIHRpbGUuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPSd0aWxlX19udW1iZXInPiR7aX08L3NwYW4+YDtcblxuICAgIGlmIChpICUgMiAhPT0gMCkge1xuICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnYnJvd24nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd3aGl0ZSc7XG4gICAgfVxuXG4gICAgdHJhcHMubWFwKGVsZW1lbnQgPT4ge1xuICAgICAgaWYgKGVsZW1lbnQudG9rZW4gPT09IGkpIHtcbiAgICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAneWVsbG93JztcbiAgICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCdodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kbmtmZ216eTEvaW1hZ2UvdXBsb2FkL3YxNTc1NjU1NzM0L2dhbWUvdHJhcCR7ZWxlbWVudC5hY3Rpb259LnN2ZycpYDtcbiAgICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICc0cmVtJztcbiAgICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gJ25vLXJlcGVhdCc7XG4gICAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlciBjZW50ZXInO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGkgPT0gMzApIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZG5rZmdtenkxL2ltYWdlL3VwbG9hZC92MTU3NTY1NTU1My9nYW1lL3Rocm9uZS5zdmcnKWA7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRTaXplID0gJzRyZW0nO1xuICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kUmVwZWF0ID0gJ25vLXJlcGVhdCc7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICdjZW50ZXIgY2VudGVyJztcbiAgICB9XG5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGlsZSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVBsYXllcjFCdXR0b24oaXNQbGF5ZXIxVHVybjogYm9vbGVhbik6IHZvaWQge1xuICBpZiAoaXNQbGF5ZXIxVHVybikge1xuICAgIHBsYXllcjFCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICBwbGF5ZXIyQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBwbGF5ZXIxQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBwbGF5ZXIyQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dEaWNlUmVzdWx0KGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHBvaW50OiBudW1iZXIpIHtcbiAgY29udGFpbmVyLmlubmVySFRNTCA9IGRpY2VBcnJheVtwb2ludCAtIDFdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm9sbERpY2UoKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVBsYXllcihwbGF5ZXI6IG51bWJlcik6IHZvaWQge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZmlndXJlLSR7cGxheWVyfWApLnJlbW92ZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVBsYXllcnMoY29udGFpbmVyOiBIVE1MRWxlbWVudCwgcGxheWVySW5kZXg6IG51bWJlcikge1xuICBjb25zdCBwbGF5ZXI6IEhUTUxJbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICBwbGF5ZXIuc3JjID0gYCR7Y3JlYXRlSW1hZ2UocGxheWVySW5kZXgpfWA7XG5cbiAgcGxheWVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYm9hcmRfX2ZpZ3VyZScpO1xuXG4gIHBsYXllci5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGBHYW1lIGZpZ3VyZSBuby4ke3BsYXllckluZGV4fWApO1xuXG4gIHBsYXllci5zZXRBdHRyaWJ1dGUoJ2lkJywgYGZpZ3VyZS0ke3BsYXllckluZGV4fWApO1xuXG4gIGlmIChjb250YWluZXIgIT0gbnVsbCkge1xuICAgIGNvbnRhaW5lci5hcHBlbmQocGxheWVyKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tXaW5uZXIocGxheWVyU3RhdHVzOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIHBsYXllclN0YXR1cyA+PSAzMCA/IHRydWUgOiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdhbWVFbmQod2lubmVyOiBudW1iZXIpIHtcbiAgcGxheWVyMUJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gIHBsYXllcjJCdG4uZGlzYWJsZWQgPSB0cnVlO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGhhc1NlbGVjdGVkKGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgcmV0dXJuIGNvbnRhaW5lci5oYXNDaGlsZE5vZGVzKCk7XG59XG4iLCJjbGFzcyBTdG9yYWdlIHtcbiAgcHJpdmF0ZSBzdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZTtcblxuICBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgfVxuXG4gIGdldChrZXk6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXRJdGVtKGtleSk7XG4gIH1cblxuICBkZWxldGUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICB9XG5cbiAgc2V0U2VyaWFsaXplKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5zZXQoa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICB9XG5cbiAgZ2V0VW5zZXJpYWxpemU8VD4oa2V5OiBzdHJpbmcpOiBUIHtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5nZXQoa2V5KTtcblxuICAgIGlmICghZGF0YSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSkgYXMgVDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdG9yYWdlO1xuIl19
