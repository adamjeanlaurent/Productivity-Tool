// const HttpStrings = {
//     method : {
//         GET: 'GET',
//         POST: 'POST'
//     },
//     header : {
//         CONTENT_TYPE: 'Content-Type',
//         APPLICATION_JSON: 'applicatopn\json'
//     }
// }

export default class MyHttpClient {
    static async SendRequest(url, options) {
        try {
            const res = await fetch(url, options);
            const json = await res.json();
            return json;
        }
        catch(error) {
            return { error: error.message };
        }
    }
    static async Get(url) {
        const options = {
            method: 'GET',
        }
        await this.SendRequest(url, options);
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