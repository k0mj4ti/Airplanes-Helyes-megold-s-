import { Airplanes } from "@/models";
import connectToDb from "@/utils/dbHandler"
import jwt from "jsonwebtoken"

export async function GET(req){
    try {
        await connectToDb();

        const planes = await Airplanes.findAll({});

        return new Response(JSON.stringify(planes), {status: 200, headers: {'Content-Type': 'application/json'}})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status: 500, headers: {'Content-Type': 'application/json'}})
    }
}

export async function POST(req){
    try {
        const authHeader = req.headers.get("authorization");

        if (!authHeader){
            return new Response("Unauthorized", { status: 401 })
        }

        const token = authHeader.split(' ')[1]
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const {name, type, seats, range} = await req.json();

        if (!name || !type || seats == null || range == null) {
            return new Response("Missing fields", { status: 400 })
        }
          
        const seatsNum = Number(seats)
        const rangeNum = Number(range)
        
        if (!Number.isFinite(seatsNum) || !Number.isFinite(rangeNum)) {
        return new Response("Seats and range must be valid numbers", { status: 400 })
        }

        await connectToDb()

        const plane = await Airplanes.findOne({where: {name}})
        if (plane) return new Response("This plane already exists exists", {status: 409});

        const newPlane = await Airplanes.create({name, type, seats: seatsNum, range: rangeNum, ownerId: decoded.uid})

        return new Response(JSON.stringify(newPlane), {status: 201, headers: {'Content-Type': 'application/json'}})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status: 500, headers: {'Content-Type': 'application/json'}})
    }
}