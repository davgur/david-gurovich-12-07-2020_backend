import * as mongoose from 'mongoose';
import Task from '../types/task';
import User from './user'

const taskSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    created: Date,
    email: String,
    phone: String
});

const postModel = mongoose.model<Task & mongoose.Document>('Task', taskSchema);

export default postModel;