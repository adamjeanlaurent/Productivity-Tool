export default class MyHttpClient {
    constructor() { }
    async SendRequest(url, options = { method: 'GET' }) {
        try {
            const data = await fetch(url, options);
            return data;
        }
        catch(error) {
            return { error: error.message };
        }
    }
    static async Get(url) {
        await this.SendRequest(url);
    }
    static async Post(url, payload) {
        this.options = {
            method: 'POST',
            body: JSON.stringify(payload)
        };

        await this.SendRequest(url, this.options);
    }
}