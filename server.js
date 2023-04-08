
const express = require('express')
const app = express()
const _ = require('lodash')
const mongoose = require('mongoose')

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')
require('dotenv').config()

const start = async function(){
  await mongoose.connect(process.env.connection_string);
}
start();

const postSchema = {
 title: String,
 kebabTitle : String,
 data: String
};

const Post = mongoose.model("Post", postSchema);

// const startingContent = {
//   title : "Lorem Ipsum",
//   kebabTitle : "Lorem-Ipsum",
//   data : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam lacus ante, sed suscipit urna sollicitudin a. Quisque sed justo ut ligula tristique facilisis sed at lectus. Aenean dui sapien, sollicitudin eu congue in, aliquam quis turpis. Ut at vulputate tortor, sed consequat eros. Mauris condimentum elit in dui hendrerit vulputate. Integer id risus magna. Ut fermentum felis sit amet facilisis pellentesque. Morbi convallis nec ipsum non sagittis. Vestibulum ultricies, quam eu fermentum faucibus, augue tellus facilisis sem, tristique euismod arcu enim non dolor. Integer eu sagittis lacus, eu porta urna. Nulla ac lectus urna."
// }

//listOfPosts.unshift(startingContent)

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

let p = Post.find({}).exec();

listOfPosts = [];
p.then(function(posts){
  posts.forEach(function(post){
    listOfPosts.unshift(post);
  })
});

app.get("/",function(req,res){
  pageNo = 1
  totPages = Math.ceil(listOfPosts.length/4)
  res.render("home",{list:listOfPosts.slice(0,4),pageNo:pageNo,totPages:totPages})
})

app.get("/home/:pageNo",function(req,res){
  pageNo = req.params.pageNo

  totPages = Math.ceil(listOfPosts.length/4)
  res.render('home',{list:listOfPosts.slice(((pageNo-1)*4),((pageNo-1)*4)+4),pageNo:pageNo,totPages:totPages})
})

app.get("/posts/:title",function(req,res){
  const tle = req.params.title
  let post = 0;
  listOfPosts.forEach(function(item){
    if(item.kebabTitle == tle){
      post = item;
    }
  })
  res.render('post',{item:post});
})

app.get("/contact",function(req,res){
  res.render('contact',{content:contactContent})
})

app.get("/about",function(req,res){
  res.render('about',{content:aboutContent})
})

app.get('/compose',function(req,res){
  res.render('compose')
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

app.listen(3000,function(){
  console.log("server started to the port 3000");
})
