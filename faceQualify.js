
/**
 **
 **     Face Qualify ~ for cognitive accesibility
 **
 **/


 /* global variables */
var canvas;                                          // the current canvas
var colorc, color1, color2, color3, color4, color5;  // colors
var m = 20;                                          // margin 
var M = 2 * m;                                       // real margin
var X;                                               // x input (normalized)
var output;                                          // output HTML container
var xc;                                              // constrained drag value
var touched;                                         // boolean
var sc;                                              // global scale factor

function setup() {
  regen();
  sc = map(windowWidth, 240, 1920, .5, 3);
  face = new Face(width/3, height/2, sc);
  /* define colors */
  color1 = color(211, 60, 47);
  color2 = color(242, 165, 45);
  color3 = color(242, 231, 69);
  color4 = color(136, 190, 70);
  color5 = color(91, 235, 74)
  colorc = color3;
  output = document.getElementById('val');

  /* initialize default */
  xc = width/2;
  X = .5;
  touched = false;
}

/* regenerate when window resized*/
function regen(){
  var side;
  if(windowHeight > windowWidth){
   side = constrain(windowWidth, 200, 700);
 } else{
   side = windowHeight;
 }
 canvas = createCanvas(side, side*.75);
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
  xc = map(Math.round(X * 4 + 1), 1, 5, M, width - M);
  return false;
}

function drawSlider(y) {
  if (mouseIsPressed || touched) {
    xc = constrain(mouseX, M, width-M);
    X = map(xc, M, width-M, 0, 1);
  } 

  fill(242);
  noStroke();
  rect(m, y+m, width-2*m, 2*m, m);
  fill(colorc);
  stroke(0);
  strokeWeight(m/5);
  ellipse(xc, y+m*2, m*1.5, m*1.5);
  output.innerHTML = Math.round(X * 4 + 1); // escala de 5
}

function drawVal(){
  var val = Math.round(X * 4 + 1);      // escala de 5
  var fSize = map(sc, .5, 3, 72, 320);  // font size
  fill(0);
  noStroke();
  textFont('Open Sans', fSize);
  textAlign(CENTER, CENTER);
  text(val, width/3 * 2, height/2);
}

function draw() {
  clear();
  face.drawFace();
  drawSlider(canvas.height - 60);
  drawVal();
}

function Face(x, y, s) {
  this.x = x; // x position
  this.y = y; // y position
  this.s = s; // scale
  
  // current, start, middle and target expression
  this.q0 = this.q1 = this.q2 = this.q3 = this.q4 = this.q5 = [];
  this.q1 = expressionAnguish;
  this.q2 = expressionSad;
  this.q3 = expressionNeutral;
  this.q4 = expressionOk;
  this.q5 = expressionHappy;
  this.q0 = this.q3;
  
  this.calc = function(val) {
    var n;
    var v = Math.round(val*4 + 1);
    switch(v){
      case 1:
        this.q0 = this.q1;
        colorc = color1;
        break;
      case 2:
        this.q0 = this.q2;
        colorc = color2;
        break;
      case 3:
        this.q0 = this.q3;
        colorc = color3;
        break;
      case 4:
        this.q0 = this.q4;
        colorc = color4;
        break;
      case 5:
        this.q0 = this.q5;
        colorc = color5;
        break;
    }
  }

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

  this.drawContour = function() {
    var a = createVector(-68.0, -32.0);
    var b = createVector(-75.0, -146.0);
    var c = createVector(-64.0, 115.0);
    noStroke();
    fill(colorc);
    beginShape();
    vertex(a.x, a.y);
    bezierVertex(b.x, b.y, -b.x, b.y, -a.x, a.y);
    vertex(-a.x, a.y);
    bezierVertex(-c.x, c.y, c.x, c.y, a.x, a.y);
    endShape();
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
    fill(0);
    beginShape();  
    vertex(this.q0[7][0], this.q0[7][1]);  
    bezierVertex(this.q0[8][0], this.q0[8][1], -this.q0[8][0], this.q0[8][1], -this.q0[7][0], this.q0[7][1]);
    vertex(-this.q0[7][0], this.q0[7][1]);
    bezierVertex(-this.q0[9][0], this.q0[9][1], this.q0[9][0], this.q0[9][1], this.q0[7][0], this.q0[7][1]);
    endShape();
  }
}


 
//======================= expression data =======================



/* 1 */
var expressionAnguish = [
[-57, -40], 
[-43, -57], 
[-27, -54], 
[-12, -56], 
[-5, -37], 
[-12, 2], 
[3, 2], 
[-32, 41], 
[-18, 18], 
[-12, 36], 
[-32, -32]
];


/* 2 */
var expressionSad = [
[-55, -38], // 0
[-43, -52], // 1
[-27, -54], // 2
[-13, -50], // 3
[-5, -37],  // 4
[-12, 2],   // 5
[3, 2],     // 6
[-24, 33],  // 7
[-2, 29],   // 8
[-12, 29],  // 9
[-32, -32]  // 10
];

/* 3 */
var expressionNeutral = [
[-55, -38], 
[-43, -52], 
[-27, -54], 
[-13, -44], 
[-5, -37], 
[-12, 2], 
[3, 2], 
[-23, 28], 
[-2, 29], 
[-12, 29], 
[-32, -32]
];

/* 4 */
var expressionOk = [
[-55, -38], 
[-43, -52], 
[-27, -54], 
[-13, -44], 
[-5, -37], 
[-12, 2], 
[3, 2], 
[-29, 25], 
[-4, 33], 
[-4, 33], 
[-32, -32]
];

/* 5 */
var expressionHappy = [
[-57, -40], 
[-43, -57], 
[-27, -54], 
[-15, -49], 
[-5, -37], 
[-12, 2], 
[3, 2], 
[-29, 22], 
[-4, 28], 
[-14, 52], 
[-32, -32]
];
