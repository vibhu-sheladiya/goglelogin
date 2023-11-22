const express = require("express");
const session = require("express-session");
const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const path = require("path");
const app = express();
const ejs = require("ejs");
require("./auth");
const dotenv = require("dotenv");
// dotenv.config("../");
app.use(express.json());
app.set("view engine", "ejs");
// app.set('view engine', 'html');
// function isLoggedIn(req, res, next) {
//   req.user ? next() : res.sendStatus(401);
// }
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
  );
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.get("/login", (req, res) => {
  res.render(path.join(__dirname,"login.ejs"));
});
app.get("/dashboard", (req, res) => {
  if(req.isAuthenticated()){
    console.log(req.user);
    res.render(path.join(__dirname,"dashboard.ejs"),
    {user:req.user});
  }else{
    res.redirect("/login");
  }
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login"}),
   async(req,res)=>{
    res.redirect("/dashboard");
   },
 
);

app.get("/logout",(req,res)=>{
  req.logOut(function (err){
    if(err){
      console.log(err);
    }else{
      res.redirect("/login");
    }
  })
})


// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "/auth/protected",
//     failureRedirect: "/auth/google/failure",
//   })
// );

// app.get("/auth/protected", (req, res) => {
//   let name = req.user.displayName;
//   res.send(`helo ${name}`);
// });
// app.get("/auth/google/failure", (req, res) => {
//   res.send("something wrong");
// });


// app.use(
//   session({
//     secret: "key",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID:"988268199518-g8j5jje7l5ctcf7u91dl2851dfjs30q4.apps.googleusercontent.com" ,
//       clientSecret:"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" ,
//       callbackURL: "http://localhost:3000/auth/google/callback",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       // Use the profile information to authenticate the user
//       // ...
//       cb(null, profile);
//     }
//   )
// );

// Serve static files from the 'public' folder
// app.use(express.static(path.join(__dirname, "public")));

// app.get("/login", (req, res) => {
//   res.render(path.join(__dirname, "..", "login.ejs"));
// });

// app.get("/dashboard", (req, res) => {
//   // check if user is logged in
//   if (req.isAuthenticated()) {
//     console.log(req);
//     res.render(path.join(__dirname, "..", "dashboard.ejs"), { user: req.user });
//   } else {
//     res.redirect("/login");
//   }
// });

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     res.redirect("/dashboard");
//   }
// );

// app.get("/logout", (req, res) => {
//   req.logout(function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect("/login");
//     }
//   });
// });

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
