function Enemy (hp,attack,type,sprite) {
  this.currentHP = hp*50;
  this.maxHP = hp*50;
  this.attack = attack*5;
  this.type = type;
  this.sprite = sprite;
}

var enemy;
var randomPokemon=[];
var randomEnemy;

// function pickRandomEnemy() {
//   randomEnemy = randomPokemon[Math.floor(Math.random()*randomPokemon.length)];
//   console.log(randomEnemy);
//   (function () {
//     enemy = new Enemy(randomEnemy.hp,randomEnemy.attack,randomEnemy.type,randomEnemy.sprite);
//     console.log(enemy);
//     (function() {
//       enemy.newType();
//       console.log(enemy);
//     });
//   });
// }
Enemy.prototype.newType = function() {
  if(this.type=='fire'){
    this.type = 'html';
  }
  else if(this.type=='water') {
    this.type = 'css';
  }
  else if(this.type=='grass') {
    this.type = 'javascript';
  }
  console.log(this.type);
};

function chooseRandomPokemon() {
  randomEnemy = randomPokemon[Math.floor(Math.random()*randomPokemon.length)];
  console.log(randomPokemon);
}

function makeNewPokemon() {
  enemy = new Enemy(randomEnemy.hp,randomEnemy.attack,randomEnemy.type,randomEnemy.sprite);
  console.log(enemy);
}

function convertNewType() {
  enemy.newType();
  console.log(enemy);
}

// $.get('http://localhost:3000/getRandom', function(data) {
//   randomPokemon=data;
//   console.log(randomPokemon);
// }).then(function() {
//   randomEnemy = randomPokemon[Math.floor(Math.random()*randomPokemon.length)];
// }).then(function() {
//   enemy = new Enemy(randomEnemy.hp,randomEnemy.attack,randomEnemy.type,randomEnemy.sprite);
//   console.log(enemy);
// }).then(function() {
//   enemy.newType();
//   console.log(enemy);
// });

$.get('http://localhost:3000/getRandom', function(data) {
  randomPokemon=data;
  console.log(randomPokemon);
})
.then(function(){chooseRandomPokemon();})
.then(function(){makeNewPokemon();})
.then(function(){convertNewType();});
