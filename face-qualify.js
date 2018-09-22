
/**
 **
 **     Face Qualify ~ for cognitive accesibility
 **
 **/


 /* global variables */

var color1, color2, color3, color4, color5;      // colors
var X;                                               // x input (normalized)
var output;                                          // output HTML container
var xc;                                              // contrained drag value
var touched;                                         // boolean

function setup() {

  regen();
  let sc = map(windowWidth, 240, 1920, .5, 3);
  face = new Face(width/3, height/2, sc);
  color1 = '#D31705';
  color2 = color(232, 232, 232);
  color3 = color(232, 232, 232);
  color4 = color(232, 232, 232);
  color5 = color(250, 255, 0);
  output = document.getElementById('val');

  // initialize default 
  xc = width/2;
  X = .5;
  touched = false;
}

function regen(){
  var side;
  if(windowHeight > windowWidth){
   side = constrain(windowWidth, 200, 700);
 } else{
   side = windowHeight;
 }
 var canvas = createCanvas(side, side*.75);
 canvas.parent('canvasContainer');
}

function deviceTurned(){
  regen();
}

function touchStarted() {
  touched = true;
  return false;
}
function touchEnded() {
  touched = false;
  return false;
}

function draw() {
  face.drawFace();
  drawSlider(height - 60);
}

function drawSlider(y) {
  var m = 20;           // margin 
  var M = 2 * m;        // real margin

  if (mouseIsPressed || touched) {
    xc = constrain(mouseX, M, width-M);
    X = map(xc, M, width-M, 0, 1);
  } 

  fill(242);
  noStroke();
  rect(m, y+m, width-2*m, 2*m, m);
  fill(face.col);
  stroke(0);
  strokeWeight(m/5);
  ellipse(xc, y+m*2, m*1.5, m*1.5);
  output.innerHTML = Math.round(X * 4 + 1); // escala de 5
}

function Face(x, y, s) {
  this.x = x; // x position
  this.y = y; // y position
  this.s = s; // scale
  this.col = color(200);
  
  // current, start, middle and target expression
  this.q0 = this.q1 = this.q2 = this.q3 = this.q4 = this.q5 = [];
  this.q1 = expressionAnguish;
  this.q2 = expressionSad;
  this.q3 = expressionNeutral;
  this.q4 = expressionOk;
  this.q5 = expressionHappy;

  this.q0 = this.q3;
  

  this.drawFace = function() {
    if (mouseIsPressed || touched) {
      this.calc(X);
    }
    push();
    translate(this.x, this.y);
    scale(this.s);
    this.drawContour();
    this.drawEyes();
    this.drawNose();
    this.drawEyebrows();
    this.drawMouth();
    pop();
  }

  this.drawEyes = function() {
    fill(0);
    noStroke();
    ellipse(this.q0[10][0], this.q0[10][1], 10, 10);
    ellipse(-this.q0[10][0], this.q0[10][1], 10, 10);
  }

  this.drawNose = function() {
    stroke(0);
    strokeWeight(3);
    noFill();
    beginShape();
    vertex(this.q0[4][0], this.q0[4][1]);
    vertex(this.q0[5][0], this.q0[5][1]);
    vertex(this.q0[6][0], this.q0[6][1]);
    endShape();
  }

  this.drawEyebrow = function() {
    stroke(0);
    strokeWeight(3);
    noFill();
    bezier(
      this.q0[0][0], this.q0[0][1], 
      this.q0[1][0], this.q0[1][1], 
      this.q0[2][0], this.q0[2][1], 
      this.q0[3][0], this.q0[3][1]);
  }

  this.drawEyebrows = function() {
    // left
    this.drawEyebrow();
    // right
    push();
    scale(-1, 1);
    this.drawEyebrow();
    pop();
  }

  this.drawMouth = function() {
    stroke(0);
    strokeWeight(3);
    noFill();
    bezier(
      this.q0[7][0], this.q0[7][1], 
      this.q0[8][0], this.q0[8][1], 
      -this.q0[8][0], this.q0[8][1], 
      -this.q0[7][0], this.q0[7][1]);

    bezier(
      this.q0[7][0], this.q0[7][1], 
      this.q0[9][0], this.q0[9][1], 
      -this.q0[9][0], this.q0[9][1], 
      -this.q0[7][0], this.q0[7][1]);
  }

  this.drawContour = function() {
    var a = createVector(-68.0, -32.0);
    var b = createVector(-75.0, -146.0);
    var c = createVector(-64.0, 115.0);
    noStroke();
    fill(this.col);
    beginShape();
    vertex(a.x, a.y);
    bezierVertex(b.x, b.y, -b.x, b.y, -a.x, a.y);
    vertex(-a.x, a.y);
    bezierVertex(-c.x, c.y, c.x, c.y, a.x, a.y);
    endShape();
  }

  this.calc = function(val) {
    var n;
    var v = Math.trunc(val*5);

    switch(v){
      case 1:
        this.q0 = this.q1;
        break;
      case 2:
        this.q0 = this.q2;
        break;
      case 3:
        this.q0 = this.q3;
        break;
      case 4:
        this.q0 = this.q4;
        break;
      case 5:
        this.q0 = this.q5;
        break;
    }
  }
}


/* 
======================= expression data =======================
*/


/* 1 */
var expressionAnguish = [
[-55.0, -38.0], 
[-43.0, -52.0], 
[-27.0, -54.0], 
[-13.0, -44.0], 
[-5.0, -37.0], 
[-12.0, 2.0], 
[3.0, 2.0], 
[-23.0, 28.0], 
[-2.0, 29.0], 
[-12.0, 29.0], 
[-32.0, -32.0]
];


/* 2 */
var expressionSad = [
[-57.0, -40.0], 
[-43.0, -57.0], 
[-27.0, -54.0], 
[-12.0, -56.0], 
[-5.0, -37.0], 
[-12.0, 2.0], 
[3.0, 2.0], 
[-32.0, 41.0], 
[-18.0, 18.0], 
[-12.0, 36.0], 
[-32.0, -32.0]
];

/* 3 */
var expressionNeutral = [
[-55.0, -38.0], 
[-43.0, -52.0], 
[-27.0, -54.0], 
[-13.0, -44.0], 
[-5.0, -37.0], 
[-12.0, 2.0], 
[3.0, 2.0], 
[-23.0, 28.0], 
[-2.0, 29.0], 
[-12.0, 29.0], 
[-32.0, -32.0]
];

/* 4 */
var expressionOk = [
[-55.0, -38.0], 
[-43.0, -52.0], 
[-27.0, -54.0], 
[-13.0, -44.0], 
[-5.0, -37.0], 
[-12.0, 2.0], 
[3.0, 2.0], 
[-23.0, 28.0], 
[-2.0, 29.0], 
[-12.0, 29.0], 
[-32.0, -32.0]
];

/* 5 */
var expressionHappy = [
[-57.0, -40.0], 
[-43.0, -57.0], 
[-27.0, -54.0], 
[-15.0, -49.0], 
[-5.0, -37.0], 
[-12.0, 2.0], 
[3.0, 2.0], 
[-29.0, 22.0], 
[-4.0, 28.0], 
[-14.0, 52.0], 
[-32.0, -32.0]
];

