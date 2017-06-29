App.ProfileController = Ember.Controller.extend({
	username: 'kash',
	email: '',
	name: '',
	init: function(){
		var self = this;
		Ember.$.post('/api/user/isAuthenticated',{}).then(function(response){
				if (response.authenticated){
					self.set('isAuthenticated', true);
					self.set('name', response.User.name);
					self.set('username', response.User.username);
					self.set('email', response.User.email);
					console.log('ok');
				}
				else {
					self.set('isAuthenticated', false);
					console.log('not ok');
				}
			});
	}
});