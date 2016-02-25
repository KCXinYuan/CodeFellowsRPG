// HTML Attack --------------------------------------------

function htmlAttack(){

  newBattle = false;

  if (hero.currentHP > 0 && enemy.currentHP > 0 && newBattle == false) {
    // canvas.removeEventListener('mouseup', checkClickBattle);
    canvas.removeEventListener('mouseup', jsAttack);
    var dmg = 0;
    var dmg = Math.floor((Math.random() * hero.maxAttack) + hero.minAttack);
    console.log('Original dmg = ' + dmg);
    if(enemy.type == 'css') {
      dmg = dmg * 2;
      console.log('Super Effective! ' + dmg);
    }

    else if(enemy.type == 'javascript') {
      dmg = dmg * 0.5;
      console.log('Not so effective... ' + dmg);
    }

    else {
      console.log('Same Type! ' + dmg);
    }

    console.log('hero swings for ' + dmg);

    setAttacker(hero.name);
    applyDMG(enemy, dmg);
  }

}

// CSS Attack --------------------------------------------

function cssAttack(){

  newBattle = false;

  if (hero.currentHP > 0 && enemy.currentHP > 0 && newBattle == false) {
    // canvas.removeEventListener('mouseup', checkClickBattle);
    canvas.removeEventListener('mouseup', jsAttack);
    var dmg = 0;
    var dmg = Math.floor((Math.random() * hero.maxAttack) + hero.minAttack);
    console.log('Original dmg = ' + dmg);
    if(enemy.type == 'javascript') {
      dmg = dmg * 2;
      console.log('Super Effective! ' + dmg);
    }

    else if(enemy.type == 'html') {
      dmg = dmg * 0.5;
      console.log('Not so effective... ' + dmg);
    }

    else {
      console.log('Same Type! ' + dmg);
    }

    console.log('hero swings for ' + dmg);

    setAttacker(hero.name);
    applyDMG(enemy, dmg);
  }

}
// JavaScript Attack --------------------------------------------
function jsAttack(){

  newBattle = false;

  if (hero.currentHP > 0 && enemy.currentHP > 0 && newBattle == false) {
    // canvas.removeEventListener('mouseup', checkClickBattle);
    canvas.removeEventListener('mouseup', jsAttack);
    var dmg = 0;
    var dmg = Math.floor((Math.random() * hero.maxAttack) + hero.minAttack);
    console.log('Original dmg = ' + dmg);
    if(enemy.type == 'html') {
      dmg = dmg * 2;
      console.log('Super Effective! ' + dmg);
    }

    else if(enemy.type == 'css') {
      dmg = dmg * 0.5;
      console.log('Not so effective... ' + dmg);
    }

    else {
      console.log('Same Type! ' + dmg);
    }

    console.log('hero swings for ' + dmg);

    setAttacker(hero.name);
    applyDMG(enemy, dmg);
  }

}
