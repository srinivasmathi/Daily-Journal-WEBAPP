
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


const postSchema = {
 title: String,
 kebabTitle : String,
 data: String
};

let Post;
let postCount = 0;
let pageNo = 0;
const pageSize = 4;
let totPages = 0;
let skipAmount = 0;

//connection to the database
start().catch(err => console.log(err));

async function start(){

  try {

    await mongoose.connect(process.env.connection_string);
    Post = await mongoose.model("Post", postSchema);
    postCount = await Post.countDocuments({});
    console.log(postCount);
  }catch(err){
    console.log(err);
  }
}


const contactContent = "Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!"
const aboutContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec euismod mauris. Proin porta nisi scelerisque, scelerisque nulla non, fermentum lorem. Integer porttitor in metus sit amet sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis, tortor at viverra efficitur, orci dui cursus dui, sit amet porta felis eros non est. Nullam mollis luctus turpis, a luctus urna venenatis ac. Praesent ut lectus tincidunt, rhoncus ipsum sed, efficitur orci. Donec vitae arcu eget neque dignissim vestibulum. Duis egestas congue neque, a faucibus justo ornare a.Morbi vel auctor libero, quis finibus libero. Nam ut orci varius, dignissim orci a, finibus lacus. Quisque facilisis diam eros, vitae consectetur sapien convallis ac. Morbi ut dolor vel nunc lacinia consequat sed tempus urna. Donec non libero nec massa egestas placerat. Etiam ac erat eget tortor dapibus iaculis eget ac sapien. Nulla sit amet ultrices lectus, a interdum nibh. Curabitur ultricies mauris sit amet risus facilisis vestibulum. Nam condimentum eu mauris sit amet venenatis. Ut turpis dui, sagittis et dui ac, bibendum lobortis nisi. Sed pellentesque nisl vitae diam faucibus tempor. Nunc commodo nibh erat, vel pretium augue tincidunt a.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec euismod mauris. Proin porta nisi scelerisque, scelerisque nulla non, fermentum lorem. Integer porttitor in metus sit amet sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis, tortor at viverra efficitur, orci dui cursus dui, sit amet porta felis eros non est. Nullam mollis luctus turpis, a luctus urna venenatis ac. Praesent ut lectus tincidunt, rhoncus ipsum sed, efficitur orci. Donec vitae arcu eget neque dignissim vestibulum. Duis egestas congue neque, a faucibus justo ornare a.Morbi vel auctor libero, quis finibus libero. Nam ut orci varius, dignissim orci a, finibus lacus. Quisque facilisis diam eros, vitae consectetur sapien convallis ac. Morbi ut dolor vel nunc lacinia consequat sed tempus urna. Donec non libero nec massa egestas placerat. Etiam ac erat eget tortor dapibus iaculis eget ac sapien. Nulla sit amet ultrices lectus, a interdum nibh. Curabitur ultricies mauris sit amet risus facilisis vestibulum. Nam condimentum eu mauris sit amet venenatis. Ut turpis dui, sagittis et dui ac, bibendum lobortis nisi. Sed pellentesque nisl vitae diam faucibus tempor. Nunc commodo nibh erat, vel pretium augue tincidunt a.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec euismod mauris. Proin porta nisi scelerisque, scelerisque nulla non, fermentum lorem. Integer porttitor in metus sit amet sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis, tortor at viverra efficitur, orci dui cursus dui, sit amet porta felis eros non est. Nullam mollis luctus turpis, a luctus urna venenatis ac. Praesent ut lectus tincidunt, rhoncus ipsum sed, efficitur orci. Donec vitae arcu eget neque dignissim vestibulum. Duis egestas congue neque, a faucibus justo ornare a.Morbi vel auctor libero, quis finibus libero. Nam ut orci varius, dignissim orci a, finibus lacus. Quisque facilisis diam eros, vitae consectetur sapien convallis ac. Morbi ut dolor vel nunc lacinia consequat sed tempus urna. Donec non libero nec massa egestas placerat. Etiam ac erat eget tortor dapibus iaculis eget ac sapien. Nulla sit amet ultrices lectus, a interdum nibh. Curabitur ultricies mauris sit amet risus facilisis vestibulum. Nam condimentum eu mauris sit amet venenatis. Ut turpis dui, sagittis et dui ac, bibendum lobortis nisi. Sed pellentesque nisl vitae diam faucibus tempor. Nunc commodo nibh erat, vel pretium augue tincidunt a.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec euismod mauris. Proin porta nisi scelerisque, scelerisque nulla non, fermentum lorem. Integer porttitor in metus sit amet sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis, tortor at viverra efficitur, orci dui cursus dui, sit amet porta felis eros non est. Nullam mollis luctus turpis, a luctus urna venenatis ac. Praesent ut lectus tincidunt, rhoncus ipsum sed, efficitur orci. Donec vitae arcu eget neque dignissim vestibulum. Duis egestas congue neque, a faucibus justo ornare a.Morbi vel auctor libero, quis finibus libero. Nam ut orci varius, dignissim orci a, finibus lacus. Quisque facilisis diam eros, vitae consectetur sapien convallis ac. Morbi ut dolor vel nunc lacinia consequat sed tempus urna. Donec non libero nec massa egestas placerat. Etiam ac erat eget tortor dapibus iaculis eget ac sapien. Nulla sit amet ultrices lectus, a interdum nibh. Curabitur ultricies mauris sit amet risus facilisis vestibulum. Nam condimentum eu mauris sit amet venenatis. Ut turpis dui, sagittis et dui ac, bibendum lobortis nisi. Sed pellentesque nisl vitae diam faucibus tempor. Nunc commodo nibh erat, vel pretium augue tincidunt a."

//Math.ceil(listOfPosts.length/4);

// const post = new Post ({
//    title: startingContent.title,
//    kebabTitle : startingContent.kebabTitle,
//    data: startingContent.data
//
//  });
//  post.save();

app.get("/home",async (req,res)=>{

  if(req.isAuthenticated()){
    pageNo = 1
    postCount = await Post.countDocuments({});
    totPages = Math.ceil(postCount/pageSize);
    skipAmount = (pageNo - 1) * pageSize;
    posts = await Post.find({}).sort({_id : -1}).skip(skipAmount).limit(pageSize).exec();
    res.render("home",{list:posts,pageNo:pageNo,totPages:totPages})
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


app.get("/home/:pageNo",async function(req,res){
  if(req.isAuthenticated()){
    pageNo = req.params.pageNo;
    postCount = await Post.countDocuments({});
    totPages = Math.ceil(postCount/pageSize);
    skipAmount = (pageNo - 1) * pageSize;
    const posts = await Post.find({}).sort({_id : -1}).skip(skipAmount).limit(pageSize).exec();

    res.render('home',{list:posts,pageNo:pageNo,totPages:totPages})

  }else{
    res.redirect("/");
  }
})

app.get("/posts/:title",async function(req,res){

  if(req.isAuthenticated()){

    const tle = req.params.title;
    const post = await Post.find({kebabTitle : tle }).exec();
    res.render('post',{item:post[0]});

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

  const data = {
    title : title,
    kebabTitle : _.kebabCase(title),
    data : postData
  };

  const post = new Post(data);

  post.save();

  res.redirect("/home");
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

app.use("/",localAuthRouter);

app.listen(process.env.PORT || 3000,() => {
  console.log("server started to the port 3000");
});


