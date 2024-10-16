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
    desenhar() {
        contexto.fillStyle = '#70c5c3'
        contexto.fillRect(0, 0, canvas.width, canvas.height)
        contexto.drawImage(
            sprites,
            planoDeFundo.SpriteX, planoDeFundo.SpriteY, //Sprite X, Sprite Y 
            planoDeFundo.largura, planoDeFundo.altura, //tamanho do recorte na sprite
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
        )
        contexto.drawImage(
            sprites,
            planoDeFundo.SpriteX, planoDeFundo.SpriteY, //Sprite X, Sprite Y 
            planoDeFundo.largura, planoDeFundo.altura, //tamanho do recorte na sprite
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura,
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
    gravidade: 0.25,
    velocidade: 0,
    atualizar() {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade

        flappyBird.y = flappyBird.y + flappyBird.velocidade
    },
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

const mensagemGetReady = { //mensagemGetReady
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenhar() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY, //Sprite sX, Sprite sY
            mensagemGetReady.w, mensagemGetReady.h, //tamanho do recorte na sprite
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h,
        )
    }
}

//
// telas
//
let telaAtiva = {}
function mudaParaTela(novaTela) {
    telaAtiva = novaTela
}
const telas = {
    INICIO: {
        desenhar() {
            planoDeFundo.desenhar()
            chao.desenhar()
            flappyBird.desenhar()
            mensagemGetReady.desenhar()
        },
        click(){
            mudaParaTela(telas.JOGO)
        },
        atualizar() {

        }
    }
}

telas.JOGO = {
    desenhar() {
        planoDeFundo.desenhar()
        chao.desenhar()
        flappyBird.desenhar()
    },
    atualizar() {
        flappyBird.atualizar()
    }
}

function loop() {

    telaAtiva.desenhar()
    telaAtiva.atualizar()

    requestAnimationFrame(loop)
}

window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click()
    }
})
mudaParaTela(telas.INICIO)
loop()