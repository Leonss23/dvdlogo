"use strict";
class LogoPosition {
  constructor(logo) {
    this.logo = logo;
    this.top = this.logo.rect.top;
    this.left = this.logo.rect.left;
    this.right = this.logo.rect.right;
    this.bottom = this.logo.rect.bottom;
  }
  get top() {
    return this._top;
  }
  get left() {
    return this._left;
  }
  get right() {
    return this._right;
  }
  get bottom() {
    return this._bottom;
  }
  set top(value) {
    this.logo.element.style.top = `${value}px`;
    this._top = value;
    this.bottom = this._top;
  }
  set left(value) {
    this.logo.element.style.left = `${value}px`;
    this._left = value;
    this.right = this._left;
  }
  set right(value) {
    this._right = value + this.logo.rect.width + 10;
  }
  set bottom(value) {
    this._bottom = value + this.logo.rect.height + 10;
  }
}

class Logo {
  constructor() {
    this.VELOCITY = 1;
    this.movementDelay = 0;
    this.hue = 0;
    this.element = document.getElementById("logo");
    this.defaultFilterStyle = getComputedStyle(this.element).filter;
    this.rect = this.element.getBoundingClientRect();
    this.position = new LogoPosition(this);
    this.direction = { top: false, left: false };
    this.container = document.getElementById("container");
    this.containerBounds = this.container.getBoundingClientRect();
    window.onresize = () => {
      this.containerBounds = this.container.getBoundingClientRect();
    };
  }
  rotateLogoColor() {
    this.hue += 90;
    this.element.style.filter = `${this.defaultFilterStyle} hue-rotate(${this.hue}deg) saturate(9999) blur(1px)`;
  }

  bounce() {
    if (this.position.right > this.containerBounds.right) {
      this.direction.left = 1;
      this.rotateLogoColor();
    }
    if (this.position.left < this.containerBounds.left) {
      this.direction.left = 0;
      this.rotateLogoColor();
    }
    if (this.position.bottom > this.containerBounds.bottom) {
      this.direction.top = 1;
      this.rotateLogoColor();
    }
    if (this.position.top < this.containerBounds.top) {
      this.direction.top = 0;
      this.rotateLogoColor();
    }
  }
  movement() {
    this.bounce();

    if (this.direction.left) {
      this.position.left -= this.VELOCITY;
    } else {
      this.position.left += this.VELOCITY;
    }
    if (this.direction.top) {
      this.position.top -= this.VELOCITY;
    } else {
      this.position.top += this.VELOCITY;
    }
  }
  startMovement() {
    this.rotateLogoColor();
    setInterval(() => {
      this.movement();
    }, this.movementDelay);

    setInterval(() => {
      console.log({
        containerBounds: this.containerBounds,
        position: this.position,
      });
    }, 500);
  }
}

const logo = new Logo();

logo.startMovement();
