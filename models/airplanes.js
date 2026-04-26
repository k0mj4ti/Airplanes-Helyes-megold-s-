const { default: sequelize } = require("@/utils/sequelize");
const { DataTypes } = require("sequelize");

const Airplanes = sequelize.define("Airplanes", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    seats: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    range: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {freezeTableName: "airplanes"})

export default Airplanes;