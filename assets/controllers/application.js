App.ApplicationController = Ember.Controller.extend({
	username: '',
	init: function(){
		var self = this;
		Ember.$.post('/api/user/isAuthenticated',{}).then(function(response){
				if (response.authenticated){
					self.set('isAuthenticated', true);
					self.set('username', response.User.name);
				}
				else {
					self.set('isAuthenticated', false);
				}
			});
	},
	actions:{
		logout: function(){
			Ember.$.post('/api/user/logout',{}).then(function(response){
			});
			window.location.reload(true);
		}
	}
});