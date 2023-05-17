import { v4 as uuidv4 } from "uuid";

export const NODE_ENV = process.env.node_env || "production"
export const FQDN = process.env.fqdn || "localhost"
export const SESSION_SECRET = process.env.fqnd || uuidv4()