var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var frames = 0;
var interval;
var score = 0;
var dx = 2;
var dy = -2;
var disc = [];
var esloraArr = 0;

class Bike {
    constructor(){
        this.x = 20;
        this.direction = "up, right, down, left";
        this.y = 460;
        this.width = 55;
        this.height = 40;
        this.image1 = new Image();
        this.image1.src = "./images/Moto1.png"    
        //this.image2.src = "./images"
    }


    draw(){
            // solo comparamos que mientras x sea menor que la medida del canvasas menos los 55 de la moto siga avanzando 
        if (this.x + dx < canvas.width - 55) {
           this.x  += 0.5;
           //de lo contrario si  x + dx vale lo mismo que el canvas le decimos que la nueva posicion sea al canvas.width menos el ancho de la moto 
          }else if(this.x + dx == canvas.width){
              this.x = canvas.width-55
            }
       /* if(btn){

        }*/
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
            //this.image2.src = "./images"
        }
            
        draw(){
                // solo comparamos que mientras x sea menor que la medida del canvasas menos los 55 de la moto siga avanzando 
            if (this.x + dx < canvas.width - 55) {
               this.x  += 0.5;
               //de lo contrario si  x + dx vale lo mismo que el canvas le decimos que la nueva posicion sea al canvas.width menos el ancho de la moto 
              }else if(this.x + dx == canvas.width){
                  this.x = canvas.width-55
                }

                

    
            
            ctx.drawImage(this.image2, this.x, this.y, this.width, this.height);
        }

}

function followDiscs(){
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
    )}

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
        console.log('ancho',ancho)
        ctx.fillRect(this.x, this.y+19, this.width, this.height);
    }
}
// function createEslora(){

//     for(var i = score; i>0; i--){
//             k = i*20;
//             eslora.push({x:k, y=0});
//         }
// }
var eslorita= new Eslora(bike)
function drawEslora(){
    if(esloraArr > 0){
        eslorita.draw(esloraArr * -20 , bike.x, bike.y )
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
        ctx.fillStyle= "white";
        ctx.fillText("Score:"+this.score, 20,50, 350);

        
    }

}


/*function advanceBike() {
    ctx.drawImage(this.image, this.x= bike[0].x + dx, this.y= bike[0].y + dy, this.width, this.height);
    
  }*/


var background = new Background();
//var eslora = new Eslora();

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
            esloraArr= score
            //console.log(score);
           disc.splice(index,1)
        }
    })
}

function start(){
    interval = setInterval(update, 1000/60)
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
    background.contador();
    generateDiscs();
    drawDiscs();
    drawEslora();
    followDiscs();
    //eslora.draw();
};

addEventListener("keydown", function(e){
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
})

start();


