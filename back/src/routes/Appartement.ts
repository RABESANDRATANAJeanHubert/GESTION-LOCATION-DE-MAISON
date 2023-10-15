// import only AppartementController
import { AppartementController } from "../controller/AppartementController";
// router
const express = require('express');
const routeAppartement= express.Router();
// use router
routeAppartement.post('/add',AppartementController.add);
routeAppartement.get('/',AppartementController.list);
routeAppartement.put('/:id',AppartementController.update);
routeAppartement.delete('/:id',AppartementController.delete);
routeAppartement.get('/:id',AppartementController.getAppartementByAppartement);

export default routeAppartement;