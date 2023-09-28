const express = require("express");
const app = express();
const path = require("path");
const {v4 : uuidv4} = require("uuid");
const methodOverride = require("method-override");

const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public/CSS")));
app.use(express.static(path.join(__dirname, "public/JS")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));


app.listen(port, () =>{
    console.log(`Port Listning ${port}`);
});

let posts = [
    {
        username : "adam",
        content : "Eat, Sleep, Code, Repeat !",
        id : uuidv4()
    },
    {
        username : "harry",
        content : "Code is Love",
        id : uuidv4()
    }
];


app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res)=>{
    res.render("create.ejs");
});

app.post("/posts", (req, res)=>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({username, content, id});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
})

app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect(`/posts`)
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id===p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})