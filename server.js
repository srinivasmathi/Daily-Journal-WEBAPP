
const express = require('express')
const app = express()

const session = require('express-session');
const mongoose = require('mongoose')
const _ = require('lodash')
const passport = require('passport');

require('dotenv').config()
require('./auth');
const localAuthRouter = require("./local-auth");

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.use(session({
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized : false
}))
app.use(passport.initialize());
app.use(passport.session());


let listOfPosts = [];

const postSchema = {
 title: String,
 kebabTitle : String,
 data: String
};

let Post;

//connection to the database
await start().catch(err => console.log(err));

async function start(){

  try {

    Post = await mongoose.model("Post", postSchema);

    let p = await Post.find({}).exec();
    p.forEach(function(post){
      listOfPosts.unshift(post);
    })

  }catch(err){
    console.log(err);
  }
}


const contactContent = "Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!"
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec euismod mauris. Proin porta nisi scelerisque, scelerisque nulla non, fermentum lorem. Integer porttitor in metus sit amet sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis, tortor at viverra efficitur, orci dui cursus dui, sit amet porta felis eros non est. Nullam mollis luctus turpis, a luctus urna venenatis ac. Praesent ut lectus tincidunt, rhoncus ipsum sed, efficitur orci. Donec vitae arcu eget neque dignissim vestibulum. Duis egestas congue neque, a faucibus justo ornare a.Morbi vel auctor libero, quis finibus libero. Nam ut orci varius, dignissim orci a, finibus lacus. Quisque facilisis diam eros, vitae consectetur sapien convallis ac. Morbi ut dolor vel nunc lacinia consequat sed tempus urna. Donec non libero nec massa egestas placerat. Etiam ac erat eget tortor dapibus iaculis eget ac sapien. Nulla sit amet ultrices lectus, a interdum nibh. Curabitur ultricies mauris sit amet risus facilisis vestibulum. Nam condimentum eu mauris sit amet venenatis. Ut turpis dui, sagittis et dui ac, bibendum lobortis nisi. Sed pellentesque nisl vitae diam faucibus tempor. Nunc commodo nibh erat, vel pretium augue tincidunt a.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec euismod mauris. Proin porta nisi scelerisque, scelerisque nulla non, fermentum lorem. Integer porttitor in metus sit amet sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis, tortor at viverra efficitur, orci dui cursus dui, sit amet porta felis eros non est. Nullam mollis luctus turpis, a luctus urna venenatis ac. Praesent ut lectus tincidunt, rhoncus ipsum sed, efficitur orci. Donec vitae arcu eget neque dignissim vestibulum. Duis egestas congue neque, a faucibus justo ornare a.Morbi vel auctor libero, quis finibus libero. Nam ut orci varius, dignissim orci a, finibus lacus. Quisque facilisis diam eros, vitae consectetur sapien convallis ac. Morbi ut dolor vel nunc lacinia consequat sed tempus urna. Donec non libero nec massa egestas placerat. Etiam ac erat eget tortor dapibus iaculis eget ac sapien. Nulla sit amet ultrices lectus, a interdum nibh. Curabitur ultricies mauris sit amet risus facilisis vestibulum. Nam condimentum eu mauris sit amet venenatis. Ut turpis dui, sagittis et dui ac, bibendum lobortis nisi. Sed pellentesque nisl vitae diam faucibus tempor. Nunc commodo nibh erat, vel pretium augue tincidunt a.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec euismod mauris. Proin porta nisi scelerisque, scelerisque nulla non, fermentum lorem. Integer porttitor in metus sit amet sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis, tortor at viverra efficitur, orci dui cursus dui, sit amet porta felis eros non est. Nullam mollis luctus turpis, a luctus urna venenatis ac. Praesent ut lectus tincidunt, rhoncus ipsum sed, efficitur orci. Donec vitae arcu eget neque dignissim vestibulum. Duis egestas congue neque, a faucibus justo ornare a.Morbi vel auctor libero, quis finibus libero. Nam ut orci varius, dignissim orci a, finibus lacus. Quisque facilisis diam eros, vitae consectetur sapien convallis ac. Morbi ut dolor vel nunc lacinia consequat sed tempus urna. Donec non libero nec massa egestas placerat. Etiam ac erat eget tortor dapibus iaculis eget ac sapien. Nulla sit amet ultrices lectus, a interdum nibh. Curabitur ultricies mauris sit amet risus facilisis vestibulum. Nam condimentum eu mauris sit amet venenatis. Ut turpis dui, sagittis et dui ac, bibendum lobortis nisi. Sed pellentesque nisl vitae diam faucibus tempor. Nunc commodo nibh erat, vel pretium augue tincidunt a.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec euismod mauris. Proin porta nisi scelerisque, scelerisque nulla non, fermentum lorem. Integer porttitor in metus sit amet sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis, tortor at viverra efficitur, orci dui cursus dui, sit amet porta felis eros non est. Nullam mollis luctus turpis, a luctus urna venenatis ac. Praesent ut lectus tincidunt, rhoncus ipsum sed, efficitur orci. Donec vitae arcu eget neque dignissim vestibulum. Duis egestas congue neque, a faucibus justo ornare a.Morbi vel auctor libero, quis finibus libero. Nam ut orci varius, dignissim orci a, finibus lacus. Quisque facilisis diam eros, vitae consectetur sapien convallis ac. Morbi ut dolor vel nunc lacinia consequat sed tempus urna. Donec non libero nec massa egestas placerat. Etiam ac erat eget tortor dapibus iaculis eget ac sapien. Nulla sit amet ultrices lectus, a interdum nibh. Curabitur ultricies mauris sit amet risus facilisis vestibulum. Nam condimentum eu mauris sit amet venenatis. Ut turpis dui, sagittis et dui ac, bibendum lobortis nisi. Sed pellentesque nisl vitae diam faucibus tempor. Nunc commodo nibh erat, vel pretium augue tincidunt a."

let pageNo = 0;
let totPages =0;
//Math.ceil(listOfPosts.length/4);

// const post = new Post ({
//    title: startingContent.title,
//    kebabTitle : startingContent.kebabTitle,
//    data: startingContent.data
//
//  });
//  post.save();

app.get("/home",(req,res)=>{

  if(req.isAuthenticated()){
    pageNo = 1
    totPages = Math.ceil(listOfPosts.length/4);
    res.render("home",{list:listOfPosts.slice(0,4),pageNo:pageNo,totPages:totPages})
  }else{
    res.redirect('/');
  }

})

app.get("/",async (req,res)=>{

  const errorMessage = req.query.error;
  res.render('login',{ errorMessage });

})

app.get("/register",(req,res)=>{
  res.render('register');
})


app.get("/home/:pageNo",function(req,res){
  if(req.isAuthenticated()){
    pageNo = req.params.pageNo
    totPages = Math.ceil(listOfPosts.length/4)
    res.render('home',{list:listOfPosts.slice(((pageNo-1)*4),((pageNo-1)*4)+4),pageNo:pageNo,totPages:totPages})
  }else{
    res.redirect("/");
  }
})

app.get("/posts/:title",function(req,res){

  if(req.isAuthenticated()){
    const tle = req.params.title
    let post = 0;
    listOfPosts.forEach(function(item){
      if(item.kebabTitle == tle){
        post = item;
      }
    })
    res.render('post',{item:post});
  }else{
    res.redirect("/");
  }
})

app.get("/contact",function(req,res){
  if(req.isAuthenticated()){
    res.render('contact',{content:contactContent});
  }else{
    res.redirect("/");
  }
})

app.get("/about",function(req,res){
  if(req.isAuthenticated()){
    res.render('about',{content:aboutContent})
  }else{
    res.redirect("/");
  }
})

app.get('/compose',function(req,res){
  if(req.isAuthenticated()){
    res.render('compose')
  }else{
    res.redirect("/");
  }
})

app.post("/compose",function(req,res){

  const title = req.body.postTitle;
  const postData = req.body.postData;

  console.log(postData.split('\r\n'));

  const data = {
    title : title,
    kebabTitle : _.kebabCase(title),
    data : postData
  };

  const post = new Post(data);

  post.save();
  listOfPosts.unshift(data);

  res.redirect("/");
})

//------------------------google authentication routes----------------------------------------//
app.get("/auth/google",
      passport.authenticate('google',{scope : ['profile','email']}),
);

app.get("/auth/google/res",
    passport.authenticate('google',{successRedirect : "/home",failureRedirect : "/?error=email%20email%20already%20exists"}),
);
//-----------------------------------------------------------------------------------------//

//---------------------facebook authentication routes--------------------------------------//

app.get("/auth/facebook",
    passport.authenticate('facebook')
)

app.get("/auth/facebook/res",
    passport.authenticate('facebook',{successRedirect : "/home",failureRedirect : "/?error=try%20again"}),
)
//-----------------------------------------------------------------------------------------//

app.listen(process.env.PORT || 3000,() => {
  console.log("server started to the port 3000");
});

app.use("/",localAuthRouter);

