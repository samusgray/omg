localStorage.setItem('Get Test', JSON.stringify({name: 'Please...'}));
var getTest = omg.get('Get Test');
if (getTest) {
	console.table(getTest);
} else {
	alert('Get Failed');
}

// Create and Add Tests
omg.create('Create and Add');
for (i = 0; i < 100; i++) {
	var name = ('Add ' + i);
	omg.add('Create and Add', {name: name});
}

var tests = omg.get('Create and Add');
console.table(tests);


// Render new raffles when added.
omg.on('save', function() {
	console.log('saved');
});
omg.on('add', function() {
	console.log('added');
});
omg.on('flush', function() {
	App.refresh();
});