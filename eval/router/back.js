import { Router } from "express";

const back = Router();

back.post("/register", async function (req, rep) {
  rep.render("register.ejs");
});
back.post("/login", async function (req, rep) {
  rep.render("login.ejs");
});

export default back;
