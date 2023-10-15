import { isEmpty, isUndefined } from "lodash";
import helper from "../Helper/helper";
import Appartement from "../db/models/appartemet";

export class AppartementController {

  // Ajouter  le nouveau appartement
  static add = async (req: any, res: any) => {
    try {
      const { appartement, loyer, surface, adresse_postale } = req.body;
      if (
        isUndefined(appartement) ||
        isEmpty(appartement) ||
        isUndefined(loyer) ||
        isEmpty(loyer) ||
        isUndefined(surface) ||
        isEmpty(surface) ||
        isUndefined(adresse_postale) ||
        isEmpty(adresse_postale)
      ) {
        return res
          .status(400)
          .send(
            helper.ResponseData(400, "Information is not defined", null, null)
          );
      }

      const new_appartement = new Appartement();
      new_appartement.set("appartement", appartement);
      new_appartement.set("loyer", loyer);
      new_appartement.set("surface", surface);
      new_appartement.set("adresse_postale", adresse_postale);
      await new_appartement.save();
      return res
        .status(200)
        .send(
          helper.ResponseData(
            200,
            "Appartement has been created",
            null,
            new_appartement
          )
        );
    } catch (error) {
      return res
        .status(500)
        .send(helper.ResponseData(500, "Server Erro", error, null));
    }
  };
  // Recuperer la liste de tous les apprtement existant
  static list = async (req: any, res: any) => {
    try {
      const allAppartment = await Appartement.findAll();
      if (isEmpty(allAppartment)) {
        return res
          .status(201)
          .send(
            helper.ResponseData(201, "Information est null", null, allAppartment)
          );
      }
      return res
        .status(200)
        .send(helper.ResponseData(200, "List de tous les  Appartements ", null, allAppartment));
    } catch (error) {
      return res
        .status(500)
        .send(
          helper.ResponseData(
            500,
            "Error from server , please wait  a few minute",
            error,
            null
          )
        );
    }
  };

  // Modifier les appartement de locataire
  static update = async (req: any, res: any) => {
    const id = req.body.id || req.params.id || req.query.id;
    const appartement =
      req.body.appartement || req.params.appartement || req.query.appartement;
    const surface = req.body.surface || req.params.surface || req.query.surface;
    const loyer = req.body.loyer || req.params.loyer || req.query.loyer;
    const adresse_postale =
      req.body.adresse_postale ||
      req.params.adresse_postale ||
      req.query.adresse_postale;
    try {
      const update_appartement = await Appartement.findByPk(id);
      if (!update_appartement) {
        return res
          .status(400)
          .send(
            helper.ResponseData(400, "Identifiant introuvable", null, null)
          );
      }
      update_appartement.set("appartement", appartement);
      update_appartement.set("loyer", loyer);
      update_appartement.set("surface", surface);
      update_appartement.set("adresse_postale", adresse_postale);
      await update_appartement.save();
      return res
        .status(200)
        .send(
          helper.ResponseData(
            200,
            "Information has been updates",
            null,
            update_appartement
          )
        );
    } catch (error) {
      return res
        .status(500)
        .send(
          helper.ResponseData(
            500,
            "Error from server, please wait for a moment",
            error,
            null
          )
        );
    }
  };

  // Supprimer l'appartement en cas de besoin
  static delete = async (req: any, res: any) => {
    const id = req.body.id || req.params.id || req.query.id;
    if (isUndefined(id)) {
      return res
        .status(400)
        .send(
          helper.ResponseData(400, "Identifiant is not defined", null, null)
        );
    }
    try {
      const destoryAppartment = await Appartement.findByPk(id);
      if (!destoryAppartment) {
        return res
          .status(400)
          .send(helper.ResponseData(400, "Infromation invalid", null, null));
      }
      await destoryAppartment.destroy();
      return res
        .status(200)
        .send(helper.ResponseData(200, "Appartement a bien ete supprimer avec succes", null, null));
    } catch (error) {
      return res
        .status(500)
        .status(
          helper.ResponseData(
            500,
            "Error from server, please reload",
            error,
            null
          )
        );
    }
  };

  // Recuperer le detail de l'appartement de chaque proprietaire
  static getAppartementByAppartement = async (req: any, res: any) => {
    const id = req.params.id || req.body.id|| req.query.id;
    try {
      if (isUndefined(id) || isEmpty(id)) {
        return res
          .status(400)
          .send(
            helper.ResponseData(400, "Information est requis", null, null)
          );
      }
      const list = await Appartement.findByPk(id);
      if (!list) {
        return res
          .status(400)
          .send(helper.ResponseData(400, "id is not defined", null, null));
      }
      return res
        .status(200)
        .send(helper.ResponseData(200, "ok", null, list));
    } catch (error) {
      return res
        .status(500)
        .send(helper.ResponseData(500, "Error from sever", error, null));
    }
  };
}
