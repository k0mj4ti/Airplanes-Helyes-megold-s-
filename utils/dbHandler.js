import sequelize from "./sequelize";

let connected = false;

export default async function connectToDb(){
    try {
        if (connected) return;
        await sequelize.authenticate();
        await sequelize.sync({alter: true})
        connected = true
    } catch (error) {
        console.error(error)
    }
}