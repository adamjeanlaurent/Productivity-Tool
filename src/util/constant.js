export const SECOND = 1;
export const MINUTE = 60 * SECOND;

export const WEB_SERVER_PORT = 6532;
export const webServerURL = `http://localhost:${WEB_SERVER_PORT}`;


// features
const FEATURES = new Map(
    [
        [ 'ToDoList', true ],
        [ 'Analysis', true ],
        ['writeToDoListViaWebServer', true]
    ]
);

export const isFeatureEnabled = (feature) => {
    return (FEATURES.has(feature) && FEATURES.get(feature));
}