/*jshint esversion: 6 */
// setup canvas

// Cria a tela/canvas onde as bolinhas serão desenhadas.
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

//             Construtor do objeto Bolinha
/** Aqui é definido as propriedades de cada bolinha */
function Bolinha(x, y, velX, velY, cor, tamanho){
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.cor = cor;
  this.tamanho = tamanho;
}

// Adiciona o método de desenhar no obj Bolinha
Bolinha.prototype.desenhar = function(){
  ctx.beginPath();
  ctx.fillStyle = this.cor;
  ctx.arc(this.x, this.y, this.tamanho, 0, 2 * Math.PI);
  ctx.fill();
};

// Adicionando o método de atualizar a Bolinha na tela/canvas
Bolinha.prototype.atualizar = function(){

  /** Os 4 ifs verificam se a bolinha chegou a borda do canvas, se sim inverte
   * a polaridade da velocidade X ou Y.
   */
  if ((this.x + this.tamanho) >= width){ 
    this.velX = -(this.velX);
  }

  if ((this.x - this.tamanho) <= 0){ 
    this.velX = -(this.velX);
  }

  if ((this.y + this.tamanho) >= height){
    this.velY = -(this.velY);
  }
  
  if ((this.y - this.tamanho) <= 0){
    this.velY = -(this.velY);
  }
  
  this.x += this.velX;
  this.y += this.velY;

};

// Animando a Bolinha
var lista_bolas = [];


function encher_lista_bolinhas(){
  while (lista_bolas.length < 25) {
    var tamanho = random(10,20);
    var bolinha = new Bolinha(
      /** Novas bolinhas são posicionadas a pelo menos uma bolinha de distância do 
       * limite do canvas/tela para evitar erros de desenho.
       */
      random(0 + tamanho,width - tamanho),
      random(0 + tamanho, height - tamanho),
      random(-7,7),
      random(-7,7),
      'rgb('+ random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')',
      tamanho
    ); 
    lista_bolas.push(bolinha);
  }
}

encher_lista_bolinhas();

function ciclo(){ // Loop de desenho das bolinhas na tela.
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  for(let i = 0; i < lista_bolas.length; i++){
    lista_bolas[i].desenhar();
    lista_bolas[i].atualizar();
    lista_bolas[i].deteccaoColisao();
  }

  requestAnimationFrame(ciclo);
}


// Adicionando Detector de Colisão 
Bolinha.prototype.deteccaoColisao = function(){
  for(let j=0;j<lista_bolas.length;j++){
    if(!(this===lista_bolas[j])){
      var dx = this.x - lista_bolas[j].x;
      var dy = this.y - lista_bolas[j].y;
      var distância = Math.sqrt(dx*dx+dy*dy);

      if(distância < this.tamanho + lista_bolas[j].tamanho){
        lista_bolas[j].cor = this.cor = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
};


ciclo();

