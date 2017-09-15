/**
 * Given a width and height, construct a Board.
 *
 * @param {Int} width
 * @param {Int} height
 * @param {Array<Int>} cells the array to use for the cells (default: new Uint8Array(width * height))
 */
function Board(width = 32, height = 32, cells) {
  this.width = width;
  this.height = height;
  this.cells = cells || new Uint8Array(width * height);
}

Board.prototype.indexFor = function([row, col]) {
  if (row < 0 || row >= this.height || col < 0 || col >= this.width) {return;}
  return row * this.width + col;
};

Board.prototype.coordsFor = function(index){
  var col = index % this.width;
  var row = (index - col) / this.width;
  return [row, col];
};

Board.prototype.get = function (coords) {
  return this.cells[this.indexFor(coords)] || 0;
};

Board.prototype.set = function(coords, value) {
  this.cells[this.indexFor(coords)] = value;
};

Board.prototype.livingNeighbors = function([row, col]) {
  // let alive = 0;
  // for (let i = row - 1; i <= row + 1; i++){ //rows
  //   for (var j = col - 1; j <= col + 1; j++){
  //     if (this.get([i, j])) alive++;
  //   }
  // }
  // if (this.get([row, col])){
  //   alive--;
  // }

  return this.get([row - 1, col - 1]) +
         this.get([row - 1, col]) +
         this.get([row - 1, col + 1]) +
         this.get([row, col - 1]) +
         this.get([row, col + 1]) +
         this.get([row + 1, col - 1]) +
         this.get([row + 1, col]) +
        this.get([row + 1, col + 1]);



  //return alive;
};

Board.prototype.toggle = function(coords) {
  this.set(coords, !this.get(coords));
  return this; //return this so that you can chain method calls
};

/**
 * @param {Boolean} isAlive
 * @param {Number} numLivingNeighbors
 */
function conway(isAlive, numLivingNeighbors) {
  if (!isAlive && numLivingNeighbors === 3){
    return true;
  } else if (isAlive && 1 < numLivingNeighbors &&  numLivingNeighbors < 4){
    return true;
  } else { return false; }
}

/**
 *
 * @param {Board} present
 * @param {Board!} future (is mutated)
 * @param {(Boolean, Int) -> Boolean} rules (default: conway)
 */
function tick(present, future, rules = conway) {
  var length = present.height * present.width;
  for (var i = 0; i < length; i++){
    var coords = present.coordsFor(i);
    future.cells[i] = rules(present.cells[i], present.livingNeighbors(coords));
  }
  return [future, present];
}

