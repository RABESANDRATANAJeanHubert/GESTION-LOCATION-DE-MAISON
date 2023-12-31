import { ClientController } from "../controller/ClientController";

const express = require("express");
const clientRoute = express.Router();

clientRoute.post("/add", ClientController.create);
clientRoute.get("/", ClientController.getAllInformation);
clientRoute.put("/:id", ClientController.update);
clientRoute.delete("/:id", ClientController.delete);
export default clientRoute;
