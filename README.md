# Ideia do jogo
- Compotição em tempo real, começa aparecer fruta no caminho, quem pegar mais ganha, acumula mais pontos ganha

- Deploy rapido
	- ssh -R leonardo:80:localhost:80 serveo.net

# Deply gitpod.io
```sh
# frente a url git
gitpod.io/#https://github.com/filipedeschamps/meu-primeiro-jogo-multiplayer
```

# Ver portas que estão rodando
```sh
netstat -tulpn
netstat -tulpn | grep :80
```

- Server e client
## Camadas
	1. responsabilidade: Apresentação
		- Usando canvas
		- Graficos na tela, so deve imprimir os dados
	2. Lógica (jogo)
		- Regras
		- Dados
	3. Inputs (interações jogados)
		- Teclas apertadas
		- Enviadas pra camada do jogo, server com a lógica
			- Que manda para camada que renderiza
	4. Networking (trca informação com sersver)
		- Deixar players sincronizados

# Ex simples config canvas
```html
   <canvas id="screen" width="500" height="500"></canvas>

    <script>
        const screen = document.getElementById('screen')
        // passar contexto, 2d ou 3d
        const context = screen.getContext('2d')

        const color = 'red'
        const positionX = 0
        const positionY = 0
        const width = 250
        const height = 250

        context.fillStyle = color
        context.fillRect(positionX, positionY, width, height)
    </script>
```

## requestAnimationFrame()
- Quando for usar uma função recusiva (que chama a si mesma)
	- indicado usar pois quando a aba estiver no navegado e não estiver ativa, reduz a quantidade de vzes que a função é chamada p economizera processamento e energia
```js
requestAnimationFrame(funcao_ser_chamada)
```
# Tecnicas
## Clear screen
- Em jogos é comum quando mudar valor pixel de um obj, ele não remover o antigo
	- A tecnica tem como proposito antes de desenhar a prox animação, dar um clear na tela toda pra começar tudo do zero

# Desing Patterns
## Separation of concerns
- **preocupação com cada aspecto, modularizadamente.** 
- Cada coisa tem sua função e deve ser capaz de alterar cada coisa separadamente
	
- Pensar de forma abstrata
	- Olha codigo matriz e ver como isso pode ser representado de forma visual

## Acoplamento
- Independente de quantas peças tenham um evento, não precisa alterar o codigo original, so vai engatando as novas peças que precisam da alteração
- Sempre fazer uma pergunta a cada linha de código
	- De quem é esse código? Pq assim começa a perceber os lugares de cada coisa
 - 3 estágios de acoplamento
	1. Vários componentes misturados
	2. Apesas de os componentes estarem separados, um código conhece o outro, ele chama o outro componente de forma estática, de forma explícita
	3. Componentes não se conhecem nem de forma estática, pois não existe declaraçao ou chamada dentro dele
		- Para chegar nesse nível de acoplamento, usado no codigo Observer



## Factory
- Função que quando executada, retorna um objeto

## Injeção de depencia
- Injetar uma intancia de um objeto

## Observer
- Ficam observando um determinado objeto
- Criando um 
- Ex abaixo: Increve uma função que vai receber o comando, e assim que digitar algo, executa todas as funções no array observers
```js
const keyboardListener = createKeyboardListener()
// escreve a função movePlayer dentro do subscribe
keyboardListener.subscribe(game.movePlayer)

function createKeyboardListener() {
    const state = {
        observers: []
    }
    // observer se registrar dentro um subject
    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        console.log(`Notifying ${state.observers.length} observers`)

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
```

# Dicas gerais
- pegar toda tecla digitada
```js
document.addEventListener('keydown', handleKeyDown)
function handleKeyDown(event) {
    console.log(event)
}
```