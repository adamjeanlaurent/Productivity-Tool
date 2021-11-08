const PORT = 6532;
const serverEndpoint = `https://localhost:${PORT}`;

const getFullEndpoint = (endpoint, path) => `${endpoint}/path`;

class TestHttpClient {
    constructor() { }
    async SendRequest(url, options) {
        try {
            const data = await fetch(url, options);
            return data;
        }
        catch(error) {
            return { error: error.message };
        }
    }
    static async Post(url, payload) {
        this.options = {
            method: 'POST',
            body: JSON.stringify(payload), 
        };

        this.options.body.;
        await this.SendRequest(url, this.options);
    }
}

module.exports = {
    PORT: PORT,
    serverEndpoint: serverEndpoint,
    getFullEndpoint: getFullEndpoint,
    TestHttpClient
}