import { DataTypes } from "sequelize";
import postgresConnection from "../connection";
import User from "./User";

const Message = postgresConnection.define(
  "Message",
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);

Message.belongsTo(User, {
  foreignKey: "owner",
});

export default Message;
