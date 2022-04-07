document.addEventListener('keydown', handleKeyDown)

// função deveria apenas receber eventos do input e tem regras de negocio no meio
function handleKeyDown(event) {
    const keyPressed = event.key
    const player = game.players[currentPlayerId]

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
