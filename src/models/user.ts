import * as mongoose from 'mongoose';
import User from '../types/user';

const schema = new mongoose.Schema({
    login: String,
    password: String,
    isAdmin: Boolean
});

export default mongoose.model<User & mongoose.Document>('User', schema);
