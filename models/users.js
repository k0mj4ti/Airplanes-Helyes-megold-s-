const { default: sequelize } = require("@/utils/sequelize");
const { DataTypes } = require("sequelize");

const User = sequelize.define("Users", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {freezeTableName: "users"})

export default User;