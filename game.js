var anim_id;
var container = document.getElementById("container");
var car = document.getElementById("car");
var car_1 = document.getElementById("car_1");
var car_2 = document.getElementById("car_2");
var car_3 = document.getElementById("car_3");
var line_1 = document.getElementById("line_1");
var line_2 = document.getElementById("line_2");
var line_3 = document.getElementById("line_3");
var restart_div = document.getElementById("restart_div");
var restart_btn = document.getElementById("restart_btn");
var score = document.getElementById("score");
var timer = document.getElementById("timer");
var level_label = document.getElementById("level");
var container_left = parseInt(container.style.left);
var container_width = parseInt(container.style.width);
var container_height = parseInt(container.style.height);
var car_width = parseInt(car.style.width);
var car_height = parseInt(car.style.height);




var gameOver = false;
var scoreCounter = 1;
var speed = 2;
var lineSpeed = 5;
var level = 1;


var moveRight = false;
var moveLeft = false;
var moveUp = false;
var moveDown = false;
get_time();

function get_time()
{
	var sec = 0 ;
	var min = 0 ;
	var counter = setInterval(
	function ()
	{
		if(gameOver === true)
        {
			clearInterval(counter);
        }
		
		sec ++;
		scoreCounter++;
		score.innerHTML=scoreCounter;
		if(sec==60)
		{
			min ++;
			sec=0;
		}
		function addZero(digit) 
         {
         if (digit < 10) 
		 {
         digit = '0' + digit
         }
	     return digit;
		 }
		
		console.log(addZero(min)+":"+addZero(sec));
		timer.innerHTML=addZero(min)+":"+addZero(sec);
	}
  

    , 1000);
		console.log(gameOver);
		
		

}

function level_inc()
{
	if(level==1 && scoreCounter == 30 && gameOver === false)
	{
		alert("congratulation ,you are in level 2 now ");
		level=2;
		level_label.innerHTML=2;
		lineSpeed = 10;
	    speed = 4;
		anim_id = requestAnimationFrame(repeat);
		
	}
	if(level==2 && scoreCounter == 60 && gameOver === false)
	{
		alert("congratulation , you are in level 3 now ");
		level=3;
				level_label.innerHTML=3;

		lineSpeed = 15;
		speed = 6;
		anim_id = requestAnimationFrame(repeat);
	}
	if(level==3 && scoreCounter == 90&& gameOver === false)
	{
		 stop_the_game();
		 alert("congratulation , you are pass all level");
	}
}


document.addEventListener("keydown",function(e){
	if(gameOver === false){
		var key = e.keyCode;
		if(key === 37 && moveLeft === false){
			moveLeft = requestAnimationFrame(left);
		}else if(key === 39 && moveRight === false){
			moveRight = requestAnimationFrame(right);
		}else if(key === 38 && moveUp === false){
			moveUp = requestAnimationFrame(up);
		}else if(key === 40 && moveDown === false){
			moveDown = requestAnimationFrame(down);
		}
	}
});

document.addEventListener("keyup",function(e){
	if(gameOver === false){
		var key = e.keyCode;
		if(key === 37){
			window.cancelAnimationFrame(moveLeft);
            moveLeft = false;

		}else if (key === 39) {
			window.cancelAnimationFrame(moveRight);
            moveRight = false;
		}else if(key === 38){
			window.cancelAnimationFrame(moveUp);
            moveUp = false;
		}else if(key === 40){
			window.cancelAnimationFrame(moveDown);
			moveDown = false;
		}
	}
});

function left()
{
	if(gameOver === false  && parseInt(car.style.left) > 0){
		//console.log(car.style.left);
		car.style.left = parseInt(car.style.left) - 1 + "%";
		moveLeft = requestAnimationFrame(left);
	}
}

function right()
{
	if(gameOver === false && parseInt(car.style.left) < (container_width - car_width)-270){
		car.style.left = parseInt(car.style.left) + 1 + "%";
		moveRight = requestAnimationFrame(right);
	}
}

function up()
{
	if(gameOver === false && parseInt(car.style.top) > 0){
		car.style.top = parseInt(car.style.top) - 1 + "%";
		moveUp = requestAnimationFrame(up);
	}	
}

function down()
{
	if(gameOver === false && parseInt(car.style.top) < (container_height - car_height)-445){
		car.style.top = parseInt(car.style.top) + 1 + "%";
		moveDown = requestAnimationFrame(down);
	}	
}

restart_btn.addEventListener("click",function(){
	location.reload();
});

anim_id = requestAnimationFrame(repeat);
function repeat()
{
	if(gameOver === false){
		if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3)) {
            stop_the_game();
            return;
        }
		
		carDown(car_1);
		carDown(car_2);
		carDown(car_3);

		lineDown(line_1);
		lineDown(line_2);
		lineDown(line_3);
level_inc();
		anim_id = requestAnimationFrame(repeat);
		
	}
}

function stop_the_game() {
        gameOver = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(moveLeft);
        cancelAnimationFrame(moveRight);
        cancelAnimationFrame(moveUp);
        cancelAnimationFrame(moveDown);
        restart_div.setAttribute("style","display:block;");
        restart_btn.focus();
    }

function carDown(car)
{
	var carTop = parseInt(car.style.top);
	if(carTop > container_height){
		carTop = -200;
		var carLeft = parseInt(Math.random() * (container_width - car_width));
		//console.log(carLeft);
		car.style.left =carLeft+'px';
	}
	car.style.top = carTop +speed+'px';
}

function lineDown(line)
{
	var lineTop = parseInt(line.style.top);
	if(lineTop > container_height){
		lineTop = -300;
	}
	line.style.top = lineTop + lineSpeed +'px';
}

function collision(car1, car2) {
	var x1 = car1.offsetLeft;
	var y1 = car1.offsetTop;
	var h1 = parseInt(car1.style.height);
	var w1 = parseInt(car1.style.width);

	var x2 = car2.offsetLeft;
	var y2 = car2.offsetTop;
	var h2 = parseInt(car2.style.height);
	var w2 = parseInt(car2.style.width);
	
	if(
			(y1 < (y2+h2+5)) && ((x1+w1+5) > x2) && (x1 < (x2+w2+5))  && ((y1+h1+5) > y2)
		) 
	{
		gameOver = true;
		//alert("Game Over");
		//crash.setAttribute("style","display:block;top:"+Math.min(y1,y2)+"px ;left:"+Math.min(x1,x2)+"px; position: relative; z-index:1;");

		
		return true;
	}else{
		return false;
	}
		
}


