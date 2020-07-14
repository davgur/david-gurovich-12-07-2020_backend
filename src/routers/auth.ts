import {Request, Response, Router} from "express";
import {compareSync, hashSync} from "bcrypt"
import {sign} from "jsonwebtoken"

import userModel from '../models/user'
import User from "../types/user";


const {SECRET_KEY} = process.env
const router: Router = Router();


router
    .post('/register', async (req: Request, res: Response, next) => {
        const {login, isAdmin, password} = req.body;
        try {
            const user: User = await userModel.create({isAdmin, login, password: hashSync(password, 8)});
            res.status(200).send({message: user.id});
        } catch (e) {
            res.status(400).send({message: e.toString()});
        }
        next();
    })
    .post('/login', async (req: Request, res: Response, next) => {
        const {login, password} = req.body;
        const user: User = await userModel.findOne({login});
        if (user === null)
            res.status(404);

        if (!compareSync(password, user.password))
            return res.status(401).send({accessToken: null, message: "Invalid Password!"});

        const token = sign({id: user.id}, SECRET_KEY, {expiresIn: 2 * 60 * 60});
        res.status(200).send({id: user.id, accessToken: token});
        next();
    });


export default router;