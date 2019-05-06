import { Position } from './position.enum';

export class GameObject {

  constructor(image, x, y, dx, dy, width, height, gravity = 0, jumpingFriction = 0.6) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.width = width;
    this.height = height;
    this.image = image;
    this.gravity = gravity; //0.08
    this.gravitySpeed = 0;
    this.jumpingSpeed = -15;
    this.jumpingFriction = jumpingFriction;
    this.jumping = false;
    this.ascending = false;
    this.dir = 1; // right
    this.imageFrame = 0;
    this.moving = false;
    this.gameLoopCounter = 0;
    this.animationFrequency = 2;

    this.positionBasedOnPlayer = -1;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.closePath();
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
