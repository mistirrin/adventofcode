function getState(mountain, pos_x, pos_y, verbose) {
	pos_x = pos_x % mountain[0].length;
	pos_object = mountain[pos_y][pos_x];
	
	pos_state = [pos_x,pos_y,pos_object];
	if (verbose) { console.log(pos_state) };
	return pos_state;
}

function getPath(mountain, start_x, start_y, slope_x, slope_y, verbose) {
	pos_x = start_x;
	pos_y = start_y;
	
	path = [];

	getState(mountain, pos_x, pos_y);

	while(pos_y < mountain.length-1) {
		pos_x += slope_x;
		pos_y += slope_y;
		
		pos_state = getState(mountain, pos_x, pos_y, verbose);
		
		path.push(pos_state);
	}
	
	return path;
}

function countTrees(path, tree) {
	trees = path.filter(function(x) { return x[2] == tree; }).length;
	return trees;
}

function solveMountain(mountain, start_x, start_y, slope_x, slope_y, verbose) {
	path = getPath(mountain, start_x, start_y, slope_x, slope_y, verbose);
	trees = countTrees(path, tree);
	return trees;
}

mountain = $("pre").textContent.trim().split("\n");
tree = "#";

slope_x = 3;
slope_y = 1;
start_x = 0;
start_y = 0;

verbose = false;

//1ST ANSWER
solveMountain(mountain, start_x, start_y, slope_x, slope_y, verbose);

//2ND ANSWER
slopes = [[1,1],[3,1],[5,1],[7,1],[1,2]];
solutions = slopes.map(function(x) { return solveMountain(mountain, start_x, start_y, x[0], x[1], verbose); });
solutions.reduce(function(a,b) { return a*b; });
