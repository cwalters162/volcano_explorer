export const backend_fqdn = process.env.backend_url || "localhost"
export const backend_port = process.env.backend_port || "3000"
export const node_env = process.env.node_env || "development"
export const backend_url = node_env === "production" ? `https://${backend_fqdn}:${backend_port}` : `http://${backend_fqdn}:${backend_port}`
