# [JOGUE AGORA AQUI!](https://game.jhonnatanmesquita.com.br/tap-ball) 

# TAP BALL

 Game no estilo arcade criado utilizando Phaser3, ES6 e Webpack; <br/>
 Baseado em jogos já criados como: Circle Path e Risky Steps, e na dificuldade do famoso Flappy Bird; <br/> 
 O jogador tem como objetivo conquistar o máximo de pontos acertando a bola giratória o mais próximo que conseguir do centro da próxima bola do caminho; <br/>
### Modos de jogo
- <b>CLASSIC:</b> O jogador não possui tempo e a bola gira em uma velocidade normal;
- <b>TIME ATTACK:</b> O jogador tem 60 segundo para chegar o mais longe que conseguir com a bola girando em velocidade normal no começo, porém, a cada 10 pontos a velocidade de giro da bola aumenta um pouco e a cada 100 pontos o jogador ganha +30 segundos no tempo; <br/>
- <b>NIGHTMARE:</b> O jogador não possui tempo, porém a bola gira mais rápido, e após conquistar um ponto a bola não poderá ultrapassar a próxima bola no caminho; <br/>
- <b>IMPOSSIBLE:</b> O jogador não possui tempo e a bola gira consideravelmente mais rápido que os demais modos;

# Prévia
![preview](http://jhonnatanmesquita.com.br/game/tap-ball/assets/preview/preview.gif)

# Ideia e motivação
Esse é um 'remake' de um game que comecei a desenvolver durante a faculdade, pegando bastante carona no protótipo do artigo da [emanueleferonato](https://www.emanueleferonato.com/2016/02/11/html5-prototype-of-ios-game-circle-path-made-with-phaser/); <br/>
Originalmente esse game estava sendo feito em Javascript e Phaser v2.6 (tanto meu projeto quanto no protótipo do artigo), mas para  pôr meus conhecimentos e experiencias em pratica, resolvi refazê-lo utilizando o Phaser3 e EC6 com WebPack, o que foi ótimo, pois com o EC6 a organização, desenvolvimento e distribuição fica muito mais simples, além de ficar mais próximo de frameworks que ja tenho mais afinidade como Angular e Ionic, o que facilitou bastante o desenvolvimento; <br/>
Para dar uma diferenciada do protótipo da Emanuele e torná-lo um jogo finalizado, resolvi por fazer algumas sutis alterações na game play, além de adicionar menu, efeitos sonoros, efeitos visuais e modos de jogo;
   

# Instalação
## 1. Clone este repositório:

Escolha uma pasta de sua preferência

E execute o comando:

```git clone https://github.com/JhonnatanMesquita/tap-ball.git```

## 2. Instale o node.js:

https://nodejs.org/en/


## 3. Instale as dependências do projeto:

Navegue até a pasta que você clonou o repositório

E execute o comando:

```npm install``` 

## 4. Executando o servidor de desenvolvimento:

Execute o comando:

```npm run dev```

Para ver o jogo funcionando basta acessar o endereço http://localhost:3000 em seu navegador.


## Empacotar o projeto para distribuição:

Execute o comando:

```npm run deploy```

Isso otimizará e minimizará o projeto compilado. Os arquivos para distribuição ficam na pasta /dist
