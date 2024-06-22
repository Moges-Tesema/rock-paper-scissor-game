/*
How to develop rock paper scissor game?
algorithm:
  1.understand the problem:-click button result  guess what computer generate.
    1.1.when the button is clicked,compare what computer guess and user guess and then display result in generating html using js. after that update win, lose and tie value.
    1.2.use function to code reusablity. 
    1.3. store win, lose and tie data in local storage
    1.4.use document object mode of java script like localStorage.setItem(name,value),localStorage.getItem(name).
    localStorage.remove(name);
    1.4.
  2.understand input and output:-
    input:
    user click or press his guess,user click reset, user click auto palying the game.
    output:
      generate html to show the result of user guess.
      update result as well as sign of guess in every guess.
      make the code play auto based on users desire.
  3.psedocode.
     create result object contains win, lose and tie.
     cleate fuction which return type of computer generated.
     create function which accept event of button and excute something.
     create function which play automaticaly.
     use addEventListener() in order to apply.
     use arrow function to make code more esier to understant.
     use JSON.stringify(value):-to change js into json.
     use JSON.parse(value):- to change json into js.
*/

//computer guess function
let score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  lose: 0,
  tie: 0
};
function computerMove() {
  const generated = Math.random();
  let result = '';
  if (generated <= 1 / 3) {
    result = 'rock';
  }
  else if (generated > 1 / 3 && generated <= 2 / 3) {
    result = 'paper';
  }
  else if (generated > 2 / 3 && generated <= 1) {
    result = 'scissor';
  }
  return result;
}



//user guess when he click buttons.
function userGuess(buttonKind) {
  let computer = computerMove();
  let gameData = {
    usermove: buttonKind,
    computerMove: computer
  };
  result = '';
  if (buttonKind === 'rock') {
    if (computer === 'rock') {
      result = 'tie';
    }
    else if (computer === 'paper') {
      result = 'lose';
    }
    else if (computer === 'scissor') {
      result = 'win';
    }
  }
  else if (buttonKind === 'paper') {
    if (computer === 'paper') {
      result = 'tie';
    }
    else if (computer === 'rock') {
      result = 'win';
    }
    else if (computer === 'scissor') {
      result = 'lose';
    }
  }
  else if (buttonKind === 'scissor') {
    if (computer === 'scissor') {
      result = 'tie';
    }
    else if (computer === 'paper') {
      result = 'win';
    }
    else if (computer === 'rock') {
      result = 'lose';
    }
  }
  gameData.gameStatus = result;
  return gameData;

}

// html generator based on computerGuess and userGuess
const html = document.querySelector('.js-display');
const displayScore = document.querySelector('.js-win-lose-tie');
displayScore.innerHTML = `Wins: ${score.win}, Losses: ${score.lose}, Ties: ${score.tie}`;
const yourStatus = document.querySelector('.js-you');
function generator(buttons) {
  let gameData = userGuess(buttons);
  //alert(gameData.computerMove);
  let userComputer = `<p class="usercomputer">You<img src="hands-photo/${gameData.usermove}-emoji.png"><img src="hands-photo/${gameData.computerMove}-emoji.png"> Computer</p>`;
  html.innerHTML = userComputer;
  if (gameData.gameStatus === 'win') {
    score.win += 1;
    yourStatus.innerHTML="Win!";
  }
  else if (gameData.gameStatus === 'tie') {
    score.tie += 1;
    yourStatus.innerHTML='';
  }
  else if (gameData.gameStatus === 'lose') {
    score.lose += 1;
    yourStatus.innerHTML="lose";
  }
  localStorage.setItem('score', JSON.stringify(score));
  displayScore.innerHTML = `Wins: ${score.win}, Losses: ${score.lose}, Ties: ${score.tie}`;

}

//reset function which make data inside score of all property be zero.
function reset() {
  isSure();

}


/* this is sample test of bug
    const test =JSON.parse(localStorage.getItem('score'));
    console.log(test);
    localStorage.removeItem('score');
*/
//function to auto game.
/*
let isAuto=false
let firs=ture;
let ids=null;
const autoPlayed=document.querySelector('.js-auto-play');
function autoPlay(){
  if(!isAuto){
    autoPlayed.innerHTML='Stop playing';
    let userAutoMove=computerMove();
    generator(userAutoMove);
    isAuto=true;
  }
  else{
    clearInterval(ids);
    autoPlayed.innerHTML='Auto play';
    isAuto=false;
  }
}
autoPlayed.addEventListener('click',()=>{playing()});

function playing(){
  setInterval(()=>{
    autoPlay();
  },1000);
}
*/
let isAutoPlaying = false;
const autoPlayed = document.querySelector('.js-auto-play');
let ids;
autoPlayed.addEventListener('click', () => {
  AutoPlaying();
})
function AutoPlaying() {
  if (!isAutoPlaying) {
    ids = setInterval(() => {
      const playermoved = computerMove();
      generator(playermoved);
    }, 100);
    autoPlayed.innerHTML = 'Stop Playing';
    isAutoPlaying = true;
  }
  else {
    clearInterval(ids);
    isAutoPlaying = false;
    autoPlayed.innerHTML = 'Auto play';
  }

}
//pressing a result playing automaticaly.
document.addEventListener('keydown', () => {
  if (event.key === 'a') {
    //isAutoPlaying=true;
    AutoPlaying();
  }
});
//pressing backspace will make the score reseted
document.addEventListener('keydown', () => {
  if (event.key === 'Backspace') {
    reset();

  }
});

//method which generate html for comfirmation purpose when the score is reseted.
const comfirmHtml = document.querySelector('.js-comfirmation');
let popUp = `<p class="js-comfirm-message">Are you sure you want to reset the score?<button class="js-yes">Yes</button> <button class="js-no">No</button></p>`;
function isSure() {
  comfirmHtml.innerHTML = popUp;
  const yes = document.querySelector('.js-yes');
  const no = document.querySelector('.js-no');
  yes.addEventListener('click', () => {
    comfirmHtml.innerHTML = '';
    localStorage.removeItem('score');
    score = JSON.parse(localStorage.getItem('score')) || {
      win: 0,
      lose: 0,
      tie: 0
    }
    displayScore.innerHTML = `Wins: ${score.win}, Losses: ${score.lose}, Ties: ${score.tie}`;
  });
  no.addEventListener('click', () => {
    comfirmHtml.innerHTML = '';
  });
}


//watch 
const timer = {
  day: 'AM',
  hour: 12,
  munite: 59,
  second: 57
};
let amPm = true;
let stoper;
function timing(){ 
stoper = setInterval(() => {
  if (timer.second < 60) {
    timer.second += 1;
    showTime();
  }
  else {
    timer.second = 0;
    timer.munite += 1;
    showTime();
    if (timer.munite >= 60) {
      timer.munite = 0;
      timer.hour += 1;
      showTime();
      if (timer.hour >= 13) {
        timer.hour = 0;
        if (amPm) {
          timer.day = 'PM';
          showTime();
          amPm = false;
        }
        else {
          timer.day = 'AM';
          showTime();

        }
      }

    }
  }

}, 1000);
const time = document.querySelector('.js-watch');
function showTime() {
  time.innerHTML = `${timer.hour}:${timer.munite}:${timer.second}: ${timer.day}`;

}
}

//functionalize stop button.
//let countingTime=true;
const startTime = document.querySelector('.js-start-watch');
const stopTime = document.querySelector('.js-stop-watch');
const resetTime = document.querySelector('.js-reset-watch');
startTime.addEventListener('click',()=>{
  timing();
 // countingTime=true;
});
stopTime.addEventListener('click',()=>{
  clearInterval(stoper);
  /*
  if(countingTime){
 
 stopTime.innerHTML='counting';
 countingTime=false;
  }
  else{
    timing();
    stopTime.innerHTML='stop';
    countingTime=true;
  }*/
});

//functionalize reset button.
resetTime.addEventListener('click',()=>{
  timer.day='AM';
  timer.hour=0;
  timer.munite=0;
  timer.second=0;
  timimg();
});