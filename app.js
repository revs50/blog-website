//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lc = require('lodash/lowerCase');
const post = []

const homeStartingContent = "Welcome to online blogging system! Get started with you first ever own blog. Publish you literary works, poems, articles, reviews, experiences, stories, esssays and much more.";
const aboutContent = "Get a chance to publish you first post and access to amazing content .";
const contactContent = "Connect your favourite writers and content creators.";

const app = express();

const mongoose = require("mongoose");
var url="mongodb://localhost:27017/blogDB"; 

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = mongoose.model('posted',{
  title:String,
  postcontent:String
});


// const postSchema = {

//   title: String,
 
//   content: String
 
//  };

//creating new mongoose model
// const Post = mongoose.model("Post", postSchema);
 
// const post1=new postSchema({title:'day1',postcontent:'inserted'});
// post1.save().then(()=>console.log('posted'));



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/",function(req,res){

  postSchema.find({},function(err,founditems){
    if(founditems.length>0){
      res.render("home" ,{homeStartingContent:homeStartingContent,content:founditems})
    }
    else{
      res.render("home" ,{homeStartingContent:homeStartingContent,content:post})
    }
  })
 
})



app.get("/about",function(req,res){
  res.render("about" ,{aboutContent:aboutContent})
})

app.get("/contact",function(req,res){
  res.render("contact" ,{contactContent:contactContent})
})

app.get("/compose",function(req,res){
  
  res.render("compose" )
})

app.post("/compose",function(req,res){


  const content  = {     // java script object
    title:req.body.postTitle,    
    post:req.body.postbody
  }

  // post document
  const postdata =new postSchema({
    title:req.body.postTitle,
    postcontent:req.body.postbody
  })

  postdata.save(function(err){
    
    if(!err){
      res.redirect("/");
    }
    else{
       res.send("<h1>error</h1>")
    }
  });
 
 

})

app.get("/post/:contentsid",(req,res)=>{

  const con=req.params.contentsid;
  // console.log(lc(con))
  

  // post.forEach(function(content){
  //   if(lc(content.title)==con){
  //      console.log(req.params,"pahucha") 
  //      res.render("post",{clickedcontent:content});
  //   }
  //   else{
  //     console.log("not a match")
  //   }
  // })

  postSchema.findOne({'_id':con},function(err,gettingpost){
       res.render("post",{clickedcontent:gettingpost})
  }
  )

  
  
})






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
