//TA06 PLACEHOLDER
const express = require("express");
const router = express.Router();
const fs = require("fs");
const bcrypt = require("bcryptjs");
const { json } = require("express");
const { validationResult, body } = require("express-validator");

router.get("/", (req, res, next) => {
  res.render("pages/ta06", {
    title: "Team Activity 06",
    path: "/ta06", // For pug, EJS
    signUpMessage: "",
    loginMessage: "",
  });
});

router.post(
  "/signup",
  [
    body("userEmail")
      .isEmail()
      .withMessage("Please enter valid email, you useless human")
      .normalizeEmail(),
    body("userPassword")
      .isLength({ min: 4 })
      .withMessage("Password Invalid. You need four characters.")
      .trim(),
  ],
  (req, res, next) => {
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("pages/ta06", {
        title: "Team Activity 06",
        path: "/ta06", // For pug, EJS
        signUpMessage: errors.array()[0].msg,
        loginMessage: "",
      });
    }

    bcrypt
      .hash(userPassword, 12)
      .then((hashPassword) => {
        const userPass = { password: hashPassword, email: userEmail };
        const jsonString = JSON.stringify(userPass);
        fs.writeFileSync("user.txt", jsonString);
      })
      .then((result) => {
        res.render("pages/ta06", {
          title: "Team Activity 06",
          path: "/ta06", // For pug, EJS
          signUpMessage: "",
          loginMessage: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

router.post("/login", (req, res, next) => {
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;

  const fileText = fs.readFileSync("user.txt");

  const userInfo = JSON.parse(fileText);

  if (userEmail !== userInfo.email) {
    res.render("pages/ta06", {
      title: "Team Activity 06",
      path: "/ta06", // For pug, EJS
      signUpMessage: "",
      loginMessage: "Email incorrect, what is wrong with you!",
    });
  }
  bcrypt.compare(userPassword, userInfo.password).then((isVarified) => {
    if (isVarified) {
      res.render("pages/ta06", {
        title: "Team Activity 06",
        path: "/ta06", // For pug, EJS
        signUpMessage: "",
        loginMessage: "Yay! Access Granted!",
      });
    } else {
      res.render("pages/ta06", {
        title: "Team Activity 06",
        path: "/ta06", // For pug, EJS
        signUpMessage: "",
        loginMessage: "Incorrect password.",
      });
    }
  });
});

module.exports = router;
