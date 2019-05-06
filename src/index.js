import { GameObject } from './GameObject';
import { Sound } from './Sound';
import { Position } from './position.enum';

class Game {

  constructor(screenWidth, screenHeight) {
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = screenWidth;
    this.canvas.height = screenHeight;
    this.ctx = this.canvas.getContext('2d');
    this.gameObjects = [];
    this.keys = [];
    this.gameStarted = false;

    this.gameBoard = [
      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 15,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 12, 13, 14,  0,  0,  0,  0,  0,  0, 15, 15, 15,  0],
      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 12, 13, 13, 13, 14],
      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10,  0,  0,  0,  0,  0,  0,  0,  0,  0],
      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
      [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10,  0,  0,  0, 11, 10, 11, 10, 11,  0,  0,  0,  0,  0,  0,  0],
      [ 0,  0,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
      [ 0,  5,  6,  8,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  9,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
      [ 5,  6,  7,  6,  8,  0,  0,  0,  0,  0,  0,  2,  3,  3,  3,  4,  5,  6,  8,  0,  0,  0,  0,  2,  3,  4,  0,  0,  0,  0,  0,  0],
      [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],
      [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1]
    ];
  }

  init() {
    // Init jump sound
    this.jumpSound = new Sound('assets/sounds/jump_small.wav');
    this.mainTheme = new Sound('assets/sounds/main_theme.mp3', true);

    // Mario Right sprites
    this.mario0 = new Image();
    this.mario0.src = 'assets/mario_0.png';
    this.mario1 = new Image();
    this.mario1.src = 'assets/mario_1.png';
    this.mario2 = new Image();
    this.mario2.src = 'assets/mario_2.png';
    this.mario3 = new Image();
    this.mario3.src = 'assets/mario_3.png';
    this.marioJump = new Image();
    this.marioJump.src = 'assets/mario_jumpp.png';

    // Mario Left sprites
    this.marioStaticLeft = new Image();
    this.marioStaticLeft.src = 'assets/mario_static_left.png';
    this.marioRun1Left = new Image();
    this.marioRun1Left.src = 'assets/mario_run1_left.png';
    this.marioRun2Left = new Image();
    this.marioRun2Left.src = 'assets/mario_run2_left.png';
    this.marioRun3Left = new Image();
    this.marioRun3Left.src = 'assets/mario_run3_left.png';
    this.marioJumpLeft = new Image();
    this.marioJumpLeft.src = 'assets/mario_jump_left.png';

    this.marioJumping = {
      1: this.marioJump,
      2: this.marioJumpLeft
    };
    this.marioStatic = {
      1: this.mario0, // right
      2: this.marioStaticLeft // left
    };
    this.marioMoves = {
      1: [this.mario1, this.mario2, this.mario3],
      2: [this.marioRun1Left, this.marioRun2Left, this.marioRun3Left]
    };

    this.player = new GameObject(this.mario0, 3*32, 13*32, 0, 0, 32, 32, 0.5);

    this.skyTile = new Image();
    this.skyTile.src = 'assets/sky_tile.png';

    this.floor = new Image();
    this.floor.src = 'assets/1.png';
    this.item = new Image();
    this.item.src = 'assets/10.png';
    this.brick = new Image();
    this.brick.src = 'assets/11.png';

    this.arbusto1 = new Image();
    this.arbusto1.src = 'assets/arbusto1.png';
    this.arbusto2 = new Image();
    this.arbusto2.src = 'assets/arbusto2.png';
    this.arbusto3 = new Image();
    this.arbusto3.src = 'assets/arbusto3.png';

    this.hill1 = new Image();
    this.hill1.src = 'assets/hill1.png';
    this.hill2 = new Image();
    this.hill2.src = 'assets/hill2.png';
    this.hill3 = new Image();
    this.hill3.src = 'assets/hill3.png';
    this.hill4 = new Image();
    this.hill4.src = 'assets/hill4.png';
    this.hill5 = new Image();
    this.hill5.src = 'assets/hill_top.png';

    this.nube1 = new Image();
    this.nube1.src = 'assets/nnube1.png';
    this.nube2 = new Image();
    this.nube2.src = 'assets/nnube2.png';
    this.nube3 = new Image();
    this.nube3.src = 'assets/nnube3.png';
    this.nube4 = new Image();
    this.nube4.src = 'assets/nnube4.png';

    // Init all collidable game objects
    for (let row = 0; row < (this.canvas.height / 32); row++) {
      for (let col = 0; col < (this.canvas.width / 32); col++) {
        // If its platform
        const objectType = this.gameBoard[row][col];
        let image;
        if ([1, 10, 11].includes(objectType)) {
          switch(objectType) {
            case 1: image = this.floor; break;
            case 10: image = this.item; break;
            case 11: image = this.brick; break;
          }
          const gameObject = new GameObject(image, col * 32, row * 32, 0, 0, 32, 32);
          this.gameObjects.push(gameObject);
        }
      }
    }

    // Init Controllers
    window.addEventListener('keydown', (e) => {
      console.log(e.keyCode);
      if (e.keyCode === 13) {
        this.gameStarted = true;
        this.mainTheme.play();
      }
      this.keys[e.keyCode] = true;
    });
    window.addEventListener('keyup', (e) => this.keys[e.keyCode] = false);

    // Init Game loop
    this.interval = setInterval(() => {
      this.draw();
      this.update();
    }, 20);
  }

  draw() {
    if (!this.gameStarted) {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.font = '30px Comic Sans MS';
      this.ctx.fillStyle = 'white';
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText("Press enter to start...", this.canvas.width / 2 , this.canvas.height / 2);
      this.ctx.closePath();
      return;
    }

    // Draw Gameboard
    for (let row = 0; row < (this.canvas.height / 32); row++) {
      for (let col = 0; col < (this.canvas.width / 32); col++) {

        // All collidable items and the sky
        if ([0, 1, 10, 11].includes(this.gameBoard[row][col])) {
          this.ctx.drawImage(this.skyTile, col * 32, row * 32, 32, 32);
        
        // ARBUSTOS
        } else if (this.gameBoard[row][col] === 2) {
          this.ctx.drawImage(this.arbusto1, col * 32, row * 32, 32, 32);
        } else if (this.gameBoard[row][col] === 3) {
          this.ctx.drawImage(this.arbusto2, col * 32, row * 32, 32, 32);
        } else if (this.gameBoard[row][col] === 4) {
          this.ctx.drawImage(this.arbusto3, col * 32, row * 32, 32, 32);
        
        // COLINAS
        } else if (this.gameBoard[row][col] === 5) {
          this.ctx.drawImage(this.hill1, col * 32, row * 32, 32, 32);
        } else if (this.gameBoard[row][col] === 6) {
          this.ctx.drawImage(this.hill2, col * 32, row * 32, 32, 32);
        } else if (this.gameBoard[row][col] === 7) {
          this.ctx.drawImage(this.hill3, col * 32, row * 32, 32, 32);
        } else if (this.gameBoard[row][col] === 8) {
          this.ctx.drawImage(this.hill4, col * 32, row * 32, 32, 32);
        } else if (this.gameBoard[row][col] === 9) {
          this.ctx.drawImage(this.hill5, col * 32, row * 32, 32, 32);
        
        // NUBES
        } else if (this.gameBoard[row][col] === 12) {
          this.ctx.drawImage(this.nube1, col * 32, row * 32, 32, 32);
        } else if (this.gameBoard[row][col] === 13) {
          this.ctx.drawImage(this.nube2, col * 32, row * 32, 32, 32);
        } else if (this.gameBoard[row][col] === 14) {
          this.ctx.drawImage(this.nube3, col * 32, row * 32, 32, 32);
        } else if (this.gameBoard[row][col] === 15) {
          this.ctx.drawImage(this.nube4, col * 32, row * 32, 32, 32);
        }

      }
    }

    // Draw collidable game objects
    this.gameObjects.forEach(o => {
      o.draw(this.ctx);
    });

    // Draw Player
    this.player.draw(this.ctx);
  }

  update() {
    if (!this.gameStarted) {
      return;
    }

    // Check Controllers
    // =================================================================
    if (this.keys[39]) { // Move Right
      this.player.dx = 5;
      this.player.dir = 1;
    }
    
    if (this.keys[37]) { // Move Left
      this.player.dx = -5;
      this.player.dir = 2;
    }

    if (!this.keys[39] && !this.keys[37]) {
      this.player.dx = 0;
    }
    
    // Jumping
    if (this.keys[32] && !this.player.jumping && this.player.gravitySpeed === 0) {
      this.player.jumping = true;
      this.player.ascending = true;
      this.player.image = this.marioJump;
      this.jumpSound.play();
    }

    // Set Object positions realtive to player
    for (let o of this.gameObjects) {
      o.setPositionBasedOnPlayer(this.player);
    }

    // Animate Player Image
    if (!this.keys[39] && !this.keys[37] && !this.player.jumping) {
      this.player.image = this.marioStatic[this.player.dir];

    } else if (this.player.jumping) {
      this.player.image = this.marioJumping[this.player.dir];

    } else {
      if ([1, 2].includes(this.player.dir) && !this.player.jumping && this.player.gravitySpeed === 0) {
        if (this.player.gameLoopCounter++ === this.player.animationFrequency) {
          this.player.gameLoopCounter = 0;
          this.player.imageFrame = ++this.player.imageFrame % 3;
        }
        this.player.image = this.marioMoves[this.player.dir][this.player.imageFrame];
      }
    }

    // Update Player Position
    this.player.x += this.player.dx;

    // Update Player while jumping
    if (!this.player.ascending) {
      this.player.gravitySpeed += this.player.gravity;
      this.player.y += this.player.gravitySpeed;
    } else {
      this.player.jumpingSpeed += this.player.jumpingFriction;
      this.player.y += this.player.jumpingSpeed;

      if (this.player.jumpingSpeed >= 0) {
        this.player.ascending = false;
        this.player.jumpingSpeed = -15;
      }
    }

    // Check collisions width objects
    for (let o of this.gameObjects) {

      if ( (this.player.y + this.player.height > o.y && this.player.y < o.y + o.height) && (this.player.x + this.player.width > o.x && this.player.x < o.x + o.width) ) {
        if (o.positionBasedOnPlayer === Position.ABOVE) {
          this.player.ascending = false;
          this.player.jumpingSpeed = -15;
          this.player.y = o.y + o.height;
        }

        if (o.positionBasedOnPlayer === Position.MIDDLE) {
          switch(this.player.dir) {
            case 1: this.player.x = o.x - this.player.width; break;
            case 2: this.player.x = o.x + o.width; break;
          }
        }

        if (o.positionBasedOnPlayer === Position.BELOW) {
          this.player.y = o.y - this.player.height;
          this.player.gravitySpeed = 0;
          this.player.jumping = false;
        }
        break;
      }

    }

    // Check collision with screen
    if (this.player.x < 0) {
      this.player.x = 0;
    } else if (this.player.x + this.player.width > this.canvas.width) {
      this.player.x = this.canvas.width - this.player.width;
    }

  }
  
}

// Init Game
window.onload = function() {
  const game = new Game(1024, 512);
  document.querySelector('#root').appendChild(game.canvas);
  game.init();
};
