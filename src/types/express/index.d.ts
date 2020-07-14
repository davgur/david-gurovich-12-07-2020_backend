// @ts-ignore
import {Request} from "types/express/express"

/*
declare global {
    namespace Express {
        interface Request {
            userId?: string;
            isAdmin?: boolean;
        }
    }
}*/

declare namespace Express {
    interface Request {
        userId?: string;
        isAdmin?: boolean;
    }
}
