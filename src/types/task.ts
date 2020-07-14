import User from './user'

export default interface Task {
    content: string;
    owner: User;
    created: Date;
    phone: String;
    email: String;
}