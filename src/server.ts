require('dotenv').config()
import * as express from 'express';
import {Request, Response, Application, json} from "express";
import * as cors from "cors";
import {connect, disconnect} from 'mongoose';

import jwtMiddleware from './jwtMiddleware'
import taskRouter from './routers/task'
import authRouter from './routers/auth'
import userModel from './models/user'

const {CONNECTION_STRING} = process.env;
const app: Application = express();

app.use(json());
app.use(async (req: Request, res: Response, next) => {
    const db = await connect(CONNECTION_STRING, {useNewUrlParser: true});
    next();
});
app.use(cors());
app.use('/auth', authRouter);
app.use(jwtMiddleware);

app.use('/api', taskRouter);

app.use(disconnect)

app.listen(8080);