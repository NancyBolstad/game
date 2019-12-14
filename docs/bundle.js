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
        var drawConfetti_1 = require('./scripts/drawConfetti');
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
        if (containers_1.canvas != null) {
          var context = containers_1.canvas.getContext('2d');
          containers_1.canvas.width = window.innerWidth;
          containers_1.canvas.height = window.innerHeight;
          drawConfetti_1.default(context, containers_1.canvas);
        }
      },
      {
        './scripts/drawConfetti': 2,
        './scripts/handleDrag': 3,
        './scripts/handleSelection': 4,
        './scripts/playGame': 5,
        './scripts/showCharacter': 6,
        './scripts/showWinner': 7,
        './scripts/util/characterIndex': 8,
        './scripts/util/containers': 9,
        './scripts/util/gameHelpers': 12,
        './scripts/util/storage': 15,
      },
    ],
    2: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var getRandomNumber_1 = require('./util/getRandomNumber');
        var particle = function() {
          return {
            coordinateX: getRandomNumber_1.getRandomNumber(window.innerWidth),
            coordinateY: getRandomNumber_1.getRandomNumber(window.innerHeight),
            color: getRandomColor(),
          };
        };
        function drawElement(context, element) {
          var coordinateX = element.coordinateX,
            coordinateY = element.coordinateY,
            color = element.color;
          context.beginPath();
          context.moveTo(coordinateX, coordinateY);
          context.lineTo(coordinateX + 5, coordinateY + 10);
          context.lineWidth = 5;
          context.strokeStyle = color;
          context.stroke();
        }
        function getRandomColor() {
          var colors = ['#FF0000', '#FFFF00', '#00FF00', '#80FFFF', '#FF4000', '#FF00FF'];
          return colors[getRandomNumber_1.getRandomNumber(colors.length)];
        }
        function clearCanvas(context, canvas) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
        function drawConfetti(context, canvas) {
          clearCanvas(context, canvas);
          var elements = [];
          var amount = 10;
          for (var i = 0; i < amount; i++) {
            elements.push(particle());
          }
          for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            if (element.coordinateY >= canvas.height) {
              element.coordinateX = getRandomNumber_1.getRandomNumber(window.innerWidth);
              element.coordinateY = 0;
            }
            context.save();
            context.fillStyle = element.color;
            drawElement(context, element);
            context.rotate(50);
            context.restore();
          }
          window.requestAnimationFrame(drawConfetti.bind(null, context, canvas));
        }
        exports.default = drawConfetti;
      },
      { './util/getRandomNumber': 13 },
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
      { './util/containers': 9, './util/hasSelected': 14 },
    ],
    5: [
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
            gameHelpers_1.showDiceResult(containers_1.diceContainer, currentDicePoint, 300);
            player1Status += currentDicePoint;
            if (gameHelpers_1.checkWinner(player1Status)) {
              var winner = {
                index: player1,
                name: 'Player 1',
              };
              index_1.gameStorage.setSerialize('winner', winner);
              gameHelpers_1.removePlayer(player1);
              gameHelpers_1.displayPlayers(finalPosition, player1);
              gameHelpers_1.gameEnd();
              setTimeout(function() {
                window.location.href = 'winner.html';
              }, 1000);
              return;
            } else {
              var updatePosition = document.getElementById('tile-index-' + player1Status);
              gameHelpers_1.removePlayer(player1);
              gameHelpers_1.displayPlayers(updatePosition, player1);
              gameHelpers_1.traps.forEach(function(element) {
                if (element.token == player1Status) {
                  var action = element.action,
                    message = element.message;
                  player1Status -= action;
                  var newPosition_1 = document.getElementById('tile-index-' + player1Status);
                  gameHelpers_1.showMessage('' + message);
                  gameHelpers_1.deleteMessage();
                  setTimeout(function() {
                    gameHelpers_1.removePlayer(player1);
                    gameHelpers_1.displayPlayers(newPosition_1, player1);
                  }, 3000);
                }
              });
              gameHelpers_1.updatePlayer1Button(false);
            }
            if (currentDicePoint === 6) {
              gameHelpers_1.showMessage('' + gameHelpers_1.rollAgainMessage);
              gameHelpers_1.deleteMessage();
              gameHelpers_1.updatePlayer1Button(true);
            }
          }
          function runPlayer2Turn() {
            var currentDicePoint = gameHelpers_1.rollDice();
            gameHelpers_1.showDiceResult(containers_1.diceContainer, currentDicePoint, 300);
            player2Status += currentDicePoint;
            if (gameHelpers_1.checkWinner(player2Status)) {
              var winner = {
                index: player2,
                name: 'Player 2',
              };
              index_1.gameStorage.setSerialize('winner', winner);
              gameHelpers_1.removePlayer(player2);
              gameHelpers_1.displayPlayers(finalPosition, player2);
              gameHelpers_1.gameEnd();
              setTimeout(function() {
                window.location.href = 'winner.html';
              }, 1000);
              return;
            } else {
              var updatePosition = document.getElementById('tile-index-' + player2Status);
              gameHelpers_1.removePlayer(player2);
              gameHelpers_1.displayPlayers(updatePosition, player2);
              gameHelpers_1.traps.forEach(function(element) {
                if (element.token == player2Status) {
                  var action = element.action,
                    message = element.message;
                  player2Status -= action;
                  var newPosition_2 = document.getElementById('tile-index-' + player2Status);
                  gameHelpers_1.showMessage('' + message);
                  gameHelpers_1.deleteMessage();
                  setTimeout(function() {
                    gameHelpers_1.removePlayer(player2);
                    gameHelpers_1.displayPlayers(newPosition_2, player2);
                  }, 3000);
                }
              });
              gameHelpers_1.updatePlayer1Button(true);
            }
            if (currentDicePoint === 6) {
              gameHelpers_1.showMessage('' + gameHelpers_1.rollAgainMessage);
              gameHelpers_1.deleteMessage();
              gameHelpers_1.updatePlayer1Button(false);
            }
          }
        }
        exports.default = playGame;
      },
      { './../index': 1, './util/containers': 9, './util/gameHelpers': 12 },
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
            var url,
              response,
              data,
              name_1,
              titles,
              placeHolder,
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
                  (name_1 = data.name), (titles = data.titles);
                  placeHolder = 'Humble Man Without itle';
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
                  cardSubTitle = '<span>' + (titles[0] ? titles[0] : placeHolder) + '</span>';
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
      { './util/containers': 9, './util/createImage': 10 },
    ],
    7: [
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
            winnerImage.className = 'item item--winner-image';
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
      { './util/containers': 9, './util/createImage': 10 },
    ],
    8: [
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
    9: [
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
        exports.canvas = document.getElementById('canvas');
      },
      {},
    ],
    10: [
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
    11: [
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
    12: [
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
          message: 'A wolf emerges from the night woods. Retreat two fields.',
        };
        var trap3 = {
          token: 18,
          action: 3,
          message: 'A white walker! Retreat three fields to escape death.',
        };
        var trap4 = {
          token: 24,
          action: 4,
          message: 'Enemy horsemen on the horizon! You must retreat four fields.',
        };
        var trap5 = {
          token: 28,
          action: 5,
          message: 'Dragons! Retreat five fields to escape their fire-breath.',
        };
        exports.rollAgainMessage = 'You rolled a 6 and get another turn. Roll again!';
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
        function showDiceResult(container, point, delay) {
          container.innerHTML = dice_1.diceArray[point - 1];
          container.className += ' item--shake';
          setTimeout(function() {
            container.classList.remove('item--shake');
          }, delay);
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
        function gameEnd() {
          containers_1.player1Btn.disabled = true;
          containers_1.player2Btn.disabled = true;
        }
        exports.gameEnd = gameEnd;
        function showMessage(content) {
          containers_1.message.innerText = content;
          containers_1.overlay.style.display = 'flex';
        }
        exports.showMessage = showMessage;
        function deleteMessage() {
          setTimeout(function() {
            containers_1.overlay.style.display = 'none';
          }, 1500);
        }
        exports.deleteMessage = deleteMessage;
      },
      { './containers': 9, './createImage': 10, './dice': 11 },
    ],
    13: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        function getRandomNumber(maxNum) {
          return Math.floor(Math.random() * maxNum);
        }
        exports.getRandomNumber = getRandomNumber;
      },
      {},
    ],
    14: [
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
    15: [
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXgudHMiLCJzcmMvc2NyaXB0cy9kcmF3Q29uZmV0dGkudHMiLCJzcmMvc2NyaXB0cy9oYW5kbGVEcmFnLnRzIiwic3JjL3NjcmlwdHMvaGFuZGxlU2VsZWN0aW9uLnRzIiwic3JjL3NjcmlwdHMvcGxheUdhbWUudHMiLCJzcmMvc2NyaXB0cy9zaG93Q2hhcmFjdGVyLnRzIiwic3JjL3NjcmlwdHMvc2hvd1dpbm5lci50cyIsInNyYy9zY3JpcHRzL3V0aWwvY2hhcmFjdGVySW5kZXgudHMiLCJzcmMvc2NyaXB0cy91dGlsL2NvbnRhaW5lcnMudHMiLCJzcmMvc2NyaXB0cy91dGlsL2NyZWF0ZUltYWdlLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9kaWNlLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9nYW1lSGVscGVycy50cyIsInNyYy9zY3JpcHRzL3V0aWwvZ2V0UmFuZG9tTnVtYmVyLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9oYXNTZWxlY3RlZC50cyIsInNyYy9zY3JpcHRzL3V0aWwvc3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsbURBQThDO0FBQzlDLDZEQUE0RDtBQUM1RCwrQ0FBMEM7QUFDMUMseURBQXdEO0FBQ3hELG1EQUF3RTtBQUN4RSxnRUFBMkQ7QUFDM0Qsd0RBUW1DO0FBQ25DLDBEQUFtRjtBQUNuRixrREFBNkM7QUFDN0MsdURBQWtEO0FBRXJDLFFBQUEsV0FBVyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO0FBRXpDLElBQUksMEJBQWEsSUFBSSxJQUFJLEVBQUU7SUFDekIsdUJBQWlCLENBQUMsd0JBQWMsQ0FBQyxDQUFDO0lBQ2xDLG9CQUFVLEVBQUUsQ0FBQztJQUNiLElBQUksaUNBQW9CLElBQUksSUFBSTtRQUM5QixpQ0FBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsaUNBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUMxRTtBQUVELElBQUksa0JBQUssSUFBSSxJQUFJLElBQUksMEJBQWEsSUFBSSxJQUFJLEVBQUU7SUFDMUMsSUFBTSxPQUFPLEdBQVcsbUJBQVcsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbkUsSUFBTSxPQUFPLEdBQVcsbUJBQVcsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbkUseUJBQVcsQ0FBQyxrQkFBSyxDQUFDLENBQUM7SUFDbkIsNEJBQWMsQ0FBQywwQkFBYSxFQUFFLHNCQUFRLEVBQUUsQ0FBQyxDQUFDO0lBRTFDLElBQUksT0FBTyxJQUFJLE9BQU8sRUFBRTtRQUN0QixrQkFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztLQUM1QjtDQUNGO0FBRUQsSUFBSSw0QkFBZSxJQUFJLElBQUksRUFBRTtJQUMzQixJQUFNLE1BQU0sR0FBZSxtQkFBVyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRSxvQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3BCO0FBRUQsSUFBSSxxQkFBUSxJQUFJLElBQUksRUFBRTtJQUNwQixxQkFBUSxDQUFDLGdCQUFnQixDQUN2QixPQUFPLEVBQ1A7UUFDRSxtQkFBVyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuQyxtQkFBVyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuQyxtQkFBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7SUFDdkMsQ0FBQyxFQUNELEtBQUssQ0FDTixDQUFDO0NBQ0g7QUFFRCxJQUFJLG1CQUFNLElBQUksSUFBSSxFQUFFO0lBQ2xCLElBQU0sT0FBTyxHQUE2QixtQkFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRSxtQkFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ2pDLG1CQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDbkMsc0JBQVksQ0FBQyxPQUFPLEVBQUUsbUJBQU0sQ0FBQyxDQUFDO0NBQy9COzs7OztBQzlERCwwREFBeUQ7QUFRekQsSUFBTSxRQUFRLEdBQUcsY0FBdUIsT0FBQSxDQUFDO0lBQ3ZDLFdBQVcsRUFBRSxpQ0FBZSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDL0MsV0FBVyxFQUFFLGlDQUFlLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNoRCxLQUFLLEVBQUUsY0FBYyxFQUFFO0NBQ3hCLENBQUMsRUFKc0MsQ0FJdEMsQ0FBQztBQUVILFNBQVMsV0FBVyxDQUFDLE9BQWlDLEVBQUUsT0FBd0I7SUFDdEUsSUFBQSxpQ0FBVyxFQUFFLGlDQUFXLEVBQUUscUJBQUssQ0FBYTtJQUNwRCxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDcEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDekMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxFQUFFLFdBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNsRCxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUN0QixPQUFPLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUM1QixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDbkIsQ0FBQztBQUVELFNBQVMsY0FBYztJQUNyQixJQUFNLE1BQU0sR0FBYSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFNUYsT0FBTyxNQUFNLENBQUMsaUNBQWUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNoRCxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsT0FBaUMsRUFBRSxNQUF5QjtJQUMvRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFDLE9BQWlDLEVBQUUsTUFBeUI7SUFDaEYsV0FBVyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUU3QixJQUFNLFFBQVEsR0FBc0IsRUFBRSxDQUFDO0lBQ3ZDLElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUVsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQy9CLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUMzQjtJQUVELEtBQXNCLFVBQVEsRUFBUixxQkFBUSxFQUFSLHNCQUFRLEVBQVIsSUFBUSxFQUFFO1FBQTNCLElBQU0sT0FBTyxpQkFBQTtRQUNoQixJQUFJLE9BQU8sQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUN4QyxPQUFPLENBQUMsV0FBVyxHQUFHLGlDQUFlLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pELE9BQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO1FBRUQsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBRWxDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDbkI7SUFFRCxNQUFNLENBQUMscUJBQXFCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDekUsQ0FBQztBQUVELGtCQUFlLFlBQVksQ0FBQzs7Ozs7QUM3RDVCLGtDQUF1QztBQUN2QyxJQUFJLE9BQW9CLENBQUM7QUFFekIsU0FBUyxlQUFlLENBQUMsS0FBZ0I7SUFDdkMsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFxQixDQUFDO0lBQ3JDLEtBQUssQ0FBQyxNQUFzQixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQ3RELENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxLQUFnQjtJQUNwQyxLQUFLLENBQUMsTUFBc0IsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNuRCxDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsS0FBZ0I7SUFDdEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3pCLENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxLQUFnQjtJQUN2QyxJQUFLLEtBQUssQ0FBQyxNQUFzQixDQUFDLEVBQUUsS0FBSyxXQUFXLEVBQUU7UUFDbkQsS0FBSyxDQUFDLE1BQXNCLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7S0FDNUQ7SUFDRCxJQUFLLEtBQUssQ0FBQyxNQUFzQixDQUFDLEVBQUUsS0FBSyxVQUFVLEVBQUU7UUFDbEQsS0FBSyxDQUFDLE1BQXNCLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7S0FDNUQ7SUFDRCxJQUFLLEtBQUssQ0FBQyxNQUFzQixDQUFDLEVBQUUsS0FBSyxVQUFVLEVBQUU7UUFDbEQsS0FBSyxDQUFDLE1BQXNCLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7S0FDNUQ7QUFDSCxDQUFDO0FBQ0QsU0FBUyxlQUFlLENBQUMsS0FBZ0I7SUFDdkMsSUFBSyxLQUFLLENBQUMsTUFBc0IsQ0FBQyxFQUFFLEtBQUssV0FBVyxFQUFFO1FBQ25ELEtBQUssQ0FBQyxNQUFzQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0tBQ3JEO0lBQ0QsSUFBSyxLQUFLLENBQUMsTUFBc0IsQ0FBQyxFQUFFLEtBQUssVUFBVSxFQUFFO1FBQ2xELEtBQUssQ0FBQyxNQUFzQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0tBQ3JEO0lBQ0QsSUFBSyxLQUFLLENBQUMsTUFBc0IsQ0FBQyxFQUFFLEtBQUssVUFBVSxFQUFFO1FBQ2xELEtBQUssQ0FBQyxNQUFzQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0tBQ3JEO0FBQ0gsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLEtBQWdCO0lBRWxDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUd2QixJQUFLLEtBQUssQ0FBQyxNQUFzQixDQUFDLEVBQUUsSUFBSSxVQUFVLEVBQUU7UUFDbEQsSUFBSyxLQUFLLENBQUMsTUFBc0IsQ0FBQyxhQUFhLEVBQUUsRUFBRTtZQUNqRCxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUN2QyxLQUFLLENBQUMsTUFBc0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUNwRCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0EsS0FBSyxDQUFDLE1BQXNCLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDcEQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsS0FBSyxDQUFDLE1BQXNCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELG1CQUFXLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxLQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFHLENBQUMsQ0FBQztLQUNuRTtJQUVELElBQUssS0FBSyxDQUFDLE1BQXNCLENBQUMsRUFBRSxJQUFJLFVBQVUsRUFBRTtRQUNsRCxJQUFLLEtBQUssQ0FBQyxNQUFzQixDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ2pELEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQ3ZDLEtBQUssQ0FBQyxNQUFzQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3BELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDQSxLQUFLLENBQUMsTUFBc0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNwRCxPQUFPLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QyxLQUFLLENBQUMsTUFBc0IsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkQsbUJBQVcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEtBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUcsQ0FBQyxDQUFDO0tBQ25FO0lBRUQsSUFBSyxLQUFLLENBQUMsTUFBc0IsQ0FBQyxFQUFFLElBQUksV0FBVyxFQUFFO1FBQ2xELEtBQUssQ0FBQyxNQUFzQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssQ0FBQyxNQUFzQixDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNwRDtBQUNILENBQUM7QUFFRCxTQUFTLFVBQVU7SUFDakIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUN4RCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3BELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDdEQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUN4RCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3hELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUVELGtCQUFlLFVBQVUsQ0FBQzs7Ozs7QUNwRjFCLGdEQUF1RTtBQUN2RSxrREFBaUQ7QUFFakQsU0FBZ0IsZUFBZTtJQUM3QixJQUFNLGtCQUFrQixHQUFHLHlCQUFXLENBQUMsNkJBQWdCLENBQUMsQ0FBQztJQUN6RCxJQUFNLGtCQUFrQixHQUFHLHlCQUFXLENBQUMsNkJBQWdCLENBQUMsQ0FBQztJQUN6RCxJQUFJLGtCQUFrQixJQUFJLGtCQUFrQixFQUFFO1FBQzVDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztLQUNwQztTQUFNO1FBQ0wsS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7S0FDdEQ7QUFDSCxDQUFDO0FBUkQsMENBUUM7Ozs7O0FDWEQsb0NBQXlDO0FBQ3pDLGtEQVk0QjtBQUM1QixnREFBMEU7QUFHMUUsU0FBUyxRQUFRLENBQUMsT0FBZSxFQUFFLE9BQWU7SUFDaEQsSUFBTSxhQUFhLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDM0UsSUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUUvRCxJQUFJLGFBQWEsR0FBVyxDQUFDLENBQUM7SUFDOUIsSUFBSSxhQUFhLEdBQVcsQ0FBQyxDQUFDO0lBRTlCLDRCQUFjLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLDRCQUFjLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLGlDQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLHVCQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1RCx1QkFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFNUQsU0FBUyxjQUFjO1FBQ3JCLElBQU0sZ0JBQWdCLEdBQUcsc0JBQVEsRUFBRSxDQUFDO1FBQ3BDLDRCQUFjLENBQUMsMEJBQWEsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyRCxhQUFhLElBQUksZ0JBQWdCLENBQUM7UUFFbEMsSUFBSSx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzlCLElBQU0sTUFBTSxHQUFnQjtnQkFDMUIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsSUFBSSxFQUFFLFVBQVU7YUFDakIsQ0FBQztZQUNGLG1CQUFXLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMzQywwQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RCLDRCQUFjLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZDLHFCQUFPLEVBQUUsQ0FBQztZQUNWLFVBQVUsQ0FBQztnQkFDVCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7WUFDdkMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ1QsT0FBTztTQUNSO2FBQU07WUFDTCxJQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFjLGFBQWUsQ0FBQyxDQUFDO1lBQzlFLDBCQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEIsNEJBQWMsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFeEMsbUJBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO2dCQUNuQixJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksYUFBYSxFQUFFO29CQUMxQixJQUFBLHVCQUFNLEVBQUUseUJBQU8sQ0FBYTtvQkFDcEMsYUFBYSxJQUFJLE1BQU0sQ0FBQztvQkFDeEIsSUFBTSxhQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBYyxhQUFlLENBQUMsQ0FBQztvQkFFM0UseUJBQVcsQ0FBQyxLQUFHLE9BQVMsQ0FBQyxDQUFDO29CQUMxQiwyQkFBYSxFQUFFLENBQUM7b0JBRWhCLFVBQVUsQ0FBQzt3QkFDVCwwQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN0Qiw0QkFBYyxDQUFDLGFBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDdkMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNWO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFFSCxpQ0FBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QjtRQUVELElBQUksZ0JBQWdCLEtBQUssQ0FBQyxFQUFFO1lBQzFCLHlCQUFXLENBQUMsS0FBRyw4QkFBa0IsQ0FBQyxDQUFDO1lBQ25DLDJCQUFhLEVBQUUsQ0FBQztZQUNoQixpQ0FBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRCxTQUFTLGNBQWM7UUFDckIsSUFBTSxnQkFBZ0IsR0FBRyxzQkFBUSxFQUFFLENBQUM7UUFDcEMsNEJBQWMsQ0FBQywwQkFBYSxFQUFFLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELGFBQWEsSUFBSSxnQkFBZ0IsQ0FBQztRQUVsQyxJQUFJLHlCQUFXLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDOUIsSUFBTSxNQUFNLEdBQWdCO2dCQUMxQixLQUFLLEVBQUUsT0FBTztnQkFDZCxJQUFJLEVBQUUsVUFBVTthQUNqQixDQUFDO1lBQ0YsbUJBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLDBCQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEIsNEJBQWMsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdkMscUJBQU8sRUFBRSxDQUFDO1lBQ1YsVUFBVSxDQUFDO2dCQUNULE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztZQUN2QyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDVCxPQUFPO1NBQ1I7YUFBTTtZQUNMLElBQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWMsYUFBZSxDQUFDLENBQUM7WUFDOUUsMEJBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0Qiw0QkFBYyxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUV4QyxtQkFBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU87Z0JBQ25CLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxhQUFhLEVBQUU7b0JBQzFCLElBQUEsdUJBQU0sRUFBRSx5QkFBTyxDQUFhO29CQUNwQyxhQUFhLElBQUksTUFBTSxDQUFDO29CQUN4QixJQUFNLGFBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFjLGFBQWUsQ0FBQyxDQUFDO29CQUUzRSx5QkFBVyxDQUFDLEtBQUcsT0FBUyxDQUFDLENBQUM7b0JBQzFCLDJCQUFhLEVBQUUsQ0FBQztvQkFFaEIsVUFBVSxDQUFDO3dCQUNULDBCQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3RCLDRCQUFjLENBQUMsYUFBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUN2QyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ1Y7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILGlDQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNCO1FBRUQsSUFBSSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUU7WUFDMUIseUJBQVcsQ0FBQyxLQUFHLDhCQUFrQixDQUFDLENBQUM7WUFDbkMsMkJBQWEsRUFBRSxDQUFDO1lBQ2hCLGlDQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFFRCxrQkFBZSxRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqSXhCLGdEQUFrRDtBQUVsRCxrREFBNkM7QUFFN0MsSUFBTSxRQUFRLEdBQVcsbURBQW1ELENBQUM7QUFFN0UsU0FBUyxpQkFBaUIsQ0FBQyxjQUF3QjtJQUNqRCxjQUFjLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztRQUN4QixhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBZSxhQUFhLENBQUMsa0JBQTBCOzs7Ozs7b0JBQy9DLEdBQUcsR0FBRyxLQUFHLFFBQVEsR0FBRyxrQkFBb0IsQ0FBQzs7OztvQkFHNUIsV0FBTSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUE7O29CQUEzQixRQUFRLEdBQUcsU0FBZ0I7b0JBQ0YsV0FBTSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUE7O29CQUE5QyxJQUFJLEdBQXFCLFNBQXFCO29CQUM1QyxTQUFpQixJQUFJLEtBQWpCLEVBQUUsTUFBTSxHQUFLLElBQUksT0FBVCxDQUFVO29CQUN4QixXQUFXLEdBQUcseUJBQXlCLENBQUM7b0JBRXhDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNoRCxTQUFTLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDO29CQUN4QyxTQUFTLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDNUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBRyxrQkFBb0IsQ0FBQyxDQUFDO29CQUNqRCxTQUFTLEdBQUcsa0NBQThCLHFCQUFXLENBQ3pELGtCQUFrQixDQUNuQix5REFBaUQsa0JBQWtCLFFBQUksQ0FBQztvQkFDbkUsU0FBUyxHQUFHLFVBQVEsTUFBSSxVQUFPLENBQUM7b0JBQ2hDLFlBQVksR0FBRyxZQUFTLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLGFBQVMsQ0FBQztvQkFDM0UsU0FBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLEdBQUcsU0FBUyxHQUFHLFlBQVksQ0FBQztvQkFFM0QsMEJBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBRWhDLFdBQU8sSUFBSSxFQUFDOzs7b0JBRVosTUFBTSxLQUFHLENBQUM7Ozs7O0NBRWI7QUFFRCxrQkFBZSxpQkFBaUIsQ0FBQzs7Ozs7QUN4Q2pDLGdEQUEyRTtBQUMzRSxrREFBNkM7QUFPN0MsU0FBUyxVQUFVLENBQUMsRUFBdUI7UUFBckIsZ0JBQUssRUFBRSxjQUFJO0lBQy9CLElBQUksNEJBQWUsSUFBSSxJQUFJLEVBQUU7UUFDM0IsSUFBTSxXQUFXLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsV0FBVyxDQUFDLFNBQVMsR0FBRyx5QkFBeUIsQ0FBQztRQUNsRCxXQUFXLENBQUMsR0FBRyxHQUFHLEtBQUcscUJBQVcsQ0FBQyxLQUFLLENBQUcsQ0FBQztRQUMxQyxXQUFXLENBQUMsR0FBRyxHQUFHLCtCQUErQixDQUFDO1FBQ2xELDRCQUFlLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQzFDO0lBRUQsSUFBSSxrQ0FBcUIsSUFBSSxJQUFJLEVBQUU7UUFDakMsa0NBQXFCLENBQUMsU0FBUyxHQUFNLElBQUksd0JBQXFCLENBQUM7S0FDaEU7QUFDSCxDQUFDO0FBRUQsa0JBQWUsVUFBVSxDQUFDOzs7OztBQ3RCMUIsSUFBTSxPQUFPLEdBQVcsR0FBRyxDQUFDO0FBQzVCLElBQU0sR0FBRyxHQUFXLEdBQUcsQ0FBQztBQUN4QixJQUFNLE1BQU0sR0FBVyxHQUFHLENBQUM7QUFDM0IsSUFBTSxNQUFNLEdBQVcsSUFBSSxDQUFDO0FBQzVCLElBQU0sUUFBUSxHQUFXLEdBQUcsQ0FBQztBQUM3QixJQUFNLEtBQUssR0FBVyxHQUFHLENBQUM7QUFDMUIsSUFBTSxLQUFLLEdBQVcsSUFBSSxDQUFDO0FBQzNCLElBQU0sS0FBSyxHQUFXLEdBQUcsQ0FBQztBQUMxQixJQUFNLE9BQU8sR0FBVyxHQUFHLENBQUM7QUFDNUIsSUFBTSxNQUFNLEdBQVcsR0FBRyxDQUFDO0FBQzNCLElBQU0sT0FBTyxHQUFXLEdBQUcsQ0FBQztBQUM1QixJQUFNLEtBQUssR0FBVyxFQUFFLENBQUM7QUFFekIsSUFBTSxjQUFjLEdBQWE7SUFDL0IsT0FBTztJQUNQLEdBQUc7SUFDSCxNQUFNO0lBQ04sTUFBTTtJQUNOLFFBQVE7SUFDUixLQUFLO0lBQ0wsS0FBSztJQUNMLEtBQUs7SUFDTCxPQUFPO0lBQ1AsTUFBTTtJQUNOLE9BQU87SUFDUCxLQUFLO0NBQ04sQ0FBQztBQUNGLGtCQUFlLGNBQWMsQ0FBQzs7Ozs7QUMxQmpCLFFBQUEsYUFBYSxHQUFnQixRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2xFLFFBQUEsZ0JBQWdCLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEUsUUFBQSxnQkFBZ0IsR0FBZ0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwRSxRQUFBLG9CQUFvQixHQUFzQixRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFHckYsUUFBQSxLQUFLLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDMUQsUUFBQSxhQUFhLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEUsUUFBQSxVQUFVLEdBQXNCLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDeEUsUUFBQSxVQUFVLEdBQXNCLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDeEUsUUFBQSxPQUFPLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDMUQsUUFBQSxPQUFPLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7QUFHMUQsUUFBQSxlQUFlLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakUsUUFBQSxxQkFBcUIsR0FBZ0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQy9FLFFBQUEsUUFBUSxHQUFnQixRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pELFFBQUEsTUFBTSxHQUF5QyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7OztBQ2xCOUYsU0FBUyxXQUFXLENBQUMsS0FBYTtJQUNoQyxPQUFPLHdFQUFzRSxLQUFLLFNBQU0sQ0FBQztBQUMzRixDQUFDO0FBRUQsa0JBQWUsV0FBVyxDQUFDOzs7OztBQ0pkLFFBQUEsU0FBUyxHQUFHO0lBQ3ZCLE1BQU0sRUFDSiw2ZEFBNmQ7SUFDL2QsTUFBTSxFQUNKLHFrQkFBcWtCO0lBQ3ZrQixNQUFNLEVBQ0osdW5CQUF1bkI7SUFDem5CLE1BQU0sRUFDSiw4c0JBQThzQjtJQUNodEIsTUFBTSxFQUNKLGd3QkFBZ3dCO0lBQ2x3QixNQUFNLEVBQ0osMnlCQUEyeUI7Q0FDOXlCLENBQUM7QUFFVyxRQUFBLFNBQVMsR0FBYTtJQUNqQyxpQkFBUyxDQUFDLE1BQU07SUFDaEIsaUJBQVMsQ0FBQyxNQUFNO0lBQ2hCLGlCQUFTLENBQUMsTUFBTTtJQUNoQixpQkFBUyxDQUFDLE1BQU07SUFDaEIsaUJBQVMsQ0FBQyxNQUFNO0lBQ2hCLGlCQUFTLENBQUMsTUFBTTtDQUNqQixDQUFDO0FBRUYsU0FBZ0IsY0FBYyxDQUFDLFNBQWlCO0lBQzlDLE9BQU8saUJBQVMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQUZELHdDQUVDOzs7OztBQzFCRCwyQ0FBd0U7QUFDeEUsK0JBQW1DO0FBQ25DLDZDQUF3QztBQVF4QyxJQUFNLEtBQUssR0FBUztJQUNsQixLQUFLLEVBQUUsQ0FBQztJQUNSLE1BQU0sRUFBRSxDQUFDO0lBQ1QsT0FBTyxFQUFFLDBEQUEwRDtDQUNwRSxDQUFDO0FBQ0YsSUFBTSxLQUFLLEdBQVM7SUFDbEIsS0FBSyxFQUFFLEVBQUU7SUFDVCxNQUFNLEVBQUUsQ0FBQztJQUNULE9BQU8sRUFBRSwwREFBMEQ7Q0FDcEUsQ0FBQztBQUNGLElBQU0sS0FBSyxHQUFTO0lBQ2xCLEtBQUssRUFBRSxFQUFFO0lBQ1QsTUFBTSxFQUFFLENBQUM7SUFDVCxPQUFPLEVBQUUsdURBQXVEO0NBQ2pFLENBQUM7QUFDRixJQUFNLEtBQUssR0FBUztJQUNsQixLQUFLLEVBQUUsRUFBRTtJQUNULE1BQU0sRUFBRSxDQUFDO0lBQ1QsT0FBTyxFQUFFLDhEQUE4RDtDQUN4RSxDQUFDO0FBQ0YsSUFBTSxLQUFLLEdBQVM7SUFDbEIsS0FBSyxFQUFFLEVBQUU7SUFDVCxNQUFNLEVBQUUsQ0FBQztJQUNULE9BQU8sRUFBRSwyREFBMkQ7Q0FDckUsQ0FBQztBQUVXLFFBQUEsZ0JBQWdCLEdBQVcsa0RBQWtELENBQUM7QUFFOUUsUUFBQSxLQUFLLEdBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFFakUsU0FBZ0IsV0FBVyxDQUFDLFNBQXNCOzRCQUN2QyxDQUFDO1FBQ1IsSUFBTSxJQUFJLEdBQW1CLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsZ0JBQWMsQ0FBRyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxnQ0FBOEIsQ0FBQyxZQUFTLENBQUM7UUFFMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQztTQUN0QzthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO1NBQ3RDO1FBRUQsYUFBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE9BQU87WUFDZixJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLGlGQUErRSxPQUFPLENBQUMsTUFBTSxXQUFRLENBQUM7Z0JBQ25JLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztnQkFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsZUFBZSxDQUFDO2FBQ2pEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxzRkFBc0YsQ0FBQztZQUNwSCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7WUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUM7WUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxlQUFlLENBQUM7U0FDakQ7UUFFRCxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDOztJQTdCOUIsS0FBSyxJQUFJLENBQUMsR0FBVyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUU7Z0JBQTNCLENBQUM7S0E4QlQ7QUFDSCxDQUFDO0FBaENELGtDQWdDQztBQUVELFNBQWdCLG1CQUFtQixDQUFDLGFBQXNCO0lBQ3hELElBQUksYUFBYSxFQUFFO1FBQ2pCLHVCQUFVLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUM1Qix1QkFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7S0FDNUI7U0FBTTtRQUNMLHVCQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUMzQix1QkFBVSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7S0FDN0I7QUFDSCxDQUFDO0FBUkQsa0RBUUM7QUFFRCxTQUFnQixjQUFjLENBQUMsU0FBc0IsRUFBRSxLQUFhLEVBQUUsS0FBYztJQUNsRixTQUFTLENBQUMsU0FBUyxHQUFHLGdCQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNDLFNBQVMsQ0FBQyxTQUFTLElBQUksY0FBYyxDQUFDO0lBRXRDLFVBQVUsQ0FBQztRQUNULFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNaLENBQUM7QUFQRCx3Q0FPQztBQUVELFNBQWdCLFFBQVE7SUFDdEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUZELDRCQUVDO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLE1BQWM7SUFDekMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFVLE1BQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3ZELENBQUM7QUFGRCxvQ0FFQztBQUVELFNBQWdCLGNBQWMsQ0FBQyxTQUFzQixFQUFFLFdBQW1CO0lBQ3hFLElBQU0sTUFBTSxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRS9ELE1BQU0sQ0FBQyxHQUFHLEdBQUcsS0FBRyxxQkFBVyxDQUFDLFdBQVcsQ0FBRyxDQUFDO0lBRTNDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBRTlDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLG9CQUFrQixXQUFhLENBQUMsQ0FBQztJQUU1RCxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxZQUFVLFdBQWEsQ0FBQyxDQUFDO0lBRW5ELElBQUksU0FBUyxJQUFJLElBQUksRUFBRTtRQUNyQixTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFCO0FBQ0gsQ0FBQztBQWRELHdDQWNDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLFlBQW9CO0lBQzlDLE9BQU8sWUFBWSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDM0MsQ0FBQztBQUZELGtDQUVDO0FBRUQsU0FBZ0IsT0FBTztJQUNyQix1QkFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDM0IsdUJBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQzdCLENBQUM7QUFIRCwwQkFHQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxPQUFlO0lBQ3pDLG9CQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUM1QixvQkFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0FBQ2pDLENBQUM7QUFIRCxrQ0FHQztBQUVELFNBQWdCLGFBQWE7SUFDM0IsVUFBVSxDQUFDO1FBQ1Qsb0JBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUNqQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDWCxDQUFDO0FBSkQsc0NBSUM7Ozs7O0FDdklELFNBQWdCLGVBQWUsQ0FBQyxNQUFjO0lBQzVDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUZELDBDQUVDOzs7OztBQ0ZELFNBQWdCLFdBQVcsQ0FBQyxTQUFzQjtJQUNoRCxPQUFPLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUNuQyxDQUFDO0FBRkQsa0NBRUM7Ozs7O0FDRkQ7SUFBQTtRQUNVLFlBQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO0lBMkJ4QyxDQUFDO0lBekJDLHFCQUFHLEdBQUgsVUFBSSxHQUFXLEVBQUUsS0FBYTtRQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELHFCQUFHLEdBQUgsVUFBSSxHQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsd0JBQU0sR0FBTixVQUFPLEdBQVc7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELDhCQUFZLEdBQVosVUFBYSxHQUFXLEVBQUUsS0FBVTtRQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELGdDQUFjLEdBQWQsVUFBa0IsR0FBVztRQUMzQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBTSxDQUFDO0lBQy9CLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0E1QkEsQUE0QkMsSUFBQTtBQUVELGtCQUFlLE9BQU8sQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBoYW5kbGVEcmFnIGZyb20gJy4vc2NyaXB0cy9oYW5kbGVEcmFnJztcbmltcG9ydCB7IGhhbmRsZVNlbGVjdGlvbiB9IGZyb20gJy4vc2NyaXB0cy9oYW5kbGVTZWxlY3Rpb24nO1xuaW1wb3J0IHBsYXlHYW1lIGZyb20gJy4vc2NyaXB0cy9wbGF5R2FtZSc7XG5pbXBvcnQgZ2V0Q2hhcmFjdGVyQ2FyZHMgZnJvbSAnLi9zY3JpcHRzL3Nob3dDaGFyYWN0ZXInO1xuaW1wb3J0IHNob3dXaW5uZXIsIHsgV2lubmVyIGFzIFdpbm5lclR5cGUgfSBmcm9tICcuL3NjcmlwdHMvc2hvd1dpbm5lcic7XG5pbXBvcnQgY2hhcmFjdGVySW5kZXggZnJvbSAnLi9zY3JpcHRzL3V0aWwvY2hhcmFjdGVySW5kZXgnO1xuaW1wb3J0IHtcbiAgYm9hcmQsXG4gIGNoYXJhY3Rlckxpc3QsXG4gIGRpY2VDb250YWluZXIsXG4gIHJlc2V0QnRuLFxuICB2YWxpZGF0ZVNlbGVjdGlvbkJ0bixcbiAgd2lubmVyQ29udGFpbmVyLFxuICBjYW52YXMsXG59IGZyb20gJy4vc2NyaXB0cy91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IHsgY3JlYXRlQm9hcmQsIHJvbGxEaWNlLCBzaG93RGljZVJlc3VsdCB9IGZyb20gJy4vc2NyaXB0cy91dGlsL2dhbWVIZWxwZXJzJztcbmltcG9ydCBTdG9yYWdlIGZyb20gJy4vc2NyaXB0cy91dGlsL3N0b3JhZ2UnO1xuaW1wb3J0IGRyYXdDb25mZXR0aSBmcm9tICcuL3NjcmlwdHMvZHJhd0NvbmZldHRpJztcblxuZXhwb3J0IGNvbnN0IGdhbWVTdG9yYWdlID0gbmV3IFN0b3JhZ2UoKTtcblxuaWYgKGNoYXJhY3Rlckxpc3QgIT0gbnVsbCkge1xuICBnZXRDaGFyYWN0ZXJDYXJkcyhjaGFyYWN0ZXJJbmRleCk7XG4gIGhhbmRsZURyYWcoKTtcbiAgaWYgKHZhbGlkYXRlU2VsZWN0aW9uQnRuICE9IG51bGwpXG4gICAgdmFsaWRhdGVTZWxlY3Rpb25CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVTZWxlY3Rpb24sIGZhbHNlKTtcbn1cblxuaWYgKGJvYXJkICE9IG51bGwgJiYgZGljZUNvbnRhaW5lciAhPSBudWxsKSB7XG4gIGNvbnN0IHBsYXllcjE6IG51bWJlciA9IGdhbWVTdG9yYWdlLmdldFVuc2VyaWFsaXplKCdwbGF5ZXIxSW5kZXgnKTtcbiAgY29uc3QgcGxheWVyMjogbnVtYmVyID0gZ2FtZVN0b3JhZ2UuZ2V0VW5zZXJpYWxpemUoJ3BsYXllcjJJbmRleCcpO1xuICBjcmVhdGVCb2FyZChib2FyZCk7XG4gIHNob3dEaWNlUmVzdWx0KGRpY2VDb250YWluZXIsIHJvbGxEaWNlKCkpO1xuXG4gIGlmIChwbGF5ZXIxICYmIHBsYXllcjIpIHtcbiAgICBwbGF5R2FtZShwbGF5ZXIxLCBwbGF5ZXIyKTtcbiAgfVxufVxuXG5pZiAod2lubmVyQ29udGFpbmVyICE9IG51bGwpIHtcbiAgY29uc3Qgd2lubmVyOiBXaW5uZXJUeXBlID0gZ2FtZVN0b3JhZ2UuZ2V0VW5zZXJpYWxpemUoJ3dpbm5lcicpO1xuICBzaG93V2lubmVyKHdpbm5lcik7XG59XG5cbmlmIChyZXNldEJ0biAhPSBudWxsKSB7XG4gIHJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgJ2NsaWNrJyxcbiAgICBmdW5jdGlvbigpIHtcbiAgICAgIGdhbWVTdG9yYWdlLmRlbGV0ZSgncGxheWVyMUluZGV4Jyk7XG4gICAgICBnYW1lU3RvcmFnZS5kZWxldGUoJ3BsYXllcjJJbmRleCcpO1xuICAgICAgZ2FtZVN0b3JhZ2UuZGVsZXRlKCd3aW5uZXInKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ3NlbGVjdC5odG1sJztcbiAgICB9LFxuICAgIGZhbHNlLFxuICApO1xufVxuXG5pZiAoY2FudmFzICE9IG51bGwpIHtcbiAgY29uc3QgY29udGV4dCA9IDxDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ+Y2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICBkcmF3Q29uZmV0dGkoY29udGV4dCwgY2FudmFzKTtcbn1cbiIsImltcG9ydCB7IGdldFJhbmRvbU51bWJlciB9IGZyb20gJy4vdXRpbC9nZXRSYW5kb21OdW1iZXInO1xuXG5pbnRlcmZhY2UgUGFydGljbGVzQ29uZmlnIHtcbiAgY29vcmRpbmF0ZVg6IG51bWJlcjtcbiAgY29vcmRpbmF0ZVk6IG51bWJlcjtcbiAgY29sb3I6IHN0cmluZztcbn1cblxuY29uc3QgcGFydGljbGUgPSAoKTogUGFydGljbGVzQ29uZmlnID0+ICh7XG4gIGNvb3JkaW5hdGVYOiBnZXRSYW5kb21OdW1iZXIod2luZG93LmlubmVyV2lkdGgpLFxuICBjb29yZGluYXRlWTogZ2V0UmFuZG9tTnVtYmVyKHdpbmRvdy5pbm5lckhlaWdodCksXG4gIGNvbG9yOiBnZXRSYW5kb21Db2xvcigpLFxufSk7XG5cbmZ1bmN0aW9uIGRyYXdFbGVtZW50KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZWxlbWVudDogUGFydGljbGVzQ29uZmlnKTogdm9pZCB7XG4gIGNvbnN0IHsgY29vcmRpbmF0ZVgsIGNvb3JkaW5hdGVZLCBjb2xvciB9ID0gZWxlbWVudDtcbiAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgY29udGV4dC5tb3ZlVG8oY29vcmRpbmF0ZVgsIGNvb3JkaW5hdGVZKTtcbiAgY29udGV4dC5saW5lVG8oY29vcmRpbmF0ZVggKyA1LCBjb29yZGluYXRlWSArIDEwKTtcbiAgY29udGV4dC5saW5lV2lkdGggPSA1O1xuICBjb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gIGNvbnRleHQuc3Ryb2tlKCk7XG59XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUNvbG9yKCk6IHN0cmluZyB7XG4gIGNvbnN0IGNvbG9yczogc3RyaW5nW10gPSBbJyNGRjAwMDAnLCAnI0ZGRkYwMCcsICcjMDBGRjAwJywgJyM4MEZGRkYnLCAnI0ZGNDAwMCcsICcjRkYwMEZGJ107XG5cbiAgcmV0dXJuIGNvbG9yc1tnZXRSYW5kb21OdW1iZXIoY29sb3JzLmxlbmd0aCldO1xufVxuXG5mdW5jdGlvbiBjbGVhckNhbnZhcyhjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpOiB2b2lkIHtcbiAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbn1cblxuZnVuY3Rpb24gZHJhd0NvbmZldHRpKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCk6IHZvaWQge1xuICBjbGVhckNhbnZhcyhjb250ZXh0LCBjYW52YXMpO1xuXG4gIGNvbnN0IGVsZW1lbnRzOiBQYXJ0aWNsZXNDb25maWdbXSA9IFtdO1xuICBjb25zdCBhbW91bnQgPSAxMDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFtb3VudDsgaSsrKSB7XG4gICAgZWxlbWVudHMucHVzaChwYXJ0aWNsZSgpKTtcbiAgfVxuXG4gIGZvciAoY29uc3QgZWxlbWVudCBvZiBlbGVtZW50cykge1xuICAgIGlmIChlbGVtZW50LmNvb3JkaW5hdGVZID49IGNhbnZhcy5oZWlnaHQpIHtcbiAgICAgIGVsZW1lbnQuY29vcmRpbmF0ZVggPSBnZXRSYW5kb21OdW1iZXIod2luZG93LmlubmVyV2lkdGgpO1xuICAgICAgZWxlbWVudC5jb29yZGluYXRlWSA9IDA7XG4gICAgfVxuXG4gICAgY29udGV4dC5zYXZlKCk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBlbGVtZW50LmNvbG9yO1xuXG4gICAgZHJhd0VsZW1lbnQoY29udGV4dCwgZWxlbWVudCk7XG4gICAgY29udGV4dC5yb3RhdGUoNTApO1xuICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICB9XG5cbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3Q29uZmV0dGkuYmluZChudWxsLCBjb250ZXh0LCBjYW52YXMpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZHJhd0NvbmZldHRpO1xuIiwiaW1wb3J0IHsgZ2FtZVN0b3JhZ2UgfSBmcm9tICcuLi9pbmRleCc7XG5sZXQgZHJhZ2dlZDogSFRNTEVsZW1lbnQ7XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWdTdGFydChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIGRyYWdnZWQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLm9wYWNpdHkgPSAnMC41Jztcbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhZ0VuZChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLm9wYWNpdHkgPSAnJztcbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhZ092ZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmFnRW50ZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdzdGFydFpvbmUnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcjNzQ1NjI1JztcbiAgfVxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdlbmRab25lMScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyM3NDU2MjUnO1xuICB9XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ2VuZFpvbmUyJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnIzc0NTYyNSc7XG4gIH1cbn1cbmZ1bmN0aW9uIGhhbmRsZURyYWdMZWF2ZShldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ3N0YXJ0Wm9uZScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gIH1cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnZW5kWm9uZTEnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICB9XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ2VuZFpvbmUyJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVEcm9wKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgLy8gcHJldmVudCBkZWZhdWx0IGFjdGlvbiAob3BlbiBhcyBsaW5rIGZvciBzb21lIGVsZW1lbnRzKVxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIC8vIG1vdmUgZHJhZ2dlZCBlbGVtIHRvIHRoZSBzZWxlY3RlZCBkcm9wIHRhcmdldFxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT0gJ2VuZFpvbmUxJykge1xuICAgIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIGFsZXJ0KCdPbmx5IG9uZSBjaGFyYWN0ZXIgaXMgYWxsb3dlZC4nKTtcbiAgICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgZHJhZ2dlZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRyYWdnZWQpO1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgIGdhbWVTdG9yYWdlLnNldCgncGxheWVyMUluZGV4JywgYCR7ZHJhZ2dlZC5nZXRBdHRyaWJ1dGUoJ2tleScpfWApO1xuICB9XG5cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09ICdlbmRab25lMicpIHtcbiAgICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICBhbGVydCgnT25seSBvbmUgY2hhcmFjdGVyIGlzIGFsbG93ZWQuJyk7XG4gICAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGRyYWdnZWQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkcmFnZ2VkKTtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5hcHBlbmRDaGlsZChkcmFnZ2VkKTtcbiAgICBnYW1lU3RvcmFnZS5zZXQoJ3BsYXllcjJJbmRleCcsIGAke2RyYWdnZWQuZ2V0QXR0cmlidXRlKCdrZXknKX1gKTtcbiAgfVxuXG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PSAnc3RhcnRab25lJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICBkcmFnZ2VkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZHJhZ2dlZCk7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhZygpOiB2b2lkIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgaGFuZGxlRHJhZ1N0YXJ0KTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIGhhbmRsZURyYWdFbmQpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGhhbmRsZURyYWdPdmVyKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgaGFuZGxlRHJhZ0VudGVyKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgaGFuZGxlRHJhZ0xlYXZlKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGhhbmRsZURyb3ApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVEcmFnO1xuIiwiaW1wb3J0IHsgcGxheWVyMVNlbGVjdGlvbiwgcGxheWVyMlNlbGVjdGlvbiB9IGZyb20gJy4vdXRpbC9jb250YWluZXJzJztcbmltcG9ydCB7IGhhc1NlbGVjdGVkIH0gZnJvbSAnLi91dGlsL2hhc1NlbGVjdGVkJztcblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVNlbGVjdGlvbigpOiB2b2lkIHtcbiAgY29uc3QgaGFzUGxheWVyMVNlbGVjdGVkID0gaGFzU2VsZWN0ZWQocGxheWVyMVNlbGVjdGlvbik7XG4gIGNvbnN0IGhhc1BsYXllcjJTZWxlY3RlZCA9IGhhc1NlbGVjdGVkKHBsYXllcjJTZWxlY3Rpb24pO1xuICBpZiAoaGFzUGxheWVyMVNlbGVjdGVkICYmIGhhc1BsYXllcjJTZWxlY3RlZCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2dhbWUuaHRtbCc7XG4gIH0gZWxzZSB7XG4gICAgYWxlcnQoJ1NlbGVjdCBjaGFyYWN0ZXIgZmlyc3QsIHRoZW4gc3RhcnQgdGhlIGdhbWUnKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2FtZVN0b3JhZ2UgfSBmcm9tICcuLy4uL2luZGV4JztcbmltcG9ydCB7XG4gIHNob3dEaWNlUmVzdWx0LFxuICB1cGRhdGVQbGF5ZXIxQnV0dG9uLFxuICByb2xsRGljZSxcbiAgZGlzcGxheVBsYXllcnMsXG4gIHJlbW92ZVBsYXllcixcbiAgY2hlY2tXaW5uZXIsXG4gIGdhbWVFbmQsXG4gIHRyYXBzLFxuICBzaG93TWVzc2FnZSxcbiAgZGVsZXRlTWVzc2FnZSxcbiAgcm9sbEFnYWluTWVzc2FnZSxcbn0gZnJvbSAnLi91dGlsL2dhbWVIZWxwZXJzJztcbmltcG9ydCB7IGRpY2VDb250YWluZXIsIHBsYXllcjFCdG4sIHBsYXllcjJCdG4gfSBmcm9tICcuL3V0aWwvY29udGFpbmVycyc7XG5pbXBvcnQgeyBXaW5uZXIgYXMgV2lubmVyVHlwZXMgfSBmcm9tICcuLi9zY3JpcHRzL3Nob3dXaW5uZXInO1xuXG5mdW5jdGlvbiBwbGF5R2FtZShwbGF5ZXIxOiBudW1iZXIsIHBsYXllcjI6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBzdGFydFBvc2l0aW9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aWxlLWluZGV4LTEnKTtcbiAgY29uc3QgZmluYWxQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aWxlLWluZGV4LTMwJyk7XG5cbiAgbGV0IHBsYXllcjFTdGF0dXM6IG51bWJlciA9IDE7XG4gIGxldCBwbGF5ZXIyU3RhdHVzOiBudW1iZXIgPSAxO1xuXG4gIGRpc3BsYXlQbGF5ZXJzKHN0YXJ0UG9zaXRpb24sIHBsYXllcjEpO1xuICBkaXNwbGF5UGxheWVycyhzdGFydFBvc2l0aW9uLCBwbGF5ZXIyKTtcbiAgdXBkYXRlUGxheWVyMUJ1dHRvbih0cnVlKTtcbiAgcGxheWVyMUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1blBsYXllcjFUdXJuLCBmYWxzZSk7XG4gIHBsYXllcjJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW5QbGF5ZXIyVHVybiwgZmFsc2UpO1xuXG4gIGZ1bmN0aW9uIHJ1blBsYXllcjFUdXJuKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnREaWNlUG9pbnQgPSByb2xsRGljZSgpO1xuICAgIHNob3dEaWNlUmVzdWx0KGRpY2VDb250YWluZXIsIGN1cnJlbnREaWNlUG9pbnQsIDMwMCk7XG4gICAgcGxheWVyMVN0YXR1cyArPSBjdXJyZW50RGljZVBvaW50O1xuXG4gICAgaWYgKGNoZWNrV2lubmVyKHBsYXllcjFTdGF0dXMpKSB7XG4gICAgICBjb25zdCB3aW5uZXI6IFdpbm5lclR5cGVzID0ge1xuICAgICAgICBpbmRleDogcGxheWVyMSxcbiAgICAgICAgbmFtZTogJ1BsYXllciAxJyxcbiAgICAgIH07XG4gICAgICBnYW1lU3RvcmFnZS5zZXRTZXJpYWxpemUoJ3dpbm5lcicsIHdpbm5lcik7XG4gICAgICByZW1vdmVQbGF5ZXIocGxheWVyMSk7XG4gICAgICBkaXNwbGF5UGxheWVycyhmaW5hbFBvc2l0aW9uLCBwbGF5ZXIxKTtcbiAgICAgIGdhbWVFbmQoKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ3dpbm5lci5odG1sJztcbiAgICAgIH0sIDEwMDApO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB1cGRhdGVQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0aWxlLWluZGV4LSR7cGxheWVyMVN0YXR1c31gKTtcbiAgICAgIHJlbW92ZVBsYXllcihwbGF5ZXIxKTtcbiAgICAgIGRpc3BsYXlQbGF5ZXJzKHVwZGF0ZVBvc2l0aW9uLCBwbGF5ZXIxKTtcblxuICAgICAgdHJhcHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQudG9rZW4gPT0gcGxheWVyMVN0YXR1cykge1xuICAgICAgICAgIGNvbnN0IHsgYWN0aW9uLCBtZXNzYWdlIH0gPSBlbGVtZW50O1xuICAgICAgICAgIHBsYXllcjFTdGF0dXMgLT0gYWN0aW9uO1xuICAgICAgICAgIGNvbnN0IG5ld1Bvc2l0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRpbGUtaW5kZXgtJHtwbGF5ZXIxU3RhdHVzfWApO1xuXG4gICAgICAgICAgc2hvd01lc3NhZ2UoYCR7bWVzc2FnZX1gKTtcbiAgICAgICAgICBkZWxldGVNZXNzYWdlKCk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjEpO1xuICAgICAgICAgICAgZGlzcGxheVBsYXllcnMobmV3UG9zaXRpb24sIHBsYXllcjEpO1xuICAgICAgICAgIH0sIDMwMDApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdXBkYXRlUGxheWVyMUJ1dHRvbihmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKGN1cnJlbnREaWNlUG9pbnQgPT09IDYpIHtcbiAgICAgIHNob3dNZXNzYWdlKGAke3JvbGxBZ2Fpbk1lc3NhZ2V9YCk7XG4gICAgICBkZWxldGVNZXNzYWdlKCk7XG4gICAgICB1cGRhdGVQbGF5ZXIxQnV0dG9uKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1blBsYXllcjJUdXJuKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnREaWNlUG9pbnQgPSByb2xsRGljZSgpO1xuICAgIHNob3dEaWNlUmVzdWx0KGRpY2VDb250YWluZXIsIGN1cnJlbnREaWNlUG9pbnQsIDMwMCk7XG4gICAgcGxheWVyMlN0YXR1cyArPSBjdXJyZW50RGljZVBvaW50O1xuXG4gICAgaWYgKGNoZWNrV2lubmVyKHBsYXllcjJTdGF0dXMpKSB7XG4gICAgICBjb25zdCB3aW5uZXI6IFdpbm5lclR5cGVzID0ge1xuICAgICAgICBpbmRleDogcGxheWVyMixcbiAgICAgICAgbmFtZTogJ1BsYXllciAyJyxcbiAgICAgIH07XG4gICAgICBnYW1lU3RvcmFnZS5zZXRTZXJpYWxpemUoJ3dpbm5lcicsIHdpbm5lcik7XG4gICAgICByZW1vdmVQbGF5ZXIocGxheWVyMik7XG4gICAgICBkaXNwbGF5UGxheWVycyhmaW5hbFBvc2l0aW9uLCBwbGF5ZXIyKTtcbiAgICAgIGdhbWVFbmQoKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ3dpbm5lci5odG1sJztcbiAgICAgIH0sIDEwMDApO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB1cGRhdGVQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0aWxlLWluZGV4LSR7cGxheWVyMlN0YXR1c31gKTtcbiAgICAgIHJlbW92ZVBsYXllcihwbGF5ZXIyKTtcbiAgICAgIGRpc3BsYXlQbGF5ZXJzKHVwZGF0ZVBvc2l0aW9uLCBwbGF5ZXIyKTtcblxuICAgICAgdHJhcHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQudG9rZW4gPT0gcGxheWVyMlN0YXR1cykge1xuICAgICAgICAgIGNvbnN0IHsgYWN0aW9uLCBtZXNzYWdlIH0gPSBlbGVtZW50O1xuICAgICAgICAgIHBsYXllcjJTdGF0dXMgLT0gYWN0aW9uO1xuICAgICAgICAgIGNvbnN0IG5ld1Bvc2l0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRpbGUtaW5kZXgtJHtwbGF5ZXIyU3RhdHVzfWApO1xuXG4gICAgICAgICAgc2hvd01lc3NhZ2UoYCR7bWVzc2FnZX1gKTtcbiAgICAgICAgICBkZWxldGVNZXNzYWdlKCk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjIpO1xuICAgICAgICAgICAgZGlzcGxheVBsYXllcnMobmV3UG9zaXRpb24sIHBsYXllcjIpO1xuICAgICAgICAgIH0sIDMwMDApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdXBkYXRlUGxheWVyMUJ1dHRvbih0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudERpY2VQb2ludCA9PT0gNikge1xuICAgICAgc2hvd01lc3NhZ2UoYCR7cm9sbEFnYWluTWVzc2FnZX1gKTtcbiAgICAgIGRlbGV0ZU1lc3NhZ2UoKTtcbiAgICAgIHVwZGF0ZVBsYXllcjFCdXR0b24oZmFsc2UpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwbGF5R2FtZTtcbiIsImltcG9ydCB7IGNoYXJhY3Rlckxpc3QgfSBmcm9tICcuL3V0aWwvY29udGFpbmVycyc7XG5pbXBvcnQgeyBSZXNwb25zZU9ialR5cGVzIH0gZnJvbSAnLi91dGlsL3R5cGVzJztcbmltcG9ydCBjcmVhdGVJbWFnZSBmcm9tICcuL3V0aWwvY3JlYXRlSW1hZ2UnO1xuXG5jb25zdCBCQVNFX1VSTDogc3RyaW5nID0gJ2h0dHBzOi8vd3d3LmFuYXBpb2ZpY2VhbmRmaXJlLmNvbS9hcGkvY2hhcmFjdGVycy8nO1xuXG5mdW5jdGlvbiBnZXRDaGFyYWN0ZXJDYXJkcyhjaGFyYWN0ZXJJbmRleDogbnVtYmVyW10pOiB2b2lkIHtcbiAgY2hhcmFjdGVySW5kZXgubWFwKGVsZW1lbnQgPT4ge1xuICAgIHNob3dDaGFyYWN0ZXIoZWxlbWVudCk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzaG93Q2hhcmFjdGVyKGNoYXJhY3Rlck5hbWVJbmRleDogbnVtYmVyKSB7XG4gIGNvbnN0IHVybCA9IGAke0JBU0VfVVJMfSR7Y2hhcmFjdGVyTmFtZUluZGV4fWA7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgY29uc3QgZGF0YTogUmVzcG9uc2VPYmpUeXBlcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zdCB7IG5hbWUsIHRpdGxlcyB9ID0gZGF0YTtcbiAgICBjb25zdCBwbGFjZUhvbGRlciA9ICdIdW1ibGUgTWFuIFdpdGhvdXQgaXRsZSc7XG5cbiAgICBjb25zdCBjb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21wb25lbnQuY2xhc3NOYW1lID0gJ3Jvd19faXRlbS0tY2FyZCc7XG4gICAgY29tcG9uZW50LnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcbiAgICBjb21wb25lbnQuc2V0QXR0cmlidXRlKCdrZXknLCBgJHtjaGFyYWN0ZXJOYW1lSW5kZXh9YCk7XG4gICAgY29uc3QgY2FyZEltYWdlID0gYDxpbWcgZHJhZ2dhYmxlPVwiZmFsc2VcIiBzcmM9JHtjcmVhdGVJbWFnZShcbiAgICAgIGNoYXJhY3Rlck5hbWVJbmRleCxcbiAgICApfSBjbGFzcz1cIml0ZW0tLWNhcmQtaW1hZ2VcIiBhbHQ9XCJHYW1lIGZpZ3VyZSBuby4ke2NoYXJhY3Rlck5hbWVJbmRleH1cIj5gO1xuICAgIGNvbnN0IGNhcmRUaXRsZSA9IGAgPGgzPiR7bmFtZX08L2gzPmA7XG4gICAgY29uc3QgY2FyZFN1YlRpdGxlID0gYDxzcGFuPiR7dGl0bGVzWzBdID8gdGl0bGVzWzBdIDogcGxhY2VIb2xkZXJ9PC9zcGFuPmA7XG4gICAgY29tcG9uZW50LmlubmVySFRNTCA9IGNhcmRJbWFnZSArIGNhcmRUaXRsZSArIGNhcmRTdWJUaXRsZTtcblxuICAgIGNoYXJhY3Rlckxpc3QuYXBwZW5kKGNvbXBvbmVudCk7XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhyb3cgZXJyO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldENoYXJhY3RlckNhcmRzO1xuIiwiaW1wb3J0IHsgY29uZ3JhdHVsYXRpb25NZXNzYWdlLCB3aW5uZXJDb250YWluZXIgfSBmcm9tICcuL3V0aWwvY29udGFpbmVycyc7XG5pbXBvcnQgY3JlYXRlSW1hZ2UgZnJvbSAnLi91dGlsL2NyZWF0ZUltYWdlJztcblxuZXhwb3J0IGludGVyZmFjZSBXaW5uZXIge1xuICBpbmRleDogbnVtYmVyO1xuICBuYW1lOiBzdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHNob3dXaW5uZXIoeyBpbmRleCwgbmFtZSB9OiBXaW5uZXIpOiB2b2lkIHtcbiAgaWYgKHdpbm5lckNvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgY29uc3Qgd2lubmVySW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICB3aW5uZXJJbWFnZS5jbGFzc05hbWUgPSAnaXRlbSBpdGVtLS13aW5uZXItaW1hZ2UnO1xuICAgIHdpbm5lckltYWdlLnNyYyA9IGAke2NyZWF0ZUltYWdlKGluZGV4KX1gO1xuICAgIHdpbm5lckltYWdlLmFsdCA9ICdGZWF0dXJlZCBpbWFnZSBmb3IgdGhlIHdpbm5lcic7XG4gICAgd2lubmVyQ29udGFpbmVyLmFwcGVuZENoaWxkKHdpbm5lckltYWdlKTtcbiAgfVxuXG4gIGlmIChjb25ncmF0dWxhdGlvbk1lc3NhZ2UgIT0gbnVsbCkge1xuICAgIGNvbmdyYXR1bGF0aW9uTWVzc2FnZS5pbm5lclRleHQgPSBgJHtuYW1lfSBjbGFpbWVkIHRoZSBjcm93biFgO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNob3dXaW5uZXI7XG4iLCJjb25zdCBzYW13ZWxsOiBudW1iZXIgPSA5NTQ7XG5jb25zdCBqb246IG51bWJlciA9IDU4MztcbmNvbnN0IGNlcnNlaTogbnVtYmVyID0gMjM4O1xuY29uc3QgdHlyaW9uOiBudW1iZXIgPSAxMDUyO1xuY29uc3QgZGFlbmVyeXM6IG51bWJlciA9IDI3MTtcbmNvbnN0IHNhbnNhOiBudW1iZXIgPSA5NTc7XG5jb25zdCB2YXJ5czogbnVtYmVyID0gMjA2OTtcbmNvbnN0IGJlcmljOiBudW1iZXIgPSAxOTA7XG5jb25zdCBqb3lldXNlOiBudW1iZXIgPSA2MDA7XG5jb25zdCBtYWx3eW46IG51bWJlciA9IDcwMDtcbmNvbnN0IG1lcnJlbGw6IG51bWJlciA9IDc1MDtcbmNvbnN0IGFlbW9uOiBudW1iZXIgPSA1MDtcblxuY29uc3QgY2hhcmFjdGVySW5kZXg6IG51bWJlcltdID0gW1xuICBzYW13ZWxsLFxuICBqb24sXG4gIGNlcnNlaSxcbiAgdHlyaW9uLFxuICBkYWVuZXJ5cyxcbiAgc2Fuc2EsXG4gIHZhcnlzLFxuICBiZXJpYyxcbiAgam95ZXVzZSxcbiAgbWFsd3luLFxuICBtZXJyZWxsLFxuICBhZW1vbixcbl07XG5leHBvcnQgZGVmYXVsdCBjaGFyYWN0ZXJJbmRleDtcbiIsIi8vcGFnZTpzZWxlY3QtcGxheWVyXG5leHBvcnQgY29uc3QgY2hhcmFjdGVyTGlzdDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnRab25lJyk7XG5leHBvcnQgY29uc3QgcGxheWVyMVNlbGVjdGlvbjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kWm9uZTEnKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXIyU2VsZWN0aW9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmRab25lMicpO1xuZXhwb3J0IGNvbnN0IHZhbGlkYXRlU2VsZWN0aW9uQnRuOiBIVE1MQW5jaG9yRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdGEtLXZhbGlkYXRpb24nKTtcblxuLy9wYWdlOmdhbWVcbmV4cG9ydCBjb25zdCBib2FyZDogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZUJvYXJkJyk7XG5leHBvcnQgY29uc3QgZGljZUNvbnRhaW5lcjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGljZUltYWdlJyk7XG5leHBvcnQgY29uc3QgcGxheWVyMUJ0bjogSFRNTEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLS1QbGF5ZXIxJyk7XG5leHBvcnQgY29uc3QgcGxheWVyMkJ0bjogSFRNTEJ1dHRvbkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLS1QbGF5ZXIyJyk7XG5leHBvcnQgY29uc3Qgb3ZlcmxheTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheScpO1xuZXhwb3J0IGNvbnN0IG1lc3NhZ2U6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2UnKTtcblxuLy9wYWdlOndpbm5lclxuZXhwb3J0IGNvbnN0IHdpbm5lckNvbnRhaW5lcjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2lubmVyJyk7XG5leHBvcnQgY29uc3QgY29uZ3JhdHVsYXRpb25NZXNzYWdlOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb25ncmF0dWxhdGlvbicpO1xuZXhwb3J0IGNvbnN0IHJlc2V0QnRuOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldCcpO1xuZXhwb3J0IGNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuIiwiZnVuY3Rpb24gY3JlYXRlSW1hZ2UoaW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBgaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZG5rZmdtenkxL2ltYWdlL3VwbG9hZC92MTU3NTU0OTY3NC9nYW1lLyR7aW5kZXh9LnBuZ2A7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUltYWdlO1xuIiwiZXhwb3J0IGNvbnN0IGRpY2VJY29ucyA9IHtcbiAgcG9pbnQxOlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzek0yNTYgMjA2YTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwelwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQyOlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptMzE2Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bS0yNjggMjY4QTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDM6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem0zMTYuOTcgMzYuMDNBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pNMjU2IDIwNmE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHpNMTIzLjQ3IDM0MC4wM0E1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQ0OlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptNDguOTcgMzYuMDNBNTAgNTAgMCAwIDEgMTcyIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptLTI2OCAyNjhBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50NTpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTQ4Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDE3MiAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6TTI1NiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6TTEyMy40NyAzNDAuMDNBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50NjpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTQ4Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDE3MiAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6TTEyMiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6bTI2OCAwYTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwek0xMjMuNDcgMzQwLjAzQTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxufTtcblxuZXhwb3J0IGNvbnN0IGRpY2VBcnJheTogc3RyaW5nW10gPSBbXG4gIGRpY2VJY29ucy5wb2ludDEsXG4gIGRpY2VJY29ucy5wb2ludDIsXG4gIGRpY2VJY29ucy5wb2ludDMsXG4gIGRpY2VJY29ucy5wb2ludDQsXG4gIGRpY2VJY29ucy5wb2ludDUsXG4gIGRpY2VJY29ucy5wb2ludDYsXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGljZUljb24oZGljZVBvaW50OiBudW1iZXIpOiBzdHJpbmcge1xuICByZXR1cm4gZGljZUFycmF5W2RpY2VQb2ludCAtIDFdO1xufVxuIiwiaW1wb3J0IHsgcGxheWVyMUJ0biwgcGxheWVyMkJ0biwgb3ZlcmxheSwgbWVzc2FnZSB9IGZyb20gJy4vY29udGFpbmVycyc7XG5pbXBvcnQgeyBkaWNlQXJyYXkgfSBmcm9tICcuL2RpY2UnO1xuaW1wb3J0IGNyZWF0ZUltYWdlIGZyb20gJy4vY3JlYXRlSW1hZ2UnO1xuXG5pbnRlcmZhY2UgdHJhcCB7XG4gIHRva2VuOiBudW1iZXI7XG4gIGFjdGlvbjogbnVtYmVyO1xuICBtZXNzYWdlOiBzdHJpbmc7XG59XG5cbmNvbnN0IHRyYXAxOiB0cmFwID0ge1xuICB0b2tlbjogOCxcbiAgYWN0aW9uOiAxLFxuICBtZXNzYWdlOiAnUGlyYXRlcyBhaGVhZCEgUmV0cmVhdCBvbmUgZmllbGQgdG8gYXZvaWQgYmVpbmcgbm90aWNlZC4nLFxufTtcbmNvbnN0IHRyYXAyOiB0cmFwID0ge1xuICB0b2tlbjogMTQsXG4gIGFjdGlvbjogMixcbiAgbWVzc2FnZTogJ0Egd29sZiBlbWVyZ2VzIGZyb20gdGhlIG5pZ2h0IHdvb2RzLiBSZXRyZWF0IHR3byBmaWVsZHMuJyxcbn07XG5jb25zdCB0cmFwMzogdHJhcCA9IHtcbiAgdG9rZW46IDE4LFxuICBhY3Rpb246IDMsXG4gIG1lc3NhZ2U6ICdBIHdoaXRlIHdhbGtlciEgUmV0cmVhdCB0aHJlZSBmaWVsZHMgdG8gZXNjYXBlIGRlYXRoLicsXG59O1xuY29uc3QgdHJhcDQ6IHRyYXAgPSB7XG4gIHRva2VuOiAyNCxcbiAgYWN0aW9uOiA0LFxuICBtZXNzYWdlOiAnRW5lbXkgaG9yc2VtZW4gb24gdGhlIGhvcml6b24hIFlvdSBtdXN0IHJldHJlYXQgZm91ciBmaWVsZHMuJyxcbn07XG5jb25zdCB0cmFwNTogdHJhcCA9IHtcbiAgdG9rZW46IDI4LFxuICBhY3Rpb246IDUsXG4gIG1lc3NhZ2U6ICdEcmFnb25zISBSZXRyZWF0IGZpdmUgZmllbGRzIHRvIGVzY2FwZSB0aGVpciBmaXJlLWJyZWF0aC4nLFxufTtcblxuZXhwb3J0IGNvbnN0IHJvbGxBZ2Fpbk1lc3NhZ2U6IHN0cmluZyA9ICdZb3Ugcm9sbGVkIGEgNiBhbmQgZ2V0IGFub3RoZXIgdHVybi4gUm9sbCBhZ2FpbiEnO1xuXG5leHBvcnQgY29uc3QgdHJhcHM6IHRyYXBbXSA9IFt0cmFwMSwgdHJhcDIsIHRyYXAzLCB0cmFwNCwgdHJhcDVdO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQm9hcmQoY29udGFpbmVyOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICBmb3IgKGxldCBpOiBudW1iZXIgPSAxOyBpIDw9IDMwOyBpKyspIHtcbiAgICBjb25zdCB0aWxlOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRpbGUuY2xhc3NOYW1lID0gYGJvYXJkX190aWxlYDtcbiAgICB0aWxlLnNldEF0dHJpYnV0ZSgnaWQnLCBgdGlsZS1pbmRleC0ke2l9YCk7XG4gICAgdGlsZS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9J3RpbGVfX251bWJlcic+JHtpfTwvc3Bhbj5gO1xuXG4gICAgaWYgKGkgJSAyICE9PSAwKSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdicm93bic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICB9XG5cbiAgICB0cmFwcy5tYXAoZWxlbWVudCA9PiB7XG4gICAgICBpZiAoZWxlbWVudC50b2tlbiA9PT0gaSkge1xuICAgICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnO1xuICAgICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJ2h0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2Rua2ZnbXp5MS9pbWFnZS91cGxvYWQvdjE1NzU2NTU3MzQvZ2FtZS90cmFwJHtlbGVtZW50LmFjdGlvbn0uc3ZnJylgO1xuICAgICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRTaXplID0gJzRyZW0nO1xuICAgICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSAnbm8tcmVwZWF0JztcbiAgICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSAnY2VudGVyIGNlbnRlcic7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoaSA9PSAzMCkge1xuICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCdodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kbmtmZ216eTEvaW1hZ2UvdXBsb2FkL3YxNTc1NjU1NTUzL2dhbWUvdGhyb25lLnN2ZycpYDtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnNHJlbSc7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSAnbm8tcmVwZWF0JztcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlciBjZW50ZXInO1xuICAgIH1cblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aWxlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUGxheWVyMUJ1dHRvbihpc1BsYXllcjFUdXJuOiBib29sZWFuKTogdm9pZCB7XG4gIGlmIChpc1BsYXllcjFUdXJuKSB7XG4gICAgcGxheWVyMUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHBsYXllcjJCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHBsYXllcjFCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIHBsYXllcjJCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0RpY2VSZXN1bHQoY29udGFpbmVyOiBIVE1MRWxlbWVudCwgcG9pbnQ6IG51bWJlciwgZGVsYXk/OiBudW1iZXIpOiB2b2lkIHtcbiAgY29udGFpbmVyLmlubmVySFRNTCA9IGRpY2VBcnJheVtwb2ludCAtIDFdO1xuICBjb250YWluZXIuY2xhc3NOYW1lICs9ICcgaXRlbS0tc2hha2UnO1xuXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2l0ZW0tLXNoYWtlJyk7XG4gIH0sIGRlbGF5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvbGxEaWNlKCk6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KSArIDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVQbGF5ZXIocGxheWVyOiBudW1iZXIpOiB2b2lkIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGZpZ3VyZS0ke3BsYXllcn1gKS5yZW1vdmUoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlQbGF5ZXJzKGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsIHBsYXllckluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3QgcGxheWVyOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgcGxheWVyLnNyYyA9IGAke2NyZWF0ZUltYWdlKHBsYXllckluZGV4KX1gO1xuXG4gIHBsYXllci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2JvYXJkX19maWd1cmUnKTtcblxuICBwbGF5ZXIuc2V0QXR0cmlidXRlKCdhbHQnLCBgR2FtZSBmaWd1cmUgbm8uJHtwbGF5ZXJJbmRleH1gKTtcblxuICBwbGF5ZXIuc2V0QXR0cmlidXRlKCdpZCcsIGBmaWd1cmUtJHtwbGF5ZXJJbmRleH1gKTtcblxuICBpZiAoY29udGFpbmVyICE9IG51bGwpIHtcbiAgICBjb250YWluZXIuYXBwZW5kKHBsYXllcik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrV2lubmVyKHBsYXllclN0YXR1czogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBwbGF5ZXJTdGF0dXMgPj0gMzAgPyB0cnVlIDogZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lRW5kKCk6IHZvaWQge1xuICBwbGF5ZXIxQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgcGxheWVyMkJ0bi5kaXNhYmxlZCA9IHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93TWVzc2FnZShjb250ZW50OiBzdHJpbmcpOiB2b2lkIHtcbiAgbWVzc2FnZS5pbm5lclRleHQgPSBjb250ZW50O1xuICBvdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVNZXNzYWdlKCk6IHZvaWQge1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIG92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfSwgMTUwMCk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tTnVtYmVyKG1heE51bTogbnVtYmVyKTpudW1iZXIge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4TnVtKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBoYXNTZWxlY3RlZChjb250YWluZXI6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gIHJldHVybiBjb250YWluZXIuaGFzQ2hpbGROb2RlcygpO1xufVxuIiwiY2xhc3MgU3RvcmFnZSB7XG4gIHByaXZhdGUgc3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG5cbiAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gIH1cblxuICBnZXQoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICB9XG5cbiAgZGVsZXRlKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfVxuXG4gIHNldFNlcmlhbGl6ZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuc2V0KGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgfVxuXG4gIGdldFVuc2VyaWFsaXplPFQ+KGtleTogc3RyaW5nKTogVCB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0KGtleSk7XG5cbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpIGFzIFQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RvcmFnZTtcbiJdfQ==
