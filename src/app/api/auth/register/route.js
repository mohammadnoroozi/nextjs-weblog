import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
    const { name, email, password } = await request.json();

    await connect();

    const hashedPassword = await bcrypt.hash(password, 5);


    try {

        const newUser = User.create({
            name,
            email,
            password: hashedPassword
        })

        return new NextResponse("User has been created", {
            status: 201
        })

    } catch (error) {
        return new NextResponse(error.message, {
            status: 500
        })
    }
}