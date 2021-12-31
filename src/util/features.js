// features
const FEATURES = new Map(
    [
        [ 'ToDoList', false ],
        [ 'Analysis', true ],
        [ 'writeToDoListViaWebServer', true],
        [ 'trackCompletedToDoItems', false ]
    ]
);

export const isFeatureEnabled = (feature) => {
    return (FEATURES.has(feature) && FEATURES.get(feature));
}