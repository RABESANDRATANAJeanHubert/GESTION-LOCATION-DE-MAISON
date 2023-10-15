import { isNull, isUndefined } from "lodash";
import helper from "../Helper/helper";
import UserRent from "../db/models/UserRent";
import Appartement from "../db/models/appartemet";
import { error } from "console";

export class UserRentController {
  // Ajouter le nouveau locataire
  static add = async (req: any, res: any) => {
    const firstName =
      req.body.firstName || req.params.firstName || req.query.firstName;
    const lastName =
      req.body.lastName || req.params.lastName || req.query.lastName;
    const email = req.body.email || req.params.email || req.query.email;
    const phone = req.body.phone || req.params.phone || req.query.phone;
    const adress = req.body.adress || req.params.adress || req.query.adress;
    const appartment_id =
      req.body.appartment_id ||
      req.params.appartment_id ||
      req.query.appartment_id;
    try {
      if (
        isUndefined(firstName) ||
        isUndefined(lastName) ||
        isUndefined(email) ||
        isUndefined(phone) ||
        isUndefined(adress) ||
        isUndefined(appartment_id)
      ) {
        return res
          .status(400)
          .send(helper.ResponseData(400, "Client is not defined", null, null));
      }
      const newUserRent = new UserRent();
      newUserRent.set("firstName", firstName);
      newUserRent.set("lastName", lastName);
      newUserRent.set("email", email);
      newUserRent.set("phone", phone);
      newUserRent.set("adress", adress);
      newUserRent.set("active", true);
      newUserRent.set("appartment_id", appartment_id);
      await newUserRent.save();
      return res
        .status(200)
        .send(
          helper.ResponseData(
            200,
            "new UserRent has been created",
            null,
            newUserRent
          )
        );
    } catch (error) {
      console.log("Erreur", error);
      return res
        .status(500)
        .send(helper.ResponseData(500, "Server Erro", error, null));
    }
  };
  // Lister tous les locataires qui habites dans les appartement du proprietaire
  static all = async (req: any, res: any) => {
    try {
      const user = await UserRent.findAll({
        where: {
          active: true,
        },
        include: [
          {
            model: Appartement,
            attributes: ["appartement", "loyer", "surface", "adresse_postale"],
            as: "appart",
          },
        ],
      });
      return res.status(200).send(helper.ResponseData(200, "OK", null, user));
    } catch (error) {
      return res
        .status(500)
        .send(
          helper.ResponseData(500, "Erreur existe dans le serveur", error, null)
        );
    }
  };

  // Modifier le locataire si il y a le nouveau
  static update = async (req: any, res: any) => {
    const id = req.body.id || req.paramas.id || req.query.id;
    const { appartment_id, firstName, lastName, email, phone, adress } =
      req.body;
    try {
      const info = await UserRent.findByPk(id);
      if (!info) {
        return res
          .status(400)
          .send(
            helper.ResponseData(400, "Identifiant introuvable", null, null)
          );
      }
      info.firstName = firstName;
      info.lastName = lastName;
      info.email = email;
      info.phone = phone;
      info.adress = adress;
      info.appartment_id = appartment_id;
      info.id = id;
      await info.save();
      return res
        .status(200)
        .send(
          helper.ResponseData(200, "modification avec success", null, info)
        );
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send(helper.ResponseData(500, "Erreur dans le server", error, null));
    }
  };

  // Supprimer le locataire en cas de besoin
  static delete = async (req: any, res: any) => {
    const { id } = req.params || req.body || req.query;
    try {
      const checkData = await UserRent.findOne({
        where: {
          id: id,
        },
      });

      if (!checkData) {
        return res
          .status(400)
          .send(helper.ResponseData(500, "Information incorrect", null, null));
      }
      await checkData.destroy();
      return res
        .status(200)
        .send(
          helper.ResponseData(200, "Suppression avec succes", null, checkData)
        );
    } catch (error) {
      return res.status(500).send(500, "Erreur s'est produit dans le serveur");
    }
  };

  // Recuperer le detail de chaque locataire
  static getByUseRent = async (req: any, res: any) => {
    const id = req.body.id || req.params.id || req.query.id;
    try {
      if (isUndefined(id) || isNull(id)) {
        return res
          .status(400)
          .send(
            helper.ResponseData(400, "Identifiant introuvable", error, null)
          );
      }
      const checkId = await UserRent.findOne(
        {
          where:{
            active:true,
            id:id
          }
        }
      );
      if (!checkId) {
        return res.status(400).send(helper.ResponseData(400, "Information incorrecte", null, null));
      }
      return res.status(200).send(helper.ResponseData(200, "Ok", null, checkId));
    } catch (error) {
      return res.status(500).send(helper.ResponseData(500, "Erreur dans le serveur", error, null));
    }
  };
}
