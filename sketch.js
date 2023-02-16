let xBolinha = 300;
let yBolinha = 200;
let diametroBolinha = 20;
let raioBolinha = diametroBolinha / 2;

let velocidadeXBolinha = 5;
let velocidadeYBolinha = -5;

let xRaquete = 5
let yRaquete = 170
let compRaquete = 10
let altRaquete = 70

let xRaqueteOponente = 580;
let yRaqueteOponente = 170;
let velocidadeXRaqueteOponente;
let velocidadeYRaqueteOponente;

let meusPontos = 0;
let pontosOponente = 0;

let raquetada;
let ponto;
let trilha;

let chanceDeErrar = 0;

let colidiu = false

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  
  mostraBolinha();
  moveBolinha();
  verificaColisaoBorda();
  
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  moveRaquete();
  moveRaqueteOponente();
  //moveRaqueteOponenteWS();
  
  //verificaColisaoRaquete();
  colisaoRaqueteBib(xRaquete, yRaquete);
  colisaoRaqueteBib(xRaqueteOponente, yRaqueteOponente);
  
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
  }

function mostraBolinha() {
  circle(xBolinha,yBolinha,diametroBolinha)   
}

function moveBolinha() {
   xBolinha += velocidadeXBolinha
  yBolinha += velocidadeYBolinha  
  
}

function verificaColisaoBorda(){
   if(xBolinha + raioBolinha > width || xBolinha - raioBolinha <0){
    velocidadeXBolinha *= -1;
      }
  
  if(yBolinha + raioBolinha > height || yBolinha - raioBolinha <0){
    velocidadeYBolinha *= -1;
      }
}
  
function mostraRaquete(x, y) {
     rect(x, y, compRaquete, altRaquete);
}

function moveRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}

function moveRaqueteOponente(){
  velocidadeYRaqueteOponente = yBolinha - yRaqueteOponente - (compRaquete / 2) - 80;
  yRaqueteOponente += velocidadeYRaqueteOponente + chanceDeErrar;
  calculaChanceDeErrar();
  
}

function calculaChanceDeErrar(){
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function moveRaqueteOponenteWS(){
  if (keyIsDown(87)) {
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(83)) {
        yRaqueteOponente += 10;
    }
}

function verificaColisaoRaquete(){
  if (xBolinha - raioBolinha < xRaquete + compRaquete 
  && yBolinha - raioBolinha < yRaquete + altRaquete 
  && yBolinha + raioBolinha > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
  
function colisaoRaqueteBib(x, y){
  colidiu = 
  collideRectCircle(x, y, compRaquete, altRaquete, xBolinha, yBolinha, raioBolinha);
  
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar(){
  stroke(255);
  textSize(16);
  textAlign(CENTER);
  fill(color(255, 140, 0));
  rect(130, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 26);
  fill(color(255, 140, 0));
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosOponente, 450, 26);
    
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos +=1
    ponto.play();
  }
  if(xBolinha < 10){
    pontosOponente +=1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raioBolinha < 0){
    xBolinha = 23
    }
}