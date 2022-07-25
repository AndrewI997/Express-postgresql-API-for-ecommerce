import sequelize from "../database";
import { DataTypes } from "sequelize/types";

const User = sequelize.define('user',
{id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
email: { type: DataTypes.STRING, unique: true },
password: { type: DataTypes.STRING },
role: { type: DataTypes.STRING, defaultValue: 'USER' }
})

export default User