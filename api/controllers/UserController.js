/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res, next) {
		console.log('request reached');
		require('bcrypt').hash(req.body.password, 10, function passwordEncrypted(err, encrypted) {
	      if (err) return next(err);
	      req.body.encryptedPassword = encrypted;
	      User.create({name:req.body.name, colour: req.body.colour, email: req.body.email, username: req.body.username, encryptedPassword: req.body.encryptedPassword}, function(err, user){
			if (err){
				res.ok({created: false});
				return next();
			}    //will return errors if true TO BE ADDED
			// if (!user){
			// 	console.log('error');
			// 	return next(err);
			// }
			res.ok({created: true, name:user.name, colour: user.colour, id: user.id},"");
		});
	    });
		
	},
	existColour: function(req, res, next){
		console.log('request reached');
		User.findOne({username: req.body.username}).exec(function(err, rec){
			if (err) return next(err);    //will return errors if true TO BE ADDED	
			if (!rec){
				res.ok({found: false}, "");
			}
			else{
				res.ok({found: true, colour: rec.colour});
			}
			
		});
	},
	authenticate: function( req, res, next){
		var oldDateObj = new Date();
		var newDateObj = new Date(oldDateObj.getTime() + 60000);
		req.session.cookie.expires = newDateObj; 
		console.log(req.session);

		User.findOne({username: req.body.username}).exec(function(err, user){
			if (err) return next(err);
			var data ={};
			if (!user){
				data.found = false;
				res.ok(data,"");
				return;
			}
			else{
				data.found = true;
				require('bcrypt').compare(req.body.password, user.encryptedPassword, function(err, valid) {
					if (err) return next(err);

					// If the password from the form doesn't match the password from the database
					if (!valid) {
						data.passwordMatch = false;
						res.ok(data, "");
						return;
					}
					data.passwordMatch = true;
					// Log user in
					req.session.authenticated = true;
					req.session.User = user.toJSON();

					//send checked data
					data.authenticated = true;
					data.User = user.toJSON();
					console.log(req.session);
					console.log(data);
					res.ok(data, "");
				});
			}
		});
	},
	isAuthenticated: function(req, res, next){
		res.ok({authenticated: req.session.authenticated, User: req.session.User},"");
	},
	logout: function(req, res, next){
		req.session.destroy();
	}
};


// module.exports = {
// 	create: function (req, res, next) {
// 		console.log('request reached');
// 		User.create({name:req.body.name, colour: req.body.colour, email: req.body.email, username: req.body.username}, function(err, user){
// 			if (err) return next(err);    //will return errors if true TO BE ADDED
// 			res.ok({name:user.name, colour: user.colour, id: user.id},"");
// 		});
		
// 	},
// 	existColour: function(req, res, next){
// 		console.log('request reached');
// 		User.findOne({username: req.body.username}).exec(function(err, rec){
// 			if (err) return next(err);    //will return errors if true TO BE ADDED	
// 			if (!rec){
// 				res.ok({found: false}, "");
// 			}
// 			else{
// 				res.ok({found: true, colour: rec.colour});
// 			}
			
// 		});
// 	}
// };

