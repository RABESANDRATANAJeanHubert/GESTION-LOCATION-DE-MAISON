// import only User who rent the house
import { UserRentController } from "../controller/UserRentController";
// router
const express = require('express');
const routeUserRent = express.Router();
// use router
routeUserRent.post('/add',UserRentController.add);
routeUserRent.get('/',UserRentController.all);
routeUserRent.put('/:id',UserRentController.update);
routeUserRent.delete('/:id',UserRentController.delete);
routeUserRent.get('/:id',UserRentController.getByUseRent);
export default routeUserRent;