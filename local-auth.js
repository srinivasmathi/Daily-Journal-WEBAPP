const express = require('express');
const passport = require('passport');

const router = express.Router();

const User = require('./auth');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//----------------local authentication routes-----------------------//

router.post("/register",(req,res) => {
  
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    User.register({ username : username, email : email }, password, function(err, user) {
        if (err) {
            console.log(err);
            const errorMessage =  "Email Already exist";
            res.render("register",{ errorMessage });
        }else{
            console.log("successful registration");
            res.redirect("/home");
        }
    });

});

router.post("/",(req,res) => {

    email = req.body.email;
    password = req.body.password;

    if(email === "" || password === ""){
      errorMessage = "Empty fields!";
      res.render('login',{errorMessage});
    }else{
      
      const user = new User({
        email :req.body.email,
        password:req.body.password
      })
   
      req.login(user,(err) => {
   
      try{
        if (err) { 
          console.log(err);
          const errorMessage = "Incorrect username or password";
          res.render("login",{ errorMessage });
         } else {
  
          const authenticate  = passport.authenticate("local",{failureRedirect : "/?error=Invalid%20username%20or%20password"});
          authenticate(req,res,function(){
            res.redirect("/home");
          })
          
         }
      }catch(err){
          console.log(err);
          const errorMessage = "Incorrect username or password";
          res.render("login",{ errorMessage });
      }
       
      });
    }

})
router.get('/logout',(req, res) => {
  req.logout((err)=>{
    if(err){
        console.log(err);
    }else{
        res.redirect("/");
    }
  });
});


module.exports = router;