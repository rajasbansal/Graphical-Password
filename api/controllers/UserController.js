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
			if (err) return next(err);    //will return errors if true TO BE ADDED
			res.ok({name:user.name, colour: user.colour, id: user.id},"");
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

