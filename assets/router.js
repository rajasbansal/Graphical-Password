App.Router.map(function(){
	this.route('dial');
	this.route('login');
});
App.Router.reopen({

          location: 'history'

    });