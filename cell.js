function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [false, false, false, false];
    this.visited = false;
    this.objDistance = 0;
    this.calculated = false;
    this.middle = false;
    
    this.calculateDistance = function(distance) {
      neighboors = this.getNeighbors()
      var menor = neighboors[0]
      neighboors.forEach(neighboor => {
        if (neighboor.objDistance < menor.objDistance) {
          menor = neighboor
        }
      })
      this.objDistance = menor.objDistance + 1
      this.calculated = true
    }
  
    this.checkNeighbors = function() {
      var neighbors = [];
      
      var top = grid[index(i, j - 1)];
      var right = grid[index(i + 1, j)];
      var bottom = grid[index(i, j + 1)];
      var left = grid[index(i - 1, j)];
  
      if (top && !top.visited && !this.walls[0]) {
        neighbors.push(top);
      }
      if (right && !right.visited && !this.walls[1]) {
        neighbors.push(right);
      }
      if (bottom && !bottom.visited && !this.walls[2]) {
        neighbors.push(bottom);
      }
      if (left && !left.visited && !this.walls[3]) {
        neighbors.push(left);
      }
      
      major = neighbors[0];
      neighbors.forEach(function (item, index) {
        if(item.objDistance < major.objDistance) {
          major = item;
        }
      });
      
      return major;
  
  }
    
    this.highlight = function() {
      var x = this.i * w;
      var y = this.j * w;
      noStroke();
      fill(0, 0, 255, 100);
      rect(x, y, w, w);
  
    }
    
    this.objective = function() {
      var x = this.i * w;
      var y = this.j * w;
      noStroke();
      fill(0, 0, 255, 100);
      rect(x, y, w, w);
  
    }
  
    this.show = function() {
      var x = this.i * w;
      var y = this.j * w;
      stroke(255);
      if (this.walls[0]) {
        line(x, y, x + w, y);
      }
      if (this.walls[1]) {
        line(x + w, y, x + w, y + w);
      }
      if (this.walls[2]) {
        line(x + w, y + w, x, y + w);
      }
      if (this.walls[3]) {
        line(x, y + w, x, y);
      }
  
      if (this.visited) {
        noStroke();
        fill(255, 0, 255, 100);
        rect(x, y, w, w);
      }
    }
    
    this.getNeighbors = function() {
      const directions = [
        { name: 'top', dx: 0, dy: -1 },
        { name: 'right', dx: 1, dy: 0 },
        { name: 'bottom', dx: 0, dy: 1 },
        { name: 'left', dx: -1, dy: 0 }
      ];
      var neighbors = []
          
      for (let r = 0; r < 4; r++) {
        if (this.walls[r]) continue
        
        neighbor = grid[index(this.i + directions[r].dx, this.j + directions[r].dy)];
        
        if (!neighbor) continue
        if (!neighbor.calculated) continue
        neighbors.push(neighbor)
        
      }
      return neighbors
    }
    
      this.getNotCalculatedNeighbors = function() {
      const directions = [
        { name: 'top', dx: 0, dy: -1 },
        { name: 'right', dx: 1, dy: 0 },
        { name: 'bottom', dx: 0, dy: 1 },
        { name: 'left', dx: -1, dy: 0 }
      ];
      var neighbors = []
      
      for (let r = 0; r < 4; r++) {
        if (this.walls[r]) continue
        
        neighbor = grid[index(this.i + directions[r].dx, this.j + directions[r].dy)];
        
        if (!neighbor) continue
        if (neighbor.calculated) continue
        neighbors.push(neighbor)
        
      }
      return neighbors
    }
}