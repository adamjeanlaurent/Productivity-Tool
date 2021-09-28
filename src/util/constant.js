export const SECOND = 1;
export const MINUTE = 60 * SECOND;

// features
const FEATURES = new Map(
    [ ['ToDoList', false] ]
);

export const isFeatureEnabled = (feature) => {
    return (FEATURES.has(feature) && FEATURES.get(feature));
}