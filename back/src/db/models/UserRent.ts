import { Optional, Model, DataTypes } from "sequelize";
import seqlzConnexion from "../../config/dbConnect";
import { UserRentAttributes } from "../../types";
import Appartement from "./appartemet";

export interface UserRentInput extends Optional<UserRentAttributes, "id"> {}
export interface UserRentOutput extends Required<UserRentAttributes> {}

 class UserRent extends Model<UserRentInput, UserRentOutput> implements UserRentInput
{
  
  id!: string;
  firstName!: string;
  lastName!: String;
  email!: String;
  phone!: String;
  adress!: string;
  appartment_id?: BigInt | undefined;
  active?: boolean | undefined;
}


UserRent.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey:true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appartment_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: seqlzConnexion,
    timestamps: true,
    underscored: false,
  }
);
UserRent.belongsTo(Appartement, {
  as: 'appart',
  foreignKey: "appartment_id",
});
export default UserRent;