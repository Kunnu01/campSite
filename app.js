const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const mongoose = require('mongoose');
var port = process.env.PORT || 3000;
mongoose.connect("mongodb://localhost:27017/yel_camp", (err, db) =>{
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }    
    console.log('connected to mongodb server');
});

//Schema setup
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Granite Hill",
//     image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f4c77aafefb7ba_340.jpg",
//     description: "This is a huge granite hill, no bathrooms, no water. Beautiful granite!"
// }, (err, campground) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(campground);
//     }
// });

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("landing");
});


//INDEX - show all campgrounds
app.get('/campgrounds', (req, res) => {
    //Get all the campgrounds from db
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds:allCampgrounds});
        }
    })
});


// CREATE - add new to DB
app.post('/campgrounds', (req, res) => {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    //create new campground and save to db
    Campground.create(newCampground, (err, newlycreated) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
});


// NEW - show form to create to new campground
app.get('/campgrounds/new', (req, res) => {
    res.render("new.ejs");
});

//SHOW - show more info about one campground
app.get('/campgrounds/:id', (req, res) => {
    //find campground with provided id
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground})
        }
    });
});

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});