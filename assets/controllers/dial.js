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
	capson: false,
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
					if (self.get('colour') == 'Light Green'){
						self.set('color', 0);
					}
					else if (self.get('colour') == 'Dark Green'){
						self.set('color', 1);
					}
					else if (self.get('colour') == 'Teal'){
						self.set('color', 2);
					}
					else if (self.get('colour') == 'Blue'){
						self.set('color', 3);
					}
					else if (self.get('colour') == 'Dark Blue'){
						self.set('color', 4);
					}
					else if (self.get('colour') == 'Purple'){
						self.set('color', 5);
					}
					else if (self.get('colour') == 'Magenta'){
						self.set('color', 6);
					}
					else if (self.get('colour') == 'Red'){
						self.set('color', 7);
					}
					else if (self.get('colour') == 'Orange'){
						self.set('color', 8);
					}
					else if (self.get('colour') == 'Light Orange'){
						self.set('color', 9);
					}
					else if (self.get('colour') == 'Mango Yellow'){
						self.set('color', 10);
					}
					else if (self.get('colour') == 'Yellow'){
						self.set('color', 11);
					}
				}
				else{
					alert('Not found');
				}
			});
			Ember.$(document).keydown(function(e) {
    			if (e.which == 16){
    				self.toggleProperty('capson');
    			}
    			if (e.which == 13){
    				$('#sub').click();
    				console.log('hi');
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
					window.location.href = '/profile';
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
