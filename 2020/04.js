//FUNCTIONS
function parse_passport(passport) {
	parsed_passport = {}
	passport_fields = passport.split(/\s/).map(x => { return x.split(":"); })
	passport_fields.forEach(x => { parsed_passport[x[0]] = x[1]; })
	return parsed_passport;
}

passport_checks = {
	'byr': x => parseInt(x) >= 1920 && parseInt(x) <= 2002,
	'iyr': x => parseInt(x) >= 2010 && parseInt(x) <= 2020,
	'eyr': x => parseInt(x) >= 2020 && parseInt(x) <= 2030,
	'hgt': x => height_check(x, "in", 59, 76) || height_check(x, "cm", 150, 193),
	'hcl': x => !!x.match(/^#[0-9a-f]{6}$/),
	'ecl': x => !!x.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/),
	'pid': x => !!x.match(/^\d{9}$/),
}


function check_passport(passport, necessary_keys) {
	//passport_keys = Object.keys();
	return necessary_keys.map(x => x in passport && passport_checks[x](passport[x])).reduce((a,b) => a && b);
}

function height_check(height, unit, lower_limit, upper_limit) {
	height_valid = false;
	
	height_regex = new RegExp("^(\\d+)" + unit + "$");
	height_match = height.match(height_regex);
	
	if (height_match) {
		height_value = parseInt(height_match[1]);
		
		height_valid = height_value >= lower_limit && height_value <= upper_limit;
	}
	
	return height_valid;
}

//SOLUTIONS
passports = $("pre").textContent.split('\n\n');

necessary_keys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]; //"cid"

res = passports.map(parse_passport).map(passport => check_passport(passport, necessary_keys));

res.reduce((a,b) => a+b);
