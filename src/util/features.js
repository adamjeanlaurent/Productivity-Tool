// features
const FEATURES = new Map(
    [
        [ 'ToDoList', true ],
        [ 'Analysis', true ],
        [ 'writeToDoListViaWebServer', true],
        [ 'trackCompletedToDoItems', true ]
    ]
);

export const isFeatureEnabled = (feature) => {
    return (FEATURES.has(feature) && FEATURES.get(feature));
}