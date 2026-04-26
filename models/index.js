const { default: Airplanes } = require("./airplanes");
const { default: User } = require("./users");

User.hasMany(Airplanes, {foreignKey: "ownerId"})
Airplanes.belongsTo(User, {foreignKey: "ownerId"});

export {
    User,
    Airplanes
}