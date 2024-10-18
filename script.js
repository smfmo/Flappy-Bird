console.log('Flappy Bird')

let frames = 0
const som_HIT = new Audio()
som_HIT.src = './efeitos/hit.wav'

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

function criaChao() {//chão
    const chao = {
        SpriteX: 0,
        SpriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualizar() {
            const movimentoDoChao = 1
            const repeteEm = chao.largura / 2
            const movimentacao = chao.x - movimentoDoChao

            //console.log('[chao.x]', chao.x)
            //console.log('[repeteEm]', repeteEm)
            //console.log('[movimentacao]', movimentacao % repeteEm)

            chao.x = movimentacao % repeteEm

        },
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
    return chao
}


function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura
    const chaoY = chao.y

    if (flappyBirdY >= chaoY) {
        return true
    }

    return false
}

function criaFlappyBird() {
    const flappyBird = {//passarinho
        SpriteX: 0,
        SpriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            console.log('devo pular')
            console.log('[antes]', flappyBird.velocidade)
            flappyBird.velocidade = - flappyBird.pulo
            console.log('[depois]', flappyBird.velocidade)
        },
        gravidade: 0.25,
        velocidade: 0,
        atualizar() {
            if (fazColisao(flappyBird, globais.chao)) {
                console.log('fez colisao')
                som_HIT.play()

                mudaParaTela(telas.GAME_OVER)
                return
            }
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
            flappyBird.y = flappyBird.y + flappyBird.velocidade
        },
        movimentos: [
            { SpriteX: 0, SpriteY: 0, }, //asa do pássaro para cima
            { SpriteX: 0, SpriteY: 26, }, //asa do pássaro no meio
            { SpriteX: 0, SpriteY: 52, }, //asa do pássaro para baixo
        ],
        frameAtual: 0,
        atualizarOFrameAtual() {
            const intervaloDeFrames = 10
            const passouOIntervalo = frames % intervaloDeFrames === 0
            if (passouOIntervalo) {
                const baseDoIncremento = 1
                const incremento = baseDoIncremento + flappyBird.frameAtual
                const baseRepeticao = flappyBird.movimentos.length
                flappyBird.frameAtual = incremento % baseRepeticao
            }
        },
        desenhar() {
            flappyBird.atualizarOFrameAtual()
            const { SpriteX, SpriteY } = flappyBird.movimentos[flappyBird.frameAtual]

            contexto.drawImage(
                sprites,
                SpriteX, SpriteY, //Sprite X, Sprite Y 
                flappyBird.largura, flappyBird.altura, //tamanho do recorte na sprite
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,

            )
        }
    }
    return flappyBird
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
const mensagemGameOver = { //mensagemGetReady
    sX: 134,
    sY: 153,
    w: 226,
    h: 200,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    desenhar() {
        contexto.drawImage(
            sprites,
            mensagemGameOver.sX, mensagemGameOver.sY, //Sprite sX, Sprite sY
            mensagemGameOver.w, mensagemGameOver.h, //tamanho do recorte na sprite
            mensagemGameOver.x, mensagemGameOver.y,
            mensagemGameOver.w, mensagemGameOver.h,
        )
    }
}

function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        desenhar() {
            canos.pares.forEach(function (par) {
                const yRandom = par.y
                const espacamentoEntreCanos = 90

                const canoCeuX = par.x
                const canoCeuY = yRandom

                //Cano do céu
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )
                //Cano do chão
                const canoChaoX = par.x
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura,
                )

                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY
                }
            })
        },
        temColisaoComOFlappyBird(par) {
            const cabecaDoFlappy = globais.flappyBird.y
            const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura

            if ((globais.flappyBird.x + globais.flappyBird.largura) >= par.x) {
                console.log('flappy bird invadiu a area dos canos')
                if (cabecaDoFlappy <= par.canoCeu.y) {
                    return true
                }

                if (peDoFlappy >= par.canoChao.y) {
                    return true
                }
            }
            return false
        },
        pares: [],
        atualizar() {

            const passou100Frames = frames % 100 === 0
            if (passou100Frames) {
                console.log('passou 100 frames')
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1),
                })
            }

            canos.pares.forEach(function (par) {
                par.x = par.x - 2

                if (canos.temColisaoComOFlappyBird(par)) {
                    console.log('vc perdeu')

                    mudaParaTela(telas.GAME_OVER)
                    som_HIT.play()
                }
                if (par.x + canos.largura <= 0) {
                    canos.pares.shift()
                    const som_HIT = new Audio()
                    som_HIT.src = './efeitos/ponto.wav'
                    som_HIT.play()
                }
            })
        }
    }
    return canos
}

function criaPlacar() {
    const placar = {
        pontuacao: 0,
        desenhar() {
            contexto.font = '35px VT323'
            contexto.textAlign = 'right'
            contexto.fillStyle = 'white'
            contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35)
            placar.pontuacao
        },
        atualizar() {
            const intervaloDeFrames = 10
            const passouOIntervalo = frames % intervaloDeFrames === 0


            if (passouOIntervalo) {
                placar.pontuacao = placar.pontuacao + 1
            }

        },
    }

    return placar
}

//
// telas
//
const globais = {}
let telaAtiva = {}
function mudaParaTela(novaTela) {
    telaAtiva = novaTela

    if (telaAtiva.inicializar) {
        telaAtiva.inicializar()
    }
}
const telas = {
    INICIO: {
        inicializar() {
            globais.flappyBird = criaFlappyBird()
            globais.chao = criaChao()
            globais.canos = criaCanos()
        },
        desenhar() {
            planoDeFundo.desenhar()
            globais.flappyBird.desenhar()
            globais.canos.desenhar()
            globais.chao.desenhar()
            mensagemGetReady.desenhar()
        },
        click() {
            mudaParaTela(telas.JOGO)
        },
        atualizar() {
            globais.chao.atualizar()
        }
    }
}

telas.JOGO = {
    inicializar() {
        globais.placar = criaPlacar()
    },
    desenhar() {
        planoDeFundo.desenhar()
        globais.canos.desenhar()
        globais.chao.desenhar()
        globais.flappyBird.desenhar()
        globais.placar.desenhar()
    },
    click() {
        const som_HIT = new Audio()
        som_HIT.src = './efeitos/pulo.wav'
        globais.flappyBird.pula()
        som_HIT.play()

    },
    atualizar() {
        globais.canos.atualizar()
        globais.chao.atualizar()
        globais.flappyBird.atualizar()
        globais.placar.atualizar()
    }
}

telas.GAME_OVER = {
    desenhar() {
        mensagemGameOver.desenhar()
    },

    atualizar() {
    },
    click() {
        mudaParaTela(telas.INICIO)
    }
}

function loop() {

    telaAtiva.desenhar()
    telaAtiva.atualizar()

    frames = frames + 1
    requestAnimationFrame(loop)
}

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click()
    }
})
mudaParaTela(telas.INICIO)
loop()