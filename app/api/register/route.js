import { User } from "@/models";
import connectToDb from "@/utils/dbHandler";

export async function POST(req){
    try {
        const {username, password} = await req.json();

        if (!username || !password) return new Response("Username or Password missing", {status: 400});

        await connectToDb();

        const user = await User.findOne({username});
        if (user) return new Response("Username already taken", {status: 409});

        const newUser = await User.create({username, password})
        return new Response(JSON.stringify(newUser), {status: 201, headers: {'Content-Type': 'application/json'}})
    } catch (error) {
        return new Response(JSON.stringify({error: error.message}), {status: 500, headers: {'Content-Type': 'application/json'}})
    }
}