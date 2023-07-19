var cols, rows;
var w = 70;
var grid = [];
var achived = false;
var queue = []

var current;

var stack = [];

function setup() {
  createCanvas(600, 600);
  cols = floor(width / w);
  rows = floor(height / w);
  frameRate(5);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  
  //bottom
  grid[0].walls[2] = true;
  grid[1].walls[2] = true;
  grid[2].walls[2] = true;
  grid[3].walls[2] = true;
  grid[4].walls[2] = true;
  grid[5].walls[2] = true;
  
  //top
  grid[8].walls[0] = true;
  grid[9].walls[0] = true;
  grid[10].walls[0] = true;
  grid[11].walls[0] = true;
  
  grid[10].walls[1] = true;
  grid[11].walls[3] = true;
  // grid[18].walls[1] = true;
  // grid[19].walls[3] = true;  
  grid[26].walls[1] = true;
  grid[27].walls[3] = true;
  
  grid[12].walls[0] = true;
  grid[13].walls[0] = true;
  
  objective = grid[8];
  objective.middle = true;
  current = grid[0];
  objective.objDistance = 0
  objective.calculated = true
  
  queue = queue.concat(objective.getNotCalculatedNeighbors())
  
  distance = 0
  // console.log(objective)
  while (queue.length > 0) {
    // console.log(queue)
    let first = queue.shift()
    first.calculateDistance()
    queue = queue.concat(first.getNotCalculatedNeighbors())
  }  
}

function draw() {
  background(50);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  
  objective.objective();
  if (current == objective || achived) {
    achived = true;
    current = stack.pop()
    if (current) {
      current.highlight();      
    }
    return;
  }
  
  current.visited = true;
  current.highlight();
  // STEP 1
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    // STEP 2
    stack.push(current);

    // STEP 3
    removeWalls(current, next);

    // STEP 4
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }

}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}


function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}