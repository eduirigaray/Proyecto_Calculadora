
// Boton Jugar
let startButton = document.querySelector('#play')

// Estado del juego, empieza parado, variable de control
let gameStatus = 'stale'

// Función que comienza la partida
function playGame()
{
	// Grid de bloques
	let grid = document.querySelectorAll('.block')

	// Bloque golpeado
	let hitPosition

	// Score
	let score = 0

	// Punto que se puede conseguir, empieza a 0
	let pointGainedOnce=0

	//Temporizadores
	let timer__html = document.querySelector('#timer')
	let timeLeft = document.querySelector('#dur__drop').value
	let gameSpeed = document.querySelector('#gameSpeed').value

	// Se inicia el intervalo del juego, con el tiempo seleccionado
	let timerID = setInterval(function()
	{
		// Si el temporizador llega a 0
		if (timeLeft<1)
		{
			// Se para el intervalo
			clearInterval(timerID)

			// Se para el juego
			gameStatus='stale'

			// Se reinicia el texto botón Jugar
			document.querySelector('#play__text').textContent='Juega otra vez'

			// Se reinicia el estilo del botón Jugar
			startButton.style.background='#27ae60'    
			startButton.style.fontWeight='Initial'

			// Se muestra el modal final de partida
			modal.style.display = 'block'

			// Se actualiza el texto de la puntuación
			document.querySelector('#modal--score').textContent=score

			// Se deshabilita la selección de tiempo de juego
			document.querySelector('#dur__drop').disabled=false

			// Se deshabilita la selección de velocidad
			document.querySelector('#gameSpeed').disabled=false

			// Permite el control de los elementos con el cursor del ratón
			document.querySelector('.box').style.cursor='pointer'
			document.querySelector('#gameSpeed').style.cursor='pointer'
			document.querySelector('.duration').style.cursor='pointer'
			document.querySelector('#dur__drop').style.cursor='pointer'
		}

		// Se actualizan los temporizadores
		timer__html.textContent=timeLeft
		timeLeft--

	}, 1000)

	// Funcion que añade aleatoriamente un fantasma
	function popTom(randomBLockNo)
	{
		grid[randomBLockNo].classList.add('tom')
	}

	// Funcion que borrra el fantasma
	function removeTom(){
		grid.forEach(element => {
			element.classList.remove('tom')
		})
	}

	// Se añade listeners click al grid de botones
	grid.forEach(element =>
	{
		element.addEventListener('click',()=>
		{
			// Si si acierta al fantasma aumenta la puntuación y se actualiza el marcador
			if(element.id == hitPosition+1 && timeLeft > 0 && pointGainedOnce)
			{
				score++
				document.querySelector('#score__text').textContent = score 
				pointGainedOnce=0           
			}
		})
	})

	// Se inicia el intervalo de los fantasmas, con la velocidad elegida
	let tomTimer = setInterval(() =>
	{
		// Si el temporizador llega a 0
		if (timeLeft < 1)
		{
			// Se para el intervalo
			clearInterval(tomTimer)
		}

		// Se borra el fantasma
		removeTom()

		// Se genera un numero, una posicion de grid aleatoria
		let randomBLockNo = Math.floor((Math.random())*16)

		// Se guarda la posicion
		hitPosition = randomBLockNo

		// Se añade el fantasma a la posicion generada
		popTom(randomBLockNo)

		// Punto que se puede conseguir disponible
		pointGainedOnce=1

	}, gameSpeed)

}

// Se añade un listener click al botón Jugar
startButton.addEventListener('click',()=>
{
	// Si esta el juego parado
	if (gameStatus == 'stale')
	{
		// Empieza la partida
		playGame()

		// Se inicializa la puntuación a 0
		document.querySelector('#score__text').textContent='0'

		// Se deshabilitan los botones de velocidad y duración
		document.querySelector('#dur__drop').disabled=true
		document.querySelector('#gameSpeed').disabled=true

		// Se deshabilita el control de los elementos con el cursor del ratón
		document.querySelector('.box').style.cursor='auto'
		document.querySelector('#gameSpeed').style.cursor='auto'
		document.querySelector('.duration').style.cursor='auto'
		document.querySelector('#dur__drop').style.cursor='auto'

		// Variable de control a ejecutando
		gameStatus='Running'

		// Se cambia el estilo del botón jugar
		startButton.style.background='#2980b9'
        
		// Se cambia el texto del botón Jugar
		document.querySelector('#play__text').textContent='Ha empezado la partida!!' 
	}   

})

// Modal
let modal = document.getElementById('myModal')

// Elemento que cierra el modal
let span = document.getElementsByClassName('close')[0]

// Cuando el usuario hace click en la cruz de la ventana del modal se cierra
span.onclick = function()
{
	modal.style.display = 'none'
}

// Cuando el usuario hace click fuera del modal se cierra
window.onclick = function(event)
{
	if (event.target == modal)
	{
		modal.style.display = 'none'
	}
}
