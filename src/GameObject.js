import { Position } from './position.enum';

export class GameObject {

  constructor(image, x, y, dx, dy, width, height,
    imageFrameX = 0, 
    imageFrameY = 0,
    numberOfFrames = 1, 
    animationFrequency = 2
  ) {
    this.x = x;
    this.y = y;
    // this.xClone = this.x;
    // this.yClone = this.y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.image = image;
    this.gravity = 0.5;
    this.gravitySpeed = 0;
    this.jumpingSpeed = -15;
    this.jumpingFriction = 0.6;
    this.jumping = false;
    this.ascending = false;
    this.dir = 1; // right

    this.imageFrame = 0;
    this.imageFrameX = imageFrameX;
    this.imageFrameY = imageFrameY;

    this.moving = false;
    this.gameLoopCounter = 0;
    this.animationFrequency = animationFrequency;
    this.positionBasedOnPlayer = -1;
    this.numberOfFrames = numberOfFrames;
    // Platform jumping
    // this.platformJumping = false;

  }

  draw(ctx) {
    ctx.beginPath();
    ctx.drawImage(this.image, this.imageFrameX * 32, this.imageFrameY * 32, 32, 32, this.x, this.y, this.width, this.height);
    ctx.closePath();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.numberOfFrames > 1 && ++this.gameLoopCounter === this.animationFrequency) {
      this.gameLoopCounter = 0;
      this.imageFrameX = ++this.imageFrameX % this.numberOfFrames;
    }

    // Move later to platform objects-----
    // if (this.platformJumping) {
    //   this.dy = -1;
    //   this.gameLoopCounter++;
    //   if (this.gameLoopCounter === 8) {
    //     this.gameLoopCounter = 0; 
    //     this.dy = 1;
    //     this.platformJumping = false;
    //   }
    // }

    // if (!this.platformJumping && this.y > this.yClone) {
    //   this.y = this.yClone;
    //   this.dy = 0;
    // }
  }

  checkScreenCollision(canvas) {
    // Check collision with screen
    if (this.x < 0) {
      this.x = 0;
      this.dx *= -1;
    } else if (this.x + this.width > canvas.width) {
      this.x = canvas.width - this.width;
      this.dx *= -1;
    }
  }

  setPositionBasedOnPlayer(player) {
    if (this.y + this.height <= player.y) {
      this.positionBasedOnPlayer = Position.ABOVE;

    } else if(this.y >= player.y + player.height) {
      this.positionBasedOnPlayer = Position.BELOW;

    } else {
      this.positionBasedOnPlayer = Position.MIDDLE;
    }
  }

}
