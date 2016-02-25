var lastTime;
var gameTime = 0;
var leftMarginTextPadding = 5;
var displayBottomBoxHeight = 100;
var displayBottomBoxLeftPadding = 0;
var displayBottomBoxBottomPadding = 20;
var displayBottomBoxesGutterPadding = 0;
// var appWidth = canvas.getAttribute('width');
// var appHeight = canvas.getAttribute('height');
var attackButton = {
  x:207,
  y:358,
  width:144,
  height:119
};

var htmlAttackButton = {
  x:207,
  y:358,
  width:144,
  height:119
};

var cssAttackButton = {
  x:352,
  y:358,
  width:144,
  height:119
};

var jsAttackButton = {
  x:497,
  y:358,
  width:144,
  height:119
};

var hero = {
  name:'Charlie',
  currentHP: 10000,
  maxHP: 10000,
  minAttack: 500,
  maxAttack: 1000
};
// var enemy = {
//   name:'bug',
//   currentHP: 1000,
//   maxHP: 1000
// };
var newBattle;
var upperTextBox = new Image();
var background = new Image();
var monster = new Image();
var heroStats = new Image();
var battleOptions = new Image();
var shield = new Image();
var textbox = new Image();
var heroHealthBar = new Image();
var enemyHealthBar = new Image();
var heroHealthBarBackground = new Image();
var enemyHealthBarBackground = new Image();
var enemyHealthBarWidth = 160;
var enemyHealthBarHeight = 10;
var heroHealthBarWidth = 160;
var heroHealthBarHeight = 10;
upperTextBox.src = 'images/battleScene/upperTextBox1.png';
heroStats.src = 'images/battleScene/heroStatus1.png';
heroStats.xcoord = (displayBottomBoxLeftPadding);
heroStats.ycoord = (appHeight - displayBottomBoxHeight - displayBottomBoxBottomPadding);
console.log(heroStats.xcoord);
console.log(heroStats.ycoord);
background.src = 'images/battleScene/bg.png';
battleOptions.src = 'images/battleScene/battleOptions1.png';
shield.src = 'images/shield.png';
heroHealthBar.src = 'images/battleScene/hpBar.png';
enemyHealthBar.src = 'images/battleScene/hpBar.png';
heroHealthBarBackground.src = 'images/battleScene/hpBarBackground.png';
enemyHealthBarBackground.src = 'images/battleScene/hpBarBackground.png';

var drawMonster = function(){
  ctx.drawImage(monster,282,140);
};
function battleState(){
  newBattle = true;
  monster.src = enemy.sprite;
  hero.currentHP = hero.maxHP;
  enemy.currentHP = enemy.maxHP;
  console.log('player' + hero.currentHP);
  console.log('enemy' + enemy.currentHP);
  clearCanvas(ctx);
  healthBarRender(1, 1);
  // background.onload = function(){
  //   ctx.drawImage(background,0,0);
  // };
  // monster.onload = function(){
  //   ctx.drawImage(monster,282,140);
  // };
  // heroStats.onload = function(){
  //   ctx.drawImage(heroStats,5,375);
  // };
  // battleOptions.onload = function(){
  //   ctx.drawImage(battleOptions, 230, 375);
  // };
  // shield.onload = function(){
  //   ctx.drawImage(shield, 165, 375);
  // };
//define event listeners for battle scene
  canvas.addEventListener('mousemove', checkPosBattle);
  canvas.addEventListener('mouseup', checkClickBattle);
  //TODO: create quit game listener
  function applyDMG(entity, dmg){
    var spotter = false;
    if(entity == hero){
      if (hero.currentHP - dmg > 0) {
        hero.currentHP -= dmg;
        setDamage(dmg);
      }
      else {
        hero.currentHP = 0;
        setWinner(enemy.name, hero.name);
      }
      spotter = true;
    }
    if(entity == enemy){
      if (enemy.currentHP - dmg > 0) {
        enemy.currentHP -= dmg;
        setDamage(dmg);
      }
      else {
        enemy.currentHP = 0;
        setWinner(hero.name, enemy.name);
      }
    }
    showTextBox();
    textAnimate();
    console.log('Hero: ' + hero.currentHP);
    console.log('Monster: ' + enemy.currentHP);
    var deltaHeroHP = (hero.currentHP/hero.maxHP);
    var deltaEnemyHP = (enemy.currentHP/enemy.maxHP);
    // console.log(deltaHeroHP);
    // console.log(deltaEnemyHP);
//bring back event listener after short delay and animate all
//desired components
    setTimeout(function(){
      console.log('render TiMe!');
      healthBarRender(deltaHeroHP, deltaEnemyHP);
      if (enemy.currentHP == 0) {
        startNewBattle();
      }
      if(spotter){
        seizureMode();
      }
    }, 500);
  }
  function healthBarRender(deltaHeroHP, deltaEnemyHP){
    // ctx.clearRect(0,0,appWidth,appHeight);
    ctx.drawImage(heroHealthBarBackground, 35,410);
    ctx.drawImage(enemyHealthBarBackground, 280,225);
    ctx.drawImage(heroHealthBar, 35,410, (heroHealthBarWidth * deltaHeroHP), heroHealthBarHeight);
    ctx.drawImage(enemyHealthBar, 280,225, (enemyHealthBarWidth * deltaEnemyHP), enemyHealthBarHeight);
  }
  function checkPosBattle(mouseEvent){
    mouseX = mouseEvent.pageX - this.offsetLeft;
    mouseY = mouseEvent.pageY - this.offsetTop;
    // console.log(mouseX);
    // console.log(mouseY);
  };

  function heroAttack(){
    newBattle = false;
    if (hero.currentHP > 0 && enemy.currentHP > 0 && newBattle == false) {
      canvas.removeEventListener('mouseup', checkClickBattle);
      var dmg = 0;
      var dmg = Math.floor((Math.random() * hero.maxAttack) + hero.minAttack);
      console.log('hero swings for ' + dmg);
      setAttacker(hero.name);
      applyDMG(enemy, dmg);
    }
  }

  function monsterAttack(){
    if (hero.currentHP > 0 && enemy.currentHP > 0 && newBattle == false) {
      var dmg = 0;
      var dmg = Math.floor((Math.random() * enemy.attack) + (enemy.attack-100));
      console.log('monster swings for ' + dmg);
      setAttacker(enemy.name);
      applyDMG(hero, dmg);
    }
  };

  function checkClickBattle(dmg){
  //HTML button pos
    if(mouseX > htmlAttackButton.x && mouseX < htmlAttackButton.x + htmlAttackButton.width){
      if(mouseY > htmlAttackButton.y && mouseY < htmlAttackButton.y + htmlAttackButton.height){
        console.log('You clicked HTML');
        canvas.removeEventListener('mouseup', checkClickBattle);
        dmg = heroAttack();
        setTimeout(function(){
          // saveCanvas(canvas,ctx);
          // seizureMode();
          monsterAttack();
          canvas.addEventListener('mouseup', checkClickBattle);}, 1500);
        if(enemy.currentHP <=0) {
          console.log('You Win!');
          canvas.removeEventListener('mouseup',checkClickBattle);
        }
        else if(hero.currentHP <=0) {
          console.log('Game Over');
          canvas.removeEventListener('mouseup',checkClickBattle);
        }
      }
    }
//CSS button pos
    if(mouseX > cssAttackButton.x && mouseX < cssAttackButton.x + cssAttackButton.width){
      if(mouseY > cssAttackButton.y && mouseY < cssAttackButton.y + cssAttackButton.height){
        console.log('you clicked CSS!');
        canvas.removeEventListener('mouseup', checkClickBattle);
        dmg = heroAttack();
        setTimeout(function(){
          // saveCanvas(canvas,ctx);
          // seizureMode();
          monsterAttack();
          canvas.addEventListener('mouseup', checkClickBattle);}, 1500);
        if(enemy.currentHP <=0) {
          console.log('You Win!');
          canvas.removeEventListener('mouseup',checkClickBattle);
        }
        else if(hero.currentHP <=0) {
          console.log('Game Over');
          canvas.removeEventListener('mouseup',checkClickBattle);
        }
      }
    }
//CSS button pos
    if(mouseX > jsAttackButton.x && mouseX < jsAttackButton.x + jsAttackButton.width){
      if(mouseY > jsAttackButton.y && mouseY < jsAttackButton.y + jsAttackButton.height){
        console.log('you clicked Javascript!');
        canvas.removeEventListener('mouseup', checkClickBattle);
        dmg = heroAttack();
        setTimeout(function(){
          // saveCanvas(canvas,ctx);
          // seizureMode();
          monsterAttack();
          canvas.addEventListener('mouseup', checkClickBattle);}, 1500);
        if(enemy.currentHP <=0) {
          console.log('You Win!');
          canvas.removeEventListener('mouseup',checkClickBattle);
        }
        else if(hero.currentHP <=0) {
          console.log('Game Over');
          canvas.removeEventListener('mouseup',checkClickBattle);
        }
      }
    }
  };

  function battleScene(){
    clearCanvas(ctx);
    ctx.drawImage(background,0,0);
    setTimeout(function(){
      ctx.drawImage(monster,282,243);
      ctx.drawImage(heroStats, heroStats.xcoord, heroStats.ycoord);
      ctx.drawImage(battleOptions, 207, 358);
      ctx.drawImage(shield, 165, 375);
      ctx.drawImage(heroHealthBarBackground, 35,410);
      ctx.drawImage(enemyHealthBarBackground, 280,225);
      var deltaHeroHP = (hero.currentHP/hero.maxHP);
      var deltaEnemyHP = (enemy.currentHP/enemy.maxHP);
      setTimeout(function(){
        ctx.drawImage(heroHealthBar, 35,410, (heroHealthBarWidth * deltaHeroHP), heroHealthBarHeight);
        ctx.drawImage(enemyHealthBar, 280,225, 160, 10);
      }, 500);
      //text stuff for hero Status
      ctx.font = '14px Arial';
      ctx.fillStyle = '#121f1f';
      ctx.fillText('Hero Name', 15,390);
      ctx.fillText('HP:',15,420);
      //text stuff for battleOptions
      ctx.fillText('HTML', 270, 420);
      ctx.fillText('CSS', 400, 420);
      ctx.fillText('Javascript', 515, 420);
      //text stuff for monster status
      ctx.fillText(enemy.name, 285, 210);
      //showTextBox();
      console.log('transition complete!'); }, 10);
  }

  function monsterName(){
    if(enemy.type == 'javascript') {
      enemy.name = JSNames[Math.floor(Math.random()*JSNames.length)];
      console.log(enemy.name);
    }
    else if(enemy.type == 'css') {
      enemy.name = CSSNames[Math.floor(Math.random()*JSNames.length)];
      console.log(enemy.name);
    }
    else if(enemy.type == 'html') {
      enemy.name = HTMLNames[Math.floor(Math.random()*JSNames.length)];
      console.log(enemy.name);
    }
  }

  function startNewBattle() {
    newBattle = true;
    enemy.currentHP = enemy.maxHP;
    hero.currentHP = hero.maxHP;
    clearCanvas(ctx);
    chooseRandomPokemon();
    makeNewPokemon();
    convertNewType();
    monster.src = enemy.sprite;
    monsterName();
    battleScene();
  }
  monsterName();
  battleScene();
};
