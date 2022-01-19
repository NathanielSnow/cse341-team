//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require("express");
const router = express.Router();

const users = [];

router.get("/", (req, res, next) => {
  res.render("pages/ta02", {
    title: "Team Activity 02",
    path: "/ta02", // For pug, EJS
    activeTA03: true, // For HBS
    contentCSS: true, // For HBS
    users: users,
  });
});

router.post("/addUser", (req, res, next) => {
  users.push({ Name: req.body.addUser });
  res.redirect("/ta02/");
});

router.post("/removeUser", (req, res, next) => {
  const name = req.body.removeUser;

  for (let user of users) {
    if (user.Name === name) {
      let index = users.indexOf(user);
      users.splice(index, 1);
      break;
    }
  }
  res.redirect("/ta02/");
});

module.exports = router;
