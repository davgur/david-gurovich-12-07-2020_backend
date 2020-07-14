import {verify} from "jsonwebtoken"
import User from "./types/user";
import userModel from "./models/user";

const {SECRET_KEY} = process.env

export default async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token)
        return res.status(403).send({message: "No token provided!"});

    try {
        const decoded: any = await verify(token, SECRET_KEY);
        const user: User = await userModel.findOne({_id: decoded.id}).exec();
        req.userId = user.id;
        req.isAdmin = user.isAdmin;
    } catch (e) {
        res.status(401).send({message: "Unauthorized!"});

    } finally {
        next();
    }
};