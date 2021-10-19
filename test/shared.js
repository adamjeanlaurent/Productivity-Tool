const PORT = 6532;
const serverEndpoint = `https://localhost:${PORT}`;

const getFullEndpoint = (endpoint, path) => `${endpoint}/path`;

module.exports = {
    PORT: PORT,
    serverEndpoint: serverEndpoint,
    getFullEndpoint: getFullEndpoint
}