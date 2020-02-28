// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function(modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})(
  {
    TV2N: [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });

        var index_1 = require('./index');

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
      { './index': 'KqmS' },
    ],
    xBI4: [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });
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
    mxTk: [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });

        function hasSelected(container) {
          return container.hasChildNodes();
        }

        exports.hasSelected = hasSelected;
      },
      {},
    ],
    Q142: [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });

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
      { './util/containers': 'xBI4', './util/hasSelected': 'mxTk' },
    ],
    fIe4: [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });
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
    JtL7: [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });

        function createImage(index) {
          return (
            'https://res.cloudinary.com/dnkfgmzy1/image/upload/v1575549674/game/' + index + '.png'
          );
        }

        exports.default = createImage;
      },
      {},
    ],
    fbZQ: [
      function(require, module, exports) {
        'use strict';

        var __importDefault =
          (this && this.__importDefault) ||
          function(mod) {
            return mod && mod.__esModule
              ? mod
              : {
                  default: mod,
                };
          };

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });

        var containers_1 = require('./containers');

        var dice_1 = require('./dice');

        var createImage_1 = __importDefault(require('./createImage'));

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
          var _loop_1 = function _loop_1(i) {
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
          containers_1.overlay.style.display = 'block';
        }

        exports.showMessage = showMessage;

        function deleteMessage() {
          setTimeout(function() {
            containers_1.overlay.style.display = 'none';
          }, 1500);
        }

        exports.deleteMessage = deleteMessage;
      },
      { './containers': 'xBI4', './dice': 'fIe4', './createImage': 'JtL7' },
    ],
    lNZh: [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });

        var index_1 = require('./index');

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
      { './index': 'KqmS', './util/gameHelpers': 'fbZQ', './util/containers': 'xBI4' },
    ],
    iLsJ: [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });

        function gameLoader() {
          setTimeout(function() {
            var element = document.getElementsByClassName('loading')[0];
            element.innerHTML = '';
            element.classList.remove('loading');
          }, 3000);
        }

        exports.default = gameLoader;
      },
      {},
    ],
    IgTL: [
      function(require, module, exports) {
        'use strict';

        var __awaiter =
          (this && this.__awaiter) ||
          function(thisArg, _arguments, P, generator) {
            function adopt(value) {
              return value instanceof P
                ? value
                : new P(function(resolve) {
                    resolve(value);
                  });
            }

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
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
              }

              step((generator = generator.apply(thisArg, _arguments || [])).next());
            });
          };

        var __generator =
          (this && this.__generator) ||
          function(thisArg, body) {
            var _ = {
                label: 0,
                sent: function sent() {
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
              (g = {
                next: verb(0),
                throw: verb(1),
                return: verb(2),
              }),
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

              while (_) {
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
                      return {
                        value: op[1],
                        done: false,
                      };

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
              }

              if (op[0] & 5) throw op[1];
              return {
                value: op[0] ? op[1] : void 0,
                done: true,
              };
            }
          };

        var __importDefault =
          (this && this.__importDefault) ||
          function(mod) {
            return mod && mod.__esModule
              ? mod
              : {
                  default: mod,
                };
          };

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });

        var containers_1 = require('./util/containers');

        var createImage_1 = __importDefault(require('./util/createImage'));

        var gameLoader_1 = __importDefault(require('../scripts/gameLoader'));

        var BASE_URL = 'https://www.anapioficeandfire.com/api/characters/';

        function getCharacterCards(characterIndex) {
          gameLoader_1.default();
          characterIndex.map(function(element) {
            showCharacter(element);
          });
        }

        function showCharacter(characterNameIndex) {
          return __awaiter(this, void 0, void 0, function() {
            var url,
              response,
              data,
              name,
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
                  (name = data.name), (titles = data.titles);
                  placeHolder = 'Humble Man Without Title';
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
                  cardTitle = ' <h3>' + name + '</h3>';
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
      {
        './util/containers': 'xBI4',
        './util/createImage': 'JtL7',
        '../scripts/gameLoader': 'iLsJ',
      },
    ],
    jG7D: [
      function(require, module, exports) {
        'use strict';

        var __importDefault =
          (this && this.__importDefault) ||
          function(mod) {
            return mod && mod.__esModule
              ? mod
              : {
                  default: mod,
                };
          };

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });

        var containers_1 = require('./util/containers');

        var createImage_1 = __importDefault(require('./util/createImage'));

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
      { './util/containers': 'xBI4', './util/createImage': 'JtL7' },
    ],
    yuzu: [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });
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
    brI8: [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });

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
    hCmj: [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });

        function getRandomNumber(maxNum) {
          return Math.floor(Math.random() * maxNum);
        }

        exports.getRandomNumber = getRandomNumber;
      },
      {},
    ],
    Ihss: [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });

        var getRandomNumber_1 = require('./util/getRandomNumber');

        var particle = function particle() {
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
      { './util/getRandomNumber': 'hCmj' },
    ],
    KqmS: [
      function(require, module, exports) {
        'use strict';

        var __importDefault =
          (this && this.__importDefault) ||
          function(mod) {
            return mod && mod.__esModule
              ? mod
              : {
                  default: mod,
                };
          };

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });

        var handleDrag_1 = __importDefault(require('./handleDrag'));

        var handleSelection_1 = require('./handleSelection');

        var playGame_1 = __importDefault(require('./playGame'));

        var showCharacter_1 = __importDefault(require('./showCharacter'));

        var showWinner_1 = __importDefault(require('./showWinner'));

        var characterIndex_1 = __importDefault(require('./util/characterIndex'));

        var containers_1 = require('./util/containers');

        var gameHelpers_1 = require('./util/gameHelpers');

        var storage_1 = __importDefault(require('./util/storage'));

        var drawConfetti_1 = __importDefault(require('./drawConfetti'));

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
        './handleDrag': 'TV2N',
        './handleSelection': 'Q142',
        './playGame': 'lNZh',
        './showCharacter': 'IgTL',
        './showWinner': 'jG7D',
        './util/characterIndex': 'yuzu',
        './util/containers': 'xBI4',
        './util/gameHelpers': 'fbZQ',
        './util/storage': 'brI8',
        './drawConfetti': 'Ihss',
      },
    ],
  },
  {},
  ['KqmS'],
  null,
);
//# sourceMappingURL=/scripts.c1f03ddf.js.map