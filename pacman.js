// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4


// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

// replace this comment with your four ghosts setup as objects
var ghosts = [inky, blinky, pinky, clyde]

// Add a function called eatghosts that accepts ghost as an edible
function EatGhosts(ghostsname){
  if (ghostsname.edible === false) {
    lives--
    zero()
    console.log(ghostsname.name, ghostsname.colour)
  }
  else {
      console.log(' RIP' + ghostsname + ' he was such a good kid');
      score += 200;
      for (var index = 0; index < ghosts.length; index ++){
        ghosts[index].edible = false
      }
  }
}

//increase pacman's score by 50 points
function PowerPellets(){
  score += 50;
  if (powerPellets < 1){
    console.log('No More Pellets!!!')
  }
  for (var index = 0; index < ghosts.length; index ++){
      ghosts[index].edible = true
  }
  // console.log(' RIP' + ghosts[index].name + ' he was such a good kid')
  powerPellets -=1;
}
//Ensure that Pac-Man can't eat a Power-Pellet if there are none left
function NoMorePellets(){
  if (powerPellets < 0){}
}



// include a quick sentence that says the name and colour of the ghost that kills Pac-Man
//(similar to how it quickly flashes chomp on the screen when you eat a dot)

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives:  ' + lives +   '\n\nPowerPellets:  ' + powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPellets >= 1){
  console.log('(p) Power Pellet');
}
  console.log('(1) Eat Inky' + (inky.edible));
  console.log('(2) Eat Blinky' + (blinky.edible));
  console.log('(3) Eat Pinky' + (pinky.edible));
  console.log('(4) Eat Clyde' + (clyde.edible));
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      PowerPellets();
      break;
    case '1':
      EatGhosts(inky);
      break;
    case '2':
      EatGhosts(blinky);
      break;
    case '3':
      EatGhosts(pinky);
      break;
    case '4':
      EatGhosts(clyde);
      break;
    default:
      console.log('\nInvalid Command!');

  }
}
//when pacman's lives go below 0 exit the game
function zero() {
  if (lives < 0){
  process.exit();}
}

//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
