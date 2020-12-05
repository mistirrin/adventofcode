//FUNCTIONS

//1ST PROBLEM
verify_ticket = x => !!x.match(/[FB]{7}[LR]{3}/);

function get_row(ticket) {		
	row = ticket.slice(0,7);
	binary_string = row.replace(/F/g,'0').replace(/B/g,'1');
	return parseInt(binary_string, 2);
}

function get_col(ticket) {
	col = ticket.slice(-3);
	binary_string = col.replace(/L/g,'0').replace(/R/g,'1');
	return parseInt(binary_string, 2);
}

function get_id(row, col) {
	return row*8 + col;
}

function parse_ticket(ticket) {
	seat = false
	if (verify_ticket) {
		row = get_row(ticket);
		col = get_col(ticket);
		id  = get_id(row, col);
		seat = [row, col, id];		
	}
	
	return seat;
}

//2ND PROBLEM
function find_missing_ticket(seats) {
	ids = seats.map(x => x[2]);
	
	empty_ids =[...Array(2**10).keys()].filter(x => !ids.includes(x));

	return empty_ids.filter(id => ids.includes(id-1) && ids.includes(id+1));
}

//SOLUTIONS
tickets = $("pre").textContent.trim().split("\n");
seats = tickets.map(parse_ticket);

Math.max(...(seats.map(x => x[2]))); //1ST PROBLEM

find_missing_ticket(seats); //2ND PROBLEM
