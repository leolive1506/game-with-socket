const screen = document.getElementById('screen')
// passar contexto, 2d ou 3d
const context = screen.getContext('2d')
const currentPlayerId = 'player1'

function createGame() {
    const state = {
        players: {
            'player1': { x: 1, y: 1},
            'player2': { x: 9, y: 9},
        },
        fruits: {
            'fruit1': { x: 3, y: 1}
        }
    }

    function movePlayer(command) {
        const keyPressed = command.keyPressed
        const player = state.players[command.playerId]

        if((keyPressed === 'ArrowUp') && (player.y - 1 >= 0)) {        
            player.y -= 1
            return
        }
    
        if((keyPressed === 'ArrowRight') && (player.x + 1 < screen.width)) {
            player.x += 1
            return
        }
    
        if((keyPressed === 'ArrowDown') && (player.y + 1 < screen.height)) {
            player.y += 1
            return
        }
    
        if((keyPressed === 'ArrowLeft') && (player.x - 1 >= 0)) {
            player.x -= 1
            return
        }
    }

    return {
        movePlayer,
        state
    }
}

const game = createGame()
const keyboardListener = createKeyboardListener()

function createKeyboardListener() {
    document.addEventListener('keydown', handleKeyDown)
    function handleKeyDown(event) {
        const keyPressed = event.key
    
        const command = {
            playerId: 'player1',
            keyPressed
        }
    
        game.movePlayer(command)
    }
}

renderScreen()
function renderScreen() {
    // limapndo todo canvas
    context.fillStyle = 'white'
    context.clearRect(0, 0, 10, 10)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = 'black'
        context.fillRect(player.x, player.y, 1, 1)
    }

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    requestAnimationFrame(renderScreen)
}