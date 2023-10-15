const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions));

app.use(cors(corsOptions))
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
const dotenv =  require('dotenv');
dotenv.configs
import { conf } from "./config/environnement";
import clientRoute from "./routes/Client";
import Appartement from "./routes/Appartement";
import routeUser from "./routes/User";
import routeUserRent from "./routes/UserRent";
// import routeMenuAccess  from "./routes/MenuAccess";
const env = conf()
app.use("/appartment", Appartement);
app.use("/user",routeUser);
app.use("/client",clientRoute);
app.use("/user-rent",routeUserRent)
// app.use("/menu-access",routeMenuAcces)
const PORT = env.APP_PORT || 4000;
app.listen(PORT, () => {
  console.log(`${env.APP_NAME} is running on port :${PORT}`);
});
