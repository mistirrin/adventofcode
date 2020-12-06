groups = $("pre").textContent.trim().split(/\n\n/);

//1ST ANSWER
unique_questions = groups.map(x => (new Set(x.replace(/\n/g,""))).size);
answer1 = unique_questions.reduce((a,b) => a+b);

function reduce_group(group) {
	persons = group.split(/\n/g).map(x => new Set(x));
	//INTERSECT
	return persons.reduce((a,b) => new Set([...a].filter(x => b.has(x)))).size;
}

//2ND ANSWER
answer2 = groups.map(reduce_group).reduce((a,b) => a+b);
