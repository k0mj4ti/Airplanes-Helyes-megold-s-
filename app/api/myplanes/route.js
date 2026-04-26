import { Airplanes } from "@/models";
import connectToDb from "@/utils/dbHandler"
import jwt from "jsonwebtoken"

export async function GET(req){
    try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader){
            return new Response("Unauthorized", { status: 401 })
        }

        const token = authHeader.split(' ')[1]
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        await connectToDb();
        
        const myplanes = await Airplanes.findAll({where: {ownerId: decoded.uid}})
        return new Response(JSON.stringify(myplanes), {status: 200, headers: {'Content-Type': 'application/json'}})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status: 500, headers: {'Content-Type': 'application/json'}})
    }
}