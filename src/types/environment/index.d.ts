// @ts-ignore
import "node";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CONNECTION_STRING: string,
            SECRET_KEY: string,
        }
    }
}