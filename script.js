console.log('Flappy Bird')
const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

const planoDeFundo = {//plano de fundo 
    SpriteX: 390,
    SpriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenhar(){
        contexto.fillStyle = '#70c5c3' 
        contexto.fillRect(0, 0, canvas.width, canvas.height)
        contexto.drawImage(
            sprites,
            planoDeFundo .SpriteX, planoDeFundo .SpriteY, //Sprite X, Sprite Y 
            planoDeFundo .largura, planoDeFundo .altura, //tamanho do recorte na sprite
            planoDeFundo .x, planoDeFundo .y,
            planoDeFundo .largura, planoDeFundo .altura,
        )
        contexto.drawImage(
            sprites,
            planoDeFundo .SpriteX, planoDeFundo .SpriteY, //Sprite X, Sprite Y 
            planoDeFundo .largura, planoDeFundo .altura, //tamanho do recorte na sprite
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo .y,
            planoDeFundo .largura, planoDeFundo .altura,
        )
    }
}

const chao = {//chão
    SpriteX: 0,
    SpriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenhar() {
        contexto.drawImage(
            sprites,
            chao.SpriteX, chao.SpriteY, //Sprite X, Sprite Y 
            chao.largura, chao.altura, //tamanho do recorte na sprite
            chao.x, chao.y,
            chao.largura, chao.altura,
        )
        contexto.drawImage(
            sprites,
            chao.SpriteX, chao.SpriteY, //Sprite X, Sprite Y 
            chao.largura, chao.altura, //tamanho do recorte na sprite
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura,
        )

    }
}

const flappyBird = {//passarinho
    SpriteX: 0,
    SpriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    desenhar() {
        contexto.drawImage(
            sprites,
            flappyBird.SpriteX, flappyBird.SpriteY, //Sprite X, Sprite Y 
            flappyBird.largura, flappyBird.altura, //tamanho do recorte na sprite
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,

        )
    }
}

function loop() {
    planoDeFundo.desenhar()
    chao.desenhar()
    flappyBird.desenhar()

    flappyBird.y = flappyBird.y + 1
    requestAnimationFrame(loop)
}
loop()