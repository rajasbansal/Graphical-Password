App.LoginController = Ember.Controller.extend({
	name:'',
	colour: '',
	email: '',
	password: '',
	username: '',
	boolC: false,
	colour_to_show:'',
	text_colour: '',
	colors : [   "#B8D430", "#3AB745", "#029990", "#3501CB",
                   "#2E2C75", "#673A7E", "#CC0071", "#F80120",
                   "#F35B20", "#FB9A00", "#FFCC00", "#FEF200"],
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
			var index;
			if (col == 'Light Green'){
				index=0;
			}
			else if (col == 'Dark Green'){
				index=1;
			}
			else if (col == 'Teal'){
				index=2;
			}
			else if (col == 'Blue'){
				index=3;
			}
			else if (col == 'Dark Blue'){
				index=4;
			}
			else if (col == 'Purple'){
				index=5;
			}
			else if (col == 'Magenta'){
				index=6;
			}
			else if (col == 'Red'){
				index=7;
			}
			else if (col == 'Orange'){
				index=8;
			}
			else if (col == 'Light Orange'){
				index=9;
			}
			else if (col == 'Mango Yellow'){
				index=10;
			}
			else if (col == 'Yellow'){
				index=11;
			}
			this.set('colour_to_show', this.get('colors')[index])
			this.set('text_colour', 'white');
			console.log(this.get('colour'));
		}
	}
});