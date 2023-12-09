import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export function isAuthenticate(
    req: Request,
    res: Response,
    next: NextFunction
){

    // Recebendo o token
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).end()
    }

    const [, token] = authToken.split(" ")

    try {
        // Validar o token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        req.user_id = sub

        return next();

    } catch(error) {
        return res.status(401).end()
    }

    console.log(authToken)
}