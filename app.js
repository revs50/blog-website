//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lc = require('lodash/lowerCase');
const post = []

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

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
