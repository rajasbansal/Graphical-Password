import Ember from 'ember';

export default Ember.Controller.extend({
	name: "/api/assets/images/photo0.jpg",
	id: 0,
	inner: ['5','3','h','f','c','b','1','7'],
	outer: ['4','2','g','e','d','a','8','6'],
	password: '',
	color: 0,			//user can choose color value
	actions:{
		rotateClockwise: function() {
			var new_id = this.get('id');
			new_id = (new_id - 1)%8;
			if (new_id < 0) new_id+=8;
			this.set('id', new_id);
			this.set('name',"/assets/images/photo"+new_id +'.jpg');
		},
		rotateAntiClockwise: function() {
			var new_id = this.get('id');
			new_id = (new_id + 1)%8;
			this.set('id', new_id);
			this.set('name',"/assets/images/photo"+new_id +'.jpg');
		},
		selectInner: function(){
			var pass = this.get('password');
			var inner = this.get('inner').toArray();
			pass += inner.objectAt(this.get('id'));
			this.set('password', pass);
		},
		selectOuter: function(){
			var pass = this.get('password');
			var outer = this.get('outer').toArray();
			pass += outer.objectAt(this.get('id'));
			this.set('password', pass);
		}
	}
});
