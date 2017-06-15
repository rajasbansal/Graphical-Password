App.LoginController = Ember.Controller.extend({
	name:'',
	colour: '',
	email: '',
	password: '',
	username: '',
	actions:{
		// chooseColour: function(selection){
		// 	this.set('colour', selection);
		// 	console.log(this.get('colour'));
		// },
		createUser: function(){
			console.log('Creating User');
			Ember.$.post('/api/user/create',{name: this.get('name'), password: this.get('password'), colour: this.get('colour'), email: this.get('email'), username: this.get('username')}).then(function (response) {
				alert('Created user\n'+response.name+'\n'+ response.colour);
			});
		}
	}
});