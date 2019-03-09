var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var frames = 0;
var interval;
var score = 0;
var score2 = 0;
var dx = 2;
var dy = -2;
var disc = [];
var enemy = [];
var esloraArr = 0;
var music = new Audio();
/*var timeLeft = 120;
var onesec = frames/60;
var timerId = setInterval(countdown, 1000 onesec)*/

music.src = './music/Daft Punk- Derezzed (OFFICIAL TRACK)(FULL SONG)(HQ)(2010)TRON SOUNDTRACK.mp3'
music.loop = true;

var startGame = document.getElementById("start-game");

class Bike {
    constructor(){
        this.x = 20;
        this.direction = "up, right, down, left";
        this.y = 460;
        this.width = 55;
        this.height = 40;
        this.image1 = new Image();
        this.image1.src = "./images/Moto1.png"   
        this.esloraArr = 0 ;
    }


    draw(){
            // solo comparamos que mientras x sea menor que la medida del canvasas menos los 55 de la moto siga avanzando 
        if (this.x + dx < canvas.width - 55) {
           this.x  += 0.2;
           //de lo contrario si  x + dx vale lo mismo que el canvas le decimos que la nueva posicion sea al canvas.width menos el ancho de la moto 
          }else if(this.x + dx == canvas.width){
              this.x = canvas.width-55
            }
        ctx.drawImage(this.image1, this.x, this.y, this.width, this.height);
    }
}

    class Bike2 {
        constructor(){
            this.x = 20;
            this.y = 280;
            this.width = 55;
            this.height = 40;
            this.image2 = new Image();
            this.image2.src = "./images/Moto2.png" 
            this.esloraArr = 0;   
        }

        draw(disc){
                // solo comparamos que mientras x sea menor que la medida del canvasas menos los 55 de la moto siga avanzando 
            if (this.x + dx < canvas.width - 55) {
               this.x  += 0.2;
               //de lo contrario si  x + dx vale lo mismo que el canvas le decimos que la nueva posicion sea al canvas.width menos el ancho de la moto 
              }else if(this.x + dx == canvas.width){
                  this.x = canvas.width-55
                }
            ctx.drawImage(this.image2, this.x, this.y, this.width, this.height);
        }

}

class Enemy{
    constructor(ex){
        this.x= ex;
        this.y= canvas.height-50;
        this.width=30;
        this.height=50;
        this.image= new Image();
        this.image.src = "./images/enemy.png"
    }

    collision(item){
        return (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
    }

    draw(){
        this.y --;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

function generateEnemies(){
    if(frames % 60 === 0 ){
        const ex = Math.floor(Math.random() * 30)
        enemy.push(new Enemy(ex*60))
    }

   
}

function drawEnemies(){
    enemy.forEach(function(enemies, index){
        if(enemies.y <- canvas.height) enemy.splice(index, 1)
        enemies.draw()
        if(enemies.collision(bike)){
           enemy.splice(index,1);
           score --;
           bike.esloraArr = score
           console.log("gameOver");
        }
        if(enemies.collision(bike2)){
            enemy.splice(index,1);
            score2 --;
            bike2.esloraArr = score2
            console.log("gameOver");
        }
    })
}
/*function followDiscs(){
    disc.forEach(function(discs, index){
        if(disc.x(index, 1) < bike2.x){
            bike2.x -= 4;
        }
        if(disc.x(index, 1) > bike2.x){
            bike2.x += 4;
        }
        if(disc.y(index, 1) < bike2.y){
            bike2.y -=4;
        }
        if(disc.y(index, 1) > bike2.y){
            bike2.y +=4;
        }
    }       
    )}*/

var bike = new Bike();
var bike2 = new Bike2();

class Eslora{
    constructor(bike){
        this.x=bike.x
        this.y=bike.y
        this.width=50
        this.height=2
    }
    draw(ancho,motoPX,motoPY){
        this.width = ancho
        this.x=motoPX
        this.y=motoPY
        //console.log('ancho',ancho)
        ctx.fillStyle="#1ad1ff";
        ctx.fillRect(this.x, this.y+19, this.width, this.height);
    }

}
class Eslora2{
    constructor(bike2){
        this.x=bike2.x;
        this.y=bike2.y;
        this.width=50;
        this.height=2;
    }
    draw(ancho2,moto2PX,moto2PY){
        this.width = ancho2
        this.x=moto2PX
        this.y=moto2PY
        //console.log('ancho',ancho)
        ctx.fillStyle= "red"
        ctx.fillRect(this.x, this.y+19, this.width, this.height);
    }

}

var eslorita= new Eslora(bike)
var eslorita2 = new Eslora2(bike2)
function drawEslora(){
    if(bike.esloraArr > 0){
        eslorita.draw(bike.esloraArr * -20 , bike.x , bike.y)
    }
}
function drawEslora2(){
    if(bike2.esloraArr > 0){
        eslorita2.draw(bike2.esloraArr * -20, bike2.x, bike2.y)
    }
}

class Disc{
    constructor(y){
        this.x =  canvas.width - 30;
        this.y = y;
        this.width= 30;
        this.height = 30;
        this.image = new Image();
        this.image.src = "./images/disc.png"
    }
    
    collision(item){
        return (this.x < item.x + item.width) &&
            (this.x + this.width > item.x) &&
            (this.y < item.y + item.height) &&
            (this.y + this.height > item.y);
    }
    
    draw(){
        this.x--;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

}

var sec = 60;
function countdown(){

    var id = window.setInterval(function(){
        if (sec > 0)
        sec --;
        clearInterval(id);
        if(sec = 0)
        winner();
    }, 1000)
}

winner =()=>{
    if (bike.score>bike2.score2){
        ctx.font="40px tron"
        ctx.fillStyle="white"
        ctx.fillText("Player 1 has won!", 410, 400)
    }
    if (bike2.score2>bike.score){
        ctx.font="40px tron"
        ctx.fillStyle="white"
        ctx.fillText("Player 2 has won!", 410, 400)
    }
}

class Background{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = "./images/Lvh0FJG.png"
        
    }

    draw(){
        this.x--;
        if(this.x < -canvas.width) this.x = 0;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.x + canvas.width, this.y, this.width, this.height);
    }

    contador= ()=> {
        //console.log("estas en contador", score);
        this.score =score;
        ctx.font="40px tron";
        ctx.fillStyle= "#1ad1ff";
        ctx.fillText("Score:"+this.score, 20,50, 350);
    }

    contador2= ()=>{
        this.score=score2;
        ctx.font="40px tron";
        ctx.fillStyle= "red";
        ctx.fillText("Score:"+this.score, 650,50, 350);
    }

    count=()=>{
        this.countdown = sec;
        ctx.font = "40 px";
        ctx.fillStyle = "white";
        ctx.fillText(this.countdown, 950,50,50)
    }
    /*countdown = ()=>{
        this.countdown= timeLeft;
        ctx.font= "40px tron";
        ctx.fillStyle= "white";


        if (timeLeft == -1) {
            clearTimeout(timerId);
            doSomething();
        } else {
            ctx.fillText("time remaning"+this.countdown);
            timeLeft--;
        }

    }*/

}

var background = new Background();

/*function doSomething(){
    if(bike.score>bike2.score2){
        winner=1
    }
    if(bike.score<bike2.score2){
        winner=2
    }
    alert("Player"+winner+" has won")
}*/

function generateDiscs(){
    if(frames % 60 === 0 ){
        const y = Math.floor(Math.random() * 24)
        disc.push(new Disc(y*60))
    }
   
}

function drawDiscs(){
    disc.forEach(function(discs, index){
        if(discs.x <- canvas.width) disc.splice(index, 1)
        discs.draw()
        if(discs.collision(bike)){
            score ++
            bike.esloraArr = score
            //console.log(score);
           disc.splice(index,1)
        }
        if(discs.collision(bike2)){
            score2 ++
            bike2.esloraArr= score2
            disc.splice(index,1)
        }
    })
}

/*function isCollide(bike, bike2) {
    return !(
        ((bike.y + bike.height) < (bike2.y)) ||
        (bike.y > (bike2.y + bike2.height)) ||
        ((bike.x + bike.width) < bike2.x) ||
        (bike.x > (bike2.x + bike2.width))
    );
    bike.x=bike2.x-55;
}*/

function start(){
    interval = setInterval(update, 1000/60);
    music.play();
}

function restart(){
    if(interval !== undefined)return;
    score=0;
    frames=0;
    interval=undefined;
    disc= [];
    start();
}

function update(){
    frames ++;
    ctx.clearRect(0,0, canvas.width, canvas.height);
    background.draw();
    bike.draw();
    bike2.draw();
    //isCollide();
    background.contador();
    background.contador2();
    background.count();
    //background.countdown();
    generateDiscs();
    drawDiscs();
    generateEnemies();
    drawEnemies();
    drawEslora();
    drawEslora2();
    music.play();
    countdown();
    winner();
};																	

/*class keyLogger {  
    constructor() {   
        this.keys = [];    
        this.validKeys = 
        {   // left      37: true,      
            // up      38: true,      
            // right      39: true,      
            // down      40: true    
        };  
    }  
            // register the key pressed and then returns the direction  
            keyPress(key) {    
                if (this.validKeys[key]) this.keys[key] = true;    
                return this.calculateDirection();  }  
                // unregister the key released and then returns the direction  
            keyRelease(key) {    
                if (this.validKeys[key]) this.keys[key] = false;    
                return this.calculateDirection();  }  
            calculateDirection() {    
                if (this.keys[37] && !this.keys[38] && !this.keys[39] && !this.keys[40])      
                return "W";    
                if (!this.keys[37] && this.keys[38] && !this.keys[39] && !this.keys[40])      
                return "N";    
                if (!this.keys[37] && !this.keys[38] && this.keys[39] && !this.keys[40])      
                return "E";    
                if (!this.keys[37] && !this.keys[38] && !this.keys[39] && this.keys[40])      
                return "S";    
                if (this.keys[38] && this.keys[37]) return "NW";    
                if (this.keys[38] && this.keys[39]) return "NE";    
                if (this.keys[40] && this.keys[37]) return "SW";    
                if (this.keys[40] && this.keys[39]) return "SE";  
            }}*/

addEventListener("keydown", (e) => {
    var code =e.keyCode;
    if(code ===38){
        if(bike.y > 0)
        bike.y -= 4;
    } if(code === 40){
        if(bike.y +40< canvas.height)
        bike.y += 4;
    } if(code === 39){
        if(bike.x+55 < canvas.width)
        bike.x += 4;
    } if(code === 37){
        if(bike.x > 0)
        bike.x -= 4; 
    }
    if(code === 27){
        restart();  
    }
    if(code ===87){
        if(bike2.y > 0)
        bike2.y -= 4;
    } if(code === 83){
        if(bike2.y +40< canvas.height)
        bike2.y += 4;
    } if(code === 68){
        if(bike2.x+55 < canvas.width)
        bike2.x += 4;
    } if(code === 65){
        if(bike2.x > 0)
        bike2.x -= 4; 
    }
})

startGame.onclick = function(){
    start();
}
