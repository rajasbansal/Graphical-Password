App.Router.map(function(){
	this.route('dial');
	this.route('login');
	this.route('profile');
});


App.Router.reopen({
    location: 'history'
});