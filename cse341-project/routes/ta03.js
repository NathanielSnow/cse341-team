//TA03 PLACEHOLDER
const express = require("express");
const router = express.Router();

const fs = require("fs");

const path = require("path");
const p = path.join(path.dirname(require.main.filename), "data", "items.json");

router.get("/", (req, res, next) => {
  res.render("pages/ta03", {
    title: "Team Activity 03",
    path: "/ta03", // For pug, EJS
    activeTA03: true, // For HBS
    contentCSS: true, // For HBS
  });
});

router.post("/itemSearch", (req, res, next) => {
  const item = req.body.itemSearch;
  fs.readFile(p, (err, fileContent) => {
    items = JSON.parse(fileContent);
    console.log(items[0].tags);

    for (let i of items) {
      for (let tag of i.tags) {
        if (item === tag) {
          console.log("I found one!!");
        }
      }
    }
  });
  res.redirect("/ta03");
});

module.exports = router;
