// @flow
import React, { PureComponent } from "react";
import BezierEasing from "bezier-easing";

const range = function(a, b) {
  return Math.round((b - a) * Math.random() + a);
};
let easing = BezierEasing(0.5, 0, 1, 0.1);

// Set # of items
const NUM_SHAPES = 18;

// Draw items base on type tri | cir | arc | rec
class Shape {
  constructor(options) {
    this.startX = range(0, options.maxWidth - 0);
    this.startY = range(0, options.maxHeight - 0);
    this.x = this.startX;
    this.y = this.startY;
    this.distanceX = range(50, 300);
    this.distanceY = range(50, 300);
    this.speed = 1;
    this.rotate = range(0, 180);
    this.rotateSpeed = 0.4; //range(1, 2);
    this.rotateDir = range(1, 2) === 1 ? -1 : 1;
    this.scale = 1;
    this.opacity = 1;
    this.scaleSpeed = range(1000, 3000);
    this.startTime = Date.now();
  }
  update(mousePos) {
    this.rotate = this.rotate > 360 ? 0 : this.rotate + this.rotateSpeed;
    // if (this.scale < 1) {
    //   var cal = easing(Math.min((Date.now() - this.startTime) / this.scaleSpeed, 1));
    //   this.scale = 1 * cal;
    //   this.opacity = 1 * cal;
    // }
    if(!mousePos) return;
    this.x = this.startX + this.rotateDir * (this.distanceX * easing(mousePos.x))
    this.y = this.startY + this.rotateDir * (this.distanceY * easing(mousePos.y))
  }
}

class Rectangle extends Shape {
  constructor(ctx, options) {
    super(options);
    this.ctx = ctx;
    this.length = range(20, 50);
  }
  draw() {
    this.ctx.globalAlpha = this.opacity;
    this.ctx.translate(this.x, this.y);
    this.ctx.scale(this.scale, this.scale);
    this.ctx.rotate(this.rotateDir * (this.rotate * Math.PI / 180));

    this.ctx.beginPath();
    this.ctx.rect(-(this.length / 2), -(this.length / 2), this.length, this.length);
    this.ctx.stroke();
    this.ctx.resetTransform();
  }
}

class Arc extends Shape {
  constructor(ctx, options) {
    super(options);
    this.ctx = ctx;
    this.radius = range(20, 50);
    this.sAngle = range(30, 90);
  }
  draw() {
    this.ctx.globalAlpha = this.opacity;
    this.ctx.translate(this.x, this.y);
    this.ctx.scale(this.scale, this.scale);
    this.ctx.rotate(this.rotateDir * (this.rotate * Math.PI / 180));
    this.ctx.beginPath();

    this.ctx.arc(0, 0, this.radius, this.sAngle * Math.PI / 180, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.resetTransform();
  }
}

class Circle extends Shape {
  constructor(ctx, options) {
    super(options);
    this.ctx = ctx;
    this.radius = range(20, 50);
    this.sAngle = range(0, 90);
  }
  draw() {
    this.ctx.globalAlpha = this.opacity;
    this.ctx.translate(this.x, this.y);
    this.ctx.scale(this.scale, this.scale);
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, this.radius, this.radius, 0, 2 * Math.PI, 0);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.resetTransform();
  }
}

class Triangle extends Shape {
  constructor(ctx, options) {
    super(options);
    this.ctx = ctx;
    this.length = range(20, 50);
    this.height = this.length * (Math.sqrt(3) / 2);
  }
  draw() {
    this.ctx.globalAlpha = this.opacity;
    this.ctx.translate(this.x, this.y);
    this.ctx.scale(this.scale, this.scale);
    this.ctx.rotate(this.rotateDir * (this.rotate * Math.PI / 180));

    this.ctx.beginPath();
    this.ctx.moveTo(0, -this.height / 2);
    this.ctx.lineTo(-this.length / 2, this.height / 2);
    this.ctx.lineTo(this.length / 2, this.height / 2);
    this.ctx.lineTo(0, -this.height / 2);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.resetTransform();
  }
}

type PropType = {
  strokeColor: string
};
type StateType = {

};

class FunShapes extends PureComponent<PropType, StateType> {
  state = {};
  componentDidMount(){
    this.setCanvasSize();
    // window.addEventListener("resize", this.setCanvasSize)
    window.addEventListener("mousemove", this.onMouseMove)
    this.createShapes();
    this.drawShapes();
    this.mousePos = {
      x: 0,
      y: 0
    }
  }
  componentWillUnmount(){
    // window.removeEventListener("resize", this.setCanvasSize)
    window.removeEventListener("mousemove", this.onMouseMove)
    this.shapes = [];
    clearTimeout(this.timeoutID);
  }
  setCanvasSize = () => {
    this.canvas.width = this.canvas.parentElement.parentElement.offsetWidth;
    this.canvas.height = this.canvas.parentElement.parentElement.offsetHeight;
  }
  onMouseMove = (e) => {
    this.mousePos = {
      x: (e.x / document.documentElement.clientWidth - .5) * 2,
      y: (e.y / document.documentElement.clientHeight - .5) * 2
    };
  }
  createShapes = () => {
    this.ctx = this.canvas.getContext("2d");

    this.shapes = Array.from(
      {
        length: NUM_SHAPES
      },
      () => {
        switch (range(1, 6)) {
          case 1:
            return new Rectangle(this.ctx, {
              maxHeight: this.canvas.height,
              maxWidth: this.canvas.width
            });
          case 2:
            return new Arc(this.ctx, {
              maxHeight: this.canvas.height,
              maxWidth: this.canvas.width
            });
          case 3:
            return new Circle(this.ctx, {
              maxHeight: this.canvas.height,
              maxWidth: this.canvas.width
            });
          case 4:
            return new Triangle(this.ctx, {
              maxHeight: this.canvas.height,
              maxWidth: this.canvas.width
            });
          case 5:
            return new Triangle(this.ctx, {
              maxHeight: this.canvas.height,
              maxWidth: this.canvas.width
            });
          case 6:
            return new Rectangle(this.ctx, {
              maxHeight: this.canvas.height,
              maxWidth: this.canvas.width
            });
        }
      }
    );
  }
  drawShapes = () => {
    if(this.isInView()){
      this.setCanvasSize();
      // this.ctx.clearRect(0, 0, (this.canvas ? this.canvas.width : 0), (this.canvas ? this.canvas.height : 0));
      this.ctx.strokeStyle = this.props.strokeColor;
      this.ctx.lineWidth = 2;
      this.shapes.map((shape) => {
        shape.update(this.mousePos);
        shape.draw();
      });
    }
    if(this.shapes.length)
      this.timeoutID = setTimeout(() => {requestAnimationFrame(this.drawShapes)}, 1000/30);
  }
  isInView = () => {
    return this.canvas && this.canvas.getBoundingClientRect().bottom >= 0;
  }
  render(){
    return (
      <div className="funshapes" style={this.props.style}>
        <canvas ref={(el) => (this.canvas = el)}> </canvas>
      </div>
    );
  }
}

export default FunShapes;
