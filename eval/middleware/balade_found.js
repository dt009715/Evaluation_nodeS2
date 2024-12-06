import Balades from "../entite/balade.js";

export function balade_found(texte) {
  return async function balade_found(req, rep, next) {
    const { id } = req.params;
    // est ce que le profil existe ?? => le profil a déjà été supprimé
    const exist = await Balades.findOne({ _id: id });
    if (!exist) {
      rep.status(404).render("404.ejs", {
        erreur: `${texte} impossible : aucun profil ne correspond à l'id ${id}`,
      });
      return;
    }
    next();
  };
}
