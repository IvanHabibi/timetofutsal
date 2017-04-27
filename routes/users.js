var express = require('express');
var router = express.Router();
const util = require('../helpers/util');
const userController = require('../controllers/userController');
const passport = require('passport');

/* GET users listing. */

router.get('/users/',util.isValidAdmin,userController.getAllUser)
router.get('/users/:id',util.isValidUserOrAdmin,userController.getOneUser)
router.post('/users/',util.isValidAdmin,userController.insertUser)
router.put('/users/:id',util.isValidUserOrAdmin,userController.updateUser)
router.delete('/users/:id',util.isValidAdmin,userController.deleteUser)
router.post('/signup/',userController.signUp)
// router.post('/signin',userController.signIn)

router.post('/signin',passport.authenticate('local',{
  session:false
}),(req,res)=>{
  let user = req.user;
  res.send(user)
})


module.exports = router;
