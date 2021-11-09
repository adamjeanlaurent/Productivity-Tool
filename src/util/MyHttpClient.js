export default class MyHttpClient {
    constructor() { }
    static async SendRequest(url, options = { method: 'GET' }) {
        console.log(options);
        try {
            await fetch(url, options);
        }
        catch(error) {
            return { error: error.message };
        }
    }
    static async Get(url) {
        await this.SendRequest(url);
    }
    static async Post(url, payload) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        };
        await this.SendRequest(url, options);
    }
}