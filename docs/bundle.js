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
        var canvasConfiguration = {
          maxShapes: 100,
          props: ['circle', 'rectangle', 'line', 'triangle', 'square'],
          colors: [
            '#E85F42',
            '#F0FB05',
            '#27FF01',
            '#01FFC1',
            '#01B2FF',
            '#69E8FA',
            '#0104FF',
            '#FF01DC',
            '#FF0127',
          ],
          speed: 5,
          maxRotate: 50,
        };
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawConfetti_1.startConfetti(canvasConfiguration, canvas, ctx);
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
        './scripts/util/storage': 14,
      },
    ],
    2: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        var utils = {
          getRandomNumber: function(size) {
            return Math.floor(Math.random() * size);
          },
        };
        var renderShapesOnCanvas = function(ctx, particle) {
          switch (particle.shape) {
            case 'circle': {
              ctx.beginPath();
              ctx.arc(particle.xAxis, particle.yAxis, 5, 0, Math.PI * 2, true);
              ctx.fill();
              ctx.translate(particle.xAxis, particle.yAxis);
              break;
            }
            case 'rectangle': {
              ctx.translate(particle.xAxis, particle.yAxis);
              ctx.rotate((particle.rotate * Math.PI) / 180);
              ctx.fillRect(particle.xAxis, 0, 5, 10);
              break;
            }
            case 'line': {
              ctx.beginPath();
              ctx.moveTo(particle.xAxis, particle.yAxis);
              ctx.lineTo(particle.xAxis + 5, particle.yAxis + 10);
              ctx.lineWidth = 5;
              ctx.strokeStyle = particle.color;
              ctx.stroke();
              break;
            }
            case 'triangle': {
              ctx.beginPath();
              ctx.moveTo(particle.xAxis, particle.yAxis);
              ctx.lineTo(particle.xAxis + 10, particle.yAxis + 10);
              ctx.lineTo(particle.xAxis, particle.yAxis + 20);
              ctx.fill();
              break;
            }
            case 'square': {
              ctx.translate(particle.xAxis + 20, particle.yAxis + 15);
              ctx.rotate(particle.maxRotate);
              ctx.fillRect(-10, -10, 10, 10);
              ctx.restore();
              break;
            }
          }
        };
        var getRandomShape = function(config) {
          return {
            xAxis: utils.getRandomNumber(window.innerWidth),
            yAxis: utils.getRandomNumber(window.innerHeight),
            shape: config.props[utils.getRandomNumber(config.props.length)],
            color: config.colors[utils.getRandomNumber(config.colors.length)],
            speed: utils.getRandomNumber(config.speed) + 5,
            rotate: utils.getRandomNumber(config.maxRotate),
          };
        };
        var getConfettiShapes = function(config) {
          var shapes = [];
          for (var i = 0; i < config.maxShapes; i++) {
            shapes.push(getRandomShape(config));
          }
          return shapes;
        };
        var clearCanvas = function(ctx, canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
        var drawShapes = function(shapes, ctx, canvas, config) {
          clearCanvas(ctx, canvas);
          for (var _i = 0, shapes_1 = shapes; _i < shapes_1.length; _i++) {
            var shape = shapes_1[_i];
            if (shape.yAxis >= canvas.height) {
              shape.xAxis = utils.getRandomNumber(window.innerWidth);
              shape.yAxis = 0;
            }
            shape.yAxis = shape.yAxis + shape.speed;
            ctx.save();
            ctx.fillStyle = shape.color;
            renderShapesOnCanvas(ctx, shape);
            ctx.restore();
          }
          window.requestAnimationFrame(drawShapes.bind(null, shapes, ctx, canvas, config));
        };
        var renderConfettiAnimation = function(config, canvas, ctx) {
          var shapes = getConfettiShapes(config);
          drawShapes(shapes, ctx, canvas, config);
        };
        exports.startConfetti = function(config, canvas, ctx) {
          renderConfettiAnimation(config, canvas, ctx);
        };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXgudHMiLCJzcmMvc2NyaXB0cy9kcmF3Q29uZmV0dGkudHMiLCJzcmMvc2NyaXB0cy9oYW5kbGVEcmFnLnRzIiwic3JjL3NjcmlwdHMvaGFuZGxlU2VsZWN0aW9uLnRzIiwic3JjL3NjcmlwdHMvcGxheUdhbWUudHMiLCJzcmMvc2NyaXB0cy9zaG93Q2hhcmFjdGVyLnRzIiwic3JjL3NjcmlwdHMvc2hvd1dpbm5lci50cyIsInNyYy9zY3JpcHRzL3V0aWwvY2hhcmFjdGVySW5kZXgudHMiLCJzcmMvc2NyaXB0cy91dGlsL2NvbnRhaW5lcnMudHMiLCJzcmMvc2NyaXB0cy91dGlsL2NyZWF0ZUltYWdlLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9kaWNlLnRzIiwic3JjL3NjcmlwdHMvdXRpbC9nYW1lSGVscGVycy50cyIsInNyYy9zY3JpcHRzL3V0aWwvaGFzU2VsZWN0ZWQudHMiLCJzcmMvc2NyaXB0cy91dGlsL3N0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLG1EQUE4QztBQUM5Qyw2REFBNEQ7QUFDNUQsK0NBQTBDO0FBQzFDLHlEQUF3RDtBQUN4RCxtREFBd0U7QUFDeEUsZ0VBQTJEO0FBQzNELHdEQU9tQztBQUNuQywwREFBbUY7QUFDbkYsa0RBQTZDO0FBQzdDLHVEQUF1RDtBQUUxQyxRQUFBLFdBQVcsR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztBQUV6QyxJQUFJLDBCQUFhLElBQUksSUFBSSxFQUFFO0lBQ3pCLHVCQUFpQixDQUFDLHdCQUFjLENBQUMsQ0FBQztJQUNsQyxvQkFBVSxFQUFFLENBQUM7SUFDYixJQUFJLGlDQUFvQixJQUFJLElBQUk7UUFDOUIsaUNBQW9CLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGlDQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDMUU7QUFFRCxJQUFJLGtCQUFLLElBQUksSUFBSSxJ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QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsOEJBQVksR0FBWixVQUFhLEdBQVcsRUFBRSxLQUFVO1FBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsZ0NBQWMsR0FBZCxVQUFrQixHQUFXO1FBQzNCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFM0IsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFNLENBQUM7SUFDL0IsQ0FBQztJQUNILGNBQUM7QUFBRCxDQTVCQSxBQTRCQyxJQUFBO0FBRUQsa0JBQWUsT0FBTyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IGhhbmRsZURyYWcgZnJvbSAnLi9zY3JpcHRzL2hhbmRsZURyYWcnO1xuaW1wb3J0IHsgaGFuZGxlU2VsZWN0aW9uIH0gZnJvbSAnLi9zY3JpcHRzL2hhbmRsZVNlbGVjdGlvbic7XG5pbXBvcnQgcGxheUdhbWUgZnJvbSAnLi9zY3JpcHRzL3BsYXlHYW1lJztcbmltcG9ydCBnZXRDaGFyYWN0ZXJDYXJkcyBmcm9tICcuL3NjcmlwdHMvc2hvd0NoYXJhY3Rlcic7XG5pbXBvcnQgc2hvd1dpbm5lciwgeyBXaW5uZXIgYXMgV2lubmVyVHlwZSB9IGZyb20gJy4vc2NyaXB0cy9zaG93V2lubmVyJztcbmltcG9ydCBjaGFyYWN0ZXJJbmRleCBmcm9tICcuL3NjcmlwdHMvdXRpbC9jaGFyYWN0ZXJJbmRleCc7XG5pbXBvcnQge1xuICBib2FyZCxcbiAgY2hhcmFjdGVyTGlzdCxcbiAgZGljZUNvbnRhaW5lcixcbiAgcmVzZXRCdG4sXG4gIHZhbGlkYXRlU2VsZWN0aW9uQnRuLFxuICB3aW5uZXJDb250YWluZXIsXG59IGZyb20gJy4vc2NyaXB0cy91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IHsgY3JlYXRlQm9hcmQsIHJvbGxEaWNlLCBzaG93RGljZVJlc3VsdCB9IGZyb20gJy4vc2NyaXB0cy91dGlsL2dhbWVIZWxwZXJzJztcbmltcG9ydCBTdG9yYWdlIGZyb20gJy4vc2NyaXB0cy91dGlsL3N0b3JhZ2UnO1xuaW1wb3J0IHsgc3RhcnRDb25mZXR0aSB9IGZyb20gJy4vc2NyaXB0cy9kcmF3Q29uZmV0dGknO1xuXG5leHBvcnQgY29uc3QgZ2FtZVN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpO1xuXG5pZiAoY2hhcmFjdGVyTGlzdCAhPSBudWxsKSB7XG4gIGdldENoYXJhY3RlckNhcmRzKGNoYXJhY3RlckluZGV4KTtcbiAgaGFuZGxlRHJhZygpO1xuICBpZiAodmFsaWRhdGVTZWxlY3Rpb25CdG4gIT0gbnVsbClcbiAgICB2YWxpZGF0ZVNlbGVjdGlvbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVNlbGVjdGlvbiwgZmFsc2UpO1xufVxuXG5pZiAoYm9hcmQgIT0gbnVsbCAmJiBkaWNlQ29udGFpbmVyICE9IG51bGwpIHtcbiAgY29uc3QgcGxheWVyMTogbnVtYmVyID0gZ2FtZVN0b3JhZ2UuZ2V0VW5zZXJpYWxpemUoJ3BsYXllcjFJbmRleCcpO1xuICBjb25zdCBwbGF5ZXIyOiBudW1iZXIgPSBnYW1lU3RvcmFnZS5nZXRVbnNlcmlhbGl6ZSgncGxheWVyMkluZGV4Jyk7XG4gIGNyZWF0ZUJvYXJkKGJvYXJkKTtcbiAgc2hvd0RpY2VSZXN1bHQoZGljZUNvbnRhaW5lciwgcm9sbERpY2UoKSk7XG5cbiAgaWYgKHBsYXllcjEgJiYgcGxheWVyMikge1xuICAgIHBsYXlHYW1lKHBsYXllcjEsIHBsYXllcjIpO1xuICB9XG59XG5cbmlmICh3aW5uZXJDb250YWluZXIgIT0gbnVsbCkge1xuICBjb25zdCB3aW5uZXI6IFdpbm5lclR5cGUgPSBnYW1lU3RvcmFnZS5nZXRVbnNlcmlhbGl6ZSgnd2lubmVyJyk7XG4gIGNvbnNvbGUubG9nKHdpbm5lcik7XG4gIHNob3dXaW5uZXIod2lubmVyKTtcbn1cblxuaWYgKHJlc2V0QnRuICE9IG51bGwpIHtcbiAgcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAnY2xpY2snLFxuICAgIGZ1bmN0aW9uKCkge1xuICAgICAgZ2FtZVN0b3JhZ2UuZGVsZXRlKCdwbGF5ZXIxSW5kZXgnKTtcbiAgICAgIGdhbWVTdG9yYWdlLmRlbGV0ZSgncGxheWVyMkluZGV4Jyk7XG4gICAgICBnYW1lU3RvcmFnZS5kZWxldGUoJ3dpbm5lcicpO1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnc2VsZWN0Lmh0bWwnO1xuICAgIH0sXG4gICAgZmFsc2UsXG4gICk7XG59XG5cbmNvbnN0IGNhbnZhc0NvbmZpZ3VyYXRpb24gPSB7XG4gIG1heFNoYXBlczogMTAwLFxuICBwcm9wczogWydjaXJjbGUnLCAncmVjdGFuZ2xlJywgJ2xpbmUnLCAndHJpYW5nbGUnLCAnc3F1YXJlJ10sXG4gIGNvbG9yczogW1xuICAgICcjRTg1RjQyJyxcbiAgICAnI0YwRkIwNScsXG4gICAgJyMyN0ZGMDEnLFxuICAgICcjMDFGRkMxJyxcbiAgICAnIzAxQjJGRicsXG4gICAgJyM2OUU4RkEnLFxuICAgICcjMDEwNEZGJyxcbiAgICAnI0ZGMDFEQycsXG4gICAgJyNGRjAxMjcnLFxuICBdLFxuICBzcGVlZDogNSxcbiAgbWF4Um90YXRlOiA1MCxcbn07XG5cbnZhciBjYW52YXMgPSA8SFRNTENhbnZhc0VsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xudmFyIGN0eCA9IDxDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ+Y2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbnN0YXJ0Q29uZmV0dGkoY2FudmFzQ29uZmlndXJhdGlvbiwgY2FudmFzLCBjdHgpO1xuIiwiY29uc3QgdXRpbHMgPSB7XG4gIGdldFJhbmRvbU51bWJlcjogc2l6ZSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaXplKSxcbn07XG5cbmNvbnN0IHJlbmRlclNoYXBlc09uQ2FudmFzID0gKGN0eCwgcGFydGljbGUpID0+IHtcbiAgc3dpdGNoIChwYXJ0aWNsZS5zaGFwZSkge1xuICAgIGNhc2UgJ2NpcmNsZSc6IHtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5hcmMocGFydGljbGUueEF4aXMsIHBhcnRpY2xlLnlBeGlzLCA1LCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgICBjdHguZmlsbCgpO1xuICAgICAgY3R4LnRyYW5zbGF0ZShwYXJ0aWNsZS54QXhpcywgcGFydGljbGUueUF4aXMpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgJ3JlY3RhbmdsZSc6IHtcbiAgICAgIGN0eC50cmFuc2xhdGUocGFydGljbGUueEF4aXMsIHBhcnRpY2xlLnlBeGlzKTtcbiAgICAgIGN0eC5yb3RhdGUoKHBhcnRpY2xlLnJvdGF0ZSAqIE1hdGguUEkpIC8gMTgwKTtcbiAgICAgIGN0eC5maWxsUmVjdChwYXJ0aWNsZS54QXhpcywgMCwgNSwgMTApO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgJ2xpbmUnOiB7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKHBhcnRpY2xlLnhBeGlzLCBwYXJ0aWNsZS55QXhpcyk7XG4gICAgICBjdHgubGluZVRvKHBhcnRpY2xlLnhBeGlzICsgNSwgcGFydGljbGUueUF4aXMgKyAxMCk7XG4gICAgICBjdHgubGluZVdpZHRoID0gNTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHBhcnRpY2xlLmNvbG9yO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgJ3RyaWFuZ2xlJzoge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhwYXJ0aWNsZS54QXhpcywgcGFydGljbGUueUF4aXMpO1xuICAgICAgY3R4LmxpbmVUbyhwYXJ0aWNsZS54QXhpcyArIDEwLCBwYXJ0aWNsZS55QXhpcyArIDEwKTtcbiAgICAgIGN0eC5saW5lVG8ocGFydGljbGUueEF4aXMsIHBhcnRpY2xlLnlBeGlzICsgMjApO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlICdzcXVhcmUnOiB7XG4gICAgICBjdHgudHJhbnNsYXRlKHBhcnRpY2xlLnhBeGlzICsgMjAsIHBhcnRpY2xlLnlBeGlzICsgMTUpO1xuICAgICAgY3R4LnJvdGF0ZShwYXJ0aWNsZS5tYXhSb3RhdGUpO1xuICAgICAgY3R4LmZpbGxSZWN0KC0xMCwgLTEwLCAxMCwgMTApO1xuICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgZ2V0UmFuZG9tU2hhcGUgPSBjb25maWcgPT4gKHtcbiAgeEF4aXM6IHV0aWxzLmdldFJhbmRvbU51bWJlcih3aW5kb3cuaW5uZXJXaWR0aCksXG4gIHlBeGlzOiB1dGlscy5nZXRSYW5kb21OdW1iZXIod2luZG93LmlubmVySGVpZ2h0KSxcbiAgc2hhcGU6IGNvbmZpZy5wcm9wc1t1dGlscy5nZXRSYW5kb21OdW1iZXIoY29uZmlnLnByb3BzLmxlbmd0aCldLFxuICBjb2xvcjogY29uZmlnLmNvbG9yc1t1dGlscy5nZXRSYW5kb21OdW1iZXIoY29uZmlnLmNvbG9ycy5sZW5ndGgpXSxcbiAgc3BlZWQ6IHV0aWxzLmdldFJhbmRvbU51bWJlcihjb25maWcuc3BlZWQpICsgNSxcbiAgcm90YXRlOiB1dGlscy5nZXRSYW5kb21OdW1iZXIoY29uZmlnLm1heFJvdGF0ZSksXG59KTtcblxuY29uc3QgZ2V0Q29uZmV0dGlTaGFwZXMgPSBjb25maWcgPT4ge1xuICBjb25zdCBzaGFwZXMgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZy5tYXhTaGFwZXM7IGkrKykge1xuICAgIHNoYXBlcy5wdXNoKGdldFJhbmRvbVNoYXBlKGNvbmZpZykpO1xuICB9XG5cbiAgcmV0dXJuIHNoYXBlcztcbn07XG5cbmNvbnN0IGNsZWFyQ2FudmFzID0gKGN0eCwgY2FudmFzKSA9PiB7XG4gIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbn07XG5cbmNvbnN0IGRyYXdTaGFwZXMgPSAoc2hhcGVzLCBjdHgsIGNhbnZhcywgY29uZmlnKSA9PiB7XG4gIGNsZWFyQ2FudmFzKGN0eCwgY2FudmFzKTtcblxuICBmb3IgKGNvbnN0IHNoYXBlIG9mIHNoYXBlcykge1xuICAgIGlmIChzaGFwZS55QXhpcyA+PSBjYW52YXMuaGVpZ2h0KSB7XG4gICAgICBzaGFwZS54QXhpcyA9IHV0aWxzLmdldFJhbmRvbU51bWJlcih3aW5kb3cuaW5uZXJXaWR0aCk7XG4gICAgICBzaGFwZS55QXhpcyA9IDA7XG4gICAgfVxuICAgIHNoYXBlLnlBeGlzID0gc2hhcGUueUF4aXMgKyBzaGFwZS5zcGVlZDtcbiAgICAvLyBzaGFwZS54QXhpcyA9IHNoYXBlLnhBeGlzIC0gMTtcblxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IHNoYXBlLmNvbG9yO1xuICAgIHJlbmRlclNoYXBlc09uQ2FudmFzKGN0eCwgc2hhcGUpO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXdTaGFwZXMuYmluZChudWxsLCBzaGFwZXMsIGN0eCwgY2FudmFzLCBjb25maWcpKTtcbn07XG5cbmNvbnN0IHJlbmRlckNvbmZldHRpQW5pbWF0aW9uID0gKGNvbmZpZywgY2FudmFzLCBjdHgpID0+IHtcbiAgY29uc3Qgc2hhcGVzID0gZ2V0Q29uZmV0dGlTaGFwZXMoY29uZmlnKTtcbiAgZHJhd1NoYXBlcyhzaGFwZXMsIGN0eCwgY2FudmFzLCBjb25maWcpO1xuICAvLyByZXF1ZXN0SUQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXdTaGFwZXMuYmluZChudWxsLCBzaGFwZXMsIGN0eCwgY2FudmFzLCBjb25maWcpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzdGFydENvbmZldHRpID0gKGNvbmZpZywgY2FudmFzLCBjdHgpID0+IHtcbiAgLyogc3RvcCBhbnkgZXhpc3RpbmcgY2FudmFzIGFuaW1hdGlvbiAqL1xuICByZW5kZXJDb25mZXR0aUFuaW1hdGlvbihjb25maWcsIGNhbnZhcywgY3R4KTtcbn07XG4iLCJpbXBvcnQgeyBnYW1lU3RvcmFnZSB9IGZyb20gJy4uL2luZGV4JztcbmxldCBkcmFnZ2VkOiBIVE1MRWxlbWVudDtcblxuZnVuY3Rpb24gaGFuZGxlRHJhZ1N0YXJ0KGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgZHJhZ2dlZCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUub3BhY2l0eSA9ICcwLjUnO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmFnRW5kKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUub3BhY2l0eSA9ICcnO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmFnT3ZlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyYWdFbnRlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ3N0YXJ0Wm9uZScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyM3NDU2MjUnO1xuICB9XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PT0gJ2VuZFpvbmUxJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnIzc0NTYyNSc7XG4gIH1cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnZW5kWm9uZTInKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcjNzQ1NjI1JztcbiAgfVxufVxuZnVuY3Rpb24gaGFuZGxlRHJhZ0xlYXZlKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnc3RhcnRab25lJykge1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgfVxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT09ICdlbmRab25lMScpIHtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gIH1cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09PSAnZW5kWm9uZTInKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZURyb3AoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAvLyBwcmV2ZW50IGRlZmF1bHQgYWN0aW9uIChvcGVuIGFzIGxpbmsgZm9yIHNvbWUgZWxlbWVudHMpXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgLy8gbW92ZSBkcmFnZ2VkIGVsZW0gdG8gdGhlIHNlbGVjdGVkIGRyb3AgdGFyZ2V0XG4gIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5pZCA9PSAnZW5kWm9uZTEnKSB7XG4gICAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgYWxlcnQoJ09ubHkgb25lIGNoYXJhY3RlciBpcyBhbGxvd2VkLicpO1xuICAgICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICBkcmFnZ2VkLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZHJhZ2dlZCk7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuYXBwZW5kQ2hpbGQoZHJhZ2dlZCk7XG4gICAgZ2FtZVN0b3JhZ2Uuc2V0KCdwbGF5ZXIxSW5kZXgnLCBgJHtkcmFnZ2VkLmdldEF0dHJpYnV0ZSgna2V5Jyl9YCk7XG4gIH1cblxuICBpZiAoKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuaWQgPT0gJ2VuZFpvbmUyJykge1xuICAgIGlmICgoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIGFsZXJ0KCdPbmx5IG9uZSBjaGFyYWN0ZXIgaXMgYWxsb3dlZC4nKTtcbiAgICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgZHJhZ2dlZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRyYWdnZWQpO1xuICAgIChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmFwcGVuZENoaWxkKGRyYWdnZWQpO1xuICAgIGdhbWVTdG9yYWdlLnNldCgncGxheWVyMkluZGV4JywgYCR7ZHJhZ2dlZC5nZXRBdHRyaWJ1dGUoJ2tleScpfWApO1xuICB9XG5cbiAgaWYgKChldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmlkID09ICdzdGFydFpvbmUnKSB7XG4gICAgKGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudCkuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgIGRyYWdnZWQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkcmFnZ2VkKTtcbiAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5hcHBlbmRDaGlsZChkcmFnZ2VkKTtcbiAgICBjb25zb2xlLmxvZyhkcmFnZ2VkKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVEcmFnKCkge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBoYW5kbGVEcmFnU3RhcnQpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgaGFuZGxlRHJhZ0VuZCk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgaGFuZGxlRHJhZ092ZXIpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBoYW5kbGVEcmFnRW50ZXIpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBoYW5kbGVEcmFnTGVhdmUpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgaGFuZGxlRHJvcCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZURyYWc7XG4iLCJpbXBvcnQgeyBwbGF5ZXIxU2VsZWN0aW9uLCBwbGF5ZXIyU2VsZWN0aW9uIH0gZnJvbSAnLi91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IHsgaGFzU2VsZWN0ZWQgfSBmcm9tICcuL3V0aWwvaGFzU2VsZWN0ZWQnO1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZVNlbGVjdGlvbigpOiB2b2lkIHtcbiAgY29uc3QgaGFzUGxheWVyMVNlbGVjdGVkID0gaGFzU2VsZWN0ZWQocGxheWVyMVNlbGVjdGlvbik7XG4gIGNvbnN0IGhhc1BsYXllcjJTZWxlY3RlZCA9IGhhc1NlbGVjdGVkKHBsYXllcjJTZWxlY3Rpb24pO1xuICBpZiAoaGFzUGxheWVyMVNlbGVjdGVkICYmIGhhc1BsYXllcjJTZWxlY3RlZCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2dhbWUuaHRtbCc7XG4gIH0gZWxzZSB7XG4gICAgYWxlcnQoJ1NlbGVjdCBjaGFyYWN0ZXIgZmlyc3QsIHRoZW4gc3RhcnQgdGhlIGdhbWUnKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2FtZVN0b3JhZ2UgfSBmcm9tICcuLy4uL2luZGV4JztcbmltcG9ydCB7XG4gIHNob3dEaWNlUmVzdWx0LFxuICB1cGRhdGVQbGF5ZXIxQnV0dG9uLFxuICByb2xsRGljZSxcbiAgZGlzcGxheVBsYXllcnMsXG4gIHJlbW92ZVBsYXllcixcbiAgY2hlY2tXaW5uZXIsXG4gIGdhbWVFbmQsXG4gIHRyYXBzLFxuICBzaG93TWVzc2FnZSxcbiAgZGVsZXRlTWVzc2FnZSxcbn0gZnJvbSAnLi91dGlsL2dhbWVIZWxwZXJzJztcbmltcG9ydCB7IGRpY2VDb250YWluZXIsIHBsYXllcjFCdG4sIHBsYXllcjJCdG4gfSBmcm9tICcuL3V0aWwvY29udGFpbmVycyc7XG5pbXBvcnQgeyBXaW5uZXIgYXMgV2lubmVyVHlwZXMgfSBmcm9tICcuLi9zY3JpcHRzL3Nob3dXaW5uZXInO1xuXG5mdW5jdGlvbiBwbGF5R2FtZShwbGF5ZXIxOiBudW1iZXIsIHBsYXllcjI6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBzdGFydFBvc2l0aW9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aWxlLWluZGV4LTEnKTtcbiAgY29uc3QgZmluYWxQb3NpdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aWxlLWluZGV4LTMwJyk7XG5cbiAgbGV0IHBsYXllcjFTdGF0dXM6IG51bWJlciA9IDE7XG4gIGxldCBwbGF5ZXIyU3RhdHVzOiBudW1iZXIgPSAxO1xuXG4gIGRpc3BsYXlQbGF5ZXJzKHN0YXJ0UG9zaXRpb24sIHBsYXllcjEpO1xuICBkaXNwbGF5UGxheWVycyhzdGFydFBvc2l0aW9uLCBwbGF5ZXIyKTtcbiAgdXBkYXRlUGxheWVyMUJ1dHRvbih0cnVlKTtcbiAgcGxheWVyMUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1blBsYXllcjFUdXJuLCBmYWxzZSk7XG4gIHBsYXllcjJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW5QbGF5ZXIyVHVybiwgZmFsc2UpO1xuXG4gIGZ1bmN0aW9uIHJ1blBsYXllcjFUdXJuKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnREaWNlUG9pbnQgPSByb2xsRGljZSgpO1xuICAgIHNob3dEaWNlUmVzdWx0KGRpY2VDb250YWluZXIsIGN1cnJlbnREaWNlUG9pbnQpO1xuICAgIHBsYXllcjFTdGF0dXMgKz0gY3VycmVudERpY2VQb2ludDtcblxuICAgIGlmIChjaGVja1dpbm5lcihwbGF5ZXIxU3RhdHVzKSkge1xuICAgICAgY29uc3Qgd2lubmVyOiBXaW5uZXJUeXBlcyA9IHtcbiAgICAgICAgaW5kZXg6IHBsYXllcjEsXG4gICAgICAgIG5hbWU6ICdQbGF5ZXIgMScsXG4gICAgICB9O1xuICAgICAgZ2FtZVN0b3JhZ2Uuc2V0U2VyaWFsaXplKCd3aW5uZXInLCB3aW5uZXIpO1xuICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjEpO1xuICAgICAgZGlzcGxheVBsYXllcnMoZmluYWxQb3NpdGlvbiwgcGxheWVyMSk7XG4gICAgICBnYW1lRW5kKHBsYXllcjEpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnd2lubmVyLmh0bWwnO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHVwZGF0ZVBvc2l0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRpbGUtaW5kZXgtJHtwbGF5ZXIxU3RhdHVzfWApO1xuICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjEpO1xuICAgICAgZGlzcGxheVBsYXllcnModXBkYXRlUG9zaXRpb24sIHBsYXllcjEpO1xuXG4gICAgICB0cmFwcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudC50b2tlbiA9PSBwbGF5ZXIxU3RhdHVzKSB7XG4gICAgICAgICAgY29uc3QgeyBhY3Rpb24sIG1lc3NhZ2UgfSA9IGVsZW1lbnQ7XG4gICAgICAgICAgcGxheWVyMVN0YXR1cyAtPSBhY3Rpb247XG4gICAgICAgICAgY29uc3QgbmV3UG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGlsZS1pbmRleC0ke3BsYXllcjFTdGF0dXN9YCk7XG5cbiAgICAgICAgICBzaG93TWVzc2FnZShgJHttZXNzYWdlfWApO1xuICAgICAgICAgIGRlbGV0ZU1lc3NhZ2UoKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZW1vdmVQbGF5ZXIocGxheWVyMSk7XG4gICAgICAgICAgICBkaXNwbGF5UGxheWVycyhuZXdQb3NpdGlvbiwgcGxheWVyMSk7XG4gICAgICAgICAgfSwgMzAwMCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB1cGRhdGVQbGF5ZXIxQnV0dG9uKGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudERpY2VQb2ludCA9PT0gNikge1xuICAgICAgc2hvd01lc3NhZ2UoJ1NpbmNlIHlvdSByb2xsZWQgNiwgeW91IGdvdCBhIEJvbnVzIG1vdmVtZW50LiBSb2xsIHRoZSBkaWNlIGFnYWluJyk7XG4gICAgICBkZWxldGVNZXNzYWdlKCk7XG4gICAgICB1cGRhdGVQbGF5ZXIxQnV0dG9uKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJ1blBsYXllcjJUdXJuKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnREaWNlUG9pbnQgPSByb2xsRGljZSgpO1xuICAgIHNob3dEaWNlUmVzdWx0KGRpY2VDb250YWluZXIsIGN1cnJlbnREaWNlUG9pbnQpO1xuICAgIHBsYXllcjJTdGF0dXMgKz0gY3VycmVudERpY2VQb2ludDtcblxuICAgIGlmIChjaGVja1dpbm5lcihwbGF5ZXIyU3RhdHVzKSkge1xuICAgICAgY29uc3Qgd2lubmVyOiBXaW5uZXJUeXBlcyA9IHtcbiAgICAgICAgaW5kZXg6IHBsYXllcjIsXG4gICAgICAgIG5hbWU6ICdQbGF5ZXIgMicsXG4gICAgICB9O1xuICAgICAgZ2FtZVN0b3JhZ2Uuc2V0U2VyaWFsaXplKCd3aW5uZXInLCB3aW5uZXIpO1xuICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjIpO1xuICAgICAgZGlzcGxheVBsYXllcnMoZmluYWxQb3NpdGlvbiwgcGxheWVyMik7XG4gICAgICBnYW1lRW5kKHBsYXllcjIpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnd2lubmVyLmh0bWwnO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHVwZGF0ZVBvc2l0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHRpbGUtaW5kZXgtJHtwbGF5ZXIyU3RhdHVzfWApO1xuICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjIpO1xuICAgICAgZGlzcGxheVBsYXllcnModXBkYXRlUG9zaXRpb24sIHBsYXllcjIpO1xuXG4gICAgICB0cmFwcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudC50b2tlbiA9PSBwbGF5ZXIyU3RhdHVzKSB7XG4gICAgICAgICAgY29uc3QgeyBhY3Rpb24sIG1lc3NhZ2UgfSA9IGVsZW1lbnQ7XG4gICAgICAgICAgcGxheWVyMlN0YXR1cyAtPSBhY3Rpb247XG4gICAgICAgICAgY29uc3QgbmV3UG9zaXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdGlsZS1pbmRleC0ke3BsYXllcjJTdGF0dXN9YCk7XG4gICAgICAgICAgY29uc29sZS5sb2cobmV3UG9zaXRpb24pO1xuXG4gICAgICAgICAgc2hvd01lc3NhZ2UoYCR7bWVzc2FnZX1gKTtcbiAgICAgICAgICBkZWxldGVNZXNzYWdlKCk7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVtb3ZlUGxheWVyKHBsYXllcjIpO1xuICAgICAgICAgICAgZGlzcGxheVBsYXllcnMobmV3UG9zaXRpb24sIHBsYXllcjIpO1xuICAgICAgICAgIH0sIDMwMDApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdXBkYXRlUGxheWVyMUJ1dHRvbih0cnVlKTtcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudERpY2VQb2ludCA9PT0gNikge1xuICAgICAgc2hvd01lc3NhZ2UoJ1NpbmNlIHlvdSByb2xsZWQgNiwgeW91IGdvdCBhIEJvbnVzIG1vdmVtZW50LiBSb2xsIHRoZSBkaWNlIGFnYWluJyk7XG4gICAgICBkZWxldGVNZXNzYWdlKCk7XG4gICAgICB1cGRhdGVQbGF5ZXIxQnV0dG9uKGZhbHNlKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcGxheUdhbWU7XG4iLCJpbXBvcnQgeyBjaGFyYWN0ZXJMaXN0IH0gZnJvbSAnLi91dGlsL2NvbnRhaW5lcnMnO1xuaW1wb3J0IHsgUmVzcG9uc2VPYmpUeXBlcyB9IGZyb20gJy4vdXRpbC90eXBlcyc7XG5pbXBvcnQgY3JlYXRlSW1hZ2UgZnJvbSAnLi91dGlsL2NyZWF0ZUltYWdlJztcblxuY29uc3QgQkFTRV9VUkw6IHN0cmluZyA9ICdodHRwczovL3d3dy5hbmFwaW9maWNlYW5kZmlyZS5jb20vYXBpL2NoYXJhY3RlcnMvJztcblxuZnVuY3Rpb24gZ2V0Q2hhcmFjdGVyQ2FyZHMoY2hhcmFjdGVySW5kZXg6IG51bWJlcltdKSB7XG4gIGNoYXJhY3RlckluZGV4Lm1hcChlbGVtZW50ID0+IHtcbiAgICBzaG93Q2hhcmFjdGVyKGVsZW1lbnQpO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2hvd0NoYXJhY3RlcihjaGFyYWN0ZXJOYW1lSW5kZXg6IG51bWJlcikge1xuICBjb25zdCB1cmwgPSBgJHtCQVNFX1VSTH0ke2NoYXJhY3Rlck5hbWVJbmRleH1gO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgIGNvbnN0IGRhdGE6IFJlc3BvbnNlT2JqVHlwZXMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc3QgeyBuYW1lLCB0aXRsZXMsIGFsaWFzZXMgfSA9IGRhdGE7XG5cbiAgICBjb25zdCBjb21wb25lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb21wb25lbnQuY2xhc3NOYW1lID0gJ3Jvd19faXRlbS0tY2FyZCc7XG4gICAgY29tcG9uZW50LnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcbiAgICBjb21wb25lbnQuc2V0QXR0cmlidXRlKCdrZXknLCBgJHtjaGFyYWN0ZXJOYW1lSW5kZXh9YCk7XG4gICAgY29uc3QgY2FyZEltYWdlID0gYDxpbWcgZHJhZ2dhYmxlPVwiZmFsc2VcIiBzcmM9JHtjcmVhdGVJbWFnZShcbiAgICAgIGNoYXJhY3Rlck5hbWVJbmRleCxcbiAgICApfSBjbGFzcz1cIml0ZW0tLWNhcmQtaW1hZ2VcIiBhbHQ9XCJHYW1lIGZpZ3VyZSBuby4ke2NoYXJhY3Rlck5hbWVJbmRleH1cIj5gO1xuICAgIGNvbnN0IGNhcmRUaXRsZSA9IGAgPGgzPiR7bmFtZX08L2gzPmA7XG4gICAgY29uc3QgY2FyZFN1YlRpdGxlID0gYDxzcGFuPiR7dGl0bGVzWzBdID8gdGl0bGVzWzBdIDogYWxpYXNlc1swXX08L3NwYW4+YDtcbiAgICBjb21wb25lbnQuaW5uZXJIVE1MID0gY2FyZEltYWdlICsgY2FyZFRpdGxlICsgY2FyZFN1YlRpdGxlO1xuXG4gICAgY2hhcmFjdGVyTGlzdC5hcHBlbmQoY29tcG9uZW50KTtcblxuICAgIHJldHVybiBkYXRhO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBlcnI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0Q2hhcmFjdGVyQ2FyZHM7XG4iLCJpbXBvcnQgeyBjb25ncmF0dWxhdGlvbk1lc3NhZ2UsIHdpbm5lckNvbnRhaW5lciB9IGZyb20gJy4vdXRpbC9jb250YWluZXJzJztcbmltcG9ydCBjcmVhdGVJbWFnZSBmcm9tICcuL3V0aWwvY3JlYXRlSW1hZ2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFdpbm5lciB7XG4gIGluZGV4OiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbn1cblxuZnVuY3Rpb24gc2hvd1dpbm5lcih7IGluZGV4LCBuYW1lIH06IFdpbm5lcik6IHZvaWQge1xuICBpZiAod2lubmVyQ29udGFpbmVyICE9IG51bGwpIHtcbiAgICBjb25zdCB3aW5uZXJJbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIHdpbm5lckltYWdlLmNsYXNzTmFtZSA9ICdpdGVtIGl0ZW0tLXdpbm5lci1pbWFnZSBpdGVtLS1zaGFrZSc7XG4gICAgd2lubmVySW1hZ2Uuc3JjID0gYCR7Y3JlYXRlSW1hZ2UoaW5kZXgpfWA7XG4gICAgd2lubmVySW1hZ2UuYWx0ID0gJ0ZlYXR1cmVkIGltYWdlIGZvciB0aGUgd2lubmVyJztcbiAgICB3aW5uZXJDb250YWluZXIuYXBwZW5kQ2hpbGQod2lubmVySW1hZ2UpO1xuICB9XG5cbiAgaWYgKGNvbmdyYXR1bGF0aW9uTWVzc2FnZSAhPSBudWxsKSB7XG4gICAgY29uZ3JhdHVsYXRpb25NZXNzYWdlLmlubmVyVGV4dCA9IGAke25hbWV9IGNsYWltZWQgdGhlIGNyb3duIWA7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2hvd1dpbm5lcjtcbiIsImNvbnN0IHNhbXdlbGw6IG51bWJlciA9IDk1NDtcbmNvbnN0IGpvbjogbnVtYmVyID0gNTgzO1xuY29uc3QgY2Vyc2VpOiBudW1iZXIgPSAyMzg7XG5jb25zdCB0eXJpb246IG51bWJlciA9IDEwNTI7XG5jb25zdCBkYWVuZXJ5czogbnVtYmVyID0gMjcxO1xuY29uc3Qgc2Fuc2E6IG51bWJlciA9IDk1NztcbmNvbnN0IHZhcnlzOiBudW1iZXIgPSAyMDY5O1xuY29uc3QgYmVyaWM6IG51bWJlciA9IDE5MDtcbmNvbnN0IGpveWV1c2U6IG51bWJlciA9IDYwMDtcbmNvbnN0IG1hbHd5bjogbnVtYmVyID0gNzAwO1xuY29uc3QgbWVycmVsbDogbnVtYmVyID0gNzUwO1xuY29uc3QgYWVtb246IG51bWJlciA9IDUwO1xuXG5jb25zdCBjaGFyYWN0ZXJJbmRleDogbnVtYmVyW10gPSBbXG4gIHNhbXdlbGwsXG4gIGpvbixcbiAgY2Vyc2VpLFxuICB0eXJpb24sXG4gIGRhZW5lcnlzLFxuICBzYW5zYSxcbiAgdmFyeXMsXG4gIGJlcmljLFxuICBqb3lldXNlLFxuICBtYWx3eW4sXG4gIG1lcnJlbGwsXG4gIGFlbW9uLFxuXTtcbmV4cG9ydCBkZWZhdWx0IGNoYXJhY3RlckluZGV4O1xuIiwiLy9wYWdlOnNlbGVjdC1wbGF5ZXJcbmV4cG9ydCBjb25zdCBjaGFyYWN0ZXJMaXN0OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydFpvbmUnKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXIxU2VsZWN0aW9uOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmRab25lMScpO1xuZXhwb3J0IGNvbnN0IHBsYXllcjJTZWxlY3Rpb246IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZFpvbmUyJyk7XG5leHBvcnQgY29uc3QgdmFsaWRhdGVTZWxlY3Rpb25CdG46IEhUTUxBbmNob3JFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN0YS0tdmFsaWRhdGlvbicpO1xuXG4vL3BhZ2U6Z2FtZVxuZXhwb3J0IGNvbnN0IGJvYXJkOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lQm9hcmQnKTtcbmV4cG9ydCBjb25zdCBkaWNlQ29udGFpbmVyOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWNlSW1hZ2UnKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXIxQnRuOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tLVBsYXllcjEnKTtcbmV4cG9ydCBjb25zdCBwbGF5ZXIyQnRuOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tLVBsYXllcjInKTtcbmV4cG9ydCBjb25zdCBvdmVybGF5OiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5Jyk7XG5leHBvcnQgY29uc3QgbWVzc2FnZTogSFRNTEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZScpO1xuXG4vL3BhZ2U6d2lubmVyXG5leHBvcnQgY29uc3Qgd2lubmVyQ29udGFpbmVyOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3aW5uZXInKTtcbmV4cG9ydCBjb25zdCBjb25ncmF0dWxhdGlvbk1lc3NhZ2U6IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbmdyYXR1bGF0aW9uJyk7XG5leHBvcnQgY29uc3QgcmVzZXRCdG46IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0Jyk7XG4iLCJmdW5jdGlvbiBjcmVhdGVJbWFnZShpbmRleDogbnVtYmVyKSB7XG4gIHJldHVybiBgaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZG5rZmdtenkxL2ltYWdlL3VwbG9hZC92MTU3NTU0OTY3NC9nYW1lLyR7aW5kZXh9LnBuZ2A7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUltYWdlO1xuIiwiZXhwb3J0IGNvbnN0IGRpY2VJY29ucyA9IHtcbiAgcG9pbnQxOlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzek0yNTYgMjA2YTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwelwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQyOlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptMzE2Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bS0yNjggMjY4QTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICBwb2ludDM6XG4gICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiIHN0eWxlPVwiaGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDtcIj48cmVjdCBmaWxsPVwiIzAwMFwiIGZpbGwtb3BhY2l0eT1cIjFcIiBoZWlnaHQ9XCI1MTJcIiB3aWR0aD1cIjUxMlwiIHJ4PVwiMzJcIiByeT1cIjMyXCI+PC9yZWN0PjxnIGNsYXNzPVwiXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKDAsMClcIiBzdHlsZT1cInRvdWNoLWFjdGlvbjogbm9uZTtcIj48cGF0aCBkPVwiTTc0LjUgMzZBMzguNSAzOC41IDAgMCAwIDM2IDc0LjV2MzYzQTM4LjUgMzguNSAwIDAgMCA3NC41IDQ3NmgzNjNhMzguNSAzOC41IDAgMCAwIDM4LjUtMzguNXYtMzYzQTM4LjUgMzguNSAwIDAgMCA0MzcuNSAzNmgtMzYzem0zMTYuOTcgMzYuMDNBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pNMjU2IDIwNmE1MCA1MCAwIDAgMSAwIDEwMCA1MCA1MCAwIDAgMSAwLTEwMHpNMTIzLjQ3IDM0MC4wM0E1MCA1MCAwIDAgMSAxNzIgMzkwYTUwIDUwIDAgMCAxLTEwMCAwIDUwIDUwIDAgMCAxIDUxLjQ3LTQ5Ljk3elwiIGZpbGw9XCIjZmZmXCIgZmlsbC1vcGFjaXR5PVwiMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgcG9pbnQ0OlxuICAgICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDUxMiA1MTJcIiBzdHlsZT1cImhlaWdodDogODBweDsgd2lkdGg6IDgwcHg7XCI+PHJlY3QgZmlsbD1cIiMwMDBcIiBmaWxsLW9wYWNpdHk9XCIxXCIgaGVpZ2h0PVwiNTEyXCIgd2lkdGg9XCI1MTJcIiByeD1cIjMyXCIgcnk9XCIzMlwiPjwvcmVjdD48ZyBjbGFzcz1cIlwiIHRyYW5zZm9ybT1cInRyYW5zbGF0ZSgwLDApXCIgc3R5bGU9XCJ0b3VjaC1hY3Rpb246IG5vbmU7XCI+PHBhdGggZD1cIk03NC41IDM2QTM4LjUgMzguNSAwIDAgMCAzNiA3NC41djM2M0EzOC41IDM4LjUgMCAwIDAgNzQuNSA0NzZoMzYzYTM4LjUgMzguNSAwIDAgMCAzOC41LTM4LjV2LTM2M0EzOC41IDM4LjUgMCAwIDAgNDM3LjUgMzZoLTM2M3ptNDguOTcgMzYuMDNBNTAgNTAgMCAwIDEgMTcyIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDEyMmE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptLTI2OCAyNjhBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50NTpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTQ4Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDE3MiAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6TTI1NiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6TTEyMy40NyAzNDAuMDNBNTAgNTAgMCAwIDEgMTcyIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3ptMjY4IDBBNTAgNTAgMCAwIDEgNDQwIDM5MGE1MCA1MCAwIDAgMS0xMDAgMCA1MCA1MCAwIDAgMSA1MS40Ny00OS45N3pcIiBmaWxsPVwiI2ZmZlwiIGZpbGwtb3BhY2l0eT1cIjFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gIHBvaW50NjpcbiAgICAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCIgc3R5bGU9XCJoZWlnaHQ6IDgwcHg7IHdpZHRoOiA4MHB4O1wiPjxyZWN0IGZpbGw9XCIjMDAwXCIgZmlsbC1vcGFjaXR5PVwiMVwiIGhlaWdodD1cIjUxMlwiIHdpZHRoPVwiNTEyXCIgcng9XCIzMlwiIHJ5PVwiMzJcIj48L3JlY3Q+PGcgY2xhc3M9XCJcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwwKVwiIHN0eWxlPVwidG91Y2gtYWN0aW9uOiBub25lO1wiPjxwYXRoIGQ9XCJNNzQuNSAzNkEzOC41IDM4LjUgMCAwIDAgMzYgNzQuNXYzNjNBMzguNSAzOC41IDAgMCAwIDc0LjUgNDc2aDM2M2EzOC41IDM4LjUgMCAwIDAgMzguNS0zOC41di0zNjNBMzguNSAzOC41IDAgMCAwIDQzNy41IDM2aC0zNjN6bTQ4Ljk3IDM2LjAzQTUwIDUwIDAgMCAxIDE3MiAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAxMjJhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6TTEyMiAyMDZhNTAgNTAgMCAwIDEgMCAxMDAgNTAgNTAgMCAwIDEgMC0xMDB6bTI2OCAwYTUwIDUwIDAgMCAxIDAgMTAwIDUwIDUwIDAgMCAxIDAtMTAwek0xMjMuNDcgMzQwLjAzQTUwIDUwIDAgMCAxIDE3MiAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6bTI2OCAwQTUwIDUwIDAgMCAxIDQ0MCAzOTBhNTAgNTAgMCAwIDEtMTAwIDAgNTAgNTAgMCAwIDEgNTEuNDctNDkuOTd6XCIgZmlsbD1cIiNmZmZcIiBmaWxsLW9wYWNpdHk9XCIxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxufTtcblxuZXhwb3J0IGNvbnN0IGRpY2VBcnJheTogc3RyaW5nW10gPSBbXG4gIGRpY2VJY29ucy5wb2ludDEsXG4gIGRpY2VJY29ucy5wb2ludDIsXG4gIGRpY2VJY29ucy5wb2ludDMsXG4gIGRpY2VJY29ucy5wb2ludDQsXG4gIGRpY2VJY29ucy5wb2ludDUsXG4gIGRpY2VJY29ucy5wb2ludDYsXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGljZUljb24oZGljZVBvaW50OiBudW1iZXIpIHtcbiAgcmV0dXJuIGRpY2VBcnJheVtkaWNlUG9pbnQgLSAxXTtcbn1cbiIsImltcG9ydCB7IHBsYXllcjFCdG4sIHBsYXllcjJCdG4sIG92ZXJsYXksIG1lc3NhZ2UgfSBmcm9tICcuL2NvbnRhaW5lcnMnO1xuaW1wb3J0IHsgZGljZUFycmF5IH0gZnJvbSAnLi9kaWNlJztcbmltcG9ydCBjcmVhdGVJbWFnZSBmcm9tICcuL2NyZWF0ZUltYWdlJztcblxuaW50ZXJmYWNlIHRyYXAge1xuICB0b2tlbjogbnVtYmVyO1xuICBhY3Rpb246IG51bWJlcjtcbiAgbWVzc2FnZTogc3RyaW5nO1xufVxuXG5jb25zdCB0cmFwMTogdHJhcCA9IHtcbiAgdG9rZW46IDgsXG4gIGFjdGlvbjogMSxcbiAgbWVzc2FnZTogJ1BpcmF0ZXMgYWhlYWQhIFJldHJlYXQgb25lIGZpZWxkIHRvIGF2b2lkIGJlaW5nIG5vdGljZWQuJyxcbn07XG5cbmNvbnN0IHRyYXAyOiB0cmFwID0ge1xuICB0b2tlbjogMTQsXG4gIGFjdGlvbjogMixcbiAgbWVzc2FnZTogJ0Egd29sZiBlbWVyZ2VzIGZyb20gdGhlIG5pZ2h0IHdvb2RzLiBSZXRyZWF0IHR3byBmaWVsZHMgdG8gZXNjYXBlIGl0cyBjaGFzZS4nLFxufTtcblxuY29uc3QgdHJhcDM6IHRyYXAgPSB7XG4gIHRva2VuOiAxOCxcbiAgYWN0aW9uOiAzLFxuICBtZXNzYWdlOlxuICAgICdBIHdoaXRlIHdhbGtlciBoYXMgYmVlbiBzcG90dGVkISBJbW1lZGlhdGVseSByZXRyZWF0IHRocmVlIGZpZWxkcyB0byBuYXJyb3dseSBlc2NhcGUgZGVhdGguJyxcbn07XG5cbmNvbnN0IHRyYXA0OiB0cmFwID0ge1xuICB0b2tlbjogMjQsXG4gIGFjdGlvbjogNCxcbiAgbWVzc2FnZTogJ0VuZW15IGhvcnNlbWVuIG9uIHRoZSBob3Jpem9uISBPdXRudW1iZXJlZCwgeW91IG11c3QgcmV0cmVhdCBmb3VyIGZpZWxkcycsXG59O1xuXG5jb25zdCB0cmFwNTogdHJhcCA9IHtcbiAgdG9rZW46IDI4LFxuICBhY3Rpb246IDUsXG4gIG1lc3NhZ2U6ICdGaXJlLWJyZWF0aGluZyBkcmFnb25zIGFwcGVhciEgUmV0cmVhdCBmaXZlIGZpZWxkcyB0byBlc2NhcGUgdGhlaXIgbG9uZyBnYXplLicsXG59O1xuXG5leHBvcnQgY29uc3QgdHJhcHM6IHRyYXBbXSA9IFt0cmFwMSwgdHJhcDIsIHRyYXAzLCB0cmFwNCwgdHJhcDVdO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQm9hcmQoY29udGFpbmVyOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICBmb3IgKGxldCBpOiBudW1iZXIgPSAxOyBpIDw9IDMwOyBpKyspIHtcbiAgICBjb25zdCB0aWxlOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRpbGUuY2xhc3NOYW1lID0gYGJvYXJkX190aWxlYDtcbiAgICB0aWxlLnNldEF0dHJpYnV0ZSgnaWQnLCBgdGlsZS1pbmRleC0ke2l9YCk7XG4gICAgdGlsZS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9J3RpbGVfX251bWJlcic+JHtpfTwvc3Bhbj5gO1xuXG4gICAgaWYgKGkgJSAyICE9PSAwKSB7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdicm93bic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3doaXRlJztcbiAgICB9XG5cbiAgICB0cmFwcy5tYXAoZWxlbWVudCA9PiB7XG4gICAgICBpZiAoZWxlbWVudC50b2tlbiA9PT0gaSkge1xuICAgICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd5ZWxsb3cnO1xuICAgICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJ2h0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2Rua2ZnbXp5MS9pbWFnZS91cGxvYWQvdjE1NzU2NTU3MzQvZ2FtZS90cmFwJHtlbGVtZW50LmFjdGlvbn0uc3ZnJylgO1xuICAgICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRTaXplID0gJzRyZW0nO1xuICAgICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSAnbm8tcmVwZWF0JztcbiAgICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSAnY2VudGVyIGNlbnRlcic7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoaSA9PSAzMCkge1xuICAgICAgdGlsZS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCdodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kbmtmZ216eTEvaW1hZ2UvdXBsb2FkL3YxNTc1NjU1NTUzL2dhbWUvdGhyb25lLnN2ZycpYDtcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnNHJlbSc7XG4gICAgICB0aWxlLnN0eWxlLmJhY2tncm91bmRSZXBlYXQgPSAnbm8tcmVwZWF0JztcbiAgICAgIHRpbGUuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlciBjZW50ZXInO1xuICAgIH1cblxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aWxlKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlUGxheWVyMUJ1dHRvbihpc1BsYXllcjFUdXJuOiBib29sZWFuKTogdm9pZCB7XG4gIGlmIChpc1BsYXllcjFUdXJuKSB7XG4gICAgcGxheWVyMUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIHBsYXllcjJCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHBsYXllcjFCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIHBsYXllcjJCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0RpY2VSZXN1bHQoY29udGFpbmVyOiBIVE1MRWxlbWVudCwgcG9pbnQ6IG51bWJlcikge1xuICBjb250YWluZXIuaW5uZXJIVE1MID0gZGljZUFycmF5W3BvaW50IC0gMV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb2xsRGljZSgpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNikgKyAxO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlUGxheWVyKHBsYXllcjogbnVtYmVyKTogdm9pZCB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBmaWd1cmUtJHtwbGF5ZXJ9YCkucmVtb3ZlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5UGxheWVycyhjb250YWluZXI6IEhUTUxFbGVtZW50LCBwbGF5ZXJJbmRleDogbnVtYmVyKSB7XG4gIGNvbnN0IHBsYXllcjogSFRNTEltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gIHBsYXllci5zcmMgPSBgJHtjcmVhdGVJbWFnZShwbGF5ZXJJbmRleCl9YDtcblxuICBwbGF5ZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdib2FyZF9fZmlndXJlJyk7XG5cbiAgcGxheWVyLnNldEF0dHJpYnV0ZSgnYWx0JywgYEdhbWUgZmlndXJlIG5vLiR7cGxheWVySW5kZXh9YCk7XG5cbiAgcGxheWVyLnNldEF0dHJpYnV0ZSgnaWQnLCBgZmlndXJlLSR7cGxheWVySW5kZXh9YCk7XG5cbiAgaWYgKGNvbnRhaW5lciAhPSBudWxsKSB7XG4gICAgY29udGFpbmVyLmFwcGVuZChwbGF5ZXIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1dpbm5lcihwbGF5ZXJTdGF0dXM6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gcGxheWVyU3RhdHVzID49IDMwID8gdHJ1ZSA6IGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2FtZUVuZCh3aW5uZXI6IG51bWJlcikge1xuICBwbGF5ZXIxQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgcGxheWVyMkJ0bi5kaXNhYmxlZCA9IHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93TWVzc2FnZShjb250ZW50OiBzdHJpbmcpIHtcbiAgbWVzc2FnZS5pbm5lclRleHQgPSBjb250ZW50O1xuICBvdmVybGF5LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVNZXNzYWdlKCkge1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIG92ZXJsYXkuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICB9LCAxNTAwKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBoYXNTZWxlY3RlZChjb250YWluZXI6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gIHJldHVybiBjb250YWluZXIuaGFzQ2hpbGROb2RlcygpO1xufVxuIiwiY2xhc3MgU3RvcmFnZSB7XG4gIHByaXZhdGUgc3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG5cbiAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gIH1cblxuICBnZXQoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICB9XG5cbiAgZGVsZXRlKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgfVxuXG4gIHNldFNlcmlhbGl6ZShrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuc2V0KGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcbiAgfVxuXG4gIGdldFVuc2VyaWFsaXplPFQ+KGtleTogc3RyaW5nKTogVCB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0KGtleSk7XG5cbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpIGFzIFQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RvcmFnZTtcbiJdfQ==
