const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7 

class Sprite {
	constructor({position, velocity, color = 'red', offset }) {
		this.position = position
		this.velocity = velocity
		this.width = 50
		this.height = 150
		this.lastKey
		this.attackBox = {
			position: {
				x:this.position.x,
				y:this.position.y
			},
			offset,
			width: 100 ,
			height: 50
		}
		this.color = color
		this.isAttacking
		this.health = 100
	}

	draw() {
		c.fillStyle = this.color
		c.fillRect(this.position.x, this.position.y, this.width, this.height)

		//caixa de ataque
		if (this.isAttacking){
		c.fillStyle = 'green'
		c.fillRect(
			this.attackBox.position.x,
			this.attackBox.position.y, 
			this.attackBox.width,
			this.attackBox.height
			)
			} 
	}
z
	update() {
		this.draw()
		this.attackBox.position.x = this.position.x + this.attackBox.offset.x 
		this.attackBox.position.y = this.position.y

		this.position.x += this.velocity.x
		this.position.y += this.velocity.y 

		if (this.position.y + this.height +this.velocity.y >= canvas.height){
			this.velocity.y = 0
		} else this.velocity.y += gravity
	}

	attack() {
		this.isAttacking = true 
		setTimeout(() => {
			this.isAttacking = false

		}, 100)
		}
		}

const player = new Sprite({
	position: {
		x: 0,
		y:0
	},
	velocity: {
		x:0,
		y:0
	},
	offset:{
		x:0,
		y:0
	}
})

const enemy = new Sprite({
	position: {
		x: 400,
		y:100
	},
	velocity: {
		x:0,
		y:0
	}, 
	color: 'blue',
	offset:{
		x: -50,
		y:0
	}
})
const keys = {
	a: {
		pressed: false
	},
	d: {
		pressed: false
	},
	w: {
		pressed: false
	},
	ArrowRight: {
		pressed: false
	},
	ArrowLeft: {
		pressed: false
	}
}

console.log(player);

function rectangularCollision({rectangular1, rectangular2}) {
	return ( 
		rectangular1.attackBox.position.x + rectangular1.attackBox.width >= 
		rectangular2.position.x &&
	    rectangular1.attackBox.position.x <= 
	    rectangular2.position.x + rectangular2.width && 
	    rectangular1.attackBox.position.y + rectangular1.attackBox.height >=
	     rectangular2.position.y &&
	    rectangular1.attackBox.position.y <= rectangular2.position.y + rectangular2.height 
		)
}
function determineWinner({player, enemy, timerId}) {
	clearTimeout(timerId)
	document.querySelector('#displayText').style.display = 'flex'
if(player.health === enemy.health) {
	document.querySelector('#displayText').innerHTML = 'Empate'
} else if (player.health > enemy.health) {
	document.querySelector('#displayText').innerHTML = 'Jogador 1 Ganhou'
} else if ( player.health < enemy.health){
	document.querySelector('#displayText').innerHTML = 'Jogador 2 Ganhou'
}
}

let timer = 60
let timerId
function decreaseTimer() {
if (timer > 0)
{
timerId = setTimeout(decreaseTimer,1000)
	timer--
document.querySelector('#timer').innerHTML = timer
}

if(timer === 0){

	determineWinner({player, enemy, timerId})
}
}

decreaseTimer()

function animate() {
	window.requestAnimationFrame(animate)
	c.fillStyle = 'black'
	c.fillRect(0, 0, canvas.width, canvas.height)
	player.update()
	enemy.update()

player.velocity.x = 0
enemy.velocity.x = 0

//movimento do jogador
	if(keys.a.pressed && player.lastKey === 'a'){
		player.velocity.x = -5
	} else if (keys.d.pressed && player.lastKey === 'd') {
		player.velocity.x = 5
	}

	//movimento do inimigo
	if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
		enemy.velocity.x = -5
	} else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
		enemy.velocity.x = 5
	}

	//detector de colisão 
	if (
		rectangularCollision({
			rectangular1: player,
			rectangular2: enemy
		}) && 
	  player.isAttacking 
	 ){
	 	player.isAttacking = false
	 enemy.health -= 20
		document.querySelector('#enemyHealth').style.width = enemy.health + '%'
	}

	if (
		rectangularCollision({
			rectangular1: enemy,
			rectangular2: player
		}) && 
	  enemy.isAttacking 
	 ){
	 	enemy.isAttacking = false
	  player.health -= 20
		document.querySelector('#playerHealth').style.width = player.health + '%'
	}

	// Fim do Jogo pela Vida 
	if (enemy.health <= 0 || player.health <= 0 ){
		determineWinner({player, enemy, timerId})
	}

}

animate()

window.addEventListener('keydown', (event) =>{
	switch (event.key) {
	case 'd':
		keys.d.pressed = true
		player.lastKey = 'd'
		break
	case 'a':
		keys.a.pressed = true
		player.lastKey = 'a'
		break
	case 'w':
		player.velocity.y = -20
		break

	case' ':
		player.attack()
		break

	case 'ArrowRight':
		keys.ArrowRight.pressed = true
		enemy.lastKey = 'ArrowRight'
		break
	case 'ArrowLeft':
		keys.ArrowLeft.pressed = true
		enemy.lastKey = 'ArrowLeft' 
		break
	case 'ArrowUp':
		enemy.velocity.y = -20
		break
	case 'ArrowDown':
		enemy.isAttacking = true
		break
	 	}
	console.log(event.key)
})

	

window.addEventListener('keyup',(event) =>{
	switch(event.key){
	case 'd':
		keys.d.pressed = false
		break
	case 'a':
		keys.a.pressed = false
		break
	case 'w':
		keys.w.pressed = false
		break
	}

	// teclas do inimigo
	switch(event.key){
	case 'ArrowRight':
		keys.ArrowRight.pressed = false
		break
	case 'ArrowLeft':
		keys.ArrowLeft.pressed = false
		break
	case 'ArrowUp':
		keys.ArrowUp.pressed = false
		break
	}	
})

