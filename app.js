const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Abhishek-admin:Tango_0range@cluster0.hsdpq.mongodb.net/DigInd", { useNewUrlParser: true });
const userSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema);


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/HomePage.html");
})
app.get("/login.html", function(req, res) {
    res.render("login", { Name: "Welcome" });
})
app.get("/HomePage.html", function(req, res) {
    res.sendFile(__dirname + "/HomePage.html");
})

app.get("/faq.html", function(req, res) {
    res.sendFile(__dirname + "/ques.html");
})

app.get("/signup.html", function(req, res) {
    res.render("signup", { Name: "Welcome" });
})

app.get("/about.html", function(req, res) {
    res.sendFile(__dirname + "/about.html");
})

// Health
app.get("/health.html", function(req, res) {
    res.sendFile(__dirname + "/health.html");
})
app.get("/health.html/pmuy.html", function(req, res) {
    res.sendFile(__dirname + "/health/pmuy.html");
})
app.get("/health.html/pmjay.html", function(req, res) {
    res.sendFile(__dirname + "/health/pmjay.html");
})


// Entrepreneur 
app.get("/Entrepreneur.html", function(req, res) {
    res.sendFile(__dirname + "/Entrepreneur.html");
})
app.get("/Entrepreneur.html/startupindia.html", function(req, res) {
    res.sendFile(__dirname + "/Entrepreneur/startupindia.html");
})
app.get("/Entrepreneur.html/standupindia.html", function(req, res) {
    res.sendFile(__dirname + "/Entrepreneur/standupindia.html");
})
app.get("/Entrepreneur.html/asiim.html", function(req, res) {
    res.sendFile(__dirname + "/Entrepreneur/asiim.html");
})
app.get("/Entrepreneur.html/pmmy.html", function(req, res) {
    res.sendFile(__dirname + "/Entrepreneur/pmmy.html");
})



// Women
app.get("/women.html", function(req, res) {
    res.sendFile(__dirname + "/women.html");
})
app.get("/women.html/jssk.html", function(req, res) {
    res.sendFile(__dirname + "/women/jssk.html");
})
app.get("/women.html/pmsma.html", function(req, res) {
    res.sendFile(__dirname + "/women/pmsma.html");
})
app.get("/women.html/mi.html", function(req, res) {
    res.sendFile(__dirname + "/women/mi.html");
})
app.get("/women.html/ssy.html", function(req, res) {
    res.sendFile(__dirname + "/women/ssy.html");
})
app.get("/women.html/sgy.html", function(req, res) {
    res.sendFile(__dirname + "/women/sgy.html");
})
app.get("/women.html/pmuy.html", function(req, res) {
    res.sendFile(__dirname + "/women/pmuy.html");
})



// Agriculture
app.get("/agriculture.html", function(req, res) {
    res.sendFile(__dirname + "/agriculture.html");
})
app.get("/agriculture.html/pmkmy.html", function(req, res) {
    res.sendFile(__dirname + "//agriculture/pmkmy.html");
})
app.get("/agriculture.html/pmfby.html", function(req, res) {
    res.sendFile(__dirname + "/agriculture/pmfby.html");
})
app.get("/agriculture.html/kcc.html", function(req, res) {
    res.sendFile(__dirname + "/agriculture/kcc.html");
})
app.get("/agriculture.html/pmksn.html", function(req, res) {
    res.sendFile(__dirname + "/agriculture/pmksn.html");
})

// Post Request
app.post("/register", function(req, res) {
    const emailed = req.body.username.toUpperCase();
    const passwored = req.body.password;
    const newUser = new User({
        name: req.body.Name,
        phone: req.body.phone,
        email: req.body.username.toUpperCase(),
        password: req.body.password
    });
    User.find({ email: emailed }, function(err, found) {
        if (found.length != 0) {
            res.render("login", { Name: "Already Registered Email, Please Login." });
            console.log("Email Matched!!");
        } else {
            newUser.save();
            console.log("Registeration Successfull!!");
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'garg0901nipun@gmail.com',
                    pass: 'Hackodisha'
                }
            });
            let mailOptions = {
                from: 'garg0901nipun@gmail.com',
                to: emailed,
                cc: '',
                bcc: '',
                subject: 'Registration to DigIndia Portal',
                text: 'Thank you!\n\nThanks for signing up.Welcome to our Portal.We are happy to have you on board.Hey don’ t you follow us on social media as well ?\n\nYojna Aneek Sthaan Ek.'
            };

            transporter.sendMail(mailOptions, function(err, data) {
                if (err) {
                    console.log("Error", err);
                } else {
                    console.log('Email sent');
                }
            });
            res.render("login", { Name: "Successfully Registered !!" });
        }
    })
});

app.post("/login", function(req, res) {
    const emailed = req.body.username.toUpperCase();
    const passwored = req.body.password;
    User.find({ email: emailed }, function(err, found) {
        if (found.length != 0) {
            pass = found[0].password;
            if (pass === passwored) {
                const named = found[0].name;
                res.render("sector", { Name: named });
                console.log("Email and password MATCHED!!");
            } else {
                console.log("NOT matched!!");
                res.render("login", { Name: "Incorrect Password !!" });
            }
        } else {
            console.log("email not found");
            res.render("login", { Name: "Not registered Email." });
        }
    })
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
});