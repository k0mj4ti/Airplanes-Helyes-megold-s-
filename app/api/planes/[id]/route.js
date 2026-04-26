import { Airplanes } from "@/models";
import connectToDb from "@/utils/dbHandler"
import jwt from "jsonwebtoken"

export async function DELETE(req, {params}){
    try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader){
            return new Response("Unauthorized", { status: 401 })
        }

        const token = authHeader.split(' ')[1]
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const {id} = await params;

        await connectToDb()

        const plane = await Airplanes.findOne({where: {id, ownerId: decoded.uid}})
        if (!plane) return new Response("This plane doesn't exists", {status: 404});

        await plane.destroy();
        await plane.save();
        
        return new Response("Deleted", {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status: 500, headers: {'Content-Type': 'application/json'}})
    }
}