import express from "express";
import { connect } from "mongoose";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import back from "./router/back.js";
import front from "./router/front.js";

connect(
  "mongodb+srv://diegotouchard1:1Wxcnbv1@cluster0.wk7p7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
  .then(function () {
    console.log("connexion à mongodb atlas réussie");
  })
  .catch(function (err) {
    console.log(new Error(err));
  });

const app = express();
const PORT = 1235;

app.set("view engine", "ejs");
app.set("views", "./views");

const path_dossier = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(path_dossier, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(front);
app.use(back);
app.listen(PORT, console.log(`express écoute sur le port ${PORT}`));
