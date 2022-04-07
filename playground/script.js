const screen = document.getElementById('screen')
// passar contexto, 2d ou 3d
const context = screen.getContext('2d')
const currentPlayerId = 'player1'

function createGame() {
    const state = {
        players: {},
        fruits: {}
    }

    function addPlayer({ playerId, playerX: x, playerY: y }) {
        state.players[playerId] = { x, y }
    }

    function removePlayer({ playerId }) {
        delete state.players[playerId]
    }

    function addFruit({ fruitId, fruitX: x, fruitY: y }) {
        state.fruits[fruitId] = { x, y }
    }

    function removeFruit({ fruitId }) {
        delete state.fruits[fruitId]
    }

    function movePlayer(command) {
        const acceptedMoves = {
            ArrowUp(player) {
                if(player.y - 1 >= 0) {        
                    player.y -= 1
                }
            },
            ArrowRight(player) {
                if(player.x + 1 < screen.width) {
                    player.x += 1
                }
            },
            ArrowDown(player) {
                if(player.y + 1 < screen.height) {
                    player.y += 1
                }
            },
            ArrowLeft(player) {
                if(player.x - 1 >= 0) {
                    player.x -= 1
                }
            }
        }

        const keyPressed = command.keyPressed
        const playerId = command.playerId
        const player = state.players[playerId]
        const moveFunction = acceptedMoves[keyPressed]

        function checkForFruitCollision(playerId) {
            // vericando colisão somente com id atual
            const player = state.players[playerId]

            for (const fruitId in state.fruits) {
                const fruit = state.fruits[fruitId]
                console.log(`Checking ${playerId} and ${fruitId}`)

                if (player.x === fruit.x && player.y === fruit.y) {
                    console.log(`COLLISION BETWEEN ${playerId} and ${fruitId}`)
                    removeFruit({ fruitId })
                }
            }
        }

        if (player && moveFunction) {
            moveFunction(player)
            checkForFruitCollision(playerId)
        }
    }

    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state
    }
}

const game = createGame()
const keyboardListener = createKeyboardListener()
keyboardListener.subscribe(game.movePlayer)

game.addPlayer({ playerId: 'player1', playerX: 5, playerY: 5 })
game.addFruit({ fruitId: '1', fruitX: 1, fruitY: 1 })
game.addPlayer({ playerId: 'player2', playerX: 0, playerY: 0 })
game.addFruit({ fruitId: '2', fruitX: 4, fruitY: 4 })

function createKeyboardListener() {
    const state = {
        observers: []
    }
    // observer se registrar dentro um subject
    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', handleKeyDown)
    function handleKeyDown(event) {
        const keyPressed = event.key
    
        const command = {
            playerId: 'player1',
            keyPressed
        }
        
        notifyAll(command)
    }

    return {
        subscribe
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