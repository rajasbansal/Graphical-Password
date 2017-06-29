App.LoginController = Ember.Controller.extend({
	name:'',
	colour: '',
	email: '',
	password: '',
	username: '',
	boolC: false,
	actions:{
		// chooseColour: function(selection){
		// 	this.set('colour', selection);
		// 	console.log(this.get('colour'));
		// },
		createUser: function(){
			console.log('Creating User');
			var self = this;
			Ember.$.post('/api/user/create',{name: this.get('name'), password: this.get('password'), colour: this.get('colour'), email: this.get('email'), username: this.get('username')}).then(function (response) {
				if (response.created == true){	
					alert('Created user\n'+response.name+'\n'+ response.colour);
					self.transitionToRoute('dial');
				}
				else {
					alert('Username or E-mail already exists');
				}
			});
		},
		isAuthenticated: function(){
			Ember.$.post('/api/user/isAuthenticated',{}).then(function(response){
				alert(response.authenticated);
			});
		},
		set: function (col){
			this.set('colour', col);
			this.set('boolC', true);
			console.log(this.get('colour'));
		}
	}
});