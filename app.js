const express = require('express');

var app = express();
var port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("landing");
});

app.get('/campgrounds', (req, res) => {
    var campgrounds = [
        {name: "Salmon Creek", image: "https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144291f6c271a5efb7_340.jpg"},
        {name: "Granite Hill", image: "https://pixabay.com/get/e83db50a21f4073ed1584d05fb1d4e97e07ee3d21cac104496f4c77aafefb7ba_340.jpg"},
        {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f4c77aafefb7ba_340.jpg"}
    ]

    res.render("campgrounds", {campgrounds:campgrounds});
});

app.post('/campgrounds', (req, res) => {
    res.send("You hit");
    //get data from form and add to campgrounds array
    //redirect beck to campgrounds page

});

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});