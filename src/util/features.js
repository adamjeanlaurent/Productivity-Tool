// features
const FEATURES = new Map(
    [
        [ 'ToDoList', false ],
        [ 'Analysis', true ],
        [ 'writeToDoListViaWebServer', true]
    ]
);

export const isFeatureEnabled = (feature) => {
    return (FEATURES.has(feature) && FEATURES.get(feature));
}