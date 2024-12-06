import { Schema, model } from "mongoose";

const schema_balades = new Schema({
  nom: {
    type: String,
    required: [true, "le champ nom est obligatoire"],
    minlength: [3, "le nom contient au minimum 3 lettres"],
    maxlength: [255, "le nom contient au minimum 255 lettres"],
  },
  arrondissement: {
    type: Number,
    required: true,
    min: 1,
    max: 20,
  },
  texte_intro: {
    type: String,
    required: [true, "le champ nom est obligatoire"],
    minlength: [3, "le nom contient au minimum 3 lettres"],
    maxlength: [255, "le nom contient au minimum 255 lettres"],
  },
  date_publication: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

const Balades = model("balades", schema_balades);

export default Balades;
