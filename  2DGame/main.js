var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img1 = new Image();
img1.src = 'dinosaur.png';

// 공룡 좌표, 사이즈정보
var dino = {
  x : 10, 
  y : 200,
  width : 60, 
  height : 60,
  draw(){
    // ctx.fillStyle = 'green';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img1, this.x, this.y, this.width, this.height);
  }
}

var img2 = new Image();
img2.src = 'cactus.png';
// dino.draw();

// 장애물 좌표, 사이즈정보
class Cactus {
  constructor(){
    this.x = 600; // x,y는 현재 좌표
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw(){
    // ctx.fillStyle = 'red';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img2, this.x, this.y, this.width, this.height);
  }
}
var cactus = new Cactus();
// cactus.draw();


var timer = 0;
var cactusArr = [];
var jumpTimer = 0;
var animation;

function frame(){
  animation = requestAnimationFrame(frame);

  // 캔버스 클리어해주고 다시 그리기
  ctx.clearRect(0,0, canvas.width, canvas.height);

  // 200프레임마다 
  if (timer % 200 === 0) {
    var cactus = new Cactus();
    cactusArr.push(cactus);
  }
  timer++

  // 삭제기능
  cactusArr.forEach((a, i, o) => {
    // x좌표가 0 미만이면 제거
    if (a.x < 0) {
      o.splice(i, 1);
    }
    a.x--;

    crush(dino, a);
  
    a.draw();
  });

  // 점프 기능
  if (jump == true) {
    dino.y--;
    jumpTimer++;
  }
  if (jump == false) {
    if (dino.y < 200) {
      dino.y++;
    }
    // dino.y++;
  }
  if (jumpTimer > 100) {
    jump = false;
    jumpTimer = 0;
  }

  dino.draw(); 
}
frame();

// 충돌확인
function crush(dino, cactus) {
  var x축차이 = cactus.x - (dino.x + dino.width);
  var y축차이 = cactus.y - (dino.y + dino.height);
  if (x축차이 < 0 && y축차이 < 0) {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    cancelAnimationFrame(animation)
  }
} 


var jump = false;
document.addEventListener('keydown', function(e){
  if (e.code === 'Space') {
    jump = true;
  }
})