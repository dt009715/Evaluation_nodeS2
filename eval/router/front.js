import { Router } from "express";
import Balades from "../entite/balade.js";
import { balade_found } from "../middleware/balade_found.js";
import { is_valid_id } from "../middleware/is_valid_id.js";

const front = Router();

front.get("/", async function (req, rep) {
  const balade = await Balades.find();
  rep.render("home.ejs", { balade: balade || [] });
});

front.get("/id/:id", function (req, rep) {
  const id = req.params.id;
  const balade = findOne(id);
  if (!balade) {
    rep.status(404).render("404.ejs");
  }
  rep.status(200).render("search.ejs", balade);
});

front.get("/search/:s", async function (req, rep) {
  const balade = await Balades.find();
  rep.render("home.ejs", { balade: balade || [] });
});

front.get("/arrondissement/:num_arrondissement", async (req, rep) => {
  try {
    const numArrondissement = parseInt(req.params.num_arrondissement, 10);

    if (
      isNaN(numArrondissement) ||
      numArrondissement < 1 ||
      numArrondissement > 20
    ) {
      return rep.status(400).render("400.ejs", { erreur: "" });
    }

    const count = await Balades.countDocuments({
      arrondissement: numArrondissement,
    });

    res.status(200).json({
      arrondissement: numArrondissement,
      count: count,
    });
  } catch (error) {
    console.error("Erreur lors du comptage des balades:", error);
    rep.status(500).json({
      error: "Une erreur s'est produite lors du comptage des balades.",
    });
  }
});
front.get("/synthese", async function (req, rep) {
  rep.render("home.ejs");
});

front.get("/add", function (req, rep) {
  rep.render("formulaire.ejs", { erreur: "", balade: {} });
});

front.post("/add", async function (req, rep) {
  const data = req.body;
  console.log(data);

  /*const { nom } = req.body;

  if (nom.length == 0) {
    rep.status(400).render("formulaire.ejs", {
      erreur: "nom de la balade obligatoire",
      balade: data,
    });
  }*/

  const balade = new Balades({
    nom: data.nom,
    arrondissement: data.arrondissement,
    texte_intro: data.texte_intro,
  });
  try {
    await balade.save();
    rep.redirect("/");
  } catch (erreur) {
    rep
      .status(400)
      .render("formulaire.ejs", { balade: data, erreur: erreur.message });
  }
});

front.get(
  "/update/:id",
  is_valid_id("modification"),
  balade_found("modification"),
  async function (req, rep) {
    const { id } = req.params;

    const balade = await Balades.findOne({ _id: id });

    rep.render("formulaire.ejs", { erreur: "", balade: balade });
  }
);

front.post(
  "/update/:id",
  is_valid_id("modification"),
  balade_found("modification"),
  async function (req, rep) {
    const { id } = req.params;

    try {
      await Balades.updateOne(
        { _id: id },
        { $set: { prenom, nom, age, email } }
      );
      rep.redirect("/");
    } catch (errer) {
      rep.status(400).render("formulaire.ejs", { erreur: errer.message });
    }
  }
);

front.get(
  "/delete/:id",
  is_valid_id("suppression"),
  balade_found("suppression"),
  async function (req, rep) {
    const { id } = req.params;
    await Balades.deleteOne({ _id: id });
    rep.redirect("/");
  }
);

export default front;
