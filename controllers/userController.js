var method = {}
var User = require("../models/users");
var passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

method.getAllUser = (req, res, next) => {
    User.find(function(err, users) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.send(users);
        }
    });
}




method.insertUser = (req, res, next) => {
  var user = new User({
          username: req.body.username,
          password: passwordHash.generate(req.body.password),
          name: req.body.name,
          role: req.body.role
      });
    user.save(function(err, createdUser) {
        if (err) {
            res.send(err);
        }
        res.send(createdUser);
    });
}

method.updateUser = (req, res, next) => {
    User.findById(req.params.id, function(err, user) {
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } else {

            user.username = req.body.isbn || user.username;
            user.password = passwordHash.generate(req.body.password) || user.password;
            user.name = req.body.name || user.name;
            user.role = req.body.role || user.role;


            user.save(function(err, user) {
                if (err) {
                    res.status(500).send(err)
                }
                res.send(user);
            });
        }
    });
}

method.deleteUser = (req, res, next) => {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        var response = {
            message: "user successfully deleted",
            id: user._id
        };
        res.send(response);
    });
}

method.signUp = (req, res, next) => {
    var user = new User({
            username: req.body.username,
            password: passwordHash.generate(req.body.password),
            name: req.body.name,
            role: req.body.role
        }

    );
    user.save(function(err, createdUser) {
        if (err) {
            res.send(err);
        }
        res.send(createdUser);
    });
}


method.getOneUser = (req, res, next) => {
    User.findById(req.params.id, function(err, user) {
        if (err) {
            res.send(err)
        }
        res.send(user)
    })
}

method.signIn = (username, password, next) => {
    User.findOne({
        username: username
    }, function(err, person) {
        if (err) {
            res.send(err)
        }
        if (!person) {
            next(null,{msg:'username not found'})
        } else {
            if (passwordHash.verify(password, person.password)) {
              let token = jwt.sign({
                  username: person.username,
                  role: person.role,
                  id: person._id
              }, 'rahasia', {
                  expiresIn: '3h'
              })
              next(null,{token:token})
            }else{
              next(null,{msg:'password tidak cocok'})
            }
        }
    })
}




module.exports = method;
