import { User } from "@/models";
import connectToDb from "@/utils/dbHandler";
import jwt from "jsonwebtoken"

export async function POST(req){
    try {
        const {username, password} = await req.json();

        if (!username || !password) return new Response("Username or Password missing", {status: 400});

        await connectToDb();

        const user = await User.findOne({username, password});
        if (!user) return new Response("Invalid credentials", {status: 401});

        const token = jwt.sign({
            uid: user.id,
            username: username
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRE  
        })

        return new Response(JSON.stringify(token), {status: 200, headers: {'Content-Type': 'application/json'}})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status: 500, headers: {'Content-Type': 'application/json'}})
    }
}