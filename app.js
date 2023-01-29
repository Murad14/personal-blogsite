const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
const ejs = require("ejs");  //ejs
const _ = require('lodash'); //lodash
const mongoose = require('mongoose'); //mongoose
mongoose.connect('mongodb://127.0.0.1:27017/blogDB');
// global.POSTS = [];

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs'); //view engine to ejs set
app.use(express.static("public"));

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get('/', (req, res) => {

  Post.find({}, function(err, posts){
    res.render('home', { homeStartingContent, POSTS: posts });
  })
 
})

app.get('/about', (req, res) => {
  res.render('about', { aboutContent });
})

app.get('/contact', (req, res) => {
  res.render('contact', { contactContent });
})

app.get('/compose', (req, res) => {
  res.render('compose', {});
})

app.post('/compose', (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save((err) => {
    if (!err){
        res.redirect("/");
    }
  });
})

// Route Parameters
app.get("/posts/:postId", (req, res) => {
  const requestedPostId = req.params.postId;
    // const requestedTitle = _.lowerCase(req.params.postName);
   
    // posts.forEach(post => {
      // const storedTitle = _.lowerCase(post.title);
   
      Post.findOne({_id: requestedPostId}, (err, post) => {
        res.render("post", {
          title: post.title,
          content: post.content
        });
      });
    });
  // });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})