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
if (timer > 0){
timerId = setTimeout(decreaseTimer,1000)
	timer--
document.querySelector('#timer').innerHTML = timer
}

if(timer === 0){

	determineWinner({player, enemy, timerId})
}
}