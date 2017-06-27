App.DialController = Ember.Controller.extend({
	name: "images/photo0.jpg",
	id: 0,
	inner: ['5','3','h','f','c','b','1','7'],
	outer: ['4','2','g','e','d','a','8','6'],
	password: '',
	username: '',
	color: 0,			//user can choose color value
	foundColour: false,
	colour: 'yellow',
	num1:0,
	num2:0,
	inner: true,
	outer: true,
	actions: {
		rotateClockwise: function() {
			this.set('num1', this.get('num1') + 1);
		},
		rotateAntiClockwise: function() {
			this.set('num2', this.get('num2') + 1);
		},
		selectInner: function(){
			this.toggleProperty('inner');
		},
		verify: function(){
			var self = this;
			Ember.$.post('/api/user/existColour',{username: this.get('username')}).then(function(response){
				if (response.found == true){
					self.set('colour', response.colour);
					self.set('foundColour', true);
					if (self.get('colour') == 'yellow'){
						self.set('color', 11);
					}
					else if (self.get('colour') == 'blue'){
						self.set('color', 3);
					}
					else if (self.get('colour') == 'green'){
						self.set('color', 0);
					}
					else if (self.get('colour') == 'purple'){
						self.set('color', 5);
					}
					else if (self.get('colour') == 'pink'){
						self.set('color', 6);
					}
					else if (self.get('colour') == 'red'){
						self.set('color', 7);
					}
					else if (self.get('colour') == 'black'){
						self.set('color', 3);
					}
					else if (self.get('colour') == 'orange'){
						self.set('color', 8);
					}
				}
				else{
					alert('Not found');
				}
			});
		},
		selectOuter: function(){
			this.toggleProperty('outer');
		},
		check: function(){
			var self = this;
			if (this.get('foundColour') == false){
				alert('Username has not been entered');
			}
			else {
				Ember.$.post('/api/user/authenticate', {username: this.get('username'), password: this.get('password')}).then(function(response){
					if (!response.found){
						alert('Username not found');
						return;
					}
					if (!response.passwordMatch){
						alert('Password for ' + self.get('username') + ' is not correct');
						return;
					}
					alert('User authenticated');
				});
			}
		},
		isAuthenticated: function(){
			Ember.$.post('/api/user/isAuthenticated',{}).then(function(response){
				alert(response.authenticated);
			});
		}
	}
});
