// Rover Object Goes Here
// ======================
rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: []
}
// ======================
function turnLeft(rover) {
  // console.log("turnLeft was called!");
  switch (rover.direction) {
    case "N":
      return rover.direction = "W";
      break;
    case "W":
      return rover.direction = "S";
      break;
    case "S":
      return rover.direction = "E";
      break;
    case "E":
      return rover.direction = "N";
      break;
  }
}

function turnRight(rover) {
  // console.log("turnRight was called!");
  switch (rover.direction) {
    case "N":
      return rover.direction = "E";
      break;
    case "E":
      return rover.direction = "S";
      break;
    case "S":
      return rover.direction = "W";
      break;
    case "W":
      return rover.direction = "N";
      break;
  }
}

function moveForward(rover) {
  // console.log("moveForward was called");
  switch (rover.direction) {
    case "N":
      return rover.y -= 1;
      break;
    case "E":
      return rover.x += 1;
      break;
    case "S":
      return rover.y += 1;
      break;
    case "W":
      return rover.x -= 1;
      break;
  }
}

function moveBackward(rover) {
  // console.log("moveBackward was called");
  switch (rover.direction) {
    case "N":
      return rover.y += 1;
      break;
    case "E":
      return rover.x -= 1;
      break;
    case "S":
      return rover.y -= 1;
      break;
    case "W":
      return rover.x += 1;
      break;
  }
}

function drawRoute(obstacles) {
  var matrix = [];
  for(let i = 0; i < 10; i++) {
      matrix[i] = [];
      for(var j = 0; j < 10; j++) {
        if(obstacles.includes(`[${i}, ${j}]`)) {
          matrix[i][j] = '[X, X]'
        } else if(rover.travelLog.includes(`[${i}, ${j}]`)) {
          matrix[i][j] = '[R, R]'
        } else {
          matrix[i][j] = `[${i}, ${j}]`;
        }
      }
  }
  console.log(matrix.join('\n') + '\n\n');
}

function getRandomNum() {
  return Math.floor(Math.random() * 10);
}

function generateObstacles() {
  var obstacles = prompt("Enter the number of obtacles: ");
  var obstaclesArr = [];
  for(let i = 0; i < obstacles; i++) {
    var row = getRandomNum();
    var column = getRandomNum();
    obstaclesArr.push(`[${row}, ${column}]`);
    // console.log(`[${row}, ${column}]`);
  }
  // obstaclesArr.push(`[3, 4]`);
  return obstaclesArr;
}

function commandList(commString, obstacles) {
  // console.log("Command list was called");
  var errors = [];
  var array = commString.split('');
  for(let i = 0; i < array.length; i++) {
    // Entries validation
    if(array[i] == 'f' || array[i] == 'b' || array[i] == 'r' || array[i] == 'l') {
      // Enforce limits validation
      if((rover.x < 0 || rover.y < 0) || (rover.x > 10 || rover.y > 10)) {
        console.log('Modify your instructions. The rover has gone out of it\'s range');
        break;
      } else {
        // Obstacles validation
        // console.log(`Log: ${rover.travelLog}`);
        // console.log(`Obstacles: ${obstacles}`);
        // if(obstacles.includes(rover.travelLog[i])){
        if(obstacles.some(r => rover.travelLog.indexOf(r) >= 0)) {
          console.log('The rover has found an obstacle. It can\'t keep advancing :\'(');
          break;
        } else {
          if(array[i] == 'f') {
            moveForward(rover);
          } else if(array[i] == 'l') {
            turnLeft(rover);
          } else if(array[i] == 'r') {
            turnRight(rover);
          } else {
            moveBackward(rover);
          }
          rover.travelLog.push(`[${rover.x}, ${rover.y}]`);
        } // Obstacle validation end
      } // Enforce limits validation end
    } else {
      errors.push(array[i]);
    } // Entries validation end
  }
  if(errors.length > 0) {
    console.log('Error for entries ' + errors);
  }
  drawRoute(obstacles);
}

var obstacles = generateObstacles();
console.log(`Obstacles: ${obstacles}`);
console.log(rover);
commandList('rffrfflaafrfzfrbwlb', obstacles);
