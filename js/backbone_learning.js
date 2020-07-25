var Todo = Backbone.Model.extend({
	initialize: function(){
		console.log("This model has been initialized");
	}
});

//	Now create a concrete instance of Todo model.
var todo1 = new Todo();
console.log(JSON.stringify(todo1));

var todo2 = new Todo({
	title: 'check the attributes of both model instances in the console',
	completed: true
});
console.log(JSON.stringify(todo2));

var Person = Backbone.Model.extend({
	defaults: {
		name: 'Guest User',
		age: 23,
		occupation: 'Worker'
	},

	validate: function(attributes){
		if(attributes.age < 0) {
			return 'Age must be positive';
		}
	},

	work: function(){
		return this.get('name')  +  ' is working.';
	}
})