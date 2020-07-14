import {Request, Response, Router} from "express";
import taskModel from '../models/task';
import userModel from '../models/user';
import Task from "../types/task";
import task from "../types/task";

const router: Router = Router();

const prepareForClient = (task: any) => {
    const {created, email, content, owner, phone, id} = task;
    return {created, email, content, owner: owner.login, phone, id};
}

router
    .get('/tasks', async (req: any, res: Response) => {
        const filter: any = req.isAdmin ? {} : {owner: {_id: req.userId}};
        const tasks = await taskModel.find(filter).populate('owner');
        res.send(tasks.map(prepareForClient));
    })
    .get('/task/:id', async (req: any, res: Response) => {
        const {id} = req.params;
        const filter: any = req.isAdmin ? {_id: id} : {_id: id, owner: {_id: req.userId}};
        const task = await taskModel.findOne(filter);

        res.status(200).send(prepareForClient(task));
    })
    .post('/tasks', async (req: any, res: Response) => {
        const task: Task = req.body;
        try {
            task.owner = await userModel.findById(req.userId);
            const {id} = await taskModel.create(task);
            res.status(200).send({message: {id}});
        } catch (e) {
            res.status(404).send({message: e.toString()});
        }
    })
    .patch('/task/:id', async (req: any, res: Response) => {
        const {id} = req.params;
        const data: Task = req.body;
        try {
            const filter: any = req.isAdmin ? {_id: id} : {_id: id, owner: {_id: req.userId}};
            const task = await taskModel.findOneAndUpdate(filter, data);
            res.status(200).send(prepareForClient(task));
        } catch (e) {
            res.status(404).send({message: e.toString()});
        }
    })
    .delete('/task/:id', async (req: any, res: Response) => {
        const {id} = req.params;
        try {
            const filter: any = req.isAdmin ? {_id: id} : {_id: id, owner: {_id: req.userId}};
            const task = await taskModel.findOneAndDelete(filter);
            res.status(200).send(prepareForClient(task));
        } catch (e) {
            res.status(404).send({message: e.toString()});
        }
    });

export default router;