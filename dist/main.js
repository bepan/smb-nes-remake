/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/GameObject.js":
/*!***************************!*\
  !*** ./src/GameObject.js ***!
  \***************************/
/*! exports provided: GameObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameObject\", function() { return GameObject; });\n/* harmony import */ var _position_enum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./position.enum */ \"./src/position.enum.js\");\n\n\nclass GameObject {\n\n  constructor(image, x, y, dx, dy, width, height,\n    imageFrameX = 0, \n    imageFrameY = 0,\n    numberOfFrames = 1, \n    animationFrequency = 2\n  ) {\n    this.x = x;\n    this.y = y;\n    // this.xClone = this.x;\n    // this.yClone = this.y;\n    this.dx = dx;\n    this.dy = dy;\n    this.width = width;\n    this.height = height;\n    this.image = image;\n    this.gravity = 0.5;\n    this.gravitySpeed = 0;\n    this.jumpingSpeed = -15;\n    this.jumpingFriction = 0.6;\n    this.jumping = false;\n    this.ascending = false;\n    this.dir = 1; // right\n\n    this.imageFrame = 0;\n    this.imageFrameX = imageFrameX;\n    this.imageFrameY = imageFrameY;\n\n    this.moving = false;\n    this.gameLoopCounter = 0;\n    this.animationFrequency = animationFrequency;\n    this.positionBasedOnPlayer = -1;\n    this.numberOfFrames = numberOfFrames;\n    // Platform jumping\n    // this.platformJumping = false;\n\n  }\n\n  draw(ctx) {\n    ctx.beginPath();\n    ctx.drawImage(this.image, this.imageFrameX * 32, this.imageFrameY * 32, 32, 32, this.x, this.y, this.width, this.height);\n    ctx.closePath();\n  }\n\n  update() {\n    this.x += this.dx;\n    this.y += this.dy;\n\n    if (this.numberOfFrames > 1 && ++this.gameLoopCounter === this.animationFrequency) {\n      this.gameLoopCounter = 0;\n      this.imageFrameX = ++this.imageFrameX % this.numberOfFrames;\n    }\n\n    // Move later to platform objects-----\n    // if (this.platformJumping) {\n    //   this.dy = -1;\n    //   this.gameLoopCounter++;\n    //   if (this.gameLoopCounter === 8) {\n    //     this.gameLoopCounter = 0; \n    //     this.dy = 1;\n    //     this.platformJumping = false;\n    //   }\n    // }\n\n    // if (!this.platformJumping && this.y > this.yClone) {\n    //   this.y = this.yClone;\n    //   this.dy = 0;\n    // }\n  }\n\n  checkScreenCollision(canvas) {\n    // Check collision with screen\n    if (this.x < 0) {\n      this.x = 0;\n      this.dx *= -1;\n    } else if (this.x + this.width > canvas.width) {\n      this.x = canvas.width - this.width;\n      this.dx *= -1;\n    }\n  }\n\n  setPositionBasedOnPlayer(player) {\n    if (this.y + this.height <= player.y) {\n      this.positionBasedOnPlayer = _position_enum__WEBPACK_IMPORTED_MODULE_0__[\"Position\"].ABOVE;\n\n    } else if(this.y >= player.y + player.height) {\n      this.positionBasedOnPlayer = _position_enum__WEBPACK_IMPORTED_MODULE_0__[\"Position\"].BELOW;\n\n    } else {\n      this.positionBasedOnPlayer = _position_enum__WEBPACK_IMPORTED_MODULE_0__[\"Position\"].MIDDLE;\n    }\n  }\n\n}\n\n\n//# sourceURL=webpack:///./src/GameObject.js?");

/***/ }),

/***/ "./src/Sound.js":
/*!**********************!*\
  !*** ./src/Sound.js ***!
  \**********************/
/*! exports provided: Sound */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Sound\", function() { return Sound; });\nclass Sound {\n  \n  constructor(src, loop = false) {\n    this.sound = document.createElement(\"audio\");\n    this.sound.src = src;\n    this.sound.setAttribute(\"preload\", \"auto\");\n    this.sound.setAttribute(\"controls\", \"none\");\n    if (loop) {\n      this.sound.setAttribute('loop', 'true');\n    }\n    this.sound.style.display = \"none\";\n    document.body.appendChild(this.sound);\n  }\n\n  play() {\n    this.sound.play();\n  }\n  \n  stop() {\n    this.sound.pause();\n  }\n}\n\n\n//# sourceURL=webpack:///./src/Sound.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ \"./src/GameObject.js\");\n/* harmony import */ var _Sound__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sound */ \"./src/Sound.js\");\n/* harmony import */ var _position_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./position.enum */ \"./src/position.enum.js\");\n\n\n\n\nclass Game {\n\n  constructor(screenWidth, screenHeight) {\n    // Create canvas\n    this.canvas = document.createElement('canvas');\n    this.canvas.width = screenWidth;\n    this.canvas.height = screenHeight;\n    this.ctx = this.canvas.getContext('2d');\n    this.gameObjects = [];\n    this.keys = [];\n    this.gameStarted = false;\n\n    this.gameBoard = [\n      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 15,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 12, 13, 14,  0,  0,  0,  0,  0,  0, 15, 15, 15,  0],\n      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 12, 13, 13, 13, 14],\n      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],\n      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10,  0,  0,  0, 11, 10, 11, 10, 11,  0,  0,  0, 17, 18,  0,  0],\n      [ 0,  0,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 19, 20,  0,  0],\n      [ 0,  5,  6,  8,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 19, 20,  0,  0],\n      [ 5,  6,  7,  6,  8,  0,  0,  0,  0,  0,  0,  2,  3,  3,  3,  4,  5,  6,  8,  0,  0, 16,  0,  2,  3,  4,  0,  0, 19, 20,  0,  0],\n      [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],\n      [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1]\n    ];\n  }\n\n  init() {\n    // SOUNDS\n    // =============================================================\n    this.jumpSound = new _Sound__WEBPACK_IMPORTED_MODULE_1__[\"Sound\"]('assets/sounds/jump_small.wav');\n    this.mainTheme = new _Sound__WEBPACK_IMPORTED_MODULE_1__[\"Sound\"]('assets/sounds/main_theme.mp3', true);\n\n    // SPRITES\n    // =============================================================\n    // Mario Right sprites\n    this.mario0 = new Image();\n    this.mario0.src = 'assets/mario_0.png';\n    this.mario1 = new Image();\n    this.mario1.src = 'assets/mario_1.png';\n    this.mario2 = new Image();\n    this.mario2.src = 'assets/mario_2.png';\n    this.mario3 = new Image();\n    this.mario3.src = 'assets/mario_3.png';\n    this.marioJump = new Image();\n    this.marioJump.src = 'assets/mario_jumpp.png';\n\n    // Mario Left sprites\n    this.marioStaticLeft = new Image();\n    this.marioStaticLeft.src = 'assets/mario_static_left.png';\n    this.marioRun1Left = new Image();\n    this.marioRun1Left.src = 'assets/mario_run1_left.png';\n    this.marioRun2Left = new Image();\n    this.marioRun2Left.src = 'assets/mario_run2_left.png';\n    this.marioRun3Left = new Image();\n    this.marioRun3Left.src = 'assets/mario_run3_left.png';\n    this.marioJumpLeft = new Image();\n    this.marioJumpLeft.src = 'assets/mario_jump_left.png';\n\n    this.marioJumping = {\n      1: this.marioJump,\n      2: this.marioJumpLeft\n    };\n    this.marioStatic = {\n      1: this.mario0, // right\n      2: this.marioStaticLeft // left\n    };\n    this.marioMoves = {\n      1: [this.mario1, this.mario2, this.mario3],\n      2: [this.marioRun1Left, this.marioRun2Left, this.marioRun3Left]\n    };\n\n    this.player = new _GameObject__WEBPACK_IMPORTED_MODULE_0__[\"GameObject\"](this.mario0, 3*32, 13*32, 0, 0, 32, 32);\n\n    this.skyTile = new Image();\n    this.skyTile.src = 'assets/sky_tile.png';\n\n    this.floor = new Image();\n    this.floor.src = 'assets/1.png';\n    this.item = new Image();\n    this.item.src = 'assets/10.png';\n    this.brick = new Image();\n    this.brick.src = 'assets/11.png';\n\n    this.arbusto1 = new Image();\n    this.arbusto1.src = 'assets/arbusto1.png';\n    this.arbusto2 = new Image();\n    this.arbusto2.src = 'assets/arbusto2.png';\n    this.arbusto3 = new Image();\n    this.arbusto3.src = 'assets/arbusto3.png';\n\n    this.hill1 = new Image();\n    this.hill1.src = 'assets/hill1.png';\n    this.hill2 = new Image();\n    this.hill2.src = 'assets/hill2.png';\n    this.hill3 = new Image();\n    this.hill3.src = 'assets/hill3.png';\n    this.hill4 = new Image();\n    this.hill4.src = 'assets/hill4.png';\n    this.hill5 = new Image();\n    this.hill5.src = 'assets/hill_top.png';\n\n    this.nube1 = new Image();\n    this.nube1.src = 'assets/nnube1.png';\n    this.nube2 = new Image();\n    this.nube2.src = 'assets/nnube2.png';\n    this.nube3 = new Image();\n    this.nube3.src = 'assets/nnube3.png';\n    this.nube4 = new Image();\n    this.nube4.src = 'assets/nnube4.png';\n\n    const pipe = new Image();\n    pipe.src = 'assets/pipe.png';\n\n    // ENEMY SPRITES\n    const goomba = new Image();\n    goomba.src = 'assets/goomba.png';\n\n    // Init all game pieces\n    for (let row = 0; row < (this.canvas.height / 32); row++) {\n      for (let col = 0; col < (this.canvas.width / 32); col++) {\n        // If its platform\n        const objectType = this.gameBoard[row][col];\n        let gameObject, width = 32;\n        switch(objectType) {\n          case 1:  gameObject = new _GameObject__WEBPACK_IMPORTED_MODULE_0__[\"GameObject\"](this.floor, col * 32, row * 32, 0, 0, width, 32); break;\n          case 10: gameObject = new _GameObject__WEBPACK_IMPORTED_MODULE_0__[\"GameObject\"](this.item, col * 32, row * 32, 0, 0, width, 32); break;\n          case 11: gameObject = new _GameObject__WEBPACK_IMPORTED_MODULE_0__[\"GameObject\"](this.brick, col * 32, row * 32, 0, 0, width, 32); break;\n          case 16: gameObject = new _GameObject__WEBPACK_IMPORTED_MODULE_0__[\"GameObject\"](goomba, col * 32, row * 32, -1, 0, width, 32, undefined, undefined, 2, 7); break;\n          case 17: gameObject = new _GameObject__WEBPACK_IMPORTED_MODULE_0__[\"GameObject\"](pipe, col * 32, row * 32, 0, 0, width, 32, 0, 0); break;\n          case 18: gameObject = new _GameObject__WEBPACK_IMPORTED_MODULE_0__[\"GameObject\"](pipe, col * 32, row * 32, 0, 0, width, 32, 1, 0); break;\n          case 19: gameObject = new _GameObject__WEBPACK_IMPORTED_MODULE_0__[\"GameObject\"](pipe, col * 32, row * 32, 0, 0, width, 32, 0, 1); break;\n          case 20: gameObject = new _GameObject__WEBPACK_IMPORTED_MODULE_0__[\"GameObject\"](pipe, col * 32, row * 32, 0, 0, width, 32, 1, 1); break;\n        }\n        if (gameObject) {\n          this.gameObjects.push(gameObject);\n        }\n        \n      }\n    }\n\n    // Init Controllers\n    window.addEventListener('keydown', (e) => {\n      if (e.keyCode === 13) {\n        this.gameStarted = true;\n        this.mainTheme.play();\n      }\n      this.keys[e.keyCode] = true;\n    });\n    window.addEventListener('keyup', (e) => this.keys[e.keyCode] = false);\n\n    // Init Game loop\n    this.interval = setInterval(() => {\n      this.draw();\n      this.update();\n    }, 20);\n  }\n\n  draw() {\n    if (!this.gameStarted) {\n      this.ctx.beginPath();\n      this.ctx.fillStyle = 'black';\n      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n      this.ctx.font = '30px Comic Sans MS';\n      this.ctx.fillStyle = 'white';\n      this.ctx.textAlign = \"center\";\n      this.ctx.textBaseline = 'middle';\n      this.ctx.fillText(\"Press enter to start...\", this.canvas.width / 2 , this.canvas.height / 2);\n      this.ctx.closePath();\n      return;\n    }\n\n    // Draw the blue sky\n    this.ctx.beginPath();\n    this.ctx.fillStyle = '#6B8CFF';\n    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n    this.ctx.closePath();\n\n    // Draw Gameboard\n    for (let row = 0; row < (this.canvas.height / 32); row++) {\n      for (let col = 0; col < (this.canvas.width / 32); col++) {\n\n        // All collidable items and the sky\n        if ([0, 1, 10, 11].includes(this.gameBoard[row][col])) {\n          this.ctx.drawImage(this.skyTile, col * 32, row * 32, 32, 32);\n        \n        // ARBUSTOS\n        } else if (this.gameBoard[row][col] === 2) {\n          this.ctx.drawImage(this.arbusto1, col * 32, row * 32, 32, 32);\n        } else if (this.gameBoard[row][col] === 3) {\n          this.ctx.drawImage(this.arbusto2, col * 32, row * 32, 32, 32);\n        } else if (this.gameBoard[row][col] === 4) {\n          this.ctx.drawImage(this.arbusto3, col * 32, row * 32, 32, 32);\n        \n        // COLINAS\n        } else if (this.gameBoard[row][col] === 5) {\n          this.ctx.drawImage(this.hill1, col * 32, row * 32, 32, 32);\n        } else if (this.gameBoard[row][col] === 6) {\n          this.ctx.drawImage(this.hill2, col * 32, row * 32, 32, 32);\n        } else if (this.gameBoard[row][col] === 7) {\n          this.ctx.drawImage(this.hill3, col * 32, row * 32, 32, 32);\n        } else if (this.gameBoard[row][col] === 8) {\n          this.ctx.drawImage(this.hill4, col * 32, row * 32, 32, 32);\n        } else if (this.gameBoard[row][col] === 9) {\n          this.ctx.drawImage(this.hill5, col * 32, row * 32, 32, 32);\n        \n        // NUBES\n        } else if (this.gameBoard[row][col] === 12) {\n          this.ctx.drawImage(this.nube1, col * 32, row * 32, 32, 32);\n        } else if (this.gameBoard[row][col] === 13) {\n          this.ctx.drawImage(this.nube2, col * 32, row * 32, 32, 32);\n        } else if (this.gameBoard[row][col] === 14) {\n          this.ctx.drawImage(this.nube3, col * 32, row * 32, 32, 32);\n        } else if (this.gameBoard[row][col] === 15) {\n          this.ctx.drawImage(this.nube4, col * 32, row * 32, 32, 32);\n        }\n\n      }\n    }\n\n    // Draw collidable game objects\n    this.gameObjects.forEach(o => {\n      o.draw(this.ctx);\n    });\n\n    // Draw Player\n    this.player.draw(this.ctx);\n  }\n\n  update() {\n    if (!this.gameStarted) {\n      return;\n    }\n\n    // Check Controllers\n    // =================================================================\n    if (this.keys[39]) { // Move Right\n      this.player.dx = 5;\n      this.player.dir = 1;\n    }\n    \n    if (this.keys[37]) { // Move Left\n      this.player.dx = -5;\n      this.player.dir = 2;\n    }\n\n    if (!this.keys[39] && !this.keys[37]) {\n      this.player.dx = 0;\n    }\n    \n    // Jumping\n    if (this.keys[32] && !this.player.jumping && this.player.gravitySpeed === 0) {\n      this.player.jumping = true;\n      this.player.ascending = true;\n      this.player.image = this.marioJump;\n      this.jumpSound.play();\n    }\n\n    // Update all game Objects\n    for (let o of this.gameObjects) {\n      o.update();\n      o.checkScreenCollision(this.canvas);\n      o.setPositionBasedOnPlayer(this.player);\n    }\n\n    // Change Player Image depending on moves\n    if (!this.keys[39] && !this.keys[37] && !this.player.jumping) {\n      this.player.image = this.marioStatic[this.player.dir];\n\n    } else if (this.player.jumping) {\n      this.player.image = this.marioJumping[this.player.dir];\n\n    } else {\n      if ([1, 2].includes(this.player.dir) && !this.player.jumping && this.player.gravitySpeed === 0) {\n        if (this.player.gameLoopCounter++ === this.player.animationFrequency) {\n          this.player.gameLoopCounter = 0;\n          this.player.imageFrame = ++this.player.imageFrame % 3;\n        }\n        this.player.image = this.marioMoves[this.player.dir][this.player.imageFrame];\n      }\n    }\n\n    // Update Player Position\n    this.player.x += this.player.dx;\n\n    // Update Player while jumping\n    if (!this.player.ascending) {\n      this.player.gravitySpeed += this.player.gravity;\n      this.player.y += this.player.gravitySpeed;\n    } else {\n      this.player.jumpingSpeed += this.player.jumpingFriction;\n      this.player.y += this.player.jumpingSpeed;\n\n      if (this.player.jumpingSpeed >= 0) {\n        this.player.ascending = false;\n        this.player.jumpingSpeed = -15;\n      }\n    }\n\n    // Check collisions width objects\n    for (let o of this.gameObjects) {\n\n      if ( (this.player.y + this.player.height > o.y && this.player.y < o.y + o.height) && (this.player.x + this.player.width > o.x && this.player.x < o.x + o.width) ) {\n        if (o.positionBasedOnPlayer === _position_enum__WEBPACK_IMPORTED_MODULE_2__[\"Position\"].MIDDLE) {\n          switch(this.player.dir) {\n            case 1: this.player.x = o.x - this.player.width; break;\n            case 2: this.player.x = o.x + o.width; break;\n          }\n        }\n        \n        if (o.positionBasedOnPlayer === _position_enum__WEBPACK_IMPORTED_MODULE_2__[\"Position\"].ABOVE) {\n          this.player.ascending = false;\n          this.player.jumpingSpeed = -15;\n          this.player.y = o.y + o.height;\n          console.log('collision above...');\n\n          // Platform jump\n          // o.platformJumping = true;\n        }\n\n        if (o.positionBasedOnPlayer === _position_enum__WEBPACK_IMPORTED_MODULE_2__[\"Position\"].BELOW) {\n          this.player.y = o.y - this.player.height;\n          this.player.gravitySpeed = 0;\n          this.player.jumping = false;\n        }\n\n      }\n\n    }\n\n    // Check collision with screen\n    if (this.player.x < 0) {\n      this.player.x = 0;\n    } else if (this.player.x + this.player.width > this.canvas.width) {\n      this.player.x = this.canvas.width - this.player.width;\n    }\n\n  }\n  \n}\n\n// Init Game\nwindow.onload = function() {\n  const game = new Game(1024, 512);\n  document.querySelector('#root').appendChild(game.canvas);\n  game.init();\n};\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/position.enum.js":
/*!******************************!*\
  !*** ./src/position.enum.js ***!
  \******************************/
/*! exports provided: Position */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Position\", function() { return Position; });\nconst Position = {\n  ABOVE: 1,\n  MIDDLE: 2,\n  BELOW: 3\n}\n\n\n//# sourceURL=webpack:///./src/position.enum.js?");

/***/ })

/******/ });