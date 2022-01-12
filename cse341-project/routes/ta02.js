//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require("express");
const router = express.Router();

const users = []; //Tribett

function searchUsers(user, userArray) {
  for (let i = 0; i < userArray.length; i++) {
    if (userArray[i] === user) {
      return i;
    }
    return -1;
  }
}

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
  users.push({ name: req.body.addUser });
  res.redirect("/ta02/");
});

router.post("/removeUser", (req, res, next) => {
  const name = req.body.removeUser;
  let userPos = searchUsers(name, users);
  const index = users.indexOf();
  if (index > -1) {
    users.splice(index, userPos);
  }
  res.redirect("/ta02/");
});

module.exports = router;
