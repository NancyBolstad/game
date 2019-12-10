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
        var confetti_1 = require('./scripts/confetti');
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
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (canvas != null && context != null) {
          confetti_1.default(context, canvas);
        }
      },
      {
        './scripts/confetti': 2,
        './scripts/handleDrag': 3,
        './scripts/handleSelection': 4,
        './scripts/playGame': 5,
        './scripts/showCharacter': 6,
        './scripts/showWinner': 7,
        './scripts/util/characterIndex': 8,
        './scripts/util/containers': 9,
        './scripts/util/gameHelpers': 12,
        './scripts/util/storage': 14,
      },
    ],
    2: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var circleElement = function() {
          return {
            coordinateX: getRandomNumber(window.innerWidth),
            coordinateY: getRandomNumber(window.innerHeight),
            speed: getRandomNumber(5) + 100,
            color: getRandomColor(),
          };
        };
        function getRandomNumber(maxNum) {
          return Math.floor(Math.random() * maxNum);
        }
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
          var colors = ['#FF0000', '#FFFF00', '#00FF00', '#80FFFF', '#', '#FF00FF'];
          return colors[getRandomNumber(colors.length)];
        }
        function clearCanvas(context, canvas) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
        function drawConfetti(context, canvas) {
          clearCanvas(context, canvas);
          var elements = [];
          var amount = 10;
          for (var i = 0; i < amount; i++) {
            elements.push(circleElement());
          }
          for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            if (element.coordinateY >= canvas.height) {
              element.coordinateX = getRandomNumber(window.innerWidth);
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
      { './util/containers': 9, './util/hasSelected': 13 },
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
              gameHelpers_1.showMessage(
                'Since you rolled 6, you got a Bonus movement. Roll the dice again',
              );
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
                    message = element.message;
                  player2Status -= action;
                  var newPosition_2 = document.getElementById('tile-index-' + player2Status);
                  console.log(newPosition_2);
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
              gameHelpers_1.showMessage(
                'Since you rolled 6, you got a Bonus movement. Roll the dice again',
              );
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
        function gameEnd(winner) {
          containers_1.player1Btn.disabled = true;
          containers_1.player2Btn.disabled = true;
        }
        exports.gameEnd = gameEnd;
        function showMessage(content) {
          containers_1.message.innerText = content;
          containers_1.overlay.style.visibility = 'visible';
        }
        exports.showMessage = showMessage;
        function deleteMessage() {
          setTimeout(function() {
            containers_1.overlay.style.visibility = 'hidden';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXgudHMiLCJzcmMvc2NyaXB0cy9jb25mZXR0aS50cyIsInNyYy9zY3JpcHRzL2hhbmRsZURyYWcudHMiLCJzcmMvc2NyaXB0cy9oYW5kbGVTZWxlY3Rpb24udHMiLCJzcmMvc2NyaXB0cy9wbGF5R2FtZS50cyIsInNyYy9zY3JpcHRzL3Nob3dDaGFyYWN0ZXIudHMiLCJzcmMvc2NyaXB0cy9zaG93V2lubmVyLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9jaGFyYWN0ZXJJbmRleC50cyIsInNyYy9zY3JpcHRzL3V0aWwvY29udGFpbmVycy50cyIsInNyYy9zY3JpcHRzL3V0aWwvY3JlYXRlSW1hZ2UudHMiLCJzcmMvc2NyaXB0cy91dGlsL2RpY2UudHMiLCJzcmMvc2NyaXB0cy91dGlsL2dhbWVIZWxwZXJzLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9oYXNTZWxlY3RlZC50cyIsInNyYy9zY3JpcHRzL3V0aWwvc3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsbURBQThDO0FBQzlDLDZEQUE0RDtBQUM1RCwrQ0FBMEM7QUFDMUMseURBQXdEO0FBQ3hELG1EQUF3RTtBQUN4RSxnRUFBMkQ7QUFDM0Qsd0RBT21DO0FBQ25DLDBEQUFtRjtBQUNuRixrREFBNkM7QUFDN0MsK0NBQThDO0FBRWpDLFFBQUEsV0FBVyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO0FBRXpDLElBQUksMEJBQWEsSUFBSSxJQUFJLEVBQUU7SUFDekIsdUJBQWlCLENBQUMsd0JBQWMsQ0FBQyxDQUFDO0lBQ2xDLG9CQUFVLEVBQUUsQ0FBQztJQUNiLElBQUksaUNBQW9CLElBQUksSUFBSTtRQUM5QixpQ0FBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsaUNBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUMxRTtBQUVELElBQUksa0JBQUssSUFBSSxJQUFJLElBQUks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QUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsZ0NBQWMsR0FBZCxVQUFrQixHQUFXO1FBQzNCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFM0IsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFNLENBQUM7SUFDL0IsQ0FBQztJQUNILGNBQUM7QUFBRCxDQTVCQSxBQTRCQyxJQUFBO0FBRUQsa0JBQWUsT0FBTyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IGhhbmRsZURyYWcgZnJvbSAnLi9zY3JpcHRzL2hhbmRsZURyYWcnO1xuaW1wb3J0IHsgaGFuZGxlU2VsZWN0aW9uIH0gZnJvbSAnLi9zY3JpcHRzL2hhbmRsZVNlbGVjdGlvbic7XG5pbXBvcnQgcGxheUdhbWUgZnJvbSAnLi9zY3JpcHRzL3BsYXlHYW1lJztcbmltcG9ydCBnZXRDaGFyYWN0ZXJDYXJkcyBmcm9tICcuL3NjcmlwdHMvc2hvd0NoYXJhY3Rlcic7XG5pbXBvcnQgc2hvd1dpbm5lciwgeyBXaW5uZXIgYXMgV2lubmVyVHlwZSB9IGZyb20gJy4vc2NyaXB0cy9zaG93V2lubmVyJztcbmltcG9ydCBjaGFyYWN0ZXJJbmRleCBmcm9tICcuL3NjcmlwdHMvdXRpbC9jaGFyYWN0ZXJJbmRleCc7XG5pbXBvcnQge1xuICBib2FyZCxcbiAgY2hhcmFjdGVyTGlzdCxcbiAgZGljZUNvbnRhaW5lcixcbiAgcmVzZXRCdG4sXG4gIHZhbGlkYXRlU2VsZWN0aW9uQnRuLFxuICB3aW5uZXJDb250YWluZXIsXG59IGZyb20gJy4vc2NyaXB0cy91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IHsgY3JlYXRlQm9hcmQsIHJvbGxEaWNlLCBzaG93RGljZVJlc3VsdCB9IGZyb20gJy4vc2NyaXB0cy91dGlsL2dhbWVIZWxwZXJzJztcbmltcG9ydCBTdG9yYWdlIGZyb20gJy4vc2NyaXB0cy91dGlsL3N0b3JhZ2UnO1xuaW1wb3J0IGRyYXdDb25mZXR0aSBmcm9tICcuL3NjcmlwdHMvY29uZmV0dGknO1xuXG5leHBvcnQgY29uc3QgZ2FtZVN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpO1xuXG5pZiAoY2hhcmFjdGVyTGlzdCAhPSBudWxsKSB7XG4gIGdldENoYXJhY3RlckNhcmRzKGNoYXJhY3RlckluZGV4KTtcbiAgaGFuZGxlRHJhZygpO1xuICBpZiAodmFsaWRhdGVTZWxlY3Rpb25CdG4gIT0gbnVsbClcbiAgICB2YWxpZGF0ZVNlbGVjdGlvbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVNlbGVjdGlvbiwgZmFsc2UpO1xufVxuXG5pZiAoYm9hcmQgIT0gbnVsbCAmJiBkaWNlQ29udGFpbmVyICE9IG51bGwpIHtcbiAgY29uc3QgcGxheWVyMTogbnVtYmVyID0gZ2FtZVN0b3JhZ2UuZ2V0VW5zZXJpYWxpemUoJ3BsYXllcjFJbmRleCcpO1xuICBjb25zdCBwbGF5ZXIyOiBudW1iZXIgPSBnYW1lU3RvcmFnZS5nZXRVbnNlcmlhbGl6ZSgncGxheWVyMkluZGV4Jyk7XG4gIGNyZWF0ZUJvYXJkKGJvYXJkKTtcbiAgc2hvd0RpY2VSZXN1bHQoZGljZUNvbnRhaW5lciwgcm9sbERpY2UoKSk7XG5cbiAgaWYgKHBsYXllcjEgJiYgcGxheWVyMikge1xuICAgIHBsYXlHYW1lKHBsYXllcjEsIHBsYXllcjIpO1xuICB9XG59XG5cbmlmICh3aW5uZXJDb250YWluZXIgIT0gbnVsbCkge1xuICBjb25zdCB3aW5uZXI6IFdpbm5lclR5cGUgPSBnYW1lU3RvcmFnZS5nZXRVbnNlcmlhbGl6ZSgnd2lubmVyJyk7XG4gIGNvbnNvbGUubG9nKHdpbm5lcik7XG4gIHNob3dXaW5uZXIod2lubmVyKTtcbn1cblxuaWYgKHJlc2V0QnRuICE9IG51bGwpIHtcbiAgcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAnY2xpY2snLFxuICAgIGZ1bmN0aW9uKCkge1xuICAgICAgZ2FtZVN0b3JhZ2UuZGVsZXRlKCdwbGF5ZXIxSW5kZXgnKTtcbiAgICAgIGdhbWVTdG9yYWdlLmRlbGV0ZSgncGxheWVyMkluZGV4Jyk7XG4gICAgICBnYW1lU3RvcmFnZS5kZWxldGUoJ3dpbm5lcicpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnc2VsZWN0Lmh0bWwnO1xuICAgIH0sXG4gICAgZmFsc2UsXG4gICk7XG59XG5cbmNvbnN0IGNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG5jb25zdCBjb250ZXh0ID0gPENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRD5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuaWYgKGNhbnZhcyAhPSBudWxsICYmIGNvbnRleHQgIT0gbnVsbCkge1xuICBkcmF3Q29uZmV0dGkoY29udGV4dCwgY2FudmFzKTtcbn1cbiIsImludGVyZmFjZSBQYXJ0aWNsZXNDb25maWcge1xuICBjb29yZGluYXRlWDogbnVtYmVyO1xuICBjb29yZGluYXRlWTogbnVtYmVyO1xuICBjb2xvcjogc3RyaW5nO1xuICBzcGVlZDogbnVtYmVyO1xufVxuXG5jb25zdCBjaXJjbGVFbGVtZW50ID0gKCk6IFBhcnRpY2xlc0NvbmZpZyA9PiAoe1xuICBjb29yZGluYXRlWDogZ2V0UmFuZG9tTnVtYmVyKHdpbmRvdy5pbm5lcldpZHRoKSxcbiAgY29vcmRpbmF0ZVk6IGdldFJhbmRvbU51bWJlcih3aW5kb3cuaW5uZXJIZWlnaHQpLFxuICBzcGVlZDogZ2V0UmFuZG9tTnVtYmVyKDUpICsgMTAwLFxuICBjb2xvcjogZ2V0UmFuZG9tQ29sb3IoKSxcbn0pO1xuXG5mdW5jdGlvbiBnZXRSYW5kb21OdW1iZXIobWF4TnVtOiBudW1iZXIpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heE51bSk7XG59XG5cbmZ1bmN0aW9uIGRyYXdFbGVtZW50KGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgZWxlbWVudDogUGFydGljbGVzQ29uZmlnKSB7XG4gIGNvbnN0IHsgY29vcmRpbmF0ZVgsIGNvb3JkaW5hdGVZLCBjb2xvciB9ID0gZWxlbWVudDtcbiAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgY29udGV4dC5tb3ZlVG8oY29vcmRpbmF0ZVgsIGNvb3JkaW5hdGVZKTtcbiAgY29udGV4dC5saW5lVG8oY29vcmRpbmF0ZVggKyA1LCBjb29yZGluYXRlWSArIDEwKTtcbiAgY29udGV4dC5saW5lV2lkdGggPSA1O1xuICBjb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gIGNvbnRleHQuc3Ryb2tlKCk7XG59XG5cbmZ1bmN0aW9uIGdldFJhbmRvbUNvbG9yKCkge1xuICBjb25zdCBjb2xvcnM6IHN0cmluZ1tdID0gW1xuICAgICcjRkYwMDAwJyxcbiAgICAnI0ZGRkYwMCcsXG4gICAgJyMwMEZGMDAnLFxuICAgICcjODBGRkZGJyxcbiAgICAnIycsXG4gICAgJyNGRjAwRkYnLFxuICBdO1xuXG4gIHJldHVybiBjb2xvcnNbZ2V0UmFuZG9tTnVtYmVyKGNvbG9ycy5sZW5ndGgpXTtcbn1cblxuZnVuY3Rpb24gY2xlYXJDYW52YXMoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG59XG5cbmZ1bmN0aW9uIGRyYXdDb25mZXR0aShjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgY2xlYXJDYW52YXMoY29udGV4dCwgY2FudmFzKTtcblxuICBjb25zdCBlbGVtZW50czogUGFydGljbGVzQ29uZmlnW10gPSBbXTtcbiAgY29uc3QgYW1vdW50ID0gMTA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbW91bnQ7IGkrKykge1xuICAgIGVsZW1lbnRzLnB1c2goY2lyY2xlRWxlbWVudCgpKTtcbiAgfVxuXG4gIGZvciAoY29uc3QgZWxlbWVudCBvZiBlbGVtZW50cykge1xuICAgIGlmIChlbGVtZW50LmNvb3JkaW5hdGVZID49IGNhbnZhcy5oZWlnaHQpIHtcbiAgICAgIGVsZW1lbnQuY29vcmRpbmF0ZVggPSBnZXRSYW5kb21OdW1iZXIod2luZG93LmlubmVyV2lkdGgpO1xuICAgICAgZWxlbWVudC5jb29yZGluYXRlWSA9IDA7XG4gICAgfVxuXG4gICAgY29udGV4dC5zYXZlKCk7XG4gICAgY29udGV4dC5maWxsU3R5bGUgPSBlbGVtZW50LmNvbG9yO1xuXG4gICAgZHJhd0VsZW1lbnQoY29udGV4dCwgZWxlbWVudCk7XG4gICAgY29udGV4dC5yb3RhdGUoNTApO1xuICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICB9XG5cbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3Q29uZmV0dGkuYmluZChudWxsLCBjb250ZXh0LCBjYW52YXMpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZHJhd0NvbmZldHRpO1xuIiwiaW1wb3J0IHsgZ2FtZVN0b3JhZ2UgfSBmcm9tICcuLi9pbmRleCc7XG5sZXQgZHJhZ2dlZDogSFRNTEVsZW1lbnQ7XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWdTdGFydChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIGRyYWdnZWQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLm9wYWNpdHkgPSAnMC41Jztcbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhZ0VuZChldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLm9wYWNpdHkgPSAnJztcbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhZ092ZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmFnRW50ZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdzdGFydFpvbmUnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcjNzQ1NjI1JztcbiAgfVxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdlbmRab25lMScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyM3NDU2MjUnO1xuICB9XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ2VuZFpvbmUyJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnIzc0NTYyNSc7XG4gIH1cbn1cbmZ1bmN0aW9uIGhhbmRsZURyYWdMZWF2ZShldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ3N0YXJ0Wm9uZScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gIH1cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnZW5kWm9uZTEnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICB9XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ2VuZFpvbmUyJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVEcm9wKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgLy8gcHJldmVudCBkZWZhdWx0IGFjdGlvbiAob3BlbiBhcyBsaW5rIGZvciBzb21lIGVsZW1lbnRzKVxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIC8vIG1vdmUgZHJhZ2dlZCBlbGVtIHRvIHRoZSBzZWxlY3RlZCBkcm9wIHRhcmdldFxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT0gJ2VuZFpvbmUxJykge1xuICAgIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIGFsZXJ0KCdPbmx5IG9uZSBjaGFyYWN0ZXIgaXMgYWxsb3dlZC4nKTtcbiAgICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgZHJhZ2dlZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRyYWdnZWQpO1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgIGdhbWVTdG9yYWdlLnNldCgncGxheWVyMUluZGV4JywgYCR7ZHJhZ2dlZC5nZXRBdHRyaWJ1dGUoJ2tleScpfWApO1xuICB9XG5cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09ICdlbmRab25lMicpIHtcbiAgICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICBhbGVydCgnT25seSBvbmUgY2hhcmFjdGVyIGlzIGFsbG93ZWQuJyk7XG4gICAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGRyYWdnZWQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkcmFnZ2VkKTtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5hcHBlbmRDaGlsZChkcmFnZ2VkKTtcbiAgICBnYW1lU3RvcmFnZS5zZXQoJ3BsYXllcjJJbmRleCcsIGAke2RyYWdnZWQuZ2V0QXR0cmlidXRlKCdrZXknKX1gKTtcbiAgfVxuXG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PSAnc3RhcnRab25lJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICBkcmFnZ2VkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZHJhZ2dlZCk7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgY29uc29sZS5sb2coZHJhZ2dlZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlRHJhZygpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgaGFuZGxlRHJhZ1N0YXJ0KTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIGhhbmRsZURyYWdFbmQpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGhhbmRsZURyYWdPdmVyKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgaGFuZGxlRHJhZ0VudGVyKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgaGFuZGxlRHJhZ0xlYXZlKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGhhbmRsZURyb3ApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVEcmFnO1xuIiwiaW1wb3J0IHsgcGxheWVyMVNlbGVjdGlvbiwgcGxheWVyMlNlbGVjdGlvbiB9IGZyb20gJy4vdXRpbC9jb250YWluZXJzJztcbmltcG9ydCB7IGhhc1NlbGVjdGVkIH0gZnJvbSAnLi91dGlsL2hhc1NlbGVjdGVkJztcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVTZWxlY3Rpb24oKTogdm9pZCB7XG4gIGNvbnN0IGhhc1BsYXllcjFTZWxlY3RlZCA9IGhhc1NlbGVjdGVkKHBsYXllcjFTZWxlY3Rpb24pO1xuICBjb25zdCBoYXNQbGF5ZXIyU2VsZWN0ZWQgPSBoYXNTZWxlY3RlZChwbGF5ZXIyU2VsZWN0aW9uKTtcbiAgaWYgKGhhc1BsYXllcjFTZWxlY3RlZCAmJiBoYXNQbGF5ZXIyU2VsZWN0ZWQpIHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdnYW1lLmh0bWwnO1xuICB9IGVsc2Uge1xuICAgIGFsZXJ0KCdTZWxlY3QgY2hhcmFjdGVyIGZpcnN0LCB0aGVuIHN0YXJ0IHRoZSBnYW1lJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IGdhbWVTdG9yYWdlIH0gZnJvbSAnLi8uLi9pbmRleCc7XG5pbXBvcnQge1xuICBzaG93RGljZVJlc3VsdCxcbiAgdXBkYXRlUGxheWVyMUJ1dHRvbixcbiAgcm9sbERpY2UsXG4gIGRpc3BsYXlQbGF5ZXJzLFxuICByZW1vdmVQbGF5ZXIsXG4gIGNoZWNrV2lubmVyLFxuICBnYW1lRW5kLFxuICB0cmFwcyxcbiAgc2hvd01lc3NhZ2UsXG4gIGRlbGV0ZU1lc3NhZ2UsXG59IGZyb20gJy4vdXRpbC9nYW1lSGVscGVycyc7XG5pbXBvcnQgeyBkaWNlQ29udGFpbmVyLCBwbGF5ZXIxQnRuLCBwbGF5ZXIyQnRuIH0gZnJvbSAnLi91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IHsgV2lubmVyIGFzIFdpbm5lclR5cGVzIH0gZnJvbSAnLi4vc2NyaXB0cy9zaG93V2lubmVyJztcblxuZnVuY3Rpb24gcGxheUdhbWUocGxheWVyMTogbnVtYmVyLCBwbGF5ZXIyOiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3Qgc3RhcnRQb3NpdGlvbjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGlsZS1pbmRleC0xJyk7XG4gIGNvbnN0IGZpbmFsUG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGlsZS1pbmRleC0zMCcpO1xuXG4gIGxldCBwbGF5ZXIxU3RhdHVzOiBudW1iZXIgPSAxO1xuICBsZXQgcGxheWVyMlN0YXR1czogbnVtYmVyID0gMTtcblxuICBkaXNwbGF5UGxheWVycyhzdGFydFBvc2l0aW9uLCBwbGF5ZXIxKTtcbiAgZGlzcGxheVBsYXllcnMoc3RhcnRQb3NpdGlvbiwgcGxheWVyMik7XG4gIHVwZGF0ZVBsYXllcjFCdXR0b24odHJ1ZSk7XG4gIHBsYXllcjFCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW5QbGF5ZXIxVHVybiwgZmFsc2UpO1xuICBwbGF5ZXIyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuUGxheWVyMlR1cm4sIGZhbHNlKTtcblxuICBmdW5jdGlvbiBydW5QbGF5ZXIxVHVybigpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50RGljZVBvaW50ID0gcm9sbERpY2UoKTtcbiAgICBzaG93RGljZVJlc3VsdChkaWNlQ29udGFpbmVyLCBjdXJyZW50RGljZVBvaW50LCAzMDApO1xuICAgIHBsYXllcjFTdGF0dXMgKz0gY3VycmVudERpY2VQb2ludDtcblxuICAgIGlmIChjaGVja1dpbm5lcihwbGF5ZXIxU3RhdHVzKSkge1xuICAgICAgY29uc3Qgd2lubmVyOiBXaW5uZXJUeXBlcyA9IHtcbiAgICAgICAgaW5kZXg6IHBsYXllcjEsXG4gICAgICAgIG5hbWU6ICdQbGF5ZXIgMScsXG4gICAgICB9O1xuICAgICAgZ2FtZVN0b3JhZ2Uuc2V0U2VyaWFsaXplKCd3aW5uZXInLCB3aW5uZXIpO1xuICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjEpO1xuICAgICAgZGlzcGxheVBsYXllcnMoZmluYWxQb3NpdGlvbiwgcGxheWVyMSk7XG4gICAgICBnYW1lRW5kKHBsYXllcjEpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnd2lubmVyLmh0bWwnO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHVwZGF0ZVBvc2l0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRpbGUtaW5kZXgtJHtwbGF5ZXIxU3RhdHVzfWApO1xuICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjEpO1xuICAgICAgZGlzcGxheVBsYXllcnModXBkYXRlUG9zaXRpb24sIHBsYXllcjEpO1xuXG4gICAgICB0cmFwcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudC50b2tlbiA9PSBwbGF5ZXIxU3RhdHVzKSB7XG4gICAgICAgICAgY29uc3QgeyBhY3Rpb24sIG1lc3NhZ2UgfSA9IGVsZW1lbnQ7XG4gICAgICAgICAgcGxheWVyMVN0YXR1cyAtPSBhY3Rpb247XG4gICAgICAgICAgY29uc3QgbmV3UG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGlsZS1pbmRleC0ke3BsYXllcjFTdGF0dXN9YCk7XG5cbiAgICAgICAgICBzaG93TWVzc2FnZShgJHttZXNzYWdlfWApO1xuICAgICAgICAgIGRlbGV0ZU1lc3NhZ2UoKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZW1vdmVQbGF5ZXIocGxheWVyMSk7XG4gICAgICAgICAgICBkaXNwbGF5UGxheWVycyhuZXdQb3NpdGlvbiwgcGxheWVyMSk7XG4gICAgICAgICAgfSwgMzAwMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB1cGRhdGVQbGF5ZXIxQnV0dG9uKGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudERpY2VQb2ludCA9PT0gNikge1xuICAgICAgc2hvd01lc3NhZ2UoJ1NpbmNlIHlvdSByb2xsZWQgNiwgeW91IGdvdCBhIEJvbnVzIG1vdmVtZW50LiBSb2xsIHRoZSBkaWNlIGFnYWluJyk7XG4gICAgICBkZWxldGVNZXNzYWdlKCk7XG4gICAgICB1cGRhdGVQbGF5ZXIxQnV0dG9uKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1blBsYXllcjJUdXJuKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnREaWNlUG9pbnQgPSByb2xsRGljZSgpO1xuICAgIHNob3dEaWNlUmVzdWx0KGRpY2VDb250YWluZXIsIGN1cnJlbnREaWNlUG9pbnQsIDMwMCk7XG4gICAgcGxheWVyMlN0YXR1cyArPSBjdXJyZW50RGljZVBvaW50O1xuXG4gICAgaWYgKGNoZWNrV2lubmVyKHBsYXllcjJTdGF0dXMpKSB7XG4gICAgICBjb25zdCB3aW5uZXI6IFdpbm5lclR5cGVzID0ge1xuICAgICAgICBpbmRleDogcGxheWVyMixcbiAgICAgICAgbmFtZTogJ1BsYXllciAyJyxcbiAgICAgIH07XG4gICAgICBnYW1lU3RvcmFnZS5zZXRTZXJpYWxpemUoJ3dpbm5lcicsIHdpbm5lcik7XG4gICAgICByZW1vdmVQbGF5ZXIocGxheWVyMik7XG4gICAgICBkaXNwbGF5UGxheWVycyhmaW5hbFBvc2l0aW9uLCBwbGF5ZXIyKTtcbiAgICAgIGdhbWVFbmQocGxheWVyMik7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICd3aW5uZXIuaHRtbCc7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdXBkYXRlUG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGlsZS1pbmRleC0ke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICByZW1vdmVQbGF5ZXIocGxheWVyMik7XG4gICAgICBkaXNwbGF5UGxheWVycyh1cGRhdGVQb3NpdGlvbiwgcGxheWVyMik7XG5cbiAgICAgIHRyYXBzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgIGlmIChlbGVtZW50LnRva2VuID09IHBsYXllcjJTdGF0dXMpIHtcbiAgICAgICAgICBjb25zdCB7IGFjdGlvbiwgbWVzc2FnZSB9ID0gZWxlbWVudDtcbiAgICAgICAgICBwbGF5ZXIyU3RhdHVzIC09IGFjdGlvbjtcbiAgICAgICAgICBjb25zdCBuZXdQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB0aWxlLWluZGV4LSR7cGxheWVyMlN0YXR1c31gKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhuZXdQb3NpdGlvbik7XG5cbiAgICAgICAgICBzaG93TWVzc2FnZShgJHttZXNzYWdlfWApO1xuICAgICAgICAgIGRlbGV0ZU1lc3NhZ2UoKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZW1vdmVQbGF5ZXIocGxheWVyMik7XG4gICAgICAgICAgICBkaXNwbGF5UGxheWVycyhuZXdQb3NpdGlvbiwgcGxheWVyMik7XG4gICAgICAgICAgfSwgMzAwMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB1cGRhdGVQbGF5ZXIxQnV0dG9uKHRydWUpO1xuICAgIH1cblxuICAgIGlmIChjdXJyZW50RGljZVBvaW50ID09PSA2KSB7XG4gICAgICBzaG93TWVzc2FnZSgnU2luY2UgeW91IHJvbGxlZCA2LCB5b3UgZ290IGEgQm9udXMgbW92ZW1lbnQuIFJvbGwgdGhlIGRpY2UgYWdhaW4nKTtcbiAgICAgIGRlbGV0ZU1lc3NhZ2UoKTtcbiAgICAgIHVwZGF0ZVBsYXllcjFCdXR0b24oZmFsc2UpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBwbGF5R2FtZTtcbiIsImltcG9ydCB7IGNoYXJhY3Rlckxpc3QgfSBmcm9tICcuL3V0aWwvY29udGFpbmVycyc7XG5pbXBvcnQgeyBSZXNwb25zZU9ialR5cGVzIH0gZnJvbSAnLi91dGlsL3R5cGVzJztcbmltcG9ydCBjcmVhdGVJbWFnZSBmcm9tICcuL3V0aWwvY3JlYXRlSW1hZ2UnO1xuXG5jb25zdCBCQVNFX1VSTDogc3RyaW5nID0gJ2h0dHBzOi8vd3d3LmFuYXBpb2ZpY2VhbmRmaXJlLmNvbS9hcGkvY2hhcmFjdGVycy8nO1xuXG5mdW5jdGlvbiBnZXRDaGFyYWN0ZXJDYXJkcyhjaGFyYWN0ZXJJbmRleDogbnVtYmVyW10pIHtcbiAgY2hhcmFjdGVySW5kZXgubWFwKGVsZW1lbnQgPT4ge1xuICAgIHNob3dDaGFyYWN0ZXIoZWxlbWVudCk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzaG93Q2hhcmFjdGVyKGNoYXJhY3Rlck5hbWVJbmRleDogbnVtYmVyKSB7XG4gIGNvbnN0IHVybCA9IGAke0JBU0VfVVJMfSR7Y2hhcmFjdGVyTmFtZUluZGV4fWA7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgY29uc3QgZGF0YTogUmVzcG9uc2VPYmpUeXBlcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zdCB7IG5hbWUsIHRpdGxlcywgYWxpYXNlcyB9ID0gZGF0YTtcblxuICAgIGNvbnN0IGNvbXBvbmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbXBvbmVudC5jbGFzc05hbWUgPSAncm93X19pdGVtLS1jYXJkJztcbiAgICBjb21wb25lbnQuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xuICAgIGNvbXBvbmVudC5zZXRBdHRyaWJ1dGUoJ2tleScsIGAke2NoYXJhY3Rlck5hbWVJbmRleH1gKTtcbiAgICBjb25zdCBjYXJkSW1hZ2UgPSBgPGltZyBkcmFnZ2FibGU9XCJmYWxzZVwiIHNyYz0ke2NyZWF0ZUltYWdlKFxuICAgICAgY2hhcmFjdGVyTmFtZUluZGV4LFxuICAgICl9IGNsYXNzPVwiaXRlbS0tY2FyZC1pbWFnZVwiIGFsdD1cIkdhbWUgZmlndXJlIG5vLiR7Y2hhcmFjdGVyTmFtZUluZGV4fVwiPmA7XG4gICAgY29uc3QgY2FyZFRpdGxlID0gYCA8aDM+JHtuYW1lfTwvaDM+YDtcbiAgICBjb25zdCBjYXJkU3ViVGl0bGUgPSBgPHNwYW4+JHt0aXRsZXNbMF0gPyB0aXRsZXNbMF0gOiBhbGlhc2VzWzBdfTwvc3Bhbj5gO1xuICAgIGNvbXBvbmVudC5pbm5lckhUTUwgPSBjYXJkSW1hZ2UgKyBjYXJkVGl0bGUgKyBjYXJkU3ViVGl0bGU7XG5cbiAgICBjaGFyYWN0ZXJMaXN0LmFwcGVuZChjb21wb25lbnQpO1xuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRocm93IGVycjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRDaGFyYWN0ZXJDYXJkcztcbiIsImltcG9ydCB7IGNvbmdyYXR1bGF0aW9uTWVzc2FnZSwgd2lubmVyQ29udGFpbmVyIH0gZnJvbSAnLi91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IGNyZWF0ZUltYWdlIGZyb20gJy4vdXRpbC9jcmVhdGVJbWFnZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2lubmVyIHtcbiAgaW5kZXg6IG51bWJlcjtcbiAgbmFtZTogc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBzaG93V2lubmVyKHsgaW5kZXgsIG5hbWUgfTogV2lubmVyKTogdm9pZCB7XG4gIGlmICh3aW5uZXJDb250YWluZXIgIT0gbnVsbCkge1xuICAgIGNvbnN0IHdpbm5lckltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgd2lubmVySW1hZ2UuY2xhc3NOYW1lID0gJ2l0ZW0gaXRlbS0td2lubmVyLWltYWdlIGl0ZW0tLXNoYWtlJztcbiAgICB3aW5uZXJJbWFnZS5zcmMgPSBgJHtjcmVhdGVJbWFnZShpbmRleCl9YDtcbiAgICB3aW5uZXJJbWFnZS5hbHQgPSAnRmVhdHVyZWQgaW1hZ2UgZm9yIHRoZSB3aW5uZXInO1xuICAgIHdpbm5lckNvbnRhaW5lci5hcHBlbmRDaGlsZCh3aW5uZXJJbWFnZSk7XG4gIH1cblxuICBpZiAoY29uZ3JhdHVsYXRpb25NZXNzYWdlICE9IG51bGwpIHtcbiAgICBjb25ncmF0dWxhdGlvbk1lc3NhZ2UuaW5uZXJUZXh0ID0gYCR7bmFtZX0gY2xhaW1lZCB0aGUgY3Jvd24hYDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzaG93V2lubmVyO1xuIiwiY29uc3Qgc2Ftd2VsbDogbnVtYmVyID0gOTU0O1xuY29uc3Qgam9uOiBudW1iZXIgPSA1ODM7XG5jb25zdCBjZXJzZWk6IG51bWJlciA9IDIzODtcbmNvbnN0IHR5cmlvbjogbnVtYmVyID0gMTA1MjtcbmNvbnN0IGRhZW5lcnlzOiBudW1iZXIgPSAyNzE7XG5jb25zdCBzYW5zYTogbnVtYmVyID0gOTU3O1xuY29uc3QgdmFyeXM6IG51bWJlciA9IDIwNjk7XG5jb25zdCBiZXJpYzogbnVtYmVyID0gMTkwO1xuY29uc3Qgam95ZXVzZTogbnVtYmVyID0gNjAwO1xuY29uc3QgbWFsd3luOiBudW1iZXIgPSA3MDA7XG5jb25zdCBtZXJyZWxsOiBudW1iZXIgPSA3NTA7XG5jb25zdCBhZW1vbjogbnVtYmVyID0gNTA7XG5cbmNvbnN0IGNoYXJhY3RlckluZGV4OiBudW1iZXJbXSA9IFtcbiAgc2Ftd2VsbCxcbiAgam9uLFxuICBjZXJzZWksXG4gIHR5cmlvbixcbiAgZGFlbmVyeXMsXG4gIHNhbnNhLFxuICB2YXJ5cyxcbiAgYmVyaWMsXG4gIGpveWV1c2UsXG4gIG1hbHd5bixcbiAgbWVycmVsbCxcbiAgYWVtb24sXG5dO1xuZXhwb3J0IGRlZmF1bHQgY2hhcmFjdGVySW5kZXg7XG4iLCIvL3BhZ2U6c2VsZWN0LXBsYXllclxuZXhwb3J0IGNvbnN0IGNoYXJhY3Rlckxpc3Q6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0Wm9uZScpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjFTZWxlY3Rpb246IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZFpvbmUxJyk7XG5leHBvcnQgY29uc3QgcGxheWVyMlNlbGVjdGlvbjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kWm9uZTInKTtcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZVNlbGVjdGlvbkJ0bjogSFRNTEFuY2hvckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3RhLS12YWxpZGF0aW9uJyk7XG5cbi8vcGFnZTpnYW1lXG5leHBvcnQgY29uc3QgYm9hcmQ6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVCb2FyZCcpO1xuZXhwb3J0IGNvbnN0IGRpY2VDb250YWluZXI6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpY2VJbWFnZScpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjFCdG46IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi0tUGxheWVyMScpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjJCdG46IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi0tUGxheWVyMicpO1xuZXhwb3J0IGNvbnN0IG92ZXJsYXk6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ292ZXJsYXknKTtcbmV4cG9ydCBjb25zdCBtZXNzYWdlOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlJyk7XG5cbi8vcGFnZTp3aW5uZXJcbmV4cG9ydCBjb25zdCB3aW5uZXJDb250YWluZXI6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dpbm5lcicpO1xuZXhwb3J0IGNvbnN0IGNvbmdyYXR1bGF0aW9uTWVzc2FnZTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29uZ3JhdHVsYXRpb24nKTtcbmV4cG9ydCBjb25zdCByZXNldEJ0bjogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXQnKTtcblxuIiwiZnVuY3Rpb24gY3JlYXRlSW1hZ2UoaW5kZXg6IG51bWJlcikge1xuICByZXR1cm4gYGh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2Rua2ZnbXp5MS9pbWFnZS91cGxvYWQvdjE1NzU1NDk2NzQvZ2FtZS8ke2luZGV4fS5wbmdgO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVJbWFnZTtcbiIsImV4cG9ydCBjb25zdCBkaWNlSWNvbnMgPSB7XG4gIHBvaW50MTpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3pNMjU2IDIwNmE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHpcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50MjpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTMxNi45NyAzNi4wM0E1MCA1MCAwIDAgMSA0NDAgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0tMjY4IDI2OEE1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQzOlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptMzE2Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6TTI1NiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6TTEyMy40NyAzNDAuMDNBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50NDpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTQ4Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDE3MiAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bS0yNjggMjY4QTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDU6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem00OC45NyAzNi4wM0E1MCA1MCAwIDAgMSAxNzIgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3ek0yNTYgMjA2YTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwek0xMjMuNDcgMzQwLjAzQTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDY6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem00OC45NyAzNi4wM0E1MCA1MCAwIDAgMSAxNzIgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMTIyYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3ek0xMjIgMjA2YTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwem0yNjggMGE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHpNMTIzLjQ3IDM0MC4wM0E1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3em0yNjggMEE1MCA1MCAwIDAgMSA0NDAgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBkaWNlQXJyYXk6IHN0cmluZ1tdID0gW1xuICBkaWNlSWNvbnMucG9pbnQxLFxuICBkaWNlSWNvbnMucG9pbnQyLFxuICBkaWNlSWNvbnMucG9pbnQzLFxuICBkaWNlSWNvbnMucG9pbnQ0LFxuICBkaWNlSWNvbnMucG9pbnQ1LFxuICBkaWNlSWNvbnMucG9pbnQ2LFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpY2VJY29uKGRpY2VQb2ludDogbnVtYmVyKSB7XG4gIHJldHVybiBkaWNlQXJyYXlbZGljZVBvaW50IC0gMV07XG59XG4iLCJpbXBvcnQgeyBwbGF5ZXIxQnRuLCBwbGF5ZXIyQnRuLCBvdmVybGF5LCBtZXNzYWdlIH0gZnJvbSAnLi9jb250YWluZXJzJztcbmltcG9ydCB7IGRpY2VBcnJheSB9IGZyb20gJy4vZGljZSc7XG5pbXBvcnQgY3JlYXRlSW1hZ2UgZnJvbSAnLi9jcmVhdGVJbWFnZSc7XG5cbmludGVyZmFjZSB0cmFwIHtcbiAgdG9rZW46IG51bWJlcjtcbiAgYWN0aW9uOiBudW1iZXI7XG4gIG1lc3NhZ2U6IHN0cmluZztcbn1cblxuY29uc3QgdHJhcDE6IHRyYXAgPSB7XG4gIHRva2VuOiA4LFxuICBhY3Rpb246IDEsXG4gIG1lc3NhZ2U6ICdQaXJhdGVzIGFoZWFkISBSZXRyZWF0IG9uZSBmaWVsZCB0byBhdm9pZCBiZWluZyBub3RpY2VkLicsXG59O1xuY29uc3QgdHJhcDI6IHRyYXAgPSB7XG4gIHRva2VuOiAxNCxcbiAgYWN0aW9uOiAyLFxuICBtZXNzYWdlOiAnQSB3b2xmIGVtZXJnZXMgZnJvbSB0aGUgbmlnaHQgd29vZHMuIFJldHJlYXQgdHdvIGZpZWxkcyB0byBlc2NhcGUgaXRzIGNoYXNlLicsXG59O1xuY29uc3QgdHJhcDM6IHRyYXAgPSB7XG4gIHRva2VuOiAxOCxcbiAgYWN0aW9uOiAzLFxuICBtZXNzYWdlOlxuICAgICdBIHdoaXRlIHdhbGtlciBoYXMgYmVlbiBzcG90dGVkISBJbW1lZGlhdGVseSByZXRyZWF0IHRocmVlIGZpZWxkcyB0byBuYXJyb3dseSBlc2NhcGUgZGVhdGguJyxcbn07XG5jb25zdCB0cmFwNDogdHJhcCA9IHtcbiAgdG9rZW46IDI0LFxuICBhY3Rpb246IDQsXG4gIG1lc3NhZ2U6ICdFbmVteSBob3JzZW1lbiBvbiB0aGUgaG9yaXpvbiEgT3V0bnVtYmVyZWQsIHlvdSBtdXN0IHJldHJlYXQgZm91ciBmaWVsZHMnLFxufTtcbmNvbnN0IHRyYXA1OiB0cmFwID0ge1xuICB0b2tlbjogMjgsXG4gIGFjdGlvbjogNSxcbiAgbWVzc2FnZTogJ0ZpcmUtYnJlYXRoaW5nIGRyYWdvbnMgYXBwZWFyISBSZXRyZWF0IGZpdmUgZmllbGRzIHRvIGVzY2FwZSB0aGVpciBsb25nIGdhemUuJyxcbn07XG5cbmV4cG9ydCBjb25zdCB0cmFwczogdHJhcFtdID0gW3RyYXAxLCB0cmFwMiwgdHJhcDMsIHRyYXA0LCB0cmFwNV07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCb2FyZChjb250YWluZXI6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gIGZvciAobGV0IGk6IG51bWJlciA9IDE7IGkgPD0gMzA7IGkrKykge1xuICAgIGNvbnN0IHRpbGU6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGlsZS5jbGFzc05hbWUgPSBgYm9hcmRfX3RpbGVgO1xuICAgIHRpbGUuc2V0QXR0cmlidXRlKCdpZCcsIGB0aWxlLWluZGV4LSR7aX1gKTtcbiAgICB0aWxlLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz0ndGlsZV9fbnVtYmVyJz4ke2l9PC9zcGFuPmA7XG5cbiAgICBpZiAoaSAlIDIgIT09IDApIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2Jyb3duJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnO1xuICAgIH1cblxuICAgIHRyYXBzLm1hcChlbGVtZW50ID0+IHtcbiAgICAgIGlmIChlbGVtZW50LnRva2VuID09PSBpKSB7XG4gICAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3llbGxvdyc7XG4gICAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgnaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZG5rZmdtenkxL2ltYWdlL3VwbG9hZC92MTU3NTY1NTczNC9nYW1lL3RyYXAke2VsZW1lbnQuYWN0aW9ufS5zdmcnKWA7XG4gICAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnNHJlbSc7XG4gICAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9ICduby1yZXBlYXQnO1xuICAgICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9ICdjZW50ZXIgY2VudGVyJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChpID09IDMwKSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJ2h0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2Rua2ZnbXp5MS9pbWFnZS91cGxvYWQvdjE1NzU2NTU1NTMvZ2FtZS90aHJvbmUuc3ZnJylgO1xuICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICc0cmVtJztcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZFJlcGVhdCA9ICduby1yZXBlYXQnO1xuICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSAnY2VudGVyIGNlbnRlcic7XG4gICAgfVxuXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRpbGUpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVQbGF5ZXIxQnV0dG9uKGlzUGxheWVyMVR1cm46IGJvb2xlYW4pOiB2b2lkIHtcbiAgaWYgKGlzUGxheWVyMVR1cm4pIHtcbiAgICBwbGF5ZXIxQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgcGxheWVyMkJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcGxheWVyMUJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgcGxheWVyMkJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RGljZVJlc3VsdChjb250YWluZXI6IEhUTUxFbGVtZW50LCBwb2ludDogbnVtYmVyLCBkZWxheT86IG51bWJlcikge1xuICBjb250YWluZXIuaW5uZXJIVE1MID0gZGljZUFycmF5W3BvaW50IC0gMV07XG4gIGNvbnRhaW5lci5jbGFzc05hbWUgKz0gJyBpdGVtLS1zaGFrZSc7XG5cbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXRlbS0tc2hha2UnKTtcbiAgfSwgZGVsYXkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm9sbERpY2UoKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDYpICsgMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVBsYXllcihwbGF5ZXI6IG51bWJlcik6IHZvaWQge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZmlndXJlLSR7cGxheWVyfWApLnJlbW92ZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVBsYXllcnMoY29udGFpbmVyOiBIVE1MRWxlbWVudCwgcGxheWVySW5kZXg6IG51bWJlcikge1xuICBjb25zdCBwbGF5ZXI6IEhUTUxJbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICBwbGF5ZXIuc3JjID0gYCR7Y3JlYXRlSW1hZ2UocGxheWVySW5kZXgpfWA7XG5cbiAgcGxheWVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYm9hcmRfX2ZpZ3VyZScpO1xuXG4gIHBsYXllci5zZXRBdHRyaWJ1dGUoJ2FsdCcsIGBHYW1lIGZpZ3VyZSBuby4ke3BsYXllckluZGV4fWApO1xuXG4gIHBsYXllci5zZXRBdHRyaWJ1dGUoJ2lkJywgYGZpZ3VyZS0ke3BsYXllckluZGV4fWApO1xuXG4gIGlmIChjb250YWluZXIgIT0gbnVsbCkge1xuICAgIGNvbnRhaW5lci5hcHBlbmQocGxheWVyKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tXaW5uZXIocGxheWVyU3RhdHVzOiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuIHBsYXllclN0YXR1cyA+PSAzMCA/IHRydWUgOiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdhbWVFbmQod2lubmVyOiBudW1iZXIpIHtcbiAgcGxheWVyMUJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gIHBsYXllcjJCdG4uZGlzYWJsZWQgPSB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd01lc3NhZ2UoY29udGVudDogc3RyaW5nKSB7XG4gIG1lc3NhZ2UuaW5uZXJUZXh0ID0gY29udGVudDtcbiAgb3ZlcmxheS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlTWVzc2FnZSgpIHtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBvdmVybGF5LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgfSwgMTUwMCk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaGFzU2VsZWN0ZWQoY29udGFpbmVyOiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gY29udGFpbmVyLmhhc0NoaWxkTm9kZXMoKTtcbn1cbiIsImNsYXNzIFN0b3JhZ2Uge1xuICBwcml2YXRlIHN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlO1xuXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICB9XG5cbiAgZ2V0KGtleTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgfVxuXG4gIGRlbGV0ZShrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gIH1cblxuICBzZXRTZXJpYWxpemUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNldChrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gIH1cblxuICBnZXRVbnNlcmlhbGl6ZTxUPihrZXk6IHN0cmluZyk6IFQge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmdldChrZXkpO1xuXG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhKSBhcyBUO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0b3JhZ2U7XG4iXX0=
