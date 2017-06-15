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
	actions: {
		rotateClockwise: function() {
			var new_id = this.get('id');
			new_id = (new_id - 1)%8;
			if (new_id < 0) new_id += 8;
			this.set('id', new_id);
			this.set('name',"images/photo"+new_id +'.jpg');
		},
		rotateAntiClockwise: function() {
			var new_id = this.get('id');
			new_id = (new_id + 1)%8;
			this.set('id', new_id);
			this.set('name',"images/photo"+new_id +'.jpg');
		},
		selectInner: function(){
			var pass = this.get('password');
			var inner = this.get('inner').toArray();
			pass += inner.objectAt((this.get('id') + this.get('color'))%8);
			this.set('password', pass);
		},
		verify: function(){
			var self = this;
			Ember.$.post('/api/user/existColour',{username: this.get('username')}).then(function(response){
				if (response.found == true){
					self.set('colour', response.colour);
					self.set('foundColour', true);
					if (self.get('colour') == 'yellow'){
						self.set('color', 0);
					}
					else if (self.get('colour') == 'blue'){
						self.set('color', 1);
					}
					else if (self.get('colour') == 'green'){
						self.set('color', 2);
					}
					else if (self.get('colour') == 'purple'){
						self.set('color', 3);
					}
					else if (self.get('colour') == 'pink'){
						self.set('color', 4);
					}
					else if (self.get('colour') == 'red'){
						self.set('color', 5);
					}
					else if (self.get('colour') == 'black'){
						self.set('color', 6);
					}
					else if (self.get('colour') == 'orange'){
						self.set('color', 7);
					}
				}
				else{
					alert('Not found');
				}
			});
			
		},
		selectOuter: function(){
			var pass = this.get('password');
			var outer = this.get('outer').toArray();
			pass += outer.objectAt((this.get('id') + this.get('color'))%8);
			this.set('password', pass);
		}//,
		// createUser: function(){
		// 	Ember.$.post('/api/user/create',{username: this.get('username'), password: this.get('password')}).then(function (response) {
		// 		alert(response.id);
		// 	});
		// }
	}
});
