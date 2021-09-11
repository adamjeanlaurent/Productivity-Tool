export const SECOND = 1;
export const MINUTE = 60 * SECOND;

export const secondsToFormattedTime = (sec) => {
    const minutes = Math.floor((sec / 60));
    const seconds = (sec % 60);

    let minutesStr = minutes.toString();
    let secondsStr = seconds.toString();

    if(minutes < 10) {
        minutesStr = '0' + minutes;
    }

    if(seconds < 10) {
        secondsStr = '0' + seconds;
    }

    return `${minutesStr}:${secondsStr}`;
}